import { Heading,GridItem } from "@chakra-ui/react";

export default function Custom(){
return(<>
<GridItem
colStart={[3,null,null,2,null,null]}
colSpan={2}
>
<Heading as='h1' size='xl'>Nft tracker!</Heading>
</GridItem>

</>);
}