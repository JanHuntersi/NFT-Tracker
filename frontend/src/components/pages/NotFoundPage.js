import { Link, Navigate } from "react-router-dom";
import { Link as UiLink, Heading, GridItem } from "@chakra-ui/react";
export default function NotFoundPage(){


function goToPreviusPage(){

  Navigate(-1);
}
  return(
    <GridItem
    colStart={0.5}
    colSpan={3}
    p={6}
    >
       <Heading as="h1" mt="3" mb="6">
         404 PAGE NOT FOUND
           </Heading> 
                      <UiLink onClick={goToPreviusPage}> Back to main page</UiLink>
        
    </GridItem>
);
}