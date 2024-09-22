const btn = document.getElementById('get');

btn.addEventListener('click', async function()
{
    const response = await fetch('https://microservicio-prendas.vercel.app/api/clothes')
    if(!response.ok)
        {
            alert("Ha fallado");
        }
    const data = await response.json();
    console.log(data);
    createBoxes(data);
})

function createBoxes(data)
{
    const body = document.body;
    data.forEach(clothe => {
        const box = document.createElement('div');
        const img = document.createElement('img');
        img.src = clothe.media[0].url;
        console.log(clothe.media[0].url)
        box.appendChild(img);
        body.appendChild(box);
    });
}