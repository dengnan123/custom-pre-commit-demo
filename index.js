import React from "react";


const Test = ({ py, py1, py2 }) => {};

Test.actions = {};
Test.displayName = "";
if (process.env.julia_env !== "production") {
  Test.schema = {
    title: "Test",
    type: "object",
    properties: {
      a: 123,
      b: 234,
    },
  };
}

export default React.memo(Test);
