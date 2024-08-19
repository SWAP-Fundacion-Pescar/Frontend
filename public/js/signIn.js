document.getElementById('signIn').addEventListener('submit', async function(e)
{
    e.preventDefault();
    const username = document.getElementById('signIn__username').value;
    const email = document.getElementById('signIn__email').value;
    const name = document.getElementById('signIn__name').value;
    const lastName = document.getElementById('signIn__lastname').value;
    const password = document.getElementById('signIn__password').value;
    const city = document.getElementById('signIn__city').value;
    const body = 
    {
        username: username,
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        city: city
    };
    // TODO: 
    // Verificar que el usuario y mail esten disponibles-
    try
    {
        console.log("HEEEEEEEERE")
        const response = await fetch(`http://localhost:3000/api/users/register`, 
            {
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        if(!response.ok)
            {
                
                const data = await response.json()
                console.log(data);
            }
        else
        {
            alert('Usuario creado con exito!');
            window.open('../pages/landing.html', '_self');
        }                
    }
    catch(error)
    {
        console.log('Error:', error);
    }
});
