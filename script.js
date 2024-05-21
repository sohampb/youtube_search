let data = [];
let uniqueDecades = new Set();
let uniqueTagsGenres = new Set();

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
                    genre: row['Genre'] ? row['Genre'].trim() : '',
                    similarStuff: row['Similar Stuff'] ? row['Similar Stuff'].trim() : ''
                }));
                console.log('Parsed Data:', data); // Debugging line
                populateDropdowns();
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error); // Debugging line
    }
}

function populateDropdowns() {
    data.forEach(item => {
        if (item.decade) {
            uniqueDecades.add(item.decade);
        }
        if (item.tags) {
            item.tags.split(',').forEach(tag => uniqueTagsGenres.add(tag.trim()));
        }
        if (item.genre) {
            uniqueTagsGenres.add(item.genre);
        }
    });

    const decadeSelect = document.getElementById('decade');
    uniqueDecades.forEach(decade => {
        const option = document.createElement('option');
        option.value = decade;
        option.textContent = decade;
        decadeSelect.appendChild(option);
    });

    const tagGenreSelect = document.getElementById('tagGenre');
    uniqueTagsGenres.forEach(tagGenre => {
        const option = document.createElement('option');
        option.value = tagGenre;
        option.textContent = tagGenre;
        tagGenreSelect.appendChild(option);
    });
}

function search() {
    const decade = document.getElementById('decade').value.toLowerCase().trim();
    const actor = document.getElementById('actor').value.toLowerCase().trim();
    const director = document.getElementById('director').value.toLowerCase().trim();
    const tagGenre = document.getElementById('tagGenre').value.toLowerCase().trim();
    const similarStuff = document.getElementById('similarStuff').value.toLowerCase().trim();

    console.log('Search Query:', { decade, actor, director, tagGenre, similarStuff }); // Debugging line
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const filteredData = data.filter(item => {
        const matchDecade = !decade || (item.decade && item.decade.toLowerCase() === decade);
        const matchActor = !actor || (item.actors && item.actors.toLowerCase().includes(actor));
        const matchDirector = !director || (item.director && item.director.toLowerCase().includes(director));
        const matchTagGenre = !tagGenre || (item.tags && item.tags.toLowerCase().includes(tagGenre)) || (item.genre && item.genre.toLowerCase().includes(tagGenre));
        const matchSimilarStuff = !similarStuff || (item.similarStuff && item.similarStuff.toLowerCase().includes(similarStuff));

        return matchDecade && matchActor && matchDirector && matchTagGenre && matchSimilarStuff;
    });

    console.log('Filtered Data:', filteredData); // Debugging line

    if (filteredData.length === 0) {
        resultsDiv.innerHTML = '<p>No results found</p>';
    } else {
     
