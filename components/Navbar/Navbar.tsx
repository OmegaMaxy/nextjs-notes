import { Box, Button, Flex, IconButton, Link, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";


export default function Navbar() {

    const router = useRouter()
    const session = useSession()
    const isLoggedIn = (session.status === 'authenticated')
    const path = router.asPath
    const { colorMode, toggleColorMode } = useColorMode()

    function LinkItem({ children, href, hideInSession, showInSession, ...props }: any) {
        const isActive = (href == path)
        let endValue = 'inherit'

        if (hideInSession) {
            if (isLoggedIn) {
                endValue = 'none'
            }
        }

        if (showInSession) {
            if (isLoggedIn) {
                endValue = 'inherit'
            } else {
                endValue = 'none'
            }
        }

        // endValue = (session.isLoggedIn && hideInSession) ? 'none' : 'inherit'

        // endValue = (session.isLoggedIn && showInSession) ? 'inherit' : 'none'
        
        return (
            <Link as={NextLink} href={href} display={endValue}>
                <Text color={isActive ? useColorModeValue('#000', '#fff') : useColorModeValue('blackAlpha.600', 'whiteAlpha.600')} fontSize="xl">
                    {children}
                </Text>
            </Link>
        )
    }
    function LinkButton({ children, href = "#", hideInSession, showInSession, ...props }: any) {
        const isActive = (href == path)
        let endValue = 'inherit'

        if (hideInSession) {
            if (isLoggedIn) {
                endValue = 'none'
            }
        }

        if (showInSession) {
            if (isLoggedIn) {
                endValue = 'inherit'
            } else {
                endValue = 'none'
            }
        }

        return (
            <NextLink href={href}>
                <Button {...props} display={endValue}>
                    {children}
                </Button>
            </NextLink>
        )
    }

    return (
        <Flex justifyContent="space-between">
            <Flex p="2rem" gap={4}>
                <LinkItem href="/">Home</LinkItem>
            </Flex>
            <Flex p="2rem" gap={4} alignItems="center">
                <LinkButton colorScheme="blue" hideInSession onClick={signIn}>
                    Login
                </LinkButton>
                <LinkButton href="/create-account" colorScheme="blue" variant="outline" hideInSession>
                    Create account
                </LinkButton>
                <LinkItem href="#">
                    <IconButton 
                    aria-label="Toggle darkmode" 
                    onClick={toggleColorMode}
                    bg={useColorModeValue('purple.300', 'yellow.500')}
                    _hover={{ bg: useColorModeValue('purple.500', 'yellow.700') }}
                    icon={useColorModeValue(<MoonIcon />,<SunIcon />)}
                    />
                </LinkItem>
                <LinkItem href="/account" showInSession>Your account</LinkItem>
                <LinkButton href="/api/auth/signout" colorScheme="red" variant="outline" showInSession>
                    Logout
                </LinkButton>
            </Flex>
        </Flex>
    )
}