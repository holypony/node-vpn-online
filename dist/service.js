"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeJsonFromCredential = exports.makeJsonFromCredentialAndCloakSettings = exports.getCredential = void 0;
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
function makeJsonFromCredentialAndCloakSettings(cred, mode, hide = false, gptToken) {
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
exports.makeJsonFromCredentialAndCloakSettings = makeJsonFromCredentialAndCloakSettings;
function makeJsonFromCredential(cred, gptToken) {
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
exports.makeJsonFromCredential = makeJsonFromCredential;
//# sourceMappingURL=service.js.map