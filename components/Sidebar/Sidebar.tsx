import { Box, Flex, Heading, IconButton, Text, Tooltip, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import NoteAPI from "../../lib/NoteAPI";
import { Note, SessionUser } from "../../lib/types";
import NextLink from 'next/link'
import { AddIcon } from "@chakra-ui/icons";
import styles from "./Sidebar.module.css";

export default function Sidebar({ updateNoteState, userHasSaved, createNewNote, ...props}: any) {

    const session = useSession()
    const [notes, setNotes] = useState([] as any)
    const [isSessionValid, setSessionValidity] = useState(false)

    async function getNotes() {
        console.log('getting notes')
        if (session.data?.user) {
            const notes = await NoteAPI.getAll(session.data?.user.id)
            if (notes) setNotes(notes)
        }
    }

    useEffect(() => {
        const abortController = new AbortController()

        if (userHasSaved === true) {
            console.log('getting notes because of userHasSaved ...')
            getNotes()
        }
        return abortController.abort()
    }, [userHasSaved])

    useEffect(() => {
        if (session.status === 'authenticated') {
            getNotes()
        }
    }, [isSessionValid])
    
    useEffect(() => {
        const abortController = new AbortController()
        
        if (session.status === 'authenticated' && isSessionValid === false) {
            setSessionValidity(true)
        }
        
        return abortController.abort()
    }, [session])

    function parseNoteContent(note: Note) {
        let paragraphs: any = note.content.match(/(<p>.+<\/p>)/gm)
        if (paragraphs) {
            paragraphs = paragraphs.map((p: string) => {
                return p.substring(3, p.length - 4)
            }).join('\r\n')

            let result = paragraphs.substring(0, 50)
            if (note.content.length > 50) result += '...'

            return result
        } else {
            return ''
        }
    }
    const { colorMode } = useColorMode()
    function handleColorMode(option1: any, option2: any) {
        return colorMode == 'dark' ? option2 : option1
    }
    // bg={useColorModeValue('#fff', '#efefef')}
    //_hover={{ bg: useColorModeValue('#97A79A', '#888') }}
    return (
        <Flex
            p="1rem"
            gap={6}
            flexWrap="nowrap"
            height="600px"
            justifyContent="start"
            flexDirection="column"
            overflowY="scroll"
            boxShadow="inset #bbb9 -10px -20px 14px 0px"
            className={styles.sidebar}
            >
            {notes ? notes.map((note: Note, index: number) => (
                <Box 
                    key={index}
                    onClick={() => updateNoteState(note)}
                    w="100%" 
                    h="fit-content" 
                    borderRadius="12px" 
                    p="1.3rem" 
                    cursor="pointer"
                    transition="0.2s"
                    boxShadow="#7a7878 6px 6px 11px 0px"
                    color={handleColorMode('#000', '#fff')}
                    bg={handleColorMode('#efefef', '#fff')}
                    _hover={{ bg: handleColorMode('#97A79A', '#888') }}>
                    <Heading as="h2" size="lg" fontWeight="bolder">{note.title}</Heading>
                    <Text>{parseNoteContent(note)}</Text>
                </Box>
            )) : <Box
                w="100%"
                h="fit-content"
                borderRadius="12px"
                p="1.3rem"
                transition="0.2s"
                boxShadow="#7a7878 6px 6px 11px 0px"
                bg={useColorModeValue('#fff', '#efefef')}
                _hover={{ bg: useColorModeValue('#97A79A', '#888') }}>
                <Heading as="h2" size="lg" fontWeight="bolder">No notes yet.</Heading>
                <Text>Start typing on the right.</Text>
            </Box>}
            <Tooltip label="Create a new note">
                <IconButton
                    padding="1rem"
                    onClick={createNewNote}
                    colorScheme="blue"
                    aria-label="Create new note"
                    icon={<AddIcon />} />
            </Tooltip>
        </Flex>
    )
}