import { EmailIcon, LockIcon, ChatIcon } from "@chakra-ui/icons";
import { Box, Button, GenericAvatarIcon, Heading, Input, InputGroup, InputLeftElement, useColorModeValue } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRef } from "react";
import Layout from "../components/layouts/main";
import UserAPI from "../lib/UserAPI";


export default function CreateAccountPage() {

    const nameRef = useRef(null as any)
    const emailRef = useRef(null as any)
    const passwordRef = useRef(null as any)

    async function createAccount() {

        const newUser = await UserAPI.createAccount({
            name: nameRef.current.value,
            email_address: emailRef.current.value,
            password: passwordRef.current.value,
        })
        signIn('Credentials', { email_address: emailRef.current.value, password: passwordRef.current.value, redirect: false, callbackUrl: '/app' })
    }

    return (
        <Layout>
            <Box mb="2rem">
                <Heading as="h3" size="md" mb="2">Name</Heading>
                <InputGroup>
                    <InputLeftElement pointerEvents='none' children={<ChatIcon />} />
                    <Input
                        borderColor={useColorModeValue("#626972", "#e2e8f0")}
                        type="text"
                        ref={nameRef}
                    />
                </InputGroup>
            </Box>
            <Box mb="2rem">
                <Heading as="h3" size="md" mb="2">Email</Heading>
                <InputGroup>
                    <InputLeftElement pointerEvents='none' children={<EmailIcon />} />
                    <Input
                        borderColor={useColorModeValue("#626972", "#e2e8f0")}
                        type="email"
                        ref={emailRef}
                    />
                </InputGroup>
            </Box>
            <Box mb="2rem">
                <Heading as="h3" size="md" mb="2">Password</Heading>
                <InputGroup>
                    <InputLeftElement pointerEvents='none' children={<LockIcon />} />
                    <Input
                        borderColor={useColorModeValue("#626972", "#e2e8f0")}
                        type="password"
                        ref={passwordRef}
                    />
                </InputGroup>
            </Box>

            <Button colorScheme="blue" onClick={createAccount}>Sign up</Button>
        </Layout>
    )
}