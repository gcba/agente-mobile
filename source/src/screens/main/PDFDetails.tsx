// Imports
import React, { FC, useMemo } from 'react';
import i18n from '../../locale';

// Components
import { NavigationProp, RouteProp } from '@react-navigation/native';
import BasicLayout from '../../components/BasicLayout';
import styled, { useTheme } from 'styled-components/native';
import { TouchableHighlight } from 'react-native';
import { useApplicationStore } from '../../contexts/useApplicationStore';
import { DID } from '@extrimian/agent';
import Pdf from 'react-native-pdf'

interface PDFDetailsProps {
    navigation: NavigationProp<any>;
    route: RouteProp<any, any>;
}

const PDFDetails: FC<PDFDetailsProps> = ({ navigation, route }) => {
    const data = useMemo(() => route.params?.data, [route.params?.data]);
    const theme = useTheme();
    // const { sendMessage } = useApplicationStore((state) => ({
    //     sendMessage: state.sendMessage,
    // }));

    // const acceptHandler = async () => {
    //     const amiMessage = await data.amiPlugin?.amisdk.createAckMessage(data.did, data.thid)
    //     sendMessage({ to: DID.from(data.did), message: amiMessage })
    //     navigation.goBack()
    // }
    // const declineHandler = async () => {
    //     const amiMessage = await data.amiPlugin?.amisdk.createProblemReport(data.did, data.thid, { code: "rejected", comment: "not confirmed" })
    //     sendMessage({ to: DID.from(data.did), message: amiMessage })
    //     navigation.goBack()
    // }

    return (
        <BasicLayout
            title={i18n.t('settingsScreen.reset.title')}
            contentStyle={{
                paddingTop: 10,
                paddingBottom: 10,
                justifyContent: "space-evenly",
                alignItems: "center"
            }}
            onlyTitle
            onBack={() => navigation.goBack()}
        >
            <Texto>Message id: {data.id}</Texto>
            {data.pdf ? 
            
            <PdfWrapper>
                <PDFStyled
                    fitPolicy={2}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={true}
                    source={{ uri: 'data:application/pdf;base64,' + data.data }}
                />
            </PdfWrapper> : <Texto>{data.data}</Texto>
        }

            <Item onPress={data.acceptHandler} underlayColor={theme.color.tertiary} warning={false} theme={theme}>
                <ItemContentWrapper>
                    <Texto style={{ color: "white" }} theme={theme}>Aceptar</Texto>
                </ItemContentWrapper>
            </Item>

            <Item onPress={data.declineHandler} underlayColor={"#C93B3B"} warning={true} theme={theme}>
                <ItemContentWrapper>
                    <Texto style={{ color: "#C93B3B" }} theme={theme}>Rechazar</Texto>
                </ItemContentWrapper>
            </Item>
        </BasicLayout>
    );
};

const PDFStyled = styled(Pdf)`
    flex: 2;
    width: 100%;
    height: 100%;
`;

const PdfWrapper = styled.View`
    display: flex;
    align-items: center;
    width: 80%;
    height: 60%;
`;

const Texto = styled.Text`
    font-size: 14px;
    width: 90%;
    text-align: center;
    font-family: Manrope-SemiBold;
    color: ${props => props.theme.color.font}
`

const ItemContentWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    width: 55%;
    padding: 10px 45px 10px 45px;
    align-items: center;
`;

const Item = styled(TouchableHighlight)`
    align-items: center;
    border-radius: 50px;
    border: 2px solid ${(props) => (props.warning ? "#C93B3B" : props.theme.color.secondary)};
    background-color: ${(props) => props.warning ? "transparent" : props.theme.color.secondary};
`;


export default PDFDetails;
