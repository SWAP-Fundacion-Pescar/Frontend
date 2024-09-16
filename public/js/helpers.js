function addEventToSearchBar() {
    document.getElementById('searchBar').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            window.open(`../pages/catalogo.html?search=${e.target.value}`, '_self');
        }
    })
}

export 
{
    addEventToSearchBar
};