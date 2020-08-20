import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { ManageUserService } from '../../../services/manage-users.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: Array<User>;
  newUser: User;
  headerMessage: string;

  constructor(
    private userList: ManageUserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.refreshHeaderMessage();
    this.users = new Array<User>();
  }

  ngOnInit() {
    this.refreshManageUsers();
    this.route.queryParams.subscribe(params => {
      if (params && params.message) {
        this.headerMessage = params.message;
      }
    });
  }

  refreshManageUsers() {
    this.userList.getAllUsers('999999995').subscribe(results => {
      this.users = results.data.users;
    });
  }

  edit(user: any) {
    this.userList.setUserContext(user);
    this.navigateWithAction('edit');
  }

  create() {
    this.navigateWithAction('create');
  }

  terminate(user: any) {
    this.userList.terminate(user).subscribe(
      results => {
        console.log('success');
        this.refreshManageUsers();
      },
      error => {
        console.log('failure');
        console.log(error);
      }
    );
  }

  activate(user: any) {
    this.userList.activate(user).subscribe(
      results => {
        console.log('success');
        this.refreshManageUsers();
      },
      error => {
        console.log('failure');
        console.log(error);
      }
    );
  }

  navigateWithAction(action: string) {
    const extras: NavigationExtras = {
      queryParams: {
        action: action
      }
    };
    this.router.navigate(['/user-information'], extras);
  }

  refreshHeaderMessage() {
    this.headerMessage = '';
  }
}
