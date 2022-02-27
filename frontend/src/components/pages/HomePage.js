//To be added
//Show liked nfts

import { Center, GridItem, Heading,Button, SimpleGrid } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";

import 'firebase/database'

export default function NftDashboard (){


 
    const {user,logout} = useAuth()
    const {db} = useAuth()
   
    const name = user.email
    console.log("Hello",name.replaceAll('.',''))

    const  addToDB=() =>{
        /*
        const usersRef = db.ref('users').child(name.replaceAll('.',''))
        const user ={
            metadata:{
                image: "ipfs://QmUgmDp4mGR7K4qw3V2aDwo6cjsJDwghVayRdtmg2jbFXr/8232.png",
                name:"Heart #8232",
                description:"The Heart Project is a community-run creative studio which enables passionate lovers of creativity to shape the art we interact with. 10,000 unique tokens on the Ethereum-based blockchain will serve as membership passes which grant access to creative contribution and shared ownership of our group creations. The Heart Project Creative Studio is designed to produce media with thousands of contributors on every project and grants ownership of our shared creations.",
            },
            token_address:"0x5ad0f6563f83b68b69ed3db5dc69e0748a8a2e5c",
            token_id:'4226',
            block_number_minted:44 

        }
        usersRef.push(user)
        */
    }

    return(
<>
        <GridItem colStart={1} colSpan={3} height="5">
        <Heading m={3} textAlign="center" size="xl">NFT Tracker</Heading>
        
        <Heading m={3} textAlign="center" size="md">Hello {user.email}!</Heading>
        <Heading m={3} textAlign="center" size="sm">Liked NFTs coming soon!</Heading>
       <Center> <Button m={3} onClick={logout}>Click To Log Out</Button></Center>
        </GridItem>
       
     
        </>
    );
}


