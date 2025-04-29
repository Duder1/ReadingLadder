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

// Full Book Arrays with Cover Images
let fictionFoundation = [
  { title: "Matilda", author: "Roald Dahl", lexile: 840, completed: true, cover: "https://covers.openlibrary.org/b/id/8224152-M.jpg" },
  { title: "James and the Giant Peach", author: "Roald Dahl", lexile: 870, completed: true, cover: "https://covers.openlibrary.org/b/id/8771055-M.jpg" },
  { title: "The Twits", author: "Roald Dahl", lexile: 790, completed: true, cover: "https://covers.openlibrary.org/b/id/8762165-M.jpg" },
  { title: "Danny, the Champion of the World", author: "Roald Dahl", lexile: 770, completed: true, cover: "https://covers.openlibrary.org/b/id/8231998-M.jpg" },
  { title: "The Magic Misfits", author: "Neil Patrick Harris", lexile: 760, completed: true, cover: "https://covers.openlibrary.org/b/id/8593417-M.jpg" },
  { title: "Keeper of the Lost Cities", author: "Shannon Messenger", lexile: 670, completed: true, cover: "https://covers.openlibrary.org/b/id/8779250-M.jpg" },
  { title: "Exile", author: "Shannon Messenger", lexile: 730, completed: true, cover: "https://covers.openlibrary.org/b/id/8779251-M.jpg" },
  { title: "Everblaze", author: "Shannon Messenger", lexile: 750, completed: true, cover: "https://covers.openlibrary.org/b/id/8779252-M.jpg" },
  { title: "Neverseen", author: "Shannon Messenger", lexile: 780, completed: true, cover: "https://covers.openlibrary.org/b/id/8779253-M.jpg" }
];

let fictionGrowth = [
  { title: "Wildwood", author: "Colin Meloy", lexile: 890, completed: true, cover: "https://covers.openlibrary.org/b/id/7674514-M.jpg" },
  { title: "The Mysterious Benedict Society", author: "Trenton Lee Stewart", lexile: 890, completed: false, cover: "https://covers.openlibrary.org/b/id/8593533-M.jpg" },
  { title: "The Hunger Games", author: "Suzanne Collins", lexile: 810, completed: true, cover: "https://covers.openlibrary.org/b/id/6499096-M.jpg" },
  { title: "Catching Fire", author: "Suzanne Collins", lexile: 820, completed: true, cover: "https://covers.openlibrary.org/b/id/6499095-M.jpg" },
  { title: "Mockingjay", author: "Suzanne Collins", lexile: 800, completed: true, cover: "https://covers.openlibrary.org/b/id/6499094-M.jpg" },
  { title: "The Ballad of Songbirds and Snakes", author: "Suzanne Collins", lexile: 860, completed: true, cover: "https://covers.openlibrary.org/b/id/10274366-M.jpg" },
  { title: "A Wrinkle in Time", author: "Madeleine L'Engle", lexile: 740, completed: true, cover: "https://covers.openlibrary.org/b/id/8306661-M.jpg" }
];

let fictionStretch = [
  { title: "The Egypt Game", author: "Zilpha Keatley Snyder", lexile: 1010, completed: true, cover: "https://covers.openlibrary.org/b/id/8235443-M.jpg" },
  { title: "Iron Widow", author: "Xiran Jay Zhao", lexile: 1200, completed: false, cover: "https://covers.openlibrary.org/b/id/12664936-M.jpg" }
];

let nonfictionFoundation = [
  { title: "Greeking Out", author: "National Geographic Kids", lexile: 900, completed: true, cover: "https://covers.openlibrary.org/b/id/11286241-M.jpg" },
  { title: "Unicorns, Myths, and Monsters", author: "Linda S. Godfrey", lexile: 950, completed: true, cover: "https://covers.openlibrary.org/b/id/11626810-M.jpg" }
];

