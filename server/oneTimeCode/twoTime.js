import {sequelize} from "../models/index.js";
// Models importieren
import {Kanji} from "../models/kanji_models.js"
import { Meaningkun } from "../models/meanings_kun_model.js";
import { MeaningON } from "../models/meanings_ON_model.js";


let newKanji = {
    symbol : "人",
    strokes: 2,
    radikals: "人,亻",
    reading_kun: [{kunyomi : "ひと",
                   romanji : "hito",
                   translation : "Mensch"
                   }
                ],
    reading_ON:   [{onyomi : "ジン",
                    romanji : "jin",
                    translation : "nach Ländernamen zur Bezeichnung der Bewohner des Landes"
                    },
                    {onyomi : "ニン",
                    romanji : "nin",
                    translation : "Zählwort für Personen"
                    }
                ],
    }

Kanji.hasMany(Meaningkun);
Meaningkun.belongsTo(Kanji);
Kanji.hasMany(MeaningON);
MeaningON.belongsTo(Kanji);


await sequelize.sync({force: true} )
let kanji = await Kanji.create({
    symbol:   newKanji.symbol,
    strokes:  newKanji.strokes,
    radikals: newKanji.radikals,
    });

let i = 0;
while (i < newKanji.reading_kun.length) {
let testMeaning = newKanji.reading_kun[i].translation;
let j = i;
    while (j > 0) {
    if (testMeaning !== '') break;
    testMeaning = newKanji.reading_kun[j-1].translation;
    j--;
    }
let meaningKun = await Meaningkun.create({
    reading_kun: newKanji.reading_kun[i].kunyomi,
    reading_rom: newKanji.reading_kun[i].romanji,
    meaning: testMeaning,
    });
kanji.addMeanings_kuns(meaningKun);
    i++;
     }
    
i = 0;
while (i < newKanji.reading_ON.length) {
let testMeaning = newKanji.reading_ON[i].translation;
let j = i;
    while (j > 0) {
    if (testMeaning !== '') break;
    testMeaning = newKanji.reading_ON[j-1].translation;
    j--;
    }
let meaningON = await MeaningON.create({
    reading_ON: newKanji.reading_ON[i].onyomi,
    reading_rom: newKanji.reading_ON[i].romanji,
    meaning: testMeaning,
    });
    kanji.addMeanings_ONs(meaningON);
    i++;
    }    
// ARRAY nur in Postgres möglich!