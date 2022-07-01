function Note(props) {      
  return(
    <div className="note">
        <div className="text">{props.text}</div>
        <button className="clearBtn" onClick={(e) => props.delNote(e, props.id)}><span>❌</span></button>
    </div>
  )
}

export default Note
