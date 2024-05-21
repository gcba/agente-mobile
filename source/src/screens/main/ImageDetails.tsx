// Imports
import React, { FC } from 'react';
import i18n from '../../locale';

// Components
import { NavigationProp } from '@react-navigation/native';
import BasicLayout from '../../components/BasicLayout';
import styled, { useTheme } from 'styled-components/native';
import { useApplicationStore } from '../../contexts/useApplicationStore';
import { shallow } from 'zustand/shallow';
import { Ionicons } from '@expo/vector-icons';
import SingleTitleAndBtn from '../../components/SingleTitleAndBtn';
import { Dimensions, Image } from 'react-native';

const ImageDetails = ({ navigation, route }) => {
    return (
        <BasicLayout
            title={"Detalles de la imagen"}
            contentStyle={{
                paddingTop: 10,
                paddingBottom: 10,
                justifyContent: "space-evenly",
            }}
            onlyTitle
            onBack={() => navigation.goBack()}
        >
                <ImageStyled
                    style={{
                        flex: 1,
                        width: Dimensions.get('window').width / 1,
                        height: Dimensions.get('window').width / 1,
                    }}
                    resizeMode={'contain'}
                    source={{
                        uri: route.params?.item.value , cache: 'force-cache'
                    }}
                />
        </BasicLayout>
    );
};
const ViewStyled = styled.View``;
const ImageStyled = styled(Image)``;

export default ImageDetails;
