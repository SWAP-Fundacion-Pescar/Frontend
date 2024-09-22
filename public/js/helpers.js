function addEventToSearchBar() {
    document.getElementById('searchBar').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            window.open(`../pages/catalogo.html?search=${e.target.value}`, '_self');
        }
    })
}

async function addClothe() {
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const expectedCategory = document.getElementById('expectedCategory').value;
    const size = document.getElementById('size').value;
    const expectedSize = document.getElementById('expectedSize').value;
    const gender = document.getElementById('gender').value;
    const expectedGender = document.getElementById('expectedGender').value;
    const description = document.getElementById('description').value;
    const color = document.getElementById('color').value;
    const expectedColor = document.getElementById('expectedColor').value;
    const media = document.getElementById('file').files[0];
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('expectedCategory', expectedCategory);
    formData.append('size', size);
    formData.append('expectedSize', expectedSize);
    formData.append('gender', gender);
    formData.append('expectedGender', expectedGender);
    formData.append('description', description);
    formData.append('color', color);
    formData.append('expectedColor', expectedColor);
    formData.append('media', media);
    try {
        const response = await fetch(`https://microservicio-prendas.vercel.app/api/clothes`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`
            },
            body: formData,
        })
        if (!response) console.log('Error')
        // const result = await response.json();
        // console.log(result);
        window.location.reload();
    }
    catch (error) {
        console.error('Error:', error)
    }
}



export 
{
    addEventToSearchBar, addClothe
};