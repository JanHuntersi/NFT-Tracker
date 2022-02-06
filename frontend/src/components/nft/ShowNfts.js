import { Button, Heading } from "@chakra-ui/react";
import { useState } from "react";




export default function ShowNfts(){

    function fetchNftFromOwnerAddr(ownerAddr){
        console.log("Calling fetchNftFromOwnerAddr")
        setLoading(true)
        fetch(`${baseURL}?owner=${ownerAddr}`, requestOptions)
        .then(response => response.json())
        .then(response => JSON.stringify(response.ownedNfts) )
       // .then(response => console.log(response))
        .then(response => setData(response))
        .catch(err => setError(err))
        .finally(() =>{
            setLoading(false);
     //       data.map(el => console.log("el"))
        })
        
    }

    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false)
    const [error, setError ] = useState(null)

    var requestOptions={
        method: 'GET',
        redirect: 'follow'
    };
    const baseURL = "https://eth-mainnet.g.alchemy.com/v2/demo/getNFTs/";    

    return(
        <>
        <Heading >Hello from ShowNfts.js</Heading>
<p>0x67425e833b3ba8970636d5fb18134487f52aac59</p>
<Button onClick={()=>fetchNftFromOwnerAddr("0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D")}>Get nfts</Button>
    {loading && (
        <p>Loading fetch call</p>
    )} 
    {error &&(
        <p>{error}</p>
    )}  
    
  {data&& (
  <p>{data}</p>
  )}
        </>
    );
}