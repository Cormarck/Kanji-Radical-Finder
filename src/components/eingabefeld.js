let Eingabefeld = ({beschreibung, id, title, klasse,startvalue}) => {

    
// use defaultValue instead of value for forms in React ; value makes it readOnly
    return (
        <div className="flexbox">
            <p className={klasse}>{beschreibung}</p> <input type="text" id={id} title={title} defaultValue={startvalue}></input>
        </div>
    )
}

export default Eingabefeld