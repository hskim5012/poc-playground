import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from './data.service';
import { IRemittanceResponse } from '../models/remittanceResult';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {
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

  public getRemittanceResults(group: string, remittanceDateBegin: string, remittanceDateEnd: string, asOf: string, limit: string) {
    const params = new HttpParams()
    .set('group', group)
    .set('remittanceDateBegin', remittanceDateBegin)
    .set('remittanceDateEnd', remittanceDateEnd)
    .set('asOf', asOf)
    .set('limit', limit);

    return this.http.get<IRemittanceResponse>(`${environment.gatewayEndpoint}v1/dataManagement/remittances`, {
      params: params
    });
  }

  public getRemittanceResultsncpdp(taxId: string, remittanceDateBegin: string, remittanceDateEnd: string, asOf: string, limit: string) {
    const params = new HttpParams()
    .set('ncpdp', taxId)
    .set('remittanceDateBegin', remittanceDateBegin)
    .set('remittanceDateEnd', remittanceDateEnd)
    .set('asOf', asOf)
    .set('limit', limit);

    return this.http.get<IRemittanceResponse>(`${this.gateway}v1/dataManagement/remittances`, {
      params: params
    });
  }

}
