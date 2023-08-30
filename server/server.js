// Server Set Up -----------------------------
import express from "express";
// für Datenbank wichtige Funktionen importieren -----------------
// Sequelize Setup Importieren
import {sequelize} from "./models/index.js";
// Sequelize Operators
import { Op } from "sequelize";
// Models importieren
import {Kanji} from "./models/kanji_models.js"
import {Admin} from "./models/admin.js";
import { Meaningkun } from "./models/meanings_kun_model.js";
import { MeaningON } from "./models/meanings_ON_model.js";

//nötig für __filename und __dirname
import path from 'path';
import {fileURLToPath} from 'url';
// ------------------------------------------------------------------

const SERVER = express();
const IP = "127.0.0.1";
const PORT = process.env.PORT || 8081; // process.env.PORT wird in vielen Cloud Servern verwendet um PORT zuzuweisen!


SERVER.use(express.static("build")); // Build enthält später das Front-End ; für Entwiccklung zu vernachlässigen, aber wichtig für das Roll Out
SERVER.use(express.static("json"));
SERVER.use(express.json());

// ersetzt __filename und __dirname, wenn man in ES Module arbeitet
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// Soll Routing Problem nach Build lösen; wo sind path und _dirname defined?
// wichtig 'sendFile' nicht 'send' !!!
SERVER.use(express.static(path.join(__dirname, "build")));
SERVER.get('/*',function(req,res) {
        res.sendFile(path.join(__dirname,'build','index.html'));
});/**/

// -------------------------------------------

Kanji.hasMany(Meaningkun);
Meaningkun.belongsTo(Kanji);
Kanji.hasMany(MeaningON);
MeaningON.belongsTo(Kanji);
// Datenbank anbinden ------------------------
sequelize.sync(/*{force: true} */)
.then(() => console.log("Tabelle erstellt"))

// soll in diesem File nur aus database lesen, nicht darin schreiben

// -------------------------------------------


SERVER.post("/getKanji", (req,res) => {
    let filterRadikale = req.body.radikale;
    
    // Kanji aus Datenbank laden funktioniert!
    let radikalArray = [];
    let ausgabe = [];

    filterRadikale.forEach((item) => radikalArray.push({[Op.substring] : "%" + item + "%"}))

    let whereObj = {
        radikals:
        {
            [Op.and]: radikalArray
        }
    }

    Kanji.findAll({
        where: whereObj,
        raw: true,
        attributes: ["symbol"]
    })
    .then(((obj) => {ausgabe = obj.reverse(); res.send(JSON.stringify(ausgabe));}));
    // reversed, damit einfachere Kanji weiter vorne erscheinen
    // letzter Eintrag der DB erscheint sonst immer zuerst
    
});

SERVER.post("/kanjiInfo", (req,res) => {
   let gesucht = req.body.symbol;
    
   let gefunden = {};
   let findKanji = async () => {
    let kanji = await Kanji.findOne({
        where: { symbol : gesucht},
        raw: true,
        })
    let meaningKun = await Meaningkun.findAll({
        where: {kanjiSymbol : gesucht},
        raw: true,
        attributes: ["reading_kun","reading_rom","meaning"],
    })
    let meaningOn = await MeaningON.findAll({
        where: {kanjiSymbol : gesucht},
        raw: true,
        attributes: ["reading_ON","reading_rom","meaning"],
    }) 

    gefunden = {
        symbol: kanji.symbol,
        strokes: kanji.strokes,
        radicals: kanji.radikals,
        kunArray: meaningKun,
        ONArray : meaningOn
    }
    }
    findKanji()
    .then (() => {
    res.send(JSON.stringify(gefunden))});

});


SERVER.post("/login", (req, res) =>{
    
    const user = req.body.nutzer;
    const password = req.body.passwort;

    let userdata;
    let resObj;
    Admin.findOne({
        where:      {
                        name: user,
                        password: password
                    },
        raw: true,
        attributes: ["name", "password"]
    })

    .then ((obj) => {   
        userdata = obj;
    if (userdata === null) {
    resObj = {
            "erfolgreich" : false,
            "antwort" : "ungültiger Nutzer oder falsches Passwort"
            };
    
    } else {
    resObj = {
            "erfolgreich" : true,
            "antwort" : userdata.name
            };
    }
    res.send( resObj );
    })
})


