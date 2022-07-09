import { useState } from 'react'
//import { useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Note from "./components/Note"

function App() {

  const url = "http://localhost:7777/notes/"
  const [allNotes, setNotes] = useState([])
  console.log(allNotes)

  function load() {
    fetch(url)
      .then(res => res.json())
      .then(data => {
          const nt = data.slice(0,2)
          for (let i of nt) {
            if (allNotes.find(note => note.id === i.id)) {
              continue
            }
            setNotes(prev => [...prev, {id: i.id, text: i.title}])
          }
      })
  } 

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

    const options = {
      method: "POST",
      body: JSON.stringify(add),
      headers: {"Content-Type": "application/json"}
    }

    // const url1 = `${url}: ${add.id}`
    fetch(url, options)
        .then(res => res.json())
        .then(data => console.log(data))
        // .then(data => {
        //   setNotes(prev => [...prev, data])
        //})
  }

  function delNote(event, noteId) {
    event.stopPropagation()
    setNotes(prev => prev.filter(note => note.id !== noteId))

    const options = {
      method: "DELETE"
    }

    fetch(url + noteId, options)
        .then(res => res.json())
        .then(data => {console.log(data)})
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
        <textarea className="addArea"></textarea>
        <button className="addBtn" type="submit">➤</button>
      </form>
    </div>
  )
}

export default App;
