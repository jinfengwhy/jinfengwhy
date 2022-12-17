const inquirer = require('inquirer')

function getEnquireInfo() {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'famework',
          message: 'Which frame do you want to choose?',
          choices: [
            'Vue', 
            {
              name: 'React',
              disabled: 'Unavailable at this time'
            }
          ],
        },
        {
          type: 'list',
          name: 'language',
          message: 'Which language do you want to choose?',
          choices: [
            'Javascript',
            {
              name: 'Typescript',
              disabled: 'Unavailable at this time'
            }
          ]
        },
      ])
      .then(resolve)
      .catch(reject)
  })
}

module.exports = getEnquireInfo
