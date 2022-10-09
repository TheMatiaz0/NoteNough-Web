import NotesList from "../components/NotesList";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Search from "../components/Search";
import Header from "../components/Header";
import SignUpButton from "../components/SignUpButton";
import LoginButton from "../components/LoginButton";
import OffCanvasMenu from "../components/OffCanvasMenu";

const Home = () => {
  // const LOCAL_STORAGE_DATA_NAME = "NoteNough-app-data";
  const ROOT_URL = `http://${window.location.hostname}:8080/api/Notes`;
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
    let response = await fetch(ROOT_URL, {
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
    await fetch(`${ROOT_URL}/${id}`, {
      method: "DELETE",
    });
    setNotes([...notes].filter((i) => i.key !== id));
  };

  const editNoteFromDatabase = async (note, updatedText) => {
    await fetch(`${ROOT_URL}/${note.key}`, {
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

  async function fetchNotes() {
    try {
      const response = await fetch(`${ROOT_URL}`);
      if (!response.ok) {
        throw new Error(`An error has occured: ${response.status}`);
      }
      return await response.json();
    } catch (e) {
      console.error(`An error has occured: ${e}`);
    }
  }

  useEffect(() => {
    const fetchNotesFromDatabase = async () => {
      const data = await fetchNotes();
      if (data !== undefined) {
        setNotes(parseNoteDates(data));
      }
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

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleLogin = () => {
    setIsLoggingIn((prevState) => !prevState);
  };

  
  const contentMarginRight = isLoggingIn ? "600px" : "25%";
  return (
    <div>
      <div className="back app-container" id="main">
        <Header
          buttons={[
            <LoginButton onClick={toggleLogin} />,
            <SignUpButton onClick={toggleLogin} />,
          ]}
        />
        <Search handleSearchText={setSearchText} />
        <NotesList
          notes={notes.filter(filterText)}
          searchText={searchText}
          handleAddNote={addNote}
          handleRemoveNote={removeNote}
          handleEditNote={editNote}
        />
      </div>
      <OffCanvasMenu isOpen={isLoggingIn} onClose={toggleLogin} />
    </div>
  );
};

export default Home;
