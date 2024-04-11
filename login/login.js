import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import loginUser from '@salesforce/apex/RegistrationController.loginUser';
import { securityQuestions, images } from 'c/sharedData';

import sendTemporaryPassword from '@salesforce/apex/RegistrationController.sendTemporaryPassword';


export default class Login extends NavigationMixin(LightningElement) {
  @track email = '';
  @track password = '';
  @track resetPasswordFormVisible = false;
  @track resetEmail = '';
  @track securityQuestion1 = securityQuestions[0].value;
  @track securityQuestion2 = securityQuestions[1].value;
  @track securityAnswer1 = '';
  @track securityAnswer2 = '';
  @track imageId = images[0].id;

  securityQuestions = securityQuestions;
  images = images.map((image, index) => ({
    ...image,
    isSelected: index === 0,
    computedClass: index === 0 ? 'selected-image' : ''
  }));

  handleEmailChange(event) {
    this.email = event.target.value;
  }

  handlePasswordChange(event) {
    this.password = event.target.value;
  }

  handleQuestion1Change(event) {
    this.securityQuestion1 = event.target.value;
  }

  handleQuestion2Change(event) {
    this.securityQuestion2 = event.target.value;
  }

  handleAnswer1Change(event) {
    this.securityAnswer1 = event.target.value;
  }

  handleAnswer2Change(event) {
    this.securityAnswer2 = event.target.value;
  }

  showResetPasswordForm(event) {
    event.preventDefault();
    this.resetPasswordFormVisible = true;
  }

  handleResetEmailChange(event) {
    this.resetEmail = event.target.value;
  }

  handleForgotPassword() {
    if (this.resetEmail === '') {
      alert('Please enter your email address to reset your password.');
      return;
    }

    sendTemporaryPassword({ email: this.resetEmail })
      .then(() => {
        alert('A temporary password has been sent to your email. Please check your inbox.');
      })
      .catch((error) => {
        console.error('Error sending temporary password:', error);
        alert('Error sending temporary password. Please try again.');
      });
  }

  handleImageClick(event) {
    const selectedImageId = event.currentTarget.dataset.id;
    this.imageId = selectedImageId;

    // Update the isSelected property and computedClass for each image
    this.images = this.images.map(image => ({
      ...image,
      isSelected: image.id === selectedImageId,
      computedClass: image.id === selectedImageId ? 'selected-image' : ''
    }));
  }

  async handleLogin() {
    // Add a new parameter object for loginUser
    const loginParams = {
      email: this.email,
      password: this.password,
      securityQuestion1: this.securityQuestion1,
      securityQuestion2: this.securityQuestion2,
      securityAnswer1: this.securityAnswer1,
      securityAnswer2: this.securityAnswer2,
      imageId: this.imageId
    };

    try {
      const result = await loginUser({ params: JSON.stringify(loginParams) });

      if (result) {
        this[NavigationMixin.Navigate]({
          type: 'standard__navItemPage',
          attributes: {
            apiName: 'DiabetesDataEntryPage', // Use the API name of the Lightning App Page you created
          },
        });
      } else {
        alert('Invalid login. Please check your credentials and try again.');
      }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Error during login. Please try again.');
      }
    }
  }