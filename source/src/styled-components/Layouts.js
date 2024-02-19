import styled from 'styled-components/native';

export const Layout = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: ${(props) => props.backgroundColor || 'white'};
    position: relative;
`;

export const ContainerLayout = styled.View`
    height: 100%;
    width: 100%;
    flex: 1;
    background-color: ${(props) => props.backgroundColor || 'transparent'};
`;
