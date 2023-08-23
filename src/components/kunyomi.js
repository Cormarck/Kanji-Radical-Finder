import Eingabefeld from "./eingabefeld";

let Kunyomi = ({id, id2, id3, title}) => {
    return (
        <div className="flexbox">
        <Eingabefeld beschreibung = "Leseart (kun'yomi)" id = {id} />
        <Eingabefeld beschreibung = "Aussprache (Rōmanji)" klasse="abstand" id = {id2}/>
        <Eingabefeld beschreibung = "Bedeutung" klasse="abstand" id = {id3} title={title} />
        </div>
    )
}

export default Kunyomi