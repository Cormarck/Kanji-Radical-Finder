import { useState, useEffect } from "react";
import EditFormular from "./components/db_edit";

function EditDatabase () {
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
        <div id="admin_Seite">
        <p>Eingeloggt als {Admin.name}</p>
        <EditFormular/>
        <button onClick = {logout} id="log_out">logout</button>
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
};
export default EditDatabase;