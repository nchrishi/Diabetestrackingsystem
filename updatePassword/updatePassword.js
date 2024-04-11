import { LightningElement, track } from 'lwc';
import updatePassword from '@salesforce/apex/RegistrationController.updatePassword';

export default class UpdatePassword extends LightningElement {
    @track email = '';
    @track oldPassword = '';
    @track newPassword = '';
    @track confirmNewPassword = '';

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleOldPasswordChange(event) {
        this.oldPassword = event.target.value;
    }

    handleNewPasswordChange(event) {
        this.newPassword = event.target.value;
    }

    handleConfirmNewPasswordChange(event) {
        this.confirmNewPassword = event.target.value;
    }

    updatePassword() {
        if (this.newPassword !== this.confirmNewPassword) {
            alert('New password and confirm new password do not match.');
            return;
        }

        updatePassword({ email: this.email, oldPassword: this.oldPassword, newPassword: this.newPassword })
            .then(() => {
                alert('Password updated successfully.');
            })
            .catch(error => {
                alert('Error: ' + error.body.message);
            });
    }
}