
import { useForm } from 'react-hook-form';
import { Heading, GridItem,Alert,AlertIcon,FormLabel,FormControl,Input,Button,} from '@chakra-ui/react';
import { useAuth } from '../../hooks/useAuth';

export default function LoginForm(){
    const {handleSubmit, register,  formState: { errors }, setError, formState} = useForm();  //Object destructuring

    const {sendSingInLinkToEmail} = useAuth();

    const onSubmit = async (data) => {
        console.log("v submit funkciji smo!")
        console.log(data.email)
        try{
await sendSingInLinkToEmail(data.email);
        }catch(error){
            setError('email',{
                type: 'manual',
                message:error.message
            })
        }
    }

    return(
<GridItem
    colStart={[1,null,null,2,null,null]}
    colSpan={3,null,null,1,null,null}
    p={6}>
<Heading as="h1" mb={6}>Login</Heading>
<form onSubmit={handleSubmit(onSubmit)}>
    <FormControl>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input name="email" placeholder="Email" ref={register()} />
        <Button mt={4} colorScheme={'teal'} isLoading={formState.isSubmitting} type="submit">Submit</Button>
    </FormControl>
</form>
</GridItem>
    );
}