import { NgModule } from '@angular/core';
import { FormsModule, NG_VALIDATORS } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { CentralPayModule } from './modules/central-pay/central-pay.module';
import { ProviderPayModule } from './modules/provider-pay/provider-pay.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './modules/core/core.module';


import { AppComponent } from './app.component';

import { DataService } from './services/data.service';
import { JauthService } from './services/jauth.service';
import { FeatureFlagService } from './services/feature-flag.service';
import { FundsService } from './services/funds.service';

import { ManageUserService} from './services/manage-users.service';
import { JwtInterceptor } from './helpers/jwtInterceptor';
import { SettingsService } from './services/settings.service';
import { environment } from './../environments/environment';
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ProviderPayModule,
    CoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: "AtlasWeb Devtools",
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    DataService,
    HttpClientModule,
    JauthService,
    FeatureFlagService,
    FundsService,
    SettingsService,
    ManageUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
