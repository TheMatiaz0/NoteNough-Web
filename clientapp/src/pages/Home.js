import NotesList from "../components/NotesList";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Search from "../components/Search";
import Header from "../components/Header";
import OffCanvasMenu from "../components/OffCanvasMenu";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const Home = () => {
  // const LOCAL_STORAGE_DATA_NAME = "NoteNough-app-data";
  const ROOT_NOTES_URL = `http://${window.location.hostname}:8080/api/Notes`;
  const ROOT_AUTHENTICATION_URL = `http://${window.location.hostname}:8080/api/auth`;
  const FETCH_CONTENT_TYPE = "application/json; charset=UTF-8";
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
    let response = await fetch(ROOT_NOTES_URL, {
      method: "POST",
      body: JSON.stringify({
        text: text,
      }),
      headers: {
        "Content-type": FETCH_CONTENT_TYPE,
      },
    });
    let data = await response.json();
    setNotes(parseNoteDates(data));
  };

  const deleteNoteFromDatabase = async (id) => {
    await fetch(`${ROOT_NOTES_URL}/${id}`, {
      method: "DELETE",
    });
    setNotes([...notes].filter((i) => i.key !== id));
  };

  const editNoteFromDatabase = async (note, updatedText) => {
    const response = await fetch(`${ROOT_NOTES_URL}/${note.key}`, {
      method: "PUT",
      body: JSON.stringify({
        text: updatedText,
      }),
      headers: {
        "Content-type": FETCH_CONTENT_TYPE,
      },
    });
    note.text = updatedText;
    note.date = response;
    setNotes([...notes]);
  };

  async function fetchNotes() {
    try {
      const response = await fetch(ROOT_NOTES_URL);
      if (!response.ok) {
        throw new Error(response.status);
      }
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

  const fetchUser = async () => {
    try {
      const url = `${ROOT_AUTHENTICATION_URL}/user`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const content = await response.json();
      setEmail(content.email);
      fetchNotesFromDatabase();
    }
    catch (e) {
      console.error(e);
    }
  }

  const logoutUser = async () => {
    console.log("tso?");
    await fetch(`${ROOT_AUTHENTICATION_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-type": FETCH_CONTENT_TYPE,
      },
    });
  }

  useEffect(() => {
    fetchUser();
    fetchNotesFromDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const [isSigningUp, setIsSigningUp] = useState(false);

  const [email, setEmail] = useState("");

  const toggleLogin = () => {
    setIsLoggingIn((prevState) => !prevState);
  };

  const toggleSignUp = () => {
    setIsSigningUp((prevState) => !prevState);
  }

  const contentMarginRight = (isLoggingIn || isSigningUp) ? "100px" : "0";
  return (
    <div>
      <div className="app-container">
        <div id="main" style={{ marginRight: contentMarginRight }}>
          <Header username={email} onLoginClick={toggleLogin} onSignUpClick={toggleSignUp} onLogoutClick={logoutUser} />
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
      <OffCanvasMenu content={<LoginForm onClose={toggleLogin} handleOnSubmit={fetchUser} />} isOpen={isLoggingIn} onClose={toggleLogin} />
      <OffCanvasMenu content={<SignUpForm onClose={toggleSignUp} handleOnSubmit={fetchUser} />} isOpen={isSigningUp} onClose={toggleSignUp} />
    </div>
  );
};

export default Home;
