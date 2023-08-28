
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
    KunyomiMeaningAssistArray.push(<li className="kunyomiListElement" key={`kun_${j}_li`}><div className="readings" key={`kun_${j}_k`}>{kunyomi[j].reading_kun}</div><div className= "space" key={`kun_${j}_s`}/><div key={`kun_${j}_r`}>{kunyomi[j].reading_rom}</div></li>);
    if (j < kunyomi.length-1 && kunyomi[j].meaning === kunyomi[j+1].meaning) KunyomiMeaningAssistArray.push(<div className="space">|</div>);
    else {
            KanjiReadingKun.push(<div id={`kunyomi_${j}`} className="kunyomi" key={`kunyomi_${j}`}><div className="meaning" key={`kun_${j}_m`}>{meaning}:</div><ul className="kunyomiList">{KunyomiMeaningAssistArray}</ul></div>);
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
    OnyomiMeaningAssistArray.push(<li className="onyomiListElement" key={`on_${k}_li`}><div className="readings" key={`on_${k}_k`}>{onyomi[k].reading_ON}</div><div className= "space" key={`on_${k}_s`}/><div key={`on_${k}_r`}>{onyomi[k].reading_rom}</div></li>);
    if (k < onyomi.length-1 && onyomi[k].meaning === onyomi[k+1].meaning) OnyomiMeaningAssistArray.push(<div className="space">|</div>);
    else {
            KanjiReadingON.push(<div id={`onyomi_${k}`} className="onyomi" key={`onyomi_${k}`}><div className="meaning" key={`on_${k}_m`}>{meaning}:</div><ul className="onyomiList">{OnyomiMeaningAssistArray}</ul></div>) ;
            OnyomiMeaningAssistArray = [];
    }
    k++;
}



// Kanji Fläche präsentierbar machen!!!
    return (
        <div id="kanjiAusgabe" key="kanjiAnsicht">
            <div id="kanjiBild" key="symbol">{KanjiBild} </div>
            <div id = "info" key="info">
            <div id="kanjiStriche" key="strokes">Strichzahl: {KanjiStriche}</div>
            <div id="kanjiRadikale" key="radicals">Radikale: {KanjiRadikale}</div>
            <div className="kun" key="kun">kun:</div>
            <div className="kunBox" key="kunBox">
            <div id="kanjiReadingKun" key="readingsKun"> {KanjiReadingKun}</div>
            </div>
            <div className="ON" key="ON">ON:</div>
            <div className="OnBox" key="OnBox">
            <div id="kanjiReadingON" key="readingsOn"> {KanjiReadingON}</div>
            </div>
            </div>
        </div>
    )
}

export default KanjiAnsicht;