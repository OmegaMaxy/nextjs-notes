import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    HStack,
    Input,
    Spinner,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { CSSProperties, useEffect, useState, useRef } from "react";
import NoteAPI from "../lib/NoteAPI";
import { Note } from "../lib/types";

import { Editor } from "@tinymce/tinymce-react";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import CloseableAlert from "./CloseableAlert";



export default function NoteEditor({ note, updateUserHasSaved, onCreateNoteEvent, ...props }: any) {

    const [noteText, setNoteText] = useState('')
    //const noteTitle = useRef(null as HTMLInputElement | null)
    const [noteTitle, setNoteTitle] = useState('')
    const [activeNote, setNote] = useState(null as Note | null)
    const [isLoading, setLoading] = useState(false)
    const [isTitleInputEnabled, setTitleInputVisibility] = useState(true)
    const [saveError, setSaveError] = useState('')

    function toggleTitleInput() {
        if (!titleInputError) setTitleInputVisibility(visibility => !visibility)
        
        // save note when title is saved
        if (!isTitleInputEnabled && activeNote === null) {
            saveNote()
        }
    }
    const session = useSession()
    
    useEffect(() => {
        if (onCreateNoteEvent === true) {
            console.log("creating new note")
            setNote(null)
            setNoteTitle('')
            setNoteText('')
            setTitleInputVisibility(true)
        }
    }, [onCreateNoteEvent])

    useEffect(() => {
        if (note) {
            setNote(note)
            console.log('note', note)
            setNoteTitle(note.title)
            setNoteText(note.content)
            setTitleInputVisibility(false)
        }
    }, [note])

    async function saveNote() {
        setLoading(true)
        if (activeNote) {
            const result = await NoteAPI.update({ id: activeNote.id, title: noteTitle, content: noteText })
            if (result.error) setSaveError(result.errorMessage)
        } else {
            const newNote = await NoteAPI.create({ user_id: session.data!.user.id, title: noteTitle, content: noteText })
            if (newNote.error) {
                setSaveError(newNote.errorMessage)
            } else {
                setNote(newNote)
            }
        }
        updateUserHasSaved()
        setLoading(false)
    }

    async function handleOnEditorChange(content: any) {
        setNoteText(content)
    }

    const styles: CSSProperties = {
        padding: '2rem',
        height: '100%',
        background: '#fff',
        borderRadius: '12px',
        overflowY: 'scroll'
    }

    const editorRef = useRef(null as any)

    const titleInputError = noteTitle === ''

    return (
        <Box w="100%" h="100%" p="1rem">

            {!isTitleInputEnabled ?
                <HStack justifyContent="center" mb="2rem">
                    <Heading as="h2" size="xl">{noteTitle}</Heading>
                    <EditIcon onClick={toggleTitleInput} cursor="pointer"/>
                </HStack>
                :
                <HStack mb="2rem">
                    <FormControl isInvalid={titleInputError}>
                        <Input
                            onChange={(ev: any) => setNoteTitle(ev.target.value)}
                            value={noteTitle}
                            type="text"
                            placeholder="Note title..."
                            fontSize="xl"
                            borderColor={useColorModeValue('gray.300', '#fff')} />
                        {titleInputError ? 
                        <FormErrorMessage>Title can't be empty.</FormErrorMessage> : null}
                    </FormControl>
                    <Button alignSelf="flex-start" colorScheme="blue" onClick={toggleTitleInput}><CheckIcon/></Button>
                </HStack>
            }

            {isLoading ?
                <Alert status="loading" mb="2rem">
                    <AlertIcon />
                    <AlertTitle>Saving note...</AlertTitle>
                </Alert> : null}
            {saveError != '' ?
                <CloseableAlert mb="2rem" status='error' title="Could not save note" description={saveError}/> : null}

            <Box h="500px">
                <Editor
                    id="editor"
                    ref={editorRef}
                    tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    value={noteText}
                    init={{
                        placeholder: "Now write something brilliant...",
                        //skin: 'naked',
                        //icons: 'thin',
                        promotion: false,
                        height: 500,
                        menubar: false,
                        statusbar: false,
                        toolbar_location: 'bottom',
                        plugins: [
                            "quickbars ",


                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                        ],
                        toolbar:
                            'blocks | forecolor backcolor | bold italic underline strikethrough | image blockquote code link',
                        content_style:
                            ` 
                            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&family=Lexend+Deca&family=Vazirmatn&display=swap');
                            body { font-family: Lexend Deca, Roboto Mono, Vazirmatn; font-size:24px; font-weight: 400; background: #efefef }`,
                    }}
                    onEditorChange={handleOnEditorChange}
                />
            </Box>
            <Button mt="2rem" colorScheme="blue" onClick={saveNote} isLoading={isLoading}>Save</Button>
        </Box>
    )
}