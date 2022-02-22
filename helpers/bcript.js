const bcrypt = require('bcryptjs')

const encriptar = (pass) => {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(pass,salt)
    return hash
}

module.exports = encriptar