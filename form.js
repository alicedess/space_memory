// Import des modules de validation
import { validateEmail } from "./validators/emailValidator.js";
import { validatePassword } from "./validators/passwordValidator.js";
import { validatePseudo } from './validators/pseudoValidator.js';
import { saveUser, getUsers } from './storage/storageLS.js';
import { checkConfirmPassword } from "./validators/passwordValidator.js";


// Target , Listening Form
const $memoryForm = document.getElementById('memoryForm')
// Vars user, errors
// stocker user
const user = {}
// Stocker les errors
let errors = []
// Clé d'enregistrement dans le Localstorage
const KEY_LOCALSTORAGE = "users"


// // Vérification force mot de passe 
// function checkPasswordStrength(motdepasse) {
//     // Initialize variables
//     var strength = 0;
//     var tips = "";
  
//     // Check password length
//     if (motdepasse.length < 8) {
//       tips += "Make the password longer. ";
//     } else {
//       strength += 1;
//     }
  
//     // Check for mixed case
//     if (motdepasse.match(/[a-z]/) && motdepasse.match(/[A-Z]/)) {
//       strength += 1;
//     } else {
//       tips += "Use both lowercase and uppercase letters. ";
//     }
  
//     // Check for numbers
//     if (motdepasse.match(/\d/)) {
//       strength += 1;
//     } else {
//       tips += "Include at least one number. ";
//     }
  
//     // Check for special characters
//     if (motdepasse.match(/[^a-zA-Z\d]/)) {
//       strength += 1;
//     } else {
//       tips += "Include at least one special character. ";
//     }
  
//     // Return results
//     if (strength < 2) {
//       return strengthElement.style.color = "red";
//     } else if (strength === 2) {
//       return strengthElement.style.color = "orange";
//     } else (strength === 3) {
//       return strengthElement.style.color = "green";
//     }
//   }





// mail, motdepasse, pseudonyme
$memoryForm.addEventListener('submit', (event) => {
    // Penser à vider les erreurs précédentes
    errors = []
    event.preventDefault()

    const $errorInputs = document.querySelectorAll('[id^=erreur-]')
    console.log($errorInputs);
    $errorInputs.forEach(error => error.innerHTML = '')

    // Block auto refresh
    // Target inputs
    // event.currentTarget = form
    const $inputs = event.currentTarget.querySelectorAll('input')
    // Parcours de != fields
    $inputs.forEach(input => {
      // Switch id's field
      switch (input.id) {
        case 'mail':
            // console.log('mail');
            // console.log('value : ',input.value);
            // Test
            if (!validateEmail(input.value)) {
                errors.push([input.id, "L'email est invalide"])
            } else {
                user.email = input.value
            }
            break;
        case 'motdepasse':
            if (!validatePassword(input.value)) {
                errors.push([input.id, "Le mot de passe est invalide"])
            } else {
                user.password = input.value
            }
            break;
        case 'motdepasseconf':
            if (!checkConfirmPassword(input.value)) {
                errors.push([input.id, "Le mot de ne correspond pas"])
            } else {
                user.passwordConf = input.value
            }
            break;
        case 'pseudonyme':
            if (!validatePseudo(input.value)) {
                errors.push([input.id, "Le nom d'utilisateur doit contenir au moins 4 caractères"])
            } else {
                user.pseudonyme = input.value
            }
            break;
        default:
            errors.push(['hack', "Dommage"])
            break;
      }  
    })
    // Test si j'ai comptabilisé des errors
    if (errors.length > 0) {
        // Si j'en je les affiche et je ne fais rien d'autre
        errors.map(error => {
            // Le champ div qui va afficher une erreur
            const $errorField = document.getElementById(`erreur-${error[0]}`)
            $errorField.innerHTML = error[1]
        })        
    } else {
        console.log('Compté créé avec succès');
        // Sinon
        // J'enregistre mon user dans le Localstorage
        saveUser(KEY_LOCALSTORAGE, user)
        const $msgSuccess = document.getElementById('message-success')
        $msgSuccess.innerHTML ="Votre compte a bien été créé !"

        setTimeout(() => {
            $msgSuccess.innerHTML = ''
        }, 5000);
    }
})