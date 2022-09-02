import { LightningElement } from 'lwc';

const TILE_WRAPPER_SELECTED_CLASS = 'selected';
const TILE_WRAPPER_UNSELECTED_CLASS = 'tile-wrapper';

export default class BoatTile extends LightningElement {
    boat;
    selectedBoatId;
    
    // Getter for dynamically setting the background image for the picture
    get backgroundStyle() {
        return `background-image:url("${this.boat.picture}")`
    }
    
    // Getter for dynamically setting the tile class based on whether the
    // current boat is selected
    get tileClass() { 
        console.log('___Boat___', boat)
        return TILE_WRAPPER_SELECTED_CLASS;
    }
    
    // Fires event with the Id of the boat that has been selected.
    selectBoat(event) {
        
        const myDetails = {
            boatId: event.detail.boat.Id
        };
  
        const searchEvent = new CustomEvent(
            "boatselect",
            {detail: myDetails}
        );

        this.dispatchEvent(searchEvent);
     }
}