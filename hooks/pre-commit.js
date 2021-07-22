const fs = require('fs')
const babel = require('@babel/core')
const shell = require('shelljs')
const Ajv = require('ajv')
const generate = require('@babel/generator').default

const ajv = new Ajv()

const getCode = codePath => fs.readFileSync(codePath).toString()

const initWidgetProperties = ['actions', 'displayName', 'schema']

// eslint-disable-next-line no-useless-escape
const reg = /libs\/julia-widget\/src\/[a-z\/-]*\/index.tsx/i

const getcodePathAndwidgetNameList = () => {
  const { stdout } = shell.exec('git diff --name-only HEAD')
  return stdout
    .split('\n')
    .filter(v => reg.test(v) && fs.existsSync(v))
    .map(v => {
      const strArr = v.split('/')
      return {
        widgetName: strArr[strArr.length - 2],
        codePath: v,
      }
    })
}

const getSchemaAndWidgetProperties = ({ codeStr, widgetName, codePath }) => {
  const isSchema = node => node.left.property.name === 'schema' && node.left.object.name === widgetName
  let schemaAst
  let properties = []
  const arrowFnPlugin = {
    visitor: {
      AssignmentExpression(path) {
        if (isSchema(path.node)) {
          schemaAst = path.node.right
        }
      },
      MemberExpression(path) {
        if (path.node.object.name === widgetName) {
          properties.push(path.node.property.name)
        }
      },
    },
  }
  babel.transformFileSync(codePath, {
    plugins: [arrowFnPlugin],
    presets: ['@babel/typescript'],
    filename: codePath,
  })
  const transformedCode = generate(schemaAst).code
  console.log('transformedCodetransformedCode', transformedCode)
  return {
    widgetProperties: properties,
    widgetSchema: transformedCode,
  }
}

const checkWidgetProperties = widgetProperties =>
  JSON.stringify(widgetProperties) === JSON.stringify(initWidgetProperties)

const checkWidgetSchema = widgetSchema => {
  // eslint-disable-next-line no-eval
  const schema = eval(`(${widgetSchema})`)
  ajv.compile(schema)
  return true
}

const checkWidgetCode = list => {
  const check = ({ codePath, widgetName }) => {
    const codeStr = getCode(codePath)
    const { widgetProperties, widgetSchema } = getSchemaAndWidgetProperties({
      codeStr,
      widgetName,
      codePath,
    })
    // if (!checkWidgetProperties(widgetProperties)) {
    //   throw new Error(`${codePath} WidgetProperties error`)
    // }
    if (!checkWidgetSchema(widgetSchema)) {
      throw new Error(`${codePath} WidgetSchema error`)
    }
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const v of list) {
    check(v)
  }
}

try {
  const list = getcodePathAndwidgetNameList()
  checkWidgetCode(list)
} catch (e) {
  console.log(e.message)
  process.exit(1)
}
