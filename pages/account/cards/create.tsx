
import { 
    Select,
    Text,
    Button,
    Heading,
    Alert,
    AlertIcon,
    AlertDescription,
    AlertTitle,
} from '@chakra-ui/react'
import { useState } from 'react'
import Layout from '../../../components/layouts/main'
import { useSession } from '../../../lib/context/session'
import { BankAccount } from '../../../lib/types'
import Formatting from '../../../util/formatting'
import CardAPI from '../../../lib/CardAPI'
import { useRouter } from 'next/router'

export default function CreateCardPage(props: any) {

    const router = useRouter()
    const { session } = useSession()
    const user = session.user

    const [isLoading, setLoading] = useState(false)
    const [selectedBankAccount, setSelectedBankAccount] = useState()
    const [error, setError] = useState({ status: '' as any, content: '' })
    
    async function handleSubmit() {
        setLoading(true)
        setError({ status: '', content: ''})

        const data = await CardAPI.create({ user_id: user.id, bank_account_id: selectedBankAccount })
        if (data.error) {
            setError({ status: 'warning', content: data.error })
        } else {
            router.push('/account/cards')
        }

        setLoading(false)
    }


    return (
        <Layout sessionProtected>
            <Heading as="h1" size="lg">Add a debit card to your account</Heading>
            {error.status != '' ?
                <Alert status={error.status}>
                    <AlertIcon />
                    <AlertTitle>Something happened...</AlertTitle>
                    <AlertDescription>{error.content}</AlertDescription>
                </Alert>
                : null}
            <Text>Select a bank account</Text>
            <Select my="1rem" placeholder="Select source account" value={selectedBankAccount} onChange={(ev: any) => { setSelectedBankAccount(ev.target.value) }}>
                {user.bank_accounts.map((bankAccount: BankAccount) => (
                    <option value={bankAccount.id}>BA{bankAccount.IBAN} - {`${bankAccount.cards.length}/${bankAccount.cardLimit}`} cards used</option>
                ))}
            </Select>

            <Button colorScheme="blue" onClick={handleSubmit} isLoading={isLoading}>Create</Button>
        </Layout>
    )
}