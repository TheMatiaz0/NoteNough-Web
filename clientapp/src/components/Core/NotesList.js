import "./NotesList.css";
import Note from './Note';
import InputNote from './InputNote';
import { useState } from 'react';


const NotesList = ({ notes, searchText, handleAddNote, handleRemoveNote, handleEditNote }) => {
    const [editedNote, setEditedNote] = useState({});

    const enterEditNoteMode = (note) => {
        setEditedNote(note);
    }

    const updateNote = (note, newText) => {
        handleEditNote(note.key, newText);
        setEditedNote(false);
    }

    const constructNote = (note, handleRemoveNote, handleEditNote) =>
        note === editedNote ? <InputNote key={note.key} defaultText={note.text} handleAddNote={(newText) => updateNote(note, newText)} /> : (<Note
            key={note.key}
            id={note.key}
            text={note.text}
            date={note.date}
            handleRemoveNote={handleRemoveNote}
            handleEditNote={() => handleEditNote(note)}
        />);

    const sortByNewest = (array) =>
        array.sort((a, b) => {
            return new Date(a.date) -
                new Date(b.date)
        }).reverse();

    return (
        <article className="notes-list">
            {searchText.length <= 0 && <InputNote handleAddNote={handleAddNote} />}
            {sortByNewest(notes).map(((note) => constructNote(note, handleRemoveNote, enterEditNoteMode)))}
        </article>
    );
};

export default NotesList;