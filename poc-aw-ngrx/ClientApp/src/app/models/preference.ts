export interface IPreferenceResponse {
  data: IPreference;
}
export interface IPreference {
  streetAddress: IMainAddressGroup;
  mailingAddress: IMailingAddressGroup;
  contactInformation: IContactInformationGroup;
}

export interface IMainAddressGroup {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: number;
}

export interface IMailingAddressGroup {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: number;
}

export interface IContactInformationGroup {
  title: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phoneNumber: number;
  phoneExtension?: number;
  fax?: number;
  emailAddress: string;
}
