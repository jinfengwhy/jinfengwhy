const path = require('path')
const fs = require('fs')

const ejs = require('ejs')

// 该方法用来编译一个ejs模板，将结果进行返回
const compile = (templateName, data) => {
  // 相对路径
  const templatePositon = `../templates/${templateName}`
  // __dirname + 相对路径 即可得出绝对路径
  const templatePath = path.resolve(__dirname, templatePositon)

  return new Promise((resolve, reject) => {
    // https://www.npmjs.com/package/ejs Basic Usage
    // 第一个参数表示文件路径，需要使用绝对路径
    // 第二个参数表示ejs模板中需要使用到的数据，
    // 如果直接写成data（如下），那么在模板内则需要直接通过name或lowerName来访问
    // ejs.renderFile(templatePath, data, {}, (err, result) => {})
    // 第三个参数表示options一些配置选项，第四个参数是结果回调，err表错误信息，result表结果
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log(`---err: `, err);
        reject(err)
        return;
      }
      resolve(result)
    })
  })
}

// 写内容到文件
const writeToFile = (filePath, content) => {
  // 文件目录不存在时，递归创建目录
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  return fs.promises.writeFile(filePath, content)
}

module.exports = {
  compile,
  writeToFile
}
