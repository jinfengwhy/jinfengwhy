const program = require('commander')

const { createProjectAction, createComponentAction } = require('./actions')

const createCommands = () => {
  program
    // command方法用以指定命令 <>项目名称 []可变参数
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    // action方法接收一个回调方法，该回调方法接收的参数是我们上面指定的project和others可变参数
    .action(createProjectAction)

  program
    .command('addcomponent <name>')
    .description('add a new vue component file')
    .action(name => {
      // program.opts().dest 表示我们之前在入口文件定义的-dest选项
      // 若没有传递，则使用默认值src/components
      createComponentAction(name, program.opts().dest || 'src/components')
    })
}

module.exports = createCommands
