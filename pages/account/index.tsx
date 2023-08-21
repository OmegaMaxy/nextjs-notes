import { 
    Box,
    Button, 
    Card, 
    CardBody, 
    CardFooter, 
    CardHeader, 
    Heading, 
    HStack, 
    Text,
    Link,
    InputGroup,
    Input,
} from "@chakra-ui/react";
import Layout from '../../components/layouts/main'
import UserAPI from '../../lib/UserAPI'
import moment from 'moment'
import NextLink from 'next/link'
import { useSession } from "next-auth/react";
import { User, SessionUser } from "../../lib/types";



export default function AccountPage() { // withAuthentication()

    const session = useSession()
    const user: SessionUser | undefined = session.data?.user

    return (
        <Layout sessionProtected>
            <Box>
                <NextLink href='/account/settings'>
                    <Button colorScheme="blue">Update password</Button>
                </NextLink>
            </Box>
            <Box mt="4rem">
                <Heading my="1.5rem">Account Administration</Heading>
                <Button colorScheme="red" onClick={() => {}} variant="outline">Delete all notes</Button>
            </Box>
        </Layout>
    )
}