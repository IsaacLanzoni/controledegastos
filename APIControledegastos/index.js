

function onChangeEmail()
{
    toggleButtonsDisable();
    toggleEmailErrors();
    
}

function onChangePassword(){
    toggleButtonsDisable();
    togglePasswordErrors();
}

function login(){
        showLoading();
        firebase.auth().signInWithEmailAndPassword(
            form.email().value, form.password().value
        ).then(response => {
            hideLoading();
            window.location.href = "pages/home/home.html";
        }).catch(error => {
            hideLoading();
            alert(getErrorMessage(error.code));
        });

function getErrorMessage(error) {
    if(error.alert == "undefined"){
        return "Usuário Inválido";
    }
    else
    {
        return "Email ou senha inválidos, tente novamente." ;
    }
}

}

function register(){
    window.location.href = "pages/register/register.html"
}

function recoverPassword(){
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading();
        alert('Email enviado com sucesso, caso não tenha chegado ao destino corretamente, verifique novamente.');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function isemailvalid()
{
    const email = form.email().value;
    if(!email){
        return false;
    }
    return validateemail(email);


}

function toggleEmailErrors(){
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateemail(email) ? "none" : "block";
}

function togglePasswordErrors(){
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block"
}

function toggleButtonsDisable(){
    
    const emailvalid = isemailvalid();
    form.recoverPasswordButton().disabled = !emailvalid;

    const passwordvalid = ispasswordvalid();
    form.loginButton().disabled = !emailvalid || !passwordvalid;
}

function ispasswordvalid(){
    const password = form.password().value;
    if (!password){
        return false;
    }
    return true;
}

const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    loginButton: () => document.getElementById('login-button'),
    recoverPasswordButton: () => document.getElementById('recover-password-button'),
}

firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        window.location.href = "pages/home/home.html";
    }
})
