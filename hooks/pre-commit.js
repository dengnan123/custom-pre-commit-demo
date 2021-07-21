const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const t = require("@babel/types");
const shell = require("shelljs");
const generate = require("@babel/generator").default;

const getCode = (codePath) => {
  return fs.readFileSync(codePath).toString();
};

const initWidgetProperties = ["actions", "displayName", "schema"];

const reg = /libs\/julia-widget\/src\/[a-z\/]*\/index.js/i;

const getcodePathAndwidgetNameList = () => {
  const { stdout } = shell.exec("git diff --name-only HEAD");
  return stdout
    .split("\n")
    .filter((v) => {
      return reg.test(v);
    })
    .map((v) => {
      const strArr = v.split("/");
      return {
        widgetName: strArr[strArr.length - 2],
        codePath: v,
      };
    });
};

const getSchemaAndWidgetProperties = (codeStr, widgetName) => {
  const isSchema = (node) => {
    return (
      node.left.property.name === "schema" &&
      node.left.object.name === widgetName
    );
  };
  let schemaAst;
  let properties = [];
  const arrowFnPlugin = {
    visitor: {
      AssignmentExpression(path) {
        if (isSchema(path.node)) {
          schemaAst = path.node.right;
        }
      },
      MemberExpression(path) {
        if (path.node.object.name === widgetName) {
          properties.push(path.node.property.name);
        }
      },
    },
  };
  babel.transform(codeStr, {
    plugins: [arrowFnPlugin],
  });
  const transformedCode = generate(schemaAst).code;
  return {
    widgetProperties: properties,
    widgetSchema: transformedCode,
  };
};

const checkWidgetProperties = (widgetProperties) => {
  return (
    JSON.stringify(widgetProperties) === JSON.stringify(initWidgetProperties)
  );
};

const checkWidgetSchema = (widgetSchema) => {
  return true;
};

const checkWidgetCode = async (list) => {
  const check = async ({ codePath, widgetName }) => {
    const codeStr = getCode(codePath);
    const { widgetProperties, widgetSchema } = getSchemaAndWidgetProperties(
      codeStr,
      widgetName
    );
    if (!checkWidgetProperties(widgetProperties)) {
      throw new Error(`${codePath} WidgetProperties error`);
    }
    if (!checkWidgetSchema(widgetSchema)) {
      throw new Error(`${codePath} WidgetSchema error`);
    }
  };

  await Promise.all(
    list.map((v) => {
      return check(v);
    })
  );
};

const dofunc = async () => {
  const list = getcodePathAndwidgetNameList();
  await checkWidgetCode(list);
};

dofunc();
