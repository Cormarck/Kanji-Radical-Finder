import Eingabefeld from "./eingabefeld";
import './../css/eingabefeld.css';
import Kunyomi from "./kunyomi";
import Onyomi from "./onyomi";
import { useState } from "react";

class Kanji {
    constructor (symbol, strokes, radicals, reading_kun, reading_ON) {
        this.symbol = symbol;
        this.strokes = strokes;
        this.radicals = radicals;
        this.reading_kun = reading_kun;
        this.reading_ON = reading_ON;
        
    }
}


// Ausgabe ----------------------------------------------------------------------------------------
let Anlegeformular = () => {
// erzeuge mehr Eingabefelder ---------------------------------------------------------------------
let [lesungenKun,setLesungKun] = useState([]);
let [kunyomiLesungen,setKunyomiLesungen] = useState(1);

let moreReadings_kun = () => {
    setLesungKun( [...lesungenKun,<Kunyomi id={`reading_kun_${kunyomiLesungen}`} id2={`meaning_kun_${kunyomiLesungen}`} id3={`translation_kun_${kunyomiLesungen}`} key={`kun_key_${kunyomiLesungen}`}/>]);
    setKunyomiLesungen(kunyomiLesungen+1);
}


let [lesungenON,setLesungenON] = useState([]);
let [onyomiLesungen,setOnyomiLesungen] = useState(1);

let moreReadings_ON = () => {
    setLesungenON( [...lesungenON,<Onyomi id={`reading_ON_${onyomiLesungen}`} id2={`meaning_ON_${onyomiLesungen}`} id3={`translation_ON_${onyomiLesungen}`} key={`ON_key_${onyomiLesungen}`}/>]);
    setOnyomiLesungen(onyomiLesungen+1);
}
// ------------------------------------------------------------------------------------------------

// Kanji an Server übergeben ---------------------------------------------------------------------
let submitKanji = () => {
// Auf Fehler testen
if (   
       document.querySelector("#symbol").value && document.querySelector("#strokes").value &&  document.querySelector("#radicals").value 
    && document.querySelector(`#reading_kun_0`).value && document.querySelector(`#meaning_kun_0`).value && document.querySelector(`#translation_kun_0`).value
    && document.querySelector(`#reading_ON_0`).value && document.querySelector(`#meaning_ON_0`).value && document.querySelector(`#translation_ON_0`).value
    )
{
// Daten zusammentragen
    // kun'yomi gruppieren
    let kunReadingArray = [];
    let i = 0;
    while ( i < kunyomiLesungen) {
        kunReadingArray.push(
            {
                "kunyomi"     : document.querySelector(`#reading_kun_${i}`).value,
                "romanji"     : document.querySelector(`#meaning_kun_${i}`).value,
                "translation" : (document.querySelector(`#translation_kun_${i}`).value) ? document.querySelector(`#translation_kun_${i}`).value : kunReadingArray[i-1].translation,
            }
        
        )
        i++;
    }

    // on'yomi gruppieren
    let onReadingArray = [];
    let j = 0;
    while ( j < onyomiLesungen) {
        onReadingArray.push(
            {
                "onyomi"     : document.querySelector(`#reading_ON_${j}`).value,
                "romanji"     : document.querySelector(`#meaning_ON_${j}`).value,
                "translation" : (document.querySelector(`#translation_ON_${j}`).value) ? document.querySelector(`#translation_ON_${j}`).value : onReadingArray[i-1].translation,
            }
        
        )
        j++;
    }

// Kanji erzeugen
    let newKanji = new Kanji (
        document.querySelector("#symbol").value,
        document.querySelector("#strokes").value,
        document.querySelector("#radicals").value,

        kunReadingArray,
        onReadingArray,
    )


 // reset Form
    let reset = function () {
       
        kunReadingArray = [];
        onReadingArray = [];
        setLesungKun([]);
        setLesungenON([]);
        document.querySelector("#symbol").value = "";
        document.querySelector("#strokes").value = "";
        document.querySelector("#radicals").value = "";
        document.querySelector(`#reading_kun_0`).value = "";
        document.querySelector(`#meaning_kun_0`).value = "";
        document.querySelector(`#translation_kun_0`).value ="";
        document.querySelector(`#reading_ON_0`).value = "";
        document.querySelector(`#meaning_ON_0`).value = "";
        document.querySelector(`#translation_ON_0`).value ="";
        if (document.querySelector('#fehlerNachricht'))  document.querySelector('#anlegeformular').remove(document.querySelector('#fehlerNachricht')) ;
    }

// Kanji übertragen
        
    fetch('/newKanji', {
        method: "POST",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(newKanji),   
    })
    .then(reset());

} else {
    if (!document.querySelector('#fehlerNachricht')) {
        let anlegeformular = document.querySelector('#anlegeformular');
        let fehlerNachricht = document.createElement("div");
        fehlerNachricht.id = "fehlerNachricht";
        fehlerNachricht.textContent = "Fehlende Eingabe!"
            anlegeformular.append(fehlerNachricht);
    }
}
}
// ---------------------------------------------------------------------------------------------------

    return (
        <div id="anlegeformular">
        <ul className="list">
        <li>
        <Eingabefeld beschreibung = "Kanji" id = "symbol" title="nur ein Kanji pro Eintrag, keine Kombinationen"/>
        </li>
        <li>
        <Eingabefeld beschreibung = "Strichzahl" id = "strokes" title ="bitte als reine Zahl angeben" />
        </li>
        <li>
        <Eingabefeld beschreibung = "Radikale" id = "radicals" title='angeben nach Muster: "1stes Radikal, 2tes Radikal, ..."'/>
        </li>
        <li className="flexbox" id="kun'yomi">
        <Kunyomi id="reading_kun_0" id2="meaning_kun_0" id3="translation_kun_0" title='Hier alle Übersetzungen zur Schreibweise angeben. (Muster: Übersetzung1,Übersetzung2,...) Bei gleicher Übersetzung wie die vorherige Schreibweise kann die Übersetzung weggelassen werden.'/>
        <button id="expand_kun" className="abstand" onClick={moreReadings_kun}>weitere Lesearten ⇓</button>
        </li>
        {lesungenKun}
        <li>
        <div className="flexbox">
        <Onyomi id="reading_ON_0" id2="meaning_ON_0" id3="translation_ON_0" title='Hier alle Übersetzungen zur Schreibweise angeben. (Muster: Übersetzung1,Übersetzung2,...) Bei gleicher Übersetzung wie die vorherige Schreibweise kann die Übersetzung weggelassen werden.'/>
        <button id="expand_ON" className="abstand" onClick={moreReadings_ON}>weitere Lesearten ⇓</button>
        </div>
        {lesungenON}
        </li>
        </ul>
        <button onClick={submitKanji}>Speichern</button>
        </div>
    )
}

export default Anlegeformular;