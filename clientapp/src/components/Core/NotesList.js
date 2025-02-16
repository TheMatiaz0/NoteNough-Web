import "./NotesList.css";
import Note from './Note';
import InputNote from './InputNote';
import { useState } from 'react';
import { arrayMove, rectSortingStrategy, rectSwappingStrategy, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';


const SortableNote = ({note, handleRemoveNote, enterEditNoteMode, constructNote}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: note.key});
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {constructNote(note, handleRemoveNote, enterEditNoteMode)}
        </div>
    )
}

const NotesList = ({ notes, searchText, handleAddNote, handleRemoveNote, handleEditNote, handleReorderNotes }) => {
    const [editedNote, setEditedNote] = useState({});

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    const enterEditNoteMode = (note) => {
        setEditedNote(note);
    }

    const updateNote = (note, newText) => {
        handleEditNote(note.key, newText);
        setEditedNote(false);
    }

    const constructNote = (note, handleRemoveNote, handleEditNote) =>
        note === editedNote ? 
        (<InputNote key={note.key} defaultText={note.text} handleAddNote={(newText) => updateNote(note, newText)} />) : (<Note
            key={note.key}
            id={note.key}
            text={note.text}
            date={note.date}
            handleRemoveNote={handleRemoveNote}
            handleEditNote={() => handleEditNote(note)}
        />
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = notes.findIndex((note) => note.key === active.id);
            const newIndex = notes.findIndex((note) => note.key === over.id);

            const reorderedNotes = arrayMove(notes, oldIndex, newIndex);
            handleReorderNotes(reorderedNotes);
        }
    };

    const sortByNewest = (array) =>
        array.sort((a, b) => {
            return new Date(a.date) -
                new Date(b.date)
        }).reverse();

    return (
        <article className="notes-list">
            {searchText.length <= 0 && <InputNote handleAddNote={handleAddNote} />}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={notes.map((note) => note.key)} strategy={rectSortingStrategy} >
                    {notes.map((note) => (
                        <SortableNote 
                            key={note.key}
                            note={note} 
                            handleRemoveNote={handleRemoveNote} 
                            enterEditNoteMode={enterEditNoteMode} 
                            constructNote={constructNote}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </article>
    );
};

export default NotesList;