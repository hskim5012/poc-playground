import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RemitRequest } from '../../../../ClientApp/src/app/models/remitRequest';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selfBase: string;
  gateway: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.selfBase = baseUrl;
  }
  public getMembers(ncpdp: Array<string>) {
    console.log(ncpdp.toString());
    const bodyOptions = {
      data: { ncpdp: ncpdp }
    };
    return this.http.post<any>(`${this.gateway}v1/members`, bodyOptions);
  }
  public getReport(remitRequest: RemitRequest) {
    return this.http.post<any>(
      `${this.selfBase}v1/getRemitReport`,
      remitRequest
    );
  }
  public getPayments(ncpdp: string) {
    return this.http.get<any>(
      `${this.gateway}v1/centralPay/` + ncpdp + '/payments'
    );
  }
  public getEffectiveRateReports(ncpdp: string) {
    const params = new HttpParams().set('ncpdp', ncpdp);

    return this.http.get<any>(`${this.selfBase}v1/reports`, { params: params });
  }
  public setGatewayEndpoint(endpoint: string): void {
    this.gateway = endpoint;
  }

  public setGatewayEndpointFromEnv(): void {
    this.gateway = environment.gatewayEndpoint;
  }

  public getGatewayEndpoint(): string {
    return this.gateway;
  }

  public async getFlags() {
    return this.http.get<any>(`${this.selfBase}v1/getFlags`).toPromise();
  }
}
