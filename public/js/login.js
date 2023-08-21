const login = document.querySelector('#login');


let loginVersuch = () => {
    let output = document.querySelector('#text');

    let anmeldung = {
                    nutzer : document.querySelector('#nutzer').value,
                    passwort : document.querySelector('#passwort').value
                    }
    // AJAX zur Bearbeitung der Anfrage verwenden
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status !== 200) return;
        let response = JSON.parse(this.response);
        if (response.erfolgreich) {
            window.location.href = response.antwort;
        } else {output.textContent = response.antwort};
    }
    xhr.open("POST", "/login"); // POST/GET muss auf Server und Client Seite gleicht sein
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(anmeldung));
    //setRequestHeader() Adds a label/value pair to the header to be sent

}

login.addEventListener("click", loginVersuch);