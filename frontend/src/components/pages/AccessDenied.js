import {
	GridItem,
	Center,
	Heading,
	Link as UiLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";

export default function AccessDenied() {
	return (
		<Layout>
			<GridItem colStart={1} colSpan={3} row>
					<Heading as="h1" mt="6" mb="6" textAlign="center">
						Access was denied
					</Heading>
					<Center>
						<Link to="/">
							<UiLink> Back to main page</UiLink>
						</Link>
					</Center>		
			</GridItem>
		</Layout>
	);
}
