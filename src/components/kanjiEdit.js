import Eingabefeld from "./eingabefeld";
import './../css/eingabefeld.css';
import Kunyomi from "./kunyomi";
import Onyomi from "./onyomi";
import { useState } from "react";

let KanjiEdit = function ({text}) {
    let kanji = text;
    let symbol = kanji.symbol;
    let strokes = kanji.strokes;
    let radicals = kanji.radicals;
    let kunArray = kanji.kunArray;
    let ONArray = kanji.ONArray;

    
// Formular -----------------------------------------------------------------
let formArray = [];
formArray.push(<div id="kanjiPortrait">{symbol}</div>);

formArray.push(<Eingabefeld beschreibung = "Strichzahl" id = "strokes" startvalue={strokes}/>);


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

// Kanji zur Änderung an Server übergeben ---------------------------------------------------------------------
let changeKanji = function () {
    console.log(document.querySelector('#strokes').value);
    console.log("in Arbeit");
}

let deleteKanji = function () {
    console.log("in Arbeit");
}


// --------------------------------------------------------------------------


    return (
        <div>
        {formArray}
        


        <div id="anlegeformular">
        <ul className="list">
        <li>
        <Eingabefeld beschreibung = "Strichzahl" id = "strokes"/>
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
        <button onClick={changeKanji}>ändern</button> <button onClick={deleteKanji}>löschen</button>
        </div>
        </div>
    )
}

export default KanjiEdit;