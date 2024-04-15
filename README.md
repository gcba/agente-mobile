## Descripción

El agente permite la creación de una identidad digital auto-soberana. 
También crea, recibe y comparte credenciales verificables.
Tener contactos de confianza, DIDs de organizaciones y gobiernos que sean públicos. Acceda a servicios de diferentes organizaciones de forma segura y estándar. Comunicarse con otros agentes u organizaciones de forma descentralizada, encriptada y autenticada.

## Funcionalidades

- Generación de DID (Generación de claves para recuperación, actualización, firma y transporte)
- Almacenamiento de credenciales verificables
- Almacenamiento de entidades conocidas
- Manejo de protocolo WACI-DIDComm (con WACI-Interpreter)
- Capacidad de presentación de credenciales
- Importacion y Exportacion de DID.

## Tecnologías

La aplicación cuenta con las siguientes tecnologías:

- Node 14.19.3
- React Native 0.69.3
- Expo 5.3.0
- Typescript 2.0.4
  
## Arquitectura
[Diagrama](https://docs.quarkid.org/Arquitectura/)

## Documentación
[Link](https://docs.quarkid.org/Arquitectura/componentes/)

## Configuraración de entorno local

Clonar el repositorio

- Instalar java sdk v14.*
- Configurar variables de entorno de java [Ver](https://reactnative.dev/docs/environment-setup)
    - JAVA_HOME
    - PATH

- Instalar Android Studio
- Generar un emulador en Android Studio
- Abrir el proyecto con el editor seleccionado
- Abrir una terminal y ejecutar:

Instalar dependencias

```bash
cd source
yarn 
yarn postinstall
```

- Modificar:
El archivo: node_modules\react-native-os\android\build.gradle 
Linea 47: cambiar la 'compilation' por 'implentation'

## Variables de Entorno

- Configura tus variables en el archivo /source/src/config/agent.ts

Iniciar la app

```bash
yarn android
```

### Generales

N/A

## Logs

N/A

## Requerimientos de red
La aplicación debe tener conectividad a internet. 

## Ruta de acceso

N/A 

## Licencia
Derechos de autor © 2023 Gobierno de la Ciudad de Buenos Aires

Licenciado bajo la Licencia Apache, Versión 2.0 (la "Licencia");
usted no puede utilizar este archivo excepto en cumplimiento con la Licencia.
Puede obtener una copia de la Licencia en
http://www.apache.org/licenses/LICENSE-2.0.
A menos que lo requiera la ley aplicable o se acuerde por escrito, el software
distribuido bajo la Licencia se distribuye "TAL CUAL",
SIN GARANTÍAS O CONDICIONES DE NINGÚN TIPO, ya sean expresas o implícitas.
Consulte la Licencia para el idioma específico que rige los permisos y
limitaciones bajo la Licencia.
