import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { IPreferenceResponse, IPreference } from '../models/preference';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  selfBase: string;
  gateway: string;

  constructor(
    @Inject('BASE_URL') baseUrl: string,
    private data: DataService,
    private http: HttpClient
  ) {
    this.selfBase = baseUrl;
    this.gateway = this.data.getGatewayEndpoint();
  }

  public currentPreferences(taxId: string) {
    const params = new HttpParams().set('taxId', taxId);

    return this.http.get<IPreferenceResponse>(`${this.gateway}v1/recon/settings/preferences`, {
      params: params
    });
  }

  public updatePreferences(preference: IPreference, taxId: string, byWho: string) {
    const params = new HttpParams().set('taxId', taxId).set('byWho', byWho);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<void>(`${this.gateway}v1/recon/settings/preferences`, preference, { params: params, headers: headers });
  }


}
