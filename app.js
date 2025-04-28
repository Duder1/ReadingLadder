// Safe load and save for localStorage
function loadState(key, def) {
  try {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : def;
  } catch {
    return def;
  }
}

function saveState(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// Book Arrays
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

let fictionGrowth = [
  { title: "Wildwood", author: "Colin Meloy", lexile: 890, completed: true },
  { title: "The Mysterious Benedict Society", author: "Trenton Lee Stewart", lexile: 890, completed: false },
  { title: "The Hunger Games", author: "Suzanne Collins", lexile: 810, completed: true },
  { title: "Catching Fire", author: "Suzanne Collins", lexile: 820, completed: true },
  { title: "Mockingjay", author: "Suzanne Collins", lexile: 800, completed: true },
  { title: "The Ballad of Songbirds and Snakes", author: "Suzanne Collins", lexile: 860, completed: true },
  { title: "A Wrinkle in Time", author: "Madeleine L'Engle", lexile: 740, completed: true }
];

let fictionStretch = [
  { title: "The Egypt Game", author: "Zilpha Keatley Snyder", lexile: 1010, completed: true },
  { title: "Iron Widow", author: "Xiran Jay Zhao", lexile: 1200, completed: false }
];

let nonfictionFoundation = [
  { title: "Greeking Out", author: "National Geographic Kids", lexile: 900, completed: true },
  { title: "Unicorns, Myths, and Monsters", author: "Linda S. Godfrey", lexile: 950, completed: true }
];

let nonfictionGrowth = [
  { title: "Mistakes That Worked", author: "Charlotte Foltz Jones", lexile: 1050, completed: false },
  { title: "It's Not Rocket Science", author: "Ben Miller", lexile: 1250, completed: false },
  { title: "Love Triangle", author: "Matt Parker", lexile: 1150, completed: false },
  { title: "Humble Pi", author: "Matt Parker", lexile: 1260, completed: true }
];

let nonfictionStretch = [
  { title: "What If?", author: "Randall Munroe", lexile: 1300, completed: true },
  { title: "Freakonomics", author: "Steven D. Levitt & Stephen J. Dubner", lexile: 1240, completed: false },
  { title: "Spillover", author: "David Quammen", lexile: 1300, completed: false }
];

// Functions
function showSection(section) {
  document.getElementById('fiction').style.display = (section === 'fiction') ? 'block' : 'none';
  document.getElementById('nonfiction').style.display = (section === 'nonfiction') ? 'block' : 'none';
}

function populateList(sectionId, books) {
  const section = document.getElementById(sectionId);
  section.innerHTML = '';
  books.forEach((book, index) => {
    const li = document.createElement('li');

    const info = document.createElement('div');
    info.className = "book-info";

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = loadState(`${sectionId}-${index}-read`, book.completed || false);
    cb.onchange = () => saveState(`${sectionId}-${index}-read`, cb.checked);

    const titleSpan = document.createElement('span');
    titleSpan.className = 'book-title';
    titleSpan.textContent = book.title;

    const authorSpan = document.createElement('span');
    authorSpan.className = 'book-author';
    authorSpan.textContent = book.author;

    const lexileSpan = document.createElement('span');
    lexileSpan.className = 'book-lexile';
    lexileSpan.textContent = book.lexile;

    const thumbs = document.createElement('span');
    thumbs.className = 'thumbs';

    ['up', 'down'].forEach(direction => {
      const btn = document.createElement('button');
      btn.textContent = (direction === 'up') ? '👍' : '👎';
      btn.onclick = () => {
        saveState(`${sectionId}-${index}-thumb`, direction);
        renderAll();
      };
      if (loadState(`${sectionId}-${index}-thumb`, null) === direction) {
        btn.style.backgroundColor = (direction === 'up') ? '#20b2aa' : '#c71585';
      }
      thumbs.appendChild(btn);
    });

    info.append(cb, titleSpan, authorSpan, lexileSpan, thumbs);
    li.appendChild(info);
    section.appendChild(li);
  });
}

function renderAll() {
  populateList('fiction_foundation', fictionFoundation);
  populateList('fiction_growth', fictionGrowth);
  populateList('fiction_stretch', fictionStretch);
  populateList('nonfiction_foundation', nonfictionFoundation);
  populateList('nonfiction_growth', nonfictionGrowth);
  populateList('nonfiction_stretch', nonfictionStretch);
}

function sortSection(sectionId) {
  let books;
  if (sectionId === 'fiction_foundation') books = fictionFoundation;
  else if (sectionId === 'fiction_growth') books = fictionGrowth;
  else if (sectionId === 'fiction_stretch') books = fictionStretch;
  else if (sectionId === 'nonfiction_foundation') books = nonfictionFoundation;
  else if (sectionId === 'nonfiction_growth') books = nonfictionGrowth;
  else if (sectionId === 'nonfiction_stretch') books = nonfictionStretch;

  books.sort((a, b) => a.lexile - b.lexile);
  populateList(sectionId, books);
}

function addNewBook() {
  const title = document.getElementById('new-title').value.trim();
  const author = document.getElementById('new-author').value.trim();
  const lexile = parseInt(document.getElementById('new-lexile').value.trim(), 10);
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

  renderAll();
}

// Start by rendering everything
renderAll();
