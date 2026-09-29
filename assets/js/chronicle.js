
/* ══ GALAXY PARALLAX STARS ══ */
(function(){
  const layers=[
    {id:'stars-far',count:320,minSz:.5,maxSz:1.2,speed:.008,col:['#fff','#e8e0ff','#ffe8e0']},
    {id:'stars-mid',count:180,minSz:.8,maxSz:1.8,speed:.018,col:['#fff','#ffd580','#80d4ff','#ff9999']},
    {id:'stars-near',count:80,minSz:1.2,maxSz:2.8,speed:.035,col:['#fff','#ffe0a0','#a0e8ff']},
  ];
  layers.forEach(({id,count,minSz,maxSz,speed,col})=>{
    const el=document.getElementById(id);
    const stars=[];
    for(let i=0;i<count;i++){
      const s=document.createElement('div');
      const sz=minSz+Math.random()*(maxSz-minSz);
      const c=col[Math.floor(Math.random()*col.length)];
      const dur=2+Math.random()*5;
      const del=Math.random()*6;
      const op=.15+Math.random()*.75;
      s.style.cssText=`position:absolute;border-radius:50%;width:${sz}px;height:${sz}px;background:${c};left:${Math.random()*100}%;top:${Math.random()*100}%;opacity:${op};box-shadow:0 0 ${sz*2}px ${c};animation:twinkle ${dur}s ${del}s linear infinite;`;
      el.appendChild(s);
      stars.push({el:s,ox:Math.random()*100,oy:Math.random()*100});
    }
    el._stars=stars;el._speed=speed;
  });
  /* twinkle keyframes injected */
  if(!document.getElementById('twinkle-kf')){
    const st=document.createElement('style');st.id='twinkle-kf';
    st.textContent='@keyframes twinkle{0%,100%{opacity:.05;}50%{opacity:1;}}';
    document.head.appendChild(st);
  }
  /* parallax on scroll */
  let lastY=0;
  window.addEventListener('scroll',()=>{
    const sy=window.scrollY;
    const dy=sy-lastY;lastY=sy;
    layers.forEach(({id,speed})=>{
      const el=document.getElementById(id);
      if(!el)return;
      const cur=parseFloat(el.dataset.offset||0)+dy*speed;
      el.dataset.offset=cur;
      el.style.transform=`translateY(${-cur}px)`;
    });
  },{passive:true});
  /* parallax on mouse (desktop 3D tilt feel) */
  window.addEventListener('mousemove',e=>{
    const cx=e.clientX/window.innerWidth-.5;
    const cy=e.clientY/window.innerHeight-.5;
    layers.forEach(({id,speed})=>{
      const el=document.getElementById(id);
      if(!el)return;
      const curOff=parseFloat(el.dataset.offset||0);
      el.style.transform=`translateY(${-curOff}px) translateX(${cx*speed*400}px) translateY(${cy*speed*200}px)`;
    });
  });
})();

/* ══ EMBERS ══ */
(function(){
  const w=document.getElementById('embers');
  const n=window.innerWidth<600?12:26;
  for(let i=0;i<n;i++){
    const el=document.createElement('div');el.className='ep';
    const sz=2+Math.random()*3;
    el.style.cssText=`left:${Math.random()*100}vw;width:${sz}px;height:${sz}px;animation-duration:${9+Math.random()*12}s;animation-delay:-${Math.random()*16}s;`;
    el.style.setProperty('--d',(Math.random()*70-35)+'px');
    w.appendChild(el);
  }
})();

/* ══ GATE STARS ══ */
(function(){
  const w=document.getElementById('gateStars');
  for(let i=0;i<220;i++){
    const s=document.createElement('div');s.className='gstar';
    const sz=Math.random()*2.4;
    const c=Math.random()>.85?'#ffd580':Math.random()>.7?'#a0d4ff':'#ffffff';
    s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;width:${sz}px;height:${sz}px;background:${c};animation-duration:${1.5+Math.random()*4}s;animation-delay:-${Math.random()*6}s;`;
    w.appendChild(s);
  }
})();

/* ══ ERA THEME ENGINE — "time travel" visual shift ══ */
const ERA_THEMES=[
  {key:'prehistoric',from:-3300,to:-1300,name:'Indus Valley Age',vars:{'--t-bg1':'#1a1408','--t-bg2':'#0d0a05','--t-accent':'#C99A4A','--t-accent2':'#8B6F3A','--t-glow':'rgba(201,154,74,0.18)'}},
  {key:'vedic',from:-1300,to:-600,name:'Vedic Age',vars:{'--t-bg1':'#1d1408','--t-bg2':'#0f0a04','--t-accent':'#D9A03C','--t-accent2':'#A6651F','--t-glow':'rgba(217,160,60,0.18)'}},
  {key:'mauryan',from:-600,to:-185,name:'Mauryan Era',vars:{'--t-bg1':'#160d12','--t-bg2':'#0a0608','--t-accent':'#C9622E','--t-accent2':'#8B2020','--t-glow':'rgba(201,98,46,0.2)'}},
  {key:'classical',from:-185,to:600,name:'Classical Golden Age',vars:{'--t-bg1':'#0e1410','--t-bg2':'#070b08','--t-accent':'#3FA08A','--t-accent2':'#DFA840','--t-glow':'rgba(63,160,138,0.16)'}},
  {key:'medieval',from:600,to:1206,name:'Medieval Kingdoms',vars:{'--t-bg1':'#150c18','--t-bg2':'#0a060c','--t-accent':'#8B4FC9','--t-accent2':'#C9622E','--t-glow':'rgba(139,79,201,0.16)'}},
  {key:'sultanate',from:1206,to:1526,name:'Delhi Sultanate Era',vars:{'--t-bg1':'#10120e','--t-bg2':'#070806','--t-accent':'#5A8A6E','--t-accent2':'#C9A03C','--t-glow':'rgba(90,138,110,0.16)'}},
  {key:'mughal',from:1526,to:1757,name:'Mughal Era',vars:{'--t-bg1':'#160f0a','--t-bg2':'#0a0705','--t-accent':'#E0AC4E','--t-accent2':'#8B2020','--t-glow':'rgba(224,172,78,0.2)'}},
  {key:'colonial',from:1757,to:1947,name:'Colonial Era',vars:{'--t-bg1':'#0c0e10','--t-bg2':'#050607','--t-accent':'#6B7A8C','--t-accent2':'#A03030','--t-glow':'rgba(107,122,140,0.14)'}},
  {key:'modern',from:1947,to:2027,name:'Independent India',vars:{'--t-bg1':'#070A0F','--t-bg2':'#04050A','--t-accent':'#2EC4B6','--t-accent2':'#E05C42','--t-glow':'rgba(46,196,182,0.14)'}},
];
const DEFAULT_THEME={key:'default',name:'The Chronicle',vars:{'--t-bg1':'#0d0a05','--t-bg2':'#04050A','--t-accent':'#DFA840','--t-accent2':'#E05C42','--t-glow':'rgba(223,168,64,0.14)'}};

function getThemeForYear(year){
  if(year==null) return DEFAULT_THEME;
  for(const t of ERA_THEMES){ if(year>=t.from && year<t.to) return t; }
  return DEFAULT_THEME;
}
function extractYear(text){
  if(!text) return null;
  const rangeMatch=text.match(/(\d{1,4})\s*[–\-]\s*\d{1,4}\s*(BCE|CE)/i);
  if(rangeMatch) return rangeMatch[2].toUpperCase()==='BCE' ? -parseInt(rangeMatch[1]) : parseInt(rangeMatch[1]);
  const bceMatch=text.match(/(\d{1,4})\s*BCE/i);
  if(bceMatch) return -parseInt(bceMatch[1]);
  const ceMatch=text.match(/(\d{3,4})\s*CE/i);
  if(ceMatch) return parseInt(ceMatch[1]);
  const plainYear=text.match(/\b(1[0-9]{3}|20[0-2][0-9])\b/);
  if(plainYear) return parseInt(plainYear[1]);
  return null;
}
let _themeTransitionTimer=null;
function applyEraTheme(year){
  const theme=getThemeForYear(year);
  const root=document.documentElement;
  Object.entries(theme.vars).forEach(([k,v])=>root.style.setProperty(k,v));
  const ind=document.getElementById('eraIndicator');
  const txt=document.getElementById('eraIndicatorText');
  if(txt) txt.textContent=theme.name;
  if(ind){
    ind.classList.add('show');
    clearTimeout(_themeTransitionTimer);
    _themeTransitionTimer=setTimeout(()=>ind.classList.remove('show'),5000);
  }
  return theme;
}

const ERAS=[
  {range:"c. 3300–1300 BCE",title:"Indus Valley Civilization",wiki:"Indus Valley Civilisation",blurb:"Planned cities with drainage, a script still undeciphered, and trade networks spanning Mesopotamia.",tags:["Harappa","Mohenjo-daro","Bronze Age"]},
  {range:"c. 1500–600 BCE",title:"Vedic Period",wiki:"Vedic period",blurb:"Indo-Aryan migrations, composition of the Rigveda, and the roots of Hindu philosophy and ritual.",tags:["Rigveda","Janapadas","Varna system"]},
  {range:"c. 600–321 BCE",title:"Mahajanapadas & New Faiths",wiki:"Maha Janapadas",blurb:"Sixteen great kingdoms compete as Buddha and Mahavira found Buddhism and Jainism.",tags:["Magadha","Buddhism","Jainism"]},
  {range:"321–185 BCE",title:"Maurya Empire",wiki:"Maurya Empire",blurb:"Chandragupta unifies the subcontinent; Ashoka spreads dharma across Asia after the horror of Kalinga.",tags:["Chandragupta","Ashoka","Kalinga War"]},
  {range:"c. 230 BCE–220 CE",title:"Satavahanas & Indo-Greeks",wiki:"Satavahana dynasty",blurb:"Deccan powers thrive; Gandhara blends Greek and Buddhist art; Silk Route trade booms.",tags:["Deccan","Gandhara","Silk Route"]},
  {range:"320–550 CE",title:"Gupta Empire — Golden Age",wiki:"Gupta Empire",blurb:"Aryabhata invents zero, Kalidasa writes Shakuntala, and India reaches its classical literary peak.",tags:["Aryabhata","Kalidasa","Nalanda"]},
  {range:"600–1200 CE",title:"Chola, Chalukya & Rajput Kingdoms",wiki:"Chola dynasty",blurb:"Chola naval power and temple architecture; Rajput clans in the west; Pala patronage of Buddhism.",tags:["Rajaraja Chola","Brihadeeswarar","Rajputs"]},
  {range:"1206–1526 CE",title:"Delhi Sultanate",wiki:"Delhi Sultanate",blurb:"Five successive dynasties rule from Delhi, introducing Indo-Islamic architecture and centralized admin.",tags:["Qutb Minar","Alauddin Khilji","Lodi dynasty"]},
  {range:"1336–1646 CE",title:"Vijayanagara Empire",wiki:"Vijayanagara Empire",blurb:"A great Hindu empire in the Deccan, with the glittering city of Hampi at its heart.",tags:["Hampi","Krishnadevaraya","Deccan wars"]},
  {range:"1526–1857 CE",title:"Mughal Empire",wiki:"Mughal Empire",blurb:"Babur to Bahadur Shah II — Akbar's tolerance, Shah Jahan's Taj Mahal, Aurangzeb's expansion.",tags:["Akbar","Taj Mahal","Aurangzeb"]},
  {range:"1674–1818 CE",title:"Maratha Empire",wiki:"Maratha Empire",blurb:"Shivaji's guerrilla genius grows into a pan-India power under the Peshwas.",tags:["Shivaji","Peshwas","Panipat 1761"]},
  {range:"1757–1947 CE",title:"Colonial Era & British Raj",wiki:"British Raj",blurb:"From Plassey to the 1857 Revolt — railways and famine, the partition of Bengal, and freedom.",tags:["Plassey","Revolt 1857","Partition of Bengal"]},
  {range:"1885–1947 CE",title:"Indian Freedom Struggle",wiki:"Indian independence movement",blurb:"Congress and League politics, Gandhi's Satyagraha, Bose's INA, Quit India, and Independence.",tags:["Gandhi","Quit India","Subhas Chandra Bose"]},
  {range:"1947 CE–present",title:"Independent India",wiki:"Republic of India",blurb:"Partition's trauma, the Constitution of 1950, wars, 1991 liberalization, and the digital republic.",tags:["Constitution 1950","1991 Reforms","Republic"]}
];

/* ══ WELCOME QUOTES ══ */
const QUOTES=[
  {q:"You must be the change you wish to see in the world.",a:"Mahatma Gandhi"},
  {q:"In a gentle way, you can shake the world.",a:"Mahatma Gandhi"},
  {q:"Give me blood, and I shall give you freedom!",a:"Subhas Chandra Bose"},
  {q:"Freedom is not worth having if it does not include the freedom to make mistakes.",a:"Mahatma Gandhi"},
  {q:"Arise, awake, and stop not till the goal is reached.",a:"Swami Vivekananda"},
  {q:"We are what our thoughts have made us; so take care about what you think.",a:"Swami Vivekananda"},
  {q:"All the powers in the universe are already ours. It is we who have put our hands before our eyes and cry that it is dark.",a:"Swami Vivekananda"},
  {q:"Sa vidya ya vimuktaye — That is true knowledge which liberates.",a:"Ancient Sanskrit Saying"},
  {q:"Vasudhaiva Kutumbakam — The world is one family.",a:"The Maha Upanishad"},
  {q:"The soul is neither born, and nor does it die.",a:"The Bhagavad Gita"},
  {q:"You have the right to perform your actions, but you are not entitled to the fruits of your actions.",a:"The Bhagavad Gita"},
  {q:"Whenever you have truth it must be given with love, or the message and the messenger will be rejected.",a:"Mahatma Gandhi"},
  {q:"Freedom in the mind, faith in the words, pride in our soul.",a:"Rabindranath Tagore"},
  {q:"Where the mind is without fear and the head is held high.",a:"Rabindranath Tagore"},
  {q:"It is the action, not the fruit of the action, that's important.",a:"The Bhagavad Gita"},
  {q:"Tell me a story of someone who gave up, and I will tell you a hundred who did not — that is India's history.",a:"A Principle of the Chronicle"},
  {q:"Inquilab Zindabad — Long live the revolution.",a:"Bhagat Singh"},
  {q:"It is easy to kill individuals, but you cannot kill the ideas.",a:"Bhagat Singh"},
  {q:"Educate, Agitate, Organize.",a:"Dr. B.R. Ambedkar"},
  {q:"Cultivation of mind should be the ultimate aim of human existence.",a:"Dr. B.R. Ambedkar"},
  {q:"Be the change you want to see, but never stop being yourself.",a:"A.P.J. Abdul Kalam"},
  {q:"Dream, dream, dream. Dreams transform into thought, and thought results in action.",a:"A.P.J. Abdul Kalam"},
  {q:"History repeats itself, first as tragedy, second as farce — but India turns both into resolve.",a:"A Principle of the Chronicle"},
  {q:"A nation that forgets its history has no future. India's past is not a burden — it is a beacon.",a:"A Principle of the Chronicle"},
  {q:"There is no sorrow above the loss of a native land.",a:"Euripides, echoed across Indian history"},
  {q:"Even the longest night ends in dawn — and India has seen many nights.",a:"A Principle of the Chronicle"},
  {q:"Truth never damages a cause that is just.",a:"Mahatma Gandhi"},
  {q:"Yatra naryastu pujyante, ramante tatra devata — Where women are honoured, there the divine flourishes.",a:"Manusmriti"},
  {q:"Satyameva Jayate — Truth alone triumphs.",a:"Mundaka Upanishad, India's national motto"},
  {q:"The brave alone shall inherit the earth.",a:"Swami Vivekananda"},
  {q:"Non-violence is the greatest force at the disposal of mankind.",a:"Mahatma Gandhi"},
  {q:"An eye for an eye only ends up making the whole world blind.",a:"Mahatma Gandhi"},
  {q:"First they ignore you, then they laugh at you, then they fight you, then you win.",a:"Often attributed to Mahatma Gandhi"},
  {q:"Live as if you were to die tomorrow. Learn as if you were to live forever.",a:"Mahatma Gandhi"},
  {q:"A small body of determined spirits fired by an unquenchable faith in their mission can alter the course of history.",a:"Mahatma Gandhi"},
  {q:"Action expresses priorities.",a:"Mahatma Gandhi"},
  {q:"Each night, before I go to sleep, I live as if it were my last.",a:"Mahatma Gandhi"},
  {q:"My life is my message.",a:"Mahatma Gandhi"},
  {q:"Take up one idea. Make that one idea your life — think of it, dream of it, live on that idea.",a:"Swami Vivekananda"},
  {q:"You cannot believe in God until you believe in yourself.",a:"Swami Vivekananda"},
  {q:"In a day, when you don't come across any problems — you can be sure that you are travelling in a wrong path.",a:"Swami Vivekananda"},
  {q:"Strength is life, weakness is death.",a:"Swami Vivekananda"},
  {q:"The fire that warms us can also consume us; it is not the fire's fault.",a:"Swami Vivekananda"},
  {q:"Comfort is no test of truth; truth is often far from being comfortable.",a:"Swami Vivekananda"},
  {q:"Freedom is what we want, and we shall have it, whatever the cost.",a:"Subhas Chandra Bose"},
  {q:"No real change in history has ever been achieved by discussions.",a:"Subhas Chandra Bose"},
  {q:"One individual may die for an idea, but that idea will, after his death, incarnate itself in a thousand lives.",a:"Subhas Chandra Bose"},
  {q:"It is our duty to pay for our liberty with our own blood.",a:"Subhas Chandra Bose"},
  {q:"Revolution is an inalienable right of mankind.",a:"Bhagat Singh"},
  {q:"They may kill me, but they cannot kill my ideas.",a:"Bhagat Singh"},
  {q:"Lovers, lunatics, and poets are made of the same stuff.",a:"Bhagat Singh"},
  {q:"The aim of life is no more to control the mind, but to develop it harmoniously.",a:"Bhagat Singh"},
  {q:"Liberty is always dangerous, but it is the safest thing we have.",a:"Dr. B.R. Ambedkar"},
  {q:"I measure the progress of a community by the degree of progress which women have achieved.",a:"Dr. B.R. Ambedkar"},
  {q:"Those who forget history are bound to repeat it.",a:"Dr. B.R. Ambedkar"},
  {q:"Men are mortal, so are ideas. An idea needs propagation as much as a plant needs watering.",a:"Dr. B.R. Ambedkar"},
  {q:"Excellence is a continuous process and not an accident.",a:"A.P.J. Abdul Kalam"},
  {q:"If you fail, never give up because F.A.I.L. means First Attempt In Learning.",a:"A.P.J. Abdul Kalam"},
  {q:"Man needs his difficulties because they are necessary to enjoy success.",a:"A.P.J. Abdul Kalam"},
  {q:"All Birds find shelter during a rain. But Eagle avoids rain by flying above the Clouds.",a:"A.P.J. Abdul Kalam"},
  {q:"Where the mind is without fear and the head is held high; where knowledge is free.",a:"Rabindranath Tagore"},
  {q:"Faith is the bird that feels the light when the dawn is still dark.",a:"Rabindranath Tagore"},
  {q:"You can't cross the sea merely by standing and staring at the water.",a:"Rabindranath Tagore"},
  {q:"Let your life lightly dance on the edges of Time like dew on the tip of a leaf.",a:"Rabindranath Tagore"},
  {q:"Don't limit a child to your own learning, for he was born in another time.",a:"Rabindranath Tagore"},
  {q:"The man who has ceased to fear has ceased to care.",a:"Subhas Chandra Bose"},
  {q:"Service to humanity is service to divinity.",a:"Swami Vivekananda"},
  {q:"That man has reached immortality who is disturbed by nothing material.",a:"The Bhagavad Gita"},
  {q:"There is neither this world nor the world beyond, nor happiness, for the one who doubts.",a:"The Bhagavad Gita"},
  {q:"A person can rise through the effort of his own mind; or draw himself down, in the same manner.",a:"The Bhagavad Gita"},
  {q:"Change is the law of the universe. You can be a millionaire, or a pauper, in an instant.",a:"The Bhagavad Gita"},
  {q:"Set thy heart upon thy work, but never on its reward.",a:"The Bhagavad Gita"},
  {q:"As the river merges with the ocean, the soul merges with the infinite.",a:"Upanishadic teaching"},
  {q:"Truth is one; the wise call it by many names.",a:"Rigveda"},
  {q:"May all beings everywhere be happy and free.",a:"Traditional Sanskrit Invocation"},
  {q:"Lead us from darkness to light, from death to immortality.",a:"Brihadaranyaka Upanishad"},
  {q:"As is the human body, so is the cosmic body. As is the human mind, so is the cosmic mind.",a:"Upanishadic teaching"},
  {q:"What you think, you become. What you feel, you attract. What you imagine, you create.",a:"Often paraphrased from the Buddha, revered across Indian thought"},
  {q:"Peace comes from within. Do not seek it without.",a:"Gautama Buddha"},
  {q:"The mind is everything. What you think, you become.",a:"Gautama Buddha"},
  {q:"Three things cannot be long hidden: the sun, the moon, and the truth.",a:"Gautama Buddha"},
  {q:"Holding on to anger is like drinking poison and expecting the other person to die.",a:"Gautama Buddha"},
  {q:"There is no fear for one whose mind is not filled with desires.",a:"Gautama Buddha"},
  {q:"By non-violence and compassion, you can win over the most hardened heart.",a:"Mahavira"},
  {q:"All the living beings wish to live, and not to die — this is the basis of non-violence.",a:"Mahavira"},
  {q:"He conquers the inner enemies who conquers his own self.",a:"Mahavira"},
  {q:"Conquer anger by forgiveness, conquer pride by humility, conquer deceit with sincerity.",a:"Adapted from Jain teaching"},
  {q:"The Ganges, Yamuna and Saraswati flow together in the wisdom of the seeker.",a:"Traditional Indian saying"},
  {q:"As long as the sun and moon endure, the glory of India's wisdom shall remain.",a:"Traditional Indian saying"},
  {q:"It matters not how strait the gate, how charged with punishments the scroll — I am the master of my fate.",a:"Echoed in spirit by India's freedom fighters"},
  {q:"We must be the change we wish to see, and the history we wish to write.",a:"A Principle of the Chronicle"},
  {q:"Empires rise on ambition and fall on arrogance — India has watched both, many times.",a:"A Principle of the Chronicle"},
  {q:"Every stone of every fort in India remembers a name history forgot.",a:"A Principle of the Chronicle"},
  {q:"The river that carved the Indus Valley still flows somewhere in every Indian's memory.",a:"A Principle of the Chronicle"},
  {q:"A throne is temporary, but a temple outlives every king who built it.",a:"A Principle of the Chronicle"},
  {q:"To read India's history is to read the story of how the wounded keep walking.",a:"A Principle of the Chronicle"},
  {q:"There is no nation on Earth that has survived as many endings and still calls itself young.",a:"A Principle of the Chronicle"},
  {q:"From Harappa to the Republic, India has never stopped becoming itself.",a:"A Principle of the Chronicle"},
  {q:"Knowledge gives humility, humility gives worthiness, worthiness gives wealth, and wealth gives righteousness.",a:"Traditional Vedic teaching"},
  {q:"He who knows others is wise. He who knows himself is enlightened.",a:"Adapted from Indian philosophical tradition"},
  {q:"The lotus that grows from the mud teaches that grace and struggle can share one root.",a:"A Principle of the Chronicle"},
  {q:"What the British called rebellion, history would later call the first cry for freedom.",a:"A Principle of the Chronicle"},
  {q:"It takes a moment to draw a border, and generations to heal what it divides.",a:"A Principle of the Chronicle"},
  {q:"Independence was not given. It was taken, slowly, by a million small refusals.",a:"A Principle of the Chronicle"},
  {q:"Unity in diversity has been India's secret of survival as long as her history is.",a:"Jawaharlal Nehru"},
  {q:"A moment comes, which comes but rarely in history, when we step out from the old to the new.",a:"Jawaharlal Nehru"},
  {q:"Long years ago we made a tryst with destiny, and now the time comes when we shall redeem our pledge.",a:"Jawaharlal Nehru"},
  {q:"I shall not surrender my Jhansi.",a:"Often attributed to Rani Lakshmibai"},
  {q:"What you cannot get by asking, you must take.",a:"Bal Gangadhar Tilak"},
  {q:"Swaraj is my birthright and I shall have it.",a:"Bal Gangadhar Tilak"},
  {q:"Religion and politics are not different things. They are inter-related.",a:"Lala Lajpat Rai"},
  {q:"The sound of every blow on my body will be a nail in the coffin of British rule.",a:"Attributed to Lala Lajpat Rai"},
  {q:"A drop of water that falls on a lotus leaf does not stay; let your action be the same.",a:"Bhagavad Gita teaching"},
  {q:"The fragrance of flowers spreads only in the direction of the wind, but the goodness of a person spreads in all directions.",a:"Chanakya"},
  {q:"A person should not be too honest. Straight trees are cut first.",a:"Chanakya"},
  {q:"Before you start some work, always ask yourself three questions: why am I doing it, what the results might be, and will I be successful.",a:"Chanakya"},
  {q:"There is some self-interest behind every friendship. There is no friendship without self-interests.",a:"Chanakya"},
  {q:"Test a servant while in the discharge of his duty, a relative in difficulty, a friend in adversity, and a wife in misfortune.",a:"Chanakya"},
  {q:"The wise should always do whatever is wholesome to himself even at the expense of an empire.",a:"Chanakya"},
  {q:"Dharma protects those who protect it.",a:"Manusmriti"},
  {q:"A kingdom's true wealth lies not in its treasury, but in the contentment of its people.",a:"Adapted from the Arthashastra"},
  {q:"The king is the source of righteous conduct, and righteous conduct is the source of a stable realm.",a:"Adapted from the Arthashastra"},
  {q:"What seems like victory today may be the seed of tomorrow's downfall, if arrogance follows it.",a:"A Principle of the Chronicle"},
  {q:"Every dynasty believes it is eternal — the ruins of Hampi and Vijayanagara disagree.",a:"A Principle of the Chronicle"},
  {q:"The sea that carried Chola ships to Southeast Asia carried India's ideas further than its armies ever marched.",a:"A Principle of the Chronicle"},
  {q:"A nation built by a hundred different invasions is not weaker for it — it is stronger for having absorbed them all.",a:"A Principle of the Chronicle"},
];
function randomQuote(){return QUOTES[Math.floor(Math.random()*QUOTES.length)];}

const TICKS=[
  {yr:"3300 BCE",t:"Indus Valley Civilization begins — one of Earth's earliest urban cultures"},
  {yr:"599 BCE",t:"Mahavira is born in Vaishali — founder of modern Jainism"},
  {yr:"563 BCE",t:"Siddhartha Gautama (Buddha) is born in Lumbini, Nepal"},
  {yr:"327 BCE",t:"Alexander the Great invades northwestern India, reaching the Indus"},
  {yr:"321 BCE",t:"Chandragupta Maurya founds the Maurya Empire, overthrowing the Nandas"},
  {yr:"269 BCE",t:"Ashoka ascends to the Mauryan throne after a bloody succession war"},
  {yr:"261 BCE",t:"Kalinga War — Ashoka witnesses 100,000 deaths and renounces violence forever"},
  {yr:"185 BCE",t:"Pushyamitra Shunga overthrows the last Mauryan emperor, founding the Shunga dynasty"},
  {yr:"320 CE",t:"Chandragupta I founds the Gupta Empire — beginning India's Golden Age"},
  {yr:"476 CE",t:"Aryabhata is born — he will explain zero, pi, and the rotation of Earth"},
  {yr:"606 CE",t:"Harsha Vardhana becomes King of Kanauj and unites much of North India"},
  {yr:"712 CE",t:"Muhammad bin Qasim conquers Sindh — first Arab conquest of the subcontinent"},
  {yr:"985 CE",t:"Rajaraja Chola I begins reign — builds the Brihadeeswarar Temple"},
  {yr:"1192 CE",t:"Battle of Tarain — Muhammad of Ghor defeats Prithviraj Chauhan"},
  {yr:"1206 CE",t:"Qutb ud-Din Aibak founds the Delhi Sultanate and begins the Qutb Minar"},
  {yr:"1336 CE",t:"Vijayanagara Empire is founded — the last great Hindu empire of the south"},
  {yr:"1498 CE",t:"Vasco da Gama reaches Calicut, opening the sea route from Europe to India"},
  {yr:"1526 CE",t:"Babur defeats Ibrahim Lodi at Panipat — the Mughal Empire begins"},
  {yr:"1556 CE",t:"Akbar the Great becomes Mughal Emperor at age 13 — his reign transforms India"},
  {yr:"1600 CE",t:"British East India Company is founded with a charter from Queen Elizabeth I"},
  {yr:"1627 CE",t:"Shivaji Maharaj is born — he will create the Maratha Empire from a mountain fort"},
  {yr:"1658 CE",t:"Aurangzeb imprisons his father Shah Jahan and seizes the Mughal throne"},
  {yr:"1680 CE",t:"Shivaji dies — but the Maratha confederacy he built will outlast the Mughals"},
  {yr:"1739 CE",t:"Nadir Shah sacks Delhi and carries away the Peacock Throne and Koh-i-Noor"},
  {yr:"1757 CE",t:"Battle of Plassey — Robert Clive defeats Siraj ud-Daulah, sealing British control"},
  {yr:"1799 CE",t:"Tipu Sultan, the Tiger of Mysore, dies defending his capital Seringapatam"},
  {yr:"1857 CE",t:"The Great Revolt of 1857 erupts — India's first organized war of independence"},
  {yr:"1869 CE",t:"Mohandas Karamchand Gandhi is born in Porbandar, Gujarat"},
  {yr:"1875 CE",t:"Dayananda Saraswati founds the Arya Samaj, igniting Hindu social reform"},
  {yr:"1885 CE",t:"Indian National Congress is founded in Bombay with 72 delegates"},
  {yr:"1897 CE",t:"Bal Gangadhar Tilak launches Shivaji Festival, turning history into protest"},
  {yr:"1905 CE",t:"Partition of Bengal by Lord Curzon ignites the Swadeshi Movement"},
  {yr:"1906 CE",t:"Muslim League is founded in Dhaka — reshaping Indian political destiny"},
  {yr:"1915 CE",t:"Gandhi returns to India from South Africa and is welcomed by millions"},
  {yr:"1919 CE",t:"Jallianwala Bagh Massacre — British troops fire on 379+ unarmed civilians"},
  {yr:"1920 CE",t:"Gandhi launches Non-Cooperation Movement — first mass civil disobedience"},
  {yr:"1928 CE",t:"Simon Commission is boycotted nationwide — 'Simon Go Back' echoes everywhere"},
  {yr:"1929 CE",t:"Jawaharlal Nehru hoists the Tricolour at Lahore — demanding full independence"},
  {yr:"1930 CE",t:"Gandhi leads the 390 km Dandi Salt March against the British salt tax"},
  {yr:"1931 CE",t:"Bhagat Singh, Rajguru and Sukhdev are hanged at Lahore Central Jail"},
  {yr:"1942 CE",t:"Quit India Movement — Gandhi declares Do or Die from Gowalia Tank, Bombay"},
  {yr:"1943 CE",t:"Bengal Famine — two to three million die as British policies divert food"},
  {yr:"1943 CE",t:"Subhas Chandra Bose takes command of the Indian National Army in Singapore"},
  {yr:"1946 CE",t:"Royal Indian Navy Mutiny — 20,000 sailors revolt against the British in Bombay"},
  {yr:"1947 CE",t:"India attains independence at midnight — Nehru delivers the Tryst with Destiny"},
  {yr:"1948 CE",t:"Gandhi is assassinated by Nathuram Godse in New Delhi, aged 78"},
  {yr:"1948 CE",t:"Indian Army liberates Hyderabad in Operation Polo — the Nizam surrenders"},
  {yr:"1950 CE",t:"The Constitution of India comes into force — India becomes a Republic"},
  {yr:"1962 CE",t:"Sino-Indian War — India suffers a humiliating defeat in the Himalayan border conflict"},
  {yr:"1971 CE",t:"Bangladesh Liberation War — India defeats Pakistan; 93,000 soldiers surrender"},
  {yr:"c. 1400 BCE",t:"Battle of the Ten Kings — King Sudas defeats a confederacy of ten tribal kings on the Ravi river"},
  {yr:"c. 1500 BCE",t:"Composition of the Rigveda begins — the oldest surviving Sanskrit text"},
  {yr:"c. 800 BCE",t:"Upanishads are composed, laying the philosophical foundation of Vedanta"},
  {yr:"326 BCE",t:"Battle of the Hydaspes — Alexander the Great defeats King Porus on the Jhelum river"},
  {yr:"305 BCE",t:"Chandragupta Maurya defeats Seleucus I, securing the Hindu Kush frontier"},
  {yr:"250 BCE",t:"Ashoka sends Buddhist missionaries to Sri Lanka, Central Asia, and the Mediterranean"},
  {yr:"78 CE",t:"Kanishka the Great expands the Kushan Empire across Central Asia and North India"},
  {yr:"399 CE",t:"Chinese monk Faxian begins his pilgrimage through Gupta India, recording its prosperity"},
  {yr:"629 CE",t:"Xuanzang arrives in India and studies at Nalanda University for years"},
  {yr:"712 CE",t:"Arab armies under Muhammad bin Qasim establish the first Muslim foothold in Sindh"},
  {yr:"1024 CE",t:"Mahmud of Ghazni raids and destroys the Somnath Temple"},
  {yr:"1191 CE",t:"First Battle of Tarain — Prithviraj Chauhan defeats Muhammad of Ghor"},
  {yr:"1290 CE",t:"Jalal ud-Din Khilji founds the Khilji dynasty of the Delhi Sultanate"},
  {yr:"1398 CE",t:"Timur sacks Delhi, leaving the Sultanate devastated for decades"},
  {yr:"1510 CE",t:"Portuguese capture Goa, establishing their first colonial foothold in India"},
  {yr:"1565 CE",t:"Battle of Talikota — allied Deccan Sultanates crush the Vijayanagara Empire"},
  {yr:"1631 CE",t:"Mumtaz Mahal dies in childbirth — Shah Jahan begins building the Taj Mahal"},
  {yr:"1666 CE",t:"Shivaji makes a daring escape from Aurangzeb's house arrest in Agra"},
  {yr:"1674 CE",t:"Shivaji is crowned Chhatrapati at Raigad, formally founding the Maratha Empire"},
  {yr:"1737 CE",t:"Marathas defeat the Mughals at the Battle of Delhi, asserting dominance in the north"},
  {yr:"1761 CE",t:"Third Battle of Panipat — Afghan forces under Ahmad Shah Abdali defeat the Marathas"},
  {yr:"1764 CE",t:"Battle of Buxar — British East India Company defeats a Mughal-Awadh-Bengal alliance"},
  {yr:"1857 CE",t:"Mangal Pandey's defiance at Barrackpore helps spark the Revolt of 1857"},
  {yr:"1905 CE",t:"Gopal Krishna Gokhale founds the Servants of India Society for social reform"},
  {yr:"1925 CE",t:"Rashtriya Swayamsevak Sangh (RSS) is founded in Nagpur"},
  {yr:"1929 CE",t:"Bhagat Singh and companions bomb the Central Legislative Assembly in Delhi"},
  {yr:"1935 CE",t:"Government of India Act introduces provincial autonomy under British oversight"},
  {yr:"1940 CE",t:"Muslim League passes the Lahore Resolution, demanding separate Muslim states"},
  {yr:"1945 CE",t:"INA soldiers are tried at the Red Fort, igniting nationwide protests demanding their release"},
  {yr:"1947 CE",t:"Radcliffe Line is drawn overnight, partitioning British India into two nations"},
  {yr:"1949 CE",t:"Constituent Assembly adopts the Constitution of India after nearly three years of drafting"},
  {yr:"1956 CE",t:"States Reorganisation Act redraws India's internal boundaries along linguistic lines"},
  {yr:"1965 CE",t:"Indo-Pakistani War of 1965 ends in stalemate after fierce tank battles in Punjab"},
  {yr:"1974 CE",t:"India conducts its first nuclear test, Smiling Buddha, at Pokhran"},
  {yr:"1984 CE",t:"Operation Blue Star and the assassination of Indira Gandhi shake the nation"},
  {yr:"1991 CE",t:"Finance Minister Manmohan Singh liberalizes the Indian economy, ending decades of restriction"},
];

function pickRandomTicks(n){
  const arr=TICKS.slice();
  for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
  return arr.slice(0,n);
}

(function(){
  const w=document.getElementById('tickerEvents');
  const activeTicks=pickRandomTicks(22); // fresh random selection every page load
  activeTicks.forEach((ev,i)=>{
    const el=document.createElement('div');
    el.className='ticker-item'+(i===0?' visible':'');
    el.innerHTML=`<span class="yr">${ev.yr}</span>${ev.t}`;
    el.addEventListener('click',()=>{
      selectMode('topic');
      const q=ev.t.split('—')[0].replace(/[\d,+]+\s*(BCE|CE|km|,)\s*/gi,'').trim().replace(/\s+/g,' ').slice(0,55);
      queryInput.value=q;
      runQuery(q); // runQuery scrolls straight to the result once ready — lands on results, not the search bar
    });
    w.appendChild(el);
  });
  let cur=0;
  setInterval(()=>{
    const items=w.querySelectorAll('.ticker-item');
    items[cur].classList.remove('visible');
    cur=(cur+1)%items.length;
    items[cur].classList.add('visible');
  },3800);
})();

/* ══ CLOCK ══ */
function updateClock(){
  const n=new Date();
  const h=String(n.getHours()).padStart(2,'0'),m=String(n.getMinutes()).padStart(2,'0'),s=String(n.getSeconds()).padStart(2,'0');
  document.getElementById('clockTime').textContent=h+':'+m+':'+s;
  const D=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  document.getElementById('clockDate').textContent=D[n.getDay()]+' '+n.getDate()+' '+M[n.getMonth()]+' '+n.getFullYear();
}
updateClock();setInterval(updateClock,1000);

/* ══ GATE ══ */
const gate=document.getElementById('gate'),site=document.getElementById('site');
document.body.style.overflow='hidden';
document.documentElement.style.overflow='hidden';
function escH(s){const d=document.createElement('div');d.innerText=s==null?'':String(s);return d.innerHTML;}

/* ── LAZY DATA LOADER ── fetches a JSON data file once and caches the in-flight/resolved promise,
   so a feature's large pre-written dataset (quiz bank, story scenes, quote library) is only
   downloaded the first time that feature is actually opened, instead of being parsed up front
   for every visitor. `fallback` is returned if the fetch fails (e.g. offline), so the feature
   degrades gracefully instead of breaking. */
const _lazyDataCache={};
function fetchLazyData(name,elementId,fallback){
  if(_lazyDataCache[name])return _lazyDataCache[name];
  const files={
    STORY_LIBRARY:'assets/data/story-library.json',
    GUESS_BANK:'assets/data/guess-bank.json',
    EXTENDED_QUOTES:'assets/data/extended-quotes.json'
  };
  const p=(async()=>{
    try{
      const path=files[name];
      if(!path)throw new Error('No external data file registered for '+name);
      const response=await fetch(path,{cache:'force-cache'});
      if(!response.ok)throw new Error('HTTP '+response.status+' loading '+path);
      return await response.json();
    }catch(err){
      console.warn('Lazy data load failed for',name,'- using fallback.',err);
      delete _lazyDataCache[name];
      return fallback;
    }
  })();
  _lazyDataCache[name]=p;
  return p;
}

/* ── THE COURT HISTORIAN ── a theatrical persona who narrates every quiz answer (Guess Mode,
   Challenge Mode) instead of a flat "Correct!"/"Wrong!". Lines are picked at random per category,
   with a small no-immediate-repeat guard so the same line doesn't fire twice in a row. Streak
   tiers escalate the praise; a wrong answer after a long streak gets a special "fall from grace"
   line. All output still goes through escH() at the call site, same as the plain text it replaces. */
const HISTORIAN={
  correct:{
    base:[
      "✅ Indeed! The scribes shall record this moment of clarity.",
      "✅ Correct! Even the ancient sages nod in approval.",
      "✅ Yes! History itself sighs in relief.",
      "✅ Just so! A worthy successor to the chroniclers of old.",
      "✅ Precisely right! The royal court murmurs with approval.",
      "✅ Correct! Mark this date — a scholar has arrived.",
    ],
    streak3:[
      "✅ Three in a row! The court historian sits up straighter.",
      "✅ A streak begins! Even the stone pillars seem to listen closer now.",
      "✅ Three triumphs! Someone has clearly read more than the syllabus demands.",
      "✅ The chronicle notes an unusual run of brilliance. Continue, scholar.",
    ],
    streak6:[
      "✅ SIX correct! The royal trumpets sound — unnecessarily, but they insist.",
      "✅ A streak of six! I am being asked, quite seriously, if you are a reincarnated vizier.",
      "✅ Six! At this rate I shall have to invent a new title just for you.",
      "✅ Astonishing. The court scribes have started a betting pool on how far you'll go.",
    ],
    streak10:[
      "✅ TEN in a row?! I must sit down. Someone fetch the royal physician — for ME.",
      "✅ A perfect ten-streak. Legends will speak of this. I will personally see to it.",
      "✅ Ten correct answers! At this point I am merely a narrator to your inevitable greatness.",
    ],
  },
  wrong:[
    "❌ Alas! Wrong. The court historian weeps softly into his scroll.",
    "❌ Incorrect! Somewhere, an ancient king sighs in disappointment.",
    "❌ Not quite. Even the wisest ministers erred once — though rarely on something this simple.",
    "❌ Wrong, I'm afraid. The royal chronicle has, regretfully, noted it down.",
    "❌ Oh dear. That answer would not have survived peer review at Nalanda.",
    "❌ Incorrect! Do not worry — even great empires fell for less embarrassing reasons.",
  ],
  wrongAfterStreak:[
    "💔 And the streak ends! Magnificent while it lasted — truly, a tragedy worthy of verse.",
    "💔 Alas, the streak crumbles like an unguarded fort. It was glorious while it stood.",
    "💔 The empire of your winning streak has fallen. History remembers it fondly.",
  ],
  timeout:[
    "⏰ Time's up! The hourglass shows no mercy, scholar.",
    "⏰ The sands ran out! Even Akbar's swiftest messenger could not have saved this one.",
    "⏰ Too slow! The court clock waits for no one, however royal.",
    "⏰ Time has expired. The chronicle records hesitation, not failure — but still, hesitation.",
  ],
  verdict:{
    100:["Flawless. The chronicle bows to you.","A perfect record! I shall personally inscribe your name in gold leaf.","Not a single error. The royal court has nothing left to teach you."],
    80:["Exceptional knowledge of Indian history.","Most impressive! You have clearly spent time among the old scrolls.","The court is thoroughly satisfied — a rare honor."],
    60:["Solid grasp — a few gaps worth exploring.","Respectable! A few corners of the chronicle remain unread.","Good work, though the elders raise one eyebrow, not two."],
    40:["A good start. Time to dive deeper into the chronicle.","An honest effort — the chronicle has seen worse, and far better.","There is potential here, buried under a few centuries of confusion."],
    0:["Every scholar begins somewhere — go explore and try again.","The court historian remains hopeful. Barely. But hopeful.","A humble beginning. Even great dynasties started from nothing."],
  },
};
const _historianLastLine={}; // per-category memory to avoid repeating the same line twice in a row
function historianPick(category){
  const pool=HISTORIAN[category];
  if(!pool||!pool.length)return '';
  let pick=pool[Math.floor(Math.random()*pool.length)];
  if(pool.length>1){
    while(pick===_historianLastLine[category]){ pick=pool[Math.floor(Math.random()*pool.length)]; }
  }
  _historianLastLine[category]=pick;
  return pick;
}
function historianCorrectLine(streak){
  if(streak>=10)return pickFromNested('correct','streak10');
  if(streak>=6)return pickFromNested('correct','streak6');
  if(streak>=3)return pickFromNested('correct','streak3');
  return pickFromNested('correct','base');
}
function pickFromNested(group,subkey){
  const pool=HISTORIAN[group][subkey];
  const cacheKey=group+'.'+subkey;
  let pick=pool[Math.floor(Math.random()*pool.length)];
  if(pool.length>1){
    while(pick===_historianLastLine[cacheKey]){ pick=pool[Math.floor(Math.random()*pool.length)]; }
  }
  _historianLastLine[cacheKey]=pick;
  return pick;
}
function historianWrongLine(priorStreak){
  return priorStreak>=3 ? historianPick('wrongAfterStreak') : historianPick('wrong');
}
function historianTimeoutLine(){
  return historianPick('timeout');
}
function historianVerdict(pct){
  const tier=pct===100?'100':pct>=80?'80':pct>=60?'60':pct>=40?'40':'0';
  return pickFromNested('verdict',tier);
}

/* Device-hint popup: closable via ✕ or by tapping the backdrop, and auto-dismisses after 10 seconds either way. */
(function initGateDeviceHint(){
  const backdrop=document.getElementById('gateDeviceHintBackdrop');
  const hint=document.getElementById('gateDeviceHint');
  if(!backdrop||!hint)return;
  let dismissed=false;
  function dismiss(){
    if(dismissed)return;
    dismissed=true;
    hint.classList.add('closing');
    backdrop.classList.add('closing');
    setTimeout(()=>{ backdrop.style.display='none'; },300);
  }
  document.getElementById('gateDeviceHintClose')?.addEventListener('click',dismiss);
  backdrop.addEventListener('click',(e)=>{ if(e.target===backdrop)dismiss(); });
  setTimeout(dismiss,10000);
})();
document.getElementById('nameInput').addEventListener('input',function(){
  const v=this.value.trim();
  document.getElementById('gatePreview').innerHTML=v?`The chronicle awaits, <strong class="gp-spark">${escH(v)}</strong>`:'&nbsp;';
  this.closest('.gate-input-wrap')?.classList.remove('invalid');
});
document.getElementById('gateForm').addEventListener('submit',function(e){
  e.preventDefault();
  const nameInputEl=document.getElementById('nameInput');
  const raw=(nameInputEl.value||'').trim();
  if(!raw){
    const wrap=nameInputEl.closest('.gate-input-wrap');
    wrap?.classList.add('invalid');
    nameInputEl.focus();
    setTimeout(()=>wrap?.classList.remove('invalid'),500);
    return;
  }
  const name=raw||'Scholar';
  document.getElementById('greetingName').textContent=name;
  document.title=name+"'s Chronicle — Bhārat Itihās";
  safeStore.set('bharat-visitor-name',name);
  gate.classList.add('opening');
  setTimeout(()=>{
    gate.style.display='none';
    site.style.display='block';
    document.body.style.overflow='';
    document.documentElement.style.overflow='';
    window.scrollTo(0,0);
    showWelcomePopup(name);
  },1100);
});

// Post-entry init: streak, favorites panel, continue-where-you-left-off banner, deep link resolution.
// Runs once the gate has been submitted, since the search panel and resultArea only become
// meaningful after the visitor is past the name gate.
document.getElementById('gateForm').addEventListener('submit',function(){
  setTimeout(()=>{
    bumpDailyStreak();
    renderStreakBadge();
    renderFavoritesList();
    renderContinueBanner();
    loadOnThisDay();
    const deepTitle=parseLocationHash();
    if(deepTitle){
      selectMode('topic');
      queryInput.value=deepTitle;
      runQuery(deepTitle,deepTitle);
    }
  },1150);
});

/* ── GATE: drifting glyph constellation ── */
(function(){
  const w=document.getElementById('gateGlyphs');
  if(!w)return;
  const GLYPH_PATHS=[
    // simple lotus
    '<path d="M50 70c-16 0-28-12-28-26 10 0 20 8 28 18 8-10 18-18 28-18 0 14-12 26-28 26Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50 70V40" stroke="currentColor" stroke-width="2"/>',
    // simple arch/gateway (Gateway of India-ish silhouette)
    '<path d="M20 85h60M30 85V50a20 20 0 0 1 40 0v35" fill="none" stroke="currentColor" stroke-width="2"/><path d="M38 85V60M62 85V60" stroke="currentColor" stroke-width="1.6"/>',
    // dome/stupa silhouette
    '<path d="M22 82h56M30 82c0-22 8-34 20-34s20 12 20 34M44 48v-8h12v8" fill="none" stroke="currentColor" stroke-width="2"/>',
    // diya / lamp flame
    '<path d="M50 30c5 8 5 14 0 18-5-4-5-10 0-18Z" fill="currentColor" stroke="none"/><path d="M22 70c0-8 12-12 28-12s28 4 28 12-12 10-28 10-28-2-28-10Z" fill="none" stroke="currentColor" stroke-width="2"/>',
    // ashoka pillar capital (simplified)
    '<circle cx="50" cy="40" r="14" fill="none" stroke="currentColor" stroke-width="2"/><path d="M30 40h40M50 54v30M38 84h24" stroke="currentColor" stroke-width="2"/>',
  ];
  const n=window.innerWidth<700?6:11;
  for(let i=0;i<n;i++){
    const el=document.createElement('div');el.className='gate-glyph';
    const sz=22+Math.random()*26;
    el.style.cssText=`left:${4+Math.random()*92}%;bottom:-8%;width:${sz}px;height:${sz}px;animation-duration:${16+Math.random()*14}s;animation-delay:-${Math.random()*22}s;`;
    el.innerHTML=`<svg viewBox="0 0 100 100">${GLYPH_PATHS[i%GLYPH_PATHS.length]}</svg>`;
    w.appendChild(el);
  }
})();

/* ── GATE: returning visitor banner ── */
(function(){
  const banner=document.getElementById('gateReturnBanner');
  const nameSpan=document.getElementById('gateReturnName');
  const yesBtn=document.getElementById('gateReturnYes');
  if(!banner)return;
  let lastName=null;
  try{ const v=localStorage.getItem('bharat-visitor-name'); lastName=v?JSON.parse(v):null; }catch{}
  if(lastName){
    nameSpan.textContent=', '+lastName;
    banner.classList.add('show');
    yesBtn.addEventListener('click',()=>{
      document.getElementById('nameInput').value=lastName;
      document.getElementById('nameInput').dispatchEvent(new Event('input'));
      document.getElementById('gateForm').requestSubmit ? document.getElementById('gateForm').requestSubmit() : document.getElementById('gateForm').dispatchEvent(new Event('submit',{cancelable:true}));
    });
  }
})();

/* ── GATE: ambient glow toggle — purely visual, brightens the nebula/embers behind the gate ── */
(function(){
  const btn=document.getElementById('gateAmbientToggle');
  const label=document.getElementById('gateAmbientLabel');
  if(!btn)return;
  let on=false;
  btn.addEventListener('click',()=>{
    on=!on;
    btn.classList.toggle('on',on);
    btn.setAttribute('aria-pressed',String(on));
    label.textContent='Ambient glow: '+(on?'on':'off');
    document.querySelectorAll('.nebula').forEach(n=>{n.style.filter=on?'brightness(1.6) saturate(1.25)':'';});
    document.getElementById('embers')?.style.setProperty('opacity',on?'1':'');
  });
})();

let _wpQuoteTimer=null;
function flickerToNewQuote(){
  const qEl=document.getElementById('wpQuote');
  const aEl=document.getElementById('wpAttr');
  qEl.style.opacity='0';
  aEl.style.opacity='0';
  setTimeout(()=>{
    const pick=randomQuote();
    qEl.textContent=pick.q;
    aEl.textContent=pick.a;
    qEl.style.opacity='1';
    aEl.style.opacity='1';
  },350);
}
function showWelcomePopup(name){
  document.getElementById('wpName').textContent=name;
  const pick=randomQuote();
  const qEl=document.getElementById('wpQuote');
  const aEl=document.getElementById('wpAttr');
  qEl.style.transition='opacity .35s ease';
  aEl.style.transition='opacity .35s ease';
  qEl.textContent=pick.q;
  aEl.textContent=pick.a;
  const popup=document.getElementById('welcomePopup');
  popup.classList.add('visible');
  clearInterval(_wpQuoteTimer);
  _wpQuoteTimer=setInterval(flickerToNewQuote,4500); // rotates to a fresh random quote every 4.5s while popup is open
}
document.getElementById('wpContinue').addEventListener('click',()=>{
  document.getElementById('welcomePopup').classList.remove('visible');
  clearInterval(_wpQuoteTimer);
});

/* ══ ERA GRID ══ */
const eraGrid=document.getElementById('eraGrid');
ERAS.forEach(era=>{
  const el=document.createElement('div');el.className='era-card';
  el.innerHTML=`<div class="era-range">${era.range}</div><h3 class="era-title-c">${era.title}</h3><p class="era-blurb">${era.blurb}</p><div class="era-tags">${era.tags.map(t=>`<span>${t}</span>`).join('')}</div>`;
  el.addEventListener('click',()=>{
    selectMode('era');queryInput.value=era.title;
    applyEraTheme(extractYear(era.range)); // instant time-travel feel before results even load
    document.getElementById('gateway-sec').scrollIntoView({behavior:'smooth',block:'start'});
    setTimeout(()=>runQuery(era.title,era.wiki),350);
  });
  eraGrid.appendChild(el);
});

/* ══ MONUMENTS & ARCHITECTURE GRID — temples, forts, tombs, step-wells ══ */
const MONUMENTS=[
  {title:"Taj Mahal",wiki:"Taj Mahal",cat:"🕌 Mausoleum",blurb:"Shah Jahan's white-marble tribute to Mumtaz Mahal on the Yamuna at Agra."},
  {title:"Qutb Minar",wiki:"Qutb Minar",cat:"🗼 Minaret",blurb:"A 73-metre Indo-Islamic victory tower begun by Qutb-ud-din Aibak in Delhi."},
  {title:"Brihadeeswarar Temple",wiki:"Brihadeeswarar Temple",cat:"🛕 Temple",blurb:"Rajaraja Chola's granite masterpiece at Thanjavur, capped by a single 80-tonne block.",},
  {title:"Hawa Mahal",wiki:"Hawa Mahal",cat:"🏯 Palace",blurb:"Jaipur's 'Palace of Winds' — a honeycombed pink sandstone façade of 953 windows."},
  {title:"Konark Sun Temple",wiki:"Konark Sun Temple",cat:"🛕 Temple",blurb:"A 13th-century chariot-shaped temple to Surya, its wheels carved as sundials."},
  {title:"Red Fort",wiki:"Red Fort",cat:"🏰 Fort",blurb:"Shah Jahan's Mughal seat of power in Delhi, where the Tricolour first rose in 1947."},
  {title:"Mehrangarh Fort",wiki:"Mehrangarh",cat:"🏰 Fort",blurb:"A Rathore stronghold rising sheer above Jodhpur, the 'Blue City'."},
  {title:"Khajuraho Group of Monuments",wiki:"Khajuraho Group of Monuments",cat:"🛕 Temple Complex",blurb:"Chandela-era temples famed for their intricate, sensuous stone carving."},
  {title:"Gol Gumbaz",wiki:"Gol Gumbaz",cat:"🕌 Mausoleum",blurb:"Bijapur's Deccan-sultanate tomb with one of the largest unsupported domes on Earth."},
  {title:"Chittorgarh Fort",wiki:"Chittorgarh Fort",cat:"🏰 Fortress",blurb:"Rajasthan's largest fort, scene of repeated sieges and Rajput jauhar."},
  {title:"Sanchi Stupa",wiki:"Sanchi Stupa",cat:"☸ Stupa",blurb:"Ashoka's Buddhist relic-mound at Sanchi, gateway carvings among India's oldest."},
  {title:"Meenakshi Amman Temple",wiki:"Meenakshi Amman Temple",cat:"🛕 Temple",blurb:"Madurai's twin-shrine temple city, its gopurams covered in painted sculpture."},
  {title:"Chand Baori",wiki:"Chand Baori",cat:"🔻 Step-well",blurb:"A dizzying 3,500-step geometric descent into the earth near Abhaneri, Rajasthan."},
  {title:"Golconda Fort",wiki:"Golconda Fort",cat:"🏰 Fort",blurb:"A Qutb Shahi diamond-trade citadel above Hyderabad, famed for its acoustic gateway."},
  {title:"Humayun's Tomb",wiki:"Humayun's Tomb",cat:"🕌 Mausoleum",blurb:"The garden-tomb that set the architectural template later perfected in the Taj Mahal."},
  {title:"Hampi",wiki:"Hampi",cat:"🏛 Ruined City",blurb:"The shattered, boulder-strewn capital of the Vijayanagara Empire."},
  {title:"Ellora Caves",wiki:"Ellora Caves",cat:"⛰ Rock-Cut Temple",blurb:"34 Hindu, Buddhist, and Jain monasteries carved into a single basalt cliff — including the colossal Kailasa Temple."},
  {title:"Ajanta Caves",wiki:"Ajanta Caves",cat:"⛰ Rock-Cut Temple",blurb:"Buddhist cave monasteries above a Deccan ravine, prized for paintings unmatched until the Renaissance."},
  {title:"Fatehpur Sikri",wiki:"Fatehpur Sikri",cat:"🏯 Palace City",blurb:"Akbar's short-lived purpose-built capital, abandoned within 15 years for want of water."},
  {title:"Jaisalmer Fort",wiki:"Jaisalmer Fort",cat:"🏰 Fort",blurb:"A living sandstone citadel rising from the Thar Desert, still home to families inside its walls."},
  {title:"Agra Fort",wiki:"Agra Fort",cat:"🏰 Fort",blurb:"The Mughal capital fortress where Shah Jahan was later imprisoned by his own son, Aurangzeb."},
  {title:"Sun Temple, Modhera",wiki:"Sun Temple, Modhera",cat:"🛕 Temple",blurb:"A Solanki-era Gujarat temple with a stepped tank designed to mirror the temple in still water."},
  {title:"Vidhana Soudha",wiki:"Vidhana Soudha",cat:"🏛 Public Building",blurb:"Bengaluru's neo-Dravidian state legislature, built to assert Indian style after Independence."},
  {title:"Charminar",wiki:"Charminar",cat:"🕌 Monument",blurb:"Hyderabad's four-minaret landmark, raised by the Qutb Shahis to mark the city's founding in 1591."},
  {title:"Dholavira",wiki:"Dholavira",cat:"🏛 Ancient City",blurb:"A meticulously planned Harappan port-city in Kutch, with stepwell reservoirs and a Bronze Age signboard."},
  {title:"Rani ki Vav",wiki:"Rani ki Vav",cat:"🔻 Step-well",blurb:"An inverted temple of a stepwell at Patan, Gujarat, with over 500 sculptural panels of Vishnu's avatars."},
  {title:"Mahabodhi Temple",wiki:"Mahabodhi Temple",cat:"☸ Buddhist Shrine",blurb:"Marks the exact spot at Bodh Gaya where the Buddha attained enlightenment beneath the Bodhi tree."},
  {title:"Group of Monuments at Mahabalipuram",wiki:"Group of Monuments at Mahabalipuram",cat:"🛕 Rock-Cut Temple",blurb:"Pallava-era shore temples and rathas carved directly from granite outcrops on the Coromandel coast."},
  {title:"Kailasa Temple, Ellora",wiki:"Kailasa Temple",cat:"⛰ Monolith",blurb:"Carved top-down from a single basalt hill by Rashtrakuta masons — one rock, no joints, an entire temple."},
  {title:"Gwalior Fort",wiki:"Gwalior Fort",cat:"🏰 Fort",blurb:"Called the 'pearl among fortresses of Hind' by Babur, it changed hands among nearly every major dynasty of north India."},
  {title:"Victoria Memorial",wiki:"Victoria Memorial, Kolkata",cat:"🏛 Colonial Monument",blurb:"A white-marble monument to Empire on the Kolkata maidan, now an Indian museum housing colonial-era art and artefacts."},
  {title:"Mysore Palace",wiki:"Mysore Palace",cat:"🏯 Palace",blurb:"The Wadiyar dynasty's opulent Indo-Saracenic seat, lit by nearly 100,000 bulbs on festival nights."},
  {title:"Jama Masjid, Delhi",wiki:"Jama Masjid, Delhi",cat:"🕌 Mosque",blurb:"Shah Jahan's grandest mosque, completed in 1656 and still one of India's largest, holding 25,000 worshippers."},
  {title:"India Gate",wiki:"India Gate",cat:"🏛 War Memorial",blurb:"A 42-metre sandstone arch in Delhi honouring over 80,000 Indian soldiers who died in British imperial campaigns."},
  {title:"Virupaksha Temple",wiki:"Virupaksha Temple, Hampi",cat:"🛕 Temple",blurb:"The still-active heart of ruined Hampi, its gopuram rising over 50 metres above the Vijayanagara capital's wreckage."},
  {title:"Lingaraja Temple",wiki:"Lingaraja Temple",cat:"🛕 Temple",blurb:"Bhubaneswar's 11th-century masterpiece, its 55-metre tower the centrepiece of Odisha's distinctive Kalinga architecture."},
  {title:"Akbar's Tomb",wiki:"Akbar's Tomb",cat:"🕌 Mausoleum",blurb:"Jahangir's sandstone-and-marble monument to his father at Sikandra, blending Hindu, Islamic, and Christian motifs."},
  {title:"Bibi Ka Maqbara",wiki:"Bibi Ka Maqbara",cat:"🕌 Mausoleum",blurb:"Aurangzeb's son built this Aurangabad mausoleum for his mother in deliberate, modest echo of the Taj Mahal."},
  {title:"Vijaya Vittala Temple",wiki:"Vittala Temple",cat:"🛕 Temple",blurb:"Hampi's musical-pillar shrine, its stone columns engineered to ring with different notes when struck."},
  {title:"Lal Qila, Lahore (Lahore Fort)",wiki:"Lahore Fort",cat:"🏰 Fort",blurb:"A Mughal citadel rebuilt by Akbar and adorned by Shah Jahan, its Sheesh Mahal mirror-palace among the empire's finest interiors."},
  {title:"Bahá'í Lotus Temple",wiki:"Lotus Temple",cat:"🪷 Modern Temple",blurb:"A 1986 Delhi landmark shaped from 27 free-standing marble petals, among the most-visited buildings in the world."},
];
const monGrid=document.getElementById('monGrid');
if(monGrid){
  MONUMENTS.forEach(m=>{
    const el=document.createElement('div');el.className='mon-card';
    el.setAttribute('role','button');
    el.setAttribute('tabindex','0');
    el.setAttribute('aria-label','Explore '+m.title);
    el.innerHTML=`<div class="mon-card-img placeholder" data-wiki="${escH(m.wiki)}" aria-hidden="true">🏛</div>
      <div class="mon-card-body">
        <div class="mon-card-cat">${m.cat}</div>
        <h3 class="mon-card-title">${escH(m.title)}</h3>
        <p class="mon-card-blurb">${escH(m.blurb)}</p>
      </div>`;
    const activate=()=>{
      selectMode('topic');queryInput.value=m.title;
      document.getElementById('gateway-sec').scrollIntoView({behavior:'smooth',block:'start'});
      setTimeout(()=>runQuery(m.title,m.wiki),350);
    };
    el.addEventListener('click',activate);
    el.addEventListener('keydown',(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); activate(); } });
    monGrid.appendChild(el);
  });

  // "Search More" tile — lets the user look up any other monument/temple/fort not in the curated list,
  // routed through the exact same buildDossier/runQuery pipeline as every other search on the site.
  const moreEl=document.createElement('div');
  moreEl.className='mon-card-more';
  moreEl.id='monSearchMoreCard';
  moreEl.innerHTML=`
    <div class="mm-cta">
      <div class="mm-icon"><svg viewBox="0 0 52 52" fill="none"><circle cx="22" cy="22" r="14" stroke="currentColor" stroke-width="2.4"/><line x1="32" y1="32" x2="45" y2="45" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><line x1="17" y1="22" x2="27" y2="22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="22" y1="17" x2="22" y2="27" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></div>
      <h3>Search More</h3>
      <p>Looking for a different temple, fort, palace, or monument? Search the full archive.</p>
    </div>
    <div class="mon-search-box" id="monSearchBox">
      <input type="text" id="monSearchInput" placeholder="e.g. Jagannath Temple, Agra Fort, Lal Qila…">
      <button type="button" id="monSearchGo">Reveal</button>
      <span class="mon-search-hint">Searches the same archive as the rest of the site</span>
    </div>`;
  monGrid.appendChild(moreEl);

  const mmCta=moreEl.querySelector('.mm-cta');
  const monSearchBox=moreEl.querySelector('#monSearchBox');
  const monSearchInput=moreEl.querySelector('#monSearchInput');
  const monSearchGo=moreEl.querySelector('#monSearchGo');
  function revealMonSearch(){
    mmCta.style.display='none';
    monSearchBox.classList.add('active');
    monSearchInput.focus();
  }
  function runMonSearch(){
    const val=(monSearchInput.value||'').trim();
    if(!val)return;
    selectMode('topic');queryInput.value=val;
    document.getElementById('gateway-sec').scrollIntoView({behavior:'smooth',block:'start'});
    setTimeout(()=>runQuery(val),350);
  }
  moreEl.addEventListener('click',(e)=>{
    if(!monSearchBox.classList.contains('active')) revealMonSearch();
  });
  monSearchInput.addEventListener('click',e=>e.stopPropagation());
  monSearchInput.addEventListener('keydown',e=>{if(e.key==='Enter'){e.stopPropagation();runMonSearch();}});
  monSearchGo.addEventListener('click',(e)=>{e.stopPropagation();runMonSearch();});
  // Genuinely lazy: only fetch a thumbnail once its card scrolls near the viewport, instead of
  // firing every fetch for all 16 monuments the instant the page loads.
  requestAnimationFrame(()=>{
    if(typeof getThumb!=='function') return;
    const loadThumb=async(imgHolder)=>{
      const wiki=imgHolder.dataset.wiki;
      if(!wiki||imgHolder._loaded)return;
      imgHolder._loaded=true;
      try{
        const src=await getThumb(wiki);
        if(src){
          const img=document.createElement('img');
          img.className='mon-card-img';img.loading='lazy';img.alt=wiki;img.src=src;
          imgHolder.replaceWith(img);
        }
      }catch(e){/* keep placeholder on failure */}
    };
    if(typeof IntersectionObserver==='function'){
      const thumbObs=new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){ loadThumb(entry.target); thumbObs.unobserve(entry.target); }
        });
      },{rootMargin:'200px 0px'});
      monGrid.querySelectorAll('.mon-card-img[data-wiki]').forEach(el=>thumbObs.observe(el));
    }else{
      // fallback for environments without IntersectionObserver
      monGrid.querySelectorAll('.mon-card-img[data-wiki]').forEach(loadThumb);
    }
  });
}

/* ══ EMPIRE TIMELINE CHART — comparative Gantt-style chart of major dynasties ══ */
const EMPIRE_TIMELINE_DATA=[
  {name:"Indus Valley Civilization",from:-3300,to:-1300,color:"#6B7FA3",note:"Bronze-age urban culture; Harappa & Mohenjo-daro."},
  {name:"Vedic Period",from:-1500,to:-500,color:"#8A7A5C",note:"Foundational texts, early Janapadas form across the north."},
  {name:"Maurya Empire",from:-321,to:-185,color:"#DFA840",note:"First near-total unification of the subcontinent under Chandragupta & Ashoka."},
  {name:"Satavahana Dynasty",from:-230,to:220,color:"#4F8A7A",note:"Dominant Deccan power bridging north and south India."},
  {name:"Gupta Empire",from:320,to:550,color:"#9B7BE0",note:"India's 'Golden Age' — science, math, art, and literature flourish."},
  {name:"Vardhana Dynasty",from:540,to:647,color:"#C97B4A",note:"Harshavardhana's brief but powerful unification of the north."},
  {name:"Rashtrakuta Dynasty",from:735,to:982,color:"#5C8A6E",note:"Deccan power famed for the rock-cut Kailasa Temple at Ellora."},
  {name:"Pala Empire",from:750,to:1161,color:"#7A8FB5",note:"Bengal's great Buddhist dynasty; founders of Vikramashila University."},
  {name:"Chola Dynasty",from:848,to:1279,color:"#2EC4B6",note:"Maritime South Indian empire reaching Southeast Asia under Rajendra Chola I."},
  {name:"Delhi Sultanate",from:1206,to:1526,color:"#B5563C",note:"Series of Turkic & Afghan dynasties ruling from Delhi."},
  {name:"Vijayanagara Empire",from:1336,to:1646,color:"#E0A93F",note:"Wealthy South Indian empire centered on Hampi."},
  {name:"Mughal Empire",from:1526,to:1857,color:"#E05C42",note:"From Babur to Aurangzeb and beyond — the subcontinent's last great pre-colonial empire."},
  {name:"Maratha Confederacy",from:1674,to:1818,color:"#3FA08A",note:"Founded by Shivaji; came to dominate much of India before British ascendancy."},
  {name:"Sikh Empire",from:1801,to:1849,color:"#4A9BC9",note:"Ranjit Singh's Punjab kingdom, annexed by the British after two Anglo-Sikh wars."},
  {name:"British Raj",from:1858,to:1947,color:"#7A5C22",note:"Direct Crown rule following the 1857 rebellion, ending with Independence."},
  {name:"Republic of India",from:1947,to:2026,color:"#DFA840",note:"Independent, democratic India — ongoing."},
];
function renderEmpireChart(){
  const svg=document.getElementById('empireChartSvg');
  if(!svg) return;
  const data=EMPIRE_TIMELINE_DATA;
  const W=1000,H=480,padL=190,padR=30,padT=20,padB=40;
  const minY=-3300,maxY=2026;
  const rowH=(H-padT-padB)/data.length;
  const xFor=y=>padL+((y-minY)/(maxY-minY))*(W-padL-padR);
  let svgParts=[];
  // gridlines + axis labels every 500 years
  for(let yr=-3000; yr<=2000; yr+=500){
    const x=xFor(yr);
    svgParts.push(`<line class="ec-axis-line" x1="${x}" y1="${padT}" x2="${x}" y2="${H-padB}"/>`);
    const lbl=yr<0?Math.abs(yr)+' BCE':yr+' CE';
    svgParts.push(`<text class="ec-label" x="${x}" y="${H-padB+18}" text-anchor="middle">${lbl}</text>`);
  }
  data.forEach((d,i)=>{
    const y=padT+i*rowH+rowH*0.22;
    const barH=rowH*0.56;
    const x1=xFor(d.from), x2=xFor(d.to);
    svgParts.push(`<text class="ec-name" x="${padL-14}" y="${y+barH*0.72}" text-anchor="end">${escH(d.name)}</text>`);
    svgParts.push(`<rect class="ec-bar" data-idx="${i}" x="${x1}" y="${y}" width="${Math.max(2,x2-x1)}" height="${barH}" rx="5" fill="${d.color}" opacity="0.85"/>`);
  });
  svg.innerHTML=svgParts.join('');
  // legend
  const legend=document.getElementById('ecLegend');
  if(legend){
    legend.innerHTML=data.map(d=>`<div class="ec-legend-item"><span class="ec-legend-dot" style="background:${d.color}"></span>${escH(d.name)}</div>`).join('');
  }
  // tooltip interactivity
  const tooltip=document.getElementById('ecTooltip');
  const wrap=svg.closest('.empire-chart-wrap');
  svg.querySelectorAll('.ec-bar').forEach(bar=>{
    bar.addEventListener('mouseenter',e=>{
      const d=data[+bar.dataset.idx];
      const span=(d.from<0?Math.abs(d.from)+' BCE':d.from+' CE')+' — '+(d.to<0?Math.abs(d.to)+' BCE':d.to+' CE');
      tooltip.innerHTML=`<span class="tt-title">${escH(d.name)}</span>${span}<br>${escH(d.note)}`;
      tooltip.classList.add('show');
    });
    bar.addEventListener('mousemove',e=>{
      const r=wrap.getBoundingClientRect();
      tooltip.style.left=(e.clientX-r.left+14)+'px';
      tooltip.style.top=(e.clientY-r.top-10)+'px';
    });
    bar.addEventListener('mouseleave',()=>tooltip.classList.remove('show'));
    bar.addEventListener('click',()=>{
      const d=data[+bar.dataset.idx];
      selectMode('era');queryInput.value=d.name;
      document.getElementById('gateway-sec').scrollIntoView({behavior:'smooth',block:'start'});
      setTimeout(()=>runQuery(d.name),350);
    });
  });
}
renderEmpireChart();

/* ══ YEAR-BAND TIMELINE DATA ══
   Continuous coverage from 3000 BCE to present. Each band has a from/to year
   (negative = BCE). The slider resolves a year to the band(s) active at that point.
   Years stored as signed integers: -3000 = 3000 BCE, 1947 = 1947 CE.
*/
const TIMELINE_BANDS = [
  {
    from: -3000, to: -1300,
    era: "Indus Valley Civilization",
    empires: ["Indus Valley Civilization (Harappan)"],
    rulers: ["No deciphered king-list — governed by city councils/elites (script undeciphered)"],
    events: ["Rise of Harappa & Mohenjo-daro (c. 2600 BCE)", "Standardized weights & planned grid cities", "Trade contact with Mesopotamia (Sumer)", "Gradual decline & de-urbanization (c. 1900 BCE)"],
    wars: ["No confirmed major wars recorded — collapse linked to climate shift, river course change"],
  },
  {
    from: -1500, to: -600,
    era: "Vedic Period",
    empires: ["Early Vedic Janapadas (Kuru, Panchala, Videha)"],
    rulers: ["Divodasa & Sudas (Bharata clan)", "Janaka of Videha"],
    events: ["Indo-Aryan migrations into the Punjab", "Composition of the Rigveda (c. 1500–1200 BCE)", "Rise of the varna and gotra systems", "Later Vedic texts: Brahmanas, Upanishads"],
    wars: ["Battle of the Ten Kings (Dasarajna) — Sudas vs. a ten-king confederacy on the Ravi"],
  },
  {
    from: -600, to: -321,
    era: "Mahajanapadas & New Faiths",
    empires: ["Sixteen Mahajanapadas (Magadha, Kosala, Avanti, Vatsa…)"],
    rulers: ["Bimbisara of Magadha", "Ajatashatru of Magadha", "Pradyota of Avanti"],
    events: ["Life of Gautama Buddha, founding of Buddhism", "Life of Mahavira, founding of Jainism", "Magadha's rise as the dominant power", "Persian Achaemenid annexation of the Indus region"],
    wars: ["Magadha–Vajji wars", "Ajatashatru's conquest of Kosala and the Lichchhavi confederacy"],
  },
  {
    from: -327, to: -321,
    era: "Alexander's Invasion & Nanda Collapse",
    empires: ["Nanda Empire (Magadha)", "Macedonian incursion (Punjab)"],
    rulers: ["Dhana Nanda (Magadha)", "Alexander the Great (Macedon)", "King Porus (Pauravas)"],
    events: ["Alexander crosses the Indus (327 BCE)", "Greek satrapies established briefly in the northwest", "Nanda dynasty collapses under Chandragupta Maurya"],
    wars: ["Battle of the Hydaspes (326 BCE) — Alexander defeats Porus"],
  },
  {
    from: -321, to: -185,
    era: "Maurya Empire",
    empires: ["Maurya Empire"],
    rulers: ["Chandragupta Maurya", "Bindusara", "Ashoka the Great"],
    events: ["Chandragupta unifies most of the subcontinent", "Megasthenes' embassy to the Mauryan court", "Ashoka's conversion to Buddhism", "Edicts of Ashoka spread across Asia"],
    wars: ["Seleucid–Mauryan War (305 BCE)", "Kalinga War (c. 261 BCE) — Ashoka's bloody, transformative conquest"],
  },
  {
    from: -185, to: -28,
    era: "Shunga & Indo-Greek Period",
    empires: ["Shunga Empire", "Indo-Greek Kingdoms (Bactria/Punjab)"],
    rulers: ["Pushyamitra Shunga", "Menander I (Indo-Greek)"],
    events: ["Shungas overthrow the last Maurya ruler", "Indo-Greek kingdoms flourish in the northwest", "Construction of the Sanchi Stupa gateways"],
    wars: ["Shunga–Indo-Greek border conflicts in the Punjab"],
  },
  {
    from: -230, to: 319,
    era: "Satavahanas & Kushans",
    empires: ["Satavahana Empire (Deccan)", "Kushan Empire (north & central Asia)"],
    rulers: ["Simuka (Satavahana founder)", "Gautamiputra Satakarni", "Kanishka the Great (Kushan)"],
    events: ["Deccan trade networks flourish", "Gandhara art blends Greek and Buddhist styles", "Silk Route trade booms under Kushan patronage", "Kanishka's Buddhist councils"],
    wars: ["Satavahana–Shaka (Western Kshatrapas) wars over the Deccan"],
  },
  {
    from: 320, to: 550,
    era: "Gupta Empire — Golden Age",
    empires: ["Gupta Empire"],
    rulers: ["Chandragupta I", "Samudragupta", "Chandragupta II (Vikramaditya)", "Kumaragupta I"],
    events: ["Aryabhata formulates the concept of zero & astronomy", "Kalidasa composes Shakuntala and Meghaduta", "Nalanda University rises to prominence", "Huna (Hun) invasions weaken the empire"],
    wars: ["Samudragupta's digvijaya (conquests across India)", "Gupta–Huna wars (5th–6th century)"],
  },
  {
    from: 543, to: 753,
    era: "Chalukyas of Badami & Pallavas",
    empires: ["Chalukya Empire (Badami)", "Pallava Dynasty"],
    rulers: ["Pulakeshin II (Chalukya)", "Narasimhavarman I (Pallava)"],
    events: ["Construction of the Badami cave temples", "Pallava temple architecture at Mahabalipuram", "Chinese pilgrim Xuanzang travels through India"],
    wars: ["Chalukya–Pallava wars for Deccan supremacy"],
  },
  {
    from: 606, to: 647,
    era: "Harsha's Empire",
    empires: ["Empire of Harsha (north India)"],
    rulers: ["Harshavardhana"],
    events: ["Harsha unites much of north India after Gupta decline", "Patronage of Nalanda and Buddhist scholarship", "Xuanzang's account of Harsha's court"],
    wars: ["Harsha's defeat by Pulakeshin II at the Narmada (c. 618–619)"],
  },
  {
    from: 736, to: 1206,
    era: "Cholas, Rajputs, Palas & Pratiharas",
    empires: ["Chola Empire (Tamil country)", "Rajput Kingdoms (north & west)", "Pala Empire (Bengal & Bihar)", "Gurjara-Pratihara Empire"],
    rulers: ["Rajaraja Chola I", "Rajendra Chola I", "Prithviraj Chauhan (Rajput)", "Dharmapala (Pala)", "Mihira Bhoja (Pratihara)"],
    events: ["Construction of the Brihadeeswarar Temple, Thanjavur", "Chola naval expeditions to Southeast Asia", "Pala patronage of Buddhism and Vikramashila University", "Tripartite struggle for Kannauj (Pala–Pratihara–Rashtrakuta)"],
    wars: ["Chola naval campaigns against Srivijaya", "First & Second Battles of Tarain (1191, 1192) — Prithviraj Chauhan vs. Muhammad of Ghor"],
  },
  {
    from: 1206, to: 1526,
    era: "Delhi Sultanate",
    empires: ["Delhi Sultanate (Mamluk, Khilji, Tughlaq, Sayyid, Lodi dynasties)"],
    rulers: ["Qutb-ud-din Aibak", "Alauddin Khilji", "Muhammad bin Tughlaq", "Ibrahim Lodi"],
    events: ["Construction of the Qutb Minar begins", "Khilji defeats Mongol invasions of India", "Tughlaq's failed capital shift to Daulatabad", "Founding of the Bahmani & Vijayanagara kingdoms (1336–47)"],
    wars: ["Khilji's Mongol-repelling campaigns", "First Battle of Panipat (1526) — Babur defeats Ibrahim Lodi"],
  },
  {
    from: 1336, to: 1646,
    era: "Vijayanagara Empire",
    empires: ["Vijayanagara Empire (Deccan)", "Bahmani Sultanate (rival, Deccan)"],
    rulers: ["Harihara I", "Krishnadevaraya"],
    events: ["Hampi rises as a major imperial capital", "Krishnadevaraya's golden age of art and trade", "Portuguese trade contact on the western coast"],
    wars: ["Battle of Talikota (1565) — Deccan Sultanates defeat Vijayanagara"],
  },
  {
    from: 1526, to: 1857,
    era: "Mughal Empire",
    empires: ["Mughal Empire"],
    rulers: ["Babur", "Akbar", "Jahangir", "Shah Jahan", "Aurangzeb", "Bahadur Shah II (last Mughal)"],
    events: ["Akbar's policy of religious tolerance (Din-i Ilahi, abolishing jizya)", "Construction of the Taj Mahal (1632–53)", "Aurangzeb's southward expansion & reimposition of jizya", "Mughal decline after Aurangzeb (post-1707)"],
    wars: ["First Battle of Panipat (1526)", "Second Battle of Panipat (1556)", "Mughal–Maratha wars (1680s–1707)", "Third Battle of Panipat (1761)"],
  },
  {
    from: 1674, to: 1818,
    era: "Maratha Empire",
    empires: ["Maratha Empire"],
    rulers: ["Shivaji Maharaj", "Sambhaji", "Peshwa Baji Rao I", "Peshwa Balaji Baji Rao"],
    events: ["Shivaji's coronation as Chhatrapati (1674)", "Peshwas centralize Maratha power from Pune", "Maratha expansion across central & north India", "Anglo-Maratha Wars erode Maratha sovereignty"],
    wars: ["Third Battle of Panipat (1761) — Marathas defeated by Afghan forces", "Anglo-Maratha Wars (1775–1818)"],
  },
  {
    from: 1757, to: 1947,
    era: "Colonial Era & British Raj",
    empires: ["British East India Company rule", "British Raj (Crown rule from 1858)"],
    rulers: ["Robert Clive (Company)", "Lord Dalhousie (Governor-General)", "Queen Victoria (Empress of India, from 1876)"],
    events: ["East India Company gains revenue control of Bengal", "Partition of Bengal (1905) sparks mass protest", "Jallianwala Bagh massacre (1919)", "Direct Crown rule begins after 1857"],
    wars: ["Battle of Plassey (1757)", "Battle of Buxar (1764)", "Anglo-Mysore Wars", "Anglo-Sikh Wars", "Indian Rebellion of 1857"],
  },
  {
    from: 1885, to: 1947,
    era: "Indian Freedom Struggle",
    empires: ["British Raj (under mounting nationalist pressure)"],
    rulers: ["Mahatma Gandhi", "Jawaharlal Nehru", "Subhas Chandra Bose", "Muhammad Ali Jinnah"],
    events: ["Founding of the Indian National Congress (1885)", "Gandhi's Non-Cooperation & Civil Disobedience movements", "Quit India Movement (1942)", "Direct Action Day & the road to Partition (1946)"],
    wars: ["Azad Hind Fauj (INA) campaigns alongside Japan (1943–45)", "Communal violence preceding Partition (1946–47)"],
  },
  {
    from: 1947, to: 2026,
    era: "Independent India",
    empires: ["Republic of India (post-1950)", "Dominion of India (1947–50)"],
    rulers: ["Jawaharlal Nehru (1st PM)", "Indira Gandhi", "Dr. B.R. Ambedkar (chief architect of the Constitution)", "Narendra Modi (current PM)"],
    events: ["Partition of India (15 August 1947)", "Constitution of India adopted (26 January 1950)", "Economic liberalization (1991)", "Rise of India's digital & space economy"],
    wars: ["Indo-Pakistani War of 1947–48", "Sino-Indian War (1962)", "Indo-Pakistani War of 1965", "Indo-Pakistani War of 1971 (Liberation of Bangladesh)", "Kargil War (1999)"],
  },
];

/* ══ STATE HISTORICAL DATA ══ */



/* ══ WAVY TIMELINE — Wikipedia-powered year-by-year snapshot ══ */
(function(){
  const waveWrap=document.getElementById('ytWaveWrap');
  const waveSvg=document.getElementById('ytWaveSvg');
  const yearBubble=document.getElementById('ytYearBubble');
  const yearDisplay=document.getElementById('ytYearDisplay');
  const eraNameEl=document.getElementById('ytEraName');
  const panel=document.getElementById('ytPanel');
  const presetsWrap=document.getElementById('ytPresets');
  if(!waveSvg) return;

  const MIN=-3000, MAX=2026;
  let currentYear=1948;

  // ─── WAVE MATH ─────────────────────────────────────────────────────────────
  const VW=1000, VH=130;      // SVG viewBox — taller than before so curve + labels don't collide
  const WAVE_AMP=16;          // wave amplitude (px in viewBox) — slightly gentler curve
  const WAVE_MID=52;          // curve rides in the upper portion; markers sit in a clear row below
  const WAVE_PERIODS=2;       // fewer cycles = a calmer, easier-to-track wave

  // Compute the y position on the wave for a given x position (0–VW)
  function waveY(x){ return WAVE_MID - WAVE_AMP * Math.sin((x/VW)*WAVE_PERIODS*2*Math.PI); }

  // Map a year to an x position in the SVG viewBox
  function yearToX(y){ return ((y-MIN)/(MAX-MIN))*VW; }
  function xToYear(x){ return Math.round(MIN + (x/VW)*(MAX-MIN)); }

  // Build a smooth SVG path string for the wave
  function buildWavePath(){
    const steps=200;
    let d=`M 0 ${waveY(0).toFixed(2)}`;
    for(let i=1;i<=steps;i++){
      const x=i*(VW/steps);
      d+=` L ${x.toFixed(2)} ${waveY(x).toFixed(2)}`;
    }
    return d;
  }

  // ─── YEAR LABELS (key years on wave) ───────────────────────────────────────
  const MARKER_YEARS=[
    {y:-3000,lbl:'3000 BCE'},
    {y:-2000,lbl:'2000 BCE'},
    {y:-1000,lbl:'1000 BCE'},
    {y:0,lbl:'0'},
    {y:1000,lbl:'1000 CE'},
    {y:1500,lbl:'1500 CE'},
    {y:2000,lbl:'2000 CE'},
    {y:2026,lbl:'TODAY'},
  ];

  // ─── BUILD THE SVG ─────────────────────────────────────────────────────────
  function buildWaveSvg(){
    waveSvg.innerHTML='';

    // Gradient definitions
    const defs=document.createElementNS('http://www.w3.org/2000/svg','defs');
    // Linear gradient for wave stroke
    const grad=document.createElementNS('http://www.w3.org/2000/svg','linearGradient');
    grad.setAttribute('id','waveGrad');grad.setAttribute('x1','0');grad.setAttribute('x2','1');
    const stops=[
      {off:'0%',col:'#C99A4A'},{off:'18%',col:'#DFA840'},{off:'40%',col:'#2EC4B6'},
      {off:'65%',col:'#9B7BE0'},{off:'82%',col:'#E05C42'},{off:'100%',col:'#FF6040'}
    ];
    stops.forEach(s=>{
      const stop=document.createElementNS('http://www.w3.org/2000/svg','stop');
      stop.setAttribute('offset',s.off);stop.setAttribute('stop-color',s.col);
      grad.appendChild(stop);
    });
    defs.appendChild(grad);
    // Glow filter
    const filt=document.createElementNS('http://www.w3.org/2000/svg','filter');
    filt.setAttribute('id','waveGlow');filt.setAttribute('x','-20%');filt.setAttribute('y','-200%');
    filt.setAttribute('width','140%');filt.setAttribute('height','500%');
    const fe=document.createElementNS('http://www.w3.org/2000/svg','feGaussianBlur');
    fe.setAttribute('stdDeviation','2.5');fe.setAttribute('result','blur');
    filt.appendChild(fe);
    defs.appendChild(filt);
    waveSvg.appendChild(defs);

    // Glow path (blurred copy behind)
    const glowPath=document.createElementNS('http://www.w3.org/2000/svg','path');
    glowPath.setAttribute('d',buildWavePath());
    glowPath.setAttribute('fill','none');
    glowPath.setAttribute('stroke','url(#waveGrad)');
    glowPath.setAttribute('stroke-width','5');
    glowPath.setAttribute('opacity','0.4');
    glowPath.setAttribute('filter','url(#waveGlow)');
    waveSvg.appendChild(glowPath);

    // Main wave path
    const mainPath=document.createElementNS('http://www.w3.org/2000/svg','path');
    mainPath.setAttribute('d',buildWavePath());
    mainPath.setAttribute('fill','none');
    mainPath.setAttribute('stroke','url(#waveGrad)');
    mainPath.setAttribute('stroke-width','2.5');
    mainPath.setAttribute('stroke-linecap','round');
    waveSvg.appendChild(mainPath);

    // Year marker dots + connector ticks + labels on a clean fixed baseline (decongested from the curve)
    const LABEL_BASELINE=VH-14;
    MARKER_YEARS.forEach(m=>{
      const mx=yearToX(m.y);
      const my=waveY(mx);
      // dot on the curve itself
      const circle=document.createElementNS('http://www.w3.org/2000/svg','circle');
      circle.setAttribute('cx',mx.toFixed(2));circle.setAttribute('cy',my.toFixed(2));
      circle.setAttribute('r','4');circle.setAttribute('class','yt-wave-dot');
      waveSvg.appendChild(circle);
      // faint connector tick from curve down to the label row
      const tick=document.createElementNS('http://www.w3.org/2000/svg','line');
      tick.setAttribute('x1',mx.toFixed(2));tick.setAttribute('y1',(my+5).toFixed(2));
      tick.setAttribute('x2',mx.toFixed(2));tick.setAttribute('y2',(LABEL_BASELINE-7).toFixed(2));
      tick.setAttribute('stroke','rgba(234,227,213,0.12)');tick.setAttribute('stroke-width','1');
      waveSvg.appendChild(tick);
      // label sits on a single fixed row beneath, never overlapping the curve or each other
      const text=document.createElementNS('http://www.w3.org/2000/svg','text');
      text.setAttribute('x',mx.toFixed(2));text.setAttribute('y',LABEL_BASELINE.toFixed(2));
      text.setAttribute('class','yt-wave-label');
      text.setAttribute('text-anchor','middle');
      text.setAttribute('fill','rgba(173,165,151,0.75)');
      text.setAttribute('font-size','8');
      text.setAttribute('font-family','JetBrains Mono,monospace');
      text.textContent=m.lbl;
      waveSvg.appendChild(text);
    });

    // Draggable node (group, moved by JS)
    const nodeG=document.createElementNS('http://www.w3.org/2000/svg','g');
    nodeG.setAttribute('id','ytWaveNode');nodeG.setAttribute('cursor','grab');
    // outer pulsing halo
    const halo=document.createElementNS('http://www.w3.org/2000/svg','circle');
    halo.setAttribute('r','16');halo.setAttribute('class','yt-node-glow');
    // ring
    const ring=document.createElementNS('http://www.w3.org/2000/svg','circle');
    ring.setAttribute('r','10');ring.setAttribute('class','yt-node-ring');
    // core dot
    const core=document.createElementNS('http://www.w3.org/2000/svg','circle');
    core.setAttribute('r','5');core.setAttribute('class','yt-node-core');
    nodeG.appendChild(halo);nodeG.appendChild(ring);nodeG.appendChild(core);
    waveSvg.appendChild(nodeG);

    // Position the node at current year
    positionNode(currentYear);
  }

  // ─── POSITION NODE + BUBBLE ─────────────────────────────────────────────────
  function positionNode(yr){
    const nodeG=document.getElementById('ytWaveNode');
    if(!nodeG) return;
    const x=yearToX(yr);
    const y=waveY(x);
    nodeG.setAttribute('transform',`translate(${x.toFixed(2)},${y.toFixed(2)})`);

    // Position the year bubble (in pixel space)
    const svgRect=waveSvg.getBoundingClientRect();
    const wrapRect=waveWrap.getBoundingClientRect();
    const svgW=svgRect.width, svgH=svgRect.height;
    const pxX=(x/VW)*svgW;
    const pxY=(y/VH)*svgH;
    const relLeft=svgRect.left-wrapRect.left+pxX;
    const relTop=svgRect.top-wrapRect.top+pxY;
    yearBubble.style.left=relLeft+'px';
    yearBubble.style.top=relTop+'px';
  }

  // ─── PRESETS ────────────────────────────────────────────────────────────────
  const PRESETS=[
    {label:'🦁 Indus Valley',year:-2000},
    {label:'🏛 Mauryan',year:-260},
    {label:'✨ Gupta',year:400},
    {label:'🕌 Delhi Sultanate',year:1300},
    {label:'🌙 Mughal Era',year:1650},
    {label:'🇬🇧 British Raj',year:1850},
    {label:'🇮🇳 Independence',year:1947},
    {label:'🌐 Today',year:2026},
  ];
  PRESETS.forEach(p=>{
    const b=document.createElement('button');
    b.className='yt-preset-btn';
    b.innerHTML=p.label;
    b.addEventListener('click',()=>{ currentYear=p.year; positionNode(currentYear); updateDisplayOnly(currentYear); commitYear(currentYear,true); });
    presetsWrap.appendChild(b);
  });

  // ─── DRAG HANDLING ──────────────────────────────────────────────────────────
  let isDragging=false;

  function xFromEvent(e){
    const rect=waveSvg.getBoundingClientRect();
    const clientX=e.touches?e.touches[0].clientX:e.clientX;
    const ratio=Math.max(0,Math.min(1,(clientX-rect.left)/rect.width));
    return ratio*VW;
  }

  function onDragStart(e){
    isDragging=true;
    waveSvg.style.cursor='grabbing';
    e.preventDefault();
    onDragMove(e);
  }
  function onDragMove(e){
    if(!isDragging)return;
    e.preventDefault();
    const x=xFromEvent(e);
    currentYear=Math.max(MIN,Math.min(MAX,xToYear(x)));
    positionNode(currentYear);
    updateDisplayOnly(currentYear);
    scheduleFetch(currentYear);
  }
  function onDragEnd(){
    isDragging=false;
    waveSvg.style.cursor='';
  }

  waveSvg.addEventListener('mousedown',onDragStart);
  document.addEventListener('mousemove',onDragMove);
  document.addEventListener('mouseup',onDragEnd);
  waveSvg.addEventListener('touchstart',onDragStart,{passive:false});
  document.addEventListener('touchmove',onDragMove,{passive:false});
  document.addEventListener('touchend',onDragEnd);

  // Reposition node on window resize
  window.addEventListener('resize',()=>{ buildWaveSvg(); positionNode(currentYear); },{ passive:true });

  // ─── YEAR LABEL ─────────────────────────────────────────────────────────────
  function yearLabel(y){
    if(y<0) return Math.abs(y)+' BCE';
    if(y===0) return '1 CE';
    if(y>=2026) return 'Present Day';
    return y+' CE';
  }

  function updateDisplayOnly(y){
    const lbl=yearLabel(y);
    yearDisplay.textContent=lbl;
    const theme=applyEraTheme(y);
    eraNameEl.textContent=theme.name;
    // Sync bubble label color to accent
    yearDisplay.style.color='var(--t-accent)';
  }

  // ─── WIKIPEDIA DATA ─────────────────────────────────────────────────────────
  const YEAR_TOPICS=[
    {year:-2600,topic:'Indus Valley Civilisation'},
    {year:-1500,topic:'Vedic period'},
    {year:-900,topic:'Kuru Kingdom'},
    {year:-599,topic:'Mahajanapadas'},
    {year:-563,topic:'Gautama Buddha'},
    {year:-326,topic:'Nanda Empire'},
    {year:-321,topic:'Maurya Empire'},
    {year:-268,topic:'Ashoka'},
    {year:-184,topic:'Shunga Empire'},
    {year:-100,topic:'Indo-Greek Kingdom'},
    {year:30,topic:'Kushan Empire'},
    {year:320,topic:'Gupta Empire'},
    {year:380,topic:'Chandragupta II'},
    {year:606,topic:'Harsha'},
    {year:712,topic:'Umayyad campaigns in India'},
    {year:850,topic:'Chola Empire'},
    {year:985,topic:'Rajaraja I'},
    {year:1024,topic:'Mahmud of Ghazni'},
    {year:1192,topic:'Second Battle of Tarain'},
    {year:1206,topic:'Delhi Sultanate'},
    {year:1290,topic:'Khalji dynasty'},
    {year:1336,topic:'Vijayanagara Empire'},
    {year:1398,topic:"Timur's invasion of India"},
    {year:1498,topic:'Vasco da Gama'},
    {year:1526,topic:'First Battle of Panipat'},
    {year:1556,topic:'Akbar'},
    {year:1600,topic:'East India Company'},
    {year:1632,topic:'Taj Mahal'},
    {year:1658,topic:'Aurangzeb'},
    {year:1674,topic:'Shivaji'},
    {year:1707,topic:'Maratha Empire'},
    {year:1757,topic:'Battle of Plassey'},
    {year:1761,topic:'Third Battle of Panipat'},
    {year:1799,topic:'Siege of Seringapatam'},
    {year:1857,topic:'Indian Rebellion of 1857'},
    {year:1885,topic:'Indian National Congress'},
    {year:1919,topic:'Jallianwala Bagh massacre'},
    {year:1930,topic:'Salt March'},
    {year:1942,topic:'Quit India Movement'},
    {year:1947,topic:'Partition of India'},
    {year:1948,topic:'Assassination of Mahatma Gandhi'},
    {year:1950,topic:'Constitution of India'},
    {year:1962,topic:'Sino-Indian War'},
    {year:1971,topic:'Indo-Pakistani War of 1971'},
    {year:1984,topic:'Operation Blue Star'},
    {year:1991,topic:'Economic liberalisation in India'},
    {year:1999,topic:'Kargil War'},
    {year:2008,topic:'2008 Mumbai attacks'},
    {year:2020,topic:'COVID-19 pandemic in India'},
    {year:2026,topic:'India'}
  ];

  function nearestTopic(y){
    let best=YEAR_TOPICS[0], bestDist=Infinity;
    for(const entry of YEAR_TOPICS){
      const d=Math.abs(entry.year-y);
      if(d<bestDist){bestDist=d;best=entry;}
    }
    return best;
  }
  function searchTermFor(y){
    const exact=YEAR_TOPICS.find(e=>e.year===y);
    if(exact) return{term:exact.topic,exact:true,mappedYear:exact.year};
    const near=nearestTopic(y);
    return{term:near.topic,exact:false,mappedYear:near.year};
  }

  // Get a few nearby topic entries for Related Events / Timeline Cards
  function nearbyTopics(y,count=6){
    const sorted=[...YEAR_TOPICS].sort((a,b)=>Math.abs(a.year-y)-Math.abs(b.year-y));
    return sorted.slice(1,count+1); // exclude the exact match itself
  }

  // ─── SAME-YEAR EVENTS — live Wikipedia search for *other* things that happened in this exact year ──
  // The curated YEAR_TOPICS list only holds one headline topic per year. To answer "what ELSE happened
  // this year", we search Wikipedia directly for the year string + India-history context, then filter
  // out whatever the headline topic already is.
  const _sameYearCache={};
  function yearSearchString(y){
    if(y<0) return Math.abs(y)+' BCE';
    return String(y);
  }
  async function fetchSameYearEvents(y,excludeTitle){
    if(_sameYearCache[y]) return _sameYearCache[y];
    const yrStr=yearSearchString(y);
    const queries=[yrStr+' India history',yrStr+' India'];
    const results=await Promise.all(queries.map(q=>
      wF({action:'query',list:'search',srsearch:q,srlimit:10}).catch(()=>({query:{search:[]}}))
    ));
    let hits=results.flatMap(r=>r.query?.search||[]);
    const seen=new Set();
    hits=hits.filter(h=>{
      if(BLOCK.test(h.title)||BLOCK.test(h.snippet||''))return false;
      if(excludeTitle&&h.title.toLowerCase()===excludeTitle.toLowerCase())return false;
      if(/list of|index of|disambiguation/i.test(h.title))return false;
      const k=h.title.toLowerCase();
      if(seen.has(k))return false;seen.add(k);return true;
    });
    // prefer hits whose snippet actually mentions the year, then by history relevance
    hits.sort((a,b)=>{
      const aYr=(a.snippet||'').includes(yrStr)?1:0, bYr=(b.snippet||'').includes(yrStr)?1:0;
      if(aYr!==bYr)return bYr-aYr;
      const aH=HIST_BOOST.test(a.title+' '+(a.snippet||''))?1:0, bH=HIST_BOOST.test(b.title+' '+(b.snippet||''))?1:0;
      return bH-aH;
    });
    const top=hits.slice(0,5).map(h=>({
      title:h.title,
      snippet:(h.snippet||'').replace(/<[^>]+>/g,'').replace(/\s*\([^)]*\)/g,'').trim()
    }));
    _sameYearCache[y]=top;
    return top;
  }

  const REST='https://en.wikipedia.org/api/rest_v1/page/summary/';
  async function fetchWikiSummary(title){
    const r=await fetch(REST+encodeURIComponent(title.replace(/ /g,'_')),{headers:{Accept:'application/json'}});
    if(!r.ok)throw new Error('Wiki error '+r.status);
    const d=await r.json();
    if(d.type&&/disambiguation/i.test(d.type)) throw new Error('Disambiguation');
    return d;
  }
  async function resolveSummary(term){
    try{ return await fetchWikiSummary(term); }
    catch(e){
      if(typeof smartSearch==='function'){
        const hits=await smartSearch(term);
        if(hits&&hits.length) return await fetchWikiSummary(hits[0].title);
      }
      throw e;
    }
  }

  // ─── TEXT EXTRACTION HELPERS ─────────────────────────────────────────────────
  function buildQuickSummary(paras){
    const lead=(paras[0]||'');
    const sentences=lead.split(/(?<=[.!?])\s+/).filter(s=>s.trim().length>0);
    return sentences.slice(0,3).join(' ').replace(/\s*\([^)]*\)/g,'').trim();
  }
  function buildKeyPoints(paras){
    const sentences=paras.join(' ').split(/(?<=[.!?])\s+/)
      .map(s=>s.replace(/\s*\([^)]*\)/g,'').trim())
      .filter(s=>s.length>15&&s.length<170);
    const seen=new Set();
    const scored=sentences.filter(s=>{
      const k=s.toLowerCase().slice(0,40);
      if(seen.has(k))return false;seen.add(k);return true;
    }).map(s=>{
      let score=0;
      if(/\b\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\b/i.test(s))score+=4;
      if(/\b\d{3,4}\s*(BCE|CE)?\b/.test(s))score+=3;
      if(/[A-Z][a-z]+\s[A-Z][a-z]+/.test(s))score+=2;
      if(/\b(was|were|became|founded|died|killed|signed|declared|defeated|captured|built|ruled)\b/i.test(s))score+=1;
      if(s.length<110)score+=1;
      return{s,score};
    });
    scored.sort((a,b)=>b.score-a.score);
    return scored.slice(0,6).map(x=>x.s);
  }
  function buildImportantDates(paras,fallbackYear){
    const sentences=paras.join(' ').split(/(?<=[.!?])\s+/).map(s=>s.trim()).filter(Boolean);
    const MONTH_RX='(January|February|March|April|May|June|July|August|September|October|November|December)';
    const dateRx=new RegExp('\\b'+MONTH_RX+'\\s+\\d{1,2},?\\s+(\\d{3,4})\\b|\\b\\d{1,2}\\s+'+MONTH_RX+'\\s+(\\d{3,4})\\b|\\b(\\d{3,4})\\s*(BCE)\\b|\\b(1[0-9]{3}|20[0-2][0-9])\\b','gi');
    const found=[];
    sentences.forEach(sent=>{
      let m;dateRx.lastIndex=0;
      while((m=dateRx.exec(sent))){
        const yrStr=[m[2],m[4],m[5],m[7]].find(g=>g&&/^\d+$/.test(g));
        if(!yrStr)continue;
        const isBce=!!m[6];
        const yearNum=isBce?-parseInt(yrStr):parseInt(yrStr);
        found.push({year:yearNum,label:isBce?Math.abs(yearNum)+' BCE':yearNum+'',snippet:sent.replace(/\s*\([^)]*\)/g,'').trim()});
      }
    });
    const byYear={};
    found.forEach(f=>{if(!byYear[f.year]||f.snippet.length<byYear[f.year].snippet.length)byYear[f.year]=f;});
    let list=Object.values(byYear).sort((a,b)=>a.year-b.year);
    if(fallbackYear!=null)list.sort((a,b)=>Math.abs(a.year-fallbackYear)-Math.abs(b.year-fallbackYear));
    list=list.slice(0,6).sort((a,b)=>a.year-b.year);
    return list.map(f=>({label:f.label,text:f.snippet.length>90?f.snippet.slice(0,87)+'…':f.snippet})).filter(d=>d.text.length>3);
  }
  function buildWhyItMatters(paras){
    const n=paras.length;
    const laterParas=n>2?paras.slice(Math.ceil(n*0.5)):paras;
    const sentences=laterParas.join(' ').split(/(?<=[.!?])\s+/)
      .map(s=>s.replace(/\s*\([^)]*\)/g,'').trim())
      .filter(s=>s.length>20&&s.length<180);
    const IMPACT_RX=/\b(led to|resulted in|became|marked|considered|regarded|significant|legacy|paved the way|turning point|consequence|impact|changed|established|remembered|symbol of|inspired|triggered|caused)\b/i;
    let picks=sentences.filter(s=>IMPACT_RX.test(s));
    if(picks.length<2) picks=sentences.slice(-4);
    return picks.slice(0,3);
  }

  // ─── CACHE + FETCH ─────────────────────────────────────────────────────────
  const _snapCache={};
  let _snapToken=0,_pendingYear=null,_debounceTimer=null;

  async function fetchSnap(y){
    if(_snapCache[y]) return _snapCache[y];
    const{term,exact,mappedYear}=searchTermFor(y);
    for(let attempt=0;attempt<2;attempt++){
      try{
        const d=await resolveSummary(term);
        const resolvedTitle=d.title||term;
        const[fullExtract,links,sameYear]=await Promise.all([
          (typeof getExtract==='function'?getExtract(resolvedTitle):Promise.resolve(d.extract||'')).catch(()=>d.extract||''),
          (typeof getLinks==='function'?getLinks(resolvedTitle):Promise.resolve([])).catch(()=>[]),
          fetchSameYearEvents(exact?mappedYear:y,resolvedTitle).catch(()=>[])
        ]);
        const rawText=fullExtract||d.extract||'';
        const paras=rawText.split('\n').map(p=>p.trim()).filter(p=>p.length>20);
        const safeParas=paras.length?paras:[d.extract||''];
        const snap={
          title:resolvedTitle,
          summary:buildQuickSummary(safeParas)||(d.extract||'').split(/(?<=[.!?])\s+/).slice(0,2).join(' ')||'No summary available.',
          keyPoints:buildKeyPoints(safeParas),
          dates:buildImportantDates(safeParas,exact?mappedYear:y),
          figures:(typeof figNames==='function'?figNames(links):[]),
          impact:buildWhyItMatters(safeParas),
          thumb:d.thumbnail?.source||null,
          url:d.content_urls?.desktop?.page||('https://en.wikipedia.org/wiki/'+encodeURIComponent(resolvedTitle.replace(/ /g,'_'))),
          exact,mappedYear,
          nearbyTopics:nearbyTopics(y,6),
          sameYearEvents:sameYear
        };
        _snapCache[y]=snap;
        return snap;
      }catch(e){
        if(attempt===0) await new Promise(res=>setTimeout(res,400));
        else throw e;
      }
    }
  }

  // ─── SVG ICONS ───────────────────────────────────────────────────────────────
  const SICO_KP=`<svg viewBox="0 0 16 16" fill="none" class="sico"><circle cx="8" cy="8" r="6.5" stroke="#DFA840" stroke-width="1.4"/><line x1="8" y1="5" x2="8" y2="8" stroke="#DFA840" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="10.5" r=".9" fill="#DFA840"/></svg>`;
  const SICO_DT=`<svg viewBox="0 0 16 16" fill="none" class="sico"><rect x="1.5" y="3" width="13" height="11" rx="2" stroke="#2EC4B6" stroke-width="1.3"/><line x1="1.5" y1="6.5" x2="14.5" y2="6.5" stroke="#2EC4B6" stroke-width="1.3"/><line x1="5" y1="1.5" x2="5" y2="4.5" stroke="#2EC4B6" stroke-width="1.3" stroke-linecap="round"/><line x1="11" y1="1.5" x2="11" y2="4.5" stroke="#2EC4B6" stroke-width="1.3" stroke-linecap="round"/></svg>`;
  const SICO_FG=`<svg viewBox="0 0 16 16" fill="none" class="sico"><circle cx="8" cy="5.5" r="3" stroke="#DFA840" stroke-width="1.3"/><path d="M2 13.5c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" stroke="#DFA840" stroke-width="1.3" stroke-linecap="round"/></svg>`;
  const SICO_WM=`<svg viewBox="0 0 16 16" fill="none" class="sico"><path d="M8 2l1.8 5.4H15l-4.6 3.3 1.7 5.3L8 13l-4.1 3 1.7-5.3L1 7.4h5.2z" stroke="#E05C42" stroke-width="1.3" stroke-linejoin="round"/></svg>`;
  const SICO_RE=`<svg viewBox="0 0 16 16" fill="none" class="sico"><circle cx="8" cy="8" r="3" stroke="#9B7BE0" stroke-width="1.3"/><circle cx="2" cy="3" r="1.5" stroke="#9B7BE0" stroke-width="1.1"/><circle cx="14" cy="3" r="1.5" stroke="#9B7BE0" stroke-width="1.1"/><circle cx="2" cy="13" r="1.5" stroke="#9B7BE0" stroke-width="1.1"/><circle cx="14" cy="13" r="1.5" stroke="#9B7BE0" stroke-width="1.1"/><line x1="3.1" y1="4.1" x2="5.9" y2="6.4" stroke="#9B7BE0" stroke-width="1"/><line x1="10.1" y1="6.4" x2="12.9" y2="4.1" stroke="#9B7BE0" stroke-width="1"/><line x1="3.1" y1="11.9" x2="5.9" y2="9.6" stroke="#9B7BE0" stroke-width="1"/><line x1="10.1" y1="9.6" x2="12.9" y2="11.9" stroke="#9B7BE0" stroke-width="1"/></svg>`;
  const SICO_TL=`<svg viewBox="0 0 16 16" fill="none" class="sico"><path d="M2 8h12M2 4l3 4-3 4" stroke="#2EC4B6" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  // ─── RENDER ────────────────────────────────────────────────────────────────
  function showLoading(y){
    panel.innerHTML=`<div class="yt-snap-loading">
      <span class="ck spin" style="width:1.3rem;height:1.3rem;color:var(--t-accent);display:inline-block;vertical-align:middle;flex-shrink:0;">
        <svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="44" stroke="currentColor" stroke-width="9"/></svg>
      </span>
      <span style="margin-left:.8rem;font-family:'JetBrains Mono',monospace;font-size:.82rem;color:var(--bone-d);">Consulting Wikipedia for <strong style="color:var(--t-accent)">${escH(yearLabel(y))}</strong>…</span>
    </div>`;
  }

  function renderSnap(snap,y){
    const lbl=yearLabel(y);

    const approxHtml=(!snap.exact)?`<div class="yt-snap-approx">📍 Nearest documented era — ${escH(yearLabel(snap.mappedYear))}</div>`:'';
    const thumbHtml=snap.thumb?`<img class="yt-snap-thumb" src="${escH(snap.thumb)}" alt="${escH(snap.title)}" loading="lazy">`:'';

    // "More events this year" corner badge — only shown if we actually found other distinct events
    const sameYear=(snap.sameYearEvents||[]).filter(e=>e.title);
    const sameYearBadgeHtml=sameYear.length?`
      <button type="button" class="yt-sameyear-badge" id="ytSameYearBadge">
        <span class="car">▸</span> ${sameYear.length} more event${sameYear.length>1?'s':''} in ${escH(lbl)}
      </button>`:'';
    const sameYearDrawerHtml=`
      <div class="yt-sameyear-drawer" id="ytSameYearDrawer">
        <div class="yt-sameyear-drawer-head">Also happened in ${escH(lbl)}</div>
        <div class="yt-sameyear-list">
          ${sameYear.length?sameYear.map(e=>`
            <div class="yt-sameyear-item">
              <div class="yt-sameyear-info">
                <div class="yt-sameyear-title">${escH(e.title)}</div>
                <div class="yt-sameyear-snippet">${escH(e.snippet||'')}</div>
              </div>
              <button class="yt-card-btn" data-topic="${escH(e.title)}" style="flex-shrink:0;">View</button>
            </div>`).join(''):`<div class="yt-sameyear-empty">No other distinctly documented events surfaced for this exact year — try the Related Events below for the surrounding period.</div>`}
        </div>
      </div>`;

    // Key Points box
    const kpHtml=snap.keyPoints.length?`
      <div class="yt-sec-box">
        <div class="yt-sec-box-head">${SICO_KP}<h4>Key Points</h4></div>
        <ul class="yt-points">${snap.keyPoints.map(p=>`<li>${escH(p)}</li>`).join('')}</ul>
      </div>`:'';

    // Important Dates box
    const dtHtml=snap.dates.length?`
      <div class="yt-sec-box">
        <div class="yt-sec-box-head">${SICO_DT}<h4>Important Dates</h4></div>
        <ul class="yt-dates">${snap.dates.map(d=>`<li><span class="yt-date-yr">${escH(d.label)}</span><span>${escH(d.text)}</span></li>`).join('')}</ul>
      </div>`:'';

    // Key Figures box
    const fgHtml=snap.figures.length?`
      <div class="yt-sec-box">
        <div class="yt-sec-box-head">${SICO_FG}<h4>Key Figures</h4></div>
        <div class="yt-figs">${snap.figures.map(f=>`<span class="yt-fig-chip">👤 ${escH(f)}</span>`).join('')}</div>
      </div>`:'';

    // Why It Matters (full width)
    const wmHtml=snap.impact.length?`
      <div class="yt-matters-box">
        <div class="yt-sec-box-head">${SICO_WM}<h4>Why It Matters</h4></div>
        <ul class="yt-impact">${snap.impact.map(i=>`<li>${escH(i)}</li>`).join('')}</ul>
      </div>`:'';

    // Related Events around this period
    const relHtml=snap.nearbyTopics.length?`
      <div class="yt-related-section">
        <div class="yt-related-head">${SICO_RE} Related Events Around This Period</div>
        <div class="yt-related-list">
          ${snap.nearbyTopics.map(t=>{
            const yrLbl=t.year<0?Math.abs(t.year)+' BCE':(t.year===0?'1 CE':t.year+' CE');
            return `<div class="yt-related-item">
              <div class="yt-related-yr">${escH(yrLbl)}</div>
              <div class="yt-related-info">
                <div class="yt-related-title">${escH(t.topic)}</div>
                <div class="yt-related-desc">Click "View" to explore this event →</div>
              </div>
              <button class="yt-card-btn" data-topic="${escH(t.topic)}" style="margin-left:auto;align-self:center;flex-shrink:0;">View</button>
            </div>`;
          }).join('')}
        </div>
      </div>`:'';

    // Scrollable Timeline Cards (same nearby events but card style)
    const cardsHtml=snap.nearbyTopics.length?`
      <div class="yt-cards-section">
        <div class="yt-cards-head">${SICO_TL} More Important Events Around This Period</div>
        <div class="yt-cards-scroll">
          ${snap.nearbyTopics.map(t=>{
            const yrLbl=t.year<0?Math.abs(t.year)+' BCE':(t.year===0?'1 CE':t.year+' CE');
            return `<div class="yt-card">
              <div class="yt-card-date">${escH(yrLbl)}</div>
              <div class="yt-card-title">${escH(t.topic)}</div>
              <div class="yt-card-desc">A pivotal moment in India's history — explore the full account from Wikipedia.</div>
              <button class="yt-card-btn" data-topic="${escH(t.topic)}">View ↗</button>
            </div>`;
          }).join('')}
        </div>
      </div>`:'';

    panel.innerHTML=`
      <div class="yt-snap-wrap">
        ${approxHtml}
        <!-- 1. HEADLINE + IMAGE, side by side (image docked right) -->
        <div class="yt-snap-top">
          <div class="yt-snap-headline">
            <div class="yt-snap-year-tag">${escH(lbl)}${sameYearBadgeHtml}</div>
            <div class="yt-snap-headline-text">${escH(snap.title)}</div>
          </div>
          ${thumbHtml}
        </div>

        <!-- expandable "more events this year" drawer -->
        ${sameYearDrawerHtml}

        <!-- 2. SHORT SUMMARY -->
        <div class="yt-snap-context">${escH(snap.summary)}</div>

        <!-- 3/4/5. KEY POINTS, DATES, FIGURES – 3-column grid -->
        <div class="yt-snap-3col">
          ${kpHtml}${dtHtml}${fgHtml}
        </div>

        <!-- 6. WHY IT MATTERS -->
        ${wmHtml}

        <!-- 7. RELATED EVENTS -->
        ${relHtml}

        <!-- 8. SCROLLABLE TIMELINE CARDS -->
        ${cardsHtml}

        <!-- ACTIONS -->
        <div class="yt-snap-actions">
          <a class="yt-snap-readmore" href="${escH(snap.url)}" target="_blank" rel="noopener">📖 Read more on Wikipedia ↗</a>
          <button class="yt-explore-btn" id="ytExploreBtn">Explore ${escH(snap.title)} in depth →</button>
        </div>
      </div>`;

    // Toggle the same-year drawer
    const syBadge=document.getElementById('ytSameYearBadge');
    const syDrawer=document.getElementById('ytSameYearDrawer');
    if(syBadge&&syDrawer){
      syBadge.addEventListener('click',()=>{
        const isOpen=syDrawer.classList.toggle('open');
        syBadge.classList.toggle('open',isOpen);
      });
    }

    // Wire up all "View" buttons
    panel.querySelectorAll('[data-topic]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const topic=btn.dataset.topic;
        if(typeof selectMode==='function'){
          selectMode('topic');
          const qi=document.getElementById('queryInput');
          if(qi) qi.value=topic;
          document.getElementById('gateway-sec').scrollIntoView({behavior:'smooth',block:'start'});
          setTimeout(()=>{ if(typeof runQuery==='function') runQuery(topic); },350);
        }
      });
    });

    const exploreBtn=document.getElementById('ytExploreBtn');
    if(exploreBtn){
      const topic=snap.title;
      exploreBtn.addEventListener('click',()=>{
        if(typeof selectMode==='function'){
          selectMode('era');
          const qi=document.getElementById('queryInput');
          if(qi) qi.value=topic;
          document.getElementById('gateway-sec').scrollIntoView({behavior:'smooth',block:'start'});
          setTimeout(()=>{ if(typeof runQuery==='function') runQuery(topic); },350);
        }
      });
    }
  }

  // ─── COMMIT + DEBOUNCE ───────────────────────────────────────────────────────
  function renderLocalFallback(y){
    const picked=searchTermFor(y);
    const wikiUrl='https://en.wikipedia.org/wiki/'+encodeURIComponent(picked.term.replace(/ /g,'_'));
    const fallback={
      title:picked.term,
      summary:'Live article details are temporarily unavailable. The local year index still points to '+yearLabel(picked.mappedYear)+': '+picked.term+'.',
      keyPoints:[],dates:[],figures:[],impact:[],thumb:null,url:wikiUrl,
      exact:picked.exact,mappedYear:picked.mappedYear,
      nearbyTopics:nearbyTopics(y,6),sameYearEvents:[]
    };
    renderSnap(fallback,y);
    const notice=document.createElement('div');
    notice.className='yt-snap-fallback';
    notice.innerHTML='<span>Live research did not respond. The local year index and nearby topic links are still available.</span><button type="button" id="ytRetryLive">Retry live research</button>';
    panel.querySelector('.yt-snap-wrap')?.prepend(notice);
    panel.querySelector('#ytRetryLive')?.addEventListener('click',()=>commitYear(y,true));
  }

  async function commitYear(yRaw,scrollTo){
    const y=parseInt(yRaw,10);
    clearTimeout(_debounceTimer);
    _debounceTimer=null;
    const myToken=++_snapToken;
    if(_snapCache[y]){
      renderSnap(_snapCache[y],y);
      if(scrollTo) panel.scrollIntoView({behavior:'smooth',block:'nearest'});
      return;
    }
    showLoading(y);
    let timer=setTimeout(()=>{
      if(myToken===_snapToken)renderLocalFallback(y);
    },8500);
    try{
      const snap=await fetchSnap(y);
      clearTimeout(timer);
      if(myToken!==_snapToken)return;
      renderSnap(snap,y);
      if(scrollTo) panel.scrollIntoView({behavior:'smooth',block:'nearest'});
    }catch(err){
      clearTimeout(timer);
      if(myToken!==_snapToken)return;
      renderLocalFallback(y);
      if(scrollTo) panel.scrollIntoView({behavior:'smooth',block:'nearest'});
    }
  }

  function scheduleFetch(y){
    _pendingYear=y;
    clearTimeout(_debounceTimer);
    ++_snapToken;
    _debounceTimer=setTimeout(()=>commitYear(_pendingYear,false),650);
  }

  // Shared controls let the bottom navigator and the wavy timeline use the same year state.
  window.chronicleSetYear=function(raw){
    const y=parseInt(raw,10);
    if(!Number.isFinite(y))return;
    currentYear=Math.max(MIN,Math.min(MAX,y));
    positionNode(currentYear);
    updateDisplayOnly(currentYear);
    scheduleFetch(currentYear);
  };
  window.chronicleCommitYear=function(raw,scrollTo){
    const y=parseInt(raw,10);
    if(!Number.isFinite(y))return;
    currentYear=Math.max(MIN,Math.min(MAX,y));
    positionNode(currentYear);
    updateDisplayOnly(currentYear);
    commitYear(currentYear,!!scrollTo);
  };

  // ─── INIT ──────────────────────────────────────────────────────────────────
  buildWaveSvg();
  updateDisplayOnly(currentYear);
  // small delay so SVG is painted and getBoundingClientRect works
  requestAnimationFrame(()=>{ positionNode(currentYear); commitYear(currentYear,false); });
})();



/* ══ GATEWAY ══ */
const gwCards=document.querySelectorAll('.gw-card');
const searchPanel=document.getElementById('searchPanel');
const panelLabel=document.getElementById('panelLabel');
const queryInput=document.getElementById('queryInput');
const goBtn=document.getElementById('goBtn');
const resultArea=document.getElementById('resultArea');
const chipRow=document.getElementById('chipRow');
let mode=null;
const MODE={
  era:{label:'🏛 Era Explorer — type an era, dynasty, or age',placeholder:'e.g. Gupta Empire, Delhi Sultanate, Maratha Empire…',chips:['Maurya Empire','Gupta Empire','Delhi Sultanate','Mughal Empire','Maratha Empire','Vijayanagara Empire','Indian Freedom Struggle','Indus Valley Civilization','Vedic Period','Chola Dynasty','British Raj','Independent India']},
  topic:{label:'📜 Topic Search — any person, event, place, or concept',placeholder:'e.g. Chandragupta Maurya, Battle of Panipat, Quit India Movement…',chips:['Chandragupta Maurya','Battle of Plassey','Ashoka the Great','Mahatma Gandhi','Rani Lakshmibai','Bhagat Singh','Taj Mahal','Nalanda University','Battle of the Ten Kings','Akbar','Shivaji Maharaj','Subhas Chandra Bose','Battle of Panipat','Tipu Sultan','Jallianwala Bagh','Quit India Movement']},
  date:{label:'📅 Date Lookup — enter a date with or without year',placeholder:'e.g. 15 August 1947, 23 March 1931, or just 1857…',chips:['15 August 1947','26 January 1950','23 March 1931','13 April 1919','1857','Today','1526','1761','1947','1942','9 August 1925']},
  notes:{label:'📋 Short Notes — get any topic as quick bullet points',placeholder:'e.g. Mughal Empire, Battle of Plassey, Mahatma Gandhi…',chips:['Mughal Empire','Battle of Plassey','Mahatma Gandhi','Maurya Empire','Indian Independence Movement','Akbar','Shivaji Maharaj']}
};
function shuffleSlice(arr,n){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a.slice(0,n);}
function selectMode(m){
  mode=m;
  gwCards.forEach(c=>c.classList.toggle('active',c.dataset.mode===m));
  const info=MODE[m];
  panelLabel.textContent=info.label;
  queryInput.placeholder=info.placeholder;
  const shownChips=shuffleSlice(info.chips,7);
  chipRow.innerHTML=shownChips.map(c=>`<button class="chip" type="button">${c}</button>`).join('');
  chipRow.querySelectorAll('.chip').forEach(chip=>{chip.addEventListener('click',()=>{queryInput.value=chip.textContent;runQuery(chip.textContent);});});
  searchPanel.classList.add('visible');
  setTimeout(()=>queryInput.focus(),50);
}
// Only cards with a data-mode attribute use the shared search panel (era/topic/date/notes).
// Guess Mode and Discovery Mode are standalone features wired separately below.
gwCards.forEach(c=>{
  if(!c.dataset.mode) return;
  c.addEventListener('click',()=>{selectMode(c.dataset.mode);searchPanel.scrollIntoView({behavior:'smooth',block:'nearest'});});
});
goBtn.addEventListener('click',()=>runQuery(queryInput.value));
queryInput.addEventListener('keydown',e=>{
  const sugBox=document.getElementById('searchSuggestions');
  const items=[...sugBox.querySelectorAll('.search-sugg-item')];
  let activeIdx=items.findIndex(i=>i.classList.contains('is-active'));
  if(e.key==='ArrowDown'&&items.length){
    e.preventDefault();
    activeIdx=(activeIdx+1)%items.length;
    items.forEach((it,i)=>it.classList.toggle('is-active',i===activeIdx));
    items[activeIdx].scrollIntoView({block:'nearest'});
    return;
  }
  if(e.key==='ArrowUp'&&items.length){
    e.preventDefault();
    activeIdx=activeIdx<=0?items.length-1:activeIdx-1;
    items.forEach((it,i)=>it.classList.toggle('is-active',i===activeIdx));
    items[activeIdx].scrollIntoView({block:'nearest'});
    return;
  }
  if(e.key==='Enter'){
    if(activeIdx>=0&&items[activeIdx]){ queryInput.value=items[activeIdx].textContent; hideSuggestions(); }
    runQuery(queryInput.value);
    return;
  }
  if(e.key==='Escape'){ hideSuggestions(); }
});
function hideSuggestions(){
  const box=document.getElementById('searchSuggestions');
  box.classList.remove('show'); box.innerHTML='';
  queryInput.setAttribute('aria-expanded','false');
}
/* ── LIVE SEARCH SUGGESTIONS ── debounced opensearch lookup; only active for free-text modes. */
let _suggestDebounce=null,_suggestAbort=null;
queryInput.addEventListener('input',()=>{
  clearTimeout(_suggestDebounce);
  if(_suggestAbort)_suggestAbort.abort();
  const val=queryInput.value.trim();
  if((mode!=='topic'&&mode!=='notes')||val.length<2){ hideSuggestions(); return; }
  _suggestDebounce=setTimeout(async()=>{
    const ctrl=new AbortController(); _suggestAbort=ctrl;
    try{
      const d=await wF({action:'opensearch',search:val,limit:6,namespace:0},ctrl.signal);
      const list=(d&&d[1])||[];
      const box=document.getElementById('searchSuggestions');
      if(!list.length){ hideSuggestions(); return; }
      box.innerHTML=list.map(s=>`<div class="search-sugg-item" role="option">${escH(s)}</div>`).join('');
      box.classList.add('show');
      queryInput.setAttribute('aria-expanded','true');
      box.querySelectorAll('.search-sugg-item').forEach(item=>{
        item.addEventListener('mousedown',(e)=>{ e.preventDefault(); queryInput.value=item.textContent; hideSuggestions(); runQuery(item.textContent); });
      });
    }catch(e){ /* aborted or failed — just leave suggestions empty, no error needed */ }
  },300);
});
document.addEventListener('click',(e)=>{
  if(!e.target.closest('.sp-row')) hideSuggestions();
});

/* ══ WIKIPEDIA ENGINE ══ */
const WAPI="https://en.wikipedia.org/w/api.php";
const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
const BLOCK=/\b(TV series|television series|serial|soap opera|\bfilm\b|web series|drama series|Indian television|Colors TV|Star Plus|Zee TV|Sony TV|season \d|episode|fictional character|anime|manga|comic book)\b/i;
const HIST_BOOST=/\b(emperor|king|queen|empress|empire|battle|war|dynasty|maharaja|sultan|treaty|movement|independence|revolt|civilization|republic|governance|ruler|reign|kingdom|general|conquest|rebellion|freedom fighter|statesman|philosopher|mathematician|poet|architect|temple|fort|fortress|mausoleum|tomb|palace|minar|minaret|stupa|monastery|monument|citadel|gopuram|step.?well|baori|gateway|shrine|sanctuary|gurudwara|mosque|cenotaph|chhatri|haveli|world heritage|architecture|carving|dome|UNESCO)\b/i;

/* ── SAFE STORAGE WRAPPER ── localStorage can throw (private mode, quota, disabled) — never let
   a storage failure break the app. Used by caching, favorites, streaks, and reading-depth prefs. */
const safeStore={
  get(key,fallback){ try{ const v=localStorage.getItem(key); return v==null?fallback:JSON.parse(v); }catch{ return fallback; } },
  set(key,val){ try{ localStorage.setItem(key,JSON.stringify(val)); return true; }catch{ return false; } },
  remove(key){ try{ localStorage.removeItem(key); }catch{} }
};

/* ── DOSSIER CACHE ── in-memory + localStorage, so re-searching a topic doesn't re-hit Wikipedia.
   Memory cache is instant for the current tab; localStorage survives a refresh. */
const DOSSIER_CACHE_KEY='bharatDossierCache';
const DOSSIER_CACHE_MAX=40; // cap entries so localStorage doesn't grow unbounded
const _dossierMemCache=new Map();
function _loadDossierDiskCache(){ return safeStore.get(DOSSIER_CACHE_KEY,{}); }
function getCachedDossier(title){
  const key=title.toLowerCase();
  if(_dossierMemCache.has(key)) return _dossierMemCache.get(key);
  const disk=_loadDossierDiskCache();
  if(disk[key]){ _dossierMemCache.set(key,disk[key].data); return disk[key].data; }
  return null;
}
function setCachedDossier(title,data){
  const key=title.toLowerCase();
  _dossierMemCache.set(key,data);
  const disk=_loadDossierDiskCache();
  disk[key]={data,t:Date.now()};
  // trim oldest entries beyond the cap
  const entries=Object.entries(disk).sort((a,b)=>b[1].t-a[1].t);
  const trimmed=Object.fromEntries(entries.slice(0,DOSSIER_CACHE_MAX));
  safeStore.set(DOSSIER_CACHE_KEY,trimmed);
}

/* ── LAST-GOOD RESULT (offline fallback) ── remembers the most recently *successful* dossier
   per query string (not just per resolved title) so a failed re-fetch can still show something. */
const LAST_GOOD_KEY='bharatLastGoodByQuery';
function rememberLastGood(query,data){
  const m=safeStore.get(LAST_GOOD_KEY,{});
  m[query.toLowerCase()]={data,t:Date.now()};
  safeStore.set(LAST_GOOD_KEY,m);
}
function getLastGood(query){
  const m=safeStore.get(LAST_GOOD_KEY,{});
  return m[query.toLowerCase()]?.data||null;
}

function wU(p){return WAPI+'?'+new URLSearchParams({format:'json',origin:'*',...p});}
async function wF(p,signal){
  const r=await fetch(wU(p),signal?{signal}:undefined);
  if(!r.ok)throw new Error('Wikipedia error '+r.status);
  return r.json();
}
async function smartSearch(q,signal){
  // Run three query variants in parallel: plain (most reliable), India-biased, and history-biased.
  // The plain query is critical — biasing too hard can return ZERO results for valid topics.
  const [rPlain,rIndia,rHist]=await Promise.all([
    wF({action:'query',list:'search',srsearch:q,srlimit:10},signal).catch(()=>({query:{search:[]}})),
    wF({action:'query',list:'search',srsearch:q+' India',srlimit:8},signal).catch(()=>({query:{search:[]}})),
    wF({action:'query',list:'search',srsearch:q+' history',srlimit:8},signal).catch(()=>({query:{search:[]}}))
  ]);
  let hits=[...(rPlain.query?.search||[]),...(rIndia.query?.search||[]),...(rHist.query?.search||[])];
  const seen=new Set();hits=hits.filter(h=>{if(seen.has(h.title))return false;seen.add(h.title);return true;});

  // word-overlap helper: how many of the query's significant words appear in the hit title
  const qWords=q.toLowerCase().replace(/[^\w\s]/g,' ').split(/\s+/).filter(w=>w.length>2);

  function score(h){
    const titleLower=h.title.toLowerCase();
    const txt=h.title+' '+(h.snippet||'');
    if(BLOCK.test(h.title)||BLOCK.test(h.snippet||''))return -999;

    // Title overlap is the PRIMARY signal — does the title actually match what was searched?
    let titleOverlap=0;
    qWords.forEach(w=>{ if(titleLower.includes(w)) titleOverlap++; });
    const overlapRatio=qWords.length?titleOverlap/qWords.length:0;
    const exactMatch=titleLower===q.toLowerCase();
    const startsWithQuery=titleLower.startsWith(q.toLowerCase());

    let s=0;
    if(exactMatch)s+=100000;
    else if(startsWithQuery)s+=50000;
    s+=overlapRatio*20000; // dominant factor — this is what stops generic long pages from winning

    // wordcount is now only a tiny tiebreaker, capped, never able to dominate the overlap score
    s+=Math.min(h.wordcount||0,3000)*0.01;

    if(HIST_BOOST.test(txt))s+=800;
    if(/india/i.test(txt)&&overlapRatio>0)s+=400; // India-relevance only counts once title already matches
    if(/may refer to|disambiguation/i.test(h.snippet||''))s-=5000;

    // No title overlap at all = heavy penalty. This is what stops "India" from beating "Rowlatt Act".
    if(overlapRatio===0)s-=8000;

    return s;
  }
  hits.sort((a,b)=>score(b)-score(a));
  const filtered=hits.filter(h=>score(h)>-100);
  if(!filtered.length){
    // last-ditch: if even the plain search found nothing useful, try the raw plain hits unfiltered
    const rawPlain=(rPlain.query?.search||[]).filter(h=>!BLOCK.test(h.title));
    if(rawPlain.length) return rawPlain;
    // Surface close-but-rejected hits as "did you mean" suggestions rather than a dead-end message
    const nearMisses=hits.slice(0,3).map(h=>h.title);
    const err=new Error(
      nearMisses.length
        ? `No historical entry found for "${q}". Did you mean: ${nearMisses.join(', ')}?`
        : `No historical entry found for "${q}". Try a different spelling, or add a year — e.g. "${q} 1757".`
    );
    err.suggestions=nearMisses;
    throw err;
  }
  return filtered;
}
async function getExtract(title,signal){
  const d=await wF({action:'query',prop:'extracts',explaintext:1,titles:title,redirects:1},signal);
  return Object.values(d.query?.pages||{})[0]?.extract||'';
}
async function getThumb(title,signal){
  try{
    const d=await wF({action:'query',prop:'pageimages',piprop:'thumbnail',pithumbsize:600,titles:title,redirects:1},signal);
    const src=Object.values(d.query?.pages||{})[0]?.thumbnail?.source;
    if(src&&/logo|poster|screenshot|seal_of|flag_of|emblem/i.test(src))return null;
    return src||null;
  }catch{return null;}
}
async function getLinks(title,signal){
  try{const d=await wF({action:'query',prop:'links',titles:title,redirects:1,plnamespace:0,pllimit:60},signal);return (Object.values(d.query?.pages||{})[0]?.links||[]).map(l=>l.title);}catch{return[];}
}
async function getShortDesc(title,signal){
  try{const d=await wF({action:'query',prop:'pageprops',titles:title,redirects:1},signal);return Object.values(d.query?.pages||{})[0]?.pageprops?.['wikibase-shortdesc']||'';}catch{return'';}
}
function parseSections(text){
  const lines=text.split('\n').map(l=>l.trim()).filter(l=>l.length>0);
  const secs={};let cur='Overview';let buf=[];
  const SM=/^(Early life|Background|Origins?|Rise|Reign|Rule|Administration|Military|Campaigns?|Conquest|Legacy|Death|Decline|Fall|Aftermath|Significance|Impact|Economy|Religion|Culture|Architecture|Geography|Family|History|Formation|Events?|Course|Outcome|Causes?|Effects?)$/i;
  for(const l of lines){
    if(SM.test(l)&&l.length<40){if(buf.length)secs[cur]=(secs[cur]||[]).concat(buf);cur=l;buf=[];}
    else if(l.length>30)buf.push(l);
  }
  if(buf.length)secs[cur]=(secs[cur]||[]).concat(buf);
  return secs;
}
function figNames(links){
  const bl=/\b(district|state|river|empire|dynasty|kingdom|war|battle|treaty|movement|party|city|fort|temple|college|university|century|india|period|era|age|congress|committee|council|society|company|administration|government|assembly|conference|commission|board|union|alliance|league|front|organisation|organization|institute|ministry|department|march|day|act\b|nawab of|sultan of|king of|emperor of|raja of|maharaja of|governor of|viceroy of|ruler of)\b/i;
  return links.filter(t=>{if(bl.test(t))return false;const w=t.split(' ');return w.length>=2&&w.length<=4&&/^[A-Z]/.test(t)&&!/^\d/.test(t);}).slice(0,7);
}
/* Text-grounded entity extraction — pulls proper-noun phrases from the ARTICLE'S OWN PROSE
   (not the raw outbound-links table, which pulls in tons of unrelated linked phrases),
   then ranks by how often they actually appear and whether they're confirmed as a real
   Wikipedia link title. This is what keeps quiz questions topically relevant. */
const NAME_STOPWORDS=new Set(["The","This","That","These","Those","It","His","Her","Their","Its","They","He","She",
  "January","February","March","April","May","June","July","August","September","October","November","December",
  "India","Indian","British","English","Empire","Kingdom","Dynasty","War","Battle","Movement","Act","Treaty",
  "However","Although","Despite","During","After","Before","Following","According","Today","Later","Eventually","In"]);
// Generic event/institution/concept phrases that are real wiki links but make poor "who is this
// person" quiz answers — they describe the topic's context, not a distinct figure within it.
const ENTITY_BLOCKLIST=/\b(war|congress|committee|council|society|company|administration|government|assembly|conference|commission|board|union|alliance|league|front|organisation|organization|institute|ministry|department|movement|march|day|act|treaty|empire|dynasty|kingdom|party|sultanate|presidency|nations|disobedience|cooperation)\b/i;
function extractEntitiesFromText(paragraphs,links){
  const linkSet=new Set((links||[]).map(l=>l.toLowerCase()));
  const counts={};
  // 2-4 word capitalized phrases that look like proper names/titles. Matched PER SENTENCE so a
  // capitalized word ending one sentence can never fuse with the capitalized word starting the next.
  const sentences=paragraphs.join(' ').split(/(?<=[.!?])\s+/);
  const re=/\b([A-Z][a-zA-Z.'-]+(?:\s[A-Z][a-zA-Z.'-]+){1,3})\b/g;
  sentences.forEach(sentence=>{
    let m;
    re.lastIndex=0;
    while((m=re.exec(sentence))){
      let phrase=m[1].trim().replace(/[.,;:]+$/,'');
      const firstWord=phrase.split(' ')[0];
      if(NAME_STOPWORDS.has(firstWord))continue;
      if(ENTITY_BLOCKLIST.test(phrase))continue;
      if(phrase.length<5||phrase.length>40)continue;
      counts[phrase]=(counts[phrase]||0)+1;
    }
  });
  const ranked=Object.keys(counts).map(name=>({
    name,
    count:counts[name],
    isLinked:linkSet.has(name.toLowerCase())
  }));
  // confirmed-link names are far more trustworthy as real entities than unlinked text matches
  ranked.sort((a,b)=>(b.isLinked-a.isLinked)*1000+(b.count-a.count));
  return ranked;
}
function mkSec(iconSvg,h4,html){return`<div class="res-section"><div class="res-section-head"><div class="sec-icon">${iconSvg}</div><h4>${h4}</h4></div>${html}</div><div class="fact-divider"></div>`;}
const ICO_OV=`<svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" stroke="var(--gold-b)" stroke-width="1.8"/><line x1="11" y1="7" x2="11" y2="11" stroke="var(--gold-b)" stroke-width="1.8" stroke-linecap="round"/><circle cx="11" cy="14" r="1" fill="var(--gold-b)"/></svg>`;
const ICO_EV=`<svg viewBox="0 0 22 22" fill="none"><path d="M4 11h14M11 4l7 7-7 7" stroke="var(--ember-b)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICO_FG=`<svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" stroke="var(--gold-b)" stroke-width="1.8"/><path d="M3 19c0-4 3.6-7 8-7s8 3 8 7" stroke="var(--gold-b)" stroke-width="1.8" stroke-linecap="round"/></svg>`;
const ICO_LG=`<svg viewBox="0 0 22 22" fill="none"><path d="M11 2l2.4 7h7.2l-5.8 4.2 2.2 6.8L11 16l-6 4 2.2-6.8L1.4 9H8.6z" stroke="var(--gold-b)" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
const ICO_RL=`<svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="3" stroke="var(--teal-b)" stroke-width="1.8"/><circle cx="4" cy="5" r="2" stroke="var(--teal-b)" stroke-width="1.5"/><circle cx="18" cy="5" r="2" stroke="var(--teal-b)" stroke-width="1.5"/><circle cx="4" cy="17" r="2" stroke="var(--teal-b)" stroke-width="1.5"/><circle cx="18" cy="17" r="2" stroke="var(--teal-b)" stroke-width="1.5"/><line x1="6" y1="6.5" x2="8.5" y2="9" stroke="var(--teal-b)" stroke-width="1.3"/><line x1="15.5" y1="6.5" x2="13.5" y2="9" stroke="var(--teal-b)" stroke-width="1.3"/><line x1="6" y1="15.5" x2="8.5" y2="13" stroke="var(--teal-b)" stroke-width="1.3"/><line x1="15.5" y1="15.5" x2="13.5" y2="13" stroke="var(--teal-b)" stroke-width="1.3"/></svg>`;
const ICO_BG=`<svg viewBox="0 0 22 22" fill="none"><path d="M3 17l5-7 4 5 3-4 4 6" stroke="var(--gold-b)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICO_CONS=`<svg viewBox="0 0 22 22" fill="none"><path d="M11 3v9M11 12l4 4M11 12l-4 4" stroke="var(--ember-b)" stroke-width="1.8" stroke-linecap="round"/><circle cx="11" cy="17.5" r="1.4" fill="var(--ember-b)"/></svg>`;
const ICO_DATE=`<svg viewBox="0 0 22 22" fill="none"><rect x="3" y="5" width="16" height="14" rx="2" stroke="var(--teal-b)" stroke-width="1.6"/><line x1="3" y1="9" x2="19" y2="9" stroke="var(--teal-b)" stroke-width="1.6"/><line x1="7" y1="3" x2="7" y2="6.5" stroke="var(--teal-b)" stroke-width="1.6" stroke-linecap="round"/><line x1="15" y1="3" x2="15" y2="6.5" stroke="var(--teal-b)" stroke-width="1.6" stroke-linecap="round"/></svg>`;

/* ── NARRATIVE LAYER: cinematic hook + storytelling acts ── */
function buildHook(firstPara,title){
  if(!firstPara) return `The story of ${title} begins here.`;
  const firstSentence=firstPara.split(/(?<=[.!?])\s/)[0];
  if(firstSentence.length<=175) return firstSentence;
  return firstSentence.slice(0,168).trim()+'…';
}
function buildNarrativeActs(paragraphs){
  const n=paragraphs.length;
  if(n===0) return{background:[],events:[],consequences:[],legacy:[]};
  const bgEnd=Math.max(1,Math.round(n*0.25));
  const evEnd=Math.max(bgEnd+1,Math.round(n*0.75));
  const background=paragraphs.slice(0,bgEnd);
  const events=paragraphs.slice(bgEnd,evEnd);
  const rest=paragraphs.slice(evEnd);
  const half=Math.ceil(rest.length/2);
  return{background,events,consequences:rest.slice(0,half),legacy:rest.slice(half)};
}
/* Transform raw extract into "Key Highlights" — short, fact-dense bullets, never raw pasted prose */
function extractKeyHighlights(paragraphs){
  const allSentences=paragraphs.join(' ').split(/(?<=[.!?])\s+/).filter(s=>s.length>20&&s.length<200);
  const scored=allSentences.map(s=>{
    let score=0;
    if(/\b\d{3,4}\b/.test(s))score+=3;
    if(/\b(BCE|CE)\b/.test(s))score+=2;
    if(/[A-Z][a-z]+\s[A-Z][a-z]+/.test(s))score+=2;
    if(s.length<120)score+=1;
    return{s,score};
  });
  scored.sort((a,b)=>b.score-a.score);
  return scored.slice(0,7).map(x=>x.s.trim());
}
/* Pull every distinct year mentioned in the article, paired with the sentence that mentions it —
   gives the quiz multiple real, sentence-grounded year facts instead of relying on one yearNum. */
function extractYearFacts(paragraphs,excludeYear){
  const sentences=paragraphs.join(' ').split(/(?<=[.!?])\s+/).filter(s=>s.length>20&&s.length<220);
  const seen=new Set();
  const facts=[];
  sentences.forEach(s=>{
    // reject matches that are really part of a larger number, e.g. the "100" in "100,000"
    const m=s.match(/\b(\d{3,4})\b(?!,\d)\s*(BCE|BC|CE|AD)?/);
    if(!m)return;
    const year=parseInt(m[1]);
    const hasEra=!!m[2];
    // a bare 3-digit number with no era marker is almost never a year reference (more likely a
    // count, page number, or measurement) — only trust it as a year if BCE/CE/AD is attached,
    // or if it's a plausible 4-digit calendar year
    if(!hasEra && (year<1000||year>2030))return;
    if(hasEra && (year<1||year>2030))return;
    if(excludeYear!=null && year===excludeYear)return;
    if(seen.has(year))return;
    seen.add(year);
    facts.push({year,sentence:s.trim()});
  });
  return facts;
}
/* Short Notes — concise bullet points distinct from the prose dossier, for fast revision */
function buildShortNotes(acts,figures,hook,title){
  const notes=[];
  if(hook)notes.push({label:'In short',text:hook});
  if(acts.background?.length)notes.push({label:'Background',text:acts.background[0].split(/(?<=[.!?])\s/)[0]});
  (acts.events||[]).slice(0,3).forEach(e=>notes.push({label:'Event',text:e.split(/(?<=[.!?])\s/)[0]}));
  if(figures?.length)notes.push({label:'Key figures',text:figures.slice(0,4).join(', ')});
  if(acts.consequences?.length)notes.push({label:'Consequence',text:acts.consequences[0].split(/(?<=[.!?])\s/)[0]});
  if(acts.legacy?.length)notes.push({label:'Legacy',text:acts.legacy[0].split(/(?<=[.!?])\s/)[0]});
  return notes.slice(0,8);
}

/* ── VISUAL LAYER: simple empire-extent map (lightweight inline SVG, no external tiles) ── */
const EMPIRE_REGIONS={
  "maurya empire":{label:"Mauryan Extent · c. 250 BCE",cx:46,cy:42,rx:30,ry:34},
  "mughal empire":{label:"Mughal Extent · c. 1700 CE",cx:42,cy:38,rx:32,ry:38},
  "maratha empire":{label:"Maratha Extent · c. 1760 CE",cx:40,cy:50,rx:26,ry:30},
  "delhi sultanate":{label:"Delhi Sultanate Extent",cx:44,cy:35,rx:24,ry:26},
  "vijayanagara empire":{label:"Vijayanagara Extent",cx:42,cy:68,rx:20,ry:22},
  "gupta empire":{label:"Gupta Extent · c. 400 CE",cx:46,cy:38,rx:26,ry:28},
  "british raj":{label:"British India · c. 1900 CE",cx:44,cy:45,rx:34,ry:48},
  "chola dynasty":{label:"Chola Extent · c. 1030 CE",cx:40,cy:72,rx:18,ry:24},
  "indus valley civilisation":{label:"Indus Valley Sites",cx:30,cy:28,rx:18,ry:20},
  "vardhana dynasty":{label:"Harsha's Realm · c. 640 CE",cx:44,cy:32,rx:24,ry:24},
  "rashtrakuta dynasty":{label:"Rashtrakuta Extent · c. 800 CE",cx:40,cy:58,rx:24,ry:26},
  "sikh empire":{label:"Sikh Empire · c. 1830 CE",cx:32,cy:24,rx:16,ry:18},
  "pala empire":{label:"Pala Extent · c. 820 CE",cx:60,cy:42,rx:18,ry:20},
};
function getEmpireRegion(title){
  const key=title.toLowerCase().trim();
  if(EMPIRE_REGIONS[key]) return EMPIRE_REGIONS[key];
  for(const k of Object.keys(EMPIRE_REGIONS)){ if(key.includes(k)||k.includes(key)) return EMPIRE_REGIONS[k]; }
  return null;
}
function buildEmpireMapSvg(region){
  if(!region) return '';
  return `<div class="empire-map-box">
    <div class="empire-map-label">${escH(region.label)}</div>
    <svg viewBox="0 0 100 100" class="empire-map-svg">
      <path d="M30 8 L55 6 L68 18 L72 30 L65 38 L70 50 L60 65 L58 80 L45 95 L35 85 L32 70 L20 60 L18 40 L25 25 Z" fill="rgba(255,255,255,0.04)" stroke="var(--t-accent)" stroke-width="0.8" opacity="0.55"/>
      <ellipse cx="${region.cx}" cy="${region.cy}" rx="${region.rx}" ry="${region.ry}" fill="var(--t-glow)" stroke="var(--t-accent)" stroke-width="1" class="empire-pulse"/>
    </svg>
  </div>`;
}


const TOPIC_GRAPH={
  "maurya empire":["Chandragupta Maurya","Ashoka","Kalinga War","Chanakya"],
  "chandragupta maurya":["Maurya Empire","Chanakya","Bindusara","Seleucus I Nicator"],
  "ashoka":["Kalinga War","Maurya Empire","Buddhism","Edicts of Ashoka"],
  "kalinga war":["Ashoka","Buddhism","Maurya Empire"],
  "buddhism":["Ashoka","Gautama Buddha","Nalanda University","Maurya Empire"],
  "gupta empire":["Chandragupta I","Aryabhata","Kalidasa","Nalanda University"],
  "delhi sultanate":["Qutb ud-Din Aibak","Alauddin Khilji","Muhammad bin Tughluq","Vijayanagara Empire"],
  "mughal empire":["Babur","Akbar","Shah Jahan","Aurangzeb","Taj Mahal"],
  "akbar":["Mughal Empire","Din-i Ilahi","Rajput states","Humayun"],
  "battle of plassey":["Robert Clive","Siraj ud-Daulah","British Raj","Battle of Buxar"],
  "british raj":["Battle of Plassey","Revolt of 1857","Indian independence movement","Partition of India"],
  "revolt of 1857":["British Raj","Mangal Pandey","Rani Lakshmibai","Bahadur Shah II"],
  "indian independence movement":["Mahatma Gandhi","Quit India Movement","Subhas Chandra Bose","Partition of India"],
  "mahatma gandhi":["Quit India Movement","Dandi March","Indian independence movement","Assassination of Mahatma Gandhi"],
  "maratha empire":["Shivaji","Peshwa","Third Battle of Panipat","Battle of Plassey"],
  "shivaji":["Maratha Empire","Peshwa","Aurangzeb"],
  "vijayanagara empire":["Krishnadevaraya","Battle of Talikota","Delhi Sultanate","Hampi"],
  "taj mahal":["Shah Jahan","Mumtaz Mahal","Mughal Empire","Agra Fort","Humayun's Tomb"],
  "qutb minar":["Delhi Sultanate","Qutb ud-Din Aibak","Red Fort"],
  "brihadeeswarar temple":["Rajaraja I","Chola dynasty","Meenakshi Amman Temple"],
  "hawa mahal":["Jaipur","Rajput states","Amer Fort"],
  "konark sun temple":["Eastern Ganga dynasty","Chola dynasty","Brihadeeswarar Temple"],
  "red fort":["Mughal Empire","Shah Jahan","Indian independence movement","Qutb Minar"],
  "mehrangarh":["Rajput states","Jodhpur","Chittorgarh Fort"],
  "khajuraho group of monuments":["Chandela dynasty","Brihadeeswarar Temple","Konark Sun Temple"],
  "gol gumbaz":["Bijapur Sultanate","Deccan sultanates","Golconda Fort"],
  "chittorgarh fort":["Rajput states","Mehrangarh","Maharana Pratap"],
  "sanchi stupa":["Ashoka","Buddhism","Maurya Empire"],
  "meenakshi amman temple":["Madurai Nayak dynasty","Brihadeeswarar Temple","Chola dynasty"],
  "chand baori":["Rajput states","Step well","Hawa Mahal"],
  "golconda fort":["Qutb Shahi dynasty","Deccan sultanates","Gol Gumbaz"],
  "humayun's tomb":["Humayun","Mughal Empire","Taj Mahal","Akbar"],
  "hampi":["Vijayanagara Empire","Krishnadevaraya","Battle of Talikota"],
  "ellora caves":["Rashtrakuta Dynasty","Kailasa Temple","Ajanta Caves"],
  "ajanta caves":["Buddhism","Satavahana dynasty","Ellora Caves"],
  "fatehpur sikri":["Akbar","Mughal Empire","Din-i Ilahi","Agra Fort"],
  "jaisalmer fort":["Rajput states","Bhati dynasty","Chittorgarh Fort"],
  "agra fort":["Mughal Empire","Akbar","Shah Jahan","Fatehpur Sikri","Taj Mahal"],
  "sun temple, modhera":["Chaulukya dynasty","Konark Sun Temple","Gujarat"],
  "vidhana soudha":["Republic of India","Bengaluru","Mysore Kingdom"],
  "charminar":["Qutb Shahi dynasty","Golconda Fort","Hyderabad","Gol Gumbaz"],
};
function getRelatedFromGraph(title){
  const key=title.toLowerCase().trim();
  if(TOPIC_GRAPH[key]) return TOPIC_GRAPH[key];
  for(const k of Object.keys(TOPIC_GRAPH)){ if(key.includes(k)||k.includes(key)) return TOPIC_GRAPH[k]; }
  return null;
}

/* ── JOURNEY MEMORY (localStorage) ── */
const JOURNEY_KEY='bharatItihasJourney';
function getJourney(){ try{ return JSON.parse(localStorage.getItem(JOURNEY_KEY))||[]; }catch{ return []; } }
function addToJourney(topic){
  let j=getJourney();
  j=j.filter(t=>t.toLowerCase()!==topic.toLowerCase());
  j.push(topic);
  if(j.length>12) j=j.slice(-12);
  try{ localStorage.setItem(JOURNEY_KEY,JSON.stringify(j)); }catch{}
  return j;
}
function renderJourneyTrail(){
  const j=getJourney();
  const box=document.getElementById('journeyTrail');
  if(!box) return;
  if(j.length<2){ box.style.display='none'; return; }
  box.style.display='block';
  box.innerHTML=`<div class="journey-label">📍 Your Journey So Far</div><div class="journey-path">${j.map((t,i)=>`<span class="journey-stop" onclick="relClick('${escH(t).replace(/'/g,"\\'")}')">${escH(t)}</span>${i<j.length-1?'<span class="journey-arrow">→</span>':''}`).join('')}</div>`;
}

/* ── DEEP LINKING ── encode the current topic in the URL hash so results survive a refresh
   and can be shared/bookmarked as a direct link. */
function setLocationHash(title){
  try{ history.replaceState(null,'','#/topic/'+encodeURIComponent(title)); }catch{}
}
function parseLocationHash(){
  const m=location.hash.match(/^#\/topic\/(.+)$/);
  return m?decodeURIComponent(m[1]):null;
}

/* ── RABBIT HOLE TRAIL ── chains "Surprise Me" / related-topic clicks into a visualizable session
   path, distinct from the long-lived Journey list (this one resets each session and records HOW
   topics were reached — a straight search vs. a click from a related topic). */
let _rabbitHoleTrail=[];
function recordRabbitHoleStep(title,via){
  _rabbitHoleTrail.push({title,via,t:Date.now()});
  if(_rabbitHoleTrail.length>30)_rabbitHoleTrail=_rabbitHoleTrail.slice(-30);
  renderRabbitHoleTrail();
}
function renderRabbitHoleTrail(){
  const box=document.getElementById('rabbitHoleTrail');
  if(!box)return;
  if(_rabbitHoleTrail.length<2){ box.style.display='none'; return; }
  box.style.display='block';
  box.innerHTML=`<div class="journey-label">🐇 This Session's Rabbit Hole</div><div class="journey-path">${_rabbitHoleTrail.map((s,i)=>`<span class="journey-stop${s.via==='related'?' rh-related':''}" onclick="relClick('${escH(s.title).replace(/'/g,"\\'")}')">${escH(s.title)}</span>${i<_rabbitHoleTrail.length-1?'<span class="journey-arrow">→</span>':''}`).join('')}</div>`;
}

/* ── DAILY STREAK ── lightweight visit-streak counter, separate calendar days only. */
const STREAK_KEY='bharatStreak';
function bumpDailyStreak(){
  const today=new Date().toISOString().slice(0,10);
  const s=safeStore.get(STREAK_KEY,{count:0,lastDay:null,best:0});
  if(s.lastDay===today)return s; // already counted today
  const yest=new Date(Date.now()-86400000).toISOString().slice(0,10);
  s.count=(s.lastDay===yest)?s.count+1:1;
  s.lastDay=today;
  s.best=Math.max(s.best||0,s.count);
  safeStore.set(STREAK_KEY,s);
  renderStreakBadge(s);
  return s;
}
function renderStreakBadge(s){
  s=s||safeStore.get(STREAK_KEY,{count:0,best:0});
  const el=document.getElementById('streakBadge');
  if(!el)return;
  if(!s.count){ el.style.display='none'; return; }
  el.style.display='inline-flex';
  el.innerHTML=`🔥 <span>${s.count}</span> day streak`;
  el.title=`Best streak: ${s.best} day${s.best===1?'':'s'} — tap to view your full record`;
}
document.getElementById('streakBadge')?.addEventListener('click',openScholarRecord);
document.getElementById('streakBadge')?.style.setProperty('cursor','pointer');

/* ── FAVORITES / BOOKMARKS ── reuses the same localStorage approach as Journey. */
const FAVORITES_KEY='bharatFavorites';
function getFavorites(){ return safeStore.get(FAVORITES_KEY,[]); }
function isFavorite(title){ return getFavorites().some(f=>f.toLowerCase()===title.toLowerCase()); }
function toggleFavorite(title){
  let favs=getFavorites();
  if(isFavorite(title)) favs=favs.filter(f=>f.toLowerCase()!==title.toLowerCase());
  else favs.push(title);
  safeStore.set(FAVORITES_KEY,favs);
  renderFavoriteButton(title);
  renderFavoritesList();
  return isFavorite(title);
}
function renderFavoriteButton(title){
  const btn=document.getElementById('favToggleBtn');
  if(!btn)return;
  const on=isFavorite(title);
  btn.classList.toggle('is-fav',on);
  btn.innerHTML=on?'★ Saved':'☆ Save';
  btn.setAttribute('aria-pressed',on?'true':'false');
}
function renderFavoritesList(){
  const box=document.getElementById('favoritesList');
  if(!box)return;
  const favs=getFavorites();
  if(!favs.length){ box.innerHTML='<p class="fav-empty">No saved topics yet — tap ☆ Save on any result to bookmark it here.</p>'; return; }
  box.innerHTML=favs.map(f=>`<div class="related-item" onclick="relClick('${escH(f).replace(/'/g,"\\'")}')">${escH(f)} <span class="fav-remove" onclick="event.stopPropagation();toggleFavorite('${escH(f).replace(/'/g,"\\'")}');renderFavoritesList();">✕</span></div>`).join('');
}

/* ── CONTINUE WHERE YOU LEFT OFF ── surfaces the most recent journey topic on return visits. */
function renderContinueBanner(){
  const box=document.getElementById('continueBanner');
  if(!box)return;
  const j=getJourney();
  if(!j.length){ box.style.display='none'; return; }
  const last=j[j.length-1];
  box.style.display='flex';
  box.innerHTML=`<span>Continue where you left off:</span><button onclick="document.getElementById('continueBanner').style.display='none';switchToTopicAndSearch('${escH(last).replace(/'/g,"\\'")}')">${escH(last)} →</button>`;
}
function switchToTopicAndSearch(title){
  selectMode('topic');
  queryInput.value=title;
  runQuery(title);
}

/* ── READING DEPTH ── quick facts / standard / deep dive. Standard = current dossier behavior.
   Quick facts trims to highlights + key figures only; deep dive is a placeholder hook for future
   expanded-extract fetching (kept simple here: it just expands which sections render). */
const READING_DEPTH_KEY='bharatReadingDepth';
function getReadingDepth(){ return safeStore.get(READING_DEPTH_KEY,'standard'); }
function setReadingDepth(d){ safeStore.set(READING_DEPTH_KEY,d); renderReadingDepthControls(); }
function renderReadingDepthControls(){
  const wrap=document.getElementById('depthControls');
  if(!wrap)return;
  const cur=getReadingDepth();
  wrap.querySelectorAll('.depth-btn').forEach(b=>b.classList.toggle('active',b.dataset.depth===cur));
}

async function buildDossier(q,preset,signal){
  // Cache check: a preset (e.g. "Surprise Me" or a related-topic click) always uses the resolved
  // title as the cache key; a free-text query is cached by its resolved title too, once we have it.
  if(preset){
    const cached=getCachedDossier(preset);
    if(cached) return cached;
  }
  const hits=preset?[{title:preset}]:await smartSearch(q,signal);
  const title=hits[0].title;
  const cachedByTitle=getCachedDossier(title);
  if(cachedByTitle) return cachedByTitle;
  const searchRelated=hits.slice(1,6).map(h=>h.title);
  const [extract,thumb,links,sd]=await Promise.all([getExtract(title,signal),getThumb(title,signal),getLinks(title,signal),getShortDesc(title,signal)]);
  if(!extract)throw new Error(`Found "${title}" but could not load its text. Try a slightly different phrasing.`);
  const secs=parseSections(extract);
  const ap=Object.values(secs).flat();
  const acts=buildNarrativeActs(ap);
  const figs=figNames(links);
  const hook=buildHook(ap[0],title);
  const highlights=extractKeyHighlights(ap);

  // theme year: try short description first, then title, then first paragraph
  const yearNum=extractYear(sd)??extractYear(title)??extractYear(ap[0]);
  // richer, text-grounded data for the quiz engine — entities actually mentioned in THIS article's
  // own prose (not just any outbound link), and every other distinct year mentioned in the text
  const entities=extractEntitiesFromText(ap,links).filter(e=>e.name!==title);
  const yearFacts=extractYearFacts(ap,yearNum);

  let mh='';
  if(highlights.length)mh+=mkSec(ICO_OV,'Key Highlights',`<ul>${highlights.map(h=>`<li>${escH(h)}</li>`).join('')}</ul>`);
  if(acts.background.length)mh+=mkSec(ICO_BG,'Background',acts.background.map(p=>`<p>${escH(p)}</p>`).join(''));
  if(acts.events.length)mh+=mkSec(ICO_EV,'Major Events',acts.events.map(p=>`<p>${escH(p)}</p>`).join(''));
  if(figs.length)mh+=mkSec(ICO_FG,'Key Figures',`<ul>${figs.map(f=>`<li><strong>${escH(f)}</strong></li>`).join('')}</ul>`);
  if(acts.consequences.length)mh+=mkSec(ICO_CONS,'Consequences',acts.consequences.map(p=>`<p>${escH(p)}</p>`).join(''));
  if(acts.legacy.length)mh+=mkSec(ICO_LG,'Legacy',acts.legacy.map(p=>`<p>${escH(p)}</p>`).join(''));

  // related: prefer hand-curated knowledge graph for a "natural progression" feel, fall back to search hits
  const graphRelated=getRelatedFromGraph(title);
  const related=graphRelated||searchRelated;
  if(related.length)mh+=mkSec(ICO_RL,'Continue Your Journey',related.map(r=>`<div class="related-item" onclick="relClick('${escH(r).replace(/'/g,"\\'")}')">${escH(r)}</div>`).join(''));

  const facts=[sd?{l:'Description',v:sd}:null,{l:'Archive Entry',v:title},{l:'Depth',v:ap.length>12?'Extensive':ap.length>6?'Detailed':'Overview'}].filter(Boolean);
  const empireRegion=getEmpireRegion(title);
  const empireMapHtml=empireRegion?buildEmpireMapSvg(empireRegion):'';
  const result={title,period:sd||'Indian History Archive',hook,mh,thumb,facts,related,yearNum,acts,figs,entities,yearFacts,rawParas:ap,highlights,empireMapHtml,links,url:'https://en.wikipedia.org/wiki/'+encodeURIComponent(title.replace(/ /g,'_'))};
  setCachedDossier(title,result);
  rememberLastGood(q,result);
  return result;
}
function parseDateQ(raw){
  const q=raw.trim().toLowerCase();
  if(q==='today'||q==='today in history'){const n=new Date();return{day:n.getDate(),month:n.getMonth(),year:null};}
  if(/^\d{3,4}$/.test(q))return{day:null,month:null,year:parseInt(q)};
  const mns=MONTHS.map(m=>m.toLowerCase());let day=null,month=null,year=null;
  const ym=q.match(/\b(\d{3,4})\b/);if(ym)year=parseInt(ym[1]);
  const dm=q.match(/\b(\d{1,2})(st|nd|rd|th)?\b/);if(dm)day=parseInt(dm[1]);
  for(let i=0;i<mns.length;i++)if(q.includes(mns[i])){month=i;break;}
  if(day===year)day=null;
  return{day,month,year};
}
async function buildDateDossier(q){
  const{day,month,year}=parseDateQ(q);
  const indRx=/india|indian|mughal|maurya|gupta|chola|delhi|bengal|punjab|maratha|gandhi|nehru|sultanate|\braj\b|hindu|sepoy|kashmir|bombay|calcutta|madras|hyderabad|mumbai|sikh|peshwa|nizam|nawab|partition|british india|independence/i;
  if(day!==null&&month!==null){
    const pt=MONTHS[month]+' '+day;
    const ext=await getExtract(pt);
    if(!ext)throw new Error('No calendar page found for "'+pt+'".');
    const lines=ext.split('\n').map(l=>l.trim()).filter(Boolean);
    const india=lines.filter(l=>indRx.test(l));
    let use=india.length?india:lines.filter(l=>/^\d{3,4}/.test(l));
    if(year){const yf=use.filter(l=>l.includes(String(year)));if(yf.length)use=yf;}
    use=use.slice(0,18);
    const mh=use.length?mkSec(ICO_EV,india.length?'Indian History Events on '+pt:'Notable Events on '+pt,`<ul>${use.map(l=>`<li>${escH(l)}</li>`).join('')}</ul>`):`<p>No clear Indian-history events found for ${escH(pt)}. Try removing the year or use Topic search.</p>`;
    const hook=use.length?`On ${pt}${year?', '+year:''}, the chronicle records: ${use[0].slice(0,150)}${use[0].length>150?'…':''}`:null;
    const yearNum=year!=null?year:null;
    return{title:pt+(year?', '+year:'')+ ' — On This Date',period:pt,hook,mh,thumb:null,facts:[{l:'Date',v:pt},{l:'Events',v:String(use.length)},{l:'India Filter',v:india.length?'✓ Applied':'General'}],related:[],yearNum,acts:{background:[],events:use,consequences:[],legacy:[]},url:'https://en.wikipedia.org/wiki/'+encodeURIComponent(pt.replace(/ /g,'_'))};
  }
  if(year!==null){
    for(const t of[year+' in India',String(year)]){
      try{
        const e=await getExtract(t);
        if(e){
          const secs=parseSections(e);const ap=Object.values(secs).flat();
          const acts=buildNarrativeActs(ap);
          let mh='';
          if(acts.background.length)mh+=mkSec(ICO_BG,'The Year '+year+' in India',acts.background.map(p=>`<p>${escH(p)}</p>`).join(''));
          if(acts.events.length)mh+=mkSec(ICO_EV,'Events Through the Year',acts.events.map(p=>`<p>${escH(p)}</p>`).join(''));
          if(acts.legacy.length)mh+=mkSec(ICO_LG,'Legacy',acts.legacy.map(p=>`<p>${escH(p)}</p>`).join(''));
          const hook=buildHook(ap[0],t);
          return{title:t,period:String(year),hook,mh,thumb:await getThumb(t),facts:[{l:'Year',v:String(year)}],related:[],yearNum:year,acts,url:'https://en.wikipedia.org/wiki/'+encodeURIComponent(t.replace(/ /g,'_'))};
        }
      }catch{}
    }
    throw new Error('Could not find an archive entry for the year '+year+'.');
  }
  throw new Error('Could not parse that date. Try "15 August 1947", "23 March 1931", or just "1857".');
}

let _queryToken=0;
let _activeAbort=null;
async function runQuery(rawQ,preset){
  const q=(rawQ||'').trim();if(!q)return;
  const myToken=++_queryToken;
  // cancel any still-in-flight previous search outright, instead of just discarding its result
  if(_activeAbort) _activeAbort.abort();
  const ctrl=new AbortController();
  _activeAbort=ctrl;
  goBtn.disabled=true;
  resultArea.innerHTML=`<div class="loading-row"><span class="ck spin" style="width:1.4rem;height:1.4rem;color:var(--gold-b)"><svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="44" stroke="currentColor" stroke-width="9"/></svg></span>&nbsp;Consulting the archives for "<em>${escH(q)}</em>"…</div>`;
  try{
    const r=mode==='date'?await buildDateDossier(q):await buildDossier(q,preset,ctrl.signal);
    if(myToken!==_queryToken)return; // a newer search has already started — discard this stale result
    if(mode==='notes'){ renderShortNotes(r); }
    else{ renderResult(r); if(mode!=='date') openTopicHub(r); }
    if(r.yearNum!=null) applyEraTheme(r.yearNum);
    addToJourney(r.title);
    renderJourneyTrail();
    recordRabbitHoleStep(r.title,preset?'related':'search');
    if(mode!=='date') setLocationHash(r.title);
    bumpDailyStreak();
    resultArea.scrollIntoView({behavior:'smooth',block:'start'});
  }catch(err){
    if(myToken!==_queryToken)return;
    if(err.name==='AbortError')return; // superseded by a newer search — nothing to show
    // Offline/failure fallback: if we have a previously successful result for this exact query, show it
    const fallback=mode!=='date'?getLastGood(q):null;
    if(fallback){
      renderResult(fallback);
      if(mode!=='date') openTopicHub(fallback);
      if(fallback.yearNum!=null) applyEraTheme(fallback.yearNum);
      const banner=document.createElement('div');
      banner.className='offline-fallback-banner';
      banner.innerHTML='⚠ Could not reach the archive just now — showing your last saved version of this entry.';
      resultArea.prepend(banner);
    }else{
      const suggHtml=(err.suggestions&&err.suggestions.length)
        ?`<div class="error-suggestions">${err.suggestions.map(s=>`<button class="error-sugg-btn" onclick="relClick('${escH(s).replace(/'/g,"\\'")}')">${escH(s)}</button>`).join('')}</div>`
        :'';
      resultArea.innerHTML=`<div class="error-box">⚠ ${escH(err.message||'Something went wrong.')}</div>${suggHtml}`;
    }
  }finally{
    if(myToken===_queryToken){goBtn.disabled=false;_activeAbort=null;}
  }
}
function relClick(t){queryInput.value=t;runQuery(t,t);document.getElementById('searchPanel').scrollIntoView({behavior:'smooth',block:'nearest'});}
function buildMainHtmlForDepth(r,depth){
  // 'quick' = highlights + key figures only. 'standard' = everything currently built into r.mh.
  // 'deep' = standard plus the full raw paragraph list appended (closest to the full article we have).
  if(depth==='quick'){
    let mh='';
    if(r.highlights&&r.highlights.length)mh+=mkSec(ICO_OV,'Key Highlights',`<ul>${r.highlights.map(h=>`<li>${escH(h)}</li>`).join('')}</ul>`);
    if(r.figs&&r.figs.length)mh+=mkSec(ICO_FG,'Key Figures',`<ul>${r.figs.map(f=>`<li><strong>${escH(f)}</strong></li>`).join('')}</ul>`);
    return mh||r.mh||'<p>No content available.</p>';
  }
  if(depth==='deep'&&r.rawParas&&r.rawParas.length){
    const extra=mkSec(ICO_OV,'Full Article Text',r.rawParas.map(p=>`<p>${escH(p)}</p>`).join(''));
    return (r.mh||'')+extra;
  }
  return r.mh||'<p>No content available.</p>';
}
function renderResult(r){
  const depth=getReadingDepth();
  const fH=(r.facts||[]).map(f=>`<div class="fact-row"><span class="fl">${escH(f.l)}</span><span class="fv">${escH(f.v)}</span></div>`).join('');
  const iH=r.thumb?`<div class="sidebar-img"><img src="${r.thumb}" alt="${escH(r.title)} — historical image" loading="lazy"></div><div class="img-cap">${escH(r.title)}</div>`:'';
  const relH=r.related&&r.related.length?`<div class="related-box"><div class="related-box-head">🧭 Continue Your Journey</div>${r.related.map(t=>`<div class="related-item" onclick="relClick('${escH(t).replace(/'/g,"\\'")}')">${escH(t)}</div>`).join('')}</div>`:'';
  const hookH=r.hook?`<p class="res-hook">${escH(r.hook)}</p>`:'';
  window._lastResult=r; // stash for Story Mode
  const canStory=r.acts && (r.acts.background.length+r.acts.events.length+r.acts.consequences.length+r.acts.legacy.length)>0;
  const fav=isFavorite(r.title);
  resultArea.innerHTML=`<div class="scroll-result">
    <div class="res-header">
      <h3>${escH(r.title)}</h3>
      <div class="res-period">${escH(r.period)}</div>
      <div class="res-header-actions">
        <span class="res-badge">📚 Historical Record</span>
        ${canStory?`<button class="story-launch-btn" onclick="openStoryMode()">🎬 Watch as Story Mode</button>`:''}
        <button id="favToggleBtn" class="fav-toggle-btn${fav?' is-fav':''}" aria-pressed="${fav}" onclick="toggleFavorite('${escH(r.title).replace(/'/g,"\\'")}')">${fav?'★ Saved':'☆ Save'}</button>
        <button class="share-btn" onclick="shareResult('${escH(r.title).replace(/'/g,"\\'")}')">🔗 Share</button>
        <button class="pdf-export-btn" onclick="exportResultAsPdf()">⬇ PDF</button>
      </div>
      <div id="depthControls" class="depth-controls" role="group" aria-label="Reading depth">
        <button class="depth-btn${depth==='quick'?' active':''}" data-depth="quick" onclick="setReadingDepth('quick');renderResult(window._lastResult);openTopicHub(window._lastResult);">Quick Facts</button>
        <button class="depth-btn${depth==='standard'?' active':''}" data-depth="standard" onclick="setReadingDepth('standard');renderResult(window._lastResult);openTopicHub(window._lastResult);">Standard</button>
        <button class="depth-btn${depth==='deep'?' active':''}" data-depth="deep" onclick="setReadingDepth('deep');renderResult(window._lastResult);openTopicHub(window._lastResult);">Deep Dive</button>
      </div>
    </div>
    ${hookH}
    <div class="res-body">
      <div class="res-main">${buildMainHtmlForDepth(r,depth)}</div>
      <div class="res-sidebar">
        ${r.empireMapHtml||''}
        ${iH}
        <div class="facts-box"><div class="facts-box-head">At a Glance</div>${fH}</div>
        ${relH}
        <button class="graph-view-btn" onclick="openRelationGraph(window._lastResult)">🕸 View Connections Graph</button>
        <a class="source-link" href="${r.url}" target="_blank" rel="noopener">📖 Read full article on Wikipedia ↗</a>
      </div>
    </div>
  </div>`;
}
function shareResult(title){
  setLocationHash(title);
  const url=location.href;
  if(navigator.share){
    navigator.share({title:title+' — Bhārat Itihās',url}).catch(()=>{});
  }else if(navigator.clipboard){
    navigator.clipboard.writeText(url).then(()=>toast('Link copied to clipboard')).catch(()=>toast(url));
  }else{
    toast(url);
  }
}
function toast(msg){
  let t=document.getElementById('miniToast');
  if(!t){ t=document.createElement('div'); t.id='miniToast'; t.className='mini-toast'; t.setAttribute('role','status'); document.body.appendChild(t); }
  t.textContent=msg; t.classList.add('show');
  clearTimeout(t._hideT); t._hideT=setTimeout(()=>t.classList.remove('show'),2200);
}
function renderShortNotes(r){
  window._lastResult=r;
  const notes=buildShortNotes(r.acts,r.figs,r.hook,r.title);
  const relH=r.related&&r.related.length?`<div class="related-box"><div class="related-box-head">🧭 Related Topics</div>${r.related.map(t=>`<div class="related-item" onclick="relClick('${escH(t).replace(/'/g,"\\'")}')">${escH(t)}</div>`).join('')}</div>`:'';
  resultArea.innerHTML=`<div class="scroll-result">
    <div class="res-header">
      <h3>${escH(r.title)}</h3>
      <div class="res-period">${escH(r.period)}</div>
      <span class="res-badge">📋 Short Notes</span>
    </div>
    <div class="notes-list">
      ${notes.map(n=>`<div class="note-row"><span class="note-label">${escH(n.label)}</span><span class="note-text">${escH(n.text)}</span></div>`).join('')}
    </div>
    ${relH}
    <a class="source-link" href="${r.url}" target="_blank" rel="noopener" style="margin-top:1.2rem;">📖 Read full article on Wikipedia ↗</a>
  </div>`;
}

/* ══ TOPIC HUB — dedicated interactive learning page per search ══ */
function buildOverviewText(r){
  const s=(r.hook||'').trim();
  const second=(r.acts?.background?.[0]||'').split(/(?<=[.!?])\s+/)[1]||'';
  let txt=s;
  if(second && (txt+' '+second).length<320) txt+=' '+second;
  return txt||`"${r.title}" is a key topic in Indian history, explored here through the Wikipedia archive.`;
}
function shuffleArr(a){const arr=a.slice();for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
const TQ_DIFFICULTY={
  easy:{time:60,count:5,yearOffs:[10,-15,20,-25],numOffs:[3,-6,12,-9],yearPhrase:'Around which year does "{T}" belong?',figPhrase:'Which figure is associated with "{T}"?',blankPhrase:'Fill in the blank: {S}',figPoolBoost:0},
  medium:{time:45,count:5,yearOffs:[7,-9,14,-18],numOffs:[3,-5,8,-7],yearPhrase:'In which year did "{T}" most likely take place?',figPhrase:'Which figure is closely tied to "{T}"?',blankPhrase:'Complete this fact: {S}',figPoolBoost:1},
  hard:{time:30,count:5,yearOffs:[4,-6,9,-11],numOffs:[2,-4,5,-6],yearPhrase:'"{T}" is most precisely dated to which year?',figPhrase:'Which figure is most directly tied to the events of "{T}"?',blankPhrase:'Supply the precise figure: {S}',figPoolBoost:2},
  extreme:{time:15,count:5,yearOffs:[2,-3,5,-4],numOffs:[1,-2,3,-2],yearPhrase:'Which is the exact year most strongly associated with "{T}"?',figPhrase:'Which figure is the single most specific, direct link to "{T}"?',blankPhrase:'Recall the exact figure under pressure: {S}',figPoolBoost:3},
};
let _tqSeenQ={}; // per-topic set of question signatures already shown, to avoid repeats across replays
function generateQuestionPool(r,diffKey){
  const cfg=TQ_DIFFICULTY[diffKey]||TQ_DIFFICULTY.easy;
  const pool=[];

  // ── Name pools: figs (curated, from real links) + entities (text-grounded, ranked by prominence)
  const figs=(r.figs||[]).filter(Boolean);
  const entities=(r.entities||[]).filter(Boolean);
  const entityNames=entities.map(e=>e.name);
  const related=(r.related||[]).filter(Boolean);
  const namePool=[...new Set([...figs,...entityNames,...related])];
  const GENERIC_NAMES=["Akbar","Ashoka","Shivaji Maharaj","Rani Lakshmibai","Tipu Sultan","Chanakya","Babur","Rajendra Chola I","Aurangzeb","Krishnadevaraya"];
  function nameDistractors(correct,n){
    // harder difficulties prefer topically-related (more confusable) names over generic ones
    const tight=namePool.filter(x=>x!==correct && x.toLowerCase()!==correct.toLowerCase());
    const loose=GENERIC_NAMES.filter(x=>x!==correct);
    const ordered=cfg.figPoolBoost>=2?[...shuffleArr(tight),...shuffleArr(loose)]:[...shuffleArr(loose),...shuffleArr(tight)];
    return [...new Set(ordered)].slice(0,n);
  }

  // ── Year questions — draw from the PRIMARY year plus every other distinct year actually
  // mentioned in the article. Easy favors the primary/most-prominent year; harder difficulties
  // pull from secondary, less-obvious dates buried later in the text — this is what makes
  // "hard" genuinely harder rather than just differently worded.
  const yearCandidates=[];
  if(r.yearNum!=null) yearCandidates.push({year:r.yearNum,sentence:r.hook||`"${r.title}" is dated to approximately ${r.yearNum}.`,primary:true});
  (r.yearFacts||[]).forEach(yf=>yearCandidates.push({year:yf.year,sentence:yf.sentence,primary:false}));
  const yearPicks=cfg.figPoolBoost>=2
    ? [...yearCandidates.filter(y=>!y.primary),...yearCandidates.filter(y=>y.primary)] // hard/extreme: secondary dates first
    : [...yearCandidates.filter(y=>y.primary),...yearCandidates.filter(y=>!y.primary)]; // easy/medium: primary date first
  yearPicks.slice(0,4).forEach((yc,vi)=>{
    const correct=yc.year;
    const offs=vi%2===0?cfg.yearOffs:shuffleArr(cfg.yearOffs);
    const distractors=[...new Set(offs.map(o=>correct+o))].filter(d=>d!==correct).slice(0,3);
    if(distractors.length<3)return;
    const opts=shuffleArr([correct,...distractors]).map(String);
    const phrase=yc.primary?cfg.yearPhrase.replace('{T}',r.title):`According to the record, in which year did this happen: "${yc.sentence.length>110?yc.sentence.slice(0,107)+'…':yc.sentence}"?`;
    pool.push({sig:'year:'+correct,q:phrase,options:opts,correct:opts.indexOf(String(correct)),fact:yc.sentence});
  });

  // ── Figure-association questions, from curated figs (link-confirmed names)
  figs.forEach(f=>{
    const wrongs=nameDistractors(f,3);
    if(wrongs.length<3)return;
    const opts=shuffleArr([f,...wrongs]);
    pool.push({sig:'fig:'+f.toLowerCase(),q:cfg.figPhrase.replace('{T}',r.title),options:opts,correct:opts.indexOf(f),fact:`${f} is one of the key figures connected to ${r.title}.`});
  });

  // ── Entity-recall questions from text-grounded extraction. Easy uses the most-prominent
  // (highest frequency / link-confirmed) entities; hard/extreme dig into less-frequent ones,
  // which are necessarily more specific and harder to recall.
  const entityTier=cfg.figPoolBoost>=2?entities.slice(Math.ceil(entities.length/2)):entities.slice(0,Math.ceil(entities.length/2)||entities.length);
  entityTier.slice(0,6).forEach(e=>{
    const wrongs=nameDistractors(e.name,3);
    if(wrongs.length<3)return;
    const opts=shuffleArr([e.name,...wrongs]);
    pool.push({sig:'ent:'+e.name.toLowerCase(),q:cfg.figPhrase.replace('{T}',r.title),options:opts,correct:opts.indexOf(e.name),fact:`${e.name} is mentioned in connection with ${r.title}.`});
  });

  // ── Fill-in-the-blank: numeric facts. Sentence pool tiered by difficulty — easy/medium pull
  // from the curated "highlights" (already the most fact-dense, prominent sentences); hard/extreme
  // also dig into raw paragraphs the highlights extractor skipped, surfacing more obscure detail.
  const curatedSentences=(r.highlights&&r.highlights.length)?r.highlights:[];
  const allSentences=(r.rawParas||[]).join(' ').split(/(?<=[.!?])\s+/).filter(s=>s.length>25&&s.length<220);
  const sentencePool=cfg.figPoolBoost>=2
    ? [...new Set([...allSentences,...curatedSentences])]
    : [...new Set([...curatedSentences,...allSentences])];

  const usedNumbers=new Set();
  function fmtLikeOriginal(n,hasComma){ return hasComma ? n.toLocaleString('en-US') : String(n); }
  sentencePool.forEach(sent=>{
    // capture the full number including comma-grouped thousands (e.g. "50,000"), not just a
    // trailing 3-4 digit chunk — otherwise "50,000" wrongly blanks out as just "000"
    const numMatch=sent.match(/\b(\d{1,3}(?:,\d{3})+|\d{3,4})\b/);
    if(numMatch && !usedNumbers.has(numMatch[1]+sent.slice(0,12))){
      usedNumbers.add(numMatch[1]+sent.slice(0,12));
      const correct=numMatch[1];
      const hasComma=correct.includes(',');
      const correctNum=parseInt(correct.replace(/,/g,''));
      const blanked=sent.replace(numMatch[0],'_____');
      const distractors=[...new Set(cfg.numOffs.map(o=>fmtLikeOriginal(correctNum+o*(hasComma?100:1),hasComma)))].filter(d=>d!==correct).slice(0,3);
      if(distractors.length<3)return;
      const opts=shuffleArr([correct,...distractors]);
      pool.push({sig:'num:'+correct+sent.slice(0,20),q:cfg.blankPhrase.replace('{S}',blanked),options:opts,correct:opts.indexOf(correct),fact:sent});
    }
  });

  // ── Fill-in-the-blank: proper-noun facts (distinct sentences from the numeric pass above).
  // Requires 2+ capitalized words so the blanked answer is a real proper name (e.g. "Mahatma
  // Gandhi"), not an ambiguous bare single word like "Gandhi" or a stray capitalized common noun.
  const usedNameBlanks=new Set();
  sentencePool.forEach(sent=>{
    const nameMatch=sent.match(/\b([A-Z][a-zA-Z.'-]+(?:\s[A-Z][a-zA-Z.'-]+){1,2})\b/);
    if(nameMatch && nameMatch[1].length>5 && !NAME_STOPWORDS.has(nameMatch[1].split(' ')[0]) && !ENTITY_BLOCKLIST.test(nameMatch[1]) && !usedNameBlanks.has(sent.slice(0,20))){
      usedNameBlanks.add(sent.slice(0,20));
      const correct=nameMatch[1].replace(/[.,;:]+$/,'');
      const blanked=sent.replace(nameMatch[0],'_____');
      const wrongs=nameDistractors(correct,3);
      if(wrongs.length<3)return;
      const opts=shuffleArr([correct,...wrongs]);
      pool.push({sig:'blank:'+correct.toLowerCase(),q:cfg.blankPhrase.replace('{S}',blanked),options:opts,correct:opts.indexOf(correct),fact:sent});
    }
  });

  // de-dupe by signature (same underlying fact), keep first occurrence
  const seenSig=new Set();
  return pool.filter(q=>{ if(seenSig.has(q.sig))return false; seenSig.add(q.sig); return true; });
}
function generateTopicQuestions(r,diffKey){
  const cfg=TQ_DIFFICULTY[diffKey]||TQ_DIFFICULTY.easy;
  const pool=shuffleArr(generateQuestionPool(r,diffKey));
  const topicKey=r.title.toLowerCase()+'::'+diffKey;
  if(!_tqSeenQ[topicKey])_tqSeenQ[topicKey]=new Set();
  const seen=_tqSeenQ[topicKey];
  let fresh=pool.filter(q=>!seen.has(q.sig));
  // pool exhausted (or too small to begin with) — reset so replay still surfaces previously-seen
  // questions again rather than returning fewer than requested
  if(fresh.length<Math.min(cfg.count,pool.length)){ seen.clear(); fresh=pool; }
  const chosen=fresh.slice(0,cfg.count);
  chosen.forEach(q=>seen.add(q.sig));
  return chosen;
}
function buildQuickRevision(r){
  const pts=[];
  if(r.hook)pts.push(r.hook.split(/(?<=[.!?])\s/)[0]);
  (r.highlights||[]).slice(0,4).forEach(h=>pts.push(h));
  if(r.figs&&r.figs.length)pts.push('Key figures: '+r.figs.slice(0,3).join(', '));
  return [...new Set(pts)].slice(0,6);
}
async function buildHubStory(r){
  return (await findHandStory(r.title)) || buildGenericStory(r);
}
let _hubCurrentR=null,_hubActiveTab='background';
function openTopicHub(r){
  _hubCurrentR=r;
  window._lastResult=r;
  const overview=buildOverviewText(r);
  const keyPoints=(r.highlights&&r.highlights.length?r.highlights:[r.hook]).filter(Boolean).slice(0,7);
  const detailSecs=[
    {key:'background',label:'Background',paras:r.acts?.background||[]},
    {key:'events',label:'Event Details',paras:r.acts?.events||[]},
    {key:'aftermath',label:'Aftermath',paras:[...(r.acts?.consequences||[]),...(r.acts?.legacy||[])]},
  ].filter(s=>s.paras.length);
  _hubActiveTab=detailSecs[0]?.key||'background';
  const tabsHtml=detailSecs.map(s=>`<button class="hub-detail-tab${s.key===_hubActiveTab?' active':''}" data-key="${s.key}">${escH(s.label)}</button>`).join('');
  const panelsHtml=detailSecs.map(s=>`<div class="hub-detail-panel${s.key===_hubActiveTab?' active':''}" data-key="${s.key}">${s.paras.map(p=>`<p>${escH(p)}</p>`).join('')}</div>`).join('');
  const related=(r.related||[]).slice(0,6);
  document.getElementById('hubContent').innerHTML=`
    <div class="hub-title">${escH(r.title)}${r.yearNum!=null?` <span style="color:var(--bone-d);font-weight:400;">(${r.yearNum})</span>`:''}</div>
    <div class="hub-period">${escH(r.period||'')}</div>

    <div class="hub-card">
      <div class="hub-card-head"><div class="sec-icon">${ICO_OV}</div><h4>Overview</h4></div>
      <p class="hub-overview-text">${escH(overview)}</p>
    </div>

    <div class="hub-card">
      <div class="hub-card-head"><div class="sec-icon">${ICO_LG}</div><h4>Key Points</h4></div>
      <ul class="hub-keypoints">${keyPoints.map(k=>`<li>${escH(k)}</li>`).join('')}</ul>
    </div>

    <div class="hub-card">
      <div class="hub-card-head"><div class="sec-icon">${ICO_EV}</div><h4>Explore This Topic</h4></div>
      <div class="hub-modes-grid">
        <div class="hub-mode-card" id="hubModeStory"><span class="hub-mode-emoji">🎬</span><div class="hub-mode-name">Story Mode</div><div class="hub-mode-desc">Narrative scene-by-scene retelling</div></div>
        <div class="hub-mode-card" id="hubModeGuess"><span class="hub-mode-emoji">🎯</span><div class="hub-mode-name">Guess Mode</div><div class="hub-mode-desc">Quick guesses, instant reveal</div></div>
        <div class="hub-mode-card" id="hubModeChallenge"><span class="hub-mode-emoji">🏆</span><div class="hub-mode-name">Challenge Mode</div><div class="hub-mode-desc">NDA-level MCQs, scored</div></div>
        <div class="hub-mode-card" id="hubModeRevision"><span class="hub-mode-emoji">⚡</span><div class="hub-mode-name">Quick Revision</div><div class="hub-mode-desc">1-minute bullet summary</div></div>
      </div>
      <div class="hub-revision-box" id="hubRevisionBox"></div>
    </div>

    ${detailSecs.length?`<div class="hub-card">
      <div class="hub-card-head"><div class="sec-icon">${ICO_BG}</div><h4>Detailed Explanation</h4></div>
      <div class="hub-detail-tabs">${tabsHtml}</div>
      ${panelsHtml}
    </div>`:''}

    ${related.length?`<div class="hub-card">
      <div class="hub-card-head"><div class="sec-icon">${ICO_RL}</div><h4>Related Topics</h4></div>
      <div class="hub-related-grid">${related.map(t=>`<div class="hub-related-item" data-topic="${escH(t).replace(/"/g,'&quot;')}">${escH(t)}</div>`).join('')}</div>
    </div>`:''}

    <a class="hub-source-link" href="${r.url}" target="_blank" rel="noopener">📖 Read full article on Wikipedia ↗</a>
  `;
  // wire detail tabs
  document.querySelectorAll('.hub-detail-tab').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.hub-detail-tab').forEach(b=>b.classList.toggle('active',b===btn));
      document.querySelectorAll('.hub-detail-panel').forEach(p=>p.classList.toggle('active',p.dataset.key===btn.dataset.key));
    });
  });
  // wire related topics
  document.querySelectorAll('.hub-related-item').forEach(el=>{
    el.addEventListener('click',()=>{
      closeTopicHub();
      relClick(el.dataset.topic);
    });
  });
  // wire mode cards
  document.getElementById('hubModeStory').addEventListener('click',async(e)=>{
    const card=e.currentTarget;
    const nameEl=card.querySelector('.hub-mode-name');
    const origText=nameEl.textContent;
    if(card.classList.contains('loading'))return; // prevent double-tap re-entry while fetch is in flight
    card.classList.add('loading'); nameEl.textContent='Loading…';
    try{
      openStoryModeWith(await buildHubStory(r));
    }finally{
      card.classList.remove('loading'); nameEl.textContent=origText;
    }
  });
  document.getElementById('hubModeGuess').addEventListener('click',()=>openTqDifficultyScreen(r,'guess'));
  document.getElementById('hubModeChallenge').addEventListener('click',()=>openTqDifficultyScreen(r,'challenge'));
  document.getElementById('hubModeRevision').addEventListener('click',()=>{
    const box=document.getElementById('hubRevisionBox');
    if(box.classList.contains('show')){ box.classList.remove('show'); return; }
    box.innerHTML='<ul>'+buildQuickRevision(r).map(p=>`<li>⚡ ${escH(p)}</li>`).join('')+'</ul>';
    box.classList.add('show');
  });
  activateOverlay('topicHub',closeTopicHub);
  document.getElementById('hubContent').scrollTop=0;
}
function closeTopicHub(){ deactivateOverlay('topicHub'); }
document.getElementById('hubClose').addEventListener('click',closeTopicHub);

/* ── FOCUS TRAP ── reusable for modal-style overlays (gate, quiz, popups, graph view) so keyboard/
   screen-reader users can't tab focus out into hidden content behind the overlay. */
function trapFocus(container){
  function handler(e){
    if(e.key!=='Tab')return;
    const focusables=[...container.querySelectorAll('button,a[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter(el=>!el.disabled&&el.offsetParent!==null);
    if(!focusables.length)return;
    const first=focusables[0],last=focusables[focusables.length-1];
    if(e.shiftKey&&document.activeElement===first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey&&document.activeElement===last){ e.preventDefault(); first.focus(); }
  }
  container.addEventListener('keydown',handler);
  return ()=>container.removeEventListener('keydown',handler);
}

/* ── GENERIC OVERLAY ACTIVATION ── wraps the existing classList.add('active') pattern with focus
   trapping and an Escape-to-close, so every full-screen overlay (quiz, story, guess, popups)
   behaves consistently for keyboard and screen-reader users without rewriting each one bespoke.
   ALSO pushes a history entry per overlay so the device/browser BACK button closes just the
   top overlay instead of leaving the whole site (see popstate handler below). */
const _overlayUntraps=new Map();
const _overlayStack=[]; // [{id, closeFn}], top of array = most recently opened overlay
let _suppressPopHandling=false; // true while we are programmatically rewinding history ourselves
function activateOverlay(id,closeFn){
  const el=document.getElementById(id);
  if(!el)return;
  el.classList.add('active');
  if(_overlayUntraps.has(id))_overlayUntraps.get(id)();
  const untrap=trapFocus(el);
  const escHandler=(e)=>{ if(e.key==='Escape'&&el.classList.contains('active')&&closeFn)closeFn(); };
  document.addEventListener('keydown',escHandler);
  _overlayUntraps.set(id,()=>{ untrap(); document.removeEventListener('keydown',escHandler); });
  const firstFocusable=el.querySelector('button,a[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
  if(firstFocusable)setTimeout(()=>firstFocusable.focus(),50);
  // record this overlay on the back-button stack (skip if already top, e.g. re-render of same overlay)
  if(_overlayStack.length===0||_overlayStack[_overlayStack.length-1].id!==id){
    _overlayStack.push({id,closeFn});
    try{ history.pushState({bhOverlay:id,bhDepth:_overlayStack.length},''); }catch{}
  }else{
    _overlayStack[_overlayStack.length-1].closeFn=closeFn; // keep closeFn fresh
  }
}
function deactivateOverlay(id){
  const el=document.getElementById(id);
  if(el)el.classList.remove('active');
  if(_overlayUntraps.has(id)){ _overlayUntraps.get(id)(); _overlayUntraps.delete(id); }
  const idx=_overlayStack.findIndex(o=>o.id===id);
  if(idx!==-1){
    _overlayStack.splice(idx,1);
    // if this close happened via UI (✕/Escape/click), not via back button, unwind one history
    // entry to keep history length in sync with the overlay stack so back-presses don't pile up.
    if(!_suppressPopHandling){
      try{ history.back(); }catch{}
    }
  }
}
// Single global listener: when the user/browser presses BACK, close the top-most open overlay
// instead of letting the browser navigate away from the page. Only if no overlay is open does
// back fall through to normal browser behavior (leaving the site / going to previous search).
window.addEventListener('popstate',()=>{
  if(_overlayStack.length>0){
    _suppressPopHandling=true;
    const top=_overlayStack.pop();
    try{ if(top&&typeof top.closeFn==='function')top.closeFn(); }catch{}
    _suppressPopHandling=false;
  }
});

/* ── RELATIONS GRAPH VIEW ── visualizes r.related / curated graph + key figures as a simple
   hub-and-spoke SVG instead of a flat list, using data buildDossier already extracts.
   UPGRADED: clicking a leaf expands a second ring of its own connections in place;
   double-click (or the ↗ jump label) navigates to that topic. */
let _graphRootTitle=null;
function _graphSpokesFor(r){
  return [...new Set([...(r.related||[]),...(r.figs||[]).slice(0,4)])].slice(0,8);
}
function renderRelationGraphSvg(rootTitle,spokes,expandedTitle,expandedSpokes){
  const cx=380,cy=260,radius=190;
  const nodes=spokes.map((s,i)=>{
    const angle=(i/spokes.length)*Math.PI*2-Math.PI/2;
    return{title:s,x:cx+radius*Math.cos(angle),y:cy+radius*Math.sin(angle)};
  });
  const edges=nodes.map(n=>`<line class="graph-edge" x1="${cx}" y1="${cy}" x2="${n.x}" y2="${n.y}"/>`).join('');
  const centerNode=`<g class="graph-node center"><circle cx="${cx}" cy="${cy}" r="46"/><text x="${cx}" y="${cy+4}" text-anchor="middle" font-size="11">${escH(rootTitle.length>16?rootTitle.slice(0,15)+'…':rootTitle)}</text></g>`;
  let extraRing='';
  let leafNodes=nodes.map(n=>{
    const isExpanded=expandedTitle&&n.title===expandedTitle;
    const safe=escH(n.title).replace(/'/g,"\\'");
    if(isExpanded&&expandedSpokes&&expandedSpokes.length){
      const r2=78;
      const subNodes=expandedSpokes.map((s,j)=>{
        const angle=(j/expandedSpokes.length)*Math.PI*2-Math.PI/2;
        return{title:s,x:n.x+r2*Math.cos(angle),y:n.y+r2*Math.sin(angle)};
      });
      extraRing+=subNodes.map(sn=>`<line class="graph-edge sub" x1="${n.x}" y1="${n.y}" x2="${sn.x}" y2="${sn.y}"/>`).join('');
      extraRing+=subNodes.map(sn=>{
        const ssafe=escH(sn.title).replace(/'/g,"\\'");
        return `<g class="graph-node sub" onclick="closeGraphView();relClick('${ssafe}')"><circle cx="${sn.x}" cy="${sn.y}" r="24"/><text x="${sn.x}" y="${sn.y+3}" text-anchor="middle" font-size="8">${escH(sn.title.length>12?sn.title.slice(0,11)+'…':sn.title)}</text></g>`;
      }).join('');
    }
    return `<g class="graph-node leaf${isExpanded?' expanded':''}" data-title="${safe}" ondblclick="closeGraphView();relClick('${safe}')"><circle cx="${n.x}" cy="${n.y}" r="34"/><text x="${n.x}" y="${n.y+4}" text-anchor="middle" font-size="9.5">${escH(n.title.length>14?n.title.slice(0,13)+'…':n.title)}</text></g>`;
  }).join('');
  const box=document.getElementById('graphContent');
  box.innerHTML=`<h3>${escH(rootTitle)}</h3><p class="graph-sub">Tap a topic to expand its own connections · double-tap to jump there</p>
    <div class="graph-svg-wrap"><svg viewBox="0 0 760 520" width="100%" style="max-width:680px">${edges}${extraRing}${centerNode}${leafNodes}</svg></div>`;
  box.querySelectorAll('.graph-node.leaf').forEach(node=>{
    node.addEventListener('click',(e)=>{
      const t=node.dataset.title;
      if(expandedTitle===t){ renderRelationGraphSvg(rootTitle,spokes,null,null); return; }
      const sub=getRelatedFromGraph(t);
      renderRelationGraphSvg(rootTitle,spokes,t,(sub||[]).slice(0,5));
    });
  });
}
function openRelationGraph(r){
  if(!r)return;
  _graphRootTitle=r.title;
  const box=document.getElementById('graphContent');
  const spokes=_graphSpokesFor(r);
  if(!spokes.length){
    box.innerHTML=`<h3>${escH(r.title)}</h3><div class="graph-empty">No connected topics found for this entry yet.</div>`;
  }else{
    renderRelationGraphSvg(r.title,spokes,null,null);
  }
  const gv=document.getElementById('graphView');
  gv.classList.add('active');
  activateOverlay('graphView',closeGraphView);
  document.getElementById('graphClose').focus();
}
function closeGraphView(){
  deactivateOverlay('graphView');
}
document.getElementById('graphClose').addEventListener('click',closeGraphView);

/* ── PDF EXPORT ── prints the current result as a browser print-to-PDF, reusing the same text
   the Copy Notes button extracts so formatting stays consistent without a server round-trip. */
function exportResultAsPdf(){
  const r=window._lastResult;
  if(!r){toast('Nothing to export yet');return;}
  const w=window.open('','_blank');
  if(!w){toast('Please allow pop-ups to export a PDF');return;}
  const bodyHtml=document.querySelector('#resultArea .res-main')?.innerHTML||'<p>No content.</p>';
  w.document.write(`<!DOCTYPE html><html><head><title>${escH(r.title)} — Bhārat Itihās</title>
    <style>body{font-family:Georgia,serif;max-width:680px;margin:2rem auto;padding:0 1.5rem;color:#1a1a1a;line-height:1.6;}
    h1{font-size:1.8rem;margin-bottom:.2rem;}h4{margin-top:1.6rem;color:#5a3d8a;}
    .src{margin-top:2rem;font-size:.85rem;color:#666;}</style></head>
    <body><h1>${escH(r.title)}</h1><p><em>${escH(r.period||'')}</em></p>${bodyHtml}
    <p class="src">Source: <a href="${r.url}">${r.url}</a></p>
    <script>window.onload=()=>setTimeout(()=>window.print(),300)<\/script>
    </body></html>`);
  w.document.close();
}

/* ── ON THIS DAY ── reuses buildDateDossier('today') so it shares the same India-history filtering
   as Date Mode. Cached per calendar day and dismissible (dismissal also remembered per-day). */
const OTD_DISMISS_KEY='bharatOtdDismissedDay';
async function loadOnThisDay(){
  const card=document.getElementById('onThisDayCard');
  if(!card)return;
  const todayKey=new Date().toISOString().slice(0,10);
  if(safeStore.get(OTD_DISMISS_KEY,null)===todayKey && !safeStore.get('otd-remind-pref',false))return; // user dismissed it today already
  const cacheKey='otd-'+todayKey;
  let r=getCachedDossier(cacheKey);
  card.classList.add('show');
  card.innerHTML=`<div class="otd-head"><h4>📅 On This Day in History</h4><button class="otd-close" aria-label="Dismiss">✕</button></div><div class="otd-body otd-loading">Consulting the archive…</div>`;
  card.querySelector('.otd-close').addEventListener('click',()=>{
    safeStore.set(OTD_DISMISS_KEY,todayKey);
    card.classList.remove('show');
  });
  if(!r){
    try{ r=await buildDateDossier('today'); setCachedDossier(cacheKey,r); }
    catch(e){ card.classList.remove('show'); return; }
  }
  const body=card.querySelector('.otd-body');
  if(!body)return; // card may have been dismissed while awaiting
  const lines=(r.acts&&r.acts.events.length)?r.acts.events:(r.highlights||[]);
  if(!lines.length){ card.classList.remove('show'); return; }
  const remindOn=safeStore.get('otd-remind-pref',false);
  body.innerHTML=`<ul>${lines.slice(0,5).map(l=>`<li onclick="selectMode('topic');queryInput.value='${escH(l.slice(0,40)).replace(/'/g,"\\'")}';document.getElementById('searchPanel').scrollIntoView({behavior:'smooth'});">${escH(l)}</li>`).join('')}</ul>
  <label class="otd-remind"><input type="checkbox" id="otdRemindChk" ${remindOn?'checked':''}> Remind me daily when I open the chronicle</label>`;
  const chk=document.getElementById('otdRemindChk');
  if(chk)chk.addEventListener('change',()=>{
    safeStore.set('otd-remind-pref',chk.checked);
    if(chk.checked)showToast('You\'ll see "On This Day" every time you visit 📅','🔔');
  });
}

/* ── Topic Quiz (Guess / Challenge) — generated fresh per topic, per difficulty, every time ── */
let _tqQuestions=[],_tqIdx=0,_tqScore=0,_tqAnswered=false,_tqHard=false,_tqR=null,_tqDiff='easy',_tqTimer=null,_tqTimeLeft=60,_tqStreak=0;
function openTqDifficultyScreen(r,kind){
  _tqR=r;_tqHard=(kind==='challenge');
  document.getElementById('tqDiffTitle').textContent=_tqHard?'🏆 Challenge Mode — Choose Difficulty':'🎯 Guess Mode — Choose Difficulty';
  document.getElementById('tqDiffScreen').classList.add('active');
  document.querySelector('.tq-shell').style.display='none';
  document.getElementById('tqResults').classList.remove('active');
  activateOverlay('topicQuiz',()=>{ stopTqTimer(); deactivateOverlay('topicQuiz'); document.getElementById('tqDiffScreen').classList.remove('active'); });
}
document.querySelectorAll('.tq-diff-card').forEach(btn=>{
  btn.addEventListener('click',()=>startTopicQuiz(_tqR,_tqHard,btn.dataset.diff));
});
function startTopicQuiz(r,hard,diffKey){
  _tqQuestions=generateTopicQuestions(r,diffKey);
  if(!_tqQuestions.length){ alert('Not enough structured facts were found for this topic to build a quiz yet — try a more specific search.'); return; }
  _tqIdx=0;_tqScore=0;_tqHard=hard;_tqDiff=diffKey;_tqStreak=0;
  const diffLabel=diffKey.charAt(0).toUpperCase()+diffKey.slice(1);
  document.getElementById('tqLabel').textContent=(hard?'🏆 Challenge Mode — ':'🎯 Guess Mode — ')+diffLabel;
  document.getElementById('tqDiffScreen').classList.remove('active');
  document.querySelector('.tq-shell').style.display='block';
  document.getElementById('tqResults').classList.remove('active');
  showTqQuestion();
}
function showTqQuestion(){
  const q=_tqQuestions[_tqIdx];
  _tqAnswered=false;
  document.getElementById('tqProgressText').textContent=`Question ${_tqIdx+1} of ${_tqQuestions.length}`;
  document.getElementById('tqScoreText').textContent=`Score: ${_tqScore}`;
  document.getElementById('tqQText').textContent=q.q;
  const wrap=document.getElementById('tqOptions');
  wrap.innerHTML=q.options.map((o,i)=>`<button class="guess-opt-btn" data-correct="${i===q.correct}">${escH(o)}</button>`).join('');
  wrap.querySelectorAll('.guess-opt-btn').forEach(btn=>btn.addEventListener('click',()=>handleTqAnswer(btn,q)));
  document.getElementById('tqFeedback').classList.remove('show');
  document.getElementById('tqNextBtn').classList.remove('show');
  startTqTimer();
}
function startTqTimer(){
  clearInterval(_tqTimer);
  const limit=(TQ_DIFFICULTY[_tqDiff]||TQ_DIFFICULTY.easy).time;
  _tqTimeLeft=limit;
  const fill=document.getElementById('tqTimerFill');
  const num=document.getElementById('tqTimerNum');
  fill.classList.remove('warn','danger');num.classList.remove('warn','danger');
  fill.style.transition='none';fill.style.width='100%';num.textContent=_tqTimeLeft;
  requestAnimationFrame(()=>{ fill.style.transition='width 1s linear'; });
  _tqTimer=setInterval(()=>{
    _tqTimeLeft--;
    num.textContent=Math.max(0,_tqTimeLeft);
    fill.style.width=Math.max(0,(_tqTimeLeft/limit)*100)+'%';
    if(_tqTimeLeft<=limit*0.34){fill.classList.add('danger');fill.classList.remove('warn');num.classList.add('danger');num.classList.remove('warn');}
    else if(_tqTimeLeft<=limit*0.6){fill.classList.add('warn');num.classList.add('warn');}
    if(_tqTimeLeft<=0){clearInterval(_tqTimer);handleTqTimeout();}
  },1000);
}
function stopTqTimer(){clearInterval(_tqTimer);}
function handleTqTimeout(){
  if(_tqAnswered)return;
  _tqAnswered=true;
  const q=_tqQuestions[_tqIdx];
  document.querySelectorAll('#tqOptions .guess-opt-btn').forEach(b=>{ b.disabled=true; if(b.dataset.correct==='true')b.classList.add('correct'); });
  _tqStreak=0;
  const fb=document.getElementById('tqFeedback');
  fb.innerHTML=`<div class="guess-feedback-summary">${escH(historianTimeoutLine())} ${escH(q.fact)}</div>`;
  fb.classList.add('show');
  document.getElementById('tqNextBtn').classList.add('show');
}
function handleTqAnswer(btn,q){
  if(_tqAnswered)return;
  _tqAnswered=true;
  stopTqTimer();
  const isCorrect=btn.dataset.correct==='true';
  const priorStreak=_tqStreak;
  if(isCorrect){_tqScore+=_tqHard?20:10;_tqStreak++;} else {_tqStreak=0;}
  document.querySelectorAll('#tqOptions .guess-opt-btn').forEach(b=>{
    b.disabled=true;
    if(b.dataset.correct==='true')b.classList.add('correct');
    else if(b===btn)b.classList.add('wrong');
  });
  const historianLine=isCorrect?historianCorrectLine(_tqStreak):historianWrongLine(priorStreak);
  const fb=document.getElementById('tqFeedback');
  fb.innerHTML=`<div class="guess-feedback-summary">${escH(historianLine)} ${escH(q.fact)}</div>`;
  fb.classList.add('show');
  document.getElementById('tqScoreText').textContent=`Score: ${_tqScore}`;
  document.getElementById('tqNextBtn').classList.add('show');
}
document.getElementById('tqNextBtn').addEventListener('click',()=>{
  _tqIdx++;
  if(_tqIdx>=_tqQuestions.length){ showTqResults(); } else { showTqQuestion(); }
});
/* ── QUIZ SCORE HISTORY ── persists each quiz attempt per topic so the results screen can show
   a personal best and a short trend, instead of the score vanishing once the quiz closes. */
const QUIZ_HISTORY_KEY='bharatQuizHistory';
function recordQuizScore(topic,pct,diff){
  const h=safeStore.get(QUIZ_HISTORY_KEY,{});
  const key=topic.toLowerCase();
  if(!h[key])h[key]=[];
  h[key].push({pct,diff,t:Date.now()});
  if(h[key].length>10)h[key]=h[key].slice(-10);
  safeStore.set(QUIZ_HISTORY_KEY,h);
  const attempts=h[key];
  const best=Math.max(...attempts.map(a=>a.pct));
  return{attempts:attempts.length,best};
}

/* ── SCHOLAR'S RECORD ── a single profile view pulling together data already tracked
   separately elsewhere (Journey trail, Favorites, Quiz History, Daily Streak). No new
   tracking is introduced here — this only reads and presents what already exists. */
const TITLE_CASE_SMALL_WORDS=new Set(['of','the','and','in','at','on','to','a','an','for','vs']);
function titleCaseTopic(key){
  return key.split(' ').map((word,i)=>{
    if(!word)return word;
    if(i>0&&TITLE_CASE_SMALL_WORDS.has(word))return word;
    return word.charAt(0).toUpperCase()+word.slice(1);
  }).join(' ');
}
function buildScholarRecordHTML(){
  const journey=getJourney(); // most recent 12 topics only, by design of addToJourney()
  const favs=getFavorites();
  const streak=safeStore.get(STREAK_KEY,{count:0,best:0});
  const quizHistory=safeStore.get(QUIZ_HISTORY_KEY,{});
  const quizTopics=Object.keys(quizHistory);
  const totalQuizAttempts=quizTopics.reduce((sum,k)=>sum+quizHistory[k].length,0);
  const overallBest=quizTopics.length
    ? Math.max(...quizTopics.map(k=>Math.max(...quizHistory[k].map(a=>a.pct))))
    : null;

  // Pick a historian line that reacts to the overall picture, not a fixed score percentage —
  // reuses the existing verdict line banks for tonal consistency with the quiz feedback.
  const historianLine = overallBest===null
    ? "The chronicle awaits your first chapter, scholar. Explore a topic, take a quiz — let us begin."
    : historianVerdict(overallBest);

  const statsHtml=`
    <div class="sr-stats-grid">
      <div class="sr-stat-tile"><span class="sr-stat-num">🔥 ${streak.count||0}</span><span class="sr-stat-label">Day Streak</span></div>
      <div class="sr-stat-tile"><span class="sr-stat-num">${favs.length}</span><span class="sr-stat-label">Saved Topics</span></div>
      <div class="sr-stat-tile"><span class="sr-stat-num">${journey.length}</span><span class="sr-stat-label">Recent Journey</span></div>
      <div class="sr-stat-tile"><span class="sr-stat-num">${totalQuizAttempts}</span><span class="sr-stat-label">Quiz Attempts</span></div>
    </div>`;

  const journeyHtml=journey.length
    ? `<div class="sr-journey-list">${journey.slice().reverse().map(t=>`<button type="button" class="sr-journey-chip" data-topic="${escH(t)}">${escH(t)}</button>`).join('')}</div>`
    : `<div class="sr-empty">No topics explored yet — search for anything to begin your journey.</div>`;

  const favsHtml=favs.length
    ? favs.slice().reverse().map(t=>`<div class="sr-fav-row" data-topic="${escH(t)}"><span>★ ${escH(t)}</span><span class="sr-fav-arrow">→</span></div>`).join('')
    : `<div class="sr-empty">No saved topics yet — tap the ★ on any topic to bookmark it here.</div>`;

  let quizHtml;
  if(quizTopics.length){
    const rows=quizTopics.map(key=>{
      const attempts=quizHistory[key];
      const best=Math.max(...attempts.map(a=>a.pct));
      const last=attempts[attempts.length-1];
      // titles are stored lowercased as the lookup key; show a capitalized approximation
      const displayTitle=titleCaseTopic(key);
      return `<div class="sr-quiz-row" data-topic="${escH(displayTitle)}">
        <span class="sr-quiz-topic">${escH(displayTitle)}</span>
        <span class="sr-quiz-meta">${attempts.length} attempt${attempts.length===1?'':'s'} · <span class="sr-quiz-best">${best}% best</span></span>
      </div>`;
    }).join('');
    quizHtml=rows;
  } else {
    quizHtml=`<div class="sr-empty">No quizzes attempted yet — open any topic and try Challenge Mode or its Guess Mode.</div>`;
  }

  return `
    <div class="sr-header">
      <h2>📜 The Scholar's Record</h2>
      <div class="sr-historian-line">${escH(historianLine)}</div>
    </div>
    ${statsHtml}
    <div class="sr-section">
      <div class="sr-section-title">🧭 Your Journey So Far</div>
      ${journeyHtml}
    </div>
    <div class="sr-section">
      <div class="sr-section-title">★ Saved Topics</div>
      ${favsHtml}
    </div>
    <div class="sr-section">
      <div class="sr-section-title">🏆 Quiz History</div>
      ${quizHtml}
    </div>
  `;
}
function openScholarRecord(){
  document.getElementById('scholarRecordContent').innerHTML=buildScholarRecordHTML();
  activateOverlay('scholarRecord',closeScholarRecord);
  document.getElementById('scholarRecordContent').querySelectorAll('[data-topic]').forEach(el=>{
    el.addEventListener('click',()=>{
      const topic=el.dataset.topic;
      closeScholarRecord();
      setTimeout(()=>relClick(topic),50); // let the overlay finish closing before scrolling to search
    });
  });
}
function closeScholarRecord(){ deactivateOverlay('scholarRecord'); }
document.getElementById('scholarRecordClose').addEventListener('click',closeScholarRecord);
document.getElementById('scholarRecordBtn').addEventListener('click',openScholarRecord);

function showTqResults(){
  stopTqTimer();
  document.querySelector('.tq-shell').style.display='none';
  const max=_tqQuestions.length*(_tqHard?20:10);
  document.getElementById('tqFinalScore').textContent=`${_tqScore}/${max}`;
  const pct=max?Math.round((_tqScore/max)*100):0;
  document.getElementById('tqVerdict').textContent=historianVerdict(pct);
  document.getElementById('tqResults').classList.add('active');
  const topic=_tqR&&_tqR.title?_tqR.title:'general';
  const stats=recordQuizScore(topic,pct,_tqDiff);
  const bestEl=document.getElementById('tqBestScore');
  if(bestEl){
    bestEl.textContent=stats.attempts>1
      ? `Personal best on this topic: ${stats.best}% (${stats.attempts} attempts)`
      : `First attempt on this topic — ${pct}%`;
  }
}
document.getElementById('tqDoneBtn').addEventListener('click',()=>{ stopTqTimer(); deactivateOverlay('topicQuiz'); });
document.getElementById('tqClose').addEventListener('click',()=>{ stopTqTimer(); deactivateOverlay('topicQuiz'); document.getElementById('tqDiffScreen').classList.remove('active'); });


/* ══ STORY MODE — cinematic scene-by-scene player ══ */
let STORY_LIBRARY={}; // populated lazily by fetchLazyData() the first time Story Mode opens a curated topic — see findHandStory()
async function findHandStory(title){
  if(Object.keys(STORY_LIBRARY).length===0){
    STORY_LIBRARY=await fetchLazyData('STORY_LIBRARY','data-story-library',{});
  }
  const key=title.toLowerCase().trim();
  if(STORY_LIBRARY[key]) return STORY_LIBRARY[key];
  for(const k of Object.keys(STORY_LIBRARY)){ if(key.includes(k)||k.includes(key)) return STORY_LIBRARY[k]; }
  return null;
}
function buildGenericStory(r){
  const scenes=[];
  if(r.hook) scenes.push({caption:r.title,text:r.hook});
  const acts=r.acts||{background:[],events:[],consequences:[],legacy:[]};
  acts.background.slice(0,2).forEach(p=>scenes.push({caption:"Background",text:p.length>240?p.slice(0,237)+'…':p}));
  acts.events.slice(0,4).forEach(p=>scenes.push({caption:"Major Events",text:p.length>240?p.slice(0,237)+'…':p}));
  acts.consequences.slice(0,2).forEach(p=>scenes.push({caption:"Consequences",text:p.length>240?p.slice(0,237)+'…':p}));
  acts.legacy.slice(0,2).forEach(p=>scenes.push({caption:"Legacy",text:p.length>240?p.slice(0,237)+'…':p}));
  // last-resort fallbacks so Story Mode always has something to show rather than opening on a blank screen
  if(!scenes.length && r.highlights && r.highlights.length){
    r.highlights.slice(0,6).forEach((h,i)=>scenes.push({caption:i===0?r.title:"Key Point",text:h}));
  }
  if(!scenes.length){
    scenes.push({caption:r.title,text:r.period?`${r.title} — ${r.period}. Full details weren't available to build a scene-by-scene story for this topic; try "Detailed Explanation" above instead.`:`No narrative detail was found for "${r.title}" yet — try "Detailed Explanation" above, or search a more specific topic.`});
  }
  return{title:r.title,year:r.period||'',scenes:scenes.slice(0,10)};
}
/* Single safe entry point used by both the result-page button and the Topic Hub card —
   guarantees Story Mode never opens blank and never silently no-ops. */
function openStoryModeWith(storyData){
  if(!storyData || !storyData.scenes || !storyData.scenes.length){
    alert('No story content could be built for this topic yet — try "Detailed Explanation" or a more specific search.');
    return;
  }
  _storyData=storyData;
  _storyIdx=0;
  _storyPlaying=true;
  const ppBtn=document.getElementById('storyPlayPause');
  if(ppBtn)ppBtn.textContent='⏸ Pause';
  document.getElementById('storyMode').classList.add('active');
  renderStoryScenes();
  startStoryAutoplay();
  activateOverlay('storyMode',closeStoryMode);
}

let _storyData=null,_storyIdx=0,_storyTimer=null,_storyPlaying=true;
const STORY_SCENE_MS=7000;

async function openStoryMode(){
  const r=window._lastResult;
  if(!r) return;
  openStoryModeWith((await findHandStory(r.title))||buildGenericStory(r));
}
const STORY_ICONS={
  battle:`<svg viewBox="0 0 36 36" fill="none"><path d="M18 4l3.5 10.5H32l-8.7 6.3 3.3 10.2L18 25l-8.6 6 3.3-10.2L4 14.5h10.5z" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  ruler:`<svg viewBox="0 0 36 36" fill="none"><path d="M9 14l9-7 9 7M9 14v4c0 5 4 9 9 9s9-4 9-9v-4M9 14H5m22 0h4" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  empire:`<svg viewBox="0 0 36 36" fill="none"><rect x="4" y="8" width="28" height="20" rx="2" stroke-width="1.6"/><line x1="4" y1="15" x2="32" y2="15" stroke-width="1.3"/><circle cx="10" cy="22" r="2" stroke-width="1.3"/><circle cx="18" cy="22" r="2" stroke-width="1.3"/><circle cx="26" cy="22" r="2" stroke-width="1.3"/></svg>`,
  temple:`<svg viewBox="0 0 36 36" fill="none"><path d="M4 30h28M7 30V17l11-9 11 9v13M13 30V21h10v9" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  legacy:`<svg viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="15" stroke-width="1.6"/><circle cx="18" cy="18" r="3" fill="currentColor"/><line x1="18" y1="3" x2="18" y2="33" stroke-width="1.2"/><line x1="3" y1="18" x2="33" y2="18" stroke-width="1.2"/></svg>`,
  transformation:`<svg viewBox="0 0 36 36" fill="none"><path d="M18 4a14 14 0 1 0 9.9 4.1" stroke-width="1.6" stroke-linecap="round"/><path d="M27 4v8h-8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  document:`<svg viewBox="0 0 36 36" fill="none"><rect x="7" y="4" width="22" height="28" rx="2" stroke-width="1.6"/><line x1="11" y1="11" x2="25" y2="11" stroke-width="1.3"/><line x1="11" y1="17" x2="25" y2="17" stroke-width="1.3"/><line x1="11" y1="23" x2="20" y2="23" stroke-width="1.3"/></svg>`,
  movement:`<svg viewBox="0 0 36 36" fill="none"><path d="M6 30l12-24 12 24" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 22h18" stroke-width="1.6"/><circle cx="18" cy="8" r="2" fill="currentColor"/></svg>`,
  default:`<svg viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="14" stroke-width="1.6"/><path d="M18 10v8l6 4" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};
function pickStoryIcon(caption,text){
  const s=(caption+' '+text).toLowerCase();
  if(/battle|war|siege|invasion|fight|army|attack/.test(s)) return STORY_ICONS.battle;
  if(/legacy|remember|today|lasting/.test(s)) return STORY_ICONS.legacy;
  if(/transform|haunted|chang|conver/.test(s)) return STORY_ICONS.transformation;
  if(/edict|treaty|resolution|declar|document|constitution/.test(s)) return STORY_ICONS.document;
  if(/movement|march|protest|resist|strike/.test(s)) return STORY_ICONS.movement;
  if(/temple|monument|fort|palace/.test(s)) return STORY_ICONS.temple;
  if(/empire|kingdom|dynasty|throne|capital/.test(s)) return STORY_ICONS.empire;
  if(/emperor|king|ruler|nawab|general|leader|gandhi|ashoka/.test(s)) return STORY_ICONS.ruler;
  return STORY_ICONS.default;
}
function renderStoryScenes(){
  const wrap=document.getElementById('storyScenes');
  const prog=document.getElementById('storyProgress');
  wrap.innerHTML=_storyData.scenes.map((s,i)=>`
    <div class="story-scene${i===_storyIdx?' active':''}" data-idx="${i}">
      <div class="story-scene-bg"></div>
      <div class="story-scene-vignette"></div>
      <div class="story-counter">${i+1} / ${_storyData.scenes.length} · ${escH(_storyData.title||'')}</div>
      <div class="story-scene-content">
        <div class="story-scene-icon">${pickStoryIcon(s.caption,s.text)}</div>
        <div class="story-caption">${escH(s.caption)}</div>
        <div class="story-text">${escH(s.text)}</div>
      </div>
    </div>`).join('');
  prog.innerHTML=_storyData.scenes.map((s,i)=>`<div class="story-progress-bar${i<_storyIdx?' done':''}" data-idx="${i}"><div class="story-progress-fill" style="${i===_storyIdx?'':'width:'+(i<_storyIdx?'100%':'0%')+'!important;transition:none;'}"></div></div>`).join('');
}
function goToScene(idx){
  if(idx<0||idx>=_storyData.scenes.length){ if(idx>=_storyData.scenes.length) closeStoryMode(); return; }
  _storyIdx=idx;
  document.querySelectorAll('.story-scene').forEach((el,i)=>el.classList.toggle('active',i===idx));
  document.querySelectorAll('.story-progress-bar').forEach((el,i)=>{
    const fill=el.querySelector('.story-progress-fill');
    el.classList.toggle('done',i<idx);
    if(i<idx){ fill.style.transition='none'; fill.style.width='100%'; }
    else if(i===idx){ fill.style.transition='none'; fill.style.width='0%'; requestAnimationFrame(()=>{fill.style.transition=`width ${STORY_SCENE_MS}ms linear`;fill.style.width='100%';}); }
    else{ fill.style.transition='none'; fill.style.width='0%'; }
  });
  resetStoryAutoplay();
}
function startStoryAutoplay(){
  clearTimeout(_storyTimer);
  const fill=document.querySelectorAll('.story-progress-fill')[_storyIdx];
  if(fill){ fill.style.transition='none'; fill.style.width='0%'; requestAnimationFrame(()=>{fill.style.transition=`width ${STORY_SCENE_MS}ms linear`;fill.style.width='100%';}); }
  if(_storyPlaying){ _storyTimer=setTimeout(()=>goToScene(_storyIdx+1),STORY_SCENE_MS); }
}
function resetStoryAutoplay(){ if(_storyPlaying) startStoryAutoplay(); else clearTimeout(_storyTimer); }
function closeStoryMode(){
  clearTimeout(_storyTimer);
  deactivateOverlay('storyMode');
}
document.getElementById('storyClose').addEventListener('click',closeStoryMode);
document.getElementById('storyNext').addEventListener('click',()=>goToScene(_storyIdx+1));
document.getElementById('storyPrev').addEventListener('click',()=>goToScene(Math.max(0,_storyIdx-1)));
document.getElementById('storyPlayPause').addEventListener('click',function(){
  _storyPlaying=!_storyPlaying;
  this.textContent=_storyPlaying?'⏸ Pause':'▶ Play';
  if(_storyPlaying) startStoryAutoplay(); else clearTimeout(_storyTimer);
});
document.addEventListener('keydown',e=>{
  if(!document.getElementById('storyMode').classList.contains('active')) return;
  if(e.key==='ArrowRight') goToScene(_storyIdx+1);
  if(e.key==='ArrowLeft') goToScene(Math.max(0,_storyIdx-1));
});

/* ══ GUESS MODE — visual knowledge quiz ══ */
let GUESS_BANK=[]; // populated lazily by fetchLazyData() the first time Guess Mode is opened — see getGuessQuestions()

let _guessDifficulty='easy',_guessCount=5,_guessQuestions=[],_guessIdx=0,_guessScore=0,_guessAnswered=false,_guessStreak=0;
const GUESS_TIME_LIMITS={easy:60,medium:45,hard:30,extreme:15};
let _guessTimer=null,_guessTimeLeft=60;

function shuffleArr(arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function getGuessQuestions(difficulty,count){
  const pool=difficulty==='all'?GUESS_BANK:GUESS_BANK.filter(q=>q.difficulty===difficulty);
  return shuffleArr(pool).slice(0,Math.min(count,pool.length));
}

document.querySelectorAll('#guessDifficultyPills .guess-pill-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#guessDifficultyPills .guess-pill-btn').forEach(b=>b.classList.remove('selected'));
    btn.classList.add('selected');
    _guessDifficulty=btn.dataset.val;
  });
});
document.querySelectorAll('#guessCountPills .guess-pill-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#guessCountPills .guess-pill-btn').forEach(b=>b.classList.remove('selected'));
    btn.classList.add('selected');
    _guessCount=parseInt(btn.dataset.val);
  });
});
// sensible defaults pre-selected
document.querySelector('#guessDifficultyPills .guess-pill-btn[data-val="easy"]').classList.add('selected');
document.querySelector('#guessCountPills .guess-pill-btn[data-val="5"]').classList.add('selected');

document.getElementById('guessCard').addEventListener('click',()=>{
  document.getElementById('guessMode').classList.add('active');
  document.getElementById('guessSetup').style.display='block';
  document.getElementById('guessQuestionScreen').classList.remove('active');
  document.getElementById('guessResults').classList.remove('active');
  if(_overlayUntraps.has('guessMode'))_overlayUntraps.get('guessMode')();
  _overlayUntraps.set('guessMode',trapFocus(document.getElementById('guessMode')));
});
document.getElementById('guessClose').addEventListener('click',()=>{
  document.getElementById('guessMode').classList.remove('active');
  stopGuessTimer();
  if(_overlayUntraps.has('guessMode')){ _overlayUntraps.get('guessMode')(); _overlayUntraps.delete('guessMode'); }
});

document.getElementById('guessStartBtn').addEventListener('click',startGuessQuiz);
async function startGuessQuiz(){
  const btn=document.getElementById('guessStartBtn');
  if(GUESS_BANK.length===0){
    const origLabel=btn.textContent;
    btn.disabled=true; btn.textContent='Loading…';
    GUESS_BANK=await fetchLazyData('GUESS_BANK','data-guess-bank',[]);
    btn.disabled=false; btn.textContent=origLabel;
    if(GUESS_BANK.length===0){ showToast('Could not load quiz questions — check your connection.','⚠️'); return; }
  }
  _guessQuestions=getGuessQuestions(_guessDifficulty,_guessCount);
  if(!_guessQuestions.length) return;
  _guessIdx=0;_guessScore=0;_guessStreak=0;
  document.getElementById('guessSetup').style.display='none';
  document.getElementById('guessResults').classList.remove('active');
  document.getElementById('guessQuestionScreen').classList.add('active');
  showGuessQuestion();
}
function showGuessQuestion(){
  const q=_guessQuestions[_guessIdx];
  _guessAnswered=false;
  document.getElementById('guessProgressText').textContent=`Question ${_guessIdx+1} of ${_guessQuestions.length}`;
  document.getElementById('guessScoreText').textContent=`Score: ${_guessScore}`;
  document.getElementById('guessEmojiStage').textContent=q.emoji;
  document.getElementById('guessQText').textContent=q.q;
  const optsShuffled=shuffleArr(q.options.map((text,i)=>({text,isCorrect:i===q.correct})));
  const optsWrap=document.getElementById('guessOptions');
  optsWrap.innerHTML=optsShuffled.map((o,i)=>`<button class="guess-opt-btn" data-correct="${o.isCorrect}">${escH(o.text)}</button>`).join('');
  optsWrap.querySelectorAll('.guess-opt-btn').forEach(btn=>{
    btn.addEventListener('click',()=>handleGuessAnswer(btn,q));
  });
  document.getElementById('guessFeedback').classList.remove('show');
  document.getElementById('guessNextBtn').classList.remove('show');
  startGuessTimer();
}
function startGuessTimer(){
  clearInterval(_guessTimer);
  const limit=GUESS_TIME_LIMITS[_guessDifficulty]||60;
  _guessTimeLeft=limit;
  const fill=document.getElementById('guessTimerFill');
  const num=document.getElementById('guessTimerNum');
  fill.classList.remove('warn','danger');
  num.classList.remove('warn','danger');
  fill.style.transition='none';
  fill.style.width='100%';
  num.textContent=_guessTimeLeft;
  requestAnimationFrame(()=>{ fill.style.transition='width 1s linear'; });
  _guessTimer=setInterval(()=>{
    _guessTimeLeft--;
    num.textContent=Math.max(0,_guessTimeLeft);
    fill.style.width=Math.max(0,(_guessTimeLeft/limit)*100)+'%';
    if(_guessTimeLeft<=limit*0.34){ fill.classList.add('danger');fill.classList.remove('warn');num.classList.add('danger');num.classList.remove('warn'); }
    else if(_guessTimeLeft<=limit*0.6){ fill.classList.add('warn');num.classList.add('warn'); }
    if(_guessTimeLeft<=0){ clearInterval(_guessTimer); handleGuessTimeout(); }
  },1000);
}
function stopGuessTimer(){ clearInterval(_guessTimer); }
function handleGuessTimeout(){
  if(_guessAnswered) return;
  _guessAnswered=true;
  const q=_guessQuestions[_guessIdx];
  document.querySelectorAll('#guessOptions .guess-opt-btn').forEach(b=>{
    b.disabled=true;
    if(b.dataset.correct==='true') b.classList.add('correct');
  });
  _guessStreak=0;
  const fb=document.getElementById('guessFeedback');
  fb.innerHTML=buildGuessFeedbackHTML(q,false,true,historianTimeoutLine());
  fb.classList.add('show');
  document.getElementById('guessNextBtn').classList.add('show');
}
function buildGuessFeedbackHTML(q,isCorrect,timedOut,historianLead){
  const pointsHtml=(q.points&&q.points.length)
    ? `<div class="guess-feedback-points-label">Key Points</div><ul class="guess-feedback-points">${q.points.map(p=>`<li>${escH(p)}</li>`).join('')}</ul>`
    : '';
  return `<div class="guess-feedback-summary">${escH(historianLead)} ${escH(q.fact)}</div>${pointsHtml}`;
}
function handleGuessAnswer(btn,q){
  if(_guessAnswered) return;
  _guessAnswered=true;
  stopGuessTimer();
  const isCorrect=btn.dataset.correct==='true';
  const priorStreak=_guessStreak;
  if(isCorrect){_guessScore++;_guessStreak++;} else {_guessStreak=0;}
  document.querySelectorAll('#guessOptions .guess-opt-btn').forEach(b=>{
    b.disabled=true;
    if(b.dataset.correct==='true') b.classList.add('correct');
    else if(b===btn) b.classList.add('wrong');
  });
  const historianLine=isCorrect?historianCorrectLine(_guessStreak):historianWrongLine(priorStreak);
  const fb=document.getElementById('guessFeedback');
  fb.innerHTML=buildGuessFeedbackHTML(q,isCorrect,false,historianLine);
  fb.classList.add('show');
  document.getElementById('guessScoreText').textContent=`Score: ${_guessScore}`;
  document.getElementById('guessNextBtn').classList.add('show');
}
document.getElementById('guessNextBtn').addEventListener('click',()=>{
  _guessIdx++;
  if(_guessIdx>=_guessQuestions.length){ showGuessResults(); }
  else{ showGuessQuestion(); }
});
function showGuessResults(){
  stopGuessTimer();
  document.getElementById('guessQuestionScreen').classList.remove('active');
  document.getElementById('guessResults').classList.add('active');
  const total=_guessQuestions.length;
  document.getElementById('guessFinalScore').textContent=`${_guessScore}/${total}`;
  const pct=total?Math.round((_guessScore/total)*100):0;
  document.getElementById('guessFinalMsg').textContent=historianVerdict(pct);
}
document.getElementById('guessRetryBtn').addEventListener('click',()=>{
  document.getElementById('guessResults').classList.remove('active');
  document.getElementById('guessSetup').style.display='block';
});
document.getElementById('guessExitBtn').addEventListener('click',()=>{
  document.getElementById('guessMode').classList.remove('active');
});

/* ══ DISCOVERY MODE — one click, random topic — now filterable by region/dynasty ══ */
const DISCOVERY_POOL_TAGGED=[
  {t:"Chandragupta Maurya",tag:"maurya"},{t:"Ashoka the Great",tag:"maurya"},{t:"Kalinga War",tag:"maurya"},
  {t:"Battle of Plassey",tag:"colonial"},{t:"Mahatma Gandhi",tag:"freedom"},{t:"Rani Lakshmibai",tag:"freedom"},
  {t:"Bhagat Singh",tag:"freedom"},{t:"Taj Mahal",tag:"mughal"},{t:"Nalanda University",tag:"south"},
  {t:"Akbar",tag:"mughal"},{t:"Shivaji Maharaj",tag:"maratha"},{t:"Subhas Chandra Bose",tag:"freedom"},
  {t:"Battle of Panipat",tag:"mughal"},{t:"Tipu Sultan",tag:"south"},{t:"Jallianwala Bagh",tag:"colonial"},
  {t:"Quit India Movement",tag:"freedom"},{t:"Gupta Empire",tag:"north"},{t:"Delhi Sultanate",tag:"north"},
  {t:"Vijayanagara Empire",tag:"south"},{t:"Chola Dynasty",tag:"south"},{t:"Battle of the Ten Kings",tag:"north"},
  {t:"Aurangzeb",tag:"mughal"},{t:"Maratha Empire",tag:"maratha"},{t:"Indus Valley Civilization",tag:"north"},
  {t:"Revolt of 1857",tag:"colonial"},{t:"Battle of Buxar",tag:"colonial"},
  {t:"Harshavardhana",tag:"north"},{t:"Rashtrakuta Dynasty",tag:"south"},{t:"Pala Empire",tag:"north"},
  {t:"Maharaja Ranjit Singh",tag:"north"},{t:"Krishnadevaraya",tag:"south"},{t:"Razia Sultana",tag:"north"},
  {t:"Ellora Caves",tag:"south"},{t:"Ajanta Caves",tag:"south"},{t:"Fatehpur Sikri",tag:"mughal"},
  {t:"Charminar",tag:"south"},{t:"Battle of Talikota",tag:"south"},{t:"Bal Gangadhar Tilak",tag:"freedom"},
  {t:"Lala Lajpat Rai",tag:"freedom"},{t:"Dr. B.R. Ambedkar",tag:"freedom"},{t:"Jaisalmer Fort",tag:"north"},
  {t:"Third Battle of Panipat",tag:"maratha"},{t:"Mangal Pandey",tag:"colonial"},{t:"Partition of India",tag:"colonial"},
  {t:"Chanakya",tag:"maurya"},{t:"Babur",tag:"mughal"},
  {t:"Rani Durgavati",tag:"north"},{t:"Battle of Saraighat",tag:"north"},{t:"Guru Nanak",tag:"north"},
  {t:"Battle of Haldighati",tag:"mughal"},{t:"Humayun",tag:"mughal"},{t:"Sher Shah Suri",tag:"mughal"},
  {t:"Velu Nachiyar",tag:"south"},{t:"Hampi",tag:"south"},{t:"Pallava Dynasty",tag:"south"},
  {t:"Sarojini Naidu",tag:"freedom"},{t:"Aruna Asaf Ali",tag:"freedom"},{t:"Indian National Army",tag:"freedom"},
  {t:"Siege of Seringapatam",tag:"colonial"},{t:"Jallianwala Bagh Massacre",tag:"colonial"},
  {t:"Baji Rao I",tag:"maratha"},{t:"Battle of Assaye",tag:"maratha"}
];
const DISCOVERY_POOL=DISCOVERY_POOL_TAGGED.map(e=>e.t); // kept for any other code referencing the flat list
const DISCOVERY_TAGS=[{key:'all',label:'Any Region'},{key:'north',label:'North India'},{key:'south',label:'South India'},{key:'mughal',label:'Mughal Era'},{key:'maratha',label:'Maratha Empire'},{key:'freedom',label:'Freedom Struggle'},{key:'colonial',label:'Colonial Era'}];
let _discoveryFilter='all';
function pickDiscoveryTopic(){
  const pool=_discoveryFilter==='all'?DISCOVERY_POOL_TAGGED:DISCOVERY_POOL_TAGGED.filter(e=>e.tag===_discoveryFilter);
  const useable=pool.length?pool:DISCOVERY_POOL_TAGGED;
  return useable[Math.floor(Math.random()*useable.length)].t;
}
document.getElementById('discoverCard').addEventListener('click',()=>{
  const topic=pickDiscoveryTopic();
  selectMode('topic');
  queryInput.value=topic;
  document.getElementById('gateway-sec').scrollIntoView({behavior:'smooth',block:'start'});
  setTimeout(()=>runQuery(topic,topic),350);
});
// Render the region/dynasty filter chips just under the Surprise Me card, built dynamically so
// they sit beside the existing card without needing extra markup changes elsewhere.
(function renderDiscoveryFilters(){
  const card=document.getElementById('discoverCard');
  if(!card)return;
  const wrap=document.createElement('div');
  wrap.className='discovery-filter-row';
  wrap.setAttribute('onclick','event.stopPropagation()');
  wrap.innerHTML=DISCOVERY_TAGS.map(t=>`<button class="discovery-filter-chip${t.key==='all'?' active':''}" data-tag="${t.key}">${escH(t.label)}</button>`).join('');
  card.appendChild(wrap);
  wrap.querySelectorAll('.discovery-filter-chip').forEach(chip=>{
    chip.addEventListener('click',(e)=>{
      e.stopPropagation();
      _discoveryFilter=chip.dataset.tag;
      wrap.querySelectorAll('.discovery-filter-chip').forEach(c=>c.classList.toggle('active',c===chip));
    });
  });
})();

/* render journey trail on initial site load too, in case of return visit */
setTimeout(renderJourneyTrail,800);

/* ══ EXPLORE BY CATEGORY — functional, not decorative ══ */
const CATEGORY_TOPICS={
  symbols:["Emblem of India","Flag of India","Ashoka Chakra","Lion Capital of Ashoka"],
  freedom:["Mahatma Gandhi","Quit India Movement","Subhas Chandra Bose","Jallianwala Bagh massacre","Bhagat Singh","Bal Gangadhar Tilak","Dr. B.R. Ambedkar"],
  temples:["Brihadeeswarar Temple","Taj Mahal","Khajuraho Group of Monuments","Konark Sun Temple","Ellora Caves","Meenakshi Amman Temple"],
  battles:["Battle of Plassey","Third Battle of Panipat","Kalinga War","Battle of the Ten Kings","Battle of Haldighati","Battle of Talikota"],
  empires:["Maurya Empire","Mughal Empire","Gupta Empire","Maratha Empire","Vijayanagara Empire","Sikh Empire","Rashtrakuta Dynasty"],
};
document.querySelectorAll('#categoryRow .deco-emblem').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const cat=btn.dataset.cat;
    const pool=CATEGORY_TOPICS[cat]||[];
    if(!pool.length) return;
    const topic=pool[Math.floor(Math.random()*pool.length)];
    selectMode('topic');
    queryInput.value=topic;
    runQuery(topic,topic);
  });
});

/* clickable jump strip across known eras/years */
const DECO_JUMPS=[
  {label:"3300 BCE · Indus Valley",topic:"Indus Valley Civilisation"},
  {label:"321 BCE · Maurya",topic:"Maurya Empire"},
  {label:"320 CE · Gupta",topic:"Gupta Empire"},
  {label:"606 CE · Harsha's Realm",topic:"Harshavardhana"},
  {label:"1206 · Delhi Sultanate",topic:"Delhi Sultanate"},
  {label:"1526 · Mughal Empire",topic:"Mughal Empire"},
  {label:"1674 · Maratha",topic:"Maratha Empire"},
  {label:"1757 · Battle of Plassey",topic:"Battle of Plassey"},
  {label:"1801 · Sikh Empire",topic:"Sikh Empire"},
  {label:"1947 · Independence",topic:"Indian independence movement"},
];
(function(){
  const strip=document.getElementById('decoJumpStrip');
  if(!strip) return;
  strip.innerHTML=DECO_JUMPS.map((j,i)=>`<span class="jump-yr" data-topic="${escH(j.topic)}">${escH(j.label)}</span>${i<DECO_JUMPS.length-1?'<span class="deco-jump-sep">·</span>':''}`).join('');
  strip.querySelectorAll('.jump-yr').forEach(el=>{
    el.addEventListener('click',()=>{
      const topic=el.dataset.topic;
      selectMode('era');
      queryInput.value=topic;
      document.getElementById('gateway-sec').scrollIntoView({behavior:'smooth',block:'start'});
      setTimeout(()=>runQuery(topic),350);
    });
  });
})();


/* ══════════════════════════════════════
   UPSCALE v2 — Enhanced JavaScript Layer
   ══════════════════════════════════════ */

/* ── SCROLL REVEAL OBSERVER ── */
(function(){
  if(typeof IntersectionObserver!=='function'){
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>el.classList.add('visible'));
    return;
  }
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}
    });
  },{threshold:0.01,rootMargin:'180px 0px 180px 0px'});
  function observe(){
    document.querySelectorAll('.era-card,.mon-card,.gw-card,.stat-pill,.section-head').forEach(el=>{
      if(!el.classList.contains('reveal')&&!el.classList.contains('reveal-left')){
        el.classList.add('reveal');
      }
      obs.observe(el);
    });
  }
  // observe on site show (after gate)
  const origGate=document.getElementById('gateForm');
  if(origGate){
    origGate.addEventListener('submit',()=>setTimeout(observe,1200));
  }
  observe();
})();

/* ── BACK TO TOP BUTTON ── */
(function(){
  const btn=document.getElementById('backToTop');
  if(!btn)return;
  window.addEventListener('scroll',()=>{
    btn.classList.toggle('show',window.scrollY>600);
  },{passive:true});
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
})();

/* ── THEME TOGGLE ── */
(function(){
  const btn=document.getElementById('themeToggle');
  if(!btn)return;
  const saved=localStorage.getItem('bharat-theme')||'dark';
  if(saved==='light'){
    document.body.classList.add('light-mode');
    btn.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  }
  btn.addEventListener('click',()=>{
    const isLight=document.body.classList.toggle('light-mode');
    localStorage.setItem('bharat-theme',isLight?'light':'dark');
    btn.innerHTML=isLight
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
    showToast(isLight?'☀ Light mode on':'🌙 Dark mode on');
  });
})();

/* ── TOAST NOTIFICATION SYSTEM ── */
function showToast(msg,icon){
  const wrap=document.getElementById('toastWrap');
  if(!wrap)return;
  const t=document.createElement('div');t.className='toast';
  t.innerHTML=(icon?`<span class="toast-icon">${icon}</span>`:'')+'<span>'+msg+'</span>';
  wrap.appendChild(t);
  setTimeout(()=>{t.classList.add('removing');setTimeout(()=>t.remove(),300);},2400);
}

/* ── SEARCH HISTORY ── */
const MAX_HISTORY=8;
function getHistory(){ try{return JSON.parse(localStorage.getItem('bharat-history')||'[]');}catch{return[];} }
function addHistory(q){
  if(!q||q.length<2)return;
  let h=getHistory().filter(x=>x.toLowerCase()!==q.toLowerCase());
  h.unshift(q);h=h.slice(0,MAX_HISTORY);
  localStorage.setItem('bharat-history',JSON.stringify(h));
  renderHistory();
}
function renderHistory(){
  const row=document.getElementById('historyRow');
  if(!row)return;
  const h=getHistory();
  if(!h.length){row.innerHTML='';return;}
  row.innerHTML='<span class="history-label">Recent</span>'+h.slice(0,5).map(q=>`<button class="history-chip" data-q="${escH(q)}">${escH(q)}</button>`).join('');
  row.querySelectorAll('.history-chip').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.getElementById('queryInput').value=btn.dataset.q;
      runQuery(btn.dataset.q);
    });
  });
}
// Hook into runQuery to record history
const _origRunQuery=typeof runQuery!=='undefined'?runQuery:null;
// We'll override runQuery after it's defined — use a post-definition hook
setTimeout(()=>{
  const qi=document.getElementById('queryInput');
  const gb=document.getElementById('goBtn');
  if(gb){
    gb.addEventListener('click',()=>{
      const v=(qi?.value||'').trim();
      if(v.length>1) addHistory(v);
    },true);
  }
  if(qi){
    qi.addEventListener('keydown',e=>{
      if(e.key==='Enter'){
        const v=(qi.value||'').trim();
        if(v.length>1) addHistory(v);
      }
    },true);
  }
  renderHistory();
},200);

/* ── PAGE PROGRESS INDICATOR ── */
(function(){
  const bar=document.getElementById('pageProgress');
  if(!bar)return;
  window.addEventListener('scroll',()=>{
    const docH=document.documentElement.scrollHeight-window.innerHeight;
    if(docH<=0){bar.style.width='0%';return;}
    bar.style.width=Math.min(100,(window.scrollY/docH)*100)+'%';
  },{passive:true});
})();

/* ── HERO QUOTE ROTATOR ── */
(function(){
  const QUOTES=[
    {q:"Arise, awake, and stop not till the goal is reached.",a:"Swami Vivekananda"},
    {q:"Be the change you wish to see in the world.",a:"Mahatma Gandhi"},
    {q:"A nation's culture resides in the hearts and souls of its people.",a:"Mahatma Gandhi"},
    {q:"The greatest glory in living lies not in never falling, but in rising every time we fall.",a:"Subhas Chandra Bose"},
    {q:"Swaraj is my birthright and I shall have it.",a:"Bal Gangadhar Tilak"},
    {q:"If blood be shed, let it be our blood.",a:"Mahatma Gandhi"},
    {q:"India has known the innocence and insouciance of childhood, the passion and abandonment of youth, and the ripe wisdom of maturity.",a:"Jawaharlal Nehru"},
    {q:"The future belongs to those who believe in the beauty of their dreams.",a:"Bhagat Singh"},
    {q:"Every Indian should be proud of the great culture and heritage of this country.",a:"A.P.J. Abdul Kalam"},
    {q:"My religion is based on truth and non-violence.",a:"Mahatma Gandhi"},
  ];
  let qi=0;
  const qEl=document.getElementById('heroQuoteText');
  const aEl=document.getElementById('heroQuoteAttr');
  if(!qEl||!aEl)return;
  function setQuote(idx){
    const p=QUOTES[idx%QUOTES.length];
    qEl.style.opacity='0';aEl.style.opacity='0';
    setTimeout(()=>{
      qEl.textContent=p.q;aEl.textContent='— '+p.a;
      qEl.style.transition='opacity .5s ease';aEl.style.transition='opacity .5s ease';
      qEl.style.opacity='1';aEl.style.opacity='1';
    },350);
  }
  setInterval(()=>setQuote(++qi),6000);
})();

/* ── KEYBOARD SHORTCUTS ── */
document.addEventListener('keydown',e=>{
  // '/' focuses search input
  if(e.key==='/'&&!e.ctrlKey&&!e.metaKey){
    const active=document.activeElement;
    if(active&&(active.tagName==='INPUT'||active.tagName==='TEXTAREA'))return;
    e.preventDefault();
    const qi=document.getElementById('queryInput');
    if(qi){qi.focus();qi.select();showToast('⌨ Search focused','/');}
  }
  // 'T' jumps to timeline
  if(e.key==='t'&&!e.ctrlKey&&!e.metaKey&&!e.altKey){
    const active=document.activeElement;
    if(active&&(active.tagName==='INPUT'||active.tagName==='TEXTAREA'))return;
    document.getElementById('timeline-sec')?.scrollIntoView({behavior:'smooth'});
  }
});

/* ── COPY RESULT BUTTON ── */
function addCopyButton(container){
  if(!container)return;
  // Guard: skip if a copy button is already the first child — nothing to do, so no DOM write,
  // so no new mutation record, so the observer below can't re-trigger itself.
  if(container.firstElementChild&&container.firstElementChild.classList.contains('copy-result-btn'))return;
  const existing=container.querySelector('.copy-result-btn');
  if(existing)existing.remove();
  const btn=document.createElement('button');
  btn.className='copy-result-btn';
  btn.innerHTML='📋 Copy Notes';
  btn.addEventListener('click',()=>{
    const text=[...container.querySelectorAll('h2,h3,p,li')].map(el=>el.textContent.trim()).filter(Boolean).join('\n');
    navigator.clipboard.writeText(text).then(()=>{
      btn.textContent='✓ Copied!';btn.classList.add('copied');
      setTimeout(()=>{btn.innerHTML='📋 Copy Notes';btn.classList.remove('copied');},2000);
    });
  });
  // Disconnect while we mutate so inserting the button can never re-trigger this same observer,
  // even on the very first (legitimate) mutation record.
  _resultObs.disconnect();
  container.insertBefore(btn,container.firstChild);
  _resultObs.observe(container,{childList:true,subtree:false});
}
// Hook into result rendering (observe resultArea)
const _resultObs=new MutationObserver(()=>{
  const ra=document.getElementById('resultArea');
  if(ra&&ra.children.length>0) addCopyButton(ra);
});
const ra=document.getElementById('resultArea');
if(ra)_resultObs.observe(ra,{childList:true,subtree:false});

/* ── ENHANCED STAT PILL COUNTER ── */
function animateCounters(){
  document.querySelectorAll('.stat-pill .num').forEach(el=>{
    const text=el.textContent.trim();
    const num=parseInt(text.replace(/[^0-9]/g,''));
    if(!num||isNaN(num)||text.includes('+'))return;
    let start=0;
    const step=Math.ceil(num/28);
    const timer=setInterval(()=>{
      start+=step;if(start>=num){start=num;clearInterval(timer);}
      el.textContent=start+(text.includes('+')?' +':'');
    },35);
  });
}
// Trigger on gate exit
const gateForm2=document.getElementById('gateForm');
if(gateForm2)gateForm2.addEventListener('submit',()=>setTimeout(animateCounters,1300));

/* ── ERA CARD HOVER PREVIEW (subtle) ── */
document.querySelectorAll('.era-card').forEach(card=>{
  card.addEventListener('mouseenter',()=>{
    const range=card.querySelector('.era-range');
    if(range&&!card._hinted){
      card._hinted=true;
      const hint=document.createElement('div');
      hint.style.cssText='position:absolute;bottom:.7rem;right:.9rem;font-family:JetBrains Mono,monospace;font-size:.6rem;color:rgba(223,168,64,.6);pointer-events:none;';
      hint.textContent='Click to explore →';
      card.appendChild(hint);
    }
  });
});

/* ── SOUND INDICATOR (visual only) for timeline drag ── */
const _origPositionNode=window.__posNode;

/* ── PRINT BUTTON ── */
// Add a print shortcut: Ctrl+P is native, but we enhance the page for it

/* ── APPLY REVEAL CLASS ON SCROLL AFTER GATE ── */
function initReveal(){
  const targets=document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
  if(typeof IntersectionObserver!=='function'){
    targets.forEach(el=>el.classList.add('visible'));
    return;
  }
  const revObs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revObs.unobserve(e.target);}});
  },{threshold:0.01,rootMargin:'180px 0px 180px 0px'});
  targets.forEach(el=>revObs.observe(el));
}
// Call after site shown
const _origGateSubmit=document.getElementById('gateForm');
if(_origGateSubmit){
  _origGateSubmit.addEventListener('submit',()=>setTimeout(initReveal,1400));
}
initReveal();

/* ── ERA INDICATOR VISIBILITY IMPROVEMENT ── */
window.addEventListener('scroll',()=>{
  const ind=document.getElementById('eraIndicator');
  if(ind) ind.classList.toggle('show',window.scrollY>300);
},{passive:true});

/* ── ENHANCED TICKER: show day info ── */
(function(){
  const tickerLabel=document.querySelector('.ticker-label');
  if(!tickerLabel)return;
  const today=new Date();
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const badge=document.createElement('span');
  badge.className='today-badge';
  badge.textContent=today.getDate()+' '+months[today.getMonth()];
  tickerLabel.insertBefore(badge,tickerLabel.firstChild);
})();

/* ── GLOW ON SEARCH FOCUS ── */
(function(){
  const qi=document.getElementById('queryInput');
  const panel=document.getElementById('searchPanel');
  if(!qi||!panel)return;
  qi.addEventListener('focus',()=>panel.style.boxShadow='0 0 0 1px rgba(223,168,64,.2),0 20px 50px rgba(0,0,0,.5)');
  qi.addEventListener('blur',()=>panel.style.boxShadow='');
})();

/* ── WELCOME TOAST AFTER GATE ── */
(function(){
  const gf=document.getElementById('gateForm');
  if(!gf)return;
  gf.addEventListener('submit',function(){
    const name=(document.getElementById('nameInput').value||'').trim()||'Scholar';
    setTimeout(()=>showToast('Welcome, '+name+'! The chronicle is open 🏛','🙏'),1500);
  });
})();

/* ══════════════════════════════════════════════════════════
   EXPLORE MORE — new feature module (theme switcher, compare,
   family trees, living map, mystery artifact, what-if, builder game)
   ══════════════════════════════════════════════════════════ */
(function(){

/* ---------- THEME SWITCHER ---------- */
const THEME_CYCLE=['default','sepia','manuscript','dark'];
function applyStoredTheme(){
  const t=safeStore.get('site-theme-pref','default');
  document.body.classList.remove('theme-sepia','theme-manuscript','theme-dark');
  if(t!=='default')document.body.classList.add('theme-'+t);
}
applyStoredTheme();
const themeBtn=document.getElementById('themeSwitchBtn');
if(themeBtn)themeBtn.addEventListener('click',()=>{
  const cur=safeStore.get('site-theme-pref','default');
  const next=THEME_CYCLE[(THEME_CYCLE.indexOf(cur)+1)%THEME_CYCLE.length];
  safeStore.set('site-theme-pref',next);
  applyStoredTheme();
  showToast('Theme: '+next.charAt(0).toUpperCase()+next.slice(1),'🌓');
});

/* ---------- TAB SWITCHING ---------- */
const emTabs=document.getElementById('emTabs');
if(emTabs){
  emTabs.querySelectorAll('.em-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      emTabs.querySelectorAll('.em-tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.em-panel').forEach(p=>p.classList.remove('active'));
      const panel=document.querySelector(`.em-panel[data-panel="${tab.dataset.tab}"]`);
      if(panel)panel.classList.add('active');
    });
  });
}

/* ---------- COMPARE EMPIRES ---------- */
function fmtYr(y){ return y<0?Math.abs(y)+' BCE':y+' CE'; }
function bandsForEra(name){
  return (typeof TIMELINE_BANDS!=='undefined'?TIMELINE_BANDS:[]).filter(b=>
    (b.empires||[]).some(e=>e.toLowerCase().includes(name.toLowerCase().split(' ')[0]))
  );
}
function renderCompareCard(d){
  const bands=bandsForEra(d.name);
  const rulers=bands.flatMap(b=>b.rulers||[]).slice(0,4);
  const events=bands.flatMap(b=>b.events||[]).slice(0,3);
  return `<div class="cmp-card" style="border-color:${d.color}55">
    <h3 style="color:${d.color}">${escH(d.name)}</h3>
    <div class="cmp-stat"><span>Span</span><strong>${fmtYr(d.from)} – ${fmtYr(d.to)}</strong></div>
    <div class="cmp-stat"><span>Duration</span><strong>${d.to-d.from} years</strong></div>
    ${rulers.length?`<div class="cmp-stat"><span>Key rulers</span><strong>${escH(rulers.slice(0,3).join(', '))}</strong></div>`:''}
    <div class="cmp-note">${escH(d.note)}</div>
    ${events.length?`<div class="cmp-note"><strong style="color:var(--bone)">Notable:</strong> ${escH(events.join(' · '))}</div>`:''}
    <button class="builder-btn" style="margin-top:.8rem" onclick="selectMode('era');queryInput.value='${escH(d.name).replace(/'/g,"\\'")}';document.getElementById('gateway-sec').scrollIntoView({behavior:'smooth'});setTimeout(()=>runQuery('${escH(d.name).replace(/'/g,"\\'")}'),350);">Read full dossier →</button>
  </div>`;
}
function initCompare(){
  const data=(typeof EMPIRE_TIMELINE_DATA!=='undefined')?EMPIRE_TIMELINE_DATA:[];
  const selA=document.getElementById('cmpSelA'), selB=document.getElementById('cmpSelB');
  if(!selA||!selB||!data.length)return;
  const opts=data.map((d,i)=>`<option value="${i}">${escH(d.name)}</option>`).join('');
  selA.innerHTML=opts; selB.innerHTML=opts;
  selA.value=2; selB.value=8; // Maurya vs Mughal by default
  function update(){
    const a=data[+selA.value], b=data[+selB.value];
    document.getElementById('cmpResult').innerHTML=renderCompareCard(a)+renderCompareCard(b);
  }
  selA.addEventListener('change',update); selB.addEventListener('change',update);
  update();
}

/* ---------- FAMILY TREES ---------- */
const FAMILY_TREES={
  "Maurya Empire":{name:"Chandragupta Maurya",years:"r. 321–297 BCE",role:"Founder of the Empire",children:[
    {name:"Bindusara",years:"r. 297–273 BCE",role:"Son & successor",children:[
      {name:"Ashoka the Great",years:"r. 268–232 BCE",role:"Son — greatest Mauryan emperor",children:[
        {name:"Kunala",years:"successor, blinded per legend",role:"Son of Ashoka"},
        {name:"Dasharatha Maurya",years:"r. 232–224 BCE",role:"Grandson of Ashoka"},
      ]},
    ]},
  ]},
  "Gupta Empire":{name:"Sri Gupta",years:"founder, c. 240 CE",role:"Founder of the dynasty",children:[
    {name:"Chandragupta I",years:"r. c. 319–335 CE",role:"Grandson — first Gupta emperor",children:[
      {name:"Samudragupta",years:"r. c. 335–375 CE — 'Napoleon of India'",role:"Son & successor",children:[
        {name:"Chandragupta II (Vikramaditya)",years:"r. c. 375–415 CE",role:"Son — golden-age ruler",children:[
          {name:"Kumaragupta I",years:"r. c. 415–455 CE",role:"Son & successor",children:[
            {name:"Skandagupta",years:"r. c. 455–467 CE — repelled Huna invasions",role:"Son & successor"},
          ]},
        ]},
      ]},
    ]},
  ]},
  "Mughal Empire":{name:"Babur",years:"r. 1526–1530",role:"Founder of the Empire",children:[
    {name:"Humayun",years:"r. 1530–1556 (with exile interruption)",role:"Son & successor",children:[
      {name:"Akbar the Great",years:"r. 1556–1605",role:"Son — empire's greatest expansion",children:[
        {name:"Jahangir",years:"r. 1605–1627",role:"Son & successor",children:[
          {name:"Shah Jahan",years:"r. 1628–1658 — built the Taj Mahal",role:"Son & successor",children:[
            {name:"Aurangzeb",years:"r. 1658–1707",role:"Son — seized the throne"},
            {name:"Dara Shikoh",years:"heir apparent, executed by Aurangzeb",role:"Son — passed over heir"},
          ]},
        ]},
      ]},
    ]},
  ]},
  "Chola Dynasty":{name:"Vijayalaya Chola",years:"r. c. 848–871 CE",role:"Founder of the revival",children:[
    {name:"Parantaka I",years:"r. 907–950 CE",role:"Descendant & successor",children:[
      {name:"Rajaraja Chola I",years:"r. 985–1014 CE",role:"Descendant — empire builder",children:[
        {name:"Rajendra Chola I",years:"r. 1014–1044 CE — naval expeditions to Southeast Asia",role:"Son & successor",children:[
          {name:"Rajadhiraja Chola",years:"r. 1044–1054 CE",role:"Son & successor"},
        ]},
      ]},
    ]},
  ]},
  "Maratha Confederacy":{name:"Shahaji Bhonsle",years:"d. 1664, father of Shivaji",role:"Founder of the Bhonsle line",children:[
    {name:"Shivaji Maharaj",years:"r. 1674–1680 — founded the Maratha kingdom",role:"Son — founded the kingdom",children:[
      {name:"Sambhaji",years:"r. 1681–1689",role:"Son & successor"},
      {name:"Rajaram I",years:"r. 1689–1700",role:"Son — continued the resistance"},
    ]},
    {name:"(Peshwa line)",years:"administrative power shifts to the Peshwas after 1700",role:"Power shifts to chief ministers",children:[
      {name:"Balaji Vishwanath",years:"1st Peshwa, 1713–1720",role:"1st Peshwa"},
      {name:"Baji Rao I",years:"Peshwa 1720–1740",role:"2nd Peshwa"},
    ]},
  ]},
  "Vijayanagara Empire":{name:"Harihara I",years:"r. 1336–1356",role:"Co-founder of the Empire",children:[
    {name:"Bukka Raya I",years:"r. 1356–1377",role:"Brother & co-founder",children:[
      {name:"Harihara II",years:"r. 1377–1404",role:"Son & successor",children:[
        {name:"Deva Raya II",years:"r. 1424–1446 — height of Sangama power",role:"Grandson, peak of the first dynasty"},
      ]},
    ]},
    {name:"(Tuluva dynasty, from 1505)",years:"power passes to a new line",role:"Dynastic transition",children:[
      {name:"Krishnadevaraya",years:"r. 1509–1529 — empire's golden age",role:"Greatest Vijayanagara emperor"},
    ]},
  ]},
  "Delhi Sultanate":{name:"Qutb-ud-din Aibak",years:"r. 1206–1210",role:"Founder, Mamluk (Slave) dynasty",children:[
    {name:"Iltutmish",years:"r. 1211–1236",role:"Son-in-law & successor",children:[
      {name:"Razia Sultana",years:"r. 1236–1240 — first woman to rule Delhi",role:"Daughter & successor"},
    ]},
    {name:"(Khilji dynasty, from 1290)",years:"power passes to a new line",role:"Dynastic transition",children:[
      {name:"Alauddin Khilji",years:"r. 1296–1316 — repelled Mongol invasions",role:"2nd Khilji Sultan"},
    ]},
    {name:"(Tughlaq dynasty, from 1320)",years:"power passes again",role:"Dynastic transition",children:[
      {name:"Muhammad bin Tughluq",years:"r. 1325–1351",role:"2nd Tughlaq Sultan"},
      {name:"Firuz Shah Tughlaq",years:"r. 1351–1388",role:"Cousin & successor"},
    ]},
  ]},
  "Vardhana Dynasty":{name:"Prabhakaravardhana",years:"r. c. 580–605 CE",role:"Founder of the dynasty",children:[
    {name:"Rajyavardhana",years:"r. 605–606 CE",role:"Son & successor"},
    {name:"Harshavardhana",years:"r. 606–647 CE — unified North India, patron of Xuanzang",role:"Son — empire's peak ruler"},
  ]},
  "Rashtrakuta Dynasty":{name:"Dantidurga",years:"r. c. 735–756 CE",role:"Founder of the dynasty",children:[
    {name:"Krishna I",years:"r. 756–774 CE — built the Kailasa Temple, Ellora",role:"Uncle & successor",children:[
      {name:"Dhruva Dharavarsha",years:"r. 780–793 CE",role:"Grandson & successor",children:[
        {name:"Govinda III",years:"r. 793–814 CE — peak military expansion",role:"Son & successor",children:[
          {name:"Amoghavarsha I",years:"r. 814–878 CE — patron of Kannada literature",role:"Son & successor"},
        ]},
      ]},
    ]},
  ]},
  "Sikh Empire":{name:"Maharaja Ranjit Singh",years:"r. 1801–1839",role:"Founder, 'Lion of Punjab'",children:[
    {name:"Kharak Singh",years:"r. 1839–1840",role:"Son & successor"},
    {name:"Nau Nihal Singh",years:"r. 1840 (briefly)",role:"Grandson & successor"},
    {name:"Sher Singh",years:"r. 1841–1843",role:"Son of Ranjit Singh"},
    {name:"Duleep Singh",years:"r. 1843–1849 — last Maharaja, exiled after annexation",role:"Youngest son, last ruler"},
  ]},
  "Pala Empire":{name:"Gopala I",years:"r. c. 750–770 CE",role:"Founder, elected by regional chiefs",children:[
    {name:"Dharmapala",years:"r. c. 770–810 CE — founded Vikramashila University",role:"Son & successor",children:[
      {name:"Devapala",years:"r. c. 810–850 CE — empire's greatest territorial extent",role:"Son & successor"},
    ]},
  ]},
  "Pallava Dynasty":{name:"Simhavishnu",years:"r. c. 575–600 CE",role:"Restored Pallava power after Kalabhra interregnum",children:[
    {name:"Mahendravarman I",years:"r. c. 600–630 CE — poet, architect, convert to Shaivism",role:"Son & successor",children:[
      {name:"Narasimhavarman I (Mamalla)",years:"r. 630–668 CE — sacked the Chalukya capital Vatapi",role:"Son — empire's military peak",children:[
        {name:"Narasimhavarman II (Rajasimha)",years:"r. c. 700–728 CE — built the Shore Temple",role:"Descendant — golden age of Pallava art"},
      ]},
    ]},
  ]},
  "Pandya Dynasty":{name:"Kadungon",years:"r. c. 590–620 CE",role:"Revived Pandya power after the Kalabhra interregnum",children:[
    {name:"(Later Pandyas, from 13th century)",years:"dynastic revival after centuries of Chola dominance",role:"Resurgence under new line",children:[
      {name:"Jatavarman Sundara Pandyan I",years:"r. 1251–1268 CE — empire's greatest territorial extent",role:"Descendant — height of the Second Pandyan Empire",children:[
        {name:"Maravarman Kulasekara Pandyan I",years:"r. 1268–1308 CE",role:"Son & successor, presided over the dynasty's decline"},
      ]},
    ]},
  ]},
  "Kakatiya Dynasty":{name:"Prola II",years:"r. c. 1116–1157 CE",role:"Established Kakatiya autonomy from the Western Chalukyas",children:[
    {name:"Ganapati Deva",years:"r. c. 1199–1262 CE — greatest territorial expansion",role:"Descendant & successor",children:[
      {name:"Rudrama Devi",years:"r. c. 1262–1289 CE — one of India's few reigning queens",role:"Daughter — ruled in her own right",children:[
        {name:"Prataparudra II",years:"r. c. 1289–1323 CE — last Kakatiya ruler, defeated by the Delhi Sultanate",role:"Grandson — dynasty's fall"},
      ]},
    ]},
  ]},
  "Ahom Dynasty":{name:"Sukaphaa",years:"r. 1228–1268 CE",role:"Founder, established the kingdom in Assam",children:[
    {name:"(Line of Ahom kings, 1228–1826)",years:"nearly 600 years of continuous rule",role:"Six centuries of dynastic continuity",children:[
      {name:"Pratap Singha",years:"r. 1603–1641 CE — consolidated administration and military strength",role:"Major reforming king"},
      {name:"Gadadhar Singha",years:"r. 1681–1696 CE — reigned after defeating Mughal incursions at Saraighat",role:"Post-Saraighat consolidator"},
    ]},
  ]},
  "Asaf Jahi Dynasty (Hyderabad)":{name:"Asaf Jah I (Nizam-ul-Mulk)",years:"r. 1724–1748",role:"Founder, former Mughal viceroy of the Deccan",children:[
    {name:"(Line of Nizams, 1724–1948)",years:"seven Nizams ruled Hyderabad for over two centuries",role:"Longest-surviving princely dynasty in India",children:[
      {name:"Mir Osman Ali Khan",years:"r. 1911–1948 — last Nizam, reputedly one of the richest men in the world",role:"7th and final Nizam, acceded to India in 1948"},
    ]},
  ]},
};
function renderTreeNode(n,depth){
  const hasKids=n.children&&n.children.length;
  const isFounder=depth===0;
  const isPlaceholder=n.name.startsWith('(');
  const cardInner=`
      <span class="tree-card-portrait">${isFounder?'♛':'◆'}</span>
      <span class="tree-card-body">
        <span class="tree-name">${escH(n.name)}</span>
        ${n.role?`<span class="tree-role">${escH(n.role)}</span>`:''}
        <span class="tree-years">${escH(n.years||'')}</span>
      </span>
      ${isPlaceholder?'':'<span class="tree-card-go">View profile →</span>'}`;
  const card=isPlaceholder
    ?`<div class="tree-card placeholder">${cardInner}</div>`
    :`<button type="button" class="tree-card${isFounder?' founder':''}" data-name="${escH(n.name)}">${cardInner}</button>`;
  return `<div class="tree-node" style="--depth:${depth}" data-nodename="${escH(n.name)}">
    ${card}
    ${hasKids?`<div class="tree-children">${n.children.map(c=>renderTreeNode(c,depth+1)).join('')}</div>`:''}
  </div>`;
}
/* Flat searchable index of every person across every dynasty tree, built once. */
function buildTreeSearchIndex(){
  const idx=[];
  Object.keys(FAMILY_TREES).forEach((dynastyKey,dynastyI)=>{
    (function walk(node){
      if(!node.name.startsWith('(')){
        idx.push({name:node.name,role:node.role||'',dynasty:dynastyKey,dynastyI});
      }
      (node.children||[]).forEach(walk);
    })(FAMILY_TREES[dynastyKey]);
  });
  return idx;
}
function initFamilyTrees(){
  const pickers=document.getElementById('treePickers');
  const result=document.getElementById('treeResult');
  const searchInput=document.getElementById('treeSearchInput');
  const searchResults=document.getElementById('treeSearchResults');
  if(!pickers||!result)return;
  const names=Object.keys(FAMILY_TREES);
  const searchIndex=buildTreeSearchIndex();
  pickers.innerHTML=names.map((n,i)=>`<button data-i="${i}" class="${i===0?'active':''}">${escH(n.replace(' Empire','').replace(' Dynasty','').replace(' Confederacy',''))}</button>`).join('');

  function wireCards(){
    result.querySelectorAll('.tree-card[data-name]').forEach(card=>{
      card.addEventListener('click',()=>switchToTopicAndSearch(card.dataset.name));
    });
  }
  function show(i,highlightName){
    pickers.querySelectorAll('button').forEach((b,j)=>b.classList.toggle('active',j===i));
    result.innerHTML=`<p class="tree-hint">Tap any name to open its full profile — pulled live from our search archive.</p>${renderTreeNode(FAMILY_TREES[names[i]],0)}`;
    wireCards();
    if(highlightName){
      const node=[...result.querySelectorAll('.tree-node')].find(el=>el.dataset.nodename===highlightName);
      if(node){
        node.scrollIntoView({behavior:'smooth',block:'center'});
        const card=node.querySelector('.tree-card');
        card.classList.add('jumped');
        setTimeout(()=>card.classList.remove('jumped'),2200);
      }
    }
  }

  function closeSearchResults(){ searchResults.innerHTML=''; searchResults.classList.remove('open'); }

  function runSearch(q){
    const query=q.trim().toLowerCase();
    if(!query){ closeSearchResults(); return; }
    const matches=searchIndex.filter(p=>p.name.toLowerCase().includes(query)).slice(0,8);
    if(matches.length){
      searchResults.innerHTML=matches.map(m=>`<button type="button" class="tree-search-hit" data-dynasty-i="${m.dynastyI}" data-name="${escH(m.name)}">
          <span class="tsh-name">${escH(m.name)}</span>
          <span class="tsh-meta">${escH(m.role||'')} · ${escH(m.dynasty)}</span>
        </button>`).join('');
      searchResults.classList.add('open');
    }else{
      searchResults.innerHTML=`<button type="button" class="tree-search-hit fallback" id="treeSearchFallback">
          <span class="tsh-name">"${escH(q.trim())}" isn't in our drawn family trees yet</span>
          <span class="tsh-meta">Look them up in the live archive instead →</span>
        </button>`;
      searchResults.classList.add('open');
    }
  }

  searchInput.addEventListener('input',()=>runSearch(searchInput.value));
  searchInput.addEventListener('focus',()=>{ if(searchInput.value.trim())runSearch(searchInput.value); });
  document.addEventListener('click',(e)=>{
    if(!searchResults.contains(e.target)&&e.target!==searchInput)closeSearchResults();
  });
  searchResults.addEventListener('click',(e)=>{
    const hit=e.target.closest('.tree-search-hit');
    if(!hit)return;
    if(hit.id==='treeSearchFallback'){
      switchToTopicAndSearch(searchInput.value.trim());
    }else{
      const i=+hit.dataset.dynastyI;
      const nm=hit.dataset.name;
      show(i,nm);
    }
    closeSearchResults();
    searchInput.value='';
  });

  pickers.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{closeSearchResults();show(+b.dataset.i);}));
  show(0);
}


/* ---------- MYSTERY ARTIFACT ---------- */
function initMystery(){
  const box=document.getElementById('mysteryBox');
  const nextBtn=document.getElementById('mysteryNextBtn');
  if(!box||typeof EMPIRE_TIMELINE_DATA==='undefined')return;
  const pool=EMPIRE_TIMELINE_DATA.filter(d=>!/Republic of India/.test(d.name));
  async function loadMystery(){
    box.innerHTML=`<div class="mystery-clue">Consulting the archive…</div>`;
    const answer=pool[Math.floor(Math.random()*pool.length)];
    let wrong=pool.filter(d=>d.name!==answer.name).sort(()=>Math.random()-0.5).slice(0,3);
    const options=[answer,...wrong].sort(()=>Math.random()-0.5);
    let imgHtml='';
    try{
      const src=typeof getThumb==='function'?await getThumb(answer.name):null;
      if(src)imgHtml=`<img src="${src}" alt="">`;
    }catch(e){}
    box.innerHTML=`${imgHtml}<div class="mystery-clue">Active ${fmtYr(answer.from)} – ${fmtYr(answer.to)}. Clue: "${escH(answer.note)}"<br>Which empire or era is this?</div>
      <div class="mystery-options">${options.map(o=>`<button class="mystery-opt" data-name="${escH(o.name)}">${escH(o.name)}</button>`).join('')}</div>`;
    box.querySelectorAll('.mystery-opt').forEach(btn=>{
      btn.addEventListener('click',()=>{
        box.querySelectorAll('.mystery-opt').forEach(b=>b.disabled=true);
        if(btn.dataset.name===answer.name){ btn.classList.add('correct'); showToast('Correct! 🏺','✅'); }
        else{
          btn.classList.add('wrong');
          box.querySelectorAll('.mystery-opt').forEach(b=>{ if(b.dataset.name===answer.name)b.classList.add('correct'); });
        }
      });
    });
  }
  nextBtn.addEventListener('click',loadMystery);
  loadMystery();
}

/* ---------- WHAT IF EXPLORER ---------- */
const WHATIF_DATA={
  "Battle of the Hydaspes (326 BCE)":[
    {h:"Alexander pushes deeper into the Gangetic plains",t:"Had Alexander's exhausted army not mutinied at the Hyphasis, a Macedonian satrapy might have reached Magadha — likely triggering an earlier, more direct fusion of Hellenistic and Indian art and administration, decades before the Indo-Greek kingdoms actually formed."},
    {h:"Porus forges a lasting alliance",t:"Alexander reinstated Porus as a client king after defeat. In a world where this alliance held longer, a Greek-Indian buffer state in the Punjab could have altered the rise of the Maurya Empire itself."},
  ],
  "Battle of Panipat, 1761":[
    {h:"The Marathas hold the field",t:"Had the Maratha Confederacy decisively won the Third Battle of Panipat instead of suffering catastrophic losses, a Maratha-led pan-Indian polity might have pre-empted British expansion in the north by decades."},
    {h:"Afghan withdrawal comes earlier",t:"A swifter Maratha-Afghan peace could have preserved more of the Maratha army for the power vacuum after, potentially changing how the East India Company expanded in Bengal and the Deccan."},
  ],
  "Battle of Plassey, 1757":[
    {h:"Siraj ud-Daulah's generals stay loyal",t:"Without Mir Jafar's betrayal, the East India Company's small force likely loses to Bengal's army — delaying British territorial rule in India by a generation or more, and changing the whole trajectory of colonial expansion in South Asia."},
    {h:"A negotiated trade settlement instead of conquest",t:"Bengal could have remained a wealthy independent or tributary state trading with multiple European powers, rather than becoming the base for Company rule."},
  ],
  "1857 Rebellion":[
    {h:"The rebellion succeeds in the north",t:"A coordinated rebel victory across Delhi, Awadh, and Central India might have restored a weakened Mughal figurehead — though most historians think Company/Crown resources would still eventually prevail; the political map of princely loyalties would look very different."},
    {h:"Crown rule arrives without the rebellion",t:"Had reforms addressed sepoy grievances earlier, the Company might have transitioned to Crown rule gradually rather than through violent suppression, possibly softening some of the harshest colonial policies that followed."},
  ],
  "Partition of India, 1947":[
    {h:"A federal united India is negotiated instead",t:"Had the Cabinet Mission Plan's federal structure been accepted by all major parties, India might have remained a single state with strong provincial autonomy — avoiding Partition's mass displacement, though communal tensions would likely still have required careful management."},
    {h:"Partition happens later, with more planning",t:"A delayed, better-resourced transition with clearer boundary commissions and security arrangements might have substantially reduced (though probably not eliminated) the violence of 1947."},
  ],
  "Battle of Talikota, 1565":[
    {h:"Vijayanagara's confederacy holds together",t:"Had the Deccan sultanates not united against Vijayanagara, the empire's wealth and Hampi's grandeur might have persisted for generations longer, possibly altering the balance of power across the southern peninsula well into the Mughal era."},
    {h:"A negotiated truce instead of total defeat",t:"A partial settlement rather than the sack of Hampi could have preserved the city as a living capital rather than a ruin, changing how South Indian art and temple architecture developed afterward."},
  ],
  "Third Anglo-Mysore War, 1790–92":[
    {h:"Tipu Sultan secures French backing in time",t:"Had French reinforcements arrived before the war's conclusion, Mysore might have checked Company expansion in the south for decades, reshaping how British power consolidated across the peninsula."},
    {h:"The Triple Alliance fractures earlier",t:"If the Marathas and Hyderabad had not joined the British-led coalition against Mysore, Tipu Sultan's kingdom might have survived intact, altering the later Anglo-Mysore Wars entirely."},
  ],
  "Death of Aurangzeb, 1707":[
    {h:"A single strong successor avoids the war of succession",t:"The bitter succession struggle among Aurangzeb's sons drained Mughal treasuries and armies. A smoother transition might have given the empire another generation of central strength before regional powers like the Marathas and Sikhs broke away."},
    {h:"Aurangzeb's policies are reversed sooner",t:"Earlier reconciliation with Rajput and Maratha powers, rather than continued military pressure, might have preserved more of the empire's reach into the 18th century."},
  ],
  "Quit India Movement, 1942":[
    {h:"The British grant immediate dominion status",t:"Had London responded to Congress's wartime demand for self-rule rather than mass arrests, India's path to independence might have been negotiated years earlier — possibly with a different, less rushed Partition process."},
    {h:"The movement achieves a unified national strike",t:"Had repression not fractured the leadership so completely, a more sustained campaign might have forced earlier constitutional concessions rather than waiting for the war's end."},
  ],
  "Battle of Haldighati, 1576":[
    {h:"Maharana Pratap wins the field decisively",t:"Though the battle was tactically inconclusive and Pratap continued resisting from the hills, a clear Rajput victory might have slowed Mughal consolidation of Mewar for a generation, changing how Akbar's empire managed Rajasthan."},
    {h:"Akbar secures a negotiated submission instead",t:"Had Pratap accepted vassalage like other Rajput houses, Mewar might have kept more autonomy under Mughal overlordship rather than fighting on in exile, but Pratap's defiance became a lasting symbol of resistance that a quieter settlement would not have produced."},
  ],
  "Arab Conquest of Sindh, 712 CE":[
    {h:"The Sindh frontier holds against the Caliphate",t:"Had local rulers repelled Muhammad bin Qasim's campaign, the first sustained Muslim foothold in South Asia might have been delayed by centuries, potentially altering the entire later trajectory of Islamic dynasties in the subcontinent."},
    {h:"Sindh becomes a stable frontier province sooner",t:"A quicker, more settled integration of Sindh into the wider Islamic world could have made it an earlier hub of trade and scholarship between the Arab world and India, rather than a contested military frontier for generations."},
  ],
  "Mangal Pandey's Mutiny Fails to Spread, 1857":[
    {h:"Local containment prevents wider revolt",t:"Had British officers acted decisively to isolate the Barrackpore unrest, the chain of events leading to the Meerut mutiny six weeks later might never have gathered the same momentum — delaying any large-scale challenge to Company rule."},
    {h:"Sepoy grievances are addressed administratively",t:"Reform of the cartridge issue and broader religious sensitivities, handled early and visibly, might have defused tension well before it could escalate into the subcontinent-wide revolt that followed."},
  ],
  "Sino-Indian War, 1962":[
    {h:"India accepts an earlier diplomatic settlement",t:"Had border negotiations in the late 1950s produced a mutually acceptable line, the war's military humiliation might have been avoided entirely, sparing Nehru's final years and reshaping India's non-aligned foreign policy with more confidence intact."},
    {h:"Indian forces are better prepared logistically",t:"With improved high-altitude supply lines and earlier military modernization, a more even contest might have produced a negotiated rather than one-sided outcome, changing the speed of India's subsequent defense buildup."},
  ],
  "Krishnadevaraya Lives Another Twenty Years":[
    {h:"Vijayanagara's golden age extends",t:"Had Krishnadevaraya not died in 1529, his administrative reforms and Deccan campaigns might have consolidated Vijayanagara's dominance so thoroughly that the catastrophic defeat at Talikota in 1565 — three reigns later — may never have happened in the same way."},
    {h:"A stronger succession avoids later fragmentation",t:"The succession disputes that weakened Vijayanagara after his death might have been avoided with a longer reign and a clearer heir, potentially preserving Hampi as a living capital well into the 17th century."},
  ],
};
function initWhatIf(){
  const pickers=document.getElementById('whatifPickers');
  const result=document.getElementById('whatifResult');
  if(!pickers||!result)return;
  const keys=Object.keys(WHATIF_DATA);
  pickers.innerHTML=keys.map((k,i)=>`<button data-i="${i}" class="${i===0?'active':''}">${escH(k)}</button>`).join('');
  function show(i){
    pickers.querySelectorAll('button').forEach((b,j)=>b.classList.toggle('active',j===i));
    result.innerHTML=WHATIF_DATA[keys[i]].map(b=>`<div class="whatif-branch"><h4>${escH(b.h)}</h4><p>${escH(b.t)}</p></div>`).join('')+
      `<p style="text-align:center;font-size:.72rem;color:var(--bone-d);margin-top:.4rem;">Speculative scenarios for reflection — not historical fact.</p>`;
  }
  pickers.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>show(+b.dataset.i)));
  show(0);
}

/* ---------- ORDER THE ERAS (drag builder game) ---------- */
function initBuilder(){
  const list=document.getElementById('builderList');
  const shuffleBtn=document.getElementById('builderShuffleBtn');
  const checkBtn=document.getElementById('builderCheckBtn');
  const result=document.getElementById('builderResult');
  if(!list||typeof EMPIRE_TIMELINE_DATA==='undefined')return;
  let items=[];
  function populate(){
    items=EMPIRE_TIMELINE_DATA.filter(d=>!/Republic of India/.test(d.name)).slice(0,8).sort(()=>Math.random()-0.5);
    list.innerHTML=items.map((d,i)=>`<li draggable="true" data-name="${escH(d.name)}">${escH(d.name)}<span style="color:var(--bone-d);font-size:.75rem">⠿ drag</span></li>`).join('');
    result.textContent='';
    attachDrag();
  }
  function attachDrag(){
    let dragEl=null;
    list.querySelectorAll('li').forEach(li=>{
      li.addEventListener('dragstart',()=>{ dragEl=li; li.classList.add('dragging'); });
      li.addEventListener('dragend',()=>{ li.classList.remove('dragging'); li.classList.remove('correct-pos','wrong-pos'); });
      li.addEventListener('dragover',(e)=>{
        e.preventDefault();
        const bounding=li.getBoundingClientRect();
        const offset=e.clientY-bounding.top-bounding.height/2;
        if(offset<0)li.parentNode.insertBefore(dragEl,li);
        else li.parentNode.insertBefore(dragEl,li.nextSibling);
      });
    });
  }
  shuffleBtn.addEventListener('click',populate);
  checkBtn.addEventListener('click',()=>{
    const order=[...list.querySelectorAll('li')].map(li=>li.dataset.name);
    const correctOrder=[...items].sort((a,b)=>a.from-b.from).map(d=>d.name);
    let right=0;
    list.querySelectorAll('li').forEach((li,i)=>{
      const ok=order[i]===correctOrder[i];
      li.classList.toggle('correct-pos',ok);
      li.classList.toggle('wrong-pos',!ok);
      if(ok)right++;
    });
    result.textContent=`${right} / ${order.length} in correct chronological position`;
    if(right===order.length)showToast('Perfect chronology! 🧩','🏆');
  });
  populate();
}

/* ---------- MINI STICKY SCRUBBER for overlays ---------- */
function injectMiniScrubber(containerEl,onJump){
  if(!containerEl||containerEl.querySelector('.mini-scrubber'))return;
  const bar=document.createElement('div');
  bar.className='mini-scrubber';
  bar.innerHTML=`<span>🕰</span><input type="range" min="-3000" max="2026" value="${typeof currentYear!=='undefined'?currentYear:0}"><span class="mini-year">Now</span>`;
  containerEl.insertBefore(bar,containerEl.firstChild);
  const range=bar.querySelector('input'); const yr=bar.querySelector('.mini-year');
  range.addEventListener('input',()=>{ yr.textContent=fmtYr(+range.value); });
  range.addEventListener('change',()=>{ if(typeof onJump==='function')onJump(+range.value); });
}
// Attach mini-scrubbers to Story Mode and Topic Hub overlays so users can jump eras without closing
const storyModeEl=document.getElementById('storyMode');
const hubEl=document.getElementById('topicHub');
[storyModeEl,hubEl].forEach(el=>{
  if(!el)return;
  const obs=new MutationObserver(()=>{
    if(el.classList.contains('active')){
      injectMiniScrubber(el.firstElementChild&&el.firstElementChild.nodeType===1?el:el,(y)=>{
        if(typeof commitYear==='function'){ closeStoryMode&&closeStoryMode(); closeTopicHub&&closeTopicHub();
          document.getElementById('timeline-sec')?.scrollIntoView({behavior:'smooth'});
          currentYear=y; if(typeof positionNode==='function')positionNode(y);
          commitYear(y,false);
        }
      });
    }
  });
  obs.observe(el,{attributes:true,attributeFilter:['class']});
});

/* ---------- INIT ALL ---------- */
initCompare();
initFamilyTrees();
initMystery();
initWhatIf();
initBuilder();

/* ══════════════════════════════════════
   v3 — OCEAN OF KNOWLEDGE MODULES
   ══════════════════════════════════════ */

/* ── EXTENDED QUOTES LIBRARY (200+) ── */
let EXTENDED_QUOTES=[]; // populated lazily by fetchLazyData() the first time the Wisdom Band / quote ticker initializes

/* ── WISDOM BAND INIT ── */
function initWisdomBand(){
  function pickFrom(allQ){
    const picks=[];const seen=new Set();
    while(picks.length<Math.min(20,allQ.length)){
      const r=allQ[Math.floor(Math.random()*allQ.length)];
      if(!seen.has(r.q)){seen.add(r.q);picks.push(r);}
    }
    return picks;
  }
  let picks=pickFrom(QUOTES);
  let cur=0,timer=null,paused=false;
  const qEl=document.getElementById('wbQuote');
  const aEl=document.getElementById('wbAttr');
  const dotsEl=document.getElementById('wbDots');
  if(!qEl)return;
  function buildDots(){
    dotsEl.innerHTML=picks.map((_,i)=>`<span class="wb-dot${i===0?' active':''}" data-i="${i}"></span>`).join('');
    dotsEl.querySelectorAll('.wb-dot').forEach(d=>d.addEventListener('click',()=>jump(+d.dataset.i)));
  }
  buildDots();
  function show(i){
    qEl.classList.add('fade-out'); aEl.classList.add('fade-out');
    setTimeout(()=>{
      qEl.textContent=picks[i].q;
      aEl.textContent='— '+picks[i].a;
      qEl.classList.remove('fade-out'); qEl.classList.add('fade-in');
      aEl.classList.remove('fade-out'); aEl.classList.add('fade-in');
      dotsEl.querySelectorAll('.wb-dot').forEach((d,j)=>d.classList.toggle('active',j===i));
      setTimeout(()=>{qEl.classList.remove('fade-in');aEl.classList.remove('fade-in');},600);
    },350);
  }
  function jump(i){cur=i;show(cur);}
  function advance(){if(paused)return;cur=(cur+1)%picks.length;show(cur);}
  show(0);
  timer=setInterval(advance,6500);
  document.getElementById('wbPrev')?.addEventListener('click',()=>{cur=(cur-1+picks.length)%picks.length;show(cur);});
  document.getElementById('wbNext')?.addEventListener('click',()=>{cur=(cur+1)%picks.length;show(cur);});
  document.getElementById('wisdomBand')?.addEventListener('mouseenter',()=>paused=true);
  document.getElementById('wisdomBand')?.addEventListener('mouseleave',()=>paused=false);
  // quietly enrich the pool with the full quote library once it loads, without disrupting
  // whatever quote is currently being shown
  fetchLazyData('EXTENDED_QUOTES','data-extended-quotes',[]).then(extra=>{
    if(extra.length){
      EXTENDED_QUOTES=extra;
      picks=pickFrom([...QUOTES,...EXTENDED_QUOTES]);
      buildDots();
    }
  });
}

/* ── QUOTE TICKER INIT ── */
function initQuoteTicker(){
  const track=document.getElementById('quoteTickerTrack');
  if(!track)return;
  function render(pool){
    const html=pool.map(p=>`<span class="qt-item"><span class="qt-sep">❖</span>${escH(p.q)}<span class="qt-auth">— ${escH(p.a)}</span></span>`).join('');
    track.innerHTML=html+html; // duplicate for loop
  }
  render([...QUOTES].sort(()=>Math.random()-.5).slice(0,30));
  fetchLazyData('EXTENDED_QUOTES','data-extended-quotes',[]).then(extra=>{
    if(extra.length){
      EXTENDED_QUOTES=extra;
      render([...QUOTES,...EXTENDED_QUOTES].sort(()=>Math.random()-.5).slice(0,30));
    }
  });
}

/* ── PHILOSOPHER DATA ── */
const PHILOSOPHERS=[
  {name:"Adi Shankaracharya",dates:"788–820 CE",era:"Medieval Hindu",bio:"At 32 he walked the entirety of India barefoot, debating scholars, and consolidated Advaita Vedanta — the philosophy that ultimate reality is one, undivided consciousness. He revived a Hinduism in decline and established four mathas at the four corners of the subcontinent.",quote:"Brahma Satyam Jagan Mithya — Brahman is the only truth, the world is illusion.",src:"Vivekachudamani",tags:["Advaita","Vedanta","Philosophy","Sanskrit"],accent:"#DFA840"},
  {name:"Nagarjuna",dates:"c. 150–250 CE",era:"Buddhist Philosopher",bio:"The founder of the Madhyamaka school of Buddhist philosophy, Nagarjuna argued that all phenomena are empty (shunyata) of inherent existence. His Mulamadhyamakakarika remains one of the most analyzed philosophical texts in history — debated by Tibetan, Chinese and Japanese scholars for 1,800 years.",quote:"Everything exists — that is one extreme. Nothing exists — that is another. The middle way is the teaching of the Tathagata.",src:"Mulamadhyamakakarika 15.10",tags:["Buddhism","Madhyamaka","Shunyata","Logic"],accent:"#9B7BE0"},
  {name:"Chanakya (Kautilya)",dates:"c. 375–283 BCE",era:"Mauryan Era",bio:"Prime minister to Chandragupta Maurya and the author of the Arthashastra — the world's most sophisticated ancient manual on statecraft, economics, military strategy, and diplomacy. His system anticipated Machiavelli by 1,800 years. He built the first pan-Indian empire from scratch.",quote:"The king shall consider as good not what pleases himself but what pleases his subjects.",src:"Arthashastra 1.19.34",tags:["Political Philosophy","Arthashastra","Strategy","Economics"],accent:"#E05C42"},
  {name:"Patanjali",dates:"c. 150 BCE",era:"Classical",bio:"Compiler of the Yoga Sutras — 196 aphorisms that define the 8-limbed path of yoga. His framework organized centuries of existing yogic practice into a coherent system that remains the foundational text of classical yoga. His Mahabhashya also revolutionized Sanskrit grammar.",quote:"Yoga is the cessation of the fluctuations of the mind.",src:"Yoga Sutras 1.2",tags:["Yoga","Sanskrit","Samadhi","Grammar"],accent:"#2EC4B6"},
  {name:"Ramanujacharya",dates:"1017–1137 CE",era:"Medieval South India",bio:"Lived to age 120 according to tradition and spent his life arguing against Shankara's pure non-dualism. His Vishishtadvaita philosophy — qualified non-dualism — made devotion (bhakti) philosophically rigorous. His influence on the Bhakti movement that swept medieval India cannot be overstated.",quote:"God is not a concept — He is a reality that transforms the devotee who approaches Him with love.",src:"Sri Bhashya (commentary on Brahma Sutras)",tags:["Bhakti","Vishishtadvaita","Vaishnavism","South India"],accent:"#DFA840"},
  {name:"Kabir",dates:"1440–1518 CE",era:"Bhakti Movement",bio:"Born to a Muslim weaving family, possibly adopted, claimed by both Hindus and Muslims (and neither). His dohas (couplets) attacked caste, religious hypocrisy, and ritual formalism with devastating wit. His followers — the Kabir Panth — still number in the millions.",quote:"I have been thinking of the difference between water and the waves on it. Rising, water's still water, falling back, it is water — will you give me a hint how to tell them apart?",src:"Kabir Doha",tags:["Bhakti","Sufi","Poetry","Doha","Reform"],accent:"#9B7BE0"},
  {name:"Aryabhata",dates:"476–550 CE",era:"Gupta Golden Age",bio:"Born in Kusumapura (modern Patna), he wrote the Aryabhatiya at age 23. He calculated the circumference of the Earth to within 1% accuracy, proposed that the Earth rotates on its axis, and calculated pi to 4 decimal places — all over a thousand years before Copernicus.",quote:"Just as a man in a boat moving forward sees stationary objects as moving backward, so the stars appear to move westward from Lanka.",src:"Aryabhatiya, Golapada 9",tags:["Mathematics","Astronomy","Zero","Gupta"],accent:"#2EC4B6"},
  {name:"Mirabai",dates:"1498–1547 CE",era:"Bhakti Movement",bio:"Rajput princess, mystic poet, and devotee of Krishna who defied every social norm of her era. Abandoned her royal household, refused to observe purdah, sat with saints and singers considered below her caste, and composed over 1,300 bhajans still sung across India today.",quote:"I have loved the dark one since before I can remember, and it has become my life.",src:"Mirabai, Bhajan 24",tags:["Bhakti","Poetry","Women","Rajput","Krishna"],accent:"#E05C42"},
  {name:"Gautama Buddha",dates:"c. 563–483 BCE",era:"Founder, Buddhism",bio:"Born Siddhartha Gautama in Lumbini, he renounced a princely life at 29 to seek the end of suffering. After six years of asceticism he attained enlightenment under the Bodhi tree at Bodh Gaya, formulating the Four Noble Truths and the Eightfold Path — a philosophy that would spread from India to dominate the spiritual life of half of Asia.",quote:"All conditioned things are impermanent. Work out your own salvation with diligence.",src:"Mahaparinibbana Sutta",tags:["Buddhism","Ethics","Middle Way","Dharma"],accent:"#2EC4B6"},
  {name:"Mahavira",dates:"c. 599–527 BCE",era:"Founder, Jainism",bio:"24th Tirthankara of Jainism, born a Kshatriya prince who renounced wealth at 30 for twelve years of extreme asceticism. He systematized ahimsa (non-violence), anekantavada (many-sidedness of truth), and aparigraha (non-possession) — ideas that would echo 2,500 years later in Gandhi's satyagraha.",quote:"Non-violence and kindness to living beings is kindness to oneself.",src:"Acharanga Sutra",tags:["Jainism","Ahimsa","Asceticism","Anekantavada"],accent:"#7A5C22"},
  {name:"Guru Nanak",dates:"1469–1539 CE",era:"Founder, Sikhism",bio:"Founder of Sikhism, born in Talwandi (now Nankana Sahib, Pakistan). Rejected caste, idol worship, and ritualism in favor of one formless God, equality of all humans, and the dignity of honest labour (kirat karo) and sharing (vand chhako). Undertook long udasis (missionary journeys) across India, Tibet, and Arabia.",quote:"There is but One God, His name is Truth, He is the Creator.",src:"Mul Mantar, Guru Granth Sahib",tags:["Sikhism","Equality","Monotheism","Reform"],accent:"#DFA840"},
  {name:"Basava",dates:"1131–1196 CE",era:"Lingayat Reform, Karnataka",bio:"Founder of the Lingayat movement and chief minister at the Kalachuri court of Kalyana. Pioneered the Anubhava Mantapa — an early assembly for open philosophical and social debate where people of all castes, including women, could speak. Rejected caste hierarchy, idol worship, and Brahminical ritualism outright.",quote:"Work is worship. The hands that labour are the hands that pray.",src:"Vachana (Basavanna)",tags:["Lingayat","Social Reform","Vachana","Karnataka"],accent:"#9B7BE0"},
  {name:"Swami Vivekananda",dates:"1863–1902 CE",era:"Modern Hindu Renaissance",bio:"Disciple of Sri Ramakrishna who electrified the 1893 Parliament of Religions in Chicago with his opening words 'Sisters and brothers of America,' introducing Vedanta and Yoga to the West at scale. Founded the Ramakrishna Mission, fusing spiritual practice with social service, and reignited Indian self-confidence during colonial rule.",quote:"Arise, awake, and stop not till the goal is reached.",src:"Complete Works, Vol. 1",tags:["Vedanta","Modern Reform","Yoga","Nationalism"],accent:"#E05C42"},
  {name:"Madhvacharya",dates:"1238–1317 CE",era:"Medieval South India",bio:"Founder of Dvaita Vedanta — the philosophy of strict dualism between the individual soul and a personal, supreme God. Wrote prolifically across logic, scripture commentary and theology, building the third great pillar of Vedantic thought alongside Shankara's Advaita and Ramanuja's Vishishtadvaita.",quote:"The Supreme is forever distinct from the soul; to know this distinction truly is liberation.",src:"Anuvyakhyana",tags:["Dvaita","Vedanta","Dualism","Karnataka"],accent:"#2EC4B6"},
  {name:"Tulsidas",dates:"c.1511–1623 CE",era:"Bhakti Movement",bio:"Author of the Ramcharitmanas, a retelling of the Ramayana in Awadhi that became — and remains — the single most widely read and performed religious text in North India, recited at Ramlila festivals every autumn for over four centuries.",quote:"As is faith, so is the deed; as is the deed, so is the fruit.",src:"Ramcharitmanas, Uttar Kanda",tags:["Bhakti","Ramayana","Awadhi","Poetry"],accent:"#DFA840"},
  {name:"Akka Mahadevi",dates:"c.1130–1160 CE",era:"Lingayat / Vachana Tradition",bio:"A 12th-century Kannada mystic poet who walked away from an arranged marriage and convention itself, wandering as a wandering ascetic devoted to Shiva. Her vachanas (free-verse devotional poems) are landmarks of early Kannada literature and among the boldest expressions of female spiritual autonomy in medieval India.",quote:"Why do I need this dress and bodice? You cover and adorn me with light — why do I need a mortal husband?",src:"Vachana of Akka Mahadevi",tags:["Lingayat","Vachana","Women","Karnataka"],accent:"#9B7BE0"},
  {name:"Sant Tukaram",dates:"1608–1650 CE",era:"Bhakti Movement, Maharashtra",bio:"A Maratha grocer-turned-saint-poet whose abhangs (devotional verses) to Vithoba of Pandharpur made him one of the most beloved figures of the Varkari tradition. His plainspoken Marathi verse reached ordinary peasants and traders directly, bypassing Sanskrit's elite gatekeeping entirely.",quote:"What good is a religion that does not teach us to be human towards other human beings?",src:"Tukaram Gatha",tags:["Bhakti","Varkari","Marathi","Abhang"],accent:"#E05C42"},
  {name:"Charvaka (Ajita Kesakambali)",dates:"c.6th century BCE",era:"Ancient Materialist School",bio:"The Charvaka or Lokayata school — among the world's earliest recorded materialist philosophies — denied the soul, an afterlife, and the authority of the Vedas, holding that only direct sense-perception counted as valid knowledge. Known mainly through the hostile summaries of rival schools, since almost none of its original texts survive.",quote:"There is no other world than this; there is no heaven and no hell.",src:"Quoted via Sarvadarshanasangraha (rival summary)",tags:["Materialism","Skepticism","Lokayata","Ancient"],accent:"#7A5C22"},
  {name:"Andal",dates:"c.8th–9th century CE",era:"Bhakti Movement, Tamil Vaishnavism",bio:"The only woman among the twelve Tamil Alvar saints, Andal composed the Tiruppavai and Nachiyar Tirumozhi — passionate devotional poems addressed to Vishnu as a divine bridegroom. Tradition holds she was found as an infant in a basil garden and is worshipped today as an incarnation of the goddess Bhumi.",quote:"I have made a garland fit for you, O Lord, weaving it with my own hands and my own heart.",src:"Tiruppavai",tags:["Bhakti","Vaishnavism","Tamil","Women"],accent:"#2EC4B6"},
  {name:"Raja Ram Mohan Roy",dates:"1772–1833 CE",era:"Bengal Renaissance",bio:"Often called the 'Father of the Indian Renaissance,' Roy founded the Brahmo Samaj to reform Hindu practice along rationalist, monotheistic lines and campaigned relentlessly — successfully — for the legal abolition of sati in 1829, one of colonial India's first major social-reform victories.",quote:"The present system of Hindu worship is not calculated to promote their political interest.",src:"Letter to Lord Amherst, 1823",tags:["Brahmo Samaj","Reform","Bengal Renaissance","Rationalism"],accent:"#DFA840"},
  {name:"Swami Dayananda Saraswati",dates:"1824–1883 CE",era:"Arya Samaj Reform Movement",bio:"Founder of the Arya Samaj in 1875, he called for a return to the authority of the Vedas alone, rejecting idol worship, caste by birth, and child marriage. His movement became a major engine of Hindu reform, education (the DAV school network), and early nationalist sentiment in Punjab and North India.",quote:"Make this world, which is full of misery due to ignorance, happy through knowledge.",src:"Satyarth Prakash",tags:["Arya Samaj","Vedic Reform","Education","Punjab"],accent:"#E05C42"},
  {name:"Sri Aurobindo",dates:"1872–1950 CE",era:"Modern Synthesis, Integral Yoga",bio:"A Cambridge-educated revolutionary turned mystic, Aurobindo moved from radical anti-colonial politics to founding an ashram in Pondicherry and developing 'Integral Yoga' — a synthesis of Vedanta, evolutionary philosophy, and spiritual practice aimed at the transformation of consciousness itself.",quote:"All life is yoga.",src:"The Synthesis of Yoga",tags:["Integral Yoga","Synthesis","Pondicherry","Modern"],accent:"#9B7BE0"},
  {name:"Srimanta Sankardev",dates:"1449–1568 CE",era:"Bhakti Movement, Assam Neo-Vaishnavism",bio:"A polymath saint, poet, playwright and social reformer who founded the Ekasarana Dharma — devotion to a single god, Krishna, free of caste hierarchy and elaborate ritual. His Naamghars (prayer halls) and Sattras (monasteries) reshaped Assamese society, and his plays and devotional songs remain foundational to Assamese culture today.",quote:"One God, one devotion, one path — none other is needed.",src:"Kirtan Ghosha",tags:["Neo-Vaishnavism","Assam","Bhakti","Social Reform"],accent:"#2EC4B6"},
  {name:"Ramana Maharshi",dates:"1879–1950 CE",era:"Modern Advaita",bio:"A largely silent sage of Tiruvannamalai whose central teaching — self-inquiry through the question 'Who am I?' — attracted seekers from across the world, including Western philosophers and scientists, to his ashram at the foot of Arunachala hill. He wrote almost nothing himself; his teaching survives mainly through disciples' transcriptions of conversations.",quote:"Your own Self-realization is the greatest service you can render the world.",src:"Talks with Sri Ramana Maharshi",tags:["Advaita","Self-Inquiry","Modern","Tamil Nadu"],accent:"#DFA840"},
  {name:"Guru Gobind Singh",dates:"1666–1708 CE",era:"Sikhism, Tenth Guru",bio:"The tenth and final human Guru of Sikhism, who founded the Khalsa order in 1699, giving Sikhs a distinct martial and spiritual identity to resist persecution. He also declared the Guru Granth Sahib the eternal, living Guru of Sikhism after his death, ending the line of human Gurus permanently.",quote:"Recognize all humankind as one.",src:"Akal Ustat",tags:["Sikhism","Khalsa","Punjab","Reform"],accent:"#E05C42"},
  {name:"Swaminarayan",dates:"1781–1830 CE",era:"Bhakti Reform, Gujarat",bio:"Founder of the Swaminarayan Sampraday, a Vaishnava reform movement that campaigned against practices like sati, infanticide, and animal sacrifice while organizing one of India's most extensive networks of temples, social service institutions and educational trusts — a network that continues to expand globally today.",quote:"Where there is true love for God, there is no place for vice.",src:"Shikshapatri",tags:["Vaishnavism","Social Reform","Gujarat","Modern Institution-Building"],accent:"#9B7BE0"},
];

/* ── INIT PHILOSOPHER CARDS ── */
function initPhilosopherCards(){
  const grid=document.getElementById('philGrid');
  if(!grid)return;
  grid.innerHTML=PHILOSOPHERS.map(p=>`
    <div class="phil-card" style="--pc-accent:${p.accent}">
      <div class="phil-era-badge">${escH(p.era)}</div>
      <div class="phil-name">${escH(p.name)}</div>
      <div class="phil-dates">${escH(p.dates)}</div>
      <div class="phil-bio">${escH(p.bio)}</div>
      <div class="phil-quote-pull">${escH(p.quote)}</div>
      <div class="phil-quote-src">— ${escH(p.src)}</div>
      <div class="phil-domain-tags">${p.tags.map(t=>`<span class="phil-tag">${escH(t)}</span>`).join('')}</div>
    </div>
  `).join('');
}

/* ── WOMEN OF INDIA DATA ── */
const WOMEN_HISTORY=[
  {name:"Rani Lakshmibai",dates:"1828–1858",role:"Queen & Warrior",bio:"Queen of Jhansi and the most iconic figure of the 1857 Revolt. She took up arms against the British after the annexation of her kingdom and died on the battlefield at 29, sword in hand, never surrendering her city.",quote:"I shall not surrender my Jhansi.",accent:"#E05C42"},
  {name:"Ahilyabai Holkar",dates:"1725–1795",role:"Empress & Administrator",bio:"Holkar queen who ruled Malwa for 30 years with extraordinary competence. She commissioned temples, dharmashalas, and wells across the subcontinent — from Varanasi to Rameshwaram. James Mill called her 'one of the purest and most exemplary rulers that ever lived.'",quote:"Justice is the only real wealth. A kingdom that loses justice loses everything.",accent:"#DFA840"},
  {name:"Razia Sultana",dates:"1205–1240",role:"Delhi Sultanate Empress",bio:"The first and only woman to rule the Delhi Sultanate, appointed by her father Iltutmish over her brothers because 'she is more worthy.' She refused purdah, held open court, and led armies — before being deposed by a court that could not accept her.",quote:"I am sultan. I rule by the sword, not by gender.",accent:"#9B7BE0"},
  {name:"Sarojini Naidu",dates:"1879–1949",role:"Poet & Freedom Fighter",bio:"Called the 'Nightingale of India,' she was the first Indian woman to become President of the Indian National Congress (1925) and the first woman governor of an Indian state (UP, 1947). Her English poetry was admired by Edmund Gosse and published in London.",quote:"We want deeper sincerity of motive, a greater courage in speech and earnestness in action.",accent:"#2EC4B6"},
  {name:"Mirabai",dates:"1498–1547",role:"Mystic Poet & Saint",bio:"Rajput princess who abandoned royal life for devotion to Krishna. Composed over 1,300 bhajans in Braj Bhasha and Rajasthani, defying caste norms, social convention, and attempts on her life. Her poems remain India's most widely sung devotional literature.",quote:"I have loved the dark one since before I can remember, and it has become my life.",accent:"#E05C42"},
  {name:"Chand Bibi",dates:"1550–1599",role:"Regent & Defender",bio:"Regent of both Ahmednagar and Bijapur, she famously defended Ahmednagar against Akbar's vastly superior Mughal forces in 1595 — personally directing the defense from the battlements. She was eventually killed by her own troops when she began negotiating.",quote:"A woman who does not know how to die does not know how to live.",accent:"#DFA840"},
  {name:"Kasturba Gandhi",dates:"1869–1944",role:"Freedom Fighter",bio:"Wife of Mahatma Gandhi and a determined activist in her own right. Participated in satyagraha campaigns in South Africa and India, was imprisoned repeatedly, and maintained her own moral compass distinct from her husband's. She died in British detention in 1944.",quote:"I am not the satellite of any man, not even the great Mahatma.",accent:"#9B7BE0"},
  {name:"Kittur Rani Chennamma",dates:"1778–1829",role:"Queen & Rebel",bio:"Queen of Kittur (Karnataka) who rebelled against the British doctrine of lapse in 1824 — 33 years before the 1857 revolt. She defeated a British force in battle, captured a commissioner, and was only overcome in the second attack. She died imprisoned at Bailhongal.",quote:"I am the queen of Kittur. My land is not for the taking.",accent:"#E05C42"},
  {name:"Begum Hazrat Mahal",dates:"c.1820–1879",role:"Begum & Rebel Leader",bio:"Begum of Awadh who took charge of the resistance at Lucknow during the 1857 Revolt after her husband was exiled, placing her young son on the throne and personally directing military operations against the British. She refused all offers of pension and pardon, fleeing to Nepal and dying in exile rather than submit.",quote:"I will never bow before those who took my kingdom by deceit.",accent:"#DFA840"},
  {name:"Velu Nachiyar",dates:"1730–1796",role:"Queen of Sivaganga",bio:"Often called India's first queen to fight the British, decades before 1857. After her husband was killed by the British and their allies, she raised an army with the help of Hyder Ali, formed a female suicide squad called the 'Udaiyaal' commandos, and reclaimed her kingdom in 1780.",quote:"A throne lost to betrayal must be reclaimed by fire.",accent:"#9B7BE0"},
  {name:"Savitribai Phule",dates:"1831–1897",role:"Educator & Social Reformer",bio:"India's first female teacher in the modern sense, she co-founded one of the country's earliest schools for girls in 1848 with her husband Jyotirao Phule, enduring stones and dung thrown at her on her way to class. She also opened a care home for pregnant rape survivors and widows, and died nursing plague patients.",quote:"Go, get education. Be self-reliant, be industrious. Work, gather wisdom and riches.",accent:"#2EC4B6"},
  {name:"Rani Abbakka Chowta",dates:"16th century",role:"Queen of Ullal",bio:"Tuluva queen of the coastal kingdom of Ullal who fought off repeated Portuguese invasions in the 1550s–70s, decades before the more famous resistance struggles of the north. She used guerrilla tactics and alliances across religious lines (with the Bijapur Sultanate and local Muslim sailors) to repel one of the most powerful colonial navies of the age.",quote:"The sea I guard does not bow to foreign flags.",accent:"#E05C42"},
  {name:"Gulab Kaur",dates:"1890–1941",role:"Revolutionary, Ghadar Movement",bio:"A Punjabi emigrant to the Philippines who joined the Ghadar Party, gave up her own emigration papers to help a fellow revolutionary return to India, and organized armed resistance cells against British rule across Punjab — one of the few women at the center of the transnational Ghadar conspiracy.",quote:"Freedom is not given. It is taken, person by person.",accent:"#DFA840"},
  {name:"Onake Obavva",dates:"d. 1779",role:"Folk Heroine of Chitradurga",bio:"A guard's wife at Chitradurga Fort in Karnataka who, by local tradition, discovered Hyder Ali's soldiers infiltrating through a narrow rock crevice while her husband was away and held the gap alone, striking down intruder after intruder with nothing but a wooden grain-pestle. The crevice — Onake Obavvana Kindi — still bears her name.",quote:"The gap in the wall was mine to hold, and I held it.",accent:"#9B7BE0"},
  {name:"Rani Durgavati",dates:"1524–1564",role:"Queen of Gondwana",bio:"Widowed queen of Garha-Katanga (in present-day Madhya Pradesh) who personally led her army against repeated invasions, including the forces of Akbar's general Asaf Khan. Wounded by two arrows in her final battle in 1564, she chose to stab herself with her own dagger rather than be captured.",quote:"A queen who is captured has already lost her kingdom twice over.",accent:"#E05C42"},
  {name:"Matangini Hazra",dates:"1869–1942",role:"Freedom Fighter",bio:"A widowed peasant woman from Midnapore who became a fearless Congress activist in her sixties, leading salt marches and picket lines. Shot three times by police while leading a procession to hoist the Indian flag during the Quit India Movement, she died still holding the flag aloft, chanting 'Vande Mataram.'",quote:"I will die, but I will not let the flag fall.",accent:"#2EC4B6"},
  {name:"Aruna Asaf Ali",dates:"1909–1996",role:"Freedom Fighter, 'Grand Old Lady of the Independence Movement'",bio:"Hoisted the Indian flag at Gowalia Tank Maidan in Bombay on 9 August 1942, the day after the Quit India call, while underground and wanted by police — an act that turned her into a legend of the movement almost overnight. Lived underground for years evading arrest before resurfacing after Independence.",quote:"Freedom is never granted; it has to be seized.",accent:"#DFA840"},
  {name:"Pandita Ramabai",dates:"1858–1922",role:"Scholar & Social Reformer",bio:"A Sanskrit scholar so formidable that the University of Calcutta awarded her the titles 'Pandita' and 'Sarasvati' in 1878, she went on to found schools and shelters for widows and orphaned girls across Maharashtra, and translated the Bible into Marathi — one of colonial India's most relentless advocates for women's education.",quote:"Educate a woman and you educate a family; ignore her and you condemn a generation.",accent:"#9B7BE0"},
  {name:"Subhadra Kumari Chauhan",dates:"1904–1948",role:"Poet & Freedom Fighter",bio:"The first woman from Madhya Pradesh to be imprisoned for the freedom movement, she is best remembered for her Hindi poem 'Jhansi ki Rani,' whose refrain — 'Khoob ladi mardani woh to Jhansi wali Rani thi' — turned Rani Lakshmibai's story into a verse recited in classrooms across India for generations.",quote:"Khoob ladi mardani woh to Jhansi wali Rani thi — she fought bravely like a man, she was the Queen of Jhansi.",accent:"#E05C42"},
  {name:"Bhikaji Cama",dates:"1861–1936",role:"Revolutionary in Exile",bio:"Exiled to Europe for her revolutionary activities, Madame Cama unfurled what is considered an early version of the Indian flag at an international socialist conference in Stuttgart in 1907 — one of the first public assertions of Indian sovereignty on foreign soil, decades before Independence.",quote:"This flag is of Indian Independence. Behold, it is born already.",accent:"#2EC4B6"},
  {name:"Captain Lakshmi Sahgal",dates:"1914–2012",role:"INA Officer, Rani of Jhansi Regiment",bio:"A physician who became commander of the all-women Rani of Jhansi Regiment of Subhas Chandra Bose's Indian National Army — among the first organized women's combat regiments in modern Asian history. She continued practicing medicine and political activism well into her nineties.",quote:"We were not auxiliary. We were soldiers, and we meant to fight.",accent:"#DFA840"},
  {name:"Naiki Devi",dates:"12th century CE",role:"Regent & Military Commander, Chaulukya Dynasty",bio:"Regent of the Chaulukya (Solanki) kingdom of Gujarat who personally commanded her army at the Battle of Kasahrada in 1178, decisively repelling an invasion led by Muhammad of Ghor decades before his eventual conquests in North India — a victory that delayed the Sultanate's westward expansion by a generation.",quote:"My son's throne will not fall while I stand to defend it.",accent:"#9B7BE0"},
  {name:"Tarabai Bhonsle",dates:"1675–1761",role:"Maratha Regent & Military Strategist",bio:"Daughter-in-law of Shivaji, Tarabai took command of the Maratha state after her husband Rajaram's death in 1700, personally directing military campaigns against Aurangzeb's Mughal armies during the empire's most precarious years. Her regency held the Maratha confederacy together when it could easily have collapsed.",quote:"A kingdom is not lost while one of its blood still commands its armies.",accent:"#E05C42"},
  {name:"Avantibai Lodhi",dates:"1831–1858",role:"Queen of Ramgarh, 1857 Revolt",bio:"Queen-regent of Ramgarh in present-day Madhya Pradesh, Avantibai raised an army of 4,000 and used guerrilla tactics against British forces during the 1857 Revolt, defeating a Company detachment at Khairi. Cornered after later defeats, she took her own life rather than be captured.",quote:"Tighten your waist to protect the motherland, or sit at home in bangles.",accent:"#2EC4B6"},
  {name:"Jhalkari Bai",dates:"1830–1858",role:"Soldier of the Durga Dal, Siege of Jhansi",bio:"A soldier in Rani Lakshmibai's women's regiment who, during the climactic siege of Jhansi, disguised herself as the Rani and fought on the front lines under that identity — buying the real queen crucial time to escape the fort safely. She is remembered today as a symbol of ordinary courage within the 1857 Revolt.",quote:"Let them believe the queen still stands here, while she rides free.",accent:"#DFA840"},
  {name:"Sucheta Kriplani",dates:"1908–1974",role:"Freedom Fighter & First Woman Chief Minister",bio:"A Constituent Assembly member who sang Vande Mataram as the Indian flag was hoisted at midnight on 15 August 1947, Kriplani later became India's first woman Chief Minister, leading Uttar Pradesh from 1963 to 1967 — a pioneering bridge between the freedom movement and post-Independence governance.",quote:"The torch passed from the struggle for freedom to the struggle for governance.",accent:"#7A5C22"},
  {name:"Kuyili",dates:"d. 1780",role:"Commander, Sivaganga Army",bio:"A trusted commander under Rani Velu Nachiyar who, during the queen's campaign to reclaim Sivaganga from the British-backed Nawab, doused herself in oil and set herself alight to infiltrate and destroy an enemy ammunition depot — an act often cited as among history's earliest recorded human bomb attacks, predating the term itself by two centuries.",quote:"My body was the last weapon left to give.",accent:"#9B7BE0"},
];

/* ── Reusable "Search More" tile builder ──
   Appends a dashed CTA tile to any container that, on click, reveals an inline
   text input wired into the same selectMode/runQuery pipeline as every other
   search on the site. Used by Women, Battles, Military Operations and Science
   grids so none of those lists ever reads as a hard ceiling. */
function buildSearchMoreTile(container,{label="Search More",hint="Looking for someone or something not listed above? Search the full Chronicle.",placeholder="Type a name, event, or topic…",extraClass=""}={}){
  const el=document.createElement('div');
  el.className='search-more-tile'+(extraClass?' '+extraClass:'');
  el.innerHTML=`
    <div class="mm-cta">
      <div class="mm-icon"><svg viewBox="0 0 52 52" fill="none"><circle cx="22" cy="22" r="14" stroke="currentColor" stroke-width="2.4"/><line x1="32" y1="32" x2="45" y2="45" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><line x1="17" y1="22" x2="27" y2="22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="22" y1="17" x2="22" y2="27" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></div>
      <h3>${escH(label)}</h3>
      <p>${escH(hint)}</p>
    </div>
    <div class="mon-search-box">
      <input type="text" placeholder="${escH(placeholder)}">
      <button type="button">Reveal</button>
      <span class="mon-search-hint">Searches the same archive as the rest of the site</span>
    </div>`;
  container.appendChild(el);
  const cta=el.querySelector('.mm-cta');
  const box=el.querySelector('.mon-search-box');
  const input=el.querySelector('input');
  const go=el.querySelector('button');
  function reveal(){cta.style.display='none';box.classList.add('active');input.focus();}
  function fire(){
    const val=(input.value||'').trim();
    if(!val)return;
    selectMode('topic');
    if(typeof queryInput!=='undefined')queryInput.value=val;
    document.getElementById('gateway-sec')?.scrollIntoView({behavior:'smooth',block:'start'});
    setTimeout(()=>runQuery(val),350);
  }
  el.addEventListener('click',()=>{ if(!box.classList.contains('active')) reveal(); });
  input.addEventListener('click',e=>e.stopPropagation());
  input.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.stopPropagation(); fire(); } });
  go.addEventListener('click',e=>{ e.stopPropagation(); fire(); });
  return el;
}

function initWomenGrid(){
  const grid=document.getElementById('womenGrid');
  if(!grid)return;
  grid.innerHTML=WOMEN_HISTORY.map(w=>`
    <div class="woman-card">
      <div class="wc-role">${escH(w.role)}</div>
      <div class="wc-name">${escH(w.name)}</div>
      <div class="wc-dates">${escH(w.dates)}</div>
      <div class="wc-bio">${escH(w.bio)}</div>
      <div class="wc-quote" style="border-left-color:${w.accent}">${escH(w.quote)}</div>
    </div>
  `).join('');
  buildSearchMoreTile(grid,{label:"Search More",hint:"Looking for a woman from history not featured here? Search the full Chronicle.",placeholder:"e.g. Rani Lakshmibai, Sarojini Naidu…"});
}

/* ── BATTLES DATA ── */
const BATTLES=[
  {yr:"c.1400 BCE",period:"Rigvedic",name:"Battle of the Ten Kings (Dasarajna)",sig:"The ten-king confederacy's loss to Sudas on the Ravi river reshaped tribal power in the Punjab and is recorded in the Rigveda — making it one of the first battles ever described in world literature.",outcome:"decisive"},
  {yr:"326 BCE",period:"Ancient",name:"Battle of the Hydaspes",sig:"Alexander the Great defeated Porus on the Jhelum river, but so impressed was he by Porus's valor that he restored his kingdom. Alexander's troops mutinied here and turned back — India was the wall that stopped the greatest conqueror of the ancient world.",outcome:"stalemate"},
  {yr:"261 BCE",period:"Mauryan",name:"Kalinga War",sig:"The bloodiest campaign of Ashoka's reign — 100,000 killed, 150,000 deported. The sight of the carnage converted Ashoka to Buddhism and non-violence, and transformed him into history's most unusual emperor: a conqueror who renounced conquest.",outcome:"decisive"},
  {yr:"712 CE",period:"Early Medieval",name:"Conquest of Sindh",sig:"Muhammad bin Qasim's victory at the Battle of Aror opened the first sustained Arab foothold on the subcontinent. The encounter between Islamic and Hindu civilizations that followed would define India's next 1,300 years.",outcome:"decisive"},
  {yr:"1191 CE",period:"Delhi Sultanate",name:"First Battle of Tarain",sig:"Prithviraj Chauhan's dramatic victory over Muhammad of Ghor — one of the last great Rajput triumphs before the medieval Islamic conquest of India reshaped the north.",outcome:"decisive"},
  {yr:"1192 CE",period:"Delhi Sultanate",name:"Second Battle of Tarain",sig:"Muhammad of Ghor's revenge. Prithviraj's defeat and death ended the last major Rajput power of the north and inaugurated the Delhi Sultanate. The next 600 years of Indian history flows from this single afternoon.",outcome:"decisive"},
  {yr:"1398 CE",period:"Delhi Sultanate",name:"Timur's Sack of Delhi",sig:"Timur (Tamerlane) left Delhi so devastated that India's political geography did not recover for a generation. The Delhi Sultanate never fully regained its power — creating the vacuum that the Lodis, and eventually the Mughals, would fill.",outcome:"decisive"},
  {yr:"1526 CE",period:"Mughal",name:"First Battle of Panipat",sig:"Babur's artillery against Ibrahim Lodi's war elephants. Babur's innovative gunpowder tactics — the tulughma flanking maneuver combined with matchlock guns — obliterated a numerically superior army and founded the Mughal Empire.",outcome:"decisive"},
  {yr:"1527 CE",period:"Mughal",name:"Battle of Khanwa",sig:"Babur defeated the Rajput confederacy under Rana Sanga, who had hoped to use the Mughals to expel the Lodis and then expel the Mughals. Khanwa, more than Panipat, secured Mughal power in India.",outcome:"decisive"},
  {yr:"1556 CE",period:"Mughal",name:"Second Battle of Panipat",sig:"Hemu, the Hindu general commanding the Suri forces, was on the verge of winning when an arrow struck him in the eye. His army routed, Akbar's regency was secured, and the Mughal Empire's great century began.",outcome:"decisive"},
  {yr:"1565 CE",period:"Vijayanagara",name:"Battle of Talikota",sig:"Four allied Deccan Sultanates crushed the Vijayanagara Empire. The Hindu kingdom's capital was razed — so completely that travelers decades later described a dead city. It remains one of history's most total destructions of a civilization's center.",outcome:"decisive"},
  {yr:"1576 CE",period:"Mughal",name:"Battle of Haldighati",sig:"Maharana Pratap against Akbar's forces. Tactically inconclusive but historically resonant — Pratap's refusal to submit from the Aravalli hills became the defining symbol of Rajput defiance across generations.",outcome:"stalemate"},
  {yr:"1659 CE",period:"Maratha",name:"Battle of Pratapgad",sig:"Shivaji Maharaj's surprise victory over the Bijapur general Afzal Khan — who had come to negotiate a submission and instead met a concealed weapon. The Maratha Empire's founding moment.",outcome:"decisive"},
  {yr:"1671 CE",period:"Mughal-Ahom",name:"Battle of Saraighat",sig:"Ahom commander Lachit Borphukan, reportedly rising from a sickbed, personally led the charge that destroyed Aurangzeb's massive river fleet. The only major Mughal naval defeat — and it preserved Assam's independence.",outcome:"decisive"},
  {yr:"1757 CE",period:"Colonial",name:"Battle of Plassey",sig:"Robert Clive's pre-arranged victory over Siraj ud-Daulah through the treachery of Mir Jafar. 'The battle' lasted three hours; the conspiracy that preceded it took months. It was the hinge on which British India swung open.",outcome:"decisive"},
  {yr:"1761 CE",period:"Maratha",name:"Third Battle of Panipat",sig:"Ahmad Shah Abdali's Afghan forces destroyed the Maratha army in one catastrophic day. The Marathas lost 50,000–75,000 fighters. The defeat shattered their bid for pan-Indian supremacy and opened the door for British expansion.",outcome:"defeat"},
  {yr:"1764 CE",period:"Colonial",name:"Battle of Buxar",sig:"More consequential than Plassey — the East India Company defeated a combined army of Nawab Shuja ud-Daulah, Emperor Shah Alam II, and Mir Qasim. The Treaty of Allahabad that followed gave the Company civil administration of Bengal, Bihar and Odisha.",outcome:"decisive"},
  {yr:"1799 CE",period:"Colonial",name:"Battle of Seringapatam",sig:"Tipu Sultan died defending his capital against a British-Hyderabad-Maratha coalition. 'The Tiger of Mysore' fell at the gates, sword in hand. His death removed the last serious military check on British expansion in the south.",outcome:"decisive"},
  {yr:"1857 CE",period:"Colonial",name:"Siege of Delhi — The Great Revolt",sig:"The bloodiest theater of 1857. The Mughal emperor Bahadur Shah Zafar — poet, calligrapher, 82 years old — became the reluctant face of the uprising. Delhi's fall after four months ended both the revolt and the Mughal dynasty.",outcome:"defeat"},
  {yr:"1857 CE",period:"Colonial",name:"Siege of Lucknow",sig:"The British Residency held for 87 days against overwhelming forces — a siege that became legend in British military mythology. Havelock, Outram, Campbell: the names entered schoolbooks for a century. For Indians, it was the year everything changed.",outcome:"stalemate"},
  {yr:"1944 CE",period:"World War II",name:"Battle of Imphal & Kohima",sig:"Called the 'Stalingrad of the East.' Japanese forces and the Indian National Army attempted to invade British India. Their defeat at Kohima and Imphal — with Indian troops fighting on both sides — was the turning point that ended Japan's westward advance.",outcome:"decisive"},
  {yr:"1962 CE",period:"Modern",name:"Sino-Indian War",sig:"China's coordinated attack along the Himalayan frontier humiliated India's unprepared army. Nehru's personal devastation was visible. The defeat ended the Nehru era's idealism and forced a complete rethinking of India's military and foreign policy.",outcome:"defeat"},
  {yr:"1971 CE",period:"Modern",name:"Bangladesh Liberation War",sig:"India's decisive intervention in the East Pakistan civil war produced the largest military surrender since World War II — 93,000 Pakistani troops. Bangladesh was born. Indira Gandhi's political stature reached its peak.",outcome:"decisive"},
  {yr:"1469 BCE",period:"Itihasa (Epic)",name:"Kurukshetra War",sig:"The eighteen-day war between the Pandavas and Kauravas described in the Mahabharata — traditionally dated by some astronomical calculations to around 3067 BCE, though scholars debate historicity. It frames the entire moral and philosophical architecture of the epic, including the Bhagavad Gita.",outcome:"decisive"},
  {yr:"304 BCE",period:"Mauryan",name:"Seleucid–Mauryan War",sig:"Chandragupta Maurya's confrontation with Seleucus I Nicator, one of Alexander's successors, ended in a treaty that ceded vast Hellenic territories (modern Afghanistan and Baluchistan) to the Mauryan Empire in exchange for 500 war elephants — elephants Seleucus then used to win the decisive Battle of Ipsus in 301 BCE.",outcome:"decisive"},
  {yr:"1004 CE",period:"Medieval South",name:"Rajendra Chola's Naval Campaigns",sig:"The Chola navy under Rajendra Chola I projected power across the Bay of Bengal, conquering parts of Srivijaya (modern Indonesia/Malaysia) — among the only instances of a pre-modern Indian state running a true overseas naval empire.",outcome:"decisive"},
  {yr:"1565 CE",period:"Mughal",name:"Siege of Chittorgarh (1567–68)",sig:"Akbar's brutal siege of the Rajput fortress at Chittorgarh ended in mass jauhar (self-immolation) by the women of the fort and a final suicidal charge (saka) by the remaining defenders — a defeat still memorialized as one of Rajput history's most tragic acts of defiance.",outcome:"defeat"},
  {yr:"1737–1738 CE",period:"Maratha",name:"Battle of Delhi & Bhopal",sig:"The Marathas under Baji Rao I routed Mughal-allied forces near Delhi and Bhopal, demonstrating Maratha cavalry's reach into the imperial heartland and accelerating the Mughal Empire's long decline into a shell of its former self.",outcome:"decisive"},
  {yr:"1780–1784 CE",period:"Colonial",name:"Second Anglo-Mysore War",sig:"Hyder Ali and later Tipu Sultan inflicted some of the East India Company's worst defeats of the 18th century, including the destruction of an entire British army at Pollilur in 1780 — briefly the Company's most catastrophic loss in India before Plassey-era gains were reversed.",outcome:"stalemate"},
  {yr:"1965 CE",period:"Modern",name:"Indo-Pakistani War of 1965",sig:"Fought largely over Kashmir, this war saw some of the largest tank battles since World War II at Asal Uttar and Chawinda. The Tashkent Agreement ended hostilities without major territorial change, but cemented Kashmir as the central flashpoint of South Asian geopolitics.",outcome:"stalemate"},
  {yr:"1509 CE",period:"Vijayanagara",name:"Battle of Diwani",sig:"Krishnadevaraya's forces crushed the Bijapur Sultanate near the start of his reign, killing the sultan Yusuf Adil Khan and securing the Raichur Doab — the opening triumph of a reign that would make Vijayanagara the dominant power of the entire Deccan.",outcome:"decisive"},
  {yr:"1565 CE",period:"Colonial Naval",name:"Battle of Diu (1509)",sig:"A Portuguese fleet under Francisco de Almeida annihilated a combined Mamluk-Gujarat-Calicut armada off the coast of Diu, securing Portuguese naval supremacy in the Indian Ocean for a century and opening the long era of European maritime dominance over Indian trade.",outcome:"decisive"},
  {yr:"1741 CE",period:"Colonial Naval",name:"Battle of Colachel",sig:"The Travancore kingdom under Marthanda Varma inflicted a rare and total defeat on the Dutch East India Company's navy — the first time an Asian power decisively defeated a European colonial force at sea, ending serious Dutch ambitions on India's southwest coast.",outcome:"decisive"},
  {yr:"1760 CE",period:"Colonial",name:"Battle of Wandiwash",sig:"British forces under Eyre Coote crushed the French at Wandiwash in the Carnatic Wars, effectively ending French ambitions to rival Britain for control of India and clearing the way for unchallenged East India Company expansion in the south.",outcome:"decisive"},
  {yr:"1739 CE",period:"Mughal",name:"Battle of Karnal",sig:"Nader Shah of Persia annihilated a vastly larger Mughal army in barely three hours, then sacked Delhi and carried off the Peacock Throne and the Koh-i-Noor diamond — a humiliation that exposed the Mughal Empire's terminal military decline to the world.",outcome:"decisive"},
  {yr:"1817–1818 CE",period:"Colonial",name:"Third Anglo-Maratha War",sig:"The East India Company's decisive defeat of the Peshwa Baji Rao II's forces ended the Maratha Confederacy as an independent power and left the Company the unchallenged paramount authority across most of the Indian subcontinent.",outcome:"decisive"},
  {yr:"1897 CE",period:"Colonial Frontier",name:"Battle of Saragarhi",sig:"Twenty-one soldiers of the 36th Sikh Regiment held a remote signal post against an estimated 10,000 Afghan tribesmen, fighting to the last man rather than surrender — a stand UNESCO later recognized among history's great last stands of collective bravery.",outcome:"defeat"},
  {yr:"1971 CE",period:"Modern Naval",name:"Operation Trident — Attack on Karachi",sig:"The Indian Navy's missile-boat strike on Karachi harbor during the 1971 war sank multiple Pakistani vessels and set fuel depots ablaze, marking the first use of anti-ship missiles in combat in the region and securing Indian naval dominance for the rest of the war.",outcome:"decisive"},
  {yr:"1999 CE",period:"Modern",name:"Kargil War",sig:"Indian forces fought to dislodge Pakistani soldiers and militants who had covertly occupied high-altitude posts in Kargil, Kashmir. Fierce battles at peaks like Tiger Hill, fought above 16,000 feet, ended in an Indian recapture of the heights and a tense return to the pre-conflict line.",outcome:"decisive"},
  {yr:"993 CE",period:"Chola",name:"Chola Conquest of Anuradhapura",sig:"Rajaraja Chola I's naval invasion sacked Anuradhapura, the millennium-old Sinhalese capital, ending its ancient era. His son Rajendra Chola I completed the conquest by 1017, making Sri Lanka a Chola province for nearly eight decades — the high point of Indian naval power projecting beyond the subcontinent.",outcome:"decisive"},
  {yr:"1191 CE",period:"Sultanate",name:"First Battle of Tarain (Prithviraj's Victory)",sig:"Prithviraj Chauhan repelled Muhammad of Ghor's first invasion attempt near Tarain, wounding the Sultan and forcing his retreat. The victory bought Delhi barely a year's reprieve — Ghor returned better prepared in 1192 for the decisive rematch.",outcome:"decisive"},
  {yr:"1564 CE",period:"Mughal",name:"Battle of Garha (Mughal Conquest of Gondwana)",sig:"Akbar's general Asaf Khan invaded the kingdom of Garha-Katanga, where the widowed Rani Durgavati personally led her army into battle. Wounded twice, she took her own life rather than be captured — the Mughals annexed her kingdom soon after.",outcome:"defeat"},
  {yr:"1739 CE",period:"Maratha",name:"Battle of Vasai (Bassein)",sig:"The Marathas under Chimaji Appa besieged and captured the Portuguese fort of Vasai near Bombay after a grueling campaign, ending over two centuries of Portuguese control over the northern Konkan coast and marking a high point of Maratha naval ambition.",outcome:"decisive"},
  {yr:"1564 CE",period:"Vijayanagara",name:"Aftermath of Talikota — Fall of Vijayanagara City",sig:"In the months following the catastrophic defeat at Talikota, the Deccan Sultanates' armies marched into the undefended Vijayanagara capital and sacked it over several months, reducing one of the largest cities in the world at the time to permanent ruin — modern Hampi.",outcome:"defeat"},
  {yr:"1818 CE",period:"Colonial",name:"Battle of Koregaon",sig:"A small East India Company force, including soldiers from the Mahar community, held off a much larger Peshwa army at Koregaon Bhima during the Third Anglo-Maratha War. The battle is commemorated annually at the Koregaon Bhima memorial, especially significant to Dalit communities.",outcome:"decisive"},
  {yr:"1631 CE",period:"Mughal",name:"Sack of Bhalki and the Bundela Wars",sig:"Mughal campaigns under Shah Jahan against the Bundela Rajput chieftain Jhujhar Singh exemplified the recurring friction between the empire and Rajput chieftains who resisted full integration — a pattern repeated across Mughal history far beyond the famous Rajput alliances.",outcome:"decisive"},
  {yr:"1564 CE",period:"Rajput",name:"Siege of Merta",sig:"A lesser-known but strategically important Mughal campaign in Rajasthan that secured Akbar's control over the crucial Merta fort, smoothing the path for the empire's broader absorption of Rajput territories that followed over the next two decades.",outcome:"decisive"},
];

function initBattleScroll(){
  const el=document.getElementById('battleScroll');
  if(!el)return;
  el.innerHTML=BATTLES.map(b=>`
    <div class="battle-entry" data-query="${escH(b.name)}" title="Click to search this battle">
      <div class="battle-year-col">
        <div class="battle-yr">${escH(b.yr)}</div>
        <div class="battle-period">${escH(b.period)}</div>
        <div class="battle-outcome-tag ${b.outcome}">${b.outcome==='decisive'?'Decisive':b.outcome==='stalemate'?'Stalemate':'Indian Defeat'}</div>
      </div>
      <div class="battle-info">
        <h4>${escH(b.name)}</h4>
        <div class="battle-sig">${escH(b.sig)}</div>
      </div>
    </div>
  `).join('');
  el.querySelectorAll('.battle-entry').forEach(entry=>{
    entry.addEventListener('click',()=>{
      const q=entry.dataset.query;
      if(q){
        selectMode('topic');
        if(typeof queryInput!=='undefined'){queryInput.value=q;runQuery(q);}
        document.getElementById('gateway-sec')?.scrollIntoView({behavior:'smooth'});
      }
    });
  });
  buildSearchMoreTile(el,{label:"Search More Battles",hint:"40 battles barely scratch the surface of Indian military history. Search for any battle not listed here.",placeholder:"e.g. Battle of Assaye, Siege of Bharatpur…",extraClass:"tile-inline"});
}

/* ── MILITARY OPERATIONS DATA (1947–present) ──
   Spans every major force, not just the Army: Army, Navy, Air Force, Para SF, MARCOS,
   Garud, NSG, BSF, CRPF, ITBP, Assam Rifles, Coast Guard, and city/state police forces —
   e.g. Delhi Police's Special Cell at Batla House. Filterable by branch via opsFilterRow. */
const OPERATIONS=[
  {yr:"1948",name:"Operation Polo",branch:"Army",codename:"\u201cPolice Action\u201d",summary:"India's military annexation of the princely state of Hyderabad after the Nizam refused to accede to the Union and Razakar militias spread violence. Major General J.N. Chaudhuri's forces defeated the Nizam's army in five days, ending the last major holdout against integration.",outcome:"success"},
  {yr:"1961",name:"Operation Vijay (Goa)",branch:"Tri-Services",codename:"Liberation of Goa",summary:"A coordinated Army, Navy and Air Force assault ended 451 years of Portuguese colonial rule over Goa, Daman and Diu in roughly 36 hours. Portugal's governor surrendered on 19 December 1961, and the territories were integrated into the Indian Union.",outcome:"success"},
  {yr:"1971",name:"Operation Trident",branch:"Navy",codename:"Naval strike on Karachi",summary:"The Indian Navy's Western Fleet launched a night assault on Karachi harbour during the Bangladesh Liberation War, sinking Pakistani vessels and setting fuel reserves ablaze. The first such offensive Indian naval strike of its kind is commemorated every year as Navy Day, 4 December.",outcome:"success"},
  {yr:"1971",name:"Battle of Longewala",branch:"BSF",codename:"BSF & Army desert stand, Rajasthan",summary:"A small BSF and Army post of roughly 120 men at Longewala, in the Jaisalmer desert, held off a Pakistani armoured column of over 2,000 troops and 40+ tanks through the night, buying time for IAF Hunter jets to arrive at dawn and destroy the column at first light. One of the most studied last-stands of the 1971 war.",outcome:"success"},
  {yr:"1984",name:"Operation Meghdoot",branch:"Army & Air Force",codename:"Siachen Glacier",summary:"India's pre-emptive seizure of the Siachen Glacier and the Saltoro Ridge, launched after intelligence suggested Pakistan planned to occupy the same high passes. Fought above 20,000 feet, it remains the highest-altitude military operation in history, and India has held the glacier ever since.",outcome:"success"},
  {yr:"1984",name:"Operation Blue Star",branch:"Army & BSF",codename:"Golden Temple, Amritsar",summary:"A controversial assault, with Army units leading and BSF columns cordoning the perimeter, to remove militant leader Jarnail Singh Bhindranwale and armed followers from the Golden Temple complex. Official figures cite roughly 83 soldiers and 492 civilians/militants killed; independent and Sikh-community estimates run far higher, into the thousands — the death toll remains disputed to this day. The operation triggered the assassination of PM Indira Gandhi months later and a decade of insurgency in Punjab.",outcome:"contested"},
  {yr:"1987–90",name:"Operation Pawan",branch:"Army (IPKF)",codename:"Indian Peace Keeping Force, Sri Lanka",summary:"Indian troops deployed under the Indo-Sri Lanka Accord to disarm the LTTE and enforce a ceasefire. What began as a peacekeeping mission escalated into urban combat in Jaffna; the force grew from 5,000 to over 100,000 troops and suffered more than 1,100 fatalities before full withdrawal in 1990 amid mounting political pressure.",outcome:"mixed"},
  {yr:"1988",name:"Operation Cactus",branch:"Para SF",codename:"Maldives intervention",summary:"A rapid airlift of 6 Para and Indian paratroopers to Malé within hours of a coup attempt against President Maumoon Abdul Gayoom. Indian forces secured key installations and restored the government before the mercenaries could consolidate control — a textbook rapid-response operation praised internationally.",outcome:"success"},
  {yr:"1999",name:"Operation Vijay (Kargil)",branch:"Army & Air Force",codename:"Kargil War",summary:"India's response to Pakistani forces covertly occupying high-altitude posts above the Line of Control near Kargil. Infantry assaults at over 16,000 feet recaptured Tololing and Tiger Hill after weeks of fighting and over a million artillery shells fired; India cleared the ridgelines without crossing the LoC, at a cost of 527 soldiers' lives.",outcome:"success"},
  {yr:"2001",name:"Operation Parakram",branch:"Tri-Services",codename:"Post-Parliament-attack mobilisation",summary:"India's largest peacetime mobilisation, launched after the December 2001 terror attack on Parliament House, massed nearly a million troops along the Pakistan border for almost a year. No war was fought, but the standoff reshaped Indian military doctrine on rapid mobilisation, leading directly to the later 'Cold Start' strategic rethink.",outcome:"mixed"},
  {yr:"2003",name:"Operation Sarp Vinash",branch:"Army",codename:"Pir Panjal anti-militancy sweep",summary:"A major Army offensive to clear entrenched militant hideouts from the Hilkaka forest area of the Pir Panjal range in Poonch-Surankote, Jammu & Kashmir, destroying an extensive network of bunkers and supply caches built up over years — one of the largest counter-insurgency search operations of its era.",outcome:"success"},
  {yr:"2003",name:"Hideout raid on Ghazi Baba",branch:"BSF",codename:"Srinagar — killing of the 2001 Parliament-attack mastermind",summary:"Acting on a tip-off, BSF personnel raided a hideout in Srinagar and killed Ghazi Baba, the Jaish-e-Mohammed commander identified as the mastermind of the December 2001 Indian Parliament attack, along with his deputy — one of the BSF's most significant counter-terrorism successes in Kashmir.",outcome:"success"},
  {yr:"2008",name:"Batla House Encounter",branch:"Police (Delhi Police Special Cell)",codename:"Jamia Nagar, Delhi — Indian Mujahideen module",summary:"Days after the September 2008 Delhi serial blasts, a seven-officer team from Delhi Police's Special Cell, led by Inspector Mohan Chand Sharma, raided a flat in Batla House, Jamia Nagar, after intelligence linked it to the bombings. A gunfight killed two Indian Mujahideen operatives and fatally wounded Sharma; others were arrested or escaped. The operation remains one of the most politically and legally contested encounters in Indian policing history, with allegations of a staged shootout that courts have repeatedly examined.",outcome:"contested"},
  {yr:"2008",name:"Operation Black Tornado",branch:"NSG",codename:"26/11 Mumbai response",summary:"The National Security Guard's commando assault to end the three-day siege of the Taj and Oberoi hotels and Nariman House during the 2008 Mumbai terror attacks. Nine of the ten attackers were killed and Ajmal Kasab captured alive — the only attacker to survive and face trial.",outcome:"mixed"},
  {yr:"2009",name:"Operation Green Hunt",branch:"CRPF",codename:"Anti-Naxal offensive, Red Corridor",summary:"A large, multi-state CRPF-led offensive against Maoist (Naxalite) insurgents across Chhattisgarh, Jharkhand, Odisha and neighbouring states, combining cordon-and-search operations with development outreach. The campaign drew sustained criticism over civilian displacement and human-rights concerns even as it degraded several Naxal strongholds over the following decade.",outcome:"mixed"},
  {yr:"2000",name:"Operation Khukri",branch:"Para SF (UN Peacekeeping)",codename:"Sierra Leone rescue",summary:"Indian peacekeepers of the 5/8 Gorkha Rifles were besieged for over 75 days by RUF rebels in Sierra Leone during a UN mission. 2 Para SF, heli-inserted behind rebel lines, broke the siege within 24 hours and extracted all 233 soldiers with only one Indian fatality — still studied as one of the most successful peacekeeping rescue missions in UN history.",outcome:"success"},
  {yr:"2025",name:"Operation Sindoor",branch:"Tri-Services",codename:"Cross-border strikes on Pakistan",summary:"India's response to the April 2025 Pahalgam terror attack that killed 26 civilians. Missile and air strikes hit nine terror-linked sites across Pakistan and Pakistan-administered Kashmir — the first strikes on Pakistan's Punjab heartland since 1971 — triggering a brief but intense aerial standoff before a ceasefire was reached within days.",outcome:"contested"},
  {yr:"2016",name:"2016 Surgical Strikes",branch:"Para SF",codename:"Cross-LoC raids on terror launchpads",summary:"Roughly ten days after the Uri attack, teams of 4 Para SF (\"Daggers\") and 9 Para SF (\"Pirates\") crossed the Line of Control at night from the Kupwara and Poonch sectors to destroy several militant launchpads. India released drone and thermal-imaging footage afterward; Pakistan disputed that any \"surgical strike\" occurred, calling it routine cross-border firing — leaving the scale of damage a matter of continuing dispute.",outcome:"contested"},
  {yr:"2019",name:"Operation Bandar (Balakot Airstrike)",branch:"Air Force",codename:"Strike on Jaish-e-Mohammed camp",summary:"India's retaliation for the Pulwama terror attack, sending Mirage 2000 jets across the Line of Control to strike an alleged militant training camp near Balakot, Pakistan — the first such cross-border airstrike since 1971. India claimed a large number of militants killed; independent satellite analysis found no clear evidence of damage to the target site, making the strike's actual impact a matter of continuing dispute.",outcome:"contested"},
  {yr:"2020",name:"Galwan Valley Clash",branch:"Army & ITBP",codename:"Ladakh — LAC standoff turns violent",summary:"A brutal, largely weapons-free hand-to-hand clash between Indian and Chinese troops in the Galwan Valley, Ladakh — the deadliest India-China border confrontation in over four decades. Twenty Indian soldiers were killed; China's losses were acknowledged only much later and remain disputed. The Indo-Tibetan Border Police, which has guarded this stretch of the LAC for decades, supported Army units in the area.",outcome:"contested"},
  {yr:"2021",name:"Operation Devi Shakti",branch:"Air Force",codename:"Afghanistan evacuation",summary:"As Kabul fell to the Taliban in August 2021, Indian Air Force C-17 transport aircraft flew repeated sorties to evacuate Indian citizens, embassy staff, and at-risk Afghan Sikhs and Hindus, airlifting over 800 people to safety amid one of the most chaotic withdrawals in recent military history.",outcome:"success"},
  {yr:"2022",name:"Operation Ganga",branch:"Tri-Services / Civil Aviation",codename:"Ukraine evacuation",summary:"As Russia's invasion of Ukraine began in February 2022, India coordinated a large-scale evacuation of over 20,000 Indian students and citizens stranded in Ukraine, using military transport aircraft and chartered flights routed through neighbouring countries like Poland, Romania, Hungary and Slovakia to reach those who had crossed overland.",outcome:"success"},
  {yr:"2002",name:"Operation Geo / Akshay",branch:"MARCOS (Navy)",codename:"Wular Lake counter-insurgency, Kashmir",summary:"The Navy's Marine Commando Force (MARCOS) was deployed on Kashmir's Wular Lake to interdict militant infiltration and arms smuggling across the water — an unusual inland deployment for a force normally associated with maritime special operations, reflecting MARCOS's broader counter-insurgency role in the Valley through the 2000s.",outcome:"success"},
  {yr:"1999",name:"Operation Safed Sagar",branch:"Air Force",codename:"Kargil air campaign",summary:"The Indian Air Force's air component of the Kargil War, flying high-altitude bombing and close air support missions — including the first operational use of laser-guided bombs by the IAF — to dislodge entrenched Pakistani positions above 16,000 feet, working in close coordination with Army ground assaults.",outcome:"success"},
  {yr:"2015",name:"Operation Raahat",branch:"Navy & Air Force",codename:"Yemen evacuation",summary:"As civil war engulfed Yemen, Indian Navy ships and Air Force C-17s evacuated over 4,000 Indian nationals and several thousand foreign nationals from Aden and Sana'a, conducted under fire and amid an active blockade — one of the largest civilian evacuations from an active warzone in recent Indian military history.",outcome:"success"},
];
function initOpsGrid(){
  const el=document.getElementById('opsGrid');
  const filterRow=document.getElementById('opsFilterRow');
  if(!el)return;
  const outcomeLabel={success:"Mission Success",mixed:"Mixed Outcome",contested:"Contested / Disputed"};
  // Branch families used purely for the filter chips — a card's actual branch tag can name
  // multiple forces (e.g. "Army & ITBP"), so filtering checks for a substring match.
  const BRANCH_FILTERS=["All Forces","Army","Navy","Air Force","Para SF","NSG","BSF","CRPF","ITBP","Police","Tri-Services"];
  let activeBranch="All Forces";
  function renderFilters(){
    if(!filterRow)return;
    filterRow.innerHTML=BRANCH_FILTERS.map(b=>`<button type="button" class="ops-filter-chip${b===activeBranch?' active':''}" data-branch="${escH(b)}">${escH(b)}</button>`).join('');
    filterRow.querySelectorAll('.ops-filter-chip').forEach(chip=>{
      chip.addEventListener('click',()=>{ activeBranch=chip.dataset.branch; renderFilters(); renderCards(); });
    });
  }
  function renderCards(){
    const filtered=activeBranch==='All Forces'?OPERATIONS:OPERATIONS.filter(o=>o.branch.toLowerCase().includes(activeBranch.toLowerCase()));
    el.innerHTML=(filtered.length?filtered.map(o=>`
      <div class="op-card" data-query="${escH(o.name)}" title="Click to explore ${escH(o.name)} in depth">
        <div class="op-top-row">
          <span class="op-year-tag">${escH(o.yr)}</span>
          <span class="op-branch-tag">${escH(o.branch)}</span>
        </div>
        <div>
          <div class="op-name">${escH(o.name)}</div>
          <div class="op-codename">${escH(o.codename)}</div>
        </div>
        <div class="op-summary">${escH(o.summary)}</div>
        <div class="op-outcome-strip">
          <span class="op-outcome-tag ${o.outcome}">${outcomeLabel[o.outcome]}</span>
          <span class="op-readmore">Explore →</span>
        </div>
      </div>
    `).join(''):'<div class="ops-empty">No featured operations for that force yet — try Search More below.</div>')+`
      <div class="op-surprise-card" id="opSurpriseCard" title="Discover a random Indian military operation">
        <div class="op-surprise-icon">🎲</div>
        <div class="op-surprise-title">Surprise Me With an Operation</div>
        <div class="op-surprise-desc">Any operation any Indian force has carried out — Army, Navy, Air Force, BSF, NSG, Para SF, CRPF, ITBP, police, or more. Background, consequences, importance, dates — answered in depth.</div>
        <span class="op-surprise-pill">Random Operation</span>
      </div>
    `;
    el.querySelectorAll('.op-card').forEach(card=>{
      card.addEventListener('click',()=>{
        const q=card.dataset.query;
        if(q){
          selectMode('topic');
          if(typeof queryInput!=='undefined'){queryInput.value=q;}
          document.getElementById('gateway-sec')?.scrollIntoView({behavior:'smooth',block:'start'});
          setTimeout(()=>runQuery(q,q),350);
        }
      });
    });
    const surpriseCard=document.getElementById('opSurpriseCard');
    if(surpriseCard)surpriseCard.addEventListener('click',()=>{
      const pool=OPERATIONS_SURPRISE_POOL;
      const pick=pool[Math.floor(Math.random()*pool.length)];
      selectMode('topic');
      if(typeof queryInput!=='undefined'){queryInput.value=pick;}
      document.getElementById('gateway-sec')?.scrollIntoView({behavior:'smooth',block:'start'});
      setTimeout(()=>runQuery(pick,pick),350);
    });
    buildSearchMoreTile(el,{label:"Search More Operations",hint:"BSF, Navy, Air Force, NSG, Para SF, CRPF, ITBP, Assam Rifles, Coast Guard, state and city police — search for any operation not featured above.",placeholder:"e.g. Operation Vajra Shakti, Hyderabad Police anti-Naxal raid…"});
  }
  renderFilters();
  renderCards();
}
/* Wider pool for "Surprise Me" — includes the featured ops plus many more operations
   spanning every force: wars, internal security, counter-terrorism, peacekeeping,
   disaster relief and evacuations, so the random pick can genuinely surface something
   the visitor has likely never heard of. */
const OPERATIONS_SURPRISE_POOL=[
  "Operation Polo","Operation Vijay 1961","Operation Trident 1971 Indian Navy","Operation Python 1971",
  "Operation Meghdoot","Operation Blue Star","Operation Woodrose","Operation Pawan Sri Lanka",
  "Operation Cactus Maldives 1988","Operation Vijay Kargil 1999","Operation Safed Sagar",
  "Operation Parakram","Operation Black Tornado","Operation Rahat 2013 Uttarakhand",
  "Operation Maitri Nepal earthquake","Operation Raahat Yemen evacuation 2015",
  "Surgical strikes 2016 India","Operation Sunder Yemen","Operation Sankat Mochan South Sudan",
  "Operation Insaniyat Rohingya","Operation Bandar Balakot airstrike","Operation Ganga Ukraine evacuation",
  "Operation Sindoor","Operation Rhino Assam","Operation All Out Kashmir","Operation Steeplechase 1971",
  "Operation Cactus Lily 1971","Operation Madhumati","Operation Chequerboard","Operation Falcon 1987",
  "Operation Trishul Sri Lanka","Operation Checkmate Sri Lanka","Siachen conflict Operation Rajiv",
  "Operation Sukoon Lebanon evacuation 2006","Operation Castor tsunami relief","Operation Nistar Socotra",
  "Operation Khukri Sierra Leone 2000","Operation Devi Shakti Afghanistan evacuation 2021",
  "Battle of Longewala BSF 1971","Batla House encounter Delhi Police","Ghazi Baba BSF raid Srinagar",
  "Operation Green Hunt CRPF Naxal","Operation Sarp Vinash Pir Panjal","Galwan Valley clash ITBP",
  "Operation Geo Akshay MARCOS Wular Lake","Hyderabad Police Cyberabad encounter","Mumbai Police anti-gangster operations",
  "Punjab Police Operation Black Thunder","Assam Rifles counter-insurgency Nagaland","Indian Coast Guard anti-piracy operations",
  "Garud Commando Force Air Force operations","CISF airport security operations","ITBP Sino-Indian border patrol operations",
];



/* ── SCIENCE & MATH DATA ── */
const SCIENCE_CONTRIBUTIONS=[
  {icon:"0️⃣",person:"Brahmagupta",period:"598–668 CE",contribution:"First to formally define zero as a number with its own arithmetic rules. His Brahmasphutasiddhanta (628 CE) contains the earliest known treatment of zero in division and multiplication — the foundation of all modern computing.",fact:"Without this, the binary system and computers don't exist."},
  {icon:"🔭",person:"Aryabhata",period:"476–550 CE",contribution:"Calculated Earth's circumference at 39,968 km (actual: 40,075 km). Proposed Earth rotates on its axis daily. Computed pi as 3.1416. Gave the earliest known algorithm for computing sine tables.",fact:"A thousand years before Copernicus made the same argument in Europe."},
  {icon:"🔺",person:"Madhava of Sangamagrama",period:"c.1350–1425 CE",contribution:"Discovered infinite series for pi and trigonometric functions — anticipating Gregory, Leibniz, and Newton by over 200 years. His Kerala school of mathematics laid foundations of calculus.",fact:"The 'Madhava–Leibniz series' for pi was Indian first."},
  {icon:"🩺",person:"Sushruta",period:"c.600 BCE",contribution:"Father of surgery. Described 300+ surgical procedures, 120 surgical instruments, and classification of wounds in the Sushruta Samhita. Performed cataract surgery, rhinoplasty (nose reconstruction), and Caesarean sections.",fact:"His rhinoplasty technique was adopted by British surgeons in the 18th century."},
  {icon:"💊",person:"Charaka",period:"c.100 CE",contribution:"Charaka Samhita codified 340 plant-based medicines, described the cardiovascular system, identified the brain as the seat of intelligence, and articulated the principle of patient-centred care. Studied at Takshashila.",fact:"The Charaka Samhita is still referenced in Ayurvedic practice today."},
  {icon:"⚛️",person:"Kanada",period:"c.600 BCE",contribution:"Proposed the atomic theory of matter in the Vaisheshika Sutras — that all matter is made of invisible, indestructible particles called 'parmanu'. Predated Democritus by roughly two centuries.",fact:"His atomic concept is strikingly close to modern atomic theory in its broad strokes."},
  {icon:"📐",person:"Baudhāyana",period:"c.800 BCE",contribution:"Stated the Pythagorean theorem in the Baudhayana Sutras — centuries before Pythagoras. Also gave approximations for √2 accurate to 5 decimal places, and described geometric algebra.",fact:"The Pythagorean theorem should arguably be called the Baudhayana theorem."},
  {icon:"🌍",person:"Varahamihira",period:"505–587 CE",contribution:"Encyclopaedist of science. Compiled Greek, Egyptian and Indian astronomy. Correctly stated that the moon and planets reflect sunlight. Contributed to trigonometry, astrology, geophysics, and botany in the Panchasiddhantika.",fact:"He also described hydrology principles for finding underground water."},
  {icon:"⚗️",person:"Nagarjuna (Alchemist)",period:"c.10th–11th century CE",contribution:"A separate tradition from the Buddhist philosopher, this Nagarjuna's Rasaratnakara details mercury-based alchemical and metallurgical processes — early Indian chemistry covering distillation, calcination, and the preparation of medicinal compounds from metals.",fact:"Indian alchemical texts influenced later Arabic and European alchemy traditions."},
  {icon:"🧮",person:"Bhāskara II (Bhaskaracharya)",period:"1114–1185 CE",contribution:"His Lilavati and Bijaganita gave systematic treatments of arithmetic, algebra and what amounts to early differential calculus concepts — including a clear statement that dividing by zero produces infinity. The Siddhanta Shiromani also calculated the length of the sidereal year to within seconds of the modern value.",fact:"He understood the derivative of sine roughly 500 years before Newton and Leibniz."},
  {icon:"🏗️",person:"Indus Valley Engineers",period:"c.2600–1900 BCE",contribution:"Harappan cities like Mohenjo-daro and Dholavira had the world's first known urban sanitation systems — covered drains, standardized fired bricks, and sophisticated water reservoirs — centuries before comparable Roman engineering.",fact:"Dholavira's water conservation system rivals modern reservoir engineering in its precision."},
  {icon:"🧵",person:"Ancient Indian Metallurgists",period:"c.300 CE onward",contribution:"The Iron Pillar of Delhi, cast around 400 CE, has resisted rust for over 1,600 years due to a unique phosphorus-rich protective layer — a metallurgical feat not fully replicated until modern stainless steel. Wootz steel from South India was exported across the ancient world and became the raw material for legendary Damascus blades.",fact:"Wootz steel technology was so prized that Roman writers specifically mention 'Indian steel.'"},
  {icon:"🛰️",person:"Yativrishabha & Jain Cosmologists",period:"c.6th century CE",contribution:"Jain cosmological texts proposed an inconceivably vast, cyclical, beginningless and endless universe, with detailed mathematical schemes for measuring time across scales from instants (samaya) to cosmic eons (kalpa) — among the most ambitious pre-modern attempts to formalize deep time.",fact:"Some Jain numerical concepts for very large and very small numbers anticipate ideas used in later mathematics."},
  {icon:"🔢",person:"Srinivasa Ramanujan",period:"1887–1920 CE",contribution:"A self-taught mathematician from Tamil Nadu who, with almost no formal training, produced thousands of original results in number theory, infinite series, and modular forms. His notebooks, sent unsolicited to Cambridge mathematician G.H. Hardy, contained theorems so startling that Hardy said they 'must be true, because, if they were not true, no one would have had the imagination to invent them.'",fact:"Ramanujan's 'lost notebook,' rediscovered in 1976, is still yielding new mathematical insights used in physics today."},
  {icon:"🔬",person:"Sir C.V. Raman",period:"1888–1970 CE",contribution:"Discovered that light changes wavelength when it scatters through a transparent medium — the 'Raman Effect' — using little more than sunlight, a prism, and his own eye. The discovery won him the 1930 Nobel Prize in Physics, making him the first Asian to win a Nobel in science.",fact:"He made the discovery on a budget so small that colleagues later marveled it was achieved almost entirely with improvised equipment."},
  {icon:"🌿",person:"Sir Jagadish Chandra Bose",period:"1858–1937 CE",contribution:"Pioneered millimetre-wave radio research years before Marconi's famous transmissions, and later turned to plant physiology, inventing the crescograph to prove that plants respond to stimuli with measurable, electrical signals much like animal nervous tissue.",fact:"Bose refused to patent his radio research, believing scientific knowledge should remain free for all of humanity."},
  {icon:"⭐",person:"Subrahmanyan Chandrasekhar",period:"1910–1995 CE",contribution:"Calculated, as a 20-year-old on a ship from India to England, the precise mass limit beyond which a dying star must collapse into a neutron star or black hole rather than a white dwarf — the 'Chandrasekhar limit,' which won him the 1983 Nobel Prize in Physics decades later.",fact:"His revolutionary idea was initially mocked by his own mentor, Sir Arthur Eddington, at a Royal Astronomical Society meeting in 1935."},
  {icon:"☢️",person:"Homi J. Bhabha",period:"1909–1966 CE",contribution:"Founded the Tata Institute of Fundamental Research and later the Atomic Energy Establishment (now BARC), single-handedly architecting India's nuclear research program from near-zero infrastructure in the years immediately after Independence.",fact:"Bhabha personally recruited much of India's first generation of nuclear scientists, often funding early research out of Tata family philanthropic grants."},
  {icon:"🚀",person:"Vikram Sarabhai",period:"1919–1971 CE",contribution:"Founded the Indian Space Research Organisation (ISRO) in 1969, convincing a newly independent and resource-poor nation to invest in space technology for practical ends — communications, weather forecasting, and resource mapping — rather than prestige alone.",fact:"India's first rocket launch in 1963 used a church in Thumba, Kerala, as a temporary laboratory because no other suitable building existed nearby."},
  {icon:"🧮",person:"Brahmagupta's Zero",period:"628 CE",contribution:"Brahmagupta was the first mathematician known to treat zero as a number in its own right with defined arithmetic rules — including rules for addition and subtraction with zero — rather than merely a placeholder, in his treatise Brahmasphutasiddhanta.",fact:"His rule that 'a debt subtracted from zero is a fortune' is among the earliest known formal treatments of negative numbers anywhere in the world."},
  {icon:"⚙️",person:"Mokshagundam Visvesvaraya",period:"1860–1962 CE",contribution:"A civil engineer whose flood-protection and irrigation systems, including the automatic sluice gate design for dams, were so effective they were adopted across India and internationally. As Diwan of Mysore he drove rapid industrialization, education, and infrastructure reform.",fact:"His birthday, 15 September, is observed across India as Engineer's Day."},
  {icon:"⭐",person:"Meghnad Saha",period:"1893–1956 CE",contribution:"Formulated the Saha ionization equation in 1920, the first theory to explain why different stars show different spectral lines purely in terms of temperature and pressure — a foundational breakthrough that effectively let astronomers 'measure the temperature of stars' from Earth, and that still underlies modern stellar astrophysics.",fact:"Working largely in isolation at Calcutta University with no formal research supervisor, Saha's equation has been called Nobel-Prize-class work by later physicists, though he never received the award himself."},
  {icon:"🦜",person:"Salim Ali",period:"1896–1987 CE",contribution:"Often called the 'Birdman of India,' Ali conducted systematic ornithological surveys across the subcontinent over six decades, authoring the landmark 'Book of Indian Birds' and helping found the Bombay Natural History Society's modern research programs, fundamentally shaping Indian wildlife conservation policy.",fact:"His surveys directly led to the protection of critical habitats like Bharatpur's Keoladeo National Park, now a UNESCO World Heritage Site."},
  {icon:"🌿",person:"Birbal Sahni",period:"1891–1949 CE",contribution:"Founder of paleobotany in India, Sahni's fossil studies of ancient Indian plants reshaped understanding of the subcontinent's deep geological and botanical history, including the discovery of fossil genera now named in his honour. He founded the Birbal Sahni Institute of Palaeobotany in Lucknow.",fact:"He personally funded part of the Institute's founding, donating his own savings to ensure its survival in newly independent India."},
  {icon:"⚛️",person:"E.C. George Sudarshan",period:"1931–2018 CE",contribution:"A theoretical physicist whose work on quantum optics (the Glauber–Sudarshan representation) and tachyons reshaped quantum field theory. Many physicists consider his repeated exclusion from the Nobel Prize — despite Roy Glauber winning it in 2005 for closely related work — one of the most debated omissions in the prize's history.",fact:"Sudarshan also proposed the V−A theory of weak interactions, foundational to the Standard Model of particle physics, years before it became widely credited to other physicists."},
];

function initScienceGrid(){
  const el=document.getElementById('scienceGrid');
  if(!el)return;
  el.innerHTML=SCIENCE_CONTRIBUTIONS.map(s=>`
    <div class="sci-card">
      <div class="sci-icon">${s.icon}</div>
      <div class="sci-person">${escH(s.person)}</div>
      <div class="sci-period">${escH(s.period)}</div>
      <div class="sci-contribution">${escH(s.contribution)}</div>
      <div class="sci-fact">💡 ${escH(s.fact)}</div>
    </div>
  `).join('');
  buildSearchMoreTile(el,{label:"Search More",hint:"Looking for a scientist, mathematician, or discovery not featured here? Search the full Chronicle.",placeholder:"e.g. Satyendra Nath Bose, panchanga astronomy…"});
}

/* ── SACRED TEXTS DATA ── */
const SACRED_TEXTS=[
  {icon:"📖",name:"Rigveda",period:"c.1500–1200 BCE",desc:"The oldest of the four Vedas — 1,028 hymns to the Vedic gods across 10,552 verses. The oldest religious text still in continuous use anywhere in the world.",verse:"Lead me from the unreal to the real; from darkness to light; from death to immortality. — Brihadaranyaka Upanishad 1.3.28"},
  {icon:"📜",name:"Upanishads",period:"c.800–200 BCE",desc:"108 philosophical dialogues exploring the nature of consciousness, the self (atman) and ultimate reality (Brahman). The foundation of Indian metaphysics and Vedanta.",verse:"That which is the finest essence — this whole world has that as its soul. That is Reality. That is Atman. Thou art that (Tat Tvam Asi). — Chandogya Upanishad 6.8.7"},
  {icon:"📚",name:"Mahabharata",period:"c.400 BCE–400 CE",desc:"At 1.8 million words, the world's longest epic poem. Contains the Bhagavad Gita and addresses virtually every question of dharma, kingship, love, war, and destiny.",verse:"Whatever is here is found elsewhere. But what is not here is nowhere else. — Mahabharata, Adi Parva 1.56.33"},
  {icon:"🏛️",name:"Arthashastra",period:"c.300 BCE",desc:"Kautilya's masterwork on statecraft — covering economics, military strategy, foreign policy, law, and espionage. The most sophisticated ancient manual of governance.",verse:"In the happiness of his subjects lies the king's happiness; in their welfare, his welfare. — Arthashastra 1.19.34"},
  {icon:"🌿",name:"Tirukkural",period:"c.100 BCE–500 CE",desc:"133 chapters of Tamil wisdom — on virtue, wealth, and love — in 1,330 couplets. Translated into 80+ languages. Called the 'universal scripture' of Tamil literature.",verse:"Whatever befalls, let not a man transgress the bounds of virtue; that path alone is safe. — Tirukkural 34"},
  {icon:"⚔️",name:"Bhagavad Gita",period:"c.200 BCE–200 CE",desc:"Embedded in the Mahabharata — 18 chapters of Krishna's philosophical dialogue with Arjuna on duty, action, devotion, and liberation. Gandhi called it his 'eternal mother.'",verse:"You have the right to perform your actions, but not to the fruits of your actions. — Bhagavad Gita 2.47"},
  {icon:"🕌",name:"Guru Granth Sahib",period:"1604 CE",desc:"The living Guru of the Sikhs — a 1,430-page scripture containing 5,894 hymns by Sikh Gurus and saints of multiple faiths including Kabir, Farid, and Ravidas.",verse:"He who has no faith in himself can never have faith in God. — Guru Nanak, Guru Granth Sahib"},
  {icon:"🌸",name:"Ashtadhyayi",period:"c.400 BCE",desc:"Pāṇini's grammar of Sanskrit in 3,959 sutras — arguably the world's first scientific grammar. Described Sanskrit so precisely that linguists still call it a 'generative grammar' 2,400 years before Chomsky.",verse:"Language is the mirror of thought. To perfect language is to perfect the mind. — Patanjali, Mahabhashya"},
  {icon:"🏹",name:"Ramayana",period:"c.500 BCE–100 CE",desc:"Valmiki's epic of Prince Rama's exile, the abduction of Sita, and the war against Ravana — 24,000 verses that have shaped South and Southeast Asian art, theatre, and moral imagination for over two millennia, from Indonesia's Ramayana ballet to Thailand's Ramakien.",verse:"Truth alone triumphs, not falsehood. Through truth the divine path is spread out. — Mundaka Upanishad 3.1.6, often invoked alongside Ramayana ethics"},
  {icon:"🕉️",name:"Yoga Sutras of Patanjali",period:"c.400 CE (compiled)",desc:"196 terse aphorisms organizing the eight limbs of yoga (ashtanga) — from ethical restraint (yama) to absorption (samadhi). The single most influential text in shaping how yoga is understood and taught worldwide today.",verse:"Yogah chitta vritti nirodhah — Yoga is the cessation of the fluctuations of the mind. — Yoga Sutras 1.2"},
  {icon:"🪔",name:"Puranas",period:"c.300–1500 CE (compiled)",desc:"Eighteen major Puranas weaving cosmology, mythology, genealogy of kings and sages, and devotional theology into a vast literary tradition — the primary source for most popular Hindu mythology, including the stories of Krishna, Shiva, and Devi.",verse:"As the river, having entered the ocean, loses its name and form, so the wise, freed from name and form, attain the Supreme. — Mundaka Upanishad 3.2.8"},
  {icon:"🌙",name:"Quran in Indo-Persian Tradition",period:"From 7th century CE onward",desc:"While not originating in India, the Quran's reception, translation, and commentary tradition in the subcontinent — through Sufi orders, Mughal patronage, and reformers like Shah Waliullah — became a vast and distinct branch of South Asian Islamic scholarship.",verse:"Whoever does an atom's weight of good shall see it. — Quran 99:7, a verse frequently cited in South Asian Sufi teaching"},
  {icon:"🦁",name:"Panchatantra",period:"c.200 BCE–300 CE",desc:"A collection of interlinked animal fables originally composed to teach statecraft to young princes — among the most widely translated literary works in history, traveling via Persian and Arabic into the Western fable tradition, including Aesop and the Arabian Nights.",verse:"The wise adapt themselves to circumstance, as water shapes itself to the vessel that contains it. — Panchatantra, Book 1"},
  {icon:"🗡️",name:"Devi Mahatmya",period:"c.400–600 CE",desc:"Part of the Markandeya Purana, this 700-verse text is the foundational scripture of Shakta worship, narrating the Goddess Durga's battles against the buffalo-demon Mahishasura. Recited in full during Navaratri and Durga Puja across India every year.",verse:"When the gods could no longer bear the demon's tyranny, their united radiance took form as the Goddess. — Devi Mahatmya 2.9"},
  {icon:"💃",name:"Natya Shastra",period:"c.200 BCE–200 CE",desc:"Bharata Muni's encyclopedic treatise on dramaturgy, dance, music and aesthetics — codifying the theory of rasa (aesthetic emotion) that still underlies Indian classical dance, theatre and even cinema. One of the world's oldest surviving texts on performance theory.",verse:"Natyam bhavati lokasya — drama is a mirror held up to the world, showing both its sorrow and its joy. — Natya Shastra, Ch.1"},
  {icon:"🩺",name:"Sushruta Samhita",period:"c.600 BCE–600 CE (compiled)",desc:"A foundational Sanskrit text of Ayurvedic surgery, describing over 300 surgical procedures, 120 surgical instruments, and techniques including rhinoplasty and cataract surgery — methods that influenced surgical practice from Persia to Europe over the following centuries.",verse:"There is no herb that is not medicine, and no person for whom some herb is not medicine. — Sushruta Samhita, Sutrasthana"},
  {icon:"📿",name:"Brahma Sutras",period:"c.200 BCE–200 CE",desc:"Sage Badarayana's terse 555 aphorisms systematizing the philosophy of the Upanishads into a coherent school — Vedanta. So compressed that nearly every major Hindu philosopher, from Shankara to Ramanuja to Madhva, wrote a full commentary attempting to unpack its meaning.",verse:"Athato brahma jijnasa — now, therefore, the inquiry into Brahman. — Brahma Sutras 1.1.1"},
  {icon:"☸️",name:"Tripitaka (Pali Canon)",period:"c.1st century BCE (written down)",desc:"The earliest complete collection of Buddhist scripture, preserved orally for centuries before being committed to writing in Sri Lanka — its three 'baskets' covering monastic discipline, the Buddha's discourses, and philosophical analysis, forming the doctrinal bedrock of Theravada Buddhism across Asia.",verse:"All that we are is the result of what we have thought. — Dhammapada, Verse 1"},
  {icon:"🪶",name:"Jain Agamas",period:"c.6th–3rd century BCE (oral); later compiled",desc:"The canonical scriptures of Jainism, traditionally said to be the teachings of Mahavira as recorded by his disciples, organizing the philosophy of ahimsa, anekantavada and the path to liberation across dozens of texts — among the oldest continuously practiced religious canons in the world.",verse:"Ahimsa paramo dharma — non-violence is the highest duty. — Acharanga Sutra"},
];

function initTextsGrid(){
  const el=document.getElementById('textsGrid');
  if(!el)return;
  el.innerHTML=SACRED_TEXTS.map(t=>`
    <div class="text-card">
      <div class="text-icon">${t.icon}</div>
      <div class="text-name">${escH(t.name)}</div>
      <div class="text-period">${escH(t.period)}</div>
      <div class="text-desc">${escH(t.desc)}</div>
      <div class="text-verse">${escH(t.verse)}</div>
    </div>
  `).join('');
}

/* ── ON THIS DAY DATA ── */
const ON_THIS_DAY=[
  {month:1,day:26,year:1950,title:"Constitution of India Comes Into Force",text:"India becomes a sovereign republic as the Constitution — the longest written constitution in the world — takes effect, with Dr. Rajendra Prasad sworn in as the first President."},
  {month:1,day:30,year:1948,title:"Assassination of Mahatma Gandhi",text:"Gandhi is shot dead in Delhi by Nathuram Godse while walking to a prayer meeting, five months after Independence — a wound the new nation carried into its founding years."},
  {month:2,day:4,year:1948,title:"Sri Lankan Independence (Regional Echo)",text:"As decolonization swept South Asia following India's freedom, Ceylon (Sri Lanka) gained independence from Britain, part of the same imperial unraveling that began in August 1947."},
  {month:3,day:23,year:1931,title:"Execution of Bhagat Singh, Rajguru, and Sukhdev",text:"Three young revolutionaries are hanged in Lahore Jail for the killing of a British police officer. Bhagat Singh, only 23, became one of the most potent symbols of armed resistance to colonial rule."},
  {month:4,day:6,year:1930,title:"The Salt March Reaches Dandi",text:"Gandhi breaks British salt law by making salt from seawater at Dandi, Gujarat, after a 24-day, 390-km march — launching the Civil Disobedience Movement and a wave of mass arrests."},
  {month:4,day:13,year:1919,title:"Jallianwala Bagh Massacre",text:"British troops under General Dyer open fire without warning on an unarmed gathering in Amritsar, killing hundreds. The massacre radicalized a generation and shattered remaining faith in British justice."},
  {month:5,day:11,year:1998,title:"Pokhran-II Nuclear Tests",text:"India conducts five nuclear tests in the Thar Desert, declaring itself a nuclear weapons state and triggering international sanctions — followed by Pakistan's own tests later that month."},
  {month:5,day:29,year:1953,title:"Everest Summited via the Indian Subcontinent's Door",text:"Tenzing Norgay, a Sherpa born in the shadow of the Himalayas, and Edmund Hillary become the first to summit Mount Everest, forever linking the peak's conquest to the subcontinent."},
  {month:6,day:6,year:1674,title:"Coronation of Shivaji Maharaj",text:"Shivaji Bhonsle is crowned Chhatrapati at Raigad Fort in an elaborate Vedic ceremony, formally founding the Maratha Empire as a sovereign Hindu kingdom defying both Mughal and regional sultanate power."},
  {month:6,day:23,year:1757,title:"Battle of Plassey",text:"Robert Clive's victory over Siraj ud-Daulah, engineered through the betrayal of Mir Jafar, opens the door to nearly two centuries of British rule over the subcontinent."},
  {month:7,day:4,year:1898,title:"Vivekananda Founds Advaita Ashrama",text:"Swami Vivekananda establishes the Advaita Ashrama in the Himalayas to spread Vedanta philosophy worldwide — part of his broader project of reviving Indian spiritual confidence after Chicago 1893."},
  {month:8,day:9,year:1942,title:"Quit India Movement Launched",text:"Congress leaders call for immediate independence and are swiftly arrested. The movement, though crushed within weeks, signals that British rule could no longer be sustained in India."},
  {month:8,day:15,year:1947,title:"Indian Independence",text:"At midnight, India becomes a free nation as Jawaharlal Nehru delivers his 'Tryst with Destiny' speech. The joy is shadowed by Partition, which displaced over 14 million people and killed hundreds of thousands."},
  {month:9,day:24,year:2014,title:"Mangalyaan Enters Mars Orbit",text:"India's Mars Orbiter Mission successfully enters Martian orbit on its first attempt — making ISRO the first space agency in the world to do so, and at a fraction of the cost of comparable missions."},
  {month:10,day:2,year:1869,title:"Birth of Mahatma Gandhi",text:"Mohandas Karamchand Gandhi is born in Porbandar, Gujarat. He would go on to develop satyagraha — non-violent resistance — into a force that reshaped the 20th century's politics of liberation worldwide."},
  {month:10,day:31,year:1984,title:"Assassination of Indira Gandhi",text:"Prime Minister Indira Gandhi is assassinated by her own Sikh bodyguards in retaliation for Operation Blue Star, triggering anti-Sikh riots that killed thousands across northern India."},
  {month:11,day:14,year:1889,title:"Birth of Jawaharlal Nehru",text:"India's first Prime Minister is born in Allahabad. His vision of a secular, scientifically-minded, non-aligned republic would shape Indian state-building for decades after 1947."},
  {month:12,day:6,year:1992,title:"Demolition of the Babri Masjid",text:"A 16th-century mosque in Ayodhya is demolished by a mob of Hindu nationalist activists, triggering nationwide riots and reshaping Indian politics around questions of religion and history for a generation."},
  {month:12,day:16,year:1971,title:"Surrender at Dhaka",text:"Pakistani forces surrender to the Indian Army in Dhaka — the largest military surrender since World War II — ending the Bangladesh Liberation War and creating a new nation."},
  {month:1,day:12,year:1863,title:"Birth of Swami Vivekananda",text:"Born Narendranath Datta in Calcutta, he would go on to introduce Vedanta and Yoga to the Western world and reignite spiritual self-confidence in colonial India."},
  {month:2,day:21,year:1947,title:"Attlee Announces British Withdrawal Date",text:"British Prime Minister Clement Attlee announces that British rule in India will end by June 1948 at the latest — a deadline later accelerated by Mountbatten to August 1947."},
  {month:3,day:12,year:1930,title:"Gandhi Begins the Dandi March",text:"Gandhi sets out from Sabarmati Ashram with 78 followers on a 390 km march to the sea — a calculated act of civil disobedience that would galvanize the entire independence movement."},
  {month:4,day:18,year:1930,title:"Chittagong Armoury Raid",text:"Surya Sen leads a small group of revolutionaries in a coordinated raid on British armouries in Chittagong (now Bangladesh) — a bold, short-lived seizure of colonial weapons and telegraph lines."},
  {month:5,day:1,year:1960,title:"Formation of Maharashtra and Gujarat",text:"The bilingual state of Bombay is split into Maharashtra and Gujarat following the Samyukta Maharashtra Movement — part of the broader linguistic reorganization of Indian states."},
  {month:6,day:5,year:1984,title:"Operation Blue Star",text:"The Indian Army storms the Golden Temple in Amritsar to remove armed Sikh militants, causing significant damage to the shrine and deep, lasting trauma within the Sikh community."},
  {month:7,day:18,year:1947,title:"Indian Independence Act Passed",text:"The British Parliament passes the Indian Independence Act 1947, formally legislating the end of the British Raj and the creation of the dominions of India and Pakistan."},
  {month:8,day:28,year:1845,title:"Founding of the Bombay, Baroda and Central India Railway",text:"One of British India's earliest major railway companies is formed, part of the infrastructure buildout that would, decades later, also serve as an arterial system for the freedom movement's mass mobilization."},
  {month:9,day:11,year:1893,title:"Vivekananda's Chicago Address",text:"Swami Vivekananda opens his address to the Parliament of Religions with 'Sisters and brothers of America' — met with a two-minute standing ovation that announced Indian philosophy to the world stage."},
  {month:10,day:24,year:1945,title:"United Nations Founded with Indian Participation",text:"India, though still a colony, becomes a founding member of the United Nations — an early signal of the international identity it would assert fully after 1947."},
  {month:11,day:26,year:1949,title:"Constitution of India Adopted",text:"The Constituent Assembly formally adopts the Constitution of India, two months before it comes into force — November 26 is now observed as Constitution Day."},
  {month:12,day:23,year:1926,title:"Birth of Lal Bahadur Shastri (commemorative)",text:"India's second Prime Minister, known for the slogan 'Jai Jawan Jai Kisan,' guided the country through the 1965 war before his sudden death in Tashkent in 1966."},
  {month:1,day:1,year:1948,title:"Reserve Bank of India Nationalized",text:"The RBI, originally a privately-owned institution set up in 1935, is brought under government ownership — a quiet but decisive step in independent India building sovereign control over its own monetary policy."},
  {month:1,day:24,year:1950,title:"Jana Gana Mana Adopted as National Anthem",text:"Two days before the Constitution takes effect, the Constituent Assembly formally adopts Rabindranath Tagore's 1911 composition 'Jana Gana Mana' as the national anthem of India."},
  {month:1,day:31,year:1948,title:"Mahatma Gandhi Cremated at Rajghat",text:"A day after his assassination, Gandhi's body is cremated on the banks of the Yamuna before a vast crowd, with the site later consecrated as Rajghat, a national memorial visited by world leaders ever since."},
  {month:2,day:14,year:1931,title:"Gandhi–Irwin Pact Negotiations Begin",text:"Talks between Gandhi and Viceroy Lord Irwin open in Delhi, eventually producing the Gandhi–Irwin Pact of March 1931 — the first time the British negotiated with the Congress as a political equal."},
  {month:2,day:18,year:1946,title:"Royal Indian Navy Mutiny Begins",text:"Ratings of the Royal Indian Navy in Bombay mutiny over conditions and racism, spreading to Karachi and Calcutta within days — a direct aftershock of the INA trials that signalled the British Raj's loosening grip."},
  {month:2,day:20,year:1947,title:"Britain Announces Intent to Transfer Power",text:"Prime Minister Attlee tells the House of Commons that Britain intends to transfer power in India by June 1948 — the opening declaration that sets the irreversible countdown to Independence in motion."},
  {month:3,day:5,year:1931,title:"Gandhi–Irwin Pact Signed",text:"Gandhi agrees to suspend the Civil Disobedience Movement in exchange for the release of political prisoners and the right to make salt for personal use — a negotiated truce ahead of the Second Round Table Conference."},
  {month:3,day:19,year:1956,title:"States Reorganisation Act Debate Concludes in Parliament",text:"Parliament moves toward passing the States Reorganisation Act, which would redraw India's internal map along linguistic lines later that year — the most sweeping administrative redesign since Independence."},
  {month:3,day:29,year:1857,title:"Mangal Pandey's Mutiny at Barrackpore",text:"Sepoy Mangal Pandey attacks his officers at Barrackpore over the greased cartridges controversy, an early spark — weeks before Meerut — in the chain of events that ignites the 1857 Revolt."},
  {month:4,day:1,year:1936,title:"Orissa (Odisha) Becomes a Separate Province",text:"Odisha is carved out of the Bihar and Orissa Province to become India's first province organized explicitly on linguistic lines — a precedent for the far larger linguistic reorganization of the 1950s."},
  {month:4,day:10,year:1919,title:"Curfew and Unrest Grip Amritsar",text:"Days of escalating tension in Amritsar — following the arrest of local leaders and violent clashes — set the stage for the Jallianwala Bagh gathering and massacre that would follow on April 13."},
  {month:4,day:30,year:1857,title:"Sepoys at Meerut Refuse the New Cartridges",text:"Soldiers of the Bengal Army at Meerut refuse to bite the cartridges rumored to be greased with cow and pig fat — the immediate spark, weeks later, for the open mutiny of May 1857."},
  {month:5,day:10,year:1857,title:"Outbreak of the 1857 Revolt at Meerut",text:"Sepoys at Meerut rise in open mutiny, kill their officers, and march on Delhi to proclaim the aged Mughal emperor Bahadur Shah Zafar their leader — the formal beginning of the Great Revolt."},
  {month:5,day:20,year:1498,title:"Vasco da Gama Lands at Calicut",text:"The Portuguese navigator reaches the Malabar coast, opening a direct sea route between Europe and India and inaugurating nearly four centuries of European colonial entanglement in the subcontinent."},
  {month:5,day:24,year:1689,title:"Execution of Sambhaji Maharaj",text:"Shivaji's son and successor Sambhaji is captured and executed by Aurangzeb after refusing to convert or reveal Maratha fort locations — his defiance becoming a lasting symbol of Maratha resistance."},
  {month:6,day:3,year:1947,title:"Mountbatten Plan Announced",text:"Viceroy Lord Mountbatten announces the plan for the partition of British India into two independent states, India and Pakistan, compressing the transfer of power into a matter of weeks."},
  {month:6,day:18,year:1858,title:"Death of Rani Lakshmibai at Gwalior",text:"The Queen of Jhansi falls in battle near Gwalior, fighting British forces to the last — Sir Hugh Rose, the general who defeated her, called her 'the bravest and best' of all the rebel leaders."},
  {month:6,day:21,year:1932,title:"Birth of India's Talkie-Era Studios (commemorative)",text:"Indian cinema's silent-to-sound transition accelerates through the early 1930s, with studios in Bombay, Calcutta, and Madras building a homegrown film industry even as the freedom movement gathered pace."},
  {month:7,day:6,year:1944,title:"Bose Calls Gandhi 'Father of the Nation'",text:"Broadcasting from Azad Hind Radio, Subhas Chandra Bose addresses Mahatma Gandhi as 'Father of the Nation' for the first recorded time — a title that would stick permanently in the decades that followed."},
  {month:7,day:14,year:2023,title:"Chandrayaan-3 Launches Toward the Moon",text:"ISRO launches the Chandrayaan-3 mission from Sriharikota; it would go on to make India the first nation to land near the lunar south pole, weeks later, on 23 August."},
  {month:7,day:23,year:1856,title:"Birth of Bal Gangadhar Tilak",text:"Tilak, who would coin the rallying cry 'Swaraj is my birthright and I shall have it,' is born in Ratnagiri — one of the earliest leaders to popularize the demand for self-rule among the Indian masses."},
  {month:8,day:1,year:1920,title:"Tilak's Death on the Eve of Non-Cooperation",text:"Bal Gangadhar Tilak dies in Bombay just as the Congress, under Gandhi's emerging leadership, moves toward adopting the Non-Cooperation Movement later that year — a generational handover in the freedom struggle."},
  {month:8,day:14,year:1947,title:"Pakistan's Independence at Midnight",text:"Hours before India, the Dominion of Pakistan comes into existence as the subcontinent's partition takes legal effect — the same midnight hour that produced one of history's largest mass migrations."},
  {month:8,day:23,year:2023,title:"Chandrayaan-3 Lands Near the Lunar South Pole",text:"India's Vikram lander touches down softly near the Moon's south pole, making ISRO the first space agency in the world to achieve a landing in that region — and India the fourth nation ever to soft-land on the Moon."},
  {month:9,day:7,year:1857,title:"Siege of Delhi Tightens",text:"British forces besieging rebel-held Delhi during the Great Revolt push closer to the walls through early September, in the lead-up to the city's fall later that month and the end of the Mughal dynasty's nominal rule."},
  {month:9,day:12,year:1897,title:"Battle of Saragarhi",text:"Twenty-one soldiers of the 36th Sikh Regiment, led by Havildar Ishar Singh, defend a remote frontier signal post against thousands of Afghan tribesmen, fighting to the last man in one of the most studied last stands in military history."},
  {month:9,day:23,year:1803,title:"Battle of Assaye",text:"A young Arthur Wellesley — the future Duke of Wellington — defeats a far larger Maratha force at Assaye during the Second Anglo-Maratha War, a victory he later called the best he ever fought, Waterloo included."},
  {month:10,day:8,year:1932,title:"Indian Air Force Established",text:"The Indian Air Force is formed as an auxiliary force of British India with its first flight of six RAF-trained officers — the seed of what would grow into one of the world's largest air forces."},
  {month:10,day:21,year:1943,title:"Azad Hind Government Proclaimed",text:"Subhas Chandra Bose announces the Provisional Government of Free India in Japanese-occupied Singapore, declaring war on Britain and the United States and giving the independence movement its most defiant government-in-exile."},
  {month:10,day:27,year:1947,title:"Instrument of Accession Signed by Jammu and Kashmir",text:"Maharaja Hari Singh signs the Instrument of Accession joining Jammu and Kashmir to India amid a Pakistani-backed tribal invasion, a moment whose unresolved aftermath still shapes South Asian geopolitics."},
  {month:11,day:1,year:1956,title:"Linguistic Reorganization of States Takes Effect",text:"The States Reorganisation Act comes into force, redrawing India's internal boundaries along linguistic lines and creating, among others, a unified Andhra Pradesh, Kerala, and a reorganized Bombay State."},
  {month:11,day:9,year:1951,title:"Vinoba Bhave's Bhoodan Movement Spreads Across India",text:"Vinoba Bhave's land-gift movement, begun that year to redistribute land voluntarily to the landless, grows into one of independent India's most distinctive grassroots social reform efforts of the 1950s."},
  {month:11,day:30,year:1858,title:"Capture of Gwalior Ends the Major Phase of the 1857 Revolt",text:"British forces retake Gwalior from rebel leaders including Rani Lakshmibai's allies, effectively closing the last major battlefield chapter of the Great Revolt, though scattered resistance continued for months."},
  {month:12,day:4,year:1971,title:"India Formally Enters the 1971 War",text:"Following Pakistani air strikes on Indian airbases, India formally enters the war in support of the Bangladesh independence movement — a conflict that would end within two weeks in the Dhaka surrender."},
  {month:12,day:12,year:1911,title:"Delhi Durbar Proclaims the Capital's Future Shift",text:"At a grand ceremonial durbar, King George V is presented as Emperor of India, and the British announce the decision to shift the colonial capital from Calcutta to a newly planned Delhi."},
  {month:12,day:30,year:1906,title:"All-India Muslim League Founded",text:"The All-India Muslim League is established in Dhaka to safeguard Muslim political interests under colonial rule — an organization whose trajectory would lead, four decades later, to the creation of Pakistan."},
];

function fmtOtdDate(m,d){
  const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
  return months[m-1]+" "+d;
}
function initOnThisDay(){
  const card=document.getElementById('otdCard');
  if(!card)return;
  const now=new Date();
  const m=now.getMonth()+1,d=now.getDate();
  let pool=ON_THIS_DAY.filter(e=>e.month===m&&e.day===d);
  let exact=true;
  if(pool.length===0){exact=false;pool=shuffleArr(ON_THIS_DAY).slice(0,8);}
  let idx=0;
  function render(){
    const e=pool[idx%pool.length];
    card.innerHTML=`
      <div class="otd-datelabel">${exact?('Today — '+fmtOtdDate(m,d)):('No exact record for '+fmtOtdDate(m,d)+' — drawn from across the Chronicle')}</div>
      <div class="otd-year">${e.year}</div>
      <div class="otd-title">${escH(e.title)}</div>
      <div class="otd-text">${escH(e.text)}</div>
      <div class="otd-controls">
        <button class="otd-shuffle-btn" id="otdShuffleBtn">${pool.length>1?'Show Another':'Refresh'}</button>
        <div class="otd-counter">${idx%pool.length+1} / ${pool.length}</div>
      </div>
    `;
    document.getElementById('otdShuffleBtn')?.addEventListener('click',()=>{idx++;render();});
  }
  render();
}

/* ── QUOTE WALL ── */


/* ── GLOSSARY: quick-reference terms spanning all eras, searchable and filterable by category ── */
const GLOSSARY=[
  {term:"Mahajanapada",cat:"polity",def:"One of sixteen major kingdoms or oligarchic republics that dominated northern India c.600–300 BCE, including Magadha, Kosala, and Vajji — the political landscape the Buddha and Mahavira were born into."},
  {term:"Janapada",cat:"polity",def:"Literally 'where the tribe sets foot' — an early Vedic-era territorial/tribal settlement, the smaller precursor unit that later consolidated into the larger Mahajanapadas."},
  {term:"Varna",cat:"society",def:"The fourfold social classification of ancient Indian society — Brahmin, Kshatriya, Vaishya, Shudra — distinct in origin from the much more rigid and hereditary caste (jati) system that developed over later centuries."},
  {term:"Jati",cat:"society",def:"Birth-based sub-community or caste, the lived social unit of caste identity in practice, distinct from and far more numerous than the four broad varna categories."},
  {term:"Dharma",cat:"philosophy",def:"A foundational concept spanning duty, cosmic order, righteousness and natural law — its exact meaning shifts by context, school of thought, and era, making it one of the hardest Sanskrit terms to translate into a single English word."},
  {term:"Artha",cat:"philosophy",def:"One of the four traditional aims of life in Hindu thought (alongside dharma, kama, and moksha) — denoting wealth, material prosperity, and the pursuit of worldly success, most systematically treated in Kautilya's Arthashastra."},
  {term:"Moksha",cat:"philosophy",def:"Liberation from the cycle of rebirth (samsara) — the ultimate spiritual goal shared, with differing paths, across Hindu, Buddhist, and Jain traditions."},
  {term:"Samsara",cat:"philosophy",def:"The cycle of birth, death and rebirth that Indian philosophical traditions generally treat as the default condition of existence, from which moksha or nirvana offers release."},
  {term:"Sangha",cat:"religion",def:"Originally the Buddhist monastic community founded by the Buddha; the term later broadened to describe any organized religious or political assembly, including early republics."},
  {term:"Stupa",cat:"religion",def:"A dome-shaped Buddhist commemorative structure, often housing relics of the Buddha or revered monks — Sanchi Stupa, commissioned under Ashoka, remains one of the oldest stone structures in India."},
  {term:"Vihara",cat:"religion",def:"A Buddhist monastery, often built near stupas, that combined residential quarters for monks with teaching and meditation halls — many evolved into major centres of learning like Nalanda."},
  {term:"Diwan",cat:"administration",def:"A chief minister or finance administrator in Mughal and later princely-state governments — a role distinct from but often as powerful as the ruler himself, as seen with Visvesvaraya's tenure in Mysore."},
  {term:"Nizam",cat:"administration",def:"The hereditary title of the rulers of Hyderabad state under the Asaf Jahi dynasty (1724–1948) — derived from 'Nizam-ul-Mulk,' meaning administrator of the realm, originally a Mughal viceregal title."},
  {term:"Peshwa",cat:"administration",def:"The hereditary prime ministerial office of the Maratha Empire that, from the early 18th century onward, effectively became the empire's real seat of power, eclipsing the ceremonial Chhatrapati kings."},
  {term:"Subahdar",cat:"administration",def:"A provincial governor in the Mughal administrative system, overseeing a 'subah' (province) — a structure later partly inherited and adapted by British colonial administration."},
  {term:"Zamindar",cat:"administration",def:"A landholding intermediary who collected revenue from peasants on behalf of the state, a role hugely expanded and formalized under British rule through the Permanent Settlement of 1793 in Bengal."},
  {term:"Doctrine of Lapse",cat:"colonial",def:"A British East India Company policy under Lord Dalhousie allowing annexation of any princely state whose ruler died without a 'natural' male heir, denying adopted heirs — used to annex Jhansi and Satara, and a direct trigger for the 1857 Revolt."},
  {term:"Subsidiary Alliance",cat:"colonial",def:"A system devised by Governor-General Wellesley requiring Indian princely states to accept British troops and a British Resident in exchange for 'protection' — effectively surrendering sovereignty while appearing nominally independent."},
  {term:"Diwani Rights",cat:"colonial",def:"The right to collect revenue, granted to the East India Company over Bengal, Bihar and Odisha by the Mughal emperor after the 1764 Battle of Buxar — the legal/financial foundation of British colonial rule in India."},
  {term:"Permanent Settlement",cat:"colonial",def:"An 1793 British policy fixing land revenue rates permanently in Bengal, intended to create a stable landlord class loyal to the Company — it instead caused widespread peasant hardship and land dispossession over time."},
  {term:"Swaraj",cat:"freedom-struggle",def:"Self-rule — the core rallying word of the Indian independence movement, popularised by Tilak's slogan 'Swaraj is my birthright' and later central to Gandhi's vision of self-governance extending beyond mere political independence."},
  {term:"Satyagraha",cat:"freedom-struggle",def:"Gandhi's philosophy and method of nonviolent resistance, literally 'holding onto truth' — combining civil disobedience, non-cooperation, and self-suffering as tools of political and moral persuasion."},
  {term:"Swadeshi",cat:"freedom-struggle",def:"The movement to boycott British goods and promote indigenously made products, beginning prominently during the 1905 Partition of Bengal protests and later woven into Gandhi's khadi and spinning-wheel campaigns."},
  {term:"Hartal",cat:"freedom-struggle",def:"A general strike or mass shutdown of shops, schools, and offices used as a tool of political protest throughout the freedom movement and still common in Indian political life today."},
  {term:"Purna Swaraj",cat:"freedom-struggle",def:"'Complete self-rule' — the formal declaration of full independence (rather than dominion status) adopted by the Indian National Congress at its 1929 Lahore session, marked annually as Independence Day until 1947 made it real."},
  {term:"Quit India Movement",cat:"freedom-struggle",def:"The mass civil disobedience campaign launched by Gandhi in August 1942 demanding immediate British withdrawal, met with widespread arrests of Congress leadership and significant, sometimes violent, public unrest."},
  {term:"Doctrine of Ahimsa",cat:"philosophy",def:"The principle of non-violence toward all living beings, central to Jainism, deeply emphasized in Buddhism, and adopted by Gandhi as a political weapon — connecting ancient religious ethics directly to 20th-century anti-colonial strategy."},
  {term:"Anekantavada",cat:"philosophy",def:"The Jain doctrine of 'many-sidedness' — the idea that truth and reality are complex and can be approached from multiple, sometimes seemingly contradictory, valid perspectives simultaneously."},
  {term:"Advaita",cat:"philosophy",def:"Literally 'non-dualism' — Shankaracharya's school of Vedanta holding that the individual soul (atman) and ultimate reality (Brahman) are fundamentally one and the same, with apparent separateness being illusory (maya)."},
  {term:"Bhakti",cat:"religion",def:"A devotional approach to spirituality emphasizing direct personal love for a chosen deity over ritual or abstract philosophy — the dominant force behind the centuries-long Bhakti Movement spanning saints from Kabir to Mirabai to Tukaram."},
  {term:"Sufism",cat:"religion",def:"The mystical dimension of Islam emphasizing direct personal experience of the divine through love, music, and poetry — Sufi orders (silsilas) became major bridges of cultural exchange in medieval Indo-Islamic society."},
  {term:"Akhand Bharat",cat:"modern-politics",def:"Literally 'undivided India' — a term referring to the geographic and cultural vision of South Asia as a single civilizational unit prior to Partition, used today in various political and cultural contexts."},
  {term:"Five-Year Plan",cat:"modern-politics",def:"Centralized economic planning periods, modeled partly on Soviet planning, used by India from 1951 (under the Planning Commission) until the system was replaced by the NITI Aayog framework in 2015."},
  {term:"Doctrine of Basic Structure",cat:"modern-politics",def:"A judicial principle established by the Supreme Court in the 1973 Kesavananda Bharati case, holding that Parliament cannot amend the Constitution in ways that destroy its fundamental, 'basic' framework — a landmark check on legislative power."},
  {term:"Non-Alignment",cat:"modern-politics",def:"India's Cold War-era foreign policy stance, championed by Nehru, of avoiding formal alliance with either the US-led or Soviet-led blocs while engaging independently with both — formalized through the Non-Aligned Movement founded in 1961."},
  {term:"Line of Control (LoC)",cat:"modern-politics",def:"The de facto military boundary dividing Indian and Pakistani-controlled Kashmir, established after the 1948 ceasefire and adjusted after the 1971 war — distinct from an internationally recognized border, and the flashpoint for repeated conflicts."},
];
function initGlossary(){
  const eraStrip=document.getElementById('eraStrip');
  if(eraStrip&&typeof ERAS!=='undefined'){
    eraStrip.innerHTML=ERAS.map(era=>`
      <div class="era-strip-item" data-query="${escH(era.title)}" data-wiki="${escH(era.wiki)}" title="Click to explore ${escH(era.title)}">
        <div class="era-strip-dot"></div>
        <div class="era-strip-range">${escH(era.range)}</div>
        <div class="era-strip-title">${escH(era.title)}</div>
        <div class="era-strip-blurb">${escH(era.blurb)}</div>
      </div>
    `).join('');
    eraStrip.querySelectorAll('.era-strip-item').forEach(item=>{
      item.addEventListener('click',()=>{
        const t=item.dataset.query, w=item.dataset.wiki;
        selectMode('topic');
        if(typeof queryInput!=='undefined'){queryInput.value=t;}
        document.getElementById('gateway-sec')?.scrollIntoView({behavior:'smooth',block:'start'});
        setTimeout(()=>runQuery(t,w||t),350);
      });
    });
  }

  const grid=document.getElementById('glossaryGrid');
  const searchEl=document.getElementById('glossarySearch');
  const chipsEl=document.getElementById('glossaryChips');
  const countEl=document.getElementById('glossaryCount');
  if(!grid||!searchEl)return;
  const CAT_LABEL={polity:"Polity",society:"Society",philosophy:"Philosophy",religion:"Religion",administration:"Administration",colonial:"Colonial",'freedom-struggle':"Freedom Struggle",'modern-politics':"Modern Politics"};
  let activeCat='all';
  function render(){
    const q=(searchEl.value||'').trim().toLowerCase();
    const filtered=GLOSSARY.filter(g=>{
      const matchesCat=activeCat==='all'||g.cat===activeCat;
      const matchesQ=!q||g.term.toLowerCase().includes(q)||g.def.toLowerCase().includes(q);
      return matchesCat&&matchesQ;
    });
    countEl.textContent=filtered.length+(filtered.length===1?' term':' terms');
    grid.innerHTML=filtered.map(g=>`
      <div class="gloss-card" data-term="${escH(g.term)}">
        <div class="gloss-top"><span class="gloss-term">${escH(g.term)}</span><span class="gloss-cat-tag">${escH(CAT_LABEL[g.cat]||g.cat)}</span></div>
        <p class="gloss-def">${escH(g.def)}</p>
        <div class="gloss-more">Explore further →</div>
      </div>
    `).join('')||(q?`<div class="gloss-empty">
        <p>"${escH(searchEl.value.trim())}" isn't in our curated glossary yet.</p>
        <button type="button" class="gloss-fallback-btn" id="glossFallbackBtn">Search the full archive instead →</button>
      </div>`:'<div class="gloss-empty">No terms match that category yet.</div>');
    const fallbackBtn=document.getElementById('glossFallbackBtn');
    if(fallbackBtn){
      fallbackBtn.addEventListener('click',()=>{
        const t=searchEl.value.trim();
        document.getElementById('gateway-sec')?.scrollIntoView({behavior:'smooth',block:'start'});
        setTimeout(()=>switchToTopicAndSearch(t),350);
      });
    }
    grid.querySelectorAll('.gloss-card').forEach(card=>{
      card.addEventListener('click',()=>{
        const t=card.dataset.term;
        selectMode('topic');
        if(typeof queryInput!=='undefined'){queryInput.value=t;}
        document.getElementById('gateway-sec')?.scrollIntoView({behavior:'smooth',block:'start'});
        setTimeout(()=>runQuery(t,t),350);
      });
    });
  }
  searchEl.addEventListener('input',render);
  chipsEl.querySelectorAll('.gloss-chip').forEach(chip=>{
    chip.addEventListener('click',()=>{
      chipsEl.querySelectorAll('.gloss-chip').forEach(c=>c.classList.remove('active'));
      chip.classList.add('active');
      activeCat=chip.dataset.cat;
      render();
    });
  });
  render();
}


initWisdomBand();
initQuoteTicker();
initPhilosopherCards();
initWomenGrid();
initBattleScroll();
initOpsGrid();
initScienceGrid();
initTextsGrid();
initOnThisDay();
initGlossary();

})();
