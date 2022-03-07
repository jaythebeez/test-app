import { state } from "../main";
//Function to briefly show snackbar on the page
export const showSnackbar = (text) => {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
  
    x.innerText = text; 
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
  
  
//add proloader to div 
export const showPreLoader = (div) =>{
    const markup = '<div class="loader-shade"><div id="loader"> </div></div>'
    div.insertAdjacentHTML('beforeend', markup);
    state.loader = {display: true, parent: div}
}
  
export const clearPreLoader = (div) => {
    const loader = div.querySelector('.loader-shade');
    div.removeChild(loader);
    state.loader = {display: false};
}

export const scrollToBottom  = () => window.scrollTo(0,document.body.scrollHeight);

//change coords from string to digits
export const parseCoords = (path) => {
    return path.map((coord)=>coord.map(ord=>Number(ord)))
}