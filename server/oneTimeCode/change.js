import {sequelize} from "../models/index.js";
// Models importieren
import {Kanji} from "../models/kanji_models.js"
import { Meaningkun } from "../models/meanings_kun_model.js";
import { MeaningON } from "../models/meanings_ON_model.js";

Kanji.hasMany(Meaningkun);
Meaningkun.belongsTo(Kanji);
Kanji.hasMany(MeaningON);
MeaningON.belongsTo(Kanji);

let findSymbol = '人';

let changes = '⼈,⺅' ;

await sequelize.sync();
let kanji = await Kanji.findOne({
    where: {
        symbol : findSymbol,
    }
})
console.log(kanji);
kanji.radikals = changes;
console.log(kanji);
await kanji.save();

// Testfunktion, lässt sich auf Admin Funktion erweitern!