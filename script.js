let data = [];

async function fetchData() {
    const response = await fetch('data.csv');
    const csvText = await response.text();
    console.log('CSV Text:', csvText); // Debugging line
    data = csvText.split('\n').slice(1).map(row => {
        const columns = row.split(',');
        return {
            name: columns[0],
            link: columns[1],
            tags: columns[2],
            actors: columns[3],
            director: columns[4],
            decade: columns[5],
            genre: columns[6]
        };
    });
    console.log('Parsed Data:', data); // Debugging line
}

function search() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.tags.toLowerCase().includes(query) ||
        item.actors.toLowerCase().includes(query) ||
        item.director.toLowerCase().includes(query) ||
        item.decade.toLowerCase().includes(query) ||
        item.genre.toLowerCase().includes(query)
    );
    
    filteredData.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `<a href="${item.link}">${item.name}</a>`;
        resultsDiv.appendChild(resultItem);
    });
}

window.onload = fetchData;
