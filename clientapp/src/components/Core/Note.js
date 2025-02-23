import { MdDeleteForever, MdEdit } from "react-icons/md";

const Note = ({ id, text, date, handleRemoveNote, handleEditNote }) => {
  return (
    <div className="note">
      <div className="fade">
        <span className="note-text">{text}</span>
      </div>
      <div className="note-footer">
        <small
          title={`Created/Last updated: ${date.toLocaleString()}`}
          className="remaining date-color"
        >
          {date.toLocaleString()}
        </small>
        <div>
          <MdEdit
            title="Edit the note"
            onClick={() => handleEditNote()}
            className="action-icon"
            size="1.6em"
          />
          <MdDeleteForever
            title="Delete the note"
            onClick={() => handleRemoveNote(id)}
            className="action-icon"
            size="1.6em"
          />
        </div>
      </div>
    </div>
  );
};

export default Note;
