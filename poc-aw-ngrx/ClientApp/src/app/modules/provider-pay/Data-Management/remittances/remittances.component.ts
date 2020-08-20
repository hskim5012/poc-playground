import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataManagementService } from '../../../../services/data-management.service';
import {
  IRemittance,
  IRemittanceResponse
} from '../../../../models/remittanceResult';
import { Levels } from '../../../../models/remitLevels';
import { RemitValues } from '../../../../models/remitValues';
import * as moment from 'moment';
import { Store, select } from '@ngrx/store';
import * as remittanceActions from '../../state/remittance.actions';
import * as fromRemittances from '../../state/remittance.reducers';
import { Observable } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-remittances',
  templateUrl: './remittances.component.html',
  styleUrls: ['./remittances.component.css']
})
export class RemittancesComponent implements OnInit, OnDestroy {
  levels: Levels[] = [
    { id: 1, name: 'Account Level' },
    { id: 2, name: 'Group Level' }
  ];

  remitValues: RemitValues;

  results$: Observable<IRemittanceResponse>;
  activeComponent = true;
  remitValues$: Observable<{
    ncpdp: string;
    asOfDate: string;
    remitDateFrom: string;
    remitDateTo: string;
    linesPerPage: string;
    level: string;
  }>;

  constructor(private _store: Store<fromRemittances.State>) {}

  ngOnInit() {
    this._store
      .pipe(select(fromRemittances.getSearchCriteria))
      .pipe(takeWhile(() => this.activeComponent), tap(results => console.log(results)))
      .subscribe((search: RemitValues) => (this.remitValues = search));

    // this.remitValues$ = this._store.pipe(select(fromRemittances.getSearchCriteria));

    this.results$ = this._store.pipe(select(fromRemittances.getRemittances));
  }

  onChangeLevel(event) {
    this.remitValues.level = event.name;
  }

  ngOnDestroy() {
    this.activeComponent = false;
  }

  remitRequest() {
    if (this.remitValues.level === 'Group Level') {
      const payload = {
        ncpdp: this.remitValues.ncpdp,
        remitDateFrom: moment(this.remitValues.remitDateFrom).format(
          'YYYYMMDD'
        ),
        remitDateTo: moment(this.remitValues.remitDateTo).format('YYYYMMDD'),
        asOfDate: moment(this.remitValues.asOfDate).format('YYYYMMDD'),
        linesPerPage: this.remitValues.linesPerPage
      };
      this._store.dispatch(new remittanceActions.Load(payload));
    }
  }
}
