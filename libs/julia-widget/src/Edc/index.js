import React from "react";

const Edc = ({ py, py1, py2 }) => {};
Edc.actions = {};
Edc.displayName = "22333332222222";

if (process.env.julia_env !== "production") {
  Edc.schema = {
    title: "Edc",
    type: "object",
    properties: {
      a: 123,
      b: 234,
    },
  };
}

export default React.memo(Edc);
