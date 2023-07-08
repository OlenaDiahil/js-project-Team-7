(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function m(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=m(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",function(){const p=document.querySelector("#categoryContainer");fetch("https://books-backend.p.goit.global/books/category-list").then(s=>s.json()).then(s=>{s.forEach(m=>{const n=document.createElement("div");n.classList.add("category");const e=document.createElement("h2");e.textContent=m.list_name,n.appendChild(e),fetch(`https://books-backend.p.goit.global/books/category?category=${m.list_name}`).then(t=>t.json()).then(t=>{const c=t;if(c.length>0){const a=document.createElement("ul");if(a.classList.add("book-list"),c.slice(0,5).forEach(i=>{const o=document.createElement("li");o.classList.add("book-item");const l=document.createElement("img");l.src=i.book_image,l.alt=i.title,l.classList.add("book-image"),o.appendChild(l);const d=document.createElement("h3");d.textContent=i.title,d.classList.add("book-title"),o.appendChild(d);const r=document.createElement("p");r.textContent=i.author,r.classList.add("book-author"),o.appendChild(r),a.appendChild(o)}),n.appendChild(a),c.length>5){const i=document.createElement("button");i.textContent="See More",i.classList.add("see-more-button"),n.appendChild(i),i.addEventListener("click",()=>{if(a.innerHTML="",c.slice(5).forEach(o=>{const l=document.createElement("li");l.classList.add("book-item");const d=document.createElement("img");d.src=o.book_image,d.alt=o.title,d.classList.add("book-image"),l.appendChild(d);const r=document.createElement("h3");r.textContent=o.title,r.classList.add("book-title"),l.appendChild(r);const u=document.createElement("p");u.textContent=o.author,u.classList.add("book-author"),l.appendChild(u),a.appendChild(l)}),c.slice(5).length===0){const o=document.createElement("p");o.textContent="Немає більше книг для цієї категорії",n.appendChild(o)}})}}else{const a=document.createElement("p");a.textContent="Немає популярних книг для цієї категорії",n.appendChild(a)}}).catch(t=>{console.log(`Сталася помилка при отриманні даних для категорії "${m.list_name}" з API:`,t)}),p.appendChild(n)})}).catch(s=>{console.log("Сталася помилка при отриманні даних з API:",s)})});