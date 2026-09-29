(function(){
"use strict";
const $=id=>document.getElementById(id);
const grid=$("profileGrid"),search=$("profileSearch"),region=$("regionFilter"),method=$("methodFilter");
let profiles=[],sources=[],selectedEra=null;
const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function fillFilter(select,items){[...new Set(items)].sort((a,b)=>a.localeCompare(b)).forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;select.appendChild(o)})}
function linkSources(ids){return(ids||[]).map(id=>{const s=sources.find(x=>x.id===id);return s?'<a href="'+safe(s.url)+'" target="_blank" rel="noopener noreferrer">'+safe(s.name)+'</a>':""}).filter(Boolean).join(" · ")}
function render(){
 const q=search.value.trim().toLocaleLowerCase(),r=region.value,m=method.value;
 const rows=profiles.filter(p=>(r==="all"||p.region===r)&&(m==="all"||p.method===m)&&(!selectedEra||(p.eventYear>=selectedEra[0]&&p.eventYear<=selectedEra[1]))&&(!q||[p.name,p.years,p.region,p.method,p.group,p.bio,p.role,p.context].join(" ").toLocaleLowerCase().includes(q)));
 $("shownCount").textContent=rows.length+" / "+profiles.length+" profiles";
 grid.setAttribute("aria-busy","false");
 if(!rows.length){grid.innerHTML='<div class="ar-card ar-empty">No profiles match. Clear a filter or search a broader term.</div>';return}
 grid.innerHTML=rows.map(p=>'<article class="ar-card ar-profile"><div class="ar-profile-head"><span class="ar-profile-mark" aria-hidden="true"><svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M22 5v34M5 22h34M9 9l26 26m0-26L9 35" stroke="currentColor" stroke-opacity=".5" stroke-width="1"/></svg></span><h3>'+safe(p.name)+'</h3><span class="ar-profile-years">'+safe(p.years)+'</span></div><div class="ar-profile-meta">'+safe(p.region)+' · '+safe(p.method)+'</div><span class="ar-tag">'+safe(p.group)+'</span><p>'+safe(p.bio)+'</p><details><summary>Contribution & historical context</summary><p><strong>In the movement:</strong> '+safe(p.role)+'</p><p><strong>Context:</strong> '+safe(p.context)+'</p>'+(p.sourceIds&&p.sourceIds.length?'<p class="ar-small">Further reading: '+linkSources(p.sourceIds)+'</p>':"")+'</details><a class="ar-btn" href="independence.html#year-'+Number(p.eventYear)+'">View related timeline year →</a></article>').join("");
}
function renderEraRail(){
 const el=$("profileEraRail");if(!el)return;
 const eras=[["1850s–1890s",1850,1899],["1900s",1900,1909],["1910s",1910,1919],["1920s",1920,1929],["1930s",1930,1939],["1940s",1940,1949]];
 el.innerHTML=eras.map(([label,start,end])=>{const n=profiles.filter(p=>p.eventYear>=start&&p.eventYear<=end).length;return '<button type="button" class="ar-era-chip'+(selectedEra&&selectedEra[0]===start?' active':'')+'" data-era-start="'+start+'" data-era-end="'+end+'" aria-pressed="'+String(!!(selectedEra&&selectedEra[0]===start))+'"><span class="ar-era-years">'+label+'</span><span class="ar-era-count">'+n+' profile'+(n===1?'':'s')+'</span></button>'}).join("");
 el.querySelectorAll("[data-era-start]").forEach(b=>b.addEventListener("click",()=>{selectedEra=[Number(b.dataset.eraStart),Number(b.dataset.eraEnd)];$("clearProfileEra").hidden=false;renderEraRail();render()}));
}
function renderSources(){$("sourceList").innerHTML=sources.map(s=>'<article class="ar-source"><a href="'+safe(s.url)+'" target="_blank" rel="noopener noreferrer">'+safe(s.name)+'</a><p>'+safe(s.note)+'</p></article>').join("")}
function boot(){fetch("assets/data/revolutionaries.json").then(r=>{if(!r.ok)throw new Error("profiles "+r.status);return r.json()}).then(d=>{profiles=d.profiles||[];sources=d.sources||[];$("profileCount").textContent=profiles.length;fillFilter(region,profiles.map(p=>p.region));fillFilter(method,profiles.map(p=>p.method));search.addEventListener("input",render);region.addEventListener("change",render);method.addEventListener("change",render);$("clearProfileEra").addEventListener("click",()=>{selectedEra=null;$("clearProfileEra").hidden=true;renderEraRail();render()});renderEraRail();render();renderSources()}).catch(e=>{grid.setAttribute("aria-busy","false");grid.innerHTML='<div class="ar-card ar-empty">The profile data could not be loaded. Please refresh when the site is online.</div>';console.error(e)})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();