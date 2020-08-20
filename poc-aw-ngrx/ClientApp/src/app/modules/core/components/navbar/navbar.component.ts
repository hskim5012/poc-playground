import { Component, OnInit } from '@angular/core';
import { JauthService } from '../../../../services/jauth.service';

@Component({
  selector: 'core-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isReconEnabled: boolean = true;

  constructor(private auth: JauthService) {}

  ngOnInit() {}
}
