import getBoatsByLocation from '@salesforce/apex/BoatDataService.getBoatsByLocation';
import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getLocationService } from 'lightning/mobileCapabilities';


// imports

const LABEL_YOU_ARE_HERE = 'You are here!';
const ICON_STANDARD_USER = 'standard:user';
const ERROR_TITLE = 'Error loading Boats Near Me';
const ERROR_VARIANT = 'error';

export default class BoatsNearMe extends LightningElement {
  @api boatTypeId;
  @api mapMarkers = [];
  @api isLoading = false;
  isRendered = false;
  latitude;
  longitude;
  myLocationService;
  currentLocation;

  connectedCallback() {
    this.myLocationService = getLocationService();
  }

  // Controls the isRendered property
  // Calls getLocationFromBrowser()
  renderedCallback() {  
    if(this.isRendered){
      return;
    } 
    this.isRendered = true;
    this.getLocationFromBrowser();
    this.isLoading = false;
  }
  
  // Add the wired method from the Apex Class
  // Name it getBoatsByLocation, and use latitude, longitude and boatTypeId
  // Handle the result and calls createMapMarkers
  @wire(getBoatsByLocation, {latitude: '$latitude', longitude: '$longitude', boatTypeId: '$boatTypeId'})
  wiredBoatsJSON({error, data}) { 
    if (data) {
      this.isLoading = true;
      error = undefined;
      this.createMapMarkers(data);
      this.isLoading = false;
    } else if (error) {
      console.log(JSON.stringify(error))
      error = error;
      this.mapMarkers = [];
      this.dispatchEvent(
        new ShowToastEvent({
            title: ERROR_TITLE,
            message:
                'There was a problem loading the boats' +
                JSON.stringify(error) +
                ' Please try again.',
            variant: ERROR_VARIANT,
            mode: 'sticky'
        })
      );
    }
  }
  
  // Gets the location from the Browser
  // position => {latitude and longitude}
  getLocationFromBrowser() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude; 
        this.longitude = position.coords.longitude;
      })
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    
  }

  showPosition(position) {
    this.latitude = position.coords.latitude 
    this.longitude = position.coords.longitude;
  }
  
  // Creates the map markers
  createMapMarkers(boatData) {
    console.log('Boat Array:___', typeof(boatData));
    const newMarkers = boatData.map(boat => {
      console.log('___Boat___:',boat)
      return ({
                location: {
                  Latitude: boat.Geolocation__Longitude__s,
                  Longitude: boat.Geolocation__Longitude__s,
                },
                title: boat.Name
      })
     });
     console.log('New Markers__', newMarkers);
    newMarkers.unshift(
      {
        location: {
            Latitude: this.latitude,
            Longitude: this.longitude
        },
        title: LABEL_YOU_ARE_HERE,
        icon: ICON_STANDARD_USER,
      }
    );
    this.mapMarkers = newMarkers;
   }
}