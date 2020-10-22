const init = () => {
    const form = document.getElementById("super_user");
    if (form){
        form.addEventListener('submit', handleSubmitSuperUser);
    }
    const pseudo = document.getElementById("pseudo");
    const password = document.getElementById("password");
}

const handleSubmitSuperUser = (ev) => {
    ev.preventDefault();
    const data = {
        pseudo: pseudo.value,
        password: password.value
    }
    if (window.fetch) {
        var myHeaders = new Headers();
        var myInit = { method: 'POST',
               headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
               },
               body:JSON.stringify(data)
            };
        fetch('/create_super_user/',myInit).then((response)=>{
            location = location;
        })
    }
}


window.addEventListener('load', init);