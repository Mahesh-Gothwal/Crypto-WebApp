import { Badge, Box, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../index";
import ErrorComponent from "./ErrorComponent";
import Chart from "./Chart";

const CoinDetails = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");

  const params = useParams()

  const currencySymbol =
  currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";


  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/${params.id}`
        );
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id]);

  if (error) return <ErrorComponent message={"Error While Fetching Coin Detail"} />;

  return (
    <Container maxW={"container.xl"}>{loading ? <Loader /> : <>
    <Box borderWidth={1} w={"full"}>
        <Chart currency={currencySymbol}/>
    </Box>

    <RadioGroup value={currency} onChange={setCurrency} p={8}>
          <HStack spacing={4}>
            <Radio value="inr">INR</Radio>
            <Radio value="usd">USD</Radio>
            <Radio value="eur">EUR</Radio>
          </HStack>
        </RadioGroup>

        <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
          <Text fontSize={"sm"} alignSelf={"center"} opacity={"0.7s"}>
            Last Updated On {" "} {Date(coin.market_data.last_updated).split("G")[0]}
          </Text>
          <Image src={coin.image.large} w={16} h={16} objectFit={"contain"}/>

          <Stat>
            <StatLabel>{coin.name}</StatLabel>
            <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
            <StatHelpText>
              <StatArrow type={coin.market_data.price_change_percentage_24h > 0?"increase":"decrease"}/>
              {coin.market_data.price_change_percentage_24h}%
            </StatHelpText>
          </Stat>

          <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
            {`#${coin.market_cap_rank}`}
          </Badge>

          <CustomBar 
          high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} 
          low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
          />

          <Box w={"full"} p={4}>
              <Item title={"Max Supply"} value={coin.market_data.max_supply}/>
          </Box>
        </VStack>
    </>
    }
    </Container>
  );
};

const Item = ({title, value})=>{
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
}


const CustomBar = ({high, low})=>{
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"}/>
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge  children={low} colorScheme={"red"}/>
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge  children={high} colorScheme={"green"}/>
    </HStack>
  </VStack>
}


export default CoinDetails;
