
// Fiction and Nonfiction Lists
const fictionFoundation = [
    { title: "Matilda by Roald Dahl (840L)", completed: true },
    { title: "James and the Giant Peach by Roald Dahl (870L)", completed: true },
    { title: "The Twits by Roald Dahl (790L)", completed: true },
    { title: "Danny, the Champion of the World by Roald Dahl (770L)", completed: true },
    { title: "The Magic Misfits by Neil Patrick Harris (760L)", completed: true },
    { title: "Keeper of the Lost Cities by Shannon Messenger (670L-790L)", completed: true },
    { title: "Spy School by Stuart Gibbs (740L)", completed: true },
    { title: "Wings of Fire: The Dragonet Prophecy by Tui T. Sutherland (680L)", completed: true },
    { title: "Wonder by R.J. Palacio (790L)", completed: true },
    { title: "The Seventh Most Important Thing by Shelley Pearsall (760L)", completed: true }
];

const fictionGrowth = [
    { title: "Wildwood by Colin Meloy (890L)", completed: true },
    { title: "The Mysterious Benedict Society by Trenton Lee Stewart (890L)", completed: false },
    { title: "York: The Shadow Cipher by Laura Ruby (850L)", completed: false },
    { title: "Serafina and the Black Cloak by Robert Beatty (840L)", completed: false },
    { title: "Julie of the Wolves by Jean Craighead George (860L)", completed: true },
    { title: "Refugee by Alan Gratz (800L)", completed: true },
    { title: "Eldest by Christopher Paolini (850L)", completed: false },
    { title: "Brisingr by Christopher Paolini (930L)", completed: false },
    { title: "The Hunger Games by Suzanne Collins (810L)", completed: true },
    { title: "Catching Fire by Suzanne Collins (820L)", completed: true },
    { title: "Mockingjay by Suzanne Collins (800L)", completed: true },
    { title: "The Ballad of Songbirds and Snakes by Suzanne Collins (830L)", completed: true }
];

const fictionStretch = [
    { title: "The Egypt Game by Zilpha Keatley Snyder (1010L)", completed: true },
    { title: "Iron Widow by Xiran Jay Zhao (~1200L est.)", completed: false }
];

const nonfictionFoundation = [
    { title: "Greeking Out by National Geographic Kids (~900L)", completed: true },
    { title: "Unicorns, Myths, and Monsters by Linda S. Godfrey (~950L)", completed: true }
];

const nonfictionGrowth = [
    { title: "Mistakes That Worked by Charlotte Foltz Jones (1050L)", completed: false },
    { title: "Humble Pi: When Math Goes Wrong by Matt Parker (1260L)", completed: true },
    { title: "Love Triangle by Matt Parker (~1150L)", completed: false },
    { title: "It's Not Rocket Science by Ben Miller (~1250L)", completed: false }
];

const nonfictionStretch = [
    { title: "What If? by Randall Munroe (1300L)", completed: true },
    { title: "Spillover (Adapted YA Edition) by David Quammen (~1300L)", completed: false }
];

function populateList(sectionId, books) {
    const section = document.getElementById(sectionId);
    section.innerHTML = "";
    books.forEach((book, index) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = getSavedState(sectionId, index) ?? book.completed;
        checkbox.addEventListener('change', () => saveState(sectionId, index, checkbox.checked));
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(" " + book.title));

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

        li.appendChild(label);
        li.appendChild(thumbsContainer);

        const saved = getThumbState(sectionId, index);
        if (saved === 'up') up.style.backgroundColor = "#20b2aa";
        if (saved === 'down') down.style.backgroundColor = "#c71585";

        section.appendChild(li);
    });
}

function saveState(sectionId, index, checked) {
    const key = sectionId + '-' + index + '-read';
    localStorage.setItem(key, checked);
}

function getSavedState(sectionId, index) {
    const key = sectionId + '-' + index + '-read';
    const value = localStorage.getItem(key);
    return value === null ? null : value === "true";
}

function saveThumb(sectionId, index, direction) {
    const key = sectionId + '-' + index + '-thumb';
    localStorage.setItem(key, direction);
    populateList(sectionId, eval(sectionId.replace('-', '')));
}

function getThumbState(sectionId, index) {
    const key = sectionId + '-' + index + '-thumb';
    return localStorage.getItem(key);
}

function showSection(section) {
    document.getElementById('fiction').style.display = (section === 'fiction') ? 'block' : 'none';
    document.getElementById('nonfiction').style.display = (section === 'nonfiction') ? 'block' : 'none';
}

populateList('fiction-foundation', fictionFoundation);
populateList('fiction-growth', fictionGrowth);
populateList('fiction-stretch', fictionStretch);
populateList('nonfiction-foundation', nonfictionFoundation);
populateList('nonfiction-growth', nonfictionGrowth);
populateList('nonfiction-stretch', nonfictionStretch);
