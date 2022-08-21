import { useState, useRef } from 'react'
//import { useEffect } from 'react'
import './App.css'
import Note from "./components/Note"

function App() {

  const url = "http://localhost:7777/notes/"
  const [allNotes, setNotes] = useState([])
  const [nextId, setNextId] = useState(0)

  function load() {
    fetch(url)
      .then(res => res.json())
      .then(data => {
          for (let i of data) {
            if (allNotes.find(note => note.id === i.id)) {
              continue
            }
            setNotes(prev => [...prev, {id: i.id, text: i.text}])
            setNextId(prevId => i.id + 1)
          }
      })
  } 

  //const [allNotes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || [])

  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(allNotes))
  // }, [allNotes])

  const nameField = useRef(null)

  function addNote(event) {
    event.preventDefault()
    const addArea = nameField.current
    addArea.focus()

    if (!addArea.value) return null
    const add = {
      id: nextId,
      text: addArea.value
    }
    addArea.value = ""
    
    setNextId(prevId => prevId + 1)
    setNotes(prev => [...prev, add])

    const options = {
      method: "POST",
      body: JSON.stringify(add),
      headers: {"Content-Type": "application/json"}
    }

    fetch(url, options)
  }

  function delNote(event, noteId) {
    event.stopPropagation()
    setNotes(prev => prev.filter(note => note.id !== noteId))

    const options = {
      method: "DELETE"
    }

    fetch(url + noteId, options)
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
          <button className="refresh" onClick={load}><span>🗘</span></button>
      </div>
      <div className='notes'>
        {notes}
      </div>
      <h5>New Note</h5>
      <form className="addNote" onSubmit={addNote}>
        <textarea className="addArea" ref={nameField}></textarea>
        <button className="addBtn" type="submit">➤</button>
      </form>
    </div>
  )
}

export default App;
