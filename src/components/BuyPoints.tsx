//@ts-nocheck
import {Alert, Icon, RadioIndicator} from '@gluestack-ui/themed';
import {AlertIcon} from '@gluestack-ui/themed';
import {
  Box,
  HStack,
  Input,
  InputField,
  KeyboardAvoidingView,
  Radio,
  RadioGroup,
  RadioLabel,
  Text,
  View,
} from '@gluestack-ui/themed';
import {HelpCircle, InfoIcon} from 'lucide-react-native';
import {useState} from 'react';
import {ActivityIndicator, Linking, Modal, TouchableOpacity} from 'react-native';
import api from '../service/api';
import {Alert as AlertReact} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';


function BuyPointsModal(): JSX.Element {
  const [values, setValues] = useState('CREDIT');
  const [isVisible, setIsVisible] = useState('none');
  const [points, setPoints] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  function handleMessage() {
    setIsVisible(isVisible === 'none' ? 'flex' : 'none');
  }

  async function buyPoints() {

    if (points === '') {
      return AlertReact.alert('Informe a quantidade de pontos!!');
    }

    if (values === 'PIX') {
      setLoading(true);
      return buyPointsPix();
    }
    
    const total = points / 2;

    setLoading(true);
    const response = await api
      .post('accounts/purchase/points', {
        points: points,
        value: total,
        typePayment: values,
      })
      .then(() => {
        setLoading(false);
        AlertReact.alert(`Sua compra de ${points} pontos foi realizada com sucesso!!`);
      })
      .catch(error => {
        setLoading(false);
        if (error.message && values === 'DEBIT') return AlertReact.alert('Erro na compra', 'Débito insuficiente para realizar a compra de pontos');
        else if (error.message && values === 'CREDIT') return AlertReact.alert('Erro na compra', 'Limite insuficiente para realizar a compra de pontos');
      });
  }

  async function buyPointsPix() {
    const total = points / 2;

    const response = await api
      .post('accounts/purchase/points/pix', {
        points: points,
        value: total,
        typePayment: values,
      })
      .then((json) => {
        setLoading(false);
        console.log(json.data);
        Clipboard.setString(json.data);
        AlertReact.alert('Código Pix gerado', "Código copiado. Clique em OK para abrir o SwissBank e concluir o pagamento.", [
          {
            style: 'cancel',
            text: 'Cancelar'
          },
          {
            text: 'OK',
            onPress: () => {
              openSwissBank();
            }
          }
        ]);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  }

  const openSwissBank = async () => {
    const url = 'meuapp://'; 

    try {
        Linking.openURL(url);
    } catch (error) {
        Alert.alert("Não foi possível abrir o SwissBank.");
    }
};

  return (
    <KeyboardAvoidingView behavior="position">
      <View>
        <Box
          bgColor="#FFFFFF"
          mr={30}
          ml={30}
          borderRadius={30}
          justifyContent="center"
          alignItems="center"
          mb={40}
          mt={40}>
          <Text fontSize={32} color="#000" fontWeight={'$semibold'} mt={30}>
            Compre Pontos
          </Text>

          <Box flexDirection="column" mt={30}>
            <Input
              mr={25}
              ml={25}
              bgColor="#C6C6C6"
              borderRadius={8}
              borderColor="#fff">
              <InputField
                onChangeText={(e) => setPoints(e)}
                keyboardType="numeric"
                color={'#000'}
                // placeholder='Digite a quantidade de pontos'
                placeholderTextColor={'#000'}
              />
            </Input>

            <HStack alignItems="center" justifyContent="center">
              <Text mt={10} fontSize={16} color="#000">
                Insira a quantidade de pontos que deseja
              </Text>

              <TouchableOpacity onPress={handleMessage}>
                <Box mt={10} ml={5}>
                  <Icon as={HelpCircle} size="xl" />
                </Box>
              </TouchableOpacity>
            </HStack>

            <Box display={isVisible} mt={20} mb={10}>
              <Alert action="error" variant="accent">
                <AlertIcon as={InfoIcon} mr="$3" />
                <Text color="#000">1 ponto = 0,50R$</Text>
              </Alert>
            </Box>
          </Box>

          <RadioGroup
            display="flex"
            flexDirection="row"
            gap={20}
            alignItems="center"
            value={values}
            onChange={setValues}
            mt={20}>
            <Radio value="DEBIT">
              <RadioIndicator
                mr="$2"
                width={values === 'DEBIT' ? 100 : 75}
                height={values === 'DEBIT' ? 40 : 33}
                borderRadius={5}
                bgColor={values === 'DEBIT' ? '#C40601' : '#fff'}
                borderColor={values === 'DEBIT' ? '#C40601' : '#000'}>
                <RadioLabel
                  color={values === 'DEBIT' ? '#fff' : '#000'}
                  fontWeight={values === 'DEBIT' ? '$semibold' : ''}>
                  Débito
                </RadioLabel>
              </RadioIndicator>
            </Radio>

            <Radio value="CREDIT">
              <RadioIndicator
                mr="$2"
                width={values === 'CREDIT' ? 100 : 75}
                height={values === 'CREDIT' ? 40 : 33}
                borderRadius={5}
                bgColor={values === 'CREDIT' ? '#C40601' : '#fff'}
                borderColor={values === 'CREDIT' ? '#C40601' : '#000'}>
                <RadioLabel
                  color={values === 'CREDIT' ? '#fff' : '#000'}
                  fontWeight={values === 'CREDIT' ? '$semibold' : ''}>
                  Crédito
                </RadioLabel>
              </RadioIndicator>
            </Radio>

            <Radio value="PIX">
              <RadioIndicator
                mr="$2"
                width={values === 'PIX' ? 100 : 75}
                height={values === 'PIX' ? 40 : 33}
                borderRadius={5}
                bgColor={values === 'PIX' ? '#C40601' : '#fff'}
                borderColor={values === 'PIX' ? '#C40601' : '#000'}>
                <RadioLabel
                  color={values === 'PIX' ? '#fff' : '#000'}
                  fontWeight={values === 'PIX' ? '$semibold' : ''}>
                  Pix
                </RadioLabel>
              </RadioIndicator>
            </Radio>
          </RadioGroup>

          <TouchableOpacity onPress={() =>  buyPoints()}>
            <Box
              justifyContent="center"
              alignItems="center"
              bgColor="#C40601"
              borderRadius={10}
              mr={10}
              ml={10}
              mt={40}
              mb={30}
              width={300}
              padding={5}>
              <Text fontSize={24} color="#fff">
                Pagar
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
        <Modal visible={loading} transparent>
          <Box flex={1} justifyContent='center'>
            <ActivityIndicator size='large' color="#000"/>
            {
              values === 'PIX' ? (
                <Text alignSelf='center'>
                  Gerando código pix
                </Text>
                ) : (
                  ''
                )
            }
          </Box>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

export default BuyPointsModal;
