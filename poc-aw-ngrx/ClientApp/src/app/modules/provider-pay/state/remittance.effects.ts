import { Injectable, Inject } from "@angular/core";
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType, act } from "@ngrx/effects";
import * as remittanceActions from "../state/remittance.actions";
import { mergeMap, map, catchError, switchMap, tap } from "rxjs/operators";
import { DataManagementService } from "../../../services/data-management.service";
import { IRemittanceResponse } from "../../../models/remittanceResult";
import { environment } from "../../../../environments/environment";

@Injectable()
export class RemittanceEffects {
  private gateway: string = environment.gatewayEndpoint;

  constructor(
    private actions$: Actions,
    private _dataManagementService: DataManagementService
  ) {
    // console.log("gateway", this.gateway);
  }

  @Effect()
  loadRemittance$: Observable<Action> = this.actions$.pipe(
    ofType<remittanceActions.Load>(
      remittanceActions.RemittanceActionTypes.Load
    ),
    mergeMap(action =>
      this._dataManagementService
        .getRemittanceResults(
          action.payload.ncpdp,
          action.payload.remitDateFrom,
          action.payload.remitDateTo,
          action.payload.asOfDate,
          action.payload.linesPerPage
        )
        .pipe(
          tap(results => console.log('results from effects', results)),
          map(
            (results: IRemittanceResponse) =>
              new remittanceActions.LoadSuccess(results)
          ),
          catchError(err => of(new remittanceActions.LoadFail(err)))
        )
    )
  );
}
