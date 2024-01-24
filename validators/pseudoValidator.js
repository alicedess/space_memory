function validatePseudo(pseudonyme) {
    const PseudoPattern = pseudonyme.length >= 3
    return PseudoPattern
}

export { validatePseudo }
function checkConfirmPassword(passwordConf) {
    const confPasswordPattern = (password == passwordConf)
    return confPasswordPattern(passwordConf)
}
