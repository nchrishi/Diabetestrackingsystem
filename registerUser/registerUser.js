import { LightningElement, api, track } from 'lwc';
import registerUserApex from '@salesforce/apex/RegistrationController.registerUser';
import { securityQuestions, images } from 'c/sharedData';

export default class RegisterUser extends LightningElement {
  @track passwordStrengthMessage = '';

  fullName = '';
  email = '';
  phone = '';
  dob = '';
  username = '';
  password = '';
  answer1 = '';
  answer2 = '';
  answer3 = '';

  customSecurityQuestion1 = '';
customAnswer1 = '';
customSecurityQuestion2 = '';
customAnswer2 = '';
customSecurityQuestion3 = '';
customAnswer3 = '';

securityQuestions = securityQuestions;
images = images;


selectedImage = null;

handleImageSelection(event) {
  const selectedImage = event.target;
  const previouslySelectedImage = this.template.querySelector('.selected-image');

  if (previouslySelectedImage) {
    previouslySelectedImage.classList.remove('selected-image');
  }

  selectedImage.classList.add('selected-image');
  this.selectedImage = this.images.find(image => image.id === selectedImage.dataset.id); // Update this line
}




  handleInputChange(event) {
    this[event.target.dataset.id] = event.target.value;
  }

  handlePasswordChange(event) {
    this.password = event.target.value;
    const isValid = this.validatePassword(this.password);
    if (!isValid) {
      this.passwordStrengthMessage = 'Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and symbols.';
    } else {
      this.passwordStrengthMessage = '';
    }
  }

  handleSecurityQuestion1(event) {
    this.securityQuestion1 = event.target.value;
  }
  
  handleSecurityQuestion2(event) {
    this.securityQuestion2 = event.target.value;
  }
  
  handleSecurityQuestion3(event) {
    this.securityQuestion3 = event.target.value;
  }

  validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  async register() {
    console.log('Register button clicked');
    
    // Collect and validate user input
    const allInputs = this.template.querySelectorAll('lightning-input');
    console.log('All Inputs:', allInputs);
    let isValid = true;
    allInputs.forEach(input => {
      console.log('Validating:', input);
      if (!input.reportValidity()) {
        isValid = false;
      }
    });
  
    if (!isValid) {
      console.log('Validation failed');
      return;
    }
    
    // Extract user input
    const { fullName, email, phone, dob, username, password, securityQuestion1, answer1, securityQuestion2, answer2, securityQuestion3, answer3, customSecurityQuestion1, customAnswer1, customSecurityQuestion2, customAnswer2, customSecurityQuestion3, customAnswer3 } = this;

  
    console.log('User Input:', {
      fullName, email, phone, dob, username, password, securityQuestion1, answer1, securityQuestion2, answer2, securityQuestion3, answer3
    });

    // Call Apex method to save user information
    try {
      const userId = await registerUserApex({ fullName, email, phone, dob, username, password, securityQuestion1, answer1, securityQuestion2, answer2, securityQuestion3, answer3, customSecurityQuestion1, customAnswer1, customSecurityQuestion2, customAnswer2, customSecurityQuestion3, customAnswer3, selectedImage: this.selectedImage.id });
      console.log('User registered successfully with ID:', userId);
      alert('User registered successfully with ID: ' + userId);
    } catch (error) {
        console.error('Error in user registration:', JSON.stringify(error, null, 2));
        console.error('Error in user registration (expanded):', error);
        if (error.body && error.body.message) {
          alert('Error in user registration: ' + error.body.message);
        } else {
          alert('Error in user registration: ' + JSON.stringify(error, null, 2));
        }
      }
    }
  
}