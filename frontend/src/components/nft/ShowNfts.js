import { Button, Heading, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

export default function ShowNfts() {
	function fetchNftFromOwnerAddr(ownerAddr) {
		console.log("Calling fetchNftFromOwnerAddr");
		setLoading(true);
		fetch(`${baseURL}?owner=${ownerAddr}`, requestOptions)
		.then((response) =>{
			if (response.status==200){
				
				return response.json()
			}else{
				throw new Error("Wrong address")
			}
		})	
            
		//	.then((response) => JSON.stringify(response.ownedNfts))
			//  .then(response => JSON.stringify(response, null, 2))
			.then((response) => response.ownedNfts)
 //           .then((response) => response.map(el => setData(data =>[...data,el])))

		.catch((err) => setError(err.message))
			
//.catch((err) => console.log(err))
			.finally(() => {
				setLoading(false);
				//       data.map(el => console.log("el"))
			});
	}

function handleSubmit(e){
	e.preventDefault();
	console.log(`Value je  ${address}`);
	fetchNftFromOwnerAddr(address)
}
	const [address,SetAddress] = useState(null);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	var requestOptions = {
		method: "GET",
		redirect: "follow",
	};

	const baseURL = "https://eth-mainnet.alchemyapi.io/v2/bM_aDqTBfvhmtNlz330E67M-Yw2GR_uO";

	return (
		<>
			<Heading>Hello from ShowNfts.js</Heading>
			<p>0x67425e833b3ba8970636d5fb18134487f52aac59</p>
			
			<form onSubmit={handleSubmit}>
			<FormControl isRequired>
			<FormLabel>Eth address</FormLabel>
			<Input
			type="text"
			placeholder="example: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
			size="lg"
			onChange={event => SetAddress(event.currentTarget.value)}
			>
			</Input>
			<Button
			variant="outline"
		
			type="submit"
			>
Send
			</Button>
			</FormControl>
			</form>
			
			{loading && <p>Loading fetch call</p>}
			{error && <p>{error}</p>}
            {data.map(el => (
                <p key={el.id.tokenId}>{el.contract.address}</p>
            ))}
			
		</>
	);
}
