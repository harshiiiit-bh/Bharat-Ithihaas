(function(){
"use strict";
const $=id=>document.getElementById(id);
const list=$("eventsList"),slider=$("yearSlider"),output=$("yearOutput"),search=$("eventSearch"),category=$("eventCategory"),count=$("timelineCount");
const palette={company:"#dfa840",war:"#e05c42",resistance:"#9b7be0",revolution:"#e05c42",mass:"#2ec4b6",congress:"#d9af69",reform:"#91a5c9",independence:"#f5d87a"};
let events=[],sources=[],admins=[],visibleLimit=36,reverse=false,adminFilter="all";
const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
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
function renderSources(target){
 $(target).innerHTML=sources.map(s=>'<article class="ar-source"><a href="'+safe(s.url)+'" target="_blank" rel="noopener noreferrer">'+safe(s.name)+'</a><p>'+safe(s.note)+'</p></article>').join("");
}
function boot(){
 fetch("assets/data/independence-events.json").then(r=>{if(!r.ok)throw new Error("events "+r.status);return r.json()}).then(d=>{
 events=d.events||[];sources=d.sources||[];events.sort((a,b)=>a.year-b.year||a.dateLabel.localeCompare(b.dateLabel));
 $("statEvents").textContent=events.length;
 const initial=yearFromHash();if(initial!==null)slider.value=String(initial);
 slider.addEventListener("input",renderEvents);search.addEventListener("input",()=>{visibleLimit=36;renderEvents()});category.addEventListener("change",()=>{visibleLimit=36;renderEvents()});
 $("sortBtn").addEventListener("click",()=>{reverse=!reverse;$("sortBtn").textContent=reverse?"Newest first ↓":"Oldest first ↑";$("sortBtn").setAttribute("aria-pressed",String(reverse));visibleLimit=36;renderEvents()});
 document.querySelectorAll("[data-year]").forEach(b=>b.addEventListener("click",()=>{slider.value=b.dataset.year;renderEvents()}));
 $("loadMoreBtn").addEventListener("click",()=>{visibleLimit+=36;renderEvents()});
 renderEvents();renderSources("sourceList");
 }).catch(err=>{list.setAttribute("aria-busy","false");list.innerHTML='<div class="ar-card ar-empty">The timeline data could not be loaded. Please refresh when the site is online.</div>';console.error(err)});
 fetch("assets/data/administrators.json").then(r=>{if(!r.ok)throw new Error("administrators "+r.status);return r.json()}).then(d=>{
 admins=(d.administrators||[]).map(a=>{let f=a.office.includes("Company")?"company":a.office.includes("Dominion")||a.office.includes("President")?"dominion":a.office.includes("Viceroy")?"viceroy":"gg";return {...a,_filter:f}});
 $("statAdmins").textContent=admins.length;
 document.querySelectorAll("[data-admin]").forEach(b=>b.addEventListener("click",()=>{adminFilter=b.dataset.admin;document.querySelectorAll("[data-admin]").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));renderAdmins()}));renderAdmins();
 }).catch(err=>{ $("adminList").innerHTML='<div class="ar-empty">The office-holder data could not be loaded.</div>';console.error(err)});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();