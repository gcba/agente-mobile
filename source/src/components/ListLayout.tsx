import { AntDesign, Entypo } from '@expo/vector-icons';
import React, { FC } from 'react';
import { Platform } from 'react-native';
import { CSSProp } from 'styled-components';
import styled, { useTheme } from 'styled-components/native';
import i18n from '../locale';
import List from './List';

interface ListLayoutProps {
    title?: string;
    headerButton?: boolean;
    data: any[];
    onPressButton?: () => void;
    onPressItem?: (item: any) => void;
    RenderItemComponent: any;
    EmptyComponent?: React.FC<any>;
    contentContainerStyle?: any;
    showsVerticalScrollIndicator?: boolean;
    numColumns?: number;
    columnWrapperStyle?: CSSProp;
    ItemSeparatorComponent?: React.FC<any>;
    ListFooterComponent?: React.FC<any>;
    ListHeaderComponent?: React.FC<any>;
    extraData?: any;
    maxToRenderPerBatch?: number;
    windowSize?: number;
}

const ListLayout: FC<ListLayoutProps> = ({
    title,
    headerButton,
    data,
    onPressButton,
    onPressItem = () => {},
    RenderItemComponent,
    EmptyComponent,
    contentContainerStyle,
    ...props
}) => {
    const theme = useTheme();    
    return (
        <>
            {(title || headerButton) && (
                <HeaderWrapper>
                    {title && (
                        <HeaderText style={{color: theme.color.secondary}} numberOfLines={2} ellipsizeMode="tail">
                            {title}
                        </HeaderText>
                    )}
                    {onPressButton && data.length > 0 && (
                        <HeaderButton
                            onPress={() => {
                                onPressButton();
                            }}
                            style={{backgroundColor: theme.color.secondary}}
                        >
                            <EntypoStyled name="plus" size={15} color={theme.color.primary} />
                            {/* <HeaderButtonText style={{ color: theme.color.secondary }}>{i18n.t('add')}</HeaderButtonText> */}
                        </HeaderButton>
                    )}
                </HeaderWrapper>
            )}
            <List
                data={data}
                EmptyComponent={EmptyComponent}
                RenderItemComponent={RenderItemComponent}
                onPressItem={onPressItem}
                contentContainerStyle={{
                    paddingHorizontal: 32,
                    paddingBottom: Platform.OS === 'android' ? 20 : 40,
                    ...contentContainerStyle,
                }}
                style={{
                    paddingTop: title || headerButton ? 0 : 0,
                }}
                {...props}
            />
        </>
    );
};

const EntypoStyled = styled(Entypo)``;

const HeaderWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const HeaderText = styled.Text`
    font-size: 20px;
    text-align: center
    line-height: 25px;
    padding-top: 32px;
    padding-bottom: 32px;
    font-family: Manrope-Bold;
`;

const HeaderButton = styled.TouchableOpacity`
    padding: 5px;
    border-radius: 50px;
    
    position: absolute;
    right: 20;
    
`;

const HeaderButtonText = styled.Text`
    color: white;
    font-size: 14px;
    font-weight: bold;
`;

export default ListLayout;