// Siehe in Ideen-Notiz!!! <-
SERVER.post("/newKanji", (req,res) => {
    let newKanji = req.body;
if (newKanji.symbol === "") return;

let createKanji = async function () {
let kanji = await Kanji.create({
    symbol:   newKanji.symbol,
    strokes:  newKanji.strokes,
    radikals: newKanji.radicals,
    });

let i = 0;
while (i < newKanji.reading_kun.length) {
if (newKanji.reading_kun[i].kunyomi === "" && newKanji.reading_kun[i].romanji === "") break;
// if there is no kunyomi, no entry will be created
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
if (newKanji.reading_ON[i].onyomi === "" && newKanji.reading_ON[i].romanji === "") break;
// if there is no onyomi, no entry will be created
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
}
createKanji();
/**/
})

SERVER.post("/destroyKanji", (req,res) => {
    let kanjiToDestroy = req.body.symbol;
    console.log(kanjiToDestroy);
    let deleteKanji = async function () {
        let target = await Kanji.findOne({
            where: {
                symbol : kanjiToDestroy,
            }
        })
        //target.destroy();
        console.log(target);
    };
    deleteKanji();
    let msg = "Kanji was deleted; (delete option is commented out)";
    res.json({msg});
    
})

SERVER.post("/changeKanji", (req,res) => {
    let targetKanji = req.body;
    console.log(targetKanji);

    let changeKanji = async function () {
        await sequelize.sync();
        // change Kanji
        let kanji = await Kanji.findOne({
            where: {
            symbol : targetKanji.symbol,
            }
        });
        console.log(kanji);
        
        kanji.strokes = targetKanji.strokes;
        kanji.radicals = targetKanji.radicals;
        await kanji.save();

        // change meanings_kun
        let kuns = await Meaningkun.findAll({
            where: {
                kanjiSymbol : targetKanji.symbol,
            }
        })
        console.log(kuns);
        // kuns is array?
        kuns.forEach((element) => {element.destroy();});
        
        let i = 0;
        while (i < targetKanji.reading_kun.length) {
        if (targetKanji.reading_kun[i].kunyomi === "" && targetKanji.reading_kun[i].romanji === "") break;
        // if there is no kunyomi, no entry will be created
        let testMeaning = targetKanji.reading_kun[i].translation;
        let j = i;
            while (j > 0) {
            if (testMeaning !== '') break;
            testMeaning = targetKanji.reading_kun[j-1].translation;
            j--;
            }
        let meaningKun = await Meaningkun.create({
            reading_kun: targetKanji.reading_kun[i].kunyomi,
            reading_rom: targetKanji.reading_kun[i].romanji,
            meaning: testMeaning,
            });
        kanji.addMeanings_kuns(meaningKun);
            i++;
        }

        // change meanings_ON

        let ons = await MeaningON.findAll({
            where: {
                kanjiSymbol : targetKanji.symbol,
            }
        })
        console.log(kuns);
        // kuns is array?
        ons.forEach((element) => {element.destroy();});

        i = 0;
        while (i < targetKanji.reading_ON.length) {
        if (targetKanji.reading_ON[i].onyomi === "" && targetKanji.reading_ON[i].romanji === "") break;
        // if there is no onyomi, no entry will be created
        let testMeaning = targetKanji.reading_ON[i].translation;
        let j = i;
            while (j > 0) {
            if (testMeaning !== '') break;
            testMeaning = targetKanji.reading_ON[j-1].translation;
            j--;
            }
        let meaningON = await MeaningON.create({
            reading_ON: targetKanji.reading_ON[i].onyomi,
            reading_rom: targetKanji.reading_ON[i].romanji,
            meaning: testMeaning,
            });
            kanji.addMeanings_ONs(meaningON);
            i++;
            }
    }
    changeKanji();
    let msg = "saved changes";
    res.json({msg});
})


// Server Start -------------------------
SERVER.listen(PORT, IP, () => console.log(`http://${IP}:${PORT}`));
//---------------------------------------