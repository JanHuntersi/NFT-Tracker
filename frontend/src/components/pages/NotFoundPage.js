import { useNavigate } from "react-router-dom";
import { Heading, GridItem, Button, Center } from "@chakra-ui/react";
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
				<Button
					colorScheme="blue"
					position="center"
					mt="4"
					size="md"
					onClick={goToPreviusPage}
				>
					Back to previus page
				</Button>
			</Center>
		</GridItem>
	);
}
