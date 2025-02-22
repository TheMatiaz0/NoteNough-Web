import NotesList from "../components/Core/NotesList";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Search from "../components/Core/Search";
import Header from "../components/Header";
import OffCanvasMenu from "../components/Account/OffCanvasMenu";
import SignUpForm from "../components/Account/Authorization/SignUpForm";
import LoginForm from "../components/Account/Authorization/LoginForm";

const Home = ({ user, onAuthorize, onLogout, userLoggedIn }) => {
  const ROOT_NOTES_URL = `${process.env.REACT_APP_ROOT_URL}/api/notes`;
  const LOCAL_STORAGE_DATA_NAME = "NoteNough-app-data";
  const backendEnabled = process.env.REACT_APP_BACKEND_ENABLED === "true";

  const defaultNotes = [];

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSortedByNewest, setIsSortedByNewest] = useState(true);

  const getLocalNotes = () => {
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
  }

  const [notes, setNotes] = useState(() => {
    return getLocalNotes();
  });

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

  const addNoteToDatabase = async (text) => {
    let response = await fetch(ROOT_NOTES_URL, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        text: text,
      }),
      headers: {
        "Content-Type": process.env.REACT_APP_FETCH_TYPE,
      },
    });
    let data = await response.json();
    setNotes((notes) => [
      { key: data.key, text: data.text, date: new Date(data.created) },
      ...notes,
    ]);
  };

  const addNoteToLocalStorage = (text) => {
    setNotes([{
      key: nanoid(),
      text: text,
      date: new Date()
    }, ...notes]);
  }

  const deleteNoteFromDatabase = async (id) => {
    await fetch(`${ROOT_NOTES_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setNotes([...notes].filter((i) => i.key !== id));
  };

  const deleteNoteFromLocalStorage = (id) => {
    setNotes([...notes].filter((i) => i.key !== id));
  }

  const editNoteFromDatabase = async (note, updatedText) => {
    let response = await fetch(`${ROOT_NOTES_URL}/${note.key}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        text: updatedText,
      }),
      headers: {
        "Content-Type": process.env.REACT_APP_FETCH_TYPE,
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
      const response = await fetch(ROOT_NOTES_URL, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": process.env.REACT_APP_FETCH_TYPE,
        }
      });
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
    if (!user) {
      localStorage.setItem(LOCAL_STORAGE_DATA_NAME, JSON.stringify(notes));
    }
  }, [notes]);

  useEffect(() => {
    if (user) {
      fetchNotesFromDatabase();
    }
    else {
      setNotes(getLocalNotes());
    }
  }, [userLoggedIn]
  );

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

  const reorderNotes = (reorderedNotes) => {
    setNotes(reorderedNotes);
  }

  const toggleSortOrder = () => {
    setIsSortedByNewest((prev) => !prev);
  }

  const toggleLogin = () => {
    setIsSigningUp(false);
    setIsLoggingIn((prevState) => !prevState);
  };

  const toggleSignUp = () => {
    setIsLoggingIn(false);
    setIsSigningUp((prevState) => !prevState);
  }

  const contentMarginRight = (isLoggingIn || isSigningUp) ? "margin-right-active" : "margin-right-deactive";
  return (
    <div>
      <div className="app-container">
        <div id="main" className={contentMarginRight}>
          <Header showNavigation={backendEnabled} username={user?.email} onLoginClick={toggleLogin} onSignUpClick={toggleSignUp} onLogoutClick={onLogout} />
          <main>
            <Search handleSearchText={setSearchText} toggleSortOrder={toggleSortOrder} isSortedByNewest={isSortedByNewest} />
            <NotesList
              notes={notes}
              searchText={searchText}
              handleAddNote={addNote}
              handleRemoveNote={removeNote}
              handleEditNote={editNote}
              handleReorderNotes={reorderNotes}
              isSortedByNewest={isSortedByNewest}
            />
          </main>
        </div>
      </div>
      <OffCanvasMenu content={<LoginForm onClose={toggleLogin} user={user?.email} handleOnSubmit={onAuthorize} onLoginClick={toggleLogin} onSignUpClick={toggleSignUp} />} isOpen={isLoggingIn} onClose={toggleLogin} />
      <OffCanvasMenu content={<SignUpForm onClose={toggleSignUp} user={user?.email} handleOnSubmit={onAuthorize} onLoginClick={toggleLogin} onSignUpClick={toggleSignUp} />} isOpen={isSigningUp} onClose={toggleSignUp} />
    </div>
  );
};

export default Home;
