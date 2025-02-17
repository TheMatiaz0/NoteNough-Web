import { CSS } from '@dnd-kit/utilities';
import { useSortable } from "@dnd-kit/sortable";

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
};

export default SortableNote;