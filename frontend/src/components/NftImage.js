import { Image,Box, Heading, Spinner } from "@chakra-ui/react"
import { useState,useEffect } from "react"
//<Image src={}></Image>

//if image starts with ipfs:// -> we need to swap  with https://ipfs.moralis.io:2053/ipfs/<imageHash>

//


export default function NftImage({nft}){
    
const [src,setSrc] = useState(null)
const [loading,setLoading] = useState(true)

    useEffect(() => {
        console.log(nft.metadata)
      if(nft.metadata.image.startsWith("ipfs")){
          setSrc("https://ipfs.moralis.io:2053/ipfs/"+nft.metadata.image.split("ipfs://").slice(-1))
      }else{
          setSrc(nft.metadata.image+"?format=json");
      }

    
    }, [src])
    
    const imageLoaded = () => {
        setLoading(false);
    }
    
    

    return(
<Box>
<Heading>{nft.name}</Heading>
{loading && <Spinner />}
<Image onLoad={imageLoaded} onError={imageLoaded} src={src} fallbackSrc='https://via.placeholder.com/300'></Image>
<p>{nft.metadata.description}</p>

</Box>
        )
}