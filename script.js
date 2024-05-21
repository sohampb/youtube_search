let data = [];

async function fetchData() {
    try {
        const response = await fetch('data.csv');
        const csvText = await response.text();
        console.log('CSV Text:', csvText); // Debugging line

        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                data = results.data.map(row => ({
                    name: row['Name'] ? row['Name'].trim() : '',
                    link: row['Link'] ? row['Link'].trim() : '',
                    tags: row['Tags'] ? row['Tags'].trim() : '',
                    actors: row['Actors'] ? row['Actors'].trim() : '',
                    director: row['Director'] ? row['Director'].trim() : '',
                    decade: row['Decade'] ? row['Decade'].trim() : '',
                    genre: row['Genre'] ? row['Genre'].trim() : ''
                }));
                console.log('Parsed Data:', data); // Debugging line
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error); // Debugging line
    }
}

function search() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    console.log('Search Query:', query); // Debugging line
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const filteredData = data.filter(item => {
        const match = 
            (item.name && item.name.toLowerCase().includes(query)) ||
            (item.tags && item.tags.toLowerCase().includes(query)) ||
            (item.actors && item.actors.toLowerCase().includes(query)) ||
            (item.director && item.director.toLowerCase().includes(query)) ||
            (item.decade && item.decade.toLowerCase().includes(query)) ||
            (item.genre && item.genre.toLowerCase().includes(query));
        console.log('Item:', item, 'Match:', match); // Debugging line
        return match;
    });

    console.log('Filtered Data:', filteredData); // Debugging line

    if (filteredData.length === 0) {
        resultsDiv.innerHTML = '<p>No results found</p>';
    } else {
        filteredData.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `<a href="${item.link}">${item.name}</a>`;
            resultsDiv.appendChild(resultItem);
        });
    }
}

window.onload = fetchData;
