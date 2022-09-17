import NotesList from "./components/NotesList";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  // const LOCAL_STORAGE_DATA_NAME = "NoteNough-app-data";

  const defaultNotes = [
    {
      key: nanoid(),
      text: "This is an example note",
      date: new Date(2022, 7, 24, 10, 9, 5, 10),
    },
    {
      key: nanoid(),
      text: "This is an example note 2",
      date: new Date(2023, 10, 1, 10, 9, 5, 10),
    },
    {
      key: nanoid(),
      text: "This is an example note 3",
      date: new Date(2024, 10, 1, 10, 9, 5, 10),
    },
  ];

  const parseNoteDates = (parsedNotes) => {
    return parsedNotes.map((val) => {
      return {
        ...val,
        date: new Date(val.created),
      };
    });
  };

  const [notes, setNotes] = useState(() => {
    /*
    const localStorageNotes = localStorage.getItem(LOCAL_STORAGE_DATA_NAME);
    const parsedNotes = JSON.parse(localStorageNotes);
    if (parsedNotes)
    {
      return parsedNotes.map(val => {
        return {...val, date: new Date(val.date)};
      });
    }
    */

    return defaultNotes;
  });

  const [searchText, setSearchText] = useState("");

  /*
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_DATA_NAME, JSON.stringify(notes));
  }, [notes]);
  */

  const addNoteToDatabase = async (text) => {
    let response = await fetch("http://localhost:8080/api/Notes", {
      method: "POST",
      body: JSON.stringify({
        text: text,
        created: new Date(),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let data = await response.json();
    setNotes((notes) => [
      { key: data.key, text: data.text, date: new Date(data.created) },
      ...notes,
    ]);
  };

  const deleteNoteFromDatabase = async (id) => {
    await fetch(`http://localhost:8080/api/Notes/${id}`, {
      method: "DELETE",
    });
    setNotes([...notes].filter((i) => i.key !== id));
  };

  const editNoteFromDatabase = async (note, updatedText) => {
    await fetch(`http://localhost:8080/api/Notes/${note.key}`, {
      method: "PUT",
      body: JSON.stringify({
        key: note.key,
        text: updatedText,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    note.text = updatedText;
    note.date = new Date();
    setNotes([...notes]);
  };

  useEffect(() => {
    const fetchNotesFromDatabase = async () => {
      const response = await fetch("http://localhost:8080/api/Notes");
      const data = await response.json();
      setNotes(parseNoteDates(data));
    };
    fetchNotesFromDatabase();
  }, []);

  const addNote = (text) => {
    addNoteToDatabase(text);
    /*
    setNotes([...notes, {
      key: nanoid(),
      text: text,
      date: new Date()
    }]);
    */
  };

  const removeNote = (key) => {
    deleteNoteFromDatabase(key);
    /* setNotes(notes.filter(note => note.key !== key)); */
  };

  const editNote = (key, newText) => {
    const specificIndex = notes.findIndex((note) => note.key === key);
    const newNotes = [...notes];
    const specificNote = newNotes[specificIndex];
    if (newText !== specificNote.text) {
      editNoteFromDatabase(specificNote, newText);
    }
    /*
      specificNote.text = newText;
      specificNote.date = new Date();
      setNotes(newNotes);
    */
  };

  const filterText = (note) =>
    note.text.toLowerCase().includes(searchText.toLowerCase());

  return (
    <div>
      <div className="container">
        <Header />
        <Search handleSearchText={setSearchText} />
        <NotesList
          notes={notes.filter(filterText)}
          searchText={searchText}
          handleAddNote={addNote}
          handleRemoveNote={removeNote}
          handleEditNote={editNote}
        />
      </div>
    </div>
  );
};

export default App;
