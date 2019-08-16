import React from "react";
import NotFound from "./NotFound";
import "../css/Article.css";

export default props => {
  //const siteConfig = require(`../../data/${props.site}/siteConfig`);
  //const imagePath = require(`../images/${siteConfig.aboutImage}`);
  require(`../css/${props.site}/theme.css`);
  try {
    const MarkdownData = require(`../../data/${props.site}/${props.match.params.slug}.md`);
    const posterStyle = {
      backgroundImage: `url(${MarkdownData.posterImage})`
    };
    return (
      <div>
        <div className="article">
          <div className="poster" style={posterStyle} />
          <h1>{MarkdownData.title}</h1>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: MarkdownData.__content }}
          />
        </div>
      </div>
    );
  } catch (error) {
    return <NotFound />
  }
};