import Eingabefeld from "./eingabefeld";

let Onyomi = ({id, id2, id3, title}) => {
return (
        <div className="flexbox">
        <Eingabefeld beschreibung = "Leseart (On'yomi)" id = {id} />
        <Eingabefeld beschreibung = "Aussprache (Rōmanji)" klasse="abstand" id = {id2}/>
        <Eingabefeld beschreibung = "Übersetzung" klasse="abstand" id = {id3} title={title}/>
        </div>
    )
}

export default Onyomi