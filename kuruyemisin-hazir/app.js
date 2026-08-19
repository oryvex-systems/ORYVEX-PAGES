const products=[{name:'Antep Fıstığı',price:450},{name:'Kaju',price:620},{name:'Badem',price:390},{name:'Fındık',price:520},{name:'Kabak Çekirdeği',price:240},{name:'Kuru Üzüm',price:180}];
const selected=new Map();
const productList=document.getElementById('productList');
const cartCount=document.getElementById('cartCount');
const summaryItems=document.getElementById('summaryItems');
const totalEl=document.getElementById('total');

products.forEach((p,i)=>{const card=document.createElement('article');card.className='product';card.innerHTML=`<p>🥜</p><h3>${p.name}</h3><p>${p.price} ₺ / kg</p><button data-i="${i}">250 gr ekle</button>`;productList.appendChild(card)});
productList.addEventListener('click',e=>{const btn=e.target.closest('button[data-i]');if(!btn)return;const p=products[+btn.dataset.i];if(selected.has(p.name)){selected.delete(p.name);btn.textContent='250 gr ekle';btn.classList.remove('added')}else{selected.set(p.name,{...p,gram:250});btn.textContent='Eklendi ✓';btn.classList.add('added')}cartCount.textContent=`${selected.size} ürün`;renderSummary()});

document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.go)?.scrollIntoView({behavior:'smooth'})));
document.getElementById('gift').addEventListener('change',renderSummary);
document.querySelectorAll('input[name="delivery"]').forEach(x=>x.addEventListener('change',renderSummary));
function renderSummary(){summaryItems.innerHTML='';let total=0;selected.forEach(p=>{const amount=p.price*.25;total+=amount;summaryItems.insertAdjacentHTML('beforeend',`<div class="summary-row"><span>${p.name} • ${p.gram} gr</span><strong>${amount.toFixed(0)} ₺</strong></div>`)});const delivery=document.querySelector('input[name="delivery"]:checked')?.value;if(delivery==='Kurye ile Gelsin'){total+=50;summaryItems.insertAdjacentHTML('beforeend','<div class="summary-row"><span>Kurye</span><strong>50 ₺</strong></div>')}if(document.getElementById('gift').checked){total+=25;summaryItems.insertAdjacentHTML('beforeend','<div class="summary-row"><span>Hediye paketi</span><strong>25 ₺</strong></div>')}totalEl.textContent=`${total.toFixed(0)} ₺`}

document.getElementById('payBtn').addEventListener('click',()=>{if(selected.size===0){alert('Önce en az bir ürün seç.');document.getElementById('products').scrollIntoView({behavior:'smooth'});return}document.getElementById('success').classList.remove('hidden');document.getElementById('orderNo').textContent='Sipariş No: KH-'+new Date().getFullYear()+'-'+String(Math.floor(Math.random()*900000)+100000);document.getElementById('success').scrollIntoView({behavior:'smooth'});});
document.getElementById('locationBtn').addEventListener('click',()=>{if(!navigator.geolocation){alert('Bu cihazda konum desteği bulunamadı.');return}navigator.geolocation.getCurrentPosition(()=>alert('Konum alındı. Yakındaki mağazalar sonraki sürümde gerçek veriden listelenecek.'),()=>alert('Konum izni verilmedi.'))});
renderSummary();
