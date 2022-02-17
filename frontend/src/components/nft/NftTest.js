import { Button, CircularProgress, FormControl, FormLabel,Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNFTBalances } from "react-moralis";



export default function NftTest(){
 

    const { getNFTBalances, data, error } = useNFTBalances();
    const [nftAddress,setAddress] = useState(null)
    const [isLoading,setLoading] = useState(false)

    function  handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        console.log(`Value je ${nftAddress}`);
        getNFTBalances({ params: { address:nftAddress },
        onSuccess:() =>{ console.log("delas")},
        onError:() =>{console.log("napak bila")},
        onComplete:() => {setLoading(false)}
        
     })
    }

    return(
        <div>
        {error && <>{"Napaka"}</>}
        
<p>0x67425e833b3ba8970636d5fb18134487f52aac59</p>
        <form onSubmit={handleSubmit}>
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


       {data && data.total!=0 && <>{data.total}</>}
        <p>{data && data.total==0 && <>Slabi si</> }</p>
      </div>
    )
}