import { CSS } from '@dnd-kit/utilities';
import { useSortable } from "@dnd-kit/sortable";
import "./NotesList.css";

const SortableNote = ({note, handleRemoveNote, enterEditNoteMode, constructNote}) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({id: note.key});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition,
        opacity: isDragging ? 0.8 : 1
    };

    return (
        <div className="draggable-item" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {constructNote(note, handleRemoveNote, enterEditNoteMode)}
        </div>
    )
};

export default SortableNote;