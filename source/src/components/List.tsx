import React, { FC } from 'react';
import styled from 'styled-components/native';

interface ListProps {
    data: any[];
    RenderItemComponent: React.FC<any>;
    EmptyComponent?: React.FC<any>;
    onPressItem?: (item: any) => void;
    contentContainerStyle?: any;
    showsVerticalScrollIndicator?: boolean;
    style?: any;
}

const List: FC<ListProps> = ({
    data,
    RenderItemComponent,
    EmptyComponent,
    onPressItem = () => {},
    contentContainerStyle,
    showsVerticalScrollIndicator = true,
    style,
    ...props
}) => {
    return (
        <FlatListStyled
            {...props}
            data={data}
            renderItem={({ item }) => (
                <RenderItemComponent
                    item={item}
                    onPress={() => {
                        onPressItem(item);
                    }}
                />
            )}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            keyExtractor={(item, index) => index}
            contentContainerStyle={{
                height: !data || data.length === 0 ? '100%' : null,
                ...contentContainerStyle,
            }}
            ItemSeparatorComponent={() => <Separator />}
            style={{ width: '100%', ...style }}
            ListEmptyComponent={() => (
                <EmptyWrapper>
                    <EmptyComponent />
                </EmptyWrapper>
            )}
        />
    );
};

const FlatListStyled = styled.FlatList``;

const Separator = styled.View`
    height: 15px;
`;

const EmptyWrapper = styled.View`
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export default List;
