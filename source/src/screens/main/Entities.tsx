import { transparentize } from 'polished';
import React, { FC } from 'react';
import { Text } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import styled from 'styled-components/native';
import { shallow } from 'zustand/shallow';
import app from '../../../app.json';
import BasicLayout from '../../components/BasicLayout';
import EntityItem from '../../components/EntityItem';
import ListLayout from '../../components/ListLayout';
import { useApplicationStore } from '../../contexts/useApplicationStore';
import i18n from '../../locale';

interface EntitiesProps {
    navigation: NavigationProp<any, any>;
}

const Entities: FC<EntitiesProps> = ({ navigation }) => {
    const { entities } = useApplicationStore((state) => ({ entities: state.entities }), shallow);

    return (
        <BasicLayout headerStyle={{ width: '100%' }} backText={false} onBack={() => navigation.goBack()}>
            <ListLayout
                title={i18n.t('entitiesScreen.title')}
                showsVerticalScrollIndicator={true}
                data={entities}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                    width: '100%',
                }}
                EmptyComponent={() => (
                    <>
                        <FontAwesomeStyled name="building" size={50} color={transparentize(0.5, 'black')} />
                        <TextStyled style={{ color: transparentize(0.5, 'black') }}>{i18n.t('entitiesScreen.empty')}</TextStyled>
                    </>
                )}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                }}
                RenderItemComponent={({ item }) => <EntityItem data={item} navigation={navigation} />}
            />
        </BasicLayout>
    );
};

const FontAwesomeStyled = styled(FontAwesome)``;
const TextStyled = styled(Text)``;

export default Entities;
