import { tempPassword } from "./repository";

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

export function makeJsonFromCredentialAndCloakSettings(
  cred: string,
  mode: boolean,
  hide: boolean = false,
  gptToken
) {
  const credentialArray = cred.split(":");
  const credentialJson = JSON.stringify({
    ip: credentialArray[0],
    port: credentialArray[1],
    login: credentialArray[2],
    password: credentialArray[3],
    hide: hide, //to delete isStrickMode on vpn and ads always on if false check referrer
    mode: mode, // 0 - white 1 - black, 2 - ref
    gptToken: gptToken,
  });
  console.log(credentialJson);
  return credentialJson;
}

export function makeJsonFromCredential(cred: string, gptToken: string) {
  const credentialArray = cred.split(":");
  const credentialJson = JSON.stringify({
    ip: credentialArray[0],
    port: credentialArray[1],
    login: credentialArray[2],
    password: credentialArray[3],
  });
  //console.log(credentialJson);
  return credentialJson;
}
