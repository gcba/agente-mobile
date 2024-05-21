import { AgentSecureStorage } from '@extrimian/agent';
import createSecureStore from '@neverdull-agency/expo-unlimited-secure-store';
import AsyncLock from "async-lock"
const secureStore = createSecureStore();

export class SecureStorage implements AgentSecureStorage {
    private lock = new AsyncLock()
    private id: string;

    constructor(id = 'dummyId') {
        this.id = id;
    }

    private formatKey(key: string): string {
        return `${this.id}-${key}`;
    }

    private async getSecureKeys(): Promise<string[]> {
        try {
            const storageKeys = JSON.parse(await secureStore.getItem(this.id));
            return storageKeys || [];
        } catch (error) {
            await secureStore.setItem(this.id, JSON.stringify([]));
            return [];
        }
    }

    private async atomicAdd(key: string, data: string): Promise<void> {
        try {
            key = this.formatKey(key);
            let storageKeys = await this.getSecureKeys();
            await secureStore.setItem(key, JSON.stringify(data));
            await secureStore.setItem(this.id, JSON.stringify([...storageKeys.filter((element) => element !== key), key]));
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async add(key: string, data: string): Promise<void> {
        await this.lock.acquire(this.id, async () => {
            await this.atomicAdd(key, data)
        })
    }

    async get(key: string): Promise<any> {
        let returnVal
        await this.lock.acquire(this.id, async () => {
            try {
                key = this.formatKey(key);
                const value = JSON.parse(await secureStore.getItem(key));
                if (!value) {
                    returnVal = null
                }
                returnVal = value;
            } catch (error) {
                console.log(error);
                throw error;
            }
        })
        return returnVal
    }

    async getAll(): Promise<Map<string, any>> {
        let returnMap: Map<string, any>
        await this.lock.acquire(this.id, async () => {
            const map = new Map<string, any>();
            try {
                const storageKeys = await this.getSecureKeys();
                for (const key of storageKeys) {
                    const fixKey = key.replace(this.id+'-', '')
                    map.set(fixKey, JSON.parse(await secureStore.getItem(key)));
                }
                for (const val of map.values()) {
                    // console.log(val)
                }
                returnMap = map
            } catch (error) {
                returnMap = map
            }
        })
        return returnMap;
    }

    async remove(key: string): Promise<void> {
        await this.lock.acquire(this.id, async () => {
            try {
                key = this.formatKey(key);
                await secureStore.removeItem(key);
                const storageKeys = await this.getSecureKeys();
                if (!storageKeys.length) {
                    return;
                }
                await secureStore.setItem(this.id, JSON.stringify(storageKeys.filter((k: string) => k !== key)));
            } catch (error) {
                console.log(error);
                throw error;
            }
        })
    }

    async update(key: string, data: any) {
        await this.lock.acquire(this.id, async () => {
            try {
                key = this.formatKey(key);
                await secureStore.setItem(key, JSON.stringify(data));
            } catch (error) {
                console.log(error);
                throw error;
            }
        })
    }

    async clear() {
        await this.lock.acquire(this.id, async () => {
            try {
                const storageKeys = await this.getSecureKeys();
                if (storageKeys.length > 0) {
                    for (const key of storageKeys) {
                        await secureStore.removeItem(key);
                    }
                }
                await secureStore.removeItem(this.id);
            } catch (error) {
                console.log('im an error in the delete of the secure-storage: ',error);
                throw error;
            }
        })
    }
}