import getBoats from '@salesforce/apex/BoatDataService.getBoats';
import { LightningElement, api, wire } from 'lwc';

// ...
const SUCCESS_TITLE = 'Success';
const MESSAGE_SHIP_IT     = 'Ship it!';
const SUCCESS_VARIANT     = 'success';
const ERROR_TITLE   = 'Error';
const ERROR_VARIANT = 'error';
export default class BoatSearchResults extends LightningElement {
    selectedBoatId;
    columns = [];
    boatTypeId = '';
    boats;
    isLoading = false;
    @api boatidtest;
    @api show = false;
    
    // wired message context
    messageContext;
    // wired getBoats method 
    @wire(getBoats, {boatTypeId: '$boatidtest'})
    wiredBoats({error, data}) { 
        if (data) {
            //console.log('___Data en Boat Search Results___', data);

            this.boats = data;
            
            
            // this.boats = data.map(boat => {
            //     console.log('___Data from the controller:___', boat )
            //   return { id: boat.Id, name: boat.Name }
            // });
            this.isLoading = true;
        }
    }
    
    // public function that updates the existing boatTypeId property
    // uses notifyLoading
    searchBoats(boatTypeId) { }
    
    // this public function must refresh the boats asynchronously
    // uses notifyLoading
    refresh() { }
    
    // this function must update selectedBoatId and call sendMessageService
    updateSelectedTile() { }
    
    // Publishes the selected boat Id on the BoatMC.
    sendMessageService(boatId) { 
        // explicitly pass boatId to the parameter recordId
    }
    
    // The handleSave method must save the changes in the Boat Editor
    // passing the updated fields from draftValues to the 
    // Apex method updateBoatList(Object data).
    // Show a toast message with the title
    // clear lightning-datatable draft values
    handleSave(event) {
        // notify loading
        const updatedFields = event.detail.draftValues;
        // Update the records via Apex
        updateBoatList({data: updatedFields})
        .then(() => {})
        .catch(error => {})
        .finally(() => {});
    }
    // Check the current value of isLoading before dispatching the doneloading or loading custom event
    notifyLoading(isLoading) { }

    eventTest1 (event) {

    }
}