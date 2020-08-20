import { Action } from "@ngrx/store";
import { IRemittanceResponse } from "./../../../models/remittanceResult";
import { RemitValues } from "../../../models/remitValues";

export enum RemittanceActionTypes {
  Load = "[Remittance] Load",
  LoadSuccess = "[Remittance] Load Sucess",
  LoadFail = "[Remittance] Load Fail",
  InitializeCurrentSearchCriteria = "[Remittance] Initialize Current Search Criteria"
}

export class Load implements Action {
  readonly type = RemittanceActionTypes.Load;
  constructor(
    public payload: {
      ncpdp: string;
      remitDateFrom: string;
      remitDateTo: string;
      asOfDate: string;
      linesPerPage: string;
    }
  ) {}
}

export class InitializeCurrentSearchCriteria implements Action {
  readonly type = RemittanceActionTypes.InitializeCurrentSearchCriteria;
  constructor(public payload: RemitValues) {}
}

export class LoadSuccess implements Action {
  readonly type = RemittanceActionTypes.LoadSuccess;
  constructor(public payload: IRemittanceResponse) {}
}

export class LoadFail implements Action {
  readonly type = RemittanceActionTypes.LoadFail;
  constructor(public payload: string) {}
}

export type RemittanceAction = Load | LoadFail | LoadSuccess | InitializeCurrentSearchCriteria;
