//@ts-nocheck
import {
  Box,
  Button,
  ButtonText,
  FlatList,
  HStack,
  Icon,
  Modal,
  Text,
  View,
} from '@gluestack-ui/themed';
import TitleWithoutMargin from './TitleWithoutMargin';
import {ChevronDown} from 'lucide-react-native';
import {useState} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import api from '../service/api';

type props = {
  purchase: object;
};

function DropBox({purchase}: props): JSX.Element {
  // purchase.item.product.map((item) => console.log(item.name))
  const [modalIsVisible, setModalIsVisible] = useState('none');
  const [borderRadius, setBorderRadius] = useState(10);

  // const user = useSelector((state:any) => state.user.value);
  // const name = user.user.name.split(' ')

  // const [pointsCurrently, setPointsCurrently] = useState(user.account.value);

  const handleProductSelect = () => {
    setModalIsVisible(modalIsVisible == 'flex' ? 'none' : 'flex');
    setBorderRadius(borderRadius == 0 ? 10 : 0);
  };

  async function payProducts() {
    const response = await api
      .post(`order/carts/paid/${purchase.item.id}`)
      .then(() => {
		return Alert.alert('Pagamento', 'Pagamento realizado com sucesso');
	  })
      .catch(error => {
        if (error.response.status === 400) {
          return Alert.alert('Pontos Insuficientes', 'Pagamento não realizado');
        }
      });
  }

   async function cancelar() {
		const response = await api.delete(`/order/carts/${purchase.item.id}`)
		.then(() => {
			return Alert.alert("Compra cancelada")
		})
		.catch((error) => {
			console.log(error)
			return Alert.alert("Algo deu errado")
		})
  }

  return (
    <View>
      <Box
        bgColor="#C6C6C6"
        mr={25}
        ml={25}
        borderBottomStartRadius={borderRadius}
        borderBottomEndRadius={borderRadius}
        borderTopEndRadius={10}
        borderTopStartRadius={10}
        mt={10}>
        <TouchableOpacity onPress={() => handleProductSelect()}>
          <HStack alignItems="center" justifyContent="space-between">
            <TitleWithoutMargin
              name={`Carrinho #${purchase.item.id}`}></TitleWithoutMargin>
            <Icon
              as={ChevronDown}
              size="xl"
              color="#000"
              accessible
              accessibilityLabel="Icone abrir compra"
              mr={25}
              mt={10}
            />
          </HStack>
        </TouchableOpacity>
      </Box>

      <Box
        display={modalIsVisible}
        bgColor="#C6C6C6"
        mr={25}
        ml={25}
        mb={10}
        borderBottomStartRadius={10}
        borderBottomEndRadius={10}
        borderTopEndRadius={borderRadius}
        borderTopStartRadius={borderRadius}>
        {purchase.item.product.map(item => {
          return (
            <HStack mr={25} ml={25} mt={15} justifyContent="space-between" key={item.id}>
              <Text w={100}>{item.name}</Text>
              <Text w={100}>{item.value} Pontos</Text>
              <Text w={100}>{purchase.item.dateTime.slice(0, 10)}</Text>
            </HStack>
          );
        })}

        <HStack justifyContent="space-between" mr={40} ml={40} mt={20} mb={10}>
          <Text>{purchase.item.value} Total</Text>
          <Text>Status: {purchase.item.status}</Text>
        </HStack>

		{purchase.item.status == "PENDING" ? 
			<HStack justifyContent="flex-end" mt={20} mb={10} ml={20} mr={20}>
			<TouchableOpacity onPress={() => cancelar()}>
				<Box
				w={100}
				h={27}
				mr={10}
				bgColor="#C40601"
				alignItems="center"
				justifyContent="center"
				borderRadius={5}>
				<Text color="#fff">Cancelar</Text>
				</Box>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => payProducts()}>
				<Box
				w={100}
				h={27}
				mr={10}
				bgColor="#C40601"
				alignItems="center"
				justifyContent="center"
				borderRadius={5}>
				<Text color="#fff">Finalizar</Text>
				</Box>
			</TouchableOpacity>
			</HStack>
		 : ""}
      </Box>
    </View>
  );
}

export default DropBox;
