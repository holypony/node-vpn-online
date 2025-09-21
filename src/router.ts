import { Router } from "express";
import {
  GetCredentialsArraysLength,
  WriteNewDataToArray,
  config,
  readyBadCredential,
  readyNiceCredential,
  tempPassword,
  timeoutBadCredential,
  timeoutNiceCredential,
  isHide,
  readyTaiwanCredential,
  timeoutTaiwanCredential,
  readyChicagoCredential,
  timeoutChicagoCredential,
  readySingaporeCredential,
  timeoutSingaporeCredential,
  readyAmsterdamCredential,
  timeoutAmsterdamCredential,
  readyJapanCredential,
  timeoutJapanCredential,
  gpt,
} from "./repository";
import {
  getCredential,
  makeJsonFromCredential,
  makeJsonFromCredentialAndCloakSettings,
} from "./service";
import { body, validationResult } from "express-validator";

export const router = Router();
router.get("/getcred", (req, res) => {
  console.log("req.query.referrer. ", req.query.referrer);

  const cred = getCredential(readyNiceCredential, timeoutNiceCredential);
  if (cred === null) {
    res.json("empty");
    return;
  }

  if (req.query.referrer) {
    const stringRef = req.query.referrer.toString();
    if (stringRef.includes("facebook") || stringRef.includes("instagram")) {
      const json = makeJsonFromCredentialAndCloakSettings(cred, true, isHide[0], gpt[0]);
      res.send(json);
      return;
    }
    if (stringRef.includes("premium")) {
      const json = makeJsonFromCredentialAndCloakSettings(cred, false, isHide[0], gpt[0]);
      res.send(json);
      return;
    }
    const json = makeJsonFromCredentialAndCloakSettings(cred, false,isHide[0], gpt[0]);
    res.send(json);
    return;
  }

  res.json("empty");
});

router.get("/free", (req, res) => {
  const cred = getCredential(readyBadCredential, timeoutBadCredential);
  if (cred === null) {
    res.json("empty");
    return;
  }
  const json = makeJsonFromCredential(cred, gpt[0]);

  res.send(json);
});
router.get("/taiwan", (req, res) => {
  const cred = getCredential(readyTaiwanCredential, timeoutTaiwanCredential);
  if (cred === null) {
    res.json("empty");
    return;
  }
  const json = makeJsonFromCredential(cred, gpt[0]);
  res.send(json);
});
router.get("/chicago", (req, res) => {
  const cred = getCredential(readyChicagoCredential, timeoutChicagoCredential);
  if (cred === null) {
    res.json("empty");
    return;
  }
  const json = makeJsonFromCredential(cred, gpt[0]);
  res.send(json);
});
router.get("/singapore", (req, res) => {
  const cred = getCredential(readySingaporeCredential, timeoutSingaporeCredential);
  if (cred === null) {
    res.json("empty");
    return;
  }
  const json = makeJsonFromCredential(cred, gpt[0]);
  res.send(json);
});
router.get("/amsterdam", (req, res) => {
  const cred = getCredential(readyAmsterdamCredential, timeoutAmsterdamCredential);
  if (cred === null) {
    res.json("empty");
    return;
  }
  const json = makeJsonFromCredential(cred, gpt[0]);
  res.send(json);
});
router.get("/japan", (req, res) => {
  const cred = getCredential(readyJapanCredential, timeoutJapanCredential);
  if (cred === null) {
    res.json("empty");
    return;
  }
  const json = makeJsonFromCredential(cred, gpt[0]);
  res.send(json);
});

router.post("/setNewBlackPwd", body("tempPwd").isString(), (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
    return;
  }

  tempPassword[0] = req.body.tempPwd;
  const jsonResponse = JSON.stringify(tempPassword[0]);
  res.end(jsonResponse);
});

router.post("/setNewWhitePwd", body("tempPwd").isString(), (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
    return;
  }

  tempPassword[1] = req.body.tempPwd;
  const jsonResponse = JSON.stringify(tempPassword[1]);
  res.end(jsonResponse);
});

router.put("/setNewMode", body("mode").isString(), (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
    return;
  }
  config[0] = req.body.mode;
  const jsonResponse = JSON.stringify(config[0]);
  res.end(jsonResponse);
});

router.put("/setHide", body("hide").isString(), (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
    return;
  }
  isHide[0] = req.body.hide;
  const jsonResponse = JSON.stringify(isHide[0]);
  res.end(jsonResponse);
});

router.get("/getNewPwd", (req, res) => {
  const jsonResponse = JSON.stringify(tempPassword[0]);
  res.end(jsonResponse);
});

router.post(
  "/setWhiteCredentials",
  body("credentials").isString(),
  async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    }

    const arr = StringToArray(req.body.credentials);
    const lengthOfArray = WriteNewDataToArray(
      readyBadCredential,
      timeoutBadCredential,
      arr
    );
    const jsonResponse = JSON.stringify(lengthOfArray);
    res.end(jsonResponse);
  }
);

router.post(
  "/setBlackCredentials",
  body("credentials").isString(),
  async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    }

    const arr = StringToArray(req.body.credentials);
    const lengthOfArray = WriteNewDataToArray(
      readyNiceCredential,
      timeoutNiceCredential,
      arr
    );
    const jsonResponse = JSON.stringify(lengthOfArray);
    res.end(jsonResponse);
  }
);

router.get("/getIosArraysLength", async (req, res) => {
  const obj = GetCredentialsArraysLength();
  const jsonResponse = JSON.stringify(obj);
  res.end(jsonResponse);
});

router.post(
  "/setCredentialsByCountry",
  body("credentials").isString(),
  async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    }

    const country = req.query.country?.toString().toLowerCase();
    const arr = StringToArray(req.body.credentials);
    let lengthOfArray = 0;

    switch (country) {
      case "taiwan":
        lengthOfArray = WriteNewDataToArray(
          readyTaiwanCredential,
          timeoutTaiwanCredential,
          arr
        );
        break;
      case "chicago":
        lengthOfArray = WriteNewDataToArray(
          readyChicagoCredential,
          timeoutChicagoCredential,
          arr
        );
        break;
      case "singapore":
        lengthOfArray = WriteNewDataToArray(
          readySingaporeCredential,
          timeoutSingaporeCredential,
          arr
        );
        break;
      case "amsterdam":
        lengthOfArray = WriteNewDataToArray(
          readyAmsterdamCredential,
          timeoutAmsterdamCredential,
          arr
        );
        break;
      case "japan":
        lengthOfArray = WriteNewDataToArray(
          readyJapanCredential,
          timeoutJapanCredential,
          arr
        );
        break;
      default:
        res.status(400).json({ error: "Invalid country specified" });
        return;
    }

    const jsonResponse = JSON.stringify(lengthOfArray);
    res.end(jsonResponse);
  }
);

router.post(
  "/gptToken",
  body("gptToken").isString(),
  async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    }

    gpt[0] = req.body.gptToken;
    const jsonResponse = JSON.stringify(gpt[0]);
    res.end(jsonResponse);
  }
);

function StringToArray(s: string): string[] {
  const credentialsArray = s.split(" ");
  return credentialsArray;
}
