const validator = require('validator')

const validateSignUpData = (req) => {
    const { permalink, userName, userPassword, userEmail, enabled } = req.body
    if (!userName || userName.length < 3 || userName.length > 20) {
        throw new Error('User Name must be between 3 to 20 characters')
    }

    if (!userEmail || !validator.isEmail(userEmail)) {
        throw new Error('Enter a valid email')
    }

    // if (!userPassword || !validator.isStrongPassword(userPassword)) {
    //     throw new Error('Enter a strong password (min 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)')
    // }

    if (permalink && !validator.isURL(permalink)) {
        throw new Error('Enter a valid permaLink URL')
    }
    if (enabled !== undefined && typeof enabled !== 'boolean') {
        throw new Error('Enabled must be a boolean value')
    }
}

module.exports = {
    validateSignUpData
}