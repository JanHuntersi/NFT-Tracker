import { Image, Box, Heading, Spinner, Button, } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate, useHistory } from "react-router-dom";

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
			console.log(nft)
			

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
		<Box>
			<Heading>{nft.name}</Heading>
			{loading && <Spinner />}
			<Image
				onLoad={imageLoaded}
				onError={imageLoaded}
				src={src}
				fallbackSrc="https://via.placeholder.com/300"
			></Image>
			<p>{nft.metadata.description}</p>
		<Button onClick={showMore} colorScheme={"whatsapp"} size={"lg"}>Show more
		
		</Button>
		</Box>
		
	);
}
