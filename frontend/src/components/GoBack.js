import { Button, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function GoBack() {
	const navigate = useNavigate();
	function goToPreviusPage() {
		navigate(-1);
	}

	return (
		<Center mt={3}>

		
		<Button
			colorScheme="blue"
			position="center"
			m="3"
			size="lg"
			onClick={goToPreviusPage}
		>
			Back to previus page
		</Button>
		</Center>
	);
}
