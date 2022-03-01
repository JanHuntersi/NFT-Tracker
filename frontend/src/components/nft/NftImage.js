import { Image, Box, Heading, Spinner, Button, Center,AspectRatio } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import 'firebase/database'
import { MdSettings } from 'react-icons/md'
import { AiOutlineHeart,AiFillHeart,AiFillCloseCircle,AiOutlineCloseCircle} from "react-icons/ai";

//if image starts with ipfs:// -> we need to swap  with https://ipfs.moralis.io:2053/ipfs/<imageHash>

export default function NftImage({ nft,saved }) {
	const [src, setSrc] = useState(null);
	const [loading, setLoading] = useState(true);
	const [liked,SetLiked] = useState(false)

	const {user,logout} = useAuth()
    const {db} = useAuth()

    const name = user.email
    //console.log("Hello",name.replaceAll('.',''))
	//console.log(nft.metadata.description)

	const changedName=(name.replaceAll('.',''));
	const nftId =(nft.block_number_minted+nft.token_id+nft.token_address)

	const  addToDB=() =>{



		console.log("Called addToDB!");
		
			if(saved){  //nft is saved to firebase it will be removed
				console.log("Image saved, removing From Firebase!!!!!!")
		db.ref(`users`).child(changedName).child(nftId).remove();
			}else{


		if(liked==false){
				SetLiked(true);
				
		const usersRef = db.ref(`users`).child(changedName).child(nftId)
		const user ={
			metadata:{
				image: nft.metadata.image,
				name: nft.metadata.name,
				description: nft.metadata.description,
			},
			token_address:nft.token_address,
			token_id:nft.token_id,
			block_number_minted:nft.block_number_minted,
		}
		usersRef.push(user)


	}else{
		//TODO remove from firebase
		console.log("Removing From Firebase!!!!!!")
		SetLiked(false);
		db.ref(`users`).child(changedName).child(nftId).remove();
	}
	}
}


	//navigate user to a seperate page with nft info
	const navigate = useNavigate();
	console.log(nft)
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
		} else if (!nft.metadata.image.includes("?format=json")){  //if it doesnt include then add
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
			<AspectRatio >
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
		{!saved &&<Button m="3"  onClick={addToDB}  border="5px" colorScheme={liked ? "red" : "green"} size={"lg"}>{liked ?<AiOutlineCloseCircle size={25}/>: <AiOutlineHeart size={25} /> }</Button>}
		{saved && <Button m="3"  onClick={addToDB}  border="5px" colorScheme={"red"} size={"lg"}><AiOutlineCloseCircle size={25}/></Button>}
		</Center>
		</Box>
		
	);
}
