import React from "react";
import { Switch } from "react-router";
import { Route, Link } from "react-router-dom";
import universal from "react-universal-component";
import NotFound from "./NotFound";
import "../css/nav.css";

const UniversalComponent = universal(props => import(`./${props.page}`));

export default () => (
  <div>
    <div className="nav">
      <Link to="/">Gallery</Link>
      <Link to="/about">About</Link>
      <Link to="/article">Article</Link>
    </div>
    <Switch>
      <Route exact path="/">
        <UniversalComponent page="Gallery" />
      </Route>
      <Route 
        path="/about" 
        render={({ staticContext }) => {
          const site = staticContext
            ? staticContext.site 
            : location.hostname.split(".")[0];
          return <UniversalComponent site={site} page="About" />
        }}
      />
      <Route
        path="/article/:slug"
        render={({ staticContext, match }) => {
          const site = staticContext
            ? staticContext.site
            : location.hostname.split(".")[0];
          return <UniversalComponent 
              site={site}
              match={match}
              page="Article"
            />
        }}
      />
      <Route component={NotFound} />
    </Switch>
  </div>
);