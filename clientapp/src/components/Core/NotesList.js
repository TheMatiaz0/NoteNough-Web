import "./NotesList.css";
import Note from './Note';
import InputNote from './InputNote';
import { useState, useEffect } from 'react';
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import SortableNote from "./SortableNote";

const NotesList = ({ notes, searchText, handleAddNote, handleRemoveNote, handleEditNote, handleReorderNotes, isSortedByNewest }) => {
    const [editedNote, setEditedNote] = useState({});
    const MIN_DISTANCE_TO_DND = 5;

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const sensors = useSensors(
        useSensor(isTouchDevice ? TouchSensor : PointerSensor, {
            activationConstraint: { 
                distance: !isTouchDevice ? MIN_DISTANCE_TO_DND : 0,
                delay: isTouchDevice ? 60 : 0,
                tolerance: isTouchDevice ? 8 : 0,
            },
        }),
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
        (<InputNote 
            key={note.key} 
            defaultText={note.text} 
            handleAddNote={(newText) => updateNote(note, newText)} />) : 
        (<Note
            key={note.key}
            id={note.key}
            text={note.text}
            date={note.date}
            handleRemoveNote={handleRemoveNote}
            handleEditNote={() => handleEditNote(note)}
        />
    );

    useEffect(() => {
        const sorted = [...notes].sort((a, b) =>
            isSortedByNewest
                ? new Date(b.date) - new Date(a.date)
                : new Date(a.date) - new Date(b.date)
        );
        handleReorderNotes(sorted);
    }, [isSortedByNewest]);

    const filteredNotes = searchText
    ? notes.filter((note) => note.text.toLowerCase().includes(searchText.toLowerCase()))
    : notes;

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) {
            return;
        }

        if (active.id !== over.id) {
            const oldIndex = notes.findIndex((note) => note.key === active.id);
            const newIndex = notes.findIndex((note) => note.key === over.id);

            const reorderedNotes = arrayMove([...notes], oldIndex, newIndex);
            handleReorderNotes(reorderedNotes);
        }
    };

    return (
        <article className="notes-list">
            {searchText.length <= 0 && <InputNote handleAddNote={handleAddNote} />}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={filteredNotes.map((note) => note.key)} strategy={rectSortingStrategy} >
                    {filteredNotes.map((note) => (
                        note === editedNote ? (
                        <InputNote 
                            key={note.key} 
                            defaultText={note.text} 
                            handleAddNote={(newText) => updateNote(note, newText)} 
                        />
                        ) : (
                        <SortableNote 
                            key={note.key}
                            note={note} 
                            handleRemoveNote={handleRemoveNote} 
                            enterEditNoteMode={enterEditNoteMode} 
                            constructNote={constructNote}
                        />
                        )
                    ))}
                </SortableContext>
            </DndContext>
        </article>
    );
};

export default NotesList;