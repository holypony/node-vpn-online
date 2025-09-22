"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const repository_1 = require("./repository");
const service_1 = require("./service");
const express_validator_1 = require("express-validator");
exports.router = (0, express_1.Router)();
exports.router.get("/getcred", (req, res) => {
    var _a, _b;
    console.log("req.query.referrer. ", req.query.referrer);
    console.log("req.query.country. ", req.query.country);
    const country = (_a = req.query.country) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase();
    const referrer = (_b = req.query.referrer) === null || _b === void 0 ? void 0 : _b.toString();
    // Validate country
    if (!country || !repository_1.countries.includes(country)) {
        res.status(400).json({ error: "Invalid or missing country. Valid countries: " + repository_1.countries.join(", ") });
        return;
    }
    // Determine credential type based on referrer
    const credType = referrer && (referrer.includes("facebook") || referrer.includes("instagram"))
        ? 'black'
        : 'white';
    const cred = (0, service_1.getCredentialByCountry)(country, credType);
    if (cred === null) {
        res.status(404).json({ error: "No credentials available for the specified country and type" });
        return;
    }
    const json = (0, service_1.makeJsonFromCredentialAndCloakSettings)(cred, country, credType);
    res.json(json);
});
exports.router.post("/setNewBlackPwd", (0, express_validator_1.body)("tempPwd").isString(), (req, res) => {
    var _a;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ errors: errors.array() });
        return;
    }
    const country = (_a = req.query.country) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase();
    const newPassword = req.body.tempPwd;
    if (country === "all") {
        // Update all countries
        for (const c of repository_1.countries) {
            repository_1.tempPasswordsByCountry[c][0] = newPassword;
        }
        // Also update legacy
        repository_1.tempPassword[0] = newPassword;
        res.json({ message: "Black password updated for all countries", password: newPassword });
    }
    else if (country && repository_1.countries.includes(country)) {
        // Update specific country
        repository_1.tempPasswordsByCountry[country][0] = newPassword;
        res.json({ message: `Black password updated for ${country}`, password: newPassword });
    }
    else {
        // Legacy behavior
        repository_1.tempPassword[0] = newPassword;
        const jsonResponse = JSON.stringify(repository_1.tempPassword[0]);
        res.end(jsonResponse);
    }
});
exports.router.post("/setNewWhitePwd", (0, express_validator_1.body)("tempPwd").isString(), (req, res) => {
    var _a;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ errors: errors.array() });
        return;
    }
    const country = (_a = req.query.country) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase();
    const newPassword = req.body.tempPwd;
    if (country === "all") {
        // Update all countries
        for (const c of repository_1.countries) {
            repository_1.tempPasswordsByCountry[c][1] = newPassword;
        }
        // Also update legacy
        repository_1.tempPassword[1] = newPassword;
        res.json({ message: "White password updated for all countries", password: newPassword });
    }
    else if (country && repository_1.countries.includes(country)) {
        // Update specific country
        repository_1.tempPasswordsByCountry[country][1] = newPassword;
        res.json({ message: `White password updated for ${country}`, password: newPassword });
    }
    else {
        // Legacy behavior
        repository_1.tempPassword[1] = newPassword;
        const jsonResponse = JSON.stringify(repository_1.tempPassword[1]);
        res.end(jsonResponse);
    }
});
exports.router.put("/setNewMode", (0, express_validator_1.body)("mode").isString(), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ errors: errors.array() });
        return;
    }
    repository_1.config[0] = req.body.mode;
    const jsonResponse = JSON.stringify(repository_1.config[0]);
    res.end(jsonResponse);
});
exports.router.put("/setHide", (0, express_validator_1.body)("hide").isString(), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ errors: errors.array() });
        return;
    }
    repository_1.isHide[0] = req.body.hide;
    const jsonResponse = JSON.stringify(repository_1.isHide[0]);
    res.end(jsonResponse);
});
exports.router.get("/getNewPwd", (req, res) => {
    const jsonResponse = JSON.stringify(repository_1.tempPassword[0]);
    res.end(jsonResponse);
});
exports.router.post("/setWhiteCredentials", (0, express_validator_1.body)("credentials").isString(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    res.setHeader("Content-Type", "application/json");
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ errors: errors.array() });
        return;
    }
    const country = (_a = req.query.country) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase();
    const arr = StringToArray(req.body.credentials);
    let lengthOfArray = 0;
    if (country === "all--") {
        lengthOfArray = (0, repository_1.WriteNewDataToAllCountries)('white', arr);
        // Also update legacy array for backward compatibility
        (0, repository_1.WriteNewDataToArray)(repository_1.readyBadCredential, repository_1.timeoutBadCredential, arr);
    }
    else if (country && repository_1.countries.includes(country)) {
        lengthOfArray = (0, repository_1.WriteNewDataToCountryArray)(country, 'white', arr);
        // For countries other than USA and Australia, also set black credentials
        if (country !== 'usa' && country !== 'australia') {
            (0, repository_1.WriteNewDataToCountryArray)(country, 'black', arr);
        }
    }
    else {
        // Legacy behavior - update old array
        lengthOfArray = (0, repository_1.WriteNewDataToArray)(repository_1.readyBadCredential, repository_1.timeoutBadCredential, arr);
    }
    const jsonResponse = JSON.stringify(lengthOfArray);
    res.end(jsonResponse);
}));
exports.router.post("/setBlackCredentials", (0, express_validator_1.body)("credentials").isString(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    res.setHeader("Content-Type", "application/json");
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ errors: errors.array() });
        return;
    }
    const country = (_b = req.query.country) === null || _b === void 0 ? void 0 : _b.toString().toLowerCase();
    const arr = StringToArray(req.body.credentials);
    let lengthOfArray = 0;
    if (country === "all--") {
        lengthOfArray = (0, repository_1.WriteNewDataToAllCountries)('black', arr);
        // Also update legacy array for backward compatibility
        (0, repository_1.WriteNewDataToArray)(repository_1.readyNiceCredential, repository_1.timeoutNiceCredential, arr);
    }
    else if (country && repository_1.countries.includes(country)) {
        lengthOfArray = (0, repository_1.WriteNewDataToCountryArray)(country, 'black', arr);
        // For countries other than USA and Australia, also set white credentials
        if (country !== 'usa' && country !== 'australia') {
            (0, repository_1.WriteNewDataToCountryArray)(country, 'white', arr);
        }
    }
    else {
        // Legacy behavior - update old array
        lengthOfArray = (0, repository_1.WriteNewDataToArray)(repository_1.readyNiceCredential, repository_1.timeoutNiceCredential, arr);
    }
    const jsonResponse = JSON.stringify(lengthOfArray);
    res.end(jsonResponse);
}));
exports.router.get("/getIosArraysLength", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = (0, repository_1.GetCredentialsArraysLength)();
    const jsonResponse = JSON.stringify(obj);
    res.end(jsonResponse);
}));
function StringToArray(s) {
    const credentialsArray = s.split(" ");
    return credentialsArray;
}
//# sourceMappingURL=router.js.map