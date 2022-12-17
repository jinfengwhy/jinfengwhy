const path = require('path')
const { promisify } = require('util');
// https://www.npmjs.com/package/download-git-repo
// promisify将原有的callback方法调用转为支持promise方式调用
const download = promisify(require('download-git-repo'))
const open = require('open')

const getEnquireInfo = require('./inquirer')
const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile } = require('../utils/utils')

const createProjectAction = async (project, others) => {
  console.log(`why helps you create your project...`);
  try {
    // 0.向用户询问使用哪种框架（暂不支持）
    const enquireInfo = await getEnquireInfo()

    // 1.clone项目
    // 第一个参数表示仓库地址，第二个参数表示放置到哪个文件夹，第三个参数表示连同.git之类的文件夹也同样进行克隆
    await download(vueRepo, project, { clone: true })

    // 2.执行npm install
    // 如果是windows电脑执行npm.cmd命令，如果是mac电脑，直接执行npm命令
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm' 
    // https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processspawncommand-args-options
    // 第一个参数表示执行的命令名称，第二个参数表示执行命令的参数，第三个参数是一些配置选项
    await commandSpawn(command, ['install'], { cwd: `./${project}`})

    // 3.运行npm run dev
    // 这里之所以没有使用await进行修饰，是因为我们不希望该进程被阻塞
    commandSpawn(command, ['run', 'dev'], { cwd: `./${project}`})

    // 4.打开浏览器
    // 这里打开浏览器其实是在npm run dev并未执行完毕就打开的
    // 而npm run dev执行完毕后会通知浏览器进行热更新操作
    open('http://127.0.0.1:5173/')
  } catch(err) {
    console.log(`---err: `, err);
  }
}

const createComponentAction = async (name, dest) => {
  // 1. 要有对应的ejs模板 https://ejs.bootcss.com/
  // 2. 编译ejs模板生成字符串 result
  // 注意这里的模板文件名和我们之前写的templates目录下的文件名是匹配的
  const result = await compile('vue-component.ejs', { name, lowerName: name.toLowerCase()})

  // 3. 将result写入对应的.vue文件
  // 4. 放入对应的文件夹中
  const componentPath = path.resolve(dest, `${name}.vue`)
  writeToFile(componentPath, result)
}

module.exports = {
  createProjectAction,
  createComponentAction
}
