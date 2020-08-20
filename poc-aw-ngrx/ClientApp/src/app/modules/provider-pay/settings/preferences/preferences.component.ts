import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../../../../services/settings.service';
import {
  IPreference,
  IPreferenceResponse
} from '../../../../models/preference';
import { StatesData } from './states-data';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  preferenceForm: FormGroup;
  preference: IPreference;
  preferenceTest = {};
  errorMessage: string;
  states: { name: string; abbreviation: string }[] = StatesData.states;
  successMessage: string;
  isSubmitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.getAccountInformation('999999995');

    this.preferenceForm = this._formBuilder.group({
      streetAddress: this._formBuilder.group({
        street1: ['', [Validators.required, Validators.maxLength(30)]],
        street2: ['', Validators.maxLength(30)],
        city: ['', [Validators.required, Validators.maxLength(22)]],
        state: ['', Validators.required],
        zip: ['', [Validators.required, Validators.maxLength(10)]]
      }),
      mailingAddress: this._formBuilder.group({
        street1: ['', [Validators.required, Validators.maxLength(30)]],
        street2: ['', Validators.maxLength(30)],
        city: ['', [Validators.required, Validators.maxLength(22)]],
        state: ['', Validators.required],
        zip: ['', [Validators.required, Validators.maxLength(10)]]
      }),
      contactInformation: this._formBuilder.group({
        title: [''],
        firstName: ['', [Validators.required, Validators.maxLength(20)]],
        middleName: ['', Validators.maxLength(20)],
        lastName: ['', [Validators.required, Validators.maxLength(20)]],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.pattern(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/)
          ]
        ],
        phoneExtension: ['', Validators.pattern(/^\D?(\d{4})$/)],
        fax: ['', Validators.pattern(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/)],
        emailAddress: [
          '',
          [
            Validators.required,
            Validators.maxLength(90),
            Validators.pattern(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          ]
        ]
      })
    });
  }

  getAccountInformation(taxId: string) {
    this._settingsService.currentPreferences('999999995').subscribe(
      (preference: IPreferenceResponse) => {
        this.preference = Object.assign(this.preferenceTest, preference.data);
        this.setPreference(this.preference);
      },
      (err: any) => (this.errorMessage = 'Something went wrong.')
    );
  }

  setPreference(preference: IPreference) {
    this.preferenceForm.setValue({
      streetAddress: {
        street1: this.preference.streetAddress.street1,
        street2: this.preference.streetAddress.street2,
        city: this.preference.streetAddress.city,
        state: this.preference.streetAddress.state,
        zip: this.preference.streetAddress.zip
      },
      mailingAddress: {
        street1: this.preference.mailingAddress.street1,
        street2: this.preference.mailingAddress.street2,
        city: this.preference.mailingAddress.city,
        state: this.preference.mailingAddress.state,
        zip: this.preference.mailingAddress.zip
      },
      contactInformation: {
        title: this.preference.contactInformation.title,
        firstName: this.preference.contactInformation.firstName,
        middleName: this.preference.contactInformation.middleName,
        lastName: this.preference.contactInformation.lastName,
        phoneNumber: this.preference.contactInformation.phoneNumber,
        phoneExtension: this.preference.contactInformation.phoneExtension,
        fax: this.preference.contactInformation.fax,
        emailAddress: this.preference.contactInformation.emailAddress
      }
    });
  }

  savePreferences() {
    this.successMessage = '';
    this.errorMessage = '';
    if (this.preferenceForm.valid) {
      this.isSubmitted = true;
      if (this.preferenceForm.dirty) {
        const updatePreference: IPreference = {
          ...this.preference,
          ...this.preferenceForm.value
        };
        this._settingsService
          .updatePreferences(updatePreference, '999999995', 'HenryQA')
          .subscribe(
            () => {
              this.isSubmitted = false;
              this.successMessage = 'Successfully updated.';
            },
            (err: any) =>
              (this.errorMessage =
                'Something went wrong. Please try again later.')
          );
        this.preferenceForm.reset(this.preferenceForm.value);
      } else {
        this.errorMessage = 'No changes were made.';
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
}
