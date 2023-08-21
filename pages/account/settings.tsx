import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Heading, HStack, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Layout from "../../components/layouts/main";
import UserAPI from "../../lib/UserAPI";
import { LockIcon, SettingsIcon } from '@chakra-ui/icons'
import { useSession } from "next-auth/react";
import { SessionUser } from "../../lib/types";

export default function SettingsPage() {

    const session = useSession()
    let user: SessionUser | undefined = undefined
    
    useEffect(() => {
        user = session.data!.user
    }, [user])

    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(false)
    
    const passwordRef = useRef(null as any)
    const repeatPasswordRef = useRef(null as any)

    
    function handleUpdatePassword() {
        setLoading(true)
        
        if (passwordRef.current.value == '' || repeatPasswordRef.current.value == '') {
            setError('Passwords are not the same.')
        }

        UserAPI.updatePassword(user!.id, passwordRef.current.value)
        setLoading(false)
    }
    return (
        <Layout sessionProtected>
            <HStack mb="2rem">
                <SettingsIcon fontSize="4xl"/>
                <Heading as="h1" size="xl" textDecoration="underline">Settings</Heading>
            </HStack>
            { error ? 
            <Alert status='error'>
                <AlertIcon/>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert> : null}
            <Heading as="h2" size="sm" mt="1.5rem">New password</Heading>
            <InputGroup mt="1rem" borderColor="black">
                <InputLeftElement children={<LockIcon/>}/>
                <Input
                    type="password"
                    placeholder="New password"
                    ref={passwordRef}
                    disabled={isLoading}
                />
            </InputGroup>
            <Heading as="h2" size="sm" mt="1.5rem">Repeat new password</Heading>
            <InputGroup mt="1rem" borderColor="blackAlpha.600">
                <InputLeftElement children={<LockIcon/>}/>
                <Input
                    type="password"
                    placeholder="Repeat new password"
                    ref={repeatPasswordRef}
                    disabled={isLoading}
                />
            </InputGroup>
            <Button mt="2rem" colorScheme="blue" onClick={handleUpdatePassword} isLoading={isLoading}>Update password</Button>
        </Layout>
    )
}