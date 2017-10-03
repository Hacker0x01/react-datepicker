if (process.env.DATE_BACKEND === 'date-fns') {
  module.exports = require('./date-fns')
} else {
  module.exports = require('./moment')
}
