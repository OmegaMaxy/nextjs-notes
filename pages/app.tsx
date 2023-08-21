import { Flex } from "@chakra-ui/react";
import Layout from "../components/layouts/editor";
import Sidebar from "../components/Sidebar/Sidebar";
import NoteEditor from "../components/NoteEditorNew";
import NoteAPI from "../lib/NoteAPI";
import { Note } from "../lib/types";
import { useState } from "react";


export default function Notes(props: any) {

    /*let note: Note | null = null;
    if (props.note) {
        note = props.note
    }*/
    const [note, setNote] = useState(null)
    const [userHasSaved, setUserHasSaved] = useState(false)
    const [onCreateNoteEvent, setCreateNoteEvent] = useState(false)

    const updateNoteState = (note: any) => {
        console.log('updated note state..')
        setNote(note)
    }

    const updateUserHasSaved = () => {
        setUserHasSaved(true)
        setTimeout(() => {
            setUserHasSaved(false)
        }, 1000)
    }

    const createNewNote = () => {
        console.log('new note event fired')
        setCreateNoteEvent(true)
        setTimeout(() => {
            setCreateNoteEvent(false)
        }, 1000)
    }

    return (
        <Layout pt="0rem">
            <Flex justifyContent="stretch">
                <Sidebar
                    updateNoteState={updateNoteState} 
                    userHasSaved={userHasSaved}
                    createNewNote={createNewNote}/>
                <NoteEditor 
                    note={note} 
                    updateUserHasSaved={updateUserHasSaved}
                    onCreateNoteEvent={onCreateNoteEvent}/>
            </Flex>
        </Layout>
    )
}

// export async function getServerSideProps(context: any) {

//     const note = await NoteAPI.get(context.query.id)

//     return {
//         props: {
//             note
//         }
//     }
// }