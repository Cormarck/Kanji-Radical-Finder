import Anlegeformular from "./components/anlegeformular.js";
import { useState, useEffect } from "react";
import './css/eingabefeld.css';
import { Link } from "react-router-dom";



let AddToDatabase = function () {
// erstellt Admin Objekt  
const [Admin,setAdmin] = useState({
                                    "login" : false,
                                    "name" : "",
                                    })

// checked ob bereits ein Admin angemeldet ist
const [unused,setUnused] = useState(true);
if(localStorage.getItem("AdminLogin") && unused) 
{
    let lastLogin = JSON.parse(localStorage.getItem("AdminLogin"));

   setAdmin({
        "login" : lastLogin.login,
        "name" : lastLogin.name,
    })
    setUnused(false);
};

// Login Protokol -------------------------------------------------------
let loginVersuch = () => {
    let anmeldung = {
                    nutzer : document.querySelector('#nutzer').value,
                    passwort : document.querySelector('#passwort').value
                    }
    let response;
    
    fetch('/login', {
        method: "POST",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(anmeldung),   
    })
    .then(res => res.json())
    .then(data => response = data)
    .then(() => {
        if (response.erfolgreich) {
            setAdmin({
                "login" : true,
                "name" : response.antwort,
                })
        } else {
            if(!document.querySelector('#Loginfehler')) {
            let loginFeld = document.querySelector('#loginFeld');
            let fehlerNachricht = document.createElement("div");
            fehlerNachricht.id = "Loginfehler";
            fehlerNachricht.textContent = "ungültiger Nutzer oder falsches Passwort"
            loginFeld.append(fehlerNachricht);
            }}
    })
};

useEffect(() => {
    if(Admin.login && localStorage)  {
        localStorage.setItem("AdminLogin", JSON.stringify(Admin));
    }
    },[Admin])
    

let logout = () => {
    setAdmin({
        "login" : false,
        "name" : "",
        })
    localStorage.removeItem("AdminLogin");
}


let loginAufKnopfdruck = (e) => {
    if (e.key ==="Enter") {loginVersuch()} }

// ----------------------------------------------------------------------------

// Ausgabe
    if (Admin.login) {
        return (
            <div id="adminSeite">
            <p>Eingeloggt als {Admin.name}</p>
            <Anlegeformular/>
            <Link to="/edit_page"><button>Edit Database</button></Link>
            <button onClick = {logout}>logout</button>
            </div>
        ) 
    } else {
        return (
            
            <div id="loginFeld">
            <p>nicht eingeloggt!</p>
            <input type="text" id="nutzer" /> 
            <input type="password" id="passwort" onKeyDown={loginAufKnopfdruck}/>
            <button id="login" onClick={loginVersuch}>login</button>
            </div>
        )
    }
}

/*let passwordField = document.querySelector('#passwort');

passwordField.addEventListener('keydown', (e) => {
    if (e.key === "Enter")
        console.log(e);
})*/ // Funktioniert nicht in React, weil das Feld noch nicht existiert, wenn Funktion angehangen werden soll

export default AddToDatabase;