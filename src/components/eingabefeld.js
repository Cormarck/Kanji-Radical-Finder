let Eingabefeld = ({beschreibung, id, title, klasse,startvalue}) => {

    

    return (
        <div className="flexbox">
            <p className={klasse}>{beschreibung}</p> <input type="text" id={id} title={title} defaultValue={startvalue}></input>
        </div>
    )
}

export default Eingabefeld