// https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processspawncommand-args-options
const { exec, spawn } = require('child_process')

const commandSpawn = (...args) => {
  return new Promise(resolve => {
    // spawn用以执行终端命令
    const childProcess = spawn(...args)
    // 将childProcess进程中的控制台输出转移到process进程中
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    // 执行完毕后，告诉调用方
    childProcess.on('close', resolve)
  })
}

module.exports = {
  commandSpawn
}
