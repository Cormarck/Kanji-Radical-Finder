
let KanjiAnsicht = function ({text}) {
let kanji = text;

let KanjiBild = kanji.symbol;
let KanjiStriche = kanji.strokes;
let radikale = kanji.radicals.split(",")
let KanjiRadikale = [];
let i = 0;
while (i < radikale.length) {
    KanjiRadikale.push (<div id={`radical_${i}`} className="radicals" key={`radical_${i}`}>{radikale[i]}</div>);
    i++;
}
let kunyomi = kanji.kunArray;

let KanjiReadingKun = [];
let KunyomiMeaningAssistArray = [];
let j = 0;
while (j < kunyomi.length) {
    let meaning = kunyomi[j].meaning;
    KunyomiMeaningAssistArray.push(<li className="kunyomiListElement"><div className="readings">{kunyomi[j].reading_kun}</div><div className= "space"/><div>{kunyomi[j].reading_rom}</div></li>);
    if (j < kunyomi.length-1 && kunyomi[j].meaning === kunyomi[j+1].meaning) KunyomiMeaningAssistArray.push(<div className="space">|</div>);
    else {
            KanjiReadingKun.push(<div id={`kunyomi_${j}`} className="kunyomi" key={`kunyomi_${j}`}><div className="meaning">{meaning}:</div><ul className="kunyomiList">{KunyomiMeaningAssistArray}</ul></div>);
            KunyomiMeaningAssistArray = [];
        }
    j++;
}

let onyomi = kanji.ONArray;
let KanjiReadingON = [];
let OnyomiMeaningAssistArray = [];
let k = 0;
while (k < onyomi.length) {
    let meaning = onyomi[k].meaning;
    OnyomiMeaningAssistArray.push(<li className="onyomiListElement"><div className="readings">{onyomi[k].reading_ON}</div><div className= "space"/><div>{onyomi[k].reading_rom}</div></li>);
    if (k < onyomi.length-1 && onyomi[k].meaning === onyomi[k+1].meaning) OnyomiMeaningAssistArray.push(<div className="space">|</div>);
    else {
            KanjiReadingON.push(<div id={`onyomi_${k}`} className="onyomi" key={`onyomi_${k}`}><div className="meaning">{meaning}:</div><ul className="onyomiList">{OnyomiMeaningAssistArray}</ul></div>) ;
            OnyomiMeaningAssistArray = [];
    }
    k++;
}



// Kanji Fläche präsentierbar machen!!!
    return (
        <div id="kanjiAusgabe">
            <div id="kanjiBild">{KanjiBild} </div>
            <div id = "info">
            <div id="kanjiStriche">Strichzahl: {KanjiStriche}</div>
            <div id="kanjiRadikale">Radikale: {KanjiRadikale}</div>
            <div className="kun">kun:</div>
            <div className="kunBox">
            <div id="kanjiReadingKun"> {KanjiReadingKun}</div>
            </div>
            <div className="ON">ON:</div>
            <div className="OnBox">
            <div id="kanjiReadingON"> {KanjiReadingON}</div>
            </div>
            </div>
        </div>
    )
}

export default KanjiAnsicht;