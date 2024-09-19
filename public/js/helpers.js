function addEventToSearchBar() {
    document.getElementById('searchBar').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            window.open(`../pages/catalogo.html?search=${e.target.value}`, '_self');
        }
    })
};
function getCookie(name) {
    let value = (`; ${document.cookie}`);
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
function getQueryParams() {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = new URLSearchParams(url.search);
    return Object.fromEntries(params.entries());
}
export 
{
    addEventToSearchBar,
    getCookie,
    getQueryParams
};