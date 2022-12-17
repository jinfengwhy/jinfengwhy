const program = require('commander')

const helpOptions = () => {
  // 增加自己的option
  program.option('-W, --why', 'a simple test cli')
  // 通过箭头包裹来指定参数的名称（-D和--dest都可以用来指定参数）
  program.option('-D, --dest <dest>', 'a destination folder 例如: src/compoents')

  // 通过事件监听某个指令
  program.on('--help', function() {
    console.log(''); 
    console.log(`Other:`);
    console.log(`  other options~`);
  })
}

module.exports = helpOptions
