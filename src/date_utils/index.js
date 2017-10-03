if (process.env.DATE_BACKEND === 'date-fns') {
  console.log('Using date backend: date-fns')
  module.exports = require('./date-fns')
} else {
  console.log('Using date backend: moment')
  module.exports = require('./moment')
}
