import React from "react";

const Awe = ({ py, py1, py2 }) => {};
Awe.actions = {};
Awe.displayName = "22333222333222333223333444422222";

if (process.env.julia_env !== "production") {
  Awe.schema = {
    title: "Awe",
    type: "object",
    properties: {
      a: {},
      b: {},
    },
  };
}

export default React.memo(Awe);
