import NotesList from "../components/NotesList";
import {useEffect, useState} from "react";
import { nanoid } from "nanoid";
import Search from "../components/Search";
import Header from "../components/Header";
import OffCanvasMenu from "../components/OffCanvasMenu";
import AuthForm from "../components/AuthForm";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";

const Home = ({user, onAuthorize, onLogout}) => {
  const ROOT_NOTES_URL = `${process.env.REACT_APP_ROOT_URL}/api/notes`;

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
    return parsedNotes.map((note) => {
      let originDate = note.created;
      if (note.updated !== null && note.updated > note.created) {
        originDate = note.updated;
      }
      return {
        ...note,
        date: new Date(originDate),
      };
    });
  };

  const [notes, setNotes] = useState(() => {
    return defaultNotes;
  });

  const [searchText, setSearchText] = useState("");

  const addNoteToDatabase = async (text) => {
    let response = await fetch(ROOT_NOTES_URL, {
      method: "POST",
      body: JSON.stringify({
        text: text,
      }),
      headers: {
        "Content-type": process.env.REACT_APP_FETCH_TYPE,
      },
    });
    let data = await response.json();
    setNotes((notes) => [
      { key: data.key, text: data.text, date: new Date(data.created) },
      ...notes,
    ]);
  };

  const deleteNoteFromDatabase = async (id) => {
    await fetch(`${ROOT_NOTES_URL}/${id}`, {
      method: "DELETE",
    });
    setNotes([...notes].filter((i) => i.key !== id));
  };

  const editNoteFromDatabase = async (note, updatedText) => {
    let response = await fetch(`${ROOT_NOTES_URL}/${note.key}`, {
      method: "PUT",
      body: JSON.stringify({
        text: updatedText,
      }),
      headers: {
        "Content-type": process.env.REACT_APP_FETCH_TYPE,
      },
    });
    let data = await response.json();
    note.text = updatedText;
    note.date = new Date(data.updated);
    setNotes([...notes]);
  };

  async function fetchNotes() {
    try {
      const response = await fetch(ROOT_NOTES_URL);
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }

  const fetchNotesFromDatabase = async () => {
    const response = await fetchNotes();
    if (response !== undefined && response.length > 0) {
      setNotes(parseNoteDates(response));
    }
    else {
      setNotes(defaultNotes);
    }
  };
  
  useEffect(() => {
    fetchNotesFromDatabase();
  }, []);


  const addNote = (text) => {
    return addNoteToDatabase(text);
  };

  const removeNote = (key) => {
    return deleteNoteFromDatabase(key);
  };

  const editNote = (key, newText) => {
    const specificIndex = notes.findIndex((note) => note.key === key);
    const newNotes = [...notes];
    const specificNote = newNotes[specificIndex];
    if (newText !== specificNote.text) {
      return editNoteFromDatabase(specificNote, newText);
    }
  };

  const filterText = (note) =>
    note.text.toLowerCase().includes(searchText.toLowerCase());

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const toggleLogin = () => {
    setIsSigningUp(false);
    setIsLoggingIn((prevState) => !prevState);
  };

  const toggleSignUp = () => {
    setIsLoggingIn(false);
    setIsSigningUp((prevState) => !prevState);
  }

  const contentMarginRight = (isLoggingIn || isSigningUp) ? "100px" : "0";
  return (
    <div>
      <div className="app-container">
        <div id="main" style={{ marginRight: contentMarginRight }}>
          <Header showNavigation={true} username={user.email} onLoginClick={toggleLogin} onSignUpClick={toggleSignUp} onLogoutClick={onLogout} />
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
      <OffCanvasMenu content={<LoginForm onClose={toggleLogin} handleOnSubmit={onAuthorize} onLoginClick={toggleLogin} onSignUpClick={toggleSignUp} />} isOpen={isLoggingIn} onClose={toggleLogin} />
      <OffCanvasMenu content={<SignUpForm onClose={toggleSignUp} handleOnSubmit={onAuthorize} onLoginClick={toggleLogin} onSignUpClick={toggleSignUp} />} isOpen={isSigningUp} onClose={toggleSignUp} />
    </div>
  );
};

export default Home;
