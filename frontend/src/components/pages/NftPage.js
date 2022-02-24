import { GridItem,Heading, Image, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GoBack from "../GoBack";

export default function NftPage() {

	//nft is an object with data about that nft
	const location = useLocation()
	const nft = location.state.nft
	console.log(JSON.stringify(nft,null,2))

	const [src, setSrc] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {

		
		if (nft.metadata.image.startsWith("ipfs")) {
			setSrc(
				"https://ipfs.moralis.io:2053/ipfs/" +
					nft.metadata.image.split("ipfs://").slice(-1)
			);
		} else {
			setSrc(nft.metadata.image + "?format=json");
		}
	}, [src]);

	const imageLoaded = () => {
		setLoading(false);
	};


  
	return(
		<GridItem
			colStart={[2, null, null, 2, null, null]}
			colSpan={(3, null, null, 1, null, null)}
		>
            
			<Heading>{nft.name}</Heading>
			<Heading size="sm">{nft.metadata.name}</Heading>
			{loading && <Spinner />}
			<Image
				onLoad={imageLoaded}
				onError={imageLoaded}
				src={src}
				fallbackSrc="https://via.placeholder.com/300"
			></Image>
			<p>{nft.metadata.description}</p>
			<GoBack />

		</GridItem>
	);
}
