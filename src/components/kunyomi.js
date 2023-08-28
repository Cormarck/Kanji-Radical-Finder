import Eingabefeld from "./eingabefeld";

let Kunyomi = ({id, id2, id3, title, startValueKun, startValueRom, startValueMean}) => {
    return (
        <div className="flexbox">
        <Eingabefeld beschreibung = "Leseart (kun'yomi)" id = {id} startvalue={startValueKun}/>
        <Eingabefeld beschreibung = "Aussprache (Rōmanji)" klasse="abstand" id = {id2} startvalue={startValueRom}/>
        <Eingabefeld beschreibung = "Bedeutung" klasse="abstand" id = {id3} title={title} startvalue={startValueMean}/>
        </div>
    )
}

export default Kunyomi