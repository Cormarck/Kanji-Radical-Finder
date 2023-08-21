import Uberschrift from './uberschrift';
import Stein from "./stein";

// Datenbank abfragen, statt test Array

function Ausgabe ({array,clickFunktion,begriff,act}) {
    let rows = [];

    array.forEach ((item,index,arr) => rows.push(<Stein inhalt = {item.symbol} index = {begriff + " " + item.symbol} clickHandler={clickFunktion} key={item.symbol} act = {act}/>))

    return (
        <div>
            <Uberschrift text="Kanji"/>
            <div className="ausgabe">
                {rows}
            
            </div>
        </div>
    )
    
}

export default Ausgabe