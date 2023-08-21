// erstellt einzelne Steine mit dem Wert, der gegeben wird
let Stein = function ({inhalt, index, clickHandler,act}) {

    return (
        <div className="stein" id = {index} style={(act.includes(inhalt))?{backgroundColor: "rgba(0,0,0,0.5"}:{}} onClick={ () => {clickHandler(inhalt,act)}}>
            {inhalt}
        </div>
    )
}

export default Stein