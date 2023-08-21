import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton, useDisclosure } from "@chakra-ui/react"


export default function CloseableAlert({ status, title, description, children, ...props }: { status: "loading" | "info" | "warning" | "success" | "error" | undefined, title: string, description?: string, children?: any }) { //props: any[]

    const {
        isOpen: isVisible,
        onClose,
        onOpen,
    } = useDisclosure({ defaultIsOpen: true })

    return (
        <Alert status={status} {...props} display={isVisible ? 'flex' : 'none'}>
            <AlertIcon/>
            <Box>
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>{description}</AlertDescription>
            </Box>
            <CloseButton
                alignSelf='flex-start'
                
                position='relative'
                right={-1}
                top={-1}
                onClick={onClose} />
            {children}
        </Alert>
    )
}