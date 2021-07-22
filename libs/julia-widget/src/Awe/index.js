import React from "react";
import { BASE_CONFIG } from "./test";

const Awe = ({ py, py1, py2 }) => {};
Awe.actions = {};
Awe.displayName = "223332222223332223332233333333444422222";

if (process.env.julia_env !== "production") {
  Awe.schema = {
    title: "Awe",
    type: "object",
    properties: {
      ...BASE_CONFIG,
      a: {},
      b: {},
    },
  };
}

export default React.memo(Awe);
