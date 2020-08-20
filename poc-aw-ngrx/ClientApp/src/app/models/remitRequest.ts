export class RemitRequest {
  ncpdp: string;
  eft: string;
  beginDate: string;
  endDate: string;
  reportType: string;

  constructor(ncpdp: string, eft: string, beginDate: string, endDate: string, reportType: string) {
    this.ncpdp = ncpdp;
    this.eft = eft;
    this.beginDate = beginDate;
    this.endDate = endDate;
    this.reportType = reportType;
  }
}
