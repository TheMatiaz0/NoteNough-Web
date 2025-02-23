import { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import "./NotesList.css";

const InputNote = ({ handleAddNote, defaultText = "" }) => {
  const [noteText, setNoteText] = useState(defaultText);
  const [lineLimitReached, setLineLimitReached] = useState(false);

  const MAX_LINES = 3;
  const LINE_HEIGHT = 32;

  const handleChange = (event) => {
    const input = event.target.value;
    const lines = input.split("\n").length;

    // Check actual number of visible lines using scrollHeight
    const actualLines = Math.floor(event.target.scrollHeight / LINE_HEIGHT);

    if (lines <= MAX_LINES && actualLines <= MAX_LINES) {
      setNoteText(event.target.value);
      setLineLimitReached(false);
    }
    else {
      setLineLimitReached(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!noteText.trim()) {
      return;
    }
    handleAddNote(noteText);
    setNoteText("");
    setLineLimitReached(false);
  };

  return (
    <div className="note new">
      <textarea
        className={`note-text ${lineLimitReached ? "shake" : ""}`}
        rows="3"
        placeholder="Type to add a note..."
        value={noteText}
        onChange={handleChange}
        onFocus={e => e.currentTarget.select()}
      ></textarea>
      <div className="note-footer">
        <small className="remaining remain-color">
          {lineLimitReached && 
          <span className="error-text">⚠️ Max 3 lines allowed.</span>}
        </small>
        <div className="container">
          <div className="vl"></div>
          <MdAddCircle
            title="Add a new note"
            size="2em"
            className="regular-button"
            onClick={handleSubmit}
          />
          </div>
      </div>
    </div>
  );
};

export default InputNote;
