import { GridItem, Heading } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";



export default function NftDashboard (){

    const {user} = useAuth()

    return(
        <GridItem
        colStart={[1,null,null,2,null,null]}
        colSpan={3,null,null,1,null,null}
        p={6}
        >
           <Heading as="h1" mt="3" mb="6">
              Nft Dashboard 
               </Heading> 
               <p>Hello {user.email}</p>
        </GridItem>
    );
}