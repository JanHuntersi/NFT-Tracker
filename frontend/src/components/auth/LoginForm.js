
import { useForm } from 'react-hook-form';
import { Heading, GridItem,Alert,AlertIcon,FormLabel,FormControl,Input,Button,} from '@chakra-ui/react';
import { useAuth } from '../../hooks/useAuth';

export default function LoginForm(){
    const {handleSubmit, register,  formState: { errors }, setError, formState} = useForm();  //Object destructuring

    const {sendSignInLinkToEmail} = useAuth();

    const onSubmit = async data => {
        console.log("v submit funkciji smo!")
        console.log(data.email)
        try{
await sendSignInLinkToEmail(data.email);
        }catch(error){
            console.log(error)
            setError('email',{
                type: 'manual',
                message:error.message
            })
        }
        console.log("poslali smo!")
    }

    return(
<GridItem
    colStart={[1,null,null,2,null,null]}
    colSpan={3,null,null,1,null,null}
    p={6}>
<Heading as="h1" mb={6}>Login</Heading>
{errors.email && (
    <Alert status='error' variant='subtle' mt={6} mb={6}>
        <AlertIcon />
        {errors.email.message}
    </Alert>
)}
{formState.isSubmitSuccessful &&(
    <Alert status='success' variant='subtle' mt={6} mb={6}>
    <AlertIcon />
    Sign in was succesfull
</Alert>
)}
<form onSubmit={handleSubmit(onSubmit)}>
    <FormControl>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input name="email" placeholder="Email" {...register("email", { required: true })} />
        <Button mt={4} colorScheme={'teal'} isLoading={formState.isSubmitting} type="submit">Submit</Button>
    </FormControl>
</form>
</GridItem>
    );
}