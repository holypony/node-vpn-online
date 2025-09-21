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
    console.log("req.query.referrer. ", req.query.referrer);
    const cred = (0, service_1.getCredential)(repository_1.readyNiceCredential, repository_1.timeoutNiceCredential);
    if (cred === null) {
        res.json("empty");
        return;
    }
    if (req.query.referrer) {
        const stringRef = req.query.referrer.toString();
        if (stringRef.includes("facebook") || stringRef.includes("instagram")) {
            const json = (0, service_1.makeJsonFromCredentialAndCloakSettings)(cred, true, repository_1.isHide[0], repository_1.gpt[0]);
            res.send(json);
            return;
        }
        if (stringRef.includes("premium")) {
            const json = (0, service_1.makeJsonFromCredentialAndCloakSettings)(cred, false, repository_1.isHide[0], repository_1.gpt[0]);
            res.send(json);
            return;
        }
        const json = (0, service_1.makeJsonFromCredentialAndCloakSettings)(cred, false, repository_1.isHide[0], repository_1.gpt[0]);
        res.send(json);
        return;
    }
    res.json("empty");
});
exports.router.get("/free", (req, res) => {
    const cred = (0, service_1.getCredential)(repository_1.readyBadCredential, repository_1.timeoutBadCredential);
    if (cred === null) {
        res.json("empty");
        return;
    }
    const json = (0, service_1.makeJsonFromCredential)(cred, repository_1.gpt[0]);
    res.send(json);
});
exports.router.get("/taiwan", (req, res) => {
    const cred = (0, service_1.getCredential)(repository_1.readyTaiwanCredential, repository_1.timeoutTaiwanCredential);
    if (cred === null) {
        res.json("empty");
        return;
    }
    const json = (0, service_1.makeJsonFromCredential)(cred, repository_1.gpt[0]);
    res.send(json);
});
exports.router.get("/chicago", (req, res) => {
    const cred = (0, service_1.getCredential)(repository_1.readyChicagoCredential, repository_1.timeoutChicagoCredential);
    if (cred === null) {
        res.json("empty");
        return;
    }
    const json = (0, service_1.makeJsonFromCredential)(cred, repository_1.gpt[0]);
    res.send(json);
});
exports.router.get("/singapore", (req, res) => {
    const cred = (0, service_1.getCredential)(repository_1.readySingaporeCredential, repository_1.timeoutSingaporeCredential);
    if (cred === null) {
        res.json("empty");
        return;
    }
    const json = (0, service_1.makeJsonFromCredential)(cred, repository_1.gpt[0]);
    res.send(json);
});
exports.router.get("/amsterdam", (req, res) => {
    const cred = (0, service_1.getCredential)(repository_1.readyAmsterdamCredential, repository_1.timeoutAmsterdamCredential);
    if (cred === null) {
        res.json("empty");
        return;
    }
    const json = (0, service_1.makeJsonFromCredential)(cred, repository_1.gpt[0]);
    res.send(json);
});
exports.router.get("/japan", (req, res) => {
    const cred = (0, service_1.getCredential)(repository_1.readyJapanCredential, repository_1.timeoutJapanCredential);
    if (cred === null) {
        res.json("empty");
        return;
    }
    const json = (0, service_1.makeJsonFromCredential)(cred, repository_1.gpt[0]);
    res.send(json);
});
exports.router.post("/setNewBlackPwd", (0, express_validator_1.body)("tempPwd").isString(), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ errors: errors.array() });
        return;
    }
    repository_1.tempPassword[0] = req.body.tempPwd;
    const jsonResponse = JSON.stringify(repository_1.tempPassword[0]);
    res.end(jsonResponse);
});
exports.router.post("/setNewWhitePwd", (0, express_validator_1.body)("tempPwd").isString(), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ errors: errors.array() });
        return;
    }
    repository_1.tempPassword[1] = req.body.tempPwd;
    const jsonResponse = JSON.stringify(repository_1.tempPassword[1]);
    res.end(jsonResponse);
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
    res.setHeader("Content-Type", "application/json");
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ errors: errors.array() });
        return;
    }
    const arr = StringToArray(req.body.credentials);
    const lengthOfArray = (0, repository_1.WriteNewDataToArray)(repository_1.readyBadCredential, repository_1.timeoutBadCredential, arr);
    const jsonResponse = JSON.stringify(lengthOfArray);
    res.end(jsonResponse);
}));
exports.router.post("/setBlackCredentials", (0, express_validator_1.body)("credentials").isString(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Content-Type", "application/json");
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ errors: errors.array() });
        return;
    }
    const arr = StringToArray(req.body.credentials);
    const lengthOfArray = (0, repository_1.WriteNewDataToArray)(repository_1.readyNiceCredential, repository_1.timeoutNiceCredential, arr);
    const jsonResponse = JSON.stringify(lengthOfArray);
    res.end(jsonResponse);
}));
exports.router.get("/getIosArraysLength", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = (0, repository_1.GetCredentialsArraysLength)();
    const jsonResponse = JSON.stringify(obj);
    res.end(jsonResponse);
}));
exports.router.post("/setCredentialsByCountry", (0, express_validator_1.body)("credentials").isString(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    switch (country) {
        case "taiwan":
            lengthOfArray = (0, repository_1.WriteNewDataToArray)(repository_1.readyTaiwanCredential, repository_1.timeoutTaiwanCredential, arr);
            break;
        case "chicago":
            lengthOfArray = (0, repository_1.WriteNewDataToArray)(repository_1.readyChicagoCredential, repository_1.timeoutChicagoCredential, arr);
            break;
        case "singapore":
            lengthOfArray = (0, repository_1.WriteNewDataToArray)(repository_1.readySingaporeCredential, repository_1.timeoutSingaporeCredential, arr);
            break;
        case "amsterdam":
            lengthOfArray = (0, repository_1.WriteNewDataToArray)(repository_1.readyAmsterdamCredential, repository_1.timeoutAmsterdamCredential, arr);
            break;
        case "japan":
            lengthOfArray = (0, repository_1.WriteNewDataToArray)(repository_1.readyJapanCredential, repository_1.timeoutJapanCredential, arr);
            break;
        default:
            res.status(400).json({ error: "Invalid country specified" });
            return;
    }
    const jsonResponse = JSON.stringify(lengthOfArray);
    res.end(jsonResponse);
}));
exports.router.post("/gptToken", (0, express_validator_1.body)("gptToken").isString(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Content-Type", "application/json");
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ errors: errors.array() });
        return;
    }
    repository_1.gpt[0] = req.body.gptToken;
    const jsonResponse = JSON.stringify(repository_1.gpt[0]);
    res.end(jsonResponse);
}));
function StringToArray(s) {
    const credentialsArray = s.split(" ");
    return credentialsArray;
}
//# sourceMappingURL=router.js.map