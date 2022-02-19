import { Button, CircularProgress, FormControl,Box, FormLabel,Input,GridItem, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { useNFTBalances } from "react-moralis";
import ErrorMessage from "../ErrorMessage";
import NftImage from "../NftImage";



export default function NftTest(){

    /* 
   {data && data.total!=0 &&  data.result.map(el =>(
    <p key={el.token_id}>{el.token_address}</p>
))}
    */


    const { getNFTBalances, data, error } = useNFTBalances();
    const [nftAddress,setAddress] = useState(null)
    const [isLoading,setLoading] = useState(false)
    const [numOfNftLength, setnumOfNftLength] = useState(0)
    

    function  handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        console.log(`Value je ${nftAddress}`);
        getNFTBalances({ params: { address:nftAddress },
        onSuccess:() =>{console.log("dela")},
        onError:() =>{console.log("napak bila")},
        onComplete:() => {setLoading(false)}
     })
     .then((mydata)=>{
if(mydata.total < 15){
    console.log("manjse ke ")
    setnumOfNftLength(mydata.total)}else{
        setnumOfNftLength(15)   //set 15
    }
    return mydata})
     .then((mydata) =>console.log(JSON.stringify(mydata,null,2)))
   //  .then(console.log(data.total));
    }

//{data && data.total!=0 && <>{JSON.stringify(data,null,2)}</>}


    return(
        <>
        <GridItem
        colStart={[2,null,null,2,null,null]}
        colSpan={3,null,null,1,null,null}
        >
   
        
<p>0x67425e833b3ba8970636d5fb18134487f52aac59</p>
        <form onSubmit={handleSubmit}>
            {error && <ErrorMessage messsage={"Napaka pri pridobivanju podatkov"} />}
            {data && data.total==0 && <ErrorMessage messsage={"Napaka pri pridobivanju podatkov"} />}
        <FormControl isRequired>
        <FormLabel> Enter Users Address</FormLabel>
        <Input
        type="text"
        placeholder="enter address here"
        size="lg"
        onChange={event => setAddress(event.currentTarget.value)}>
        </Input>
        <Button
        variant="outline"
        type="submit"
        >
            {isLoading ? (
                <CircularProgress
                isIndeterminate
                size="24px"
                color="teal"
                />
            ): (
                "Fetch!"
            )}
        </Button>
        </FormControl>
        </form>
        </GridItem>
       
     
         <GridItem
         colStart={1}
         colSpan={3}
         p={3}
         
         h="sm"
         >
          
             <p>{numOfNftLength}</p>             

{

    (()=>{
        let content = []
        for(let i=0; i< numOfNftLength; i++){
            if(data.result[i].name != " " && data.result[i].metadata != null){
                content.push(data.result[i])
            }
            
        }
        return(
            <SimpleGrid minChildWidth='300px' spacing='40px'>
            {content.map((el) =>
            <NftImage key={el.block_number_minted+el.token_address+el.token_id} nft={el} />
            )}
            </SimpleGrid>
        )
    })()
}



       </GridItem>
      
       </>
    )
}