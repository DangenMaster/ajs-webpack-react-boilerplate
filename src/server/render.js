import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Routes from "../components/Routes";

import { flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";

export default ({ clientStats }) => (req, res) => {

  const site = req.hostname.split(".")[0];
  const names = flushChunkNames().concat([`css/${site}-theme-css`]);
  const context = { site };
  const app = renderToString(
    <StaticRouter location={req.originalUrl} context={context}>
      <Routes />
    </StaticRouter>
  );

  const { js, styles, cssHash } = flushChunks(clientStats, {
    chunkNames: names
  });

  res.send(`
    <html>
      <head>
        <title>Link's Journel</title>
        ${styles}
      </head>
      <body>
        <div id="react-root">${app}</div>
        ${js}
      </body>
    </html>
  `);
};