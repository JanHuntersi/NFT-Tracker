import { Link } from "react-router-dom";
import { Link as UiLink, Heading, GridItem } from "@chakra-ui/react";
export default function NotFoundPage(){
return(
    <GridItem
    colStart={0.5}
    colSpan={3}
    p={6}
    >
       <Heading as="h1" mt="3" mb="6">
         404 PAGE NOT FOUND
           </Heading> 
           <Link to="/">
            <UiLink> Back to main page</UiLink>
        </Link>
    </GridItem>
);
}