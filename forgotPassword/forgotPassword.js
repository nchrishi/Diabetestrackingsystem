import { LightningElement } from 'lwc';
//import sendTemporaryPasswordApex from '@salesforce/apex/RegistrationController.sendTemporaryPassword';

export default class ForgotPassword extends LightningElement {
  email = '';

  handleInputChange(event) {
    this[event.target.dataset.id] = event.target.value;
  }

  async sendTemporaryPassword() {
    try {
      await sendTemporaryPasswordApex({ email: this.email });
      alert('A temporary password has been sent to your email address.');
    } catch (error) {
      console.error('Error in sending temporary password:', error);
      alert('Error in sending temporary password: ' + JSON.stringify(error, null, 2));
    }
  }
}