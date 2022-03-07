import { elements } from "../base/base";
import { state } from "../main";

class Map {
    constructor(){
        this.options = {
            zoom:8,
            center:{lat:42.3601, lng:-71.0589}
        }
        this.mapDiv = elements.mapDiv;
        this.inputs = [elements.originInput, elements.destInput];
    }
    initializeMap(){
        this.map = new google.maps.Map(this.mapDiv, this.options);
    }
    initializePlaces(){
        this.inputs.forEach(input=>{
            let autocomplete = new google.maps.places.Autocomplete(
                input,
                {
                    fields:['address_components'],
                    type:['address']
                }
            )
        })
    }
    addMarker(coord, index){
        const marker = new google.maps.Marker({
            position:{lat: coord[0], lng: coord[1]}, 
            label: {color: '#fff', fontSize: '12px', fontWeight: '600',
            text: (index + 1).toString()}
        })
        marker.setMap(this.map);
        //set map position to the first coordinate
        if (!index){
            this.map.setCenter({lat: coord[0], lng: coord[1]})
        }
        state.markers.push(marker);
    }
    removeMarker(marker){
        marker.setMap(null);
    }
    drawMap(){
        var script = document.createElement('script');
        script.src =
        `https://maps.googleapis.com/maps/api/js?libraries=places,visualization&key=${import.meta.env.VITE_API_KEY}&v=weekly&callback=initMap`;
        script.async=true;
        window.initMap = function() {
            // Google Maps JS API is loaded and available
            //initialize map and places functions
            newMap.initializeMap();
            newMap.initializePlaces();
        };
        // Append the 'script' element to 'head'
        document.head.appendChild(script);
    }
}

const newMap = new Map();

export default newMap;