import { GridItem, Heading, Image, Spinner,Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GoBack from "../GoBack";

export default function NftPage() {
	//nft is an object with data about that nft
	const location = useLocation();
	const nft = location.state.nft;
	console.log(JSON.stringify(nft, null, 2));

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

	return (
		<GridItem
			colStart={1}
			colSpan={3}
		>
				<Box  p={5} minWidth="50%" maxWidth="70%" ml={"15%"} shadow="dark-lg"  borderRadius={"30"} justifyContent="center">
			<Heading p={3}>{nft.name}</Heading>
			<Heading pl={3} pt={1}size="sm">{nft.metadata.name}</Heading>
			{loading && <Spinner />}
			<Image
			p={3}
			fit={"cover"}
			verticalAlign={"center"}

				onLoad={imageLoaded}
				onError={imageLoaded}
				src={src}
				fallbackSrc="https://via.placeholder.com/300"
			></Image>
			<p>{nft.metadata.description}</p>
			<GoBack />
			</Box>
		</GridItem>
	);
}
