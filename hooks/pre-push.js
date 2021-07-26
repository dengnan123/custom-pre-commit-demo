const fs = require("fs");
const babel = require("@babel/core");
const shell = require("shelljs");
const Ajv = require("ajv");
const generate = require("@babel/generator").default;
import {
  JSONSchema4,
  JSONSchema4Type,
  JSONSchema4TypeName,
  JSONSchema6,
  JSONSchema6Type,
  JSONSchema6TypeName,
  JSONSchema7,
  JSONSchema7Array,
  JSONSchema7Type,
  JSONSchema7TypeName,
  JSONSchema6Definition,
  JSONSchema7Definition,
  validate,
  mustBeValid,
  checkPropertyChange,
} from "json-schema";

const ajv = new Ajv();

const getCode = (codePath) => fs.readFileSync(codePath).toString();

let schemaAst;
const arrowFnPlugin = {
  visitor: {
    AssignmentExpression(path) {
      if (isSchema(path.node)) {
        schemaAst = path.node.right;
      }
    },
    // MemberExpression(path) {
    //   if (path.node.object.name === widgetName) {
    //     console.log('path.nodepath.node',path.node)
    //     properties.push(path.node.property.name)
    //   }
    // },
    MemberExpression(path) {
      console.log("path.nodepath.node", path.node);
      // if (path.node.object.name === widgetName) {

      //   properties.push(path.node.property.name)
      // }
    },
  },
};
babel.transformFileSync("json-schema-tests.ts", {
  plugins: [arrowFnPlugin],
  presets: ["@babel/typescript"],
  filename: "json-schema-tests.ts",
});
const transformedCode = generate(schemaAst).code;
