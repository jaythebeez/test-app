import newMap from "./models/Map";
import { elements } from "./base/base";
import { handleData } from "./controllers/controller";


//initialize application state
export const state = {
  markers: []
};

//controller function for Event listener
const handleSubmit = (e) => {
    e.preventDefault();

    //check if markers are already placed if they are remove them from map
    if(state.markers.length){
        state.markers.forEach(marker=>{
            newMap.removeMarker(marker);
        });
        state.markers = [];
    }

    //get data from form elements
    const origin = elements.originInput.value;
    const dest = elements.destInput.value;

    //function to handle data
    handleData(origin, dest);
}

function doEventBindings(){ 
    //draw google maps to ui
    newMap.drawMap();
    
    //Event listener for search-form submit
    elements.searchForm.addEventListener('submit', (e)=>handleSubmit(e));
}

window.addEventListener('DOMContentLoaded', doEventBindings);