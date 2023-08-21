let Eingabefeld = ({beschreibung, id, title, klasse}) => {
    return (
        <div className="flexbox">
            <p className={klasse}>{beschreibung}</p> <input type="text" id={id} title={title}></input>
        </div>
    )
}

export default Eingabefeld