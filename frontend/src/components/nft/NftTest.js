import {
	Button,
	CircularProgress,
	FormControl,
	Center,
	FormLabel,
	Input,
	GridItem,
	Heading,
	Flex,
	useClipboard,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNFTBalances } from "react-moralis";
import ErrorMessage from "../ErrorMessage";
import ForLoop from "./ForLoop";
import NftImage from "./NftImage";

import {walletAddress} from "../../Data/accounts"

export default function NftTest() {
	const { getNFTBalances, data, error } = useNFTBalances();
	const [nftAddress, setAddress] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [showButton, setShowButton] = useState(true);
	const [buttonLoading, setButtonLoading] = useState(false);

	const [numOfNftShowed, setNumOfNftShowed] = useState(15); //How many nfts will user be able to see on the webpage
	const [numOfNftLength, setnumOfNftLength] = useState(0); //number of nfts loop will show
	const [nftStartNum, setNftStartNum] = useState(0); //starting iterator in the loop

	//Used for copy clipboard
	const [addressValue,setAddressValue]= useState("0x67425e833b3ba8970636d5fb18134487f52aac59")
	const {hasCopied,onCopy} = useClipboard(addressValue)

	function getRandomAddress(){
		let addresArray =walletAddress
		setAddressValue(addresArray[Math.floor(Math.random()*addresArray.length)]);
		onCopy()
	}

		//TODO
	//user in a dropdown menu selects how many nfts does he want to see

	function showMore() {
		setNftStartNum(numOfNftLength); 

		if (data.total - numOfNftLength > 10) {
			//Show x more nfts
			console.log("10 more nfts")
			setnumOfNftLength(numOfNftLength + 10);
		} else if (
			data.total - numOfNftLength < 10 &&
			data.total - numOfNftLength > 0
		) {
			//number of nfts is less than x
			setnumOfNftLength(numOfNftLength + (data.total - numOfNftLength));
		} else {
			//all nfts have been showed -> disable button
			setShowButton(false);
		}
	}

	function handleSubmit(e) {

		e.preventDefault();
		setLoading(true);

		console.log(`Value je ${nftAddress}`);
		getNFTBalances({
			params: { address: nftAddress },
			onSuccess: () => {
				console.log("dela");
			},
			onError: () => {
				console.log("napak bila");
			},
			onComplete: () => {
				setLoading(false);
			},
		})
			.then((mydata) => {
				if (mydata.total < numOfNftShowed) {
					console.log("manj kot 15 nft");
					setnumOfNftLength(mydata.total);
					setShowButton(false);
				} else {
					setnumOfNftLength(numOfNftShowed); //set 15
				}
				return mydata;
			})

			.then((mydata) => console.log(JSON.stringify(mydata, null, 2)));

		//  .then(console.log(data.total));
	}

	//{data && data.total!=0 && <>{JSON.stringify(data,null,2)}</>}

	return (
		<>
			<GridItem colStart={1} colSpan={3} p>
					<Heading textAlign="center" size="xl">Get NFT's From Address</Heading>
			</GridItem>
			
			<GridItem m={2} 
				colStart={{base:'1',md:'2',lg:'2',xl:'2'}}
				colSpan={{base:'3',md:'1',lg:'1',xl:'1'}}
			>
				
				

			
				<form  onSubmit={handleSubmit}>
					{error && (
						<ErrorMessage messsage={"Napaka pri pridobivanju podatkov"} />
					)}
					{data && data.total == 0 && (
						<ErrorMessage messsage={"Napaka pri pridobivanju podatkov"} />
					)}
					<FormControl isRequired>
						<FormLabel fontSize={"xl"}> Enter Users Address</FormLabel>
						<Input
							type="text"
							placeholder="enter address here"
							size="lg"
							onChange={(event) => setAddress(event.currentTarget.value)}
						></Input>

				<Flex justifyContent={"center"} p="4" mt={2}>
						<Button mr={2} colorScheme={'teal'} fontSize={"lg"} type="submit">
							{isLoading ? (
								<CircularProgress isIndeterminate size="24px" color="teal" />
							) : (
								"Get NFTs"
							)}
						</Button>
						<Button ml={2}
			 fontSize={"lg"} colorScheme={'blue'}
					onClick={()=>getRandomAddress()} >
					{hasCopied ? 'Adress Copied' : 'Copy Random Adress'}
					</Button>
					</Flex>
					</FormControl>
				</form>
			</GridItem>

			<GridItem colStart={1} colSpan={3} m={2} p={3} h="sm">
				<ForLoop
					nftStartNum={nftStartNum}
					numOfNftLength={numOfNftLength}
					data={data}
				/>
				{numOfNftLength > 0 && showButton && (
					<Center mt={9}>
						<Button
						 mb={9}
						 isLoading={buttonLoading}
							
							onClick={() => {
								showMore();
								setButtonLoading(true);
								setTimeout(() => {
									setButtonLoading(false);
								}, 2000);
							}}
							colorScheme="blue"
							size="lg"
							p={8}
						>
							Show More NFT's
						</Button>
					</Center>
				)}
			</GridItem>
		</>
	);
}
