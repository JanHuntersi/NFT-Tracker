import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function GoBack() {
	const navigate = useNavigate();
	function goToPreviusPage() {
		navigate(-1);
	}

	return (
		<Button
			colorScheme="blue"
			position="center"
			mt="4"
			size="md"
			onClick={goToPreviusPage}
		>
			Back to previus page
		</Button>
	);
}
