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

    console.log(kanji);

// Formular -----------------------------------------------------------------
let formArray = [];
formArray.push(<div id="kanjiPortrait" key="symbol">{symbol}</div>);

formArray.push(<Eingabefeld beschreibung = "Strichzahl" id = "strokes" startvalue={strokes} key="strokes"/>);

formArray.push(<Eingabefeld beschreibung = "Radikale" id = "radicals" startvalue={radicals} key="radicals"/>);


let [lesungenKun,setLesungKun] = useState([]);
let [indexKun,setIndexKun] = useState(kunArray.length);

let moreReadings_kun = () => {
    setLesungKun([...lesungenKun,<Kunyomi id={`reading_kun_${indexKun}`} id2={`meaning_kun_${indexKun}`} id3={`translation_kun_${indexKun}`} key={`kun_${indexKun}`}/>]);
    setIndexKun(indexKun+1);
}

kunArray.forEach((element) => {formArray.push(<Kunyomi key={`${symbol}_kun_${kunArray.indexOf(element)}`} id={`reading_kun_${kunArray.indexOf(element)}`} id2={`meaning_kun_${kunArray.indexOf(element)}`} id3={`translation_kun_${kunArray.indexOf(element)}`} startValueKun={element.reading_kun} startValueRom={element.reading_rom} startValueMean={element.meaning}/>);})

formArray.push(<button id="expand_kun" className="abstand" onClick={moreReadings_kun}>weitere Lesearten ⇓</button>);

formArray.push(lesungenKun);


let [lesungenON,setLesungenON] = useState([]);
let [indexON,setindexON] = useState(ONArray.length);

let moreReadings_ON = () => {
    setLesungenON( [...lesungenON,<Onyomi id={`reading_ON_${indexON}`} id2={`meaning_ON_${indexON}`} id3={`translation_ON_${indexON}`} key={`ON_key_${indexON}`}/>]);
    setindexON(indexON+1);
}

ONArray.forEach((element) => {formArray.push(<Onyomi key={`${symbol}_on_${ONArray.indexOf(element)}`} id={`reading_ON_${ONArray.indexOf(element)}`} id2={`meaning_ON_${ONArray.indexOf(element)}`} id3={`translation_ON_${ONArray.indexOf(element)}`} startValueOn={element.reading_ON} startValueRom={element.reading_rom} startValueMean={element.meaning}/>)})

formArray.push(<button id="expand_ON" className="abstand" onClick={moreReadings_ON}>weitere Lesearten ⇓</button>);

formArray.push(lesungenON);
// erzeuge mehr Eingabefelder ---------------------------------------------------------------------






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

        <button onClick={changeKanji}>ändern</button> <button onClick={deleteKanji}>löschen</button>
        </div>
    )
}

export default KanjiEdit;