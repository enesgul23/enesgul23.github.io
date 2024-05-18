document.addEventListener('DOMContentLoaded', function () {
    const publicationsList = document.getElementById('publications-list');

    fetch('assets/publications.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(pub => {
                const li = document.createElement('li');
                li.textContent = `${pub["Yayın İsmi"]} - ${pub["Dergi İsmi"]}, ${pub["Tarih"]}`;
                publicationsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching publications:', error);
        });
});
