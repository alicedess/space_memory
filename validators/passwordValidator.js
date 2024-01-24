function validatePassword() {
    const passwordPattern = /^(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&!*])[A-Za-z\d@#$%^&!*]{6,}$/
    return passwordPattern.test(motdepasse.value)
}

export { validatePassword }



function checkConfirmPassword() {
    return motdepasse.value === motdepasseconf.value;
}

export { checkConfirmPassword }