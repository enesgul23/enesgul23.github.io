document.addEventListener('DOMContentLoaded', function () {
    const publicationsList = document.getElementById('publications-list');

    fetch('assets/publications.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('The JSON data is not an array');
            }
            data.forEach(pub => {
                const li = document.createElement('li');
                const title = document.createElement('p');
                title.textContent = `${pub["Yayın İsmi"]} - ${pub["Dergi İsmi"]}, ${pub["Tarih"]}`;
                title.classList.add('title');
                
                li.appendChild(title);

                if (pub["Özet"]) {
                    const abstract = document.createElement('p');
                    abstract.textContent = pub["Özet"];
                    abstract.classList.add('abstract');
                    li.appendChild(abstract);
                }

                if (pub["GitHub"]) {
                    const githubLink = document.createElement('a');
                    githubLink.href = pub["GitHub"];
                    githubLink.target = "_blank";
                    githubLink.classList.add('github-link');

                    const githubIcon = document.createElement('img');
                    githubIcon.src = 'assets/github-icon.png';
                    githubIcon.alt = 'GitHub Repo';
                    githubIcon.classList.add('github-icon');

                    githubLink.appendChild(githubIcon);
                    li.appendChild(githubLink);
                }

                publicationsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching publications:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'There was an error loading the publications. Please try again later.';
            publicationsList.appendChild(errorMessage);
        });
});
