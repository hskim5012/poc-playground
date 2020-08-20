export interface IRemittanceResponse {
  data: {
    remits: Array<IRemittance>;
  };
}

export interface IRemittance {
  ProviderMaster?: {
    PV01NAME: string;
  }; // PV01NAME from ProviderMaster model
  summarySequence?: number; // DC06SEQ
  payerNumber?: string; // remittance# DC06
  carrierName?: string; // payer name DCM06CNAM
  carrierCode?: string; // carrier code DC06CAR
  transactionDate?: number; // DC06DDTE
  payerDate?: number; // DC06PMD
  remittanceAmount?: number; // DC06AMT
  documentControlNumber?: string; // DC06DCN
  documentSequence?: string; // DC06HSQ
  transactionAmount?: number; // DC06AMT
  summaryDocumentType?: string; // DC06STYP
  associatedAmount?: number; // DC06AAMT
  unassociatedAmount?: number; // DC06UAMT
  excludedAmount?: number; // DC06XAMT
  adjustmentAmount?: number; // DC06DAMT
  workedTransaction?: string; // DC06WRK
  effectiveChangeRequestDate?: number; // DC06EDT
  excludeDate?: number; // DC06XDTE
  paymentMatch?: number;
  accountType?: string;
  taxId?: string;
  effectiveDate?: number; // DC06EDTE
  paymentAmount?: number; //DC06AMT of matched payment, if applicable
}

export interface ProviderMaster {
  PV01NAME: string;
}
