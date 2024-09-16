document.getElementById('login').addEventListener('submit', async function(e)
{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const body = 
    {
        email: email,
        password: password
    };
    try
    {
        const response = await fetch(`https://microservicio-usuarios-three.vercel.app/api/users/login`, 
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
                if(response.status == 401)
                    {
                        document.querySelector('.unauthorized').style.display = 'block';
                    }
                const data = await response.json()
                console.log(data);
            }
        else
        {
            const data = await response.json();
            document.cookie = `token = ${data.token}`;
            document.cookie = `ID = ${data.userId}`
            console.log(data);
            window.open('../pages/landing.html', '_self');
        }                
    }
    catch(error)
    {
        console.log('Error:', error);
    }
});
