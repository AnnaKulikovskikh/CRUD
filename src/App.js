import { useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Clock from "./components/Clock"

function App() {
  //const [clock, setClock] = useState([{id: nanoid(), name: "Moskow", zone: 3}])
  const [clock, setClock] = useState([])

  const addClock = event => {
    
    event.preventDefault()
    if (event.target.name.value === '' || event.target.zone.value === '') return null
    const add = { 
      id: nanoid(),
      name: event.target.name.value.trim(), 
      zone: event.target.zone.value.trim()
    }
    event.target.name.value = ""
    event.target.zone.value = ""
    setClock(prevForm => [...prevForm, add])
  }

  function deleteClock(event, clockId) {
    event.stopPropagation()
    setClock(prevClock => prevClock.filter(clo => clo.id !== clockId))
  }
  
  const clocks = clock.map(item => {
    return (
      <Clock
        key={item.id}
        id={item.id}
        name={item.name}
        zone={item.zone}
        deleteClock={deleteClock}
      />
    )
  })

  return (
    <div className='app'>
      <form className='form' onSubmit={addClock}>
        <label>
          <span>Название</span>
          <input name='name'/>
        </label>
        <label>
          <span>Временная зона</span>
          <input name='zone' type='number'/>
        </label>
        <button type='submit'>Добавить</button>
      </form>
      <div className="clocks">
        {clocks}
      </div>
    </div>
  )
}

export default App;
