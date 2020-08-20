import { Component } from '@angular/core';
import { JauthService } from './services/jauth.service';
import { DataService } from './services/data.service';
import { FeatureFlagService } from './services/feature-flag.service';
import { AllHtmlEntities } from 'html-entities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isReconEnabled: boolean = true;

  constructor(
    private authService: JauthService,
    private dataService: DataService,
    private featureService: FeatureFlagService
  ) {
    const ent = new AllHtmlEntities();

    let encodedJwt = document.querySelector('#jwt');
    if (encodedJwt) {
      const jwt = ent.decode(encodedJwt.innerHTML);
      this.authService.setJwt(jwt);
    }

    let encodedGateway = document.querySelector('#gateway');
    if (encodedGateway) {
      const gateway = ent.decode(encodedGateway.innerHTML);
      this.dataService.setGatewayEndpoint(gateway);
    } else {
      this.dataService.setGatewayEndpointFromEnv();
    }
  }

  async ngOnInit() {
    await this.featureService.setFlags();
    let flags = this.featureService.getFeatureFlags();
    if (flags && flags.reconModuleEnabled === 'Y') {
      this.isReconEnabled = true;
    }
  }
}
