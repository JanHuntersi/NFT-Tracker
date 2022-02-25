import { GridItem,Box,Flex,Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

export default function Nav(){
    const {user,logout} = useAuth();

  
    return(
        <GridItem colStart={1} colSpan={3} p={3}>
             <Flex>
                {user && (
                    <>
                    <Link to='/dashboard'>
                        <Text fontSize="md" mr={8}>Home</Text>
                    </Link>
                     <Link to='/getNfts'>
                         <Text fontSize="md" mr={8}>Find Nfts</Text>
                     </Link>
                    <Box as="button" onClick={logout }>
                    <Text fontSize="md" mr={8}>Logout</Text>
                    </Box>
                    </>
                )}
                {!user &&(
                     <>
                     <Link to='/'>
                         <Text fontSize="md" mr={8}>Login</Text>
                     </Link>
                     </>
                )}
            </Flex>
       </GridItem>
    )
        
}

//33.34 youtube https://www.youtube.com/watch?v=8Xnpipa2k2M