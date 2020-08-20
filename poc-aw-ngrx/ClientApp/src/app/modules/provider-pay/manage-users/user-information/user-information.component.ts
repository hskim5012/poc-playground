import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { User } from '../../../../models/user';
import { ManageUserService } from '../../../../services/manage-users.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {
  userNameModel = 'Username must not exceed 10 characters';
  user: User = new User();

  formAction: string;
  formActionHeader: string;
  formActionButton: string;

  validationErrors: Array<string>;

  constructor(
    private users: ManageUserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = this.users.getUserContext();
    this.user.ownerId = '999999995';
    this.refreshValidationErrors();
    this.route.queryParams.subscribe(params => {
      if (params && params.action) {
        switch (params.action) {
          case 'edit':
            this.formAction = params.action;
            this.formActionButton = 'Update User';
            this.formActionHeader = 'Edit User Information';
            this.user.confirmEmail = this.user.emailAddress;
            break;
          case 'create':
            this.formAction = params.action;
            this.formActionButton = 'Create New User';
            this.formActionHeader = this.formActionButton;
            break;
        }
      }
    });
  }

  onSubmit() {
    this.refreshValidationErrors();
    switch (this.formAction) {
      case 'edit':
        this.editUser();
        break;
      case 'create':
        this.createUser();
    }
  }

  createUser() {
    this.validateFormCreate();
    this.users.createNewUser(this.user).subscribe(
      results => {
        console.log('successfully created');
        this.navigateBack(`Successfully created ${this.user.userName}.`);
      },
      error => {
        console.log(error);
      }
    );
  }

  editUser() {
    this.validateFormEdit();
    const currentUserData = this.users.getUserContext();

    if (this.user.emailAddress !== currentUserData.emailAddress) {
      this.updateEmailAddress();
    }

    if (this.user.password) {
      this.updatePassword();
    }
  }

  updatePassword() {
    this.users.updatePassword(this.user).subscribe(
      results => {
        console.log('success');
      },
      error => {
        console.log('failure');
        console.log(error);
      }
    );
  }

  updateEmailAddress() {
    this.users.updateEmailAddress(this.user, '999999995').subscribe(
      results => {
        console.log('success');
        this.navigateBack(`Successfully changed ${this.user.userName}.`);
      },
      error => {
        console.log('failure');
        console.log(error);
      }
    );
  }

  cancel() {
    this.users.resetUserContext();
    this.navigateBack();
  }

  refreshValidationErrors() {
    this.validationErrors = new Array<string>();
  }

  validateFormEdit() {
    // TO DO: validation for fields needed to edit user
  }

  validateFormCreate() {
    // TO DO: validation for fields needed to create user
  }

  navigateBack(message: string = '') {
    const extras: NavigationExtras = {
      queryParams: {
        message: message
      }
    };
    this.router.navigate(['/manage-users'], extras);
  }
}
