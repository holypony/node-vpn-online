"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCredentialsArraysLength = exports.WriteNewDataToAllCountries = exports.WriteNewDataToCountryArray = exports.WriteNewDataToArray = exports.isHide = exports.config = exports.tempPassword = exports.tempPasswordsByCountry = exports.timeoutJapanCredential = exports.readyJapanCredential = exports.timeoutAmsterdamCredential = exports.readyAmsterdamCredential = exports.timeoutSingaporeCredential = exports.readySingaporeCredential = exports.timeoutChicagoCredential = exports.readyChicagoCredential = exports.timeoutTaiwanCredential = exports.readyTaiwanCredential = exports.timeoutBadCredential = exports.readyBadCredential = exports.timeoutNiceCredential = exports.readyNiceCredential = exports.timeoutWhiteCredentials = exports.readyWhiteCredentials = exports.timeoutBlackCredentials = exports.readyBlackCredentials = exports.countries = void 0;
// Country list
exports.countries = ['usa', 'australia', 'brazil', 'mexico', 'uk', 'netherlands', 'japan', 'india', 'indonesia', 'hongkong', 'ukraine'];
// Black credentials (readyNiceCredential)
exports.readyBlackCredentials = {
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
exports.timeoutBlackCredentials = {
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
exports.readyWhiteCredentials = {
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
exports.timeoutWhiteCredentials = {
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
exports.readyNiceCredential = [];
exports.timeoutNiceCredential = [];
exports.readyBadCredential = [];
exports.timeoutBadCredential = [];
// Taiwan credentials (keeping for compatibility)
exports.readyTaiwanCredential = [];
exports.timeoutTaiwanCredential = [];
// Chicago credentials (keeping for compatibility)
exports.readyChicagoCredential = [];
exports.timeoutChicagoCredential = [];
// Singapore credentials (keeping for compatibility)
exports.readySingaporeCredential = [];
exports.timeoutSingaporeCredential = [];
// Amsterdam credentials (keeping for compatibility)
exports.readyAmsterdamCredential = [];
exports.timeoutAmsterdamCredential = [];
// Japan credentials (keeping for compatibility)
exports.readyJapanCredential = [];
exports.timeoutJapanCredential = [];
// Password storage per country
exports.tempPasswordsByCountry = {
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
exports.tempPassword = ["", ""]; // black and white - legacy
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
function WriteNewDataToCountryArray(country, credType, newArray) {
    const readyCredentials = credType === 'black' ? exports.readyBlackCredentials[country] : exports.readyWhiteCredentials[country];
    const timeoutCredentials = credType === 'black' ? exports.timeoutBlackCredentials[country] : exports.timeoutWhiteCredentials[country];
    const cred = newArray[0];
    const credentialArray = cred.split(":");
    // Update password for this country
    const passwordIndex = credType === 'black' ? 0 : 1;
    exports.tempPasswordsByCountry[country][passwordIndex] = credentialArray[3];
    timeoutCredentials.length = 0;
    readyCredentials.length = 0;
    readyCredentials.push(...newArray);
    return readyCredentials.length;
}
exports.WriteNewDataToCountryArray = WriteNewDataToCountryArray;
function WriteNewDataToAllCountries(credType, newArray) {
    let totalLength = 0;
    for (const country of exports.countries) {
        totalLength += WriteNewDataToCountryArray(country, credType, newArray);
    }
    return totalLength;
}
exports.WriteNewDataToAllCountries = WriteNewDataToAllCountries;
function GetCredentialsArraysLength() {
    // Legacy credentials
    const readyBlackCredentialsLegacy = exports.readyNiceCredential.length;
    const timeoutBlackCredentialsLegacy = exports.timeoutNiceCredential.length;
    const readyWhiteCredentialsLegacy = exports.readyBadCredential.length;
    const timeoutWhiteCredentialsLegacy = exports.timeoutBadCredential.length;
    // Legacy location lengths
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
    // New country-based credentials
    const countryCredentials = {};
    for (const country of exports.countries) {
        countryCredentials[`ready${country.charAt(0).toUpperCase() + country.slice(1)}BlackCredentials`] = exports.readyBlackCredentials[country].length;
        countryCredentials[`timeout${country.charAt(0).toUpperCase() + country.slice(1)}BlackCredentials`] = exports.timeoutBlackCredentials[country].length;
        countryCredentials[`ready${country.charAt(0).toUpperCase() + country.slice(1)}WhiteCredentials`] = exports.readyWhiteCredentials[country].length;
        countryCredentials[`timeout${country.charAt(0).toUpperCase() + country.slice(1)}WhiteCredentials`] = exports.timeoutWhiteCredentials[country].length;
    }
    return Object.assign({ 
        // Legacy
        readyBlackCredentials: readyBlackCredentialsLegacy, timeoutBlackCredentials: timeoutBlackCredentialsLegacy, readyWhiteCredentials: readyWhiteCredentialsLegacy, timeoutWhiteCredentials: timeoutWhiteCredentialsLegacy, readyTaiwanCredentials,
        timeoutTaiwanCredentials,
        readyChicagoCredentials,
        timeoutChicagoCredentials,
        readySingaporeCredentials,
        timeoutSingaporeCredentials,
        readyAmsterdamCredentials,
        timeoutAmsterdamCredentials,
        readyJapanCredentials,
        timeoutJapanCredentials }, countryCredentials);
}
exports.GetCredentialsArraysLength = GetCredentialsArraysLength;
//# sourceMappingURL=repository.js.map