import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {
  featureFlags: any = {};

  constructor(private data: DataService) { }

  public async setFlags() {
    await this.data
      .getFlags()
      .then(response => {
        this.featureFlags = response;
      })
      .catch(err => {});
  }

  public getFeatureFlags() {
    return this.featureFlags;
  }
}
