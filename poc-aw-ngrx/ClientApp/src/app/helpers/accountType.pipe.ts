import { Pipe, PipeTransform } from '@angular/core';
import { accountTypeCode, accountTypeText } from './constants/accountType';

@Pipe({ name: 'accountTypeByCode' })
export class AccountType implements PipeTransform {
  transform(value: string | number): string | number {
    let accountType: string | number = value;

    switch (value) {
      case accountTypeCode.OPERATING_ACCOUNT:
        return accountTypeText.OPERATING_ACCOUNT;
      case accountTypeCode.RESERVE_ACCOUNT:
        return accountTypeText.RESERVE_ACCOUNT;
    }

    return accountType;
  }
}
