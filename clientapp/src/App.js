import NotesList from './components/NotesList';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
  // const LOCAL_STORAGE_DATA_NAME = "NoteNough-app-data";

  const defaultNotes = [{
    key: nanoid(),
    text: "This is an example note",
    date: new Date(2022, 7, 24, 10, 9, 5, 10)
  },
  {
    key: nanoid(),
    text: "This is an example note 2",
    date: new Date(2023, 10, 1, 10, 9, 5, 10)
  },
  {
    key: nanoid(),
    text: "This is an example note 3",
    date: new Date(2024, 10, 1, 10, 9, 5, 10)
  }];

  const parseNoteDates = (parsedNotes) => {
    return parsedNotes.map(val => {
      return {...val, date: new Date(val.date)};
    })
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

  const [searchText, setSearchText] = useState('');

  /*
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_DATA_NAME, JSON.stringify(notes));
  }, [notes]);
  */

  useEffect(() => {
    fetch('http://localhost:8080/api/Notes')
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          setNotes(parseNoteDates(data));
       })
       .catch((err) => {
          console.log(err.message);
       });
 }, []);

  const addNote = (text) => {
    setNotes([...notes, {
      key: nanoid(),
      text: text,
      date: new Date()
    }]);
  }

  const removeNote = (key) => {
    setNotes(notes.filter(note => note.key !== key));
  }

  const editNote = (key, newText) => {
    const specificIndex = notes.findIndex(note => note.key === key);
    const newNotes = [...notes];
    const specificNote = newNotes[specificIndex];
    if (newText !== specificNote.text) {
      specificNote.text = newText;
      specificNote.date = new Date();
      setNotes(newNotes);
    }
  }

  const filterText = (note) => 
    note.text.toLowerCase().includes(searchText.toLowerCase());

  return (
    <div>
      <div className='container'>
        <Header />
        <Search handleSearchText={setSearchText} />
        <NotesList notes={notes.filter(filterText)} searchText={searchText} handleAddNote={addNote} handleRemoveNote={removeNote} handleEditNote={editNote} />
      </div>
    </div>
  )
}

export default App;