import express from "express";
import { router } from "./router";
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/vpn-online-992", router);

app.get("/", (req, res) => {
  res.send("...");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
