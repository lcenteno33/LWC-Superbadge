import { LightningElement, api } from 'lwc';

const TILE_WRAPPER_SELECTED_CLASS = 'tile-wrapper selected';
const TILE_WRAPPER_UNSELECTED_CLASS = 'tile-wrapper';

export default class BoatTile extends LightningElement {
    @api boat;
    @api selectedBoatId;
    
    // Getter for dynamically setting the background image for the picture
    get backgroundStyle() {
        console.log('Boat Picture',this.boat.Picture__c )
        return `background-image:url(${this.boat.Picture__c})`
    }
    
    // Getter for dynamically setting the tile class based on whether the
    // current boat is selected
    get tileClass() {

        if (this.selectedBoatId === this.boat.Id) {
            return TILE_WRAPPER_SELECTED_CLASS;
        }
        return TILE_WRAPPER_UNSELECTED_CLASS;
    }
    
    //To send the ID of the selected boat to Parent (boatSearchResults)
    selectBoat(event) {
        // console.log('___Boat___', this.boat)
        const myDetails = {
                boatId: event.detail.boat.Id
            };
    
            const searchEvent = new CustomEvent(
                "boatselect",
                {detail: myDetails}
            );
    
            this.dispatchEvent(searchEvent);
    }
        
    //     const myDetails = {
    //         boatId: event.detail.boat.Id
    //     };
  
    //     const searchEvent = new CustomEvent(
    //         "boatselect",
    //         {detail: myDetails}
    //     );

    //     this.dispatchEvent(searchEvent);
    //  }
}