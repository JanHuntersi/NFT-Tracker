import {
	Button,
	CircularProgress,
	FormControl,
	Center,
	FormLabel,
	Input,
	GridItem,
	SimpleGrid,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNFTBalances } from "react-moralis";
import ErrorMessage from "../ErrorMessage";
import ForLoop from "../ForLoop";
import NftImage from "../NftImage";


export default function NftTest() {

	const { getNFTBalances, data, error } = useNFTBalances();
	const [nftAddress, setAddress] = useState(null);
	const [isLoading, setLoading] = useState(false);
    const [showButton,setShowButton] =useState(true)
    const[disabled,setDisabled] = useState(false)

    const [numOfNftShowed, setNumOfNftShowed]= useState(15);   //How many nfts will user be able to see on the webpage
    const [numOfNftLength, setnumOfNftLength] = useState(0); //number of nfts loop will show
    const [nftStartNum,setNftStartNum] = useState(0)   //starting iterator in the loop



//setNumOfNftShowed()
//user in a dropdown menu selects how many nfts does he want to see







    function showMore(){
        setNftStartNum(numOfNftLength);  //loop will start at this integer, -1 because its an array

        if((data.total-numOfNftLength)>5){  //Show x more nfts 
            setnumOfNftLength(numOfNftLength+5)
        }else if((data.total-numOfNftLength)<5 && (data.total-numOfNftLength)>0){ //number of nfts is less than x
            setnumOfNftLength(numOfNftLength+(data.total-numOfNftLength))
        }else{ //all nfts have been showed -> disable button
            setShowButton(false)
        }
    }

	function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);


		console.log(`Value je ${nftAddress}`);
		getNFTBalances({
			params: { address: nftAddress },
			onSuccess: () => {
				console.log("dela");
			},
			onError: () => {
				console.log("napak bila");
			
			},
			onComplete: () => {
				setLoading(false);
				
			},
		})
			.then((mydata) => {
				if (mydata.total < numOfNftShowed) {
					console.log("manj kot 15 nft");
					setnumOfNftLength(mydata.total);
                    setShowButton(false)
				} else {
					setnumOfNftLength(numOfNftShowed); //set 15
				}
				return mydata;
			})

			.then((mydata) => console.log(JSON.stringify(mydata, null, 2)));
			
		//  .then(console.log(data.total));
	}

	//{data && data.total!=0 && <>{JSON.stringify(data,null,2)}</>}

	return (
		<>
			<GridItem
				colStart={[2, null, null, 2, null, null]}
				colSpan={(3, null, null, 1, null, null)}
			>
				<p>0x67425e833b3ba8970636d5fb18134487f52aac59</p>
				<form onSubmit={handleSubmit}>
					{error && (
						<ErrorMessage messsage={"Napaka pri pridobivanju podatkov"} />
					)}
					{data && data.total == 0 && (
						<ErrorMessage messsage={"Napaka pri pridobivanju podatkov"} />
					)}
					<FormControl isRequired>
						<FormLabel> Enter Users Address</FormLabel>
						<Input
							type="text"
							placeholder="enter address here"
							size="lg"
							onChange={(event) => setAddress(event.currentTarget.value)}
						></Input>
						<Button variant="outline" type="submit">
							{isLoading ? (
								<CircularProgress isIndeterminate size="24px" color="teal" />
							) : (
								"Fetch!"
							)}
						</Button>
					</FormControl>
				</form>
			</GridItem>
           
          
            <p>Num of curr length:{numOfNftLength}</p>
            
			<GridItem colStart={1} colSpan={3} p={3} h="sm">
            <ForLoop nftStartNum={nftStartNum} numOfNftLength={numOfNftLength} data={data}/>
                {numOfNftLength>0 && showButton &&
                            <Center>
                                <Button disabled={disabled} onClick={() => {
                                showMore()
                                setDisabled(true);
                                setTimeout(()=>{
                                    setDisabled(false)
                                },2000)}
                                } colorScheme={"cyan"} size="lg">Show more</Button>
                            </Center>}

	
			</GridItem>
			
            
		</>
	);
}
