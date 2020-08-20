import { Component, OnInit } from '@angular/core';
import { FundsService } from '../../../services/funds.service';
import { AchAccount } from '../../../models/achAccount';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {
  accounts: Array<AchAccount>;
  newAccount: AchAccount;
  validationErrors: Array<string>;

  constructor(private funds: FundsService) {
    this.accounts = new Array<AchAccount>();

    this.refreshValidationErrors();
    this.refreshNewAccountFormFields();
  }

  ngOnInit() {
    this.refreshAccountsList();
  }

  createAccount() {
    this.newAccount.taxId = 999999995; //remove when we have the auth stuff in place
    this.validateCreateAccountForm();

    if (this.validationErrors.length > 0) {
      return;
    }

    this.funds.createAchAccount(this.newAccount).subscribe(
      results => {
        this.refreshNewAccountFormFields();
        this.refreshAccountsList();
      },
      error => {
        console.error(error);
      }
    );
  }

  deleteAccount(account: any) {
    this.funds.deleteAchAccount(account).subscribe(
      results => {
        this.refreshAccountsList();
      },
      error => {
        console.error(error);
      }
    );
  }

  refreshAccountsList() {
    this.funds.getAchAccounts('999999995').subscribe(
      results => {
        if (results && results.data && results.data.account) {
          this.accounts = results.data.account.filter(
            x => !this.isDisabledYn(x.disabledYN)
          );
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  refreshNewAccountFormFields() {
    this.newAccount = new AchAccount();
  }

  refreshValidationErrors() {
    this.validationErrors = new Array<string>();
  }

  isDisabledYn(disabledYN: number) {
    if (!disabledYN) {
      return false;
    }

    return !!+disabledYN;
  }

  validateCreateAccountForm() {
    this.refreshValidationErrors();

    if (!this.newAccount.institution) {
      this.logRequiredValidationError('Name of Financial Institution');
    }

    // validation for routing number
    if (this.newAccount.routingNumber) {
      if (this.newAccount.routingNumber.toString().length < 9) {
        this.validationErrors.push(
          `"ACH Routing Number": Value is shorter than allowable minimum of 9 characters`
        );
      }
      this.checkNumericValidation(
        'ACH Routing Number',
        this.newAccount.routingNumber.toString()
      );
    } else {
      this.logRequiredValidationError('ACH Routing Number');
    }

    // validation for account number
    if (this.newAccount.accountNumber) {
      this.checkNumericValidation(
        'Account Number',
        this.newAccount.accountNumber
      );
    } else {
      this.logRequiredValidationError('Account Number');
    }

    // validation for account type
    if (!this.newAccount.type) {
      this.logRequiredValidationError('Account Type');
    }

    // validation for account name
    if (!this.newAccount.name) {
      this.logRequiredValidationError('Account Name');
    }
  }

  logRequiredValidationError(controlLabel: string) {
    this.validationErrors.push(`"${controlLabel}": Value is required.`);
  }

  checkNumericValidation(controlLabel: string, control: string) {
    if (isNaN(+control)) {
      this.validationErrors.push(
        `"${controlLabel}": Specified value is not a number.`
      );

      return false;
    }

    return true;
  }
}
