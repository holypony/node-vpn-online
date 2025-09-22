import {Router} from "express";
import {
  config,
  countries,
  Country,
  GetCredentialsArraysLength,
  isHide,
  readyBadCredential,
  readyNiceCredential,
  tempPassword,
  tempPasswordsByCountry,
  timeoutBadCredential,
  timeoutNiceCredential,
  WriteNewDataToAllCountries,
  WriteNewDataToArray,
  WriteNewDataToCountryArray
} from "./repository";
import {getCredentialByCountry, makeJsonFromCredentialAndCloakSettings,} from "./service";
import {body, validationResult} from "express-validator";

export const router = Router();
router.get("/getcred", (req, res) => {
  console.log("req.query.referrer. ", req.query.referrer);
  console.log("req.query.country. ", req.query.country);

  const country = req.query.country?.toString().toLowerCase() as Country;
  const referrer = req.query.referrer?.toString();

  // Validate country
  if (!country || !countries.includes(country)) {
    res.status(400).json({ error: "Invalid or missing country. Valid countries: " + countries.join(", ") });
    return;
  }

  // Determine credential type based on referrer
  const credType: 'black' | 'white' =
    referrer && (referrer.includes("facebook") || referrer.includes("instagram"))
      ? 'black'
      : 'white';

  const cred = getCredentialByCountry(country, credType);
  if (cred === null) {
    res.status(404).json({ error: "No credentials available for the specified country and type" });
    return;
  }

  const json = makeJsonFromCredentialAndCloakSettings(
    cred,
    country,
    credType
  );
  res.json(json);
});


router.post("/setNewBlackPwd", body("tempPwd").isString(), (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
    return;
  }

  const country = req.query.country?.toString().toLowerCase();
  const newPassword = req.body.tempPwd;

  if (country === "all") {
    // Update all countries
    for (const c of countries) {
      tempPasswordsByCountry[c][0] = newPassword;
    }
    // Also update legacy
    tempPassword[0] = newPassword;
    res.json({ message: "Black password updated for all countries", password: newPassword });
  } else if (country && countries.includes(country as Country)) {
    // Update specific country
    tempPasswordsByCountry[country as Country][0] = newPassword;
    res.json({ message: `Black password updated for ${country}`, password: newPassword });
  } else {
    // Legacy behavior
    tempPassword[0] = newPassword;
    const jsonResponse = JSON.stringify(tempPassword[0]);
    res.end(jsonResponse);
  }
});

router.post("/setNewWhitePwd", body("tempPwd").isString(), (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
    return;
  }

  const country = req.query.country?.toString().toLowerCase();
  const newPassword = req.body.tempPwd;

  if (country === "all") {
    // Update all countries
    for (const c of countries) {
      tempPasswordsByCountry[c][1] = newPassword;
    }
    // Also update legacy
    tempPassword[1] = newPassword;
    res.json({ message: "White password updated for all countries", password: newPassword });
  } else if (country && countries.includes(country as Country)) {
    // Update specific country
    tempPasswordsByCountry[country as Country][1] = newPassword;
    res.json({ message: `White password updated for ${country}`, password: newPassword });
  } else {
    // Legacy behavior
    tempPassword[1] = newPassword;
    const jsonResponse = JSON.stringify(tempPassword[1]);
    res.end(jsonResponse);
  }
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

    const country = req.query.country?.toString().toLowerCase();
    const arr = StringToArray(req.body.credentials);
    let lengthOfArray = 0;

    if (country === "all--") {
      lengthOfArray = WriteNewDataToAllCountries('white', arr);
      // Also update legacy array for backward compatibility
      WriteNewDataToArray(readyBadCredential, timeoutBadCredential, arr);
    } else if (country && countries.includes(country as Country)) {
      lengthOfArray = WriteNewDataToCountryArray(country as Country, 'white', arr);
      // For countries other than USA and Australia, also set black credentials
      if (country !== 'usa' && country !== 'australia') {
        WriteNewDataToCountryArray(country as Country, 'black', arr);
      }
    } else {
      // Legacy behavior - update old array
      lengthOfArray = WriteNewDataToArray(readyBadCredential, timeoutBadCredential, arr);
    }

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

    const country = req.query.country?.toString().toLowerCase();
    const arr = StringToArray(req.body.credentials);
    let lengthOfArray = 0;

    if (country === "all--") {
      lengthOfArray = WriteNewDataToAllCountries('black', arr);
      // Also update legacy array for backward compatibility
      WriteNewDataToArray(readyNiceCredential, timeoutNiceCredential, arr);
    } else if (country && countries.includes(country as Country)) {
      lengthOfArray = WriteNewDataToCountryArray(country as Country, 'black', arr);
      // For countries other than USA and Australia, also set white credentials
      if (country !== 'usa' && country !== 'australia') {
        WriteNewDataToCountryArray(country as Country, 'white', arr);
      }
    } else {
      // Legacy behavior - update old array
      lengthOfArray = WriteNewDataToArray(readyNiceCredential, timeoutNiceCredential, arr);
    }

    const jsonResponse = JSON.stringify(lengthOfArray);
    res.end(jsonResponse);
  }
);

router.get("/getIosArraysLength", async (req, res) => {
  const obj = GetCredentialsArraysLength();
  const jsonResponse = JSON.stringify(obj);
  res.end(jsonResponse);
});




function StringToArray(s: string): string[] {
  const credentialsArray = s.split(" ");
  return credentialsArray;
}
