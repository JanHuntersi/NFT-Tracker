import { Button, CircularProgress, FormControl,Box, FormLabel,Input,GridItem, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { useNFTBalances } from "react-moralis";
import ErrorMessage from "../ErrorMessage";



export default function NftTest(){
 

    const { getNFTBalances, data, error } = useNFTBalances();
    const [nftAddress,setAddress] = useState(null)
    const [isLoading,setLoading] = useState(false)
    const [numOfImages,setNumOfImages] = useState(15);

    function  handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        console.log(`Value je ${nftAddress}`);
        getNFTBalances({ params: { address:nftAddress },
        onSuccess:() =>{console.log(data.result) },
        onError:() =>{console.log("napak bila")},
        onComplete:() => {setLoading(false)}
     })
     //.then((mydata) =>console.log(JSON.stringify(mydata,null,2)))
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
          
                          <SimpleGrid minChildWidth='120px' spacing='40px'>
  <Box bg='tomato' height='80px'></Box>
  <Box bg='tomato' height='80px'></Box>
  <Box bg='tomato' height='80px'></Box>
  <Box bg='tomato' height='80px'></Box>
  <Box bg='tomato' height='80px'></Box>
  <Box bg='tomato' height='80px'></Box>
</SimpleGrid>

{data && data.total!=0 &&  <>{data.result.map(el =>(
    <p>{el.token_address}</p>
))}
</>}

{data && data.total!=0 &&  <>{data.result.map(el =>(
    <p>{el.token_address}</p>
))}
</>}


       </GridItem>
      
       </>
    )
}