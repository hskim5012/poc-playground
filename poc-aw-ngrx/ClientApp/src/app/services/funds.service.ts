import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from './data.service';
import { AchAccount } from '../models/achAccount';
import { AchAccountResponse } from '../models/response/achAccountResponse';

@Injectable({
  providedIn: 'root'
})
export class FundsService {
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

  public getAchAccounts(taxId: string) {
    let params = new HttpParams().set('taxId', taxId);

    return this.http.get<AchAccountResponse>(
      `${this.gateway}v1/recon/funds/admin/account`,
      {
        params: params
      }
    );
  }

  public createAchAccount(account: AchAccount) {
    return this.http.post<any>(
      `${this.gateway}v1/recon/funds/admin/account`,
      account
    );
  }

  public deleteAchAccount(account: AchAccount) {
    return this.http.put(
      `${this.gateway}v1/recon/funds/admin/account`,
      account
    );
  }
}
