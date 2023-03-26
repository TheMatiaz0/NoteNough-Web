import NotesList from "../components/NotesList";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import Header from "../components/Header";
import OffCanvasMenu from "../components/OffCanvasMenu";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";

const Home = ({ user, onAuthorize, onLogout }) => {
  const ROOT_NOTES_URL = `${process.env.REACT_APP_ROOT_URL}/api/notes`;
  const LOCAL_STORAGE_DATA_NAME = "NoteNough-app-data";

  const defaultNotes = [];

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
    if (!user) {
      const localStorageNotes = localStorage.getItem(LOCAL_STORAGE_DATA_NAME);
      const parsedNotes = JSON.parse(localStorageNotes);
      if (parsedNotes) {
        return parsedNotes.map(val => {
          return { ...val, date: new Date(val.date) };
        });
      }
    }
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

  const addNoteToLocalStorage = (text) => {
    setNotes([...notes, {
      key: nanoid(),
      text: text,
      date: new Date()
    }]);
  }

  const deleteNoteFromDatabase = async (id) => {
    await fetch(`${ROOT_NOTES_URL}/${id}`, {
      method: "DELETE",
    });
    setNotes([...notes].filter((i) => i.key !== id));
  };

  const deleteNoteFromLocalStorage = (id) => {
    setNotes([...notes].filter((i) => i.key !== id));
  }

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

  const editNoteFromLocalStorage = (note, updatedText) => {
    note.text = updatedText;
    note.date = new Date(new Date());
    setNotes([...notes]);
  }

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
    if (user) {
      fetchNotesFromDatabase();
    }
    else {
      localStorage.setItem(LOCAL_STORAGE_DATA_NAME, JSON.stringify(notes));
    }
  }, [notes]);


  const addNote = (text) => {
    if (user) {
      return addNoteToDatabase(text);
    }
    else {
      return addNoteToLocalStorage(text);
    }
  };

  const removeNote = (key) => {
    if (user) {
      return deleteNoteFromDatabase(key);
    }
    else {
      deleteNoteFromLocalStorage(key);
    }
  };

  const editNote = (key, newText) => {
    const specificIndex = notes.findIndex((note) => note.key === key);
    const newNotes = [...notes];
    const specificNote = newNotes[specificIndex];
    if (newText !== specificNote.text) {
      if (user) {
        return editNoteFromDatabase(specificNote, newText);
      }
      else {
        editNoteFromLocalStorage(specificNote, newText);
      }
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
          <Header showNavigation={true} username={user?.email} onLoginClick={toggleLogin} onSignUpClick={toggleSignUp} onLogoutClick={onLogout} />
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
      <OffCanvasMenu content={<LoginForm onClose={toggleLogin} user={user?.email} handleOnSubmit={onAuthorize} onLoginClick={toggleLogin} onSignUpClick={toggleSignUp} />} isOpen={isLoggingIn} onClose={toggleLogin} />
      <OffCanvasMenu content={<SignUpForm onClose={toggleSignUp} user={user?.email} handleOnSubmit={onAuthorize} onLoginClick={toggleLogin} onSignUpClick={toggleSignUp} />} isOpen={isSigningUp} onClose={toggleSignUp} />
    </div>
  );
};

export default Home;
