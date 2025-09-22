"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeJsonFromCredential = exports.makeJsonFromCredentialAndCloakSettings = exports.getCredentialByCountry = exports.getCredential = void 0;
const repository_1 = require("./repository");
const timeForCredBlocking = 660000; // 11 min timeout
const getCredential = (readyArray, timeoutArray) => {
    if (readyArray.length < 1)
        return null;
    const randomIndex = Math.floor(Math.random() * readyArray.length);
    const credential = readyArray[randomIndex];
    timeoutArray.unshift(credential);
    readyArray.splice(randomIndex, 1);
    setTimeout(() => {
        backToReadyCredential(readyArray, timeoutArray);
    }, timeForCredBlocking);
    return credential;
};
exports.getCredential = getCredential;
function backToReadyCredential(readyArr, timeoutArr) {
    if (timeoutArr.length === 0)
        return;
    const credentialIndex = timeoutArr.length - 1;
    const credential = timeoutArr[credentialIndex];
    readyArr.push(credential);
    timeoutArr.splice(credentialIndex, 1);
}
const getCredentialByCountry = (country, credType) => {
    const readyArray = credType === 'black' ? repository_1.readyBlackCredentials[country] : repository_1.readyWhiteCredentials[country];
    const timeoutArray = credType === 'black' ? repository_1.timeoutBlackCredentials[country] : repository_1.timeoutWhiteCredentials[country];
    return (0, exports.getCredential)(readyArray, timeoutArray);
};
exports.getCredentialByCountry = getCredentialByCountry;
function makeJsonFromCredentialAndCloakSettings(cred, country, credType) {
    const credentialArray = cred.split(":");
    const passwordIndex = credType === 'black' ? 0 : 1;
    const countryPassword = repository_1.tempPasswordsByCountry[country][passwordIndex];
    return {
        host: credentialArray[0],
        port: credentialArray[1],
        login: credentialArray[2],
        pass: countryPassword || credentialArray[3],
        mode: repository_1.isHide[0]
    };
}
exports.makeJsonFromCredentialAndCloakSettings = makeJsonFromCredentialAndCloakSettings;
function makeJsonFromCredential(cred) {
    const credentialArray = cred.split(":");
    return {
        host: credentialArray[0],
        port: credentialArray[1],
        login: credentialArray[2],
        pass: credentialArray[3],
    };
}
exports.makeJsonFromCredential = makeJsonFromCredential;
//# sourceMappingURL=service.js.map