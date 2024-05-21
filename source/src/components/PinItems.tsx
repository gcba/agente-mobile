import { transparentize } from 'polished';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Animated, { EasingNode } from 'react-native-reanimated';
import { CSSProperties } from 'styled-components';
import styled from 'styled-components/native';
import i18n from '../locale';

interface PinItemsProps {
    length: number;
    value: string;
    color: string;
    textColor?: string;
    error?: boolean;
    style?: CSSProperties;
}

const PinItems: FC<PinItemsProps> = ({ length, value, color, textColor = 'white', error, ...otherProps }) => {
    const animation = useMemo(() => new Animated.Value(0), []);
    const interpolate = useMemo(
        () =>
            animation.interpolate({
                inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
                outputRange: [0, 10, 0, -10, 0, 10, 0],
            }),
        []
    );

    const createPinItems = useCallback(() => {
        let items = [];
        for (let i = 0; i < length; i++) {
            items.push(<PinItem key={i} active={value.length > i} color={error ? 'red' : color} />);
        }
        return items;
    }, [length, value, color, error]);

    useEffect(() => {
        if (error) {
            animation.setValue(0);
            Animated.timing(animation, {
                toValue: 3,
                duration: 500,
                easing: EasingNode.bounce,
            }).start();
        }
    }, [error]);

    return (
        <PinWrapper {...otherProps}>
            <AnimatedViewStyled
                style={{
                    transform: [{ translateX: interpolate }],
                }}
            >
                <PinItemsWrapper>{createPinItems()}</PinItemsWrapper>
            </AnimatedViewStyled>
        </PinWrapper>
    );
};

const AnimatedViewStyled = styled(Animated.View)``;

const PinWrapper = styled.View``;

const PinItemsWrapper = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const PinText = styled.Text`
    color: ${(props) => transparentize(0.5, props.theme.color.font)};
    text-align: center;
    margin-top: 5px;
`;

interface PinItemProps {
    active: boolean;
    color: string;
}
const PinItem = styled.View<PinItemProps>`
    height: 16px;
    width: 16px;
    border-radius: 16px;
    background-color: ${(props: PinItemProps) => (props.active ? transparentize(0, props.color) : transparentize(0.8, props.color))};
    margin: 10px;
    transition: 0.1s ease-in-out;
`;

export default PinItems;
