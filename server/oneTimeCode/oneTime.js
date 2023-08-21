import {sequelize} from "../models/index.js";
// Models importieren
import {Kanji} from "../models/kanji_models.js"
import { Meaningkun } from "../models/meanings_kun_model.js";
import { MeaningON } from "../models/meanings_ON_model.js";


let newKanji = {
    symbol : "金",
    strokes: 8,
    radikals: "金",
    reading_kun: [{kunyomi : "かね",
                   romanji : "kane",
                   translation : "Gold"
                   },
                   {kunyomi : "かな-",
                    romanji : "kana-",
                    translation : "Gold"
                   },
                   {kunyomi : "-がね",
                    romanji : "-gane",
                    translation : "Gold"
                   }
                ],
    reading_ON:   [{onyomi : "キン",
                    romanji : "kin",
                    translation : "Gold"
                    },
                    {onyomi : "コン",
                    romanji : "kon",
                    translation : "Gold"
                    },
                    {onyomi : "ゴン",
                    romanji : "gon",
                    translation : "Gold"
                    }
                ],
    }

Kanji.hasMany(Meaningkun);
Meaningkun.belongsTo(Kanji);
Kanji.hasMany(MeaningON);
MeaningON.belongsTo(Kanji);

sequelize.sync({force: true} /**/)
.then( () => {Kanji.create({
    symbol:   newKanji.symbol,
    strokes:  newKanji.strokes,
    radikals: newKanji.radikals,
    })
    .then((data) => {
        let kanji = data;
        let i = 0;
        while (i < newKanji.reading_kun.length) {
        let testMeaning = newKanji.reading_kun[i].translation;
        let j = i;
            while (j > 0) {
            if (testMeaning !== '') break;
            testMeaning = newKanji.reading_kun[j-1].translation;
            j--;
            }
        kanji.createMeaningkun({
        symbol: newKanji.symbol,
        reading_kun: newKanji.reading_kun[i].kunyomi,
        reading_rom: newKanji.reading_kun[i].romanji,
        meaning: testMeaning,
        });
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
        MeaningON.create({
        symbol: newKanji.symbol,
        reading_ON: newKanji.reading_ON[i].onyomi,
        reading_rom: newKanji.reading_ON[i].romanji,
        meaning: testMeaning,
        })
        i++;
    }
  
    })   })
.then(() => {console.log("Kanji wurde erstellt")});


// ARRAY nur in Postgres möglich!