let nonfictionGrowth = [
  { title: "Mistakes That Worked", author: "Charlotte Foltz Jones", lexile: 1050, completed: false, cover: "https://covers.openlibrary.org/b/id/8319298-M.jpg" },
  { title: "It's Not Rocket Science", author: "Ben Miller", lexile: 1250, completed: false, cover: "https://covers.openlibrary.org/b/id/10765821-M.jpg" },
  { title: "Love Triangle", author: "Matt Parker", lexile: 1150, completed: false, cover: "https://covers.openlibrary.org/b/id/9352167-M.jpg" },
  { title: "Humble Pi", author: "Matt Parker", lexile: 1260, completed: true, cover: "https://covers.openlibrary.org/b/id/9352168-M.jpg" }
];

let nonfictionStretch = [
  { title: "What If?", author: "Randall Munroe", lexile: 1300, completed: true, cover: "https://covers.openlibrary.org/b/id/8225635-M.jpg" },
  { title: "Freakonomics", author: "Steven D. Levitt & Stephen J. Dubner", lexile: 1240, completed: false, cover: "https://covers.openlibrary.org/b/id/8156044-M.jpg" },
  { title: "Spillover", author: "David Quammen", lexile: 1300, completed: false, cover: "https://covers.openlibrary.org/b/id/8231354-M.jpg" }
];

// Render and Add Functions
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

    const coverImg = document.createElement('img');
    coverImg.style.width = '40px';
    coverImg.style.height = '60px';
    coverImg.style.objectFit = 'cover';
    coverImg.style.marginRight = '10px';
    if (book.cover) {
      coverImg.src = book.cover;
    } else {
      coverImg.style.display = 'none';
    }

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

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.onclick = () => {
      books.splice(index, 1);
      renderAll();
    };

    info.append(cb, coverImg, titleSpan, authorSpan, lexileSpan, thumbs, deleteBtn);
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

async function addNewBook() {
  const titleInput = document.getElementById('new-title').value.trim();
  const authorInput = document.getElementById('new-author').value.trim();
  const lexileInput = parseInt(document.getElementById('new-lexile').value.trim(), 10);
  const track = document.getElementById('new-track').value;
  const level = document.getElementById('new-level').value;

  if (!titleInput || !authorInput || isNaN(lexileInput)) {
    alert('Please fill out all fields.');
    return;
  }

  let realTitle = titleInput;
  let realAuthor = authorInput;
  let coverImageUrl = null;

  try {
    const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(titleInput)}`);
    const data = await response.json();
    if (data.docs && data.docs.length > 0) {
      // Search for the best match
      let bestMatch = null;
      const normalizedInputTitle = titleInput.toLowerCase();
      const normalizedInputAuthor = authorInput.toLowerCase();

      for (const book of data.docs.slice(0, 10)) { // check first 10 results
        const normalizedBookTitle = (book.title || "").toLowerCase();
        const normalizedBookAuthor = (book.author_name && book.author_name.length > 0) ? book.author_name[0].toLowerCase() : "";

        if (normalizedBookTitle === normalizedInputTitle) {
          if (normalizedBookAuthor.includes(normalizedInputAuthor) || normalizedInputAuthor.includes(normalizedBookAuthor)) {
            bestMatch = book;
            break;
          }
        }
      }

      if (!bestMatch) {
        bestMatch = data.docs[0]; // fallback to first if no perfect match
      }

      realTitle = bestMatch.title || titleInput;
      realAuthor = (bestMatch.author_name && bestMatch.author_name.length > 0) ? bestMatch.author_name[0] : authorInput;
      if (bestMatch.cover_i) {
        coverImageUrl = `https://covers.openlibrary.org/b/id/${bestMatch.cover_i}-M.jpg`;
      }
    }
  } catch (error) {
    console.error('Open Library lookup failed:', error);
    // Fallback to typed values
  }

  const newBook = { 
    title: realTitle, 
    author: realAuthor, 
    lexile: lexileInput, 
    completed: false,
    cover: coverImageUrl
  };

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

// Start rendering
renderAll();
