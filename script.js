let data = [];

async function fetchData() {
    try {
        const response = await fetch('data.csv');
        const csvText = await response.text();
        console.log('CSV Text:', csvText); // Debugging line
        data = csvText.split('\n').slice(1).map(row => {
            const columns = row.split(',');
            return {
                name: columns[0].trim() || '',
                link: columns[1].trim() || '',
                tags: columns[2].trim() || '',
                actors: columns[3].trim() || '',
                director: columns[4].trim() || '',
                decade: columns[5].trim() || '',
                genre: columns[6].trim() || ''
            };
        });
        console.log('Parsed Data:', data); // Debugging line
    } catch (error) {
        console.error('Error fetching data:', error); // Debugging line
    }
}

function search() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    console.log('Search Query:', query); // Debugging line
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const filteredData = data.filter(item =>
        (item.name && item.name.toLowerCase().includes(query)) ||
        (item.tags && item.tags.toLowerCase().includes(query)) ||
        (item.actors && item.actors.toLowerCase().includes(query)) ||
        (item.director && item.director.toLowerCase().includes(query)) ||
        (item.decade && item.decade.toLowerCase().includes(query)) ||
        (item.genre && item.genre.toLowerCase().includes(query))
    );
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
