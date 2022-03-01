import { SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NftImage from "./NftImage";

export default function ForLoop({ nftStartNum,numOfNftLength, data }) {

	const [content, setContent] = useState([]);

	useEffect(() => {
		for (let i = nftStartNum; i < numOfNftLength; i++) {
			console.log("loopii");
			if (data.result[i].name != " " && data.result[i].metadata != null) {
				setContent((content) => [...content, data.result[i]]);
			}
		}
	}, [numOfNftLength]);

	return (
		<SimpleGrid minChildWidth="300px"  spacing="40px">
			{numOfNftLength != 0 &&
				content.map((el) => (
					<NftImage
						key={el.block_number_minted + el.token_address + el.token_id}
						nft={el}
						saved={false}
					/>
				))}
		</SimpleGrid>
	);
}
