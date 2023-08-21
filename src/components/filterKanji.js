import useFetch from 'react-fetch-hook';
import Ausgabe from './ausgabe';

let Kanjifilter = function ({clickFunktion,begriff,filterArray,act}) {
    
    let obj = {radikale:filterArray};
    // Kanji müssen geladen und in Array gepushed werden!!!
    const {isLoading, data} = useFetch("/getKanji", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })

    return isLoading ? (<div>Loading...</div>) : 
            (
                
            <div>
              <Ausgabe array = {data} clickFunktion={clickFunktion} begriff= {begriff} act = {act} />
            </div>
          );
}
// Ausgabe nimmt ein Array aus Objekten und filtert sich die "symbol"-Eigenschaft heraus

export default Kanjifilter