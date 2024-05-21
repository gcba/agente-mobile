import { LinearGradient } from 'expo-linear-gradient';
import { relative } from 'path';
import { transparentize } from 'polished';
import React, { FC } from 'react';
import styled, {useTheme} from 'styled-components/native';

interface EntityHeaderProps {
    setHeaderHeight?: (height: string) => void;
    entityStyles: any;
}

const EntityHeader: FC<EntityHeaderProps> = ({ setHeaderHeight, entityStyles }) => {
    const theme = useTheme()
    return (
        <Container
            onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setHeaderHeight && setHeaderHeight(height.toFixed(0));
            }}
        >
            {/* <LinearGradient
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                }}
                colors={
                    entityStyles?.background?.color
                        ? [transparentize(0.2, entityStyles.background?.color), transparentize(0.8, entityStyles.background?.color)]
                        : ['transparent', 'transparent']
                }
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
            /> */}

            <ViewStyled style={{backgroundColor:entityStyles?.background?.color || theme.color.secondary, width:150, height:150, borderRadius:100, justifyContent:'center', alignItems:'center'}}>
                <ImageStyled
                    source={{
                        uri: entityStyles?.thumbnail?.uri || 'https://upload.wikimedia.org/wikipedia/commons/c/c6/No_Logo.png', cache: 'force-cache'
                    }}
                    style={{
                        width: '50%',
                        height: '50%',
                    }}
                    resizeMode="contain"
                />
            </ViewStyled>
        </Container>
    );
};

const ImageStyled = styled.Image``;

const ViewStyled = styled.View``;

const Container = styled.View`
    width: 100%;
    margin:50px 0 20px 0;
    justify-content: center;
    align-items: center;
`;

const ImageBackground = styled.View`
    justify-content: center;
    align-items: center;
    position: absolute;
    overflow: hidden;
    height: 70%;
    width: 900%;
    border-radius: 50px;
    padding: 10px;
`;

export default EntityHeader;
