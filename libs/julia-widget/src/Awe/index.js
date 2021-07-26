import React from "react";

const Awe = ({ py, py1, py2 }) => {};

const BASE_CONFIG = {
  py: {
    type: "string",
    title: "padding-Y-mobile",
    default: "12px",
  },
};
if (process.env.julia_env !== "production") {
  Awe.schema = {
    title: "Awe",
    type: "object",
    properties: {
      ...BASE_CONFIG,
      f: 122222222222222223,
      a: {},
      b: {},
    },
  };
}

export default React.memo(Awe);
