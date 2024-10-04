import { Heading, View } from "@gluestack-ui/themed";

type GetProps = {
    name: string;
  };

function TitleWithoutMargin(props: GetProps){
    return(
        <View ml={25} paddingTop={20}>
            <Heading color="#000" fontWeight="$bold" fontSize={32} mb={5}>
                {props.name}
            </Heading>
        </View>
    )
}

export default TitleWithoutMargin;