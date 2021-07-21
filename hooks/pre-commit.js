const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const t = require("@babel/types");
const shell = require("shelljs");
const generate = require("@babel/generator").default;

const getCode = () => {
  return fs.readFileSync("index.js").toString();
};

const codeStr = getCode();

const isSchema = (node) => {
  return (
    node.left.property.name === "schema" && node.left.object.name === "Test"
  );
};

let newast;
let properties = [];

const arrowFnPlugin = {
  visitor: {
    AssignmentExpression(path) {
      if (isSchema(path.node)) {
        newast = path.node.right;
      }
    },
    MemberExpression(path) {
      if (path.node.object.name === "Test") {
        properties.push(path.node.property.name);
      }
    },
  },
};
const r = babel.transform(codeStr, {
  plugins: [arrowFnPlugin],
});

const transformedCode = generate(newast).code;
console.log("transformedCode", transformedCode);
console.log("propertiesproperties", properties);

const { code, stdout } = shell.exec('git show --pretty="" --name-only');

console.log("stdoutstdout", stdout);

const arr = stdout.split("\n");
console.log("arrarrarrarr", arr);
