import Stein from "./stein"

// Erstellt nur Stein Array aus dem Array, was ihm gegeben wird
let Auswahlflaeche = function ({array, clickFunktion, klasse, begriff,act}) {
    let rows =[];
    array.forEach ((item) => rows.push(<Stein inhalt = {item} index = {begriff + "_" + item} act = {act} clickHandler={clickFunktion} key={begriff + "_" + item}/>))
    
    return (
        <div className= {klasse}>
            {rows}
        
        </div>
    )
}

export default Auswahlflaeche

/*for (let i = 0; i < array.length; i++) {
        rows.push(<Stein inhalt = {array[i]} index = {begriff + " " + i} clickHandler={clickFunktion} key={i}/>)
    }*/