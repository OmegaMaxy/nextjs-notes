import { 
    Text,
    Center,
} from "@chakra-ui/react";
import Landing from "../components/layouts/landing";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Homepage() {

    const session = useSession()
    const router = useRouter()

    useEffect(() => {
        router.push('/app')
    }, [])

    return (
        <Landing>
            <Center>
                <Text>Session status: <b>{session.status}</b></Text>
            </Center>
        </Landing>
    )
}