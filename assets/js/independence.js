(function(){
"use strict";
const $=id=>document.getElementById(id);
const list=$("eventsList"),slider=$("yearSlider"),output=$("yearOutput"),search=$("eventSearch"),category=$("eventCategory"),count=$("timelineCount");
const warList=$("warsList"),warSearch=$("warSearch"),warType=$("warType"),warRegion=$("warRegion");
const palette={company:"#dfa840",war:"#e05c42",resistance:"#9b7be0",revolution:"#e05c42",mass:"#2ec4b6",congress:"#d9af69",reform:"#91a5c9",independence:"#f5d87a"};
let events=[],sources=[],admins=[],warItems=[],warSources=[],visibleLimit=1000,reverse=false,adminFilter="all";
const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const dateRank=e=>{const t=e.dateLabel||"",mn={January:0,February:1,March:2,April:3,May:4,June:5,July:6,August:7,September:8,October:9,November:10,December:11};let m=t.match(/(\d{1,2})\s*[–-]\s*\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/);if(m)return Date.UTC(+m[3],mn[m[2]],+m[1]);m=t.match(/(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)(?:\s*[–-]\s*\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December))?\s+(\d{4})/);if(m)return Date.UTC(+m[3],mn[m[2]],+m[1]);m=t.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s*[–-]\s*(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/);if(m)return Date.UTC(+m[2],mn[m[1]],1);m=t.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(\d{4})/);if(m)return Date.UTC(+m[3],mn[m[1]],+m[2]);m=t.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/);if(m)return Date.UTC(+m[2],mn[m[1]],1);return Date.UTC(e.year,0,1)};
const yearFromHash=()=>{const m=location.hash.match(/year-(\d{4})/);return m?Math.max(1600,Math.min(1947,Number(m[1]))):null};
function sourceLinks(ids){return (ids||[]).map(id=>{const s=sources.find(x=>x.id===id);return s?'<a href="'+safe(s.url)+'" target="_blank" rel="noopener noreferrer">'+safe(s.name)+'</a>':""}).filter(Boolean).join(" · ")}
function renderEvents(){
 const y=Number(slider.value),q=search.value.trim().toLocaleLowerCase(),cat=category.value;
 output.textContent=y;
 const found=events.filter(e=>e.year<=y&&(cat==="all"||e.category===cat)&&(!q||[e.dateLabel,e.title,e.summary,e.detail,...(e.people||[])].join(" ").toLocaleLowerCase().includes(q)));
 const rows=reverse?found.slice().reverse():found;
 count.textContent=found.length+" of "+events.length+" events through "+y;
 $("loadMoreWrap").hidden=rows.length<=visibleLimit;
 $("loadMoreBtn").textContent="Load more events ("+(rows.length-visibleLimit)+" remaining)";
 list.setAttribute("aria-busy","false");
 if(!rows.length){list.innerHTML='<div class="ar-card ar-empty">No events match these filters. Try an earlier year, another category or a broader search.</div>';return}
 list.innerHTML=rows.slice(0,visibleLimit).map(e=>'<article class="ar-card ar-event" style="--event-accent:'+ (palette[e.category]||palette.company)+'"><div class="ar-event-date">'+safe(e.dateLabel)+'</div><div class="ar-event-main"><span class="ar-tag">'+safe(e.category)+'</span><h3>'+safe(e.title)+'</h3><p>'+safe(e.summary)+'</p><details><summary>Read context & people involved</summary><div class="ar-detail"><p>'+safe(e.detail)+'</p>'+(e.people&&e.people.length?'<div class="ar-people">'+e.people.map(n=>'<span class="ar-person">'+safe(n)+'</span>').join("")+'</div>':"")+(e.sourceIds&&e.sourceIds.length?'<p class="ar-small">Further reading: '+sourceLinks(e.sourceIds)+'</p>':"")+'</div></details></div></article>').join("");
}
function renderAdmins(){
 const map={all:()=>true,company:a=>a.office.includes("Company")||a.office.includes("Bengal (Company)"),gg:a=>a.office.includes("Governor-General")&&!a.office.includes("Viceroy")&&!a.office.includes("Dominion"),viceroy:a=>a.office.includes("Viceroy"),dominion:a=>a.office.includes("Dominion")||a.office.includes("President")};
 const rows=admins.filter(map[adminFilter]||map.all);
 $("adminList").innerHTML=rows.map(a=>'<article class="ar-admin"><div class="ar-admin-top"><strong>'+safe(a.name)+'</strong><span class="term">'+safe(a.term)+'</span></div><small>'+safe(a.office)+'</small><p>'+safe(a.note)+'</p></article>').join("");
}

function renderWars(){if(!warList)return;const q=warSearch.value.trim().toLocaleLowerCase(),kind=warType.value,reg=warRegion.value;const rows=warItems.filter(w=>(kind==="all"||w.kind===kind)&&(reg==="all"||w.region===reg)&&(!q||[w.period,w.title,w.region,w.kind,w.parties,w.summary,w.engagements,w.outcome,...(w.leaders||[])].join(" ").toLocaleLowerCase().includes(q)));$("warCount").textContent=rows.length+" / "+warItems.length+" records";warList.setAttribute("aria-busy","false");if(!rows.length){warList.innerHTML='<div class="ar-card ar-empty">No wars or campaigns match those filters.</div>';return}warList.innerHTML=rows.map(w=>'<article class="ar-card ar-war"><div class="ar-war-top"><span class="ar-war-period">'+safe(w.period)+'</span><span class="ar-tag">'+safe(w.kind)+'</span></div><h3>'+safe(w.title)+'</h3><div class="ar-war-parties">'+safe(w.parties)+'</div><p>'+safe(w.summary)+'</p><details><summary>Engagements, outcome & commanders</summary><div class="ar-detail">'+(w.engagements?'<p><strong>Key engagements:</strong> '+safe(w.engagements)+'</p>':'')+'<p><strong>Outcome / context:</strong> '+safe(w.outcome)+'</p>'+(w.leaders&&w.leaders.length?'<div class="ar-people">'+w.leaders.map(n=>'<span class="ar-person">'+safe(n)+'</span>').join('')+'</div>':'')+(w.notes?'<p class="ar-note">'+safe(w.notes)+'</p>':'')+(w.sourceIds&&w.sourceIds.length?'<p class="ar-small">Further reading: '+w.sourceIds.map(id=>{const s=warSources.find(x=>x.id===id);return s?'<a href="'+safe(s.url)+'" target="_blank" rel="noopener noreferrer">'+safe(s.name)+'</a>':''}).filter(Boolean).join(' · ')+'</p>':'')+'</div></details><a class="ar-page-link" href="independence.html#year-'+w.startYear+'">View timeline from '+w.startYear+' →</a></article>').join('')}
function loadWars(){if(!warList)return;fetch("assets/data/wars.json").then(r=>{if(!r.ok)throw new Error("wars "+r.status);return r.json()}).then(d=>{warItems=(d.wars||[]).slice().sort((a,b)=>a.startYear-b.startYear||a.endYear-b.endYear);warSources=d.sources||[];[...new Set(warItems.map(w=>w.kind))].sort().forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;warType.appendChild(o)});[...new Set(warItems.map(w=>w.region))].sort().forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;warRegion.appendChild(o)});warSearch.addEventListener("input",renderWars);warType.addEventListener("change",renderWars);warRegion.addEventListener("change",renderWars);renderWars()}).catch(err=>{warList.setAttribute("aria-busy","false");warList.innerHTML='<div class="ar-card ar-empty">The war register could not be loaded. Please refresh when the site is online.</div>';console.error(err)})}
function renderSecretaries(rows){const el=$("secretaryList");if(!el)return;el.innerHTML=(rows||[]).map(a=>'<article class="ar-admin"><div class="ar-admin-top"><strong>'+safe(a.name)+'</strong><span class="term">'+safe(a.term)+'</span></div><small>Secretary of State for India · London</small><p>'+safe(a.note)+'</p></article>').join('')}

function renderSources(target){
 $(target).innerHTML=sources.map(s=>'<article class="ar-source"><a href="'+safe(s.url)+'" target="_blank" rel="noopener noreferrer">'+safe(s.name)+'</a><p>'+safe(s.note)+'</p></article>').join("");
}
function boot(){
 fetch("assets/data/independence-events.json").then(r=>{if(!r.ok)throw new Error("events "+r.status);return r.json()}).then(d=>{
 events=d.events||[];sources=d.sources||[];events.sort((a,b)=>a.year-b.year||dateRank(a)-dateRank(b));
 $("statEvents").textContent=events.length;
 const initial=yearFromHash();if(initial!==null)slider.value=String(initial);
 slider.addEventListener("input",renderEvents);search.addEventListener("input",()=>{visibleLimit=36;renderEvents()});category.addEventListener("change",()=>{visibleLimit=36;renderEvents()});
 $("sortBtn").addEventListener("click",()=>{reverse=!reverse;$("sortBtn").textContent=reverse?"Newest first ↓":"Oldest first ↑";$("sortBtn").setAttribute("aria-pressed",String(reverse));visibleLimit=36;renderEvents()});
 document.querySelectorAll("[data-year]").forEach(b=>b.addEventListener("click",()=>{slider.value=b.dataset.year;renderEvents()}));
 $("loadMoreBtn").addEventListener("click",()=>{visibleLimit+=36;renderEvents()});
 renderEvents();renderSources("sourceList");if(initial!==null)document.getElementById("timeline").scrollIntoView({behavior:"auto",block:"start"});
 }).catch(err=>{list.setAttribute("aria-busy","false");list.innerHTML='<div class="ar-card ar-empty">The timeline data could not be loaded. Please refresh when the site is online.</div>';console.error(err)});
 fetch("assets/data/administrators.json").then(r=>{if(!r.ok)throw new Error("administrators "+r.status);return r.json()}).then(d=>{
 admins=(d.administrators||[]).map(a=>{let f=a.office.includes("Company")?"company":a.office.includes("Dominion")||a.office.includes("President")?"dominion":a.office.includes("Viceroy")?"viceroy":"gg";return {...a,_filter:f}});
 $("statAdmins").textContent=admins.length;
 document.querySelectorAll("[data-admin]").forEach(b=>b.addEventListener("click",()=>{adminFilter=b.dataset.admin;document.querySelectorAll("[data-admin]").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));renderAdmins()}));renderAdmins();renderSecretaries(d.secretariesOfState||[]);
 }).catch(err=>{ $("adminList").innerHTML='<div class="ar-empty">The office-holder data could not be loaded.</div>';console.error(err)});
}
 loadWars();
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();