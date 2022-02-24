import { useNavigate } from "react-router-dom";
import { Heading, GridItem, Button, Center } from "@chakra-ui/react";
import GoBack from "../GoBack";



export default function NotFoundPage() {
	let navigate = useNavigate();
	function goToPreviusPage() {
		navigate(-1);
	}
	return (
		<GridItem colStart={1} colSpan={3} p={6}>
			<Heading as="h1" textAlign="center" mt="3" mb="6">
				404 PAGE NOT FOUND
			</Heading>
			<Center>
				<GoBack />				
			</Center>
		</GridItem>
	);
}
