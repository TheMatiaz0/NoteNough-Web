import { useState } from "react";
import { MdAddCircle } from "react-icons/md";

const InputNote = ({ handleAddNote, defaultText = "" }) => {
  const [noteText, setNoteText] = useState(defaultText);
  const maxCharSize = 200;

  const handleChange = (event) => {
    setNoteText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!noteText.trim()) {
      return;
    }
    handleAddNote(noteText);
    setNoteText("");
  };

  return (
    <div className="note new">
      <textarea
        className="note-text"
        maxLength={maxCharSize}
        rows="8"
        cols="10"
        placeholder="Type to add a note..."
        value={noteText}
        onChange={handleChange}
        onFocus={e => e.currentTarget.select()}
      ></textarea>
      <div className="note-footer">
        <small className="remaining remain-color">
          {maxCharSize - noteText.length}
        </small>
        <div className="vl"></div>
        <MdAddCircle
          title="Add a new note"
          size="2em"
          className="regular-button"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default InputNote;
