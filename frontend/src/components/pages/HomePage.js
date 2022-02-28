//To be added
//Show liked nfts

import { Center, GridItem, Heading,Button, SimpleGrid } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import 'firebase/database'
import { useEffect, useState } from "react";
import NftImage from "../nft/NftImage";

export default function NftDashboard (){

    const [data,setData] = useState([]);
    const [arrayLength,setArrayLength] = useState(0)
    const {user,logout} = useAuth()
    const {db} = useAuth()

    const name = user.email
    console.log("Hello",name.replaceAll('.',''))
 

    useEffect(()=>{
        db.ref(`users/${name.replaceAll('.','')}`).once('value',function(snapshot){
            console.log(snapshot);
            snapshot.forEach(function(childSnapshot){
                console.log(childSnapshot.val());
                setData((data) => [...data,childSnapshot.val()])
                setArrayLength(arrayLength+1);    
            })
        })
        console.log("mounted bitch!")    
    },[])
   /*
    db.ref('users').once('value',function(snapshot){
        console.log(snapshot.val());
        setData(snapshot.val());
    })
*/
    
    return(
<>
        <GridItem colStart={1} colSpan={3} height="5" mb={"40"}>
        <Heading m={3} textAlign="center" size="xl">NFT Tracker</Heading>
        
        <Heading m={3} textAlign="center" size="md">Hello {user.email}!</Heading>
        <Heading m={3} textAlign="center" size="sm">Liked NFTs coming soon!</Heading>
       <Center> <Button m={3} onClick={logout}>Click To Log Out</Button></Center>
        </GridItem>
        <GridItem m={5} colStart={1} colSpan={3} m={2} p={3} h="sm">
        <SimpleGrid minChildWidth="300px"  spacing="40px">
			{arrayLength != 0 &&
				data.map((el) => (
					<NftImage
						key={ + el.token_address + el.token_id}
						nft={el}
					/>
				))}
		</SimpleGrid>
        </GridItem>
     
        </>
    );
}


