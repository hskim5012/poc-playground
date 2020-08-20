import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ProviderPayRouting } from './provider-pay-routing.module';
import { MaterialModule } from '../material/material.module';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UserInformationComponent } from './manage-users/user-information/user-information.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { MatchValueDirective } from '../../helpers/match-value.directive';
import { FormsModule } from '@angular/forms';
import { FundsComponent } from './funds/funds.component';
import { AccountType } from '../../helpers/accountType.pipe';
import { PreferencesComponent } from './settings/preferences/preferences.component';
import { PhoneNumberPipe } from '../../helpers/phone-number.pipe';
import { RemittancesComponent } from './Data-Management/remittances/remittances.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/remittance.reducers';
import { EffectsModule } from '@ngrx/effects';
import { RemittanceEffects } from './state/remittance.effects';

@NgModule({
  declarations: [
    ManageUsersComponent,
    UserInformationComponent,
    ChangePasswordComponent,
    AccountType,
    ChangePasswordComponent,
    FundsComponent,
    MatchValueDirective,
    PreferencesComponent,
    PhoneNumberPipe,
    RemittancesComponent
  ],
  imports: [
    CommonModule,
    ProviderPayRouting,
    MaterialModule,
    FormsModule,
    StoreModule.forFeature("remittances", reducer),
    EffectsModule.forFeature([RemittanceEffects])
  ]
})
export class ProviderPayModule {}
