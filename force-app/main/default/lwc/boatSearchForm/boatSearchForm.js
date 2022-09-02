import { LightningElement, api, wire } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId = '';
    error = undefined;
    
    searchOptions;
  
    @wire(getBoatTypes)
      boatTypes( {error, data} ) {
      if (data) {
        this.searchOptions = data.map(type => {
            console.log('___Data from the controller:___', type )
          return { label: type.Name, value: type.Id }
        });
        
        this.searchOptions.unshift({ label: 'All Types', value: '' });
      } else if (error) {
        this.searchOptions = undefined;
        this.error = error;
      }
      console.log('Search Options After the Map', this.searchOptions)
    }
    
    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
        console.log('__Selected Boat__', event.detail.value)
        const myDetails = {
            boatTypeId: event.detail.value
        };
  
        const searchEvent = new CustomEvent(
            "search",
            {detail: myDetails}
        );

        this.dispatchEvent(searchEvent);

    }
  }
  