// Utility to save/load localStorage state
const saveState = (key, val) => localStorage.setItem(key, JSON.stringify(val));
const loadState = (key, def) => {
  const v = localStorage.getItem(key);
  return v===null ? def : JSON.parse(v);
};

// Initial book arrays (full lists here)
let fictionFoundation = [
  { title:"Matilda", author:"Roald Dahl", lexile:840, completed:true, thumb:loadState("fiction-foundation-0-thumb",null) },
  { title:"James and the Giant Peach", author:"Roald Dahl", lexile:870, completed:true, thumb:loadState("fiction-foundation-1-thumb",null) },
  { title:"The Twits", author:"Roald Dahl", lexile:790, completed:true, thumb:loadState("fiction-foundation-2-thumb",null) },
  { title:"Danny, the Champion of the World", author:"Roald Dahl", lexile:770, completed:true, thumb:loadState("fiction-foundation-3-thumb",null) },
  { title:"The Magic Misfits", author:"Neil Patrick Harris", lexile:760, completed:true, thumb:loadState("fiction-foundation-4-thumb",null) },
  // Keeper of the Lost Cities series split:
  { title:"Keeper of the Lost Cities", author:"Shannon Messenger", lexile:670, thumb:loadState("fiction-foundation-5-thumb",null) },
  { title:"Exile", author:"Shannon Messenger", lexile:730, thumb:loadState("fiction-foundation-6-thumb",null) },
  { title:"Everblaze", author:"Shannon Messenger", lexile:750, thumb:loadState("fiction-foundation-7-thumb",null) },
  { title:"Neverseen", author:"Shannon Messenger", lexile:780, thumb:loadState("fiction-foundation-8-thumb",null) },
  { title:"Lodestar", author:"Shannon Messenger", lexile:800, thumb:loadState("fiction-foundation-9-thumb",null) },
  { title:"Nightfall", author:"Shannon Messenger", lexile:820, thumb:loadState("fiction-foundation-10-thumb",null) },
  { title:"Flashback", author:"Shannon Messenger", lexile:840, thumb:loadState("fiction-foundation-11-thumb",null) },
  { title:"Legacy", author:"Shannon Messenger", lexile:860, thumb:loadState("fiction-foundation-12-thumb",null) },
  { title:"Stellarlune", author:"Shannon Messenger", lexile:880, thumb:loadState("fiction-foundation-13-thumb",null) }
];

let fictionGrowth = [
  { title:"Wildwood", author:"Colin Meloy", lexile:890, completed:true, thumb:loadState("fiction-growth-0-thumb",null) },
  { title:"The Mysterious Benedict Society", author:"Trenton Lee Stewart", lexile:890, thumb:loadState("fiction-growth-1-thumb",null) },
  // (…and so on for all Growth books…)
];

let fictionStretch = [
  { title:"The Egypt Game", author:"Zilpha Keatley Snyder", lexile:1010, completed:true, thumb:loadState("fiction-stretch-0-thumb",null) },
  { title:"Iron Widow", author:"Xiran Jay Zhao", lexile:1200, thumb:loadState("fiction-stretch-1-thumb",null) }
];

let nonfictionFoundation = [
  { title:"Greeking Out", author:"National Geographic Kids", lexile:900, completed:true, thumb:loadState("nonfiction-foundation-0-thumb",null) },
  { title:"Unicorns, Myths, and Monsters", author:"Linda S. Godfrey", lexile:950, completed:true, thumb:loadState("nonfiction-foundation-1-thumb",null) }
];

let nonfictionGrowth = [
  { title:"Mistakes That Worked", author:"Charlotte Foltz Jones", lexile:1050, thumb:loadState("nonfiction-growth-0-thumb",null) },
  { title:"Humble Pi", author:"Matt Parker", lexile:1260, completed:true, thumb:loadState("nonfiction-growth-1-thumb",null) },
  { title:"Love Triangle", author:"Matt Parker", lexile:1150, thumb:loadState("nonfiction-growth-2-thumb",null) },
  { title:"It's Not Rocket Science", author:"Ben Miller", lexile:1250, thumb:loadState("nonfiction-growth-3-thumb",null) }
];

let nonfictionStretch = [
  { title:"What If?", author:"Randall Munroe", lexile:1300, completed:true, thumb:loadState("nonfiction-stretch-0-thumb",null) },
  { title:"Spillover", author:"David Quammen", lexile:1300, thumb:loadState("nonfiction-stretch-1-thumb",null) },
  { title:"Freakonomics", author:"Steven D. Levitt & Stephen J. Dubner", lexile:1240, thumb:loadState("nonfiction-stretch-2-thumb",null) }
];

// Render functions
function showSection(sec) {
  document.getElementById('fiction').style.display   = sec==='fiction' ? 'block' : 'none';
  document.getElementById('nonfiction').style.display= sec==='nonfiction'? 'block':'none';
}

function populateList(id, arr) {
  const ul = document.getElementById(id);
  ul.innerHTML = '';
  arr.forEach((b,i) => {
    const li = document.createElement('li');
    const cb = document.createElement('input');
        cb.type='checkbox';
        cb.checked = loadState(id+'-'+i+'-read', b.completed||false);
        cb.onchange=()=>saveState(id+'-'+i+'-read', cb.checked);
    const title = document.createElement('span'); title.className='book-title'; title.textContent=b.title;
    const author= document.createElement('span'); author.className='book-author';author.textContent=b.author;
    const lexile= document.createElement('span'); lexile.className='book-lexile';lexile.textContent=b.lexile;
    const thumbs = document.createElement('span'); thumbs.className='thumbs';
    ['up','down'].forEach(dir => {
      const btn=document.createElement('button');
      btn.innerText= dir==='up'?'👍':'👎';
      btn.onclick =()=>{ saveState(id+'-'+i+'-thumb',dir); renderAll(); };
      if(loadState(id+'-'+i+'-thumb',null)===dir) btn.style.backgroundColor = dir==='up'? '#20b2aa':'#c71585';
      thumbs.appendChild(btn);
    });
    const info = document.createElement('div'); info.className='book-info';
    info.append(cb,title,author,lexile,thumbs);
    li.appendChild(info);
    ul.appendChild(li);
  });
}

function renderAll(){
  ['fiction-foundation','fiction-growth','fiction-stretch',
   'nonfiction-foundation','nonfiction-growth','nonfiction-stretch']
    .forEach(id => populateList(id, eval(id.replace('-', '_'))));
}

function sortSection(id) {
  const arr = eval(id.replace('-', '_'));
  arr.sort((a,b)=>a.lexile-b.lexile);
  populateList(id, arr);
}

function addNewBook(){
  const t=document.getElementById('new-title').value.trim(),
        a=document.getElementById('new-author').value.trim(),
        l=parseInt(document.getElementById('new-lexile').value,10),
        tr=document.getElementById('new-track').value,
        lv=document.getElementById('new-level').value;
  if(!t||!a||isNaN(l)){ alert('Fill all fields');return; }
  const nb={title:t,author:a,lexile:l,completed:false, thumb:null};
  const arrName = `${tr}-${lv}`.replace('-','');
  eval(arrName).push(nb);
  renderAll();
}

renderAll();