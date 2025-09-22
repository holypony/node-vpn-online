
// Country list
export const countries = ['usa', 'australia', 'brazil', 'mexico', 'uk', 'netherlands', 'japan', 'india', 'indonesia', 'hongkong', 'ukraine'] as const;
export type Country = typeof countries[number];

// Black credentials (readyNiceCredential)
export const readyBlackCredentials: Record<Country, string[]> = {
  usa: [],
  australia: [],
  brazil: [],
  mexico: [],
  uk: [],
  netherlands: [],
  japan: [],
  india: [],
  indonesia: [],
  hongkong: [],
  ukraine: []
};

export const timeoutBlackCredentials: Record<Country, string[]> = {
  usa: [],
  australia: [],
  brazil: [],
  mexico: [],
  uk: [],
  netherlands: [],
  japan: [],
  india: [],
  indonesia: [],
  hongkong: [],
  ukraine: []
};

// White credentials (readyBadCredential)
export const readyWhiteCredentials: Record<Country, string[]> = {
  usa: [],
  australia: [],
  brazil: [],
  mexico: [],
  uk: [],
  netherlands: [],
  japan: [],
  india: [],
  indonesia: [],
  hongkong: [],
  ukraine: []
};

export const timeoutWhiteCredentials: Record<Country, string[]> = {
  usa: [],
  australia: [],
  brazil: [],
  mexico: [],
  uk: [],
  netherlands: [],
  japan: [],
  india: [],
  indonesia: [],
  hongkong: [],
  ukraine: []
};

// Legacy arrays for backward compatibility
export let readyNiceCredential: string[] = [];
export let timeoutNiceCredential: string[] = [];
export let readyBadCredential: string[] = [];
export let timeoutBadCredential: string[] = [];

// Taiwan credentials (keeping for compatibility)
export let readyTaiwanCredential: string[] = [];
export let timeoutTaiwanCredential: string[] = [];

// Chicago credentials (keeping for compatibility)
export let readyChicagoCredential: string[] = [];
export let timeoutChicagoCredential: string[] = [];

// Singapore credentials (keeping for compatibility)
export let readySingaporeCredential: string[] = [];
export let timeoutSingaporeCredential: string[] = [];

// Amsterdam credentials (keeping for compatibility)
export let readyAmsterdamCredential: string[] = [];
export let timeoutAmsterdamCredential: string[] = [];

// Japan credentials (keeping for compatibility)
export let readyJapanCredential: string[] = [];
export let timeoutJapanCredential: string[] = [];

// Password storage per country
export const tempPasswordsByCountry: Record<Country, [string, string]> = {
  usa: ["", ""],
  australia: ["", ""],
  brazil: ["", ""],
  mexico: ["", ""],
  uk: ["", ""],
  netherlands: ["", ""],
  japan: ["", ""],
  india: ["", ""],
  indonesia: ["", ""],
  hongkong: ["", ""],
  ukraine: ["", ""]
};

export const tempPassword = ["", ""]; // black and white - legacy
export const config = [0];
export const isHide = [false];

export function WriteNewDataToArray(
  readyCredentials: string[],
  timeoutCredentials: string[],
  newArray: string[]
) {
  const cred = newArray[0];
  const credentialArray = cred.split(":");

  tempPassword[0] = credentialArray[3];

  timeoutCredentials.length = 0;
  readyCredentials.length = 0;
  readyCredentials.push(...newArray);

  return readyCredentials.length;
}

export function WriteNewDataToCountryArray(
  country: Country,
  credType: 'black' | 'white',
  newArray: string[]
) {
  const readyCredentials = credType === 'black' ? readyBlackCredentials[country] : readyWhiteCredentials[country];
  const timeoutCredentials = credType === 'black' ? timeoutBlackCredentials[country] : timeoutWhiteCredentials[country];

  const cred = newArray[0];
  const credentialArray = cred.split(":");

  // Update password for this country
  const passwordIndex = credType === 'black' ? 0 : 1;
  tempPasswordsByCountry[country][passwordIndex] = credentialArray[3];

  timeoutCredentials.length = 0;
  readyCredentials.length = 0;
  readyCredentials.push(...newArray);

  return readyCredentials.length;
}

export function WriteNewDataToAllCountries(
  credType: 'black' | 'white',
  newArray: string[]
) {
  let totalLength = 0;
  for (const country of countries) {
    totalLength += WriteNewDataToCountryArray(country, credType, newArray);
  }
  return totalLength;
}

export function GetCredentialsArraysLength() {
  // Legacy credentials
  const readyBlackCredentialsLegacy = readyNiceCredential.length;
  const timeoutBlackCredentialsLegacy = timeoutNiceCredential.length;
  const readyWhiteCredentialsLegacy = readyBadCredential.length;
  const timeoutWhiteCredentialsLegacy = timeoutBadCredential.length;

  // Legacy location lengths
  const readyTaiwanCredentials = readyTaiwanCredential.length;
  const timeoutTaiwanCredentials = timeoutTaiwanCredential.length;
  const readyChicagoCredentials = readyChicagoCredential.length;
  const timeoutChicagoCredentials = timeoutChicagoCredential.length;
  const readySingaporeCredentials = readySingaporeCredential.length;
  const timeoutSingaporeCredentials = timeoutSingaporeCredential.length;
  const readyAmsterdamCredentials = readyAmsterdamCredential.length;
  const timeoutAmsterdamCredentials = timeoutAmsterdamCredential.length;
  const readyJapanCredentials = readyJapanCredential.length;
  const timeoutJapanCredentials = timeoutJapanCredential.length;

  // New country-based credentials
  const countryCredentials: Record<string, any> = {};
  for (const country of countries) {
    countryCredentials[`ready${country.charAt(0).toUpperCase() + country.slice(1)}BlackCredentials`] = readyBlackCredentials[country].length;
    countryCredentials[`timeout${country.charAt(0).toUpperCase() + country.slice(1)}BlackCredentials`] = timeoutBlackCredentials[country].length;
    countryCredentials[`ready${country.charAt(0).toUpperCase() + country.slice(1)}WhiteCredentials`] = readyWhiteCredentials[country].length;
    countryCredentials[`timeout${country.charAt(0).toUpperCase() + country.slice(1)}WhiteCredentials`] = timeoutWhiteCredentials[country].length;
  }

  return {
    // Legacy
    readyBlackCredentials: readyBlackCredentialsLegacy,
    timeoutBlackCredentials: timeoutBlackCredentialsLegacy,
    readyWhiteCredentials: readyWhiteCredentialsLegacy,
    timeoutWhiteCredentials: timeoutWhiteCredentialsLegacy,
    readyTaiwanCredentials,
    timeoutTaiwanCredentials,
    readyChicagoCredentials,
    timeoutChicagoCredentials,
    readySingaporeCredentials,
    timeoutSingaporeCredentials,
    readyAmsterdamCredentials,
    timeoutAmsterdamCredentials,
    readyJapanCredentials,
    timeoutJapanCredentials,
    // New country-based
    ...countryCredentials
  };
}
