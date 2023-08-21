import useFetch from 'react-fetch-hook';
import Radikalflaeche from './radikale';

let Radikalfilter = function ({klasse,clickFunktion,begriff,filter,act}) {
    let arr = [];
    const {isLoading, data} = useFetch("/arrays.json");

    if (isNaN(filter) || filter === "") {
        return isLoading ? (<div>Loading...</div>) : 
            (<div>
                {data.radikalArray.forEach((item) => arr.push(item.radikal))}
                <Radikalflaeche array = {arr} klasse = {klasse} clickFunktion={clickFunktion} begriff = {begriff} act = {act}/>
              </div>
            );
    } else {
        return isLoading ? (<div>Loading...</div>) : 
            (<div>
                {data.radikalArray.forEach((item) => {if(item.strichzahl === filter) return arr.push(item.radikal)})}
                <Radikalflaeche array = {arr} klasse = {klasse} clickFunktion={clickFunktion} begriff = {begriff} act = {act}/>
              </div>
            );
    }

    
}

export default Radikalfilter;