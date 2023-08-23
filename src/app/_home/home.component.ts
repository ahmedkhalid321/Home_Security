import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LeadService } from '../_services/lead.service';
import { EmailValidateService } from '../_services/email-validate.service';
import { PhoneValidateService } from '../_services/phone-validate.service';
import Swal from 'sweetalert2'
declare var google: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isValidEmail: boolean = false;
  isValidPhoneNumber: boolean = false;
  validationResult: any;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _leadHelper: LeadService,
    private emailValidationService: EmailValidateService,
    private phoneValidationService: PhoneValidateService
  ) {}

  ngOnInit() {
    this._isFormDetail();
    this._validateEmail();
    this._validatePhoneNumber();
  }

  _isFormDetail() {
    this.form = this.fb.group({
      property_type: [
        'What type of property is this system for ?',
        Validators.required,
      ],
      zip_code: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      installation_preference: [
        'What is your installation preference?',
        Validators.required,
      ],
      features: [
        'What home security features would you like to have?',
        Validators.required,
      ],
      system_type: ['What kind of System do you need?', Validators.required],
      entrances: ['How many entrances exist?', Validators.required],
      address: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      phone_home: ['', Validators.required],
    });
  }
  _onSubmit() {
    this._validateEmail();
    this._validatePhoneNumber();
    const formData = new FormData();
    formData.append('lp_campaign_id', '64b9ccf73e38c');
    formData.append('lp_campaign_key', 'mYFhzwtX7LKWBGgD34Tb');
    formData.append('first_name', this.form.get('first_name')?.value);
    formData.append('last_name', this.form.get('last_name')?.value);
    formData.append('phone_home', this.form.get('phone_home')?.value);
    formData.append('address', this.form.get('address')?.value);
    formData.append('city', this.form.get('city')?.value);
    formData.append('state', this.form.get('state')?.value);
    formData.append('zip_code', this.form.get('zip_code')?.value);
    formData.append('email_address', this.form.get('email_address')?.value);
    formData.append('property_type', this.form.get('property_type')?.value);
    formData.append(
      'installation_preference',
      this.form.get('installation_preference')?.value
    );
    formData.append('features', this.form.get('features')?.value);
    formData.append('system_type', this.form.get('system_type')?.value);
    formData.append('entrances', this.form.get('entrances')?.value);
    this._leadHelper._addLeadDetail(formData);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Add Successfully',
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(() => {
      location.reload();

    },500)
    if (this.isValidEmail || this.isValidPhoneNumber) {
      location.reload();
    this._leadHelper._addLeadDetail(formData);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Add Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  _validateEmail() {
    const emailToValidate = this.form.get('email_address')?.value;
    if (emailToValidate) {
      this.emailValidationService.validateEmail(emailToValidate).subscribe(
        (result) => {
          this.isValidEmail = true;
          this.validationResult = result;
        },
        (error) => {
          console.error('Error:', error);
          this.isValidEmail = false;
        }
      );
    }
  }
  _validatePhoneNumber() {
    let phoneNumberToValidate = this.form.get('phone_home')?.value;
    if (phoneNumberToValidate) {
      this.phoneValidationService.validatePhoneNumber(phoneNumberToValidate).subscribe(
        (result) => {
          this.isValidPhoneNumber = true;
          this.validationResult = result;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }

  onInputChange(event: any): void {
    const input = event.target;
    let autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.address_components) {
        const zipCodeComponent = place.address_components.find(
          (component: any) => component.types.includes('postal_code')
        );
        const cityComponent = place.address_components.find((component: any) =>
          component.types.includes('locality')
        );
        const stateComponent = place.address_components.find((component: any) =>
          component.types.includes('administrative_area_level_1')
        );

        if (zipCodeComponent) {
          this.form.patchValue({ zip_code: zipCodeComponent.short_name });
        }
        if (cityComponent) {
          this.form.patchValue({ city: cityComponent.long_name });
        }
        if (stateComponent) {
          this.form.patchValue({ state: stateComponent.short_name });
        }
      }
    });
  }
}
