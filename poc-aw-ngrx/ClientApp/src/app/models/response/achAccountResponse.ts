import { AchAccount } from '../achAccount';

export class AchAccountResponse {
  data: any = {
    account: Array<AchAccount>()
  };
}
