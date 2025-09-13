const handleErrors = (err) => {
    let errors = { email: '', password: '', name: '', dateofbirth: '' };
    if (err.code === 11000) {
        errors.email = 'That email is already registered';
        return errors;
    }
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    } else {
        errors.general = err.message;
    }

    return errors;
};

module.exports = handleErrors;
