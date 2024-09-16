document.addEventListener('DOMContentLoaded', () => {
    const token = getCookie('ID')
    if(token)
        {
            window.open('../pages/landing.html', '_self');
        }
})

function getCookie(name) {
    let value = (`; ${document.cookie}`);
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
document.getElementById('signIn').addEventListener('submit', async function (e) {
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
    try {
        const response = await fetch(`https://microservicio-usuarios-three.vercel.app/api/users/register`,
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        if (!response.ok) {

            const data = await response.json()
            console.log(data);
        }
        else {
            alert('Usuario creado con exito!');
            window.open('../pages/landing.html', '_self');
        }
    }
    catch (error) {
        console.log('Error:', error);
    }
});
