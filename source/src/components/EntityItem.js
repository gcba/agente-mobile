import { LinearGradient } from 'expo-linear-gradient';
import { transparentize } from 'polished';
import React from 'react';
import { Image, Text, View } from 'react-native';
import styled from 'styled-components/native';

const EntityItem = ({ data, navigation }) => {
    return (
        <Container
            style={{
                width: '48%',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}
            onPress={() => {
                navigation.navigate('EntityDetails', {
                    entity: data,
                });
            }}
        >
            <LinearGradient
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 5,
                    zIndex: 1,
                }}
                colors={[transparentize(0.0, data.style?.background?.color), transparentize(0.3, data.style?.background?.color)]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
            <Image
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 5,
                }}
                source={{ uri: data.style?.hero?.uri, cache: 'force-cache' }}
            />
            <View
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                }}
            >
                <Image
                    source={{
                        uri: data.style?.thumbnail?.uri || 'https://upload.wikimedia.org/wikipedia/commons/c/c6/No_Logo.png', cache: 'force-cache'
                    }}
                    style={{
                        height: 40,
                        width: '100%',
                        marginBottom: 5,
                    }}
                    resizeMode="contain"
                />
                <Text
                    style={{
                        color: data.style?.text?.color,
                        textAlign: 'center',
                        width: '100%',
                        fontSize: 10,
                        marginBottom: 5,
                        textShadowColor: transparentize(0.7, 'black'),
                        textShadowRadius: 5,
                    }}
                >
                    {data.title}
                </Text>

                {data.subtitle && (
                    <Text
                        style={{
                            color: data.style?.text?.color,
                            textAlign: 'center',
                            width: '100%',
                            fontSize: 14,
                            textShadowColor: transparentize(0.7, 'black'),
                            textShadowRadius: 5,
                        }}
                    >
                        {data.subtitle}
                    </Text>
                )}
            </View>
        </Container>
    );
};

const Container = styled.TouchableOpacity`
    padding: 10px;
    border-radius: 5px;
    align-items: center;
    flex-direction: row;
    position: relative;
    padding: 15px;
    width: 100%;
    height: 100px;
    box-shadow: 0 0 5px ${transparentize(0.7, 'black')};
    border: 1px ${(props) => props.color || transparentize(0.9, 'black')};
    position: relative;
    elevation: 1;
`;

export default EntityItem;
