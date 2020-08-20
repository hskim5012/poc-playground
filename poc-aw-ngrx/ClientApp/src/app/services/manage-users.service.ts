import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from './data.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {
  selfBase: string;
  gateway: string;
  userContext: User;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private data: DataService
  ) {
    this.selfBase = baseUrl;
    this.gateway = this.data.getGatewayEndpoint();
    this.resetUserContext();
  }

  public getAllUsers(ownerId: string) {
    const params = new HttpParams().set('ownerId', ownerId);

    return this.http.get<any>(`${this.gateway}v1/recon/users/current`, {
      params: params
    });
  }

  public getUser(userLoginId: string, taxId: string) {
    const params = new HttpParams()
      .set('taxId', taxId)
      .set('userLogin', userLoginId);

    return this.http.get<any>(`${this.gateway}v1/recon/users/single`, {
      params: params
    });
  }

  public createNewUser(user: User) {
    return this.http.post(`${this.gateway}v1/recon/users/manage`, user);
  }

  public updateEmailAddress(user: User, ownerId: string) {
    const params = new HttpParams().set('ownerId', ownerId);
    return this.http.put(`${this.gateway}v1/recon/users/manage/email`, user);
  }

  public updatePassword(user: User) {
    return this.http.put(`${this.gateway}v1/recon/users/manage/password`, user);
  }

  public activate(user: User) {
    return this.http.put(`${this.gateway}v1/recon/users/manage/activate`, user);
  }

  public terminate(user: User) {
    return this.http.put(
      `${this.gateway}v1/recon/users/manage/terminate`,
      user
    );
  }

  public setUserContext(user: User): void {
    this.userContext = user;
  }

  public getUserContext(): User {
    return Object.assign(new User(), this.userContext);
  }

  resetUserContext(): void {
    this.userContext = new User();
  }
}
