import React from "react";

const Awe = ({ py, py1, py2 }) => {};
Awe.actions = {};
Awe.displayName = "22333222222333222333223333444422222";

if (process.env.julia_env !== "production") {
  Awe.schema = {
    title: "Awe",
    type: "object",
    properties: {
      a: {},
      b: {},
      d:123
    },
    c:1231222211
  };
}

export default React.memo(Awe);
