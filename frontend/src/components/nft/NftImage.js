import { Image, Box, Heading, Spinner, Button, Center,AspectRatio } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//if image starts with ipfs:// -> we need to swap  with https://ipfs.moralis.io:2053/ipfs/<imageHash>


export default function NftImage({ nft }) {
	const [src, setSrc] = useState(null);
	const [loading, setLoading] = useState(true);

	//navigate user to a seperate page with nft info
	const navigate = useNavigate();

	const showMore = () => {
		navigate("/nftPage",{state:{nft:nft}})
	}

	useEffect(() => {
		if(nft.metadata != null){
		if (nft.metadata.image.startsWith("ipfs")) {
			setSrc(
				"https://ipfs.moralis.io:2053/ipfs/" +
					nft.metadata.image.split("ipfs://").slice(-1)
			);
		} else {
			setSrc(nft.metadata.image + "?format=json");
		}
	}
	}, [src]);

	const imageLoaded = () => {
		setLoading(false);
	};

	return (
		<Box  p={5}  shadow="dark-lg"  borderRadius={"30"}>
			
			{loading && <Spinner />}
			<AspectRatio maxW='400px' ratio={4 / 3}>
			<Image
			fit={"cover"}
			verticalAlign={"center"}
				onLoad={imageLoaded}
				onError={imageLoaded}
				src={src}
				fallbackSrc="https://via.placeholder.com/400"
			></Image>
			</AspectRatio>
			<Box m="2" width={"90%"} whiteSpace={"nowrap"}textOverflow={"ellipsis"} overflow={"hidden"} fontSize={"lg"}>{nft.metadata.name}</Box>
		<Center>
		<Button m="3"  onClick={showMore}  border="5px" colorScheme={"blue"} size={"lg"}>More Details
		</Button>
		</Center>
		</Box>
		
	);
}
