"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCredentialsArraysLength = exports.WriteNewDataToArray = exports.isHide = exports.config = exports.tempPassword = exports.timeoutJapanCredential = exports.readyJapanCredential = exports.timeoutAmsterdamCredential = exports.readyAmsterdamCredential = exports.timeoutSingaporeCredential = exports.readySingaporeCredential = exports.timeoutChicagoCredential = exports.readyChicagoCredential = exports.timeoutTaiwanCredential = exports.readyTaiwanCredential = exports.timeoutBadCredential = exports.readyBadCredential = exports.timeoutNiceCredential = exports.readyNiceCredential = exports.gpt = void 0;
exports.gpt = [""];
exports.readyNiceCredential = [];
exports.timeoutNiceCredential = [];
exports.readyBadCredential = [];
exports.timeoutBadCredential = [];
// Taiwan credentials
exports.readyTaiwanCredential = [];
exports.timeoutTaiwanCredential = [];
// Chicago credentials
exports.readyChicagoCredential = [];
exports.timeoutChicagoCredential = [];
// Singapore credentials
exports.readySingaporeCredential = [];
exports.timeoutSingaporeCredential = [];
// Amsterdam credentials
exports.readyAmsterdamCredential = [];
exports.timeoutAmsterdamCredential = [];
// Japan credentials
exports.readyJapanCredential = [];
exports.timeoutJapanCredential = [];
exports.tempPassword = ["", ""]; // black and white
exports.config = [0];
exports.isHide = [false];
function WriteNewDataToArray(readyCredentials, timeoutCredentials, newArray) {
    const cred = newArray[0];
    const credentialArray = cred.split(":");
    exports.tempPassword[0] = credentialArray[3];
    timeoutCredentials.length = 0;
    readyCredentials.length = 0;
    readyCredentials.push(...newArray);
    return readyCredentials.length;
}
exports.WriteNewDataToArray = WriteNewDataToArray;
function GetCredentialsArraysLength() {
    const readyBlackCredentials = exports.readyNiceCredential.length;
    const timeoutBlackCredentials = exports.timeoutNiceCredential.length;
    const readyWhiteCredentials = exports.readyBadCredential.length;
    const timeoutWhiteCredentials = exports.timeoutBadCredential.length;
    // Add new location lengths
    const readyTaiwanCredentials = exports.readyTaiwanCredential.length;
    const timeoutTaiwanCredentials = exports.timeoutTaiwanCredential.length;
    const readyChicagoCredentials = exports.readyChicagoCredential.length;
    const timeoutChicagoCredentials = exports.timeoutChicagoCredential.length;
    const readySingaporeCredentials = exports.readySingaporeCredential.length;
    const timeoutSingaporeCredentials = exports.timeoutSingaporeCredential.length;
    const readyAmsterdamCredentials = exports.readyAmsterdamCredential.length;
    const timeoutAmsterdamCredentials = exports.timeoutAmsterdamCredential.length;
    const readyJapanCredentials = exports.readyJapanCredential.length;
    const timeoutJapanCredentials = exports.timeoutJapanCredential.length;
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
exports.GetCredentialsArraysLength = GetCredentialsArraysLength;
//# sourceMappingURL=repository.js.map