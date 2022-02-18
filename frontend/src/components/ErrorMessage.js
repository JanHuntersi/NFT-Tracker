import { Alert,AlertIcon,AlertDescription,Box } from "@chakra-ui/react"


export default function ErrorMessage({messsage}){
    return(
       <Box my={4}>
           <Alert status="error">
                <AlertIcon />
                <AlertDescription>{messsage}</AlertDescription>   
            </Alert> 
       </Box>
        );
}