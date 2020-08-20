export class RemitValues {
    ncpdp: string;
    asOfDate: string;
    remitDateFrom: string;
    remitDateTo: string;
    linesPerPage: string;
    level: string;

    constructor(ncpdp: string, asOfDate: string, remitDateFrom: string, remitDateTo: string, linesPerPage: string, level: string) {
        this.ncpdp = ncpdp;
        this.asOfDate = asOfDate;
        this.remitDateFrom = remitDateFrom;
        this.remitDateTo = remitDateTo;
        this.linesPerPage = linesPerPage;
        this.level = level;
      }
}
