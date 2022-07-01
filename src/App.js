import { useState } from 'react'
import { useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Note from "./components/Note"

function App() {

  const [allNotes, setNotes] = useState([])

  // fetch ("http://localhost:7777/notes")
  //   .then(res => res.json())
  //   .then(data => {
  //     setNotes(prev => {
  //       [...prev, JSON.parse(data)]
  //     })
  //   })

  //const [allNotes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || [])

  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(allNotes))
  // }, [allNotes])

  function addNote(event) {
    event.preventDefault()
    if (!document.querySelector(".addArea").value) return null
    const add = {
      id: nanoid(),
      text: document.querySelector(".addArea").value
    }
    document.querySelector(".addArea").value = ""
    setNotes(prev => [...prev, add])
  }

  function delNote(event, noteId) {
    event.stopPropagation()
    setNotes(prev => prev.filter(note => note.id !== noteId))
  }

  const notes = allNotes.map(note => {
    return(
      <Note 
        key={note.id}
        id={note.id}
        text={note.text}
        delNote={delNote}
      />
    )
  })

  return (
    <div className='app'>
      <div className="header">
          <h1>Notes</h1>
          <button className="refresh"><span>🗘</span></button>
      </div>
      <div className='notes'>
        {notes}
      </div>
      <h5>New Note</h5>
      <form className="addNote" onSubmit={addNote}>
        <textarea className="addArea"></textarea>
        <button className="addBtn" type="submit">➤</button>
      </form>
    </div>
  )
}

export default App;
