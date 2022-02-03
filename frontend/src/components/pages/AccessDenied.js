import { Link as UiLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";


export default function AccessDenied(){
    return(
        <>        <p>acces was denied!</p>
        <Link to="/">
            <UiLink> Back to main page</UiLink>
        </Link>
        </>

        );
}