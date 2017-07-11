/* eslint-disable no-console */

import path from "path";
import http from "http";
import express from "express";

import { assetsByChunkName as assets } from "./assets.json";

import App from "./components/App.html";

const app = express();
const server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, "public")));
const { css } = App.renderCss();

const html = component => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    ${css}
  </style>
</head>
<body>
  <div id="mnt">
    ${component}
  </div>
  <script src="${Array.isArray(assets.main) ? assets.main[0] : assets.main}"></script>
</body>
</html>`;

app.get("/", (req, res) => {
  const component = App.render({ time: new Date() });
  res.end(html(component));
});

server.listen(3000, err => console.log(err || "\n==> app listening on port 3000\n"));
