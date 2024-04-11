import { LightningElement, track } from 'lwc';
import saveDiabetesData1 from '@salesforce/apex/RegistrationController.saveDiabetesData1';
import getCurrentUserId from '@salesforce/apex/RegistrationController.getCurrentUserId';

export default class DiabetesDataEntry extends LightningElement {
    @track entryDate = '';
    @track timeTakingTestAM = '';
    @track bloodSugarLevelAM = '';
    @track breakfastMenu = '';
    @track lunchMenu = '';
    @track dinnerMenu = '';
    @track timeTakingTestPM = '';
    @track bloodSugarLevelPM = '';
    userId;

    connectedCallback() {
        this.loadCurrentUserId();
    }

    async loadCurrentUserId() {
        try {
            this.userId = await getCurrentUserId();
            console.log('User ID loaded:', this.userId);
        } catch (error) {
            console.error('Error loading current user ID:', error);
            alert('Error loading current user ID. Please try again.');
        }
    }
    

    handleEntryDateChange(event) {
        this.entryDate = event.target.value;
    }

    handleBloodSugarLevelAMChange(event) {
        this.bloodSugarLevelAM = event.target.value;
    }

    handleBreakfastMenuChange(event) {
        this.breakfastMenu = event.target.value;
    }

    handleLunchMenuChange(event) {
        this.lunchMenu = event.target.value;
    }

    handleDinnerMenuChange(event) {
        this.dinnerMenu = event.target.value;
    }

    handleBloodSugarLevelPMChange(event) {
        this.bloodSugarLevelPM = event.target.value;
    }

    handleTimeTakingTestAMChange(event) {
        this.timeTakingTestAM = event.target.value;
    }

    handleTimeTakingTestPMChange(event) {
        this.timeTakingTestPM = event.target.value;
    }

    handleSave() {
        if (!this.userId) {
            alert('User ID is not available. Please refresh the page and try again.');
            return;
        }
        console.log('Registered User ID:', this.userId);
        console.log('Entry Date:', this.entryDate);
        console.log('Blood Sugar Level AM:', this.bloodSugarLevelAM);
        console.log('Blood Sugar Level PM:', this.bloodSugarLevelPM);

        const dataToSave = {
            registeredUserId: this.userId,
            dateValue: this.entryDate,
            bloodSugarLevelAM: this.bloodSugarLevelAM,
            breakfastMenu: this.breakfastMenu,
            lunchMenu: this.lunchMenu,
            dinnerMenu: this.dinnerMenu,
            bloodSugarLevelPM: this.bloodSugarLevelPM,
            timeTakingTestAM: this.timeTakingTestAM,
            timeTakingTestPM: this.timeTakingTestPM
        };
        console.log('Data to save:', dataToSave);
        console.log('Data to save (stringified):', JSON.stringify(dataToSave));
        
        saveDiabetesData1({
            paramsStr : JSON.stringify(dataToSave)})
        .then(result => {
            alert(result);
        })
        .catch(error => {
            console.error('Error saving diabetes data:', error);
            alert('Error saving diabetes data. Please try again. ' + error.body.message);
        });
    } 
}