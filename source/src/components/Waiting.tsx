import { AntDesign } from '@expo/vector-icons';
import { transparentize } from 'polished';
import React, { FC } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import i18n from '../locale';

interface WaitingProps {
    message?: string;
    closeConnection: () => void;
}

const Waiting: FC<WaitingProps> = ({ message, closeConnection }) => {
    return (
        <Container>
            <ViewStyled></ViewStyled>
            <ViewStyled>
                <Message>{message || i18n.t('processing')}</Message>
                <ActivityIndicatorStyled size={'large'} color={'white'} />
            </ViewStyled>
            <CloseIconWrapper
                onPress={() =>
                    Alert.alert(i18n.t('closeConnection'), i18n.t('closeConnectionMessage'), [
                        {
                            text: i18n.t('cancel'),
                        },
                        { text: i18n.t('accept'), onPress: () => closeConnection() },
                    ])
                }
            >
                <AntDesignStyled name="close" size={24} color="white" />
            </CloseIconWrapper>
        </Container>
    );
};

const AntDesignStyled = styled(AntDesign)``;

const ViewStyled = styled.View``;

const ActivityIndicatorStyled = styled.ActivityIndicator``;
const CloseIconWrapper = styled.TouchableOpacity`
    margin-bottom: 40px;
    border: solid white 1px;
    padding: 10px;
    border-radius: 50px;
`;

const Container = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    align-items: center;
    justify-content: space-between;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background-color: ${transparentize(0.1, 'black')};
`;

const Message = styled.Text`
    font-size: 18px;
    color: white;
    margin-bottom: 20px;
`;

export default Waiting;
