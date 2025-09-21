export const gpt: string[] = [""];

export let readyNiceCredential: string[] = [];
export let timeoutNiceCredential: string[] = [];
export let readyBadCredential: string[] = [];
export let timeoutBadCredential: string[] = [];

// Taiwan credentials
export let readyTaiwanCredential: string[] = [];
export let timeoutTaiwanCredential: string[] = [];

// Chicago credentials
export let readyChicagoCredential: string[] = [];
export let timeoutChicagoCredential: string[] = [];

// Singapore credentials
export let readySingaporeCredential: string[] = [];
export let timeoutSingaporeCredential: string[] = [];

// Amsterdam credentials
export let readyAmsterdamCredential: string[] = [];
export let timeoutAmsterdamCredential: string[] = [];

// Japan credentials
export let readyJapanCredential: string[] = [];
export let timeoutJapanCredential: string[] = [];

export const tempPassword = ["", ""]; // black and white
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

export function GetCredentialsArraysLength() {
  const readyBlackCredentials = readyNiceCredential.length;
  const timeoutBlackCredentials = timeoutNiceCredential.length;
  const readyWhiteCredentials = readyBadCredential.length;
  const timeoutWhiteCredentials = timeoutBadCredential.length;
  
  // Add new location lengths
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

  return {
    readyBlackCredentials,
    timeoutBlackCredentials,
    readyWhiteCredentials,
    timeoutWhiteCredentials,
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
  };
}
