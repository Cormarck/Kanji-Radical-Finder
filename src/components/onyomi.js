import Eingabefeld from "./eingabefeld";

let Onyomi = ({id, id2, id3, title, startValueOn, startValueRom, startValueMean}) => {
return (
        <div className="flexbox">
        <Eingabefeld beschreibung = "Leseart (On'yomi)" id = {id} startvalue={startValueOn}/>
        <Eingabefeld beschreibung = "Aussprache (Rōmanji)" klasse="abstand" id = {id2} startvalue={startValueRom}/>
        <Eingabefeld beschreibung = "Bedeutung" klasse="abstand" id = {id3} title={title} startvalue={startValueMean}/>
        </div>
    )
}

export default Onyomi