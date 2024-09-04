async function cadastrar(event) {
    event.preventDefault():

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const data = {name,email,senha}

    const response = await fetch('http:/localhost:3000/usuario/cadastrar', {
        method: "POST",
        headers: {
            "Content-type":"application/json"
        }, 
        body: JSON.stringify(data)
    }) 

    const results = await response.json();

    if(results.sucess) {
        alert(results.message)
    } else {}
    alert(alert.message)
    }
}