import { LightningElement } from 'lwc';

export default class BoatSearch extends LightningElement {
    isLoading = false;
    boatiddesdecombobox;

    // Handles loading event
    handleLoading() { }

    // Handles done loading event
    handleDoneLoading() { }

    // Handles search boat event
    // This custom event comes from the form
    searchBoats(event) { 
        console.log('___Event Details On Parent___', event.detail.boatTypeId);

        this.boatiddesdecombobox = event.detail.boatTypeId;

        // Evento para enviar a Boat Search Results
        // const myDetails = {
        //     boatTypeId: event.detail.boatTypeId
        // };
  
        // const searchEvent = new CustomEvent(
        //     "boatid",
        //     {detail: myDetails}
        // );

        // this.dispatchEvent(searchEvent);

    }

    createNewBoat() { }
}
  