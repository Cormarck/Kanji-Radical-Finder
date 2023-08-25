import useFetch from 'react-fetch-hook';
import{useState} from 'react';
import Auswahlflaeche from './auswahl';
import Uberschrift from './uberschrift';
import Radikalfilter from './filterRadikale';
import Kanjifilter from './filterKanji';
import KanjiEdit from './kanjiEdit';
import '../css/stein.css';
import '../css/auswahl.css';
import '../css/uberschrift.css';
import '../css/kanjiAusgabe.css';
import '../css/edit.css';

// Strichzahl Array aus Arrays JSON auslesen -------------------------------
let Strichzahl = function ({clickFunktion, klasse, begriff, act}) {
    const {isLoading, data} = useFetch("/arrays.json"); // liest Strichzahl Array aus array.Json aus
    return isLoading ? (<div>Loading...</div>) : 
                (
                <div>
                  <Auswahlflaeche klasse = {klasse} array = {data.strichzahl} act = {act} clickFunktion={clickFunktion} begriff = {begriff}/>
                </div>
              );
    
    }
    // -------------------------------------------------------------------
function EditFormular() {


    // Funktionen ---------------------------------------------------------
    // Funktion um die Radikale anhand der Strichzahl zu filtern
    const [radikalFilter, setRadikalFilter] = useState();
    const [gedruckterStrichzahlButton,setGedruckterStrichzahlButton] = useState([0]);

    let strichzahlAndern = function (value) {
    if (gedruckterStrichzahlButton.includes(value)) { // wenn bereits ein Stein gedrückt wurde und erneut gedrückt wird, wird zum Ursprung zurückgekehrt
    setRadikalFilter("");
    setGedruckterStrichzahlButton([0]);
    }
    else {
    setRadikalFilter(value);  // Strichzahl wird auf das gesetzt, was auf dem Stein drauf steht!(inhalt)
    setGedruckterStrichzahlButton([value]);
    };
    }

    // Funktion um die Kanji anhand der Radikale zu filtern
    const [kanjiFilterArray,setKanjiFilterArray] = useState([]);
    const [gedruckteRadikalButton,setGedruckteRadikalButton] = useState([]);

    let radikaleAndern = function (value) {
    if (kanjiFilterArray.includes(value)) { 
    // remove from search 
    let newArray = kanjiFilterArray;
    let x = newArray.indexOf(value);
    newArray.splice(x,1);
    setKanjiFilterArray([...newArray])
    // remove from act
    newArray = gedruckteRadikalButton
    x = newArray.indexOf(value);
    newArray.splice(x,1);
    setGedruckteRadikalButton([...newArray]);
    }
    else {
    setKanjiFilterArray([...kanjiFilterArray,value]);
    setGedruckteRadikalButton([...gedruckteRadikalButton,value]);
    }
        // setzt den Filter momentan nur auf auf ein Radikal
    }

    // Kanji Anzeige Funktion

    let [actKanji,setActKanji] = useState([]);
    let [kanjiAnsicht,setKanjiAnsicht] = useState();
    let gefKanji;

    let kanjiTest = function (value) {
    if(actKanji.includes(value)) {
        setKanjiAnsicht();
        setActKanji([]);

    } else {
    let gesKanji = {"symbol" : value}
        setKanjiAnsicht();
        setActKanji([]);
    fetch('/KanjiInfo', {
        method: "POST",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(gesKanji),   
    })
    .then((res) => res.json()) // hier kein Console.log möglich; muss zuerst entJSONed werden
    .then((obj) => gefKanji = obj)
    .then(() => setKanjiAnsicht(<KanjiEdit text = {gefKanji}/>))
    .then(() => setActKanji([gefKanji.symbol]))
    }
    }

// -----------------------------------------------------------------------

return (
        <div id="edit_box">
        <div>
        <h1 id="edit_header">Sie befinden sich im Edit Modus!</h1>
        <Uberschrift text ="Strichzahl der Radikale"/>
        <Strichzahl klasse = "auswahlStrichzahl" clickFunktion={strichzahlAndern} begriff = "Striche" act = {gedruckterStrichzahlButton} /> 
        <Uberschrift text="Radikale"/>
        <Radikalfilter klasse = "auswahlRadikale"  clickFunktion={radikaleAndern} begriff= "Radikal" filter = {radikalFilter} act = {gedruckteRadikalButton}/>
        <Kanjifilter clickFunktion={kanjiTest} begriff= "Kanji" filterArray = {kanjiFilterArray} act={actKanji}/>
        
        </div>
        <div id="changeForm">{kanjiAnsicht}</div>
        </div>
    )
}

export default EditFormular;