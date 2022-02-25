import { Center, GridItem, Heading,Button, Input } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";

import 'firebase/database'
import { useEffect } from "react";


export default function NftDashboard (){

    
    const {user} = useAuth()
    const {db} = useAuth()
   
    const name = user.email
    console.log("Hello",name.replaceAll('.',''))

    const  addToDB=() =>{
        const usersRef = db.ref('users').child(name.replaceAll('.',''))
        const user ={
            metadata:{
                image: "ipfs://QmUgmDp4mGR7K4qw3V2aDwo6cjsJDwghVayRdtmg2jbFXr/8232.png",
                name:"Heart #8232",
                description:"The Heart Project is a community-run creative studio which enables passionate lovers of creativity to shape the art we interact with. 10,000 unique tokens on the Ethereum-based blockchain will serve as membership passes which grant access to creative contribution and shared ownership of our group creations. The Heart Project Creative Studio is designed to produce media with thousands of contributors on every project and grants ownership of our shared creations.",
            },
            token_address:"0x5ad0f6563f83b68b69ed3db5dc69e0748a8a2e5c",
            token_id:'4226'

        }
        usersRef.push(user)
    }


    useEffect(()=>{
        db.ref('users').child("jansernec@gmailcom").once('value').then(function(snapshot) {
          console.log(snapshot.key)
          snapshot.forEach(function(snapshot1) {
            console.log(snapshot1.key); //
            console.log("ime: ",snapshot1.val().name," price: ",snapshot1.val().price)
            //snapshot1.forEach(function(snapshot2) {
              //  console.log(snapshot2.val()); // 
            //}) 
        })
    })
    })


    return(
<>
        <GridItem colStart={1} colSpan={3} height="5">
        <Heading textAlign="center" size="xl">NFT Tracker</Heading>
        
        <Heading textAlign="center" size="md">Hello {user.email}!</Heading>
               <p></p>
        <Button onClick={()=>addToDB()}>Click me</Button>

        
        
</GridItem>
        
       
        </>
    );
}