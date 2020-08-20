import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {
  model: any = {};

  onSubmit(userForm) {
    if (userForm.form.valid) {
      alert('Form submitted sucessfully');

    }
  }

  constructor() { }

  ngOnInit() {
  }

}
