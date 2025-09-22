import {
  Country,
  readyBlackCredentials,
  timeoutBlackCredentials,
  readyWhiteCredentials,
  timeoutWhiteCredentials,
  tempPasswordsByCountry,
  isHide
} from "./repository";

const timeForCredBlocking = 660000; // 11 min timeout

export const getCredential = (readyArray: string[], timeoutArray: string[]) => {
  if (readyArray.length < 1) return null;

  const randomIndex = Math.floor(Math.random() * readyArray.length);
  const credential = readyArray[randomIndex];

  timeoutArray.unshift(credential);
  readyArray.splice(randomIndex, 1);

  setTimeout(() => {
    backToReadyCredential(readyArray, timeoutArray);
  }, timeForCredBlocking);

  return credential;
};

function backToReadyCredential(readyArr: string[], timeoutArr: string[]) {
  if (timeoutArr.length === 0) return;
  const credentialIndex = timeoutArr.length - 1;
  const credential = timeoutArr[credentialIndex];

  readyArr.push(credential);
  timeoutArr.splice(credentialIndex, 1);
}

export const getCredentialByCountry = (country: Country, credType: 'black' | 'white') => {
  const readyArray = credType === 'black' ? readyBlackCredentials[country] : readyWhiteCredentials[country];
  const timeoutArray = credType === 'black' ? timeoutBlackCredentials[country] : timeoutWhiteCredentials[country];

  return getCredential(readyArray, timeoutArray);
};

export function makeJsonFromCredentialAndCloakSettings(
  cred: string,
  country: Country,
  credType: 'black' | 'white'
) {
  const credentialArray = cred.split(":");
  const passwordIndex = credType === 'black' ? 0 : 1;
  const countryPassword = tempPasswordsByCountry[country][passwordIndex];

  return {
    host: credentialArray[0],
    port: credentialArray[1],
    login: credentialArray[2],
    pass: countryPassword || credentialArray[3],
    mode: isHide[0]
  };
}

export function makeJsonFromCredential(cred: string) {
  const credentialArray = cred.split(":");
  return {
    host: credentialArray[0],
    port: credentialArray[1],
    login: credentialArray[2],
    pass: credentialArray[3],

  };
}
