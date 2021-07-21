import React from "react";

const Awe = ({ py, py1, py2 }) => {};
Awe.actions = {};
Awe.displayName = "223333322444422222";

if (process.env.julia_env !== "production") {
  Awe.schema = {
    title: "Awe",
    type: "object",
    properties: {
      a: 123,
      b: 234,
    },
  };
}

export default React.memo(Awe);
