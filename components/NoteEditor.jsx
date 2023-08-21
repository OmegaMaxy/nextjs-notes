import { 
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box, 
    Button, 
    Flex, 
    Heading, 
    Input, 
    Spinner, 
    Text, 
    useColorModeValue
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { CSSProperties, useEffect, useState } from "react";
import NoteAPI from "../lib/NoteAPI";
import { Note } from "../lib/types";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default function NoteEditor({ note, ...props}) {

    const [noteText, setNoteText] = useState('')
    const [noteTitle, setNoteTitle] = useState('')
    const [activeNote, setNote] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const session = useSession()

    useEffect(() => {
        setNote(note)
        if (activeNote) {
            setNoteTitle(note?.title)
        }
    }, [note])

    async function saveNote() {
        setLoading(true)
        if (activeNote) {
            const updatedNote = await NoteAPI.update({id: activeNote.id, title: noteTitle, content: noteText})
        } else {
            const newNote = await NoteAPI.create({user_id: session.data.user.id, title: noteTitle, content: noteText})
            setNote(newNote)
        }
        setLoading(false)
    }

    const styles = { // CSSProperties
        padding: '2rem',
        height: '100%',
        background: '#fff',
        borderRadius: '12px',
        overflowY: 'scroll'
    }



    return (
        <Box w="100%" h="100%" p="1rem">
            {activeNote ? 
                <Heading as="h2" size="xl" mb="2rem" textDecor="underline">{activeNote.title}</Heading>
                : 
                <Input
                    type="text"
                    placeholder="Note title..."
                    textDecor="underline" 
                    fontSize="xl" 
                    mb="2rem"
                    borderColor={useColorModeValue('#000', '#fff')}/>
            }

            {isLoading ?
            <Alert status="loading">
                <AlertIcon/>
                <AlertTitle>Saving note...</AlertTitle>
            </Alert> : null}

            <Box h="500px">
                <CKEditor
                    editor={ClassicEditor}
                    data={activeNote?.content}
                    onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
                <Text>Now write something brilliant...</Text>
            </Box>
            <Button mt="2rem" colorScheme="blue" onClick={saveNote} isLoading={isLoading}>Save</Button>
        </Box>
    )
}