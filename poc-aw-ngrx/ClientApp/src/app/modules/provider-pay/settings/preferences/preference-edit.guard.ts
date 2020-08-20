import { Injectable, HostListener } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { PreferencesComponent } from './preferences.component';

@Injectable({
  providedIn: 'root'
})
export class PreferenceEditGuard
  implements CanDeactivate<PreferencesComponent> {
  // @HostListener('window:beforeunload')
  canDeactivate(
    component: PreferencesComponent
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (component.preferenceForm.dirty && !component.isSubmitted) {
      component.isSubmitted = false;
      return confirm(
        'WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.'
      );
    }
    return true;
  }
}
