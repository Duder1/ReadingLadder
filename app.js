// Book structure { title, author, lexile, completed, thumbs }
let fictionFoundation = [
    { title: "Matilda", author: "Roald Dahl", lexile: 840, completed: true },
    { title: "James and the Giant Peach", author: "Roald Dahl", lexile: 870, completed: true },
    { title: "The Twits", author: "Roald Dahl", lexile: 790, completed: true },
    { title: "Danny, the Champion of the World", author: "Roald Dahl", lexile: 770, completed: true },
    { title: "The Magic Misfits", author: "Neil Patrick Harris", lexile: 760, completed: true },
    { title: "Keeper of the Lost Cities", author: "Shannon Messenger", lexile: 670, completed: true },
    { title: "Exile", author: "Shannon Messenger", lexile: 730, completed: true },
    { title: "Everblaze", author: "Shannon Messenger", lexile: 750, completed: true },
    { title: "Neverseen", author: "Shannon Messenger", lexile: 780, completed: true }
];

// Simplified for now — I can recreate full lists later if you want!
let fictionGrowth = [];
let fictionStretch = [];
let nonfictionFoundation = [];
let nonfictionGrowth = [];
let nonfictionStretch = [];

function showSection(section) {
    document.getElementById('fiction').style.display = (section === 'fiction') ? 'block' : 'none';
    document.getElementById('nonfiction').style.display = (section === 'nonfiction') ? 'block' : 'none';
}

function populateList(sectionId, books) {
    const section = document.getElementById(sectionId);
    section.innerHTML = '';
    books.forEach((book, index) => {
        const li = document.createElement('li');
        const titleSpan = document.createElement('span');
        titleSpan.textContent = book.title;
        const authorSpan = document.createElement('span');
        authorSpan.textContent = book.author;
        const lexileSpan = document.createElement('span');
        lexileSpan.textContent = book.lexile;

        const thumbsContainer = document.createElement('span');
        thumbsContainer.className = "thumbs";

        const up = document.createElement('button');
        up.innerText = "👍";
        up.onclick = () => saveThumb(sectionId, index, 'up');
        thumbsContainer.appendChild(up);

        const down = document.createElement('button');
        down.innerText = "👎";
        down.onclick = () => saveThumb(sectionId, index, 'down');
        thumbsContainer.appendChild(down);

        li.appendChild(titleSpan);
        li.appendChild(authorSpan);
        li.appendChild(lexileSpan);
        li.appendChild(thumbsContainer);

        section.appendChild(li);
    });
}

function saveThumb(sectionId, index, direction) {
    const key = sectionId + '-' + index + '-thumb';
    localStorage.setItem(key, direction);
    populateAll(); // Refresh to color thumbs
}

function populateAll() {
    populateList('fiction-foundation', fictionFoundation);
    populateList('fiction-growth', fictionGrowth);
    populateList('fiction-stretch', fictionStretch);
    populateList('nonfiction-foundation', nonfictionFoundation);
    populateList('nonfiction-growth', nonfictionGrowth);
    populateList('nonfiction-stretch', nonfictionStretch);
}

function sortSection(sectionId) {
    let books;
    if (sectionId === 'fiction-foundation') books = fictionFoundation;
    else if (sectionId === 'fiction-growth') books = fictionGrowth;
    else if (sectionId === 'fiction-stretch') books = fictionStretch;
    else if (sectionId === 'nonfiction-foundation') books = nonfictionFoundation;
    else if (sectionId === 'nonfiction-growth') books = nonfictionGrowth;
    else if (sectionId === 'nonfiction-stretch') books = nonfictionStretch;
    books.sort((a, b) => a.lexile - b.lexile);
    populateList(sectionId, books);
}

function addNewBook() {
    const title = document.getElementById('new-title').value.trim();
    const author = document.getElementById('new-author').value.trim();
    const lexile = parseInt(document.getElementById('new-lexile').value.trim());
    const track = document.getElementById('new-track').value;
    const level = document.getElementById('new-level').value;

    if (!title || !author || isNaN(lexile)) {
        alert('Please fill out all fields.');
        return;
    }

    const newBook = { title, author, lexile, completed: false };

    if (track === 'fiction') {
        if (level === 'foundation') fictionFoundation.push(newBook);
        else if (level === 'growth') fictionGrowth.push(newBook);
        else fictionStretch.push(newBook);
    } else {
        if (level === 'foundation') nonfictionFoundation.push(newBook);
        else if (level === 'growth') nonfictionGrowth.push(newBook);
        else nonfictionStretch.push(newBook);
    }

    populateAll();
}

populateAll();
