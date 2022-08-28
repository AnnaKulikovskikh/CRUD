import { useState, useRef } from 'react'
import './App.css'
import Note from "./components/Note"
import {nanoid} from "nanoid"

function App() {

  const url = "http://localhost:7777/notes/"
  const [allNotes, setNotes] = useState([])
  console.log('allNotes')
  console.log(allNotes)

  function load() {
    fetch(url)
      .then(res => res.json())
      .then(data => {
          for (let i of data) {
            if (allNotes.find(note => note.id === i.id)) {
              continue
            }
            setNotes(prev => [...prev, {id: i.id, text: i.text}])
          }
      })
  } 

  const nameField = useRef(null)

  async function addNote(event) {
    event.preventDefault()
    const addArea = nameField.current
    addArea.focus()

    if (!addArea.value) return null
    const add = {
      text: addArea.value
    }
    addArea.value = ""
    
    const options = {
      method: "POST",
      body: JSON.stringify(add),
      headers: {"Content-Type": "application/json"}
    }

    let response = await fetch(url, options)
    if (response.ok) {
      load()
    } else {
      alert ("Ошибка HTTP: " + response.status)
    }
  }

  // function delNote(event, noteId) {
  //   event.stopPropagation()
  //   setNotes(prev => prev.filter(note => note.id !== noteId))

  //   const options = {
  //     method: "DELETE"
  //   }

  //   fetch(url + noteId, options)
  // }

  async function delNote(event, noteId) {
    event.stopPropagation()

    const options = {
      method: "DELETE"
    }

    const response = await fetch(url + noteId, options)
    if (response.ok) {
      setNotes([])
      //load()
      fetch(url)
        .then(res => res.json())
        .then(data => {
          for (let i of data) {
            setNotes(prev => [...prev, {id: i.id, text: i.text}])
          }
        })
    } else {
      alert ("Ошибка HTTP: " + response.status)
    } 
  }

  const notes = allNotes.map(note => {
    return(
      <Note 
        key={nanoid()}
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
