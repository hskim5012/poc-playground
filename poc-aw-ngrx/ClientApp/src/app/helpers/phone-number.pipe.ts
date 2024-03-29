import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js/min';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
  transform(phoneValue: number | string, country: string): any {
    try {
      const phoneNumber = parsePhoneNumber(
        phoneValue + '',
        country as CountryCode
      );
      return phoneNumber.formatNational();

    } catch (error) {
      return phoneValue;
    }
  }
}
