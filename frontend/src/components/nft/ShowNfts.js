import { Button, Heading } from "@chakra-ui/react";
import { useState } from "react";

export default function ShowNfts() {
	function fetchNftFromOwnerAddr(ownerAddr) {
		console.log("Calling fetchNftFromOwnerAddr");
		setLoading(true);
		fetch(`${baseURL}?owner=${ownerAddr}`, requestOptions)
			.then((response) => response.json())
            //.then(response => )
			//.then(response => setData({data:response}))
		//	.then((response) => JSON.stringify(response.ownedNfts))
			//  .then(response => JSON.stringify(response, null, 2))
			.then((response) => response.ownedNfts)
     //   .then((response) => console.log(response))
            .then((response) => response.map(el => setData(data =>[...data,el])
            ))

			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
				//       data.map(el => console.log("el"))
			});
	}

function handleSubmit(event){
	event.preventDefault();
	console.log(`Value je  ${value}`);
}

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	var requestOptions = {
		method: "GET",
		redirect: "follow",
	};
	const baseURL = "https://eth-mainnet.g.alchemy.com/v2/demo/getNFTs/";

	return (
		<>
			<Heading>Hello from ShowNfts.js</Heading>
			<p>0x67425e833b3ba8970636d5fb18134487f52aac59</p>
			
			<form onSubmit={(fetchNftFromOwnerAddr("0x8d9a8e19b1275f8c3c9a0d57c69f3d330ebf979d"))}>

			</form>
			<Button
				onClick={() =>
					fetchNftFromOwnerAddr("0x8d9a8e19b1275f8c3c9a0d57c69f3d330ebf979d")
				}
			>
				Get nfts
			</Button>
			{loading && <p>Loading fetch call</p>}
			{error && <p>{error}</p>}
            {data.map(el => (
                <p key={el.id.tokenId}>{el.contract.address}</p>
            ))}
			
		</>
	);
}
