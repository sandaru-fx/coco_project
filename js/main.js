let WA_NUMBER='94766280198';

function applyAdminCMS(){
  const data=JSON.parse(localStorage.getItem('cocoCMS')||'{}');
  const PRODUCT_IMAGE_MAP={
    p1:'images/prod-virgin-oil.webp',p2:'images/prod-oil-family.webp',p3:'images/prod-milk.webp',p4:'images/prod-water.webp',
    p5:'images/prod-flour.webp',p6:'images/prod-sugar.webp',p7:'images/prod-evoo.webp',p8:'images/prod-hair-oil.webp',
    p9:'images/prod-milk-large.webp',p10:'images/prod-king-water.webp',p11:'images/prod-desiccated.webp',p12:'images/prod-chips.webp',
    p13:'images/prod-massage.webp',p14:'images/prod-organic.webp',p15:'images/prod-cream.webp',p16:'images/prod-sparkling.webp',
    p17:'images/prod-flour-large.webp',p18:'images/prod-sugar.webp',p19:'images/prod-vinegar.webp',p20:'images/prod-butter.webp',
    p21:'images/prod-cooking.webp',p22:'images/prod-latte.webp',p23:'images/prod-gift.webp',p24:'images/prod-sampler.webp'
  };
  if(data.imgVer!==3){
    if(Array.isArray(data.products)){
      data.products.forEach(p=>{
        const next=PRODUCT_IMAGE_MAP[p.id];
        const img=String(p.image||'');
        if(next&&(!img||/product-collection|hero-estate|hero-products/.test(img))){p.image=next;p.pos='center'}
        if(p.image&&!String(p.image).startsWith('data:')) p.image=String(p.image).replace(/\.png$/i,'.webp');
      });
    }
    if(Array.isArray(data.reviews)){
      data.reviews.forEach(r=>{
        if(r.image&&!String(r.image).startsWith('data:')) r.image=String(r.image).replace(/\.png$/i,'.webp');
      });
    }
    data.imgVer=3;
    try{localStorage.setItem('cocoCMS',JSON.stringify(data))}catch{}
  }

  // Contact / WhatsApp
  const c=data.contact||{};
  if(c.whatsapp) WA_NUMBER=String(c.whatsapp).replace(/\D/g,'');
  const footerBlurb=document.querySelector('.footer-grid > div:first-child > p');
  if(c.footer && footerBlurb) footerBlurb.textContent=c.footer;
  const hello=document.querySelector('.footer-grid > div:last-child > p, .footer-grid div:last-child p');
  if(hello && (c.phone || c.email || c.address)){
    hello.innerHTML=[c.phone,c.email,c.address].filter(Boolean).join('<br>');
  }
  document.querySelectorAll('a[href*="wa.me"]').forEach(a=>{
    if(!WA_NUMBER) return;
    try{
      const u=new URL(a.getAttribute('href'), location.href);
      if(u.hostname.includes('wa.me')){
        u.pathname='/'+WA_NUMBER;
        a.setAttribute('href', u.toString());
      }
    }catch{}
  });

  // Products catalog (products page)
  const grid=document.getElementById('productGrid');
  if(grid && Array.isArray(data.products) && data.products.length){
    grid.innerHTML=data.products.map(p=>{
      const name=`${p.title}${p.size? ' '+p.size:''}`.trim();
      const tag=p.tag?`<span class="tag">${escapeCms(p.tag)}</span>`:'';
      return `<article class="product-card" data-category="${escapeCms(p.category||'pantry')}" data-name="${escapeCms(name)}" data-price="${Number(p.price)||0}">
        <div class="product-visual"><img src="${escapeCms(p.image||'images/product-collection.webp')}" style="object-position:${escapeCms(p.pos||'50% center')}" alt="${escapeCms(p.title)}" loading="lazy" decoding="async">${tag}</div>
        <div class="product-body"><h3>${escapeCms(p.title)}</h3><p>${escapeCms(p.description||'')}</p>
        <div class="product-bottom"><span class="price">Rs. ${Number(p.price||0).toLocaleString()} <small>/ ${escapeCms(p.size||'')}</small></span>
        <button class="add-btn" aria-label="Add ${escapeCms(p.title)}"><i data-lucide="plus"></i></button></div></div>
      </article>`;
    }).join('');
  }

  // Reviews
  const reviewsGrid=document.getElementById('reviewsGrid');
  if(reviewsGrid && Array.isArray(data.reviews) && data.reviews.length){
    reviewsGrid.innerHTML=data.reviews.map(r=>{
      const parts=String(r.name||'CL').trim().split(/\s+/);
      const av=((parts[0]?.[0]||'')+(parts[1]?.[0]||'')).toUpperCase()||'CL';
      return `<article class="review-card reveal">
        <img class="review-bg" src="${escapeCms(r.image||'images/hero-estate.webp')}" alt="">
        <div class="review-content">
          <div class="stars">★★★★★</div>
          <blockquote>“${escapeCms(r.quote||'')}”</blockquote>
          <div class="reviewer"><div class="avatar">${av}</div><div><strong>${escapeCms(r.name||'')}</strong><span class="verified">&#10003; Verified</span></div></div>
        </div>
      </article>`;
    }).join('');
  }

  // Social links in footer
  const social={
    facebook:'https://facebook.com/cocolanka',
    instagram:'https://instagram.com/cocolanka',
    tiktok:'',
    youtube:'',
    ...(data.social||{})
  };
  const links=[
    ['facebook', social.facebook, 'Facebook'],
    ['instagram', social.instagram, 'Instagram'],
    ['tiktok', social.tiktok, 'TikTok'],
    ['youtube', social.youtube, 'YouTube']
  ].filter(([,url])=>url&&String(url).trim());
  document.querySelectorAll('.footer .footer-grid > div:first-child').forEach(col=>{
    let box=col.querySelector('.footer-social');
    if(!links.length){ if(box) box.remove(); return; }
    if(!box){
      box=document.createElement('div');
      box.className='footer-social';
      col.appendChild(box);
    }
    box.innerHTML=links.map(([,url,label])=>`<a href="${escapeCms(url)}" target="_blank" rel="noopener">${escapeCms(label)}</a>`).join('');
  });
}

function escapeCms(str){
  return String(str||'')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

function enhanceAbout(){const main=document.querySelector('main'),first=main?.querySelector('.section'),process=main?.querySelector('.products');if(!main||!first||!process)return;first.insertAdjacentHTML('afterend',`<section class="section about-manifesto"><div class="container manifesto-grid"><div class="manifesto-copy reveal"><span class="eyebrow">Why we began</span><h2 class="section-title">To keep the goodness close to where it grows.</h2><p>Too often, coconuts travel far before they are transformed. We chose another path: work close to the groves, move quickly after harvest and keep every stage personal.</p><blockquote>“Our ambition was never to make the most. It was to make something unmistakably honest.”</blockquote><div class="founder-sign"><strong>Nalin Jayawardena</strong><span>Founder · CocoLanka</span></div></div><div class="story-collage reveal"><figure class="collage-main"><img src="images/hero-about.webp" alt="Coconut plantation at sunrise"></figure><figure class="collage-small"><img src="images/product-collection.webp" alt="Coconut products crafted in small batches"></figure><div class="collage-note"><strong>48 hrs</strong><span>Harvest to production</span></div></div></div></section><section class="section origin-band"><div class="container"><div class="section-head reveal"><div><span class="eyebrow">Southern provenance</span><h2 class="section-title">A place that shapes every product.</h2></div><p class="lead">Matara's warm coast, seasonal rain and generations of coconut knowledge give our ingredients their distinctive character.</p></div><div class="origin-grid"><article class="origin-card reveal"><span>01</span><h3>Coastal climate</h3><p>Sun, sea air and tropical rain nurture healthy palms with naturally rich fruit.</p></article><article class="origin-card reveal"><span>02</span><h3>Generational knowledge</h3><p>Growers read each tree and harvest with experience no machine can replace.</p></article><article class="origin-card reveal"><span>03</span><h3>Close relationships</h3><p>Direct partnerships help us protect quality while paying farming families fairly.</p></article></div></div></section>`);process.insertAdjacentHTML('afterend',`<section class="section impact-section"><div class="container impact-grid"><div class="impact-image reveal"><img src="images/farm-story.webp" alt="CocoLanka farming community"><div class="impact-badge"><i data-lucide="heart-handshake"></i><span>Growing together since 2016</span></div></div><div class="impact-copy reveal"><span class="eyebrow">People before volume</span><h2 class="section-title">A better product should build a better circle.</h2><p>Every CocoLanka purchase supports a network of growers, harvesters, makers and local delivery partners. We focus on dependable relationships instead of chasing the lowest possible cost.</p><ul class="impact-list"><li><i data-lucide="coins"></i><div><strong>Fair, predictable buying</strong><span>Clear pricing and consistent demand for partner farms.</span></div></li><li><i data-lucide="recycle"></i><div><strong>Whole-coconut thinking</strong><span>Husk, shell, water and meat are reused wherever possible.</span></div></li><li><i data-lucide="users"></i><div><strong>Local opportunity</strong><span>Processing and packing create work close to farming communities.</span></div></li></ul></div></div></section><section class="section about-promise"><div class="container promise-inner reveal"><span class="eyebrow">Our promise</span><h2>What nature gives us, we will never overcomplicate.</h2><div class="promise-points"><span>Pure ingredients</span><span>Gentle processes</span><span>Honest relationships</span></div></div></section>`);main.querySelectorAll('.about-manifesto .reveal,.origin-band .reveal,.impact-section .reveal,.about-promise .reveal').forEach(el=>{requestAnimationFrame(()=>el.classList.add('visible'))});if(window.lucide)lucide.createIcons()}
function enhanceReviews(){
  // Remove leftover useless metric strips if CMS/old markup injects them
  document.querySelectorAll('.page-hero .metrics, .reviews-visual .metrics').forEach(el=>el.remove());
  const grid=document.getElementById('reviewsGrid')||document.querySelector('.reviews-grid');
  if(!grid) return;
  grid.classList.add('reviews-page-grid');
  // Ensure every card has a photo background image element
  const imgs=['images/hero-estate.webp','images/farm-story.webp','images/hero-reviews.webp','images/product-collection.webp','images/hero-about.webp','images/hero-products.webp','images/contact-hero.webp','images/footer-bg.webp'];
  grid.querySelectorAll('.review-card').forEach((card,i)=>{
    if(!card.querySelector('.review-bg')){
      const img=document.createElement('img');
      img.className='review-bg';
      img.src=imgs[i%imgs.length];
      img.alt='';
      card.prepend(img);
    }
    if(!card.querySelector('.review-content')){
      const wrap=document.createElement('div');
      wrap.className='review-content';
      [...card.children].forEach(ch=>{ if(!ch.classList.contains('review-bg')) wrap.appendChild(ch); });
      card.appendChild(wrap);
    }
    // Strip product/location clutter lines under names (keep verified only)
    card.querySelectorAll('.reviewer span:not(.verified)').forEach(s=>s.remove());
  });
  const search=document.querySelector('#reviewSearch');
  if(search && !search.dataset.bound){
    search.dataset.bound='1';
    search.addEventListener('input',e=>{
      const q=e.target.value.toLowerCase();
      grid.querySelectorAll('.review-card').forEach(c=>c.style.display=c.innerText.toLowerCase().includes(q)?'':'none');
    });
  }
  const form=document.querySelector('#reviewSubmit');
  if(form && !form.dataset.bound){
    form.dataset.bound='1';
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const ok=e.currentTarget.querySelector('.form-success');
      if(ok) ok.style.display='block';
      e.currentTarget.reset();
    });
  }
  if(window.lucide) lucide.createIcons();
}
document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('footer.footer').forEach(f=>{
  if(f.querySelector('.footer-bg')) return;
  const bg=document.createElement('div');
  bg.className='footer-bg';
  bg.setAttribute('aria-hidden','true');
  bg.innerHTML='<img src="images/footer-bg-new.webp" alt="">';
  f.prepend(bg);
 });
 applyAdminCMS();
 document.querySelectorAll('img').forEach(img=>{
  const src=img.getAttribute('src')||'';
  if(/^images\/.+\.png$/i.test(src)) img.setAttribute('src', src.replace(/\.png$/i,'.webp'));
  if(img.closest('.hero-media')){ img.setAttribute('fetchpriority','high'); img.decoding='async'; return; }
  if(!img.getAttribute('loading')) img.loading='lazy';
  img.decoding='async';
 });
 const adminLink=document.createElement('a');
 adminLink.className='admin-login-link';
 adminLink.href='admin-login.html';
 adminLink.textContent='Admin Login';
 const nav=document.querySelector('.navbar'),menu=document.querySelector('.menu-btn'),links=document.querySelector('.nav-links');
 const navRow=nav?.querySelector('.nav');
 if(menu&&navRow) navRow.insertBefore(adminLink, menu);
 else document.body.appendChild(adminLink);
 if(window.lucide) lucide.createIcons();
 const onScroll=()=>nav?.classList.toggle('scrolled',scrollY>35);onScroll();addEventListener('scroll',onScroll,{passive:true});
 const putLinksBack=()=>{
  if(!links||!navRow) return;
  const shopBtn=navRow.querySelector(':scope > .btn');
  navRow.insertBefore(links, shopBtn||adminLink||menu);
 };
 menu?.addEventListener('click',()=>{
  const open=!links.classList.contains('open');
  links.classList.toggle('open',open);
  document.body.classList.toggle('menu-open',open);
  menu.classList.toggle('open',open);
  if(open) document.body.appendChild(links);
  else putLinksBack();
 });
 links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  links.classList.remove('open');
  document.body.classList.remove('menu-open');
  menu?.classList.remove('open');
  putLinksBack();
 }));
 const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>obs.observe(x));
 initProductPagination();
 // Legacy filter (only if no product pagination on this page)
 if(!document.getElementById('productPagination')){
  document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.product-card[data-category]').forEach(c=>c.style.display=btn.dataset.filter==='all'||c.dataset.category===btn.dataset.filter?'':'none')}));
 }
 document.querySelectorAll('.faq-item').forEach(item=>item.querySelector('.faq-q')?.addEventListener('click',()=>{const open=item.classList.contains('open');document.querySelectorAll('.faq-item').forEach(x=>x.classList.remove('open'));if(!open)item.classList.add('open')}));
 document.querySelector('#contactForm')?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget),msg=`Hello CocoLanka!\n\nName: ${f.get('name')}\nPhone: ${f.get('phone')||'-'}\nEmail: ${f.get('email')}\nRegarding: ${f.get('subject')}\n\n${f.get('message')}`;e.currentTarget.querySelector('.form-success').style.display='block';window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,'_blank')});
 const contactHero=document.querySelector('#contactForm')?.closest('main')?.querySelector('.page-hero');
 if(contactHero){
  contactHero.classList.add('contact-visual');
  contactHero.insertAdjacentHTML('afterend',`<section class="contact-options"><div class="container contact-option-grid"><article class="contact-option reveal"><span class="icon-box"><i data-lucide="message-circle"></i></span><h3>Order on WhatsApp</h3><p>The quickest way to check stock, build an order and arrange delivery.</p><a class="text-link" href="https://wa.me/${WA_NUMBER}">Start a chat <i data-lucide="arrow-up-right"></i></a></article><article class="contact-option reveal"><span class="icon-box"><i data-lucide="gift"></i></span><h3>Gifts & hampers</h3><p>Thoughtful personal and corporate coconut hampers for every occasion.</p><a class="text-link" href="#contactForm">Plan a hamper <i data-lucide="arrow-down"></i></a></article><article class="contact-option reveal"><span class="icon-box"><i data-lucide="store"></i></span><h3>Wholesale partners</h3><p>Flexible supply for cafés, hotels, retailers and wellness businesses.</p><a class="text-link" href="#wholesale">Explore wholesale <i data-lucide="arrow-down"></i></a></article></div></section>`);
  const faqSection=document.querySelector('#faq');
  faqSection?.insertAdjacentHTML('beforebegin',`<section class="section products"><div class="container"><div class="section-head"><div><span class="eyebrow">Ordering made simple</span><h2 class="section-title">From message to doorstep.</h2></div><p class="lead">No complicated checkout. Our team personally confirms every detail before your order leaves us.</p></div><div class="order-steps"><article class="order-step reveal"><span class="order-number">1</span><h3>Choose your favourites</h3><p>Browse the collection and add products to your order basket.</p></article><article class="order-step reveal"><span class="order-number">2</span><h3>Send your order</h3><p>Share the prepared order summary with us through WhatsApp.</p></article><article class="order-step reveal"><span class="order-number">3</span><h3>We confirm details</h3><p>Our team checks availability, address, payment and delivery cost.</p></article><article class="order-step reveal"><span class="order-number">4</span><h3>Fresh to your door</h3><p>Your products are packed with care and delivered island-wide.</p></article></div></div></section><section class="section" id="wholesale"><div class="container"><div class="wholesale-panel reveal"><div class="wholesale-copy"><span class="eyebrow" style="color:#bed19f">Grow with CocoLanka</span><h2 class="section-title">Good products make good partnerships.</h2><p>Whether you run a boutique hotel, café, grocery store or wellness studio, we can create a dependable supply plan around your needs.</p><a class="btn btn-light" href="#contactForm">Request wholesale pricing <i data-lucide="arrow-right"></i></a></div><div class="wholesale-features"><div class="wholesale-feature"><i data-lucide="badge-percent"></i><div><strong>Volume pricing</strong><small>Flexible tiers based on product and quantity.</small></div></div><div class="wholesale-feature"><i data-lucide="calendar-check"></i><div><strong>Reliable supply</strong><small>Planned recurring deliveries for your business.</small></div></div><div class="wholesale-feature"><i data-lucide="package-check"></i><div><strong>Careful fulfilment</strong><small>Batch tracking and secure trade packaging.</small></div></div><div class="wholesale-feature"><i data-lucide="headphones"></i><div><strong>Personal support</strong><small>A direct contact for orders and questions.</small></div></div></div></div></div></section>`);
  contactHero.closest('main').querySelectorAll('.contact-options .reveal, .order-steps .reveal, .wholesale-panel.reveal').forEach(el=>obs.observe(el));
  if(window.lucide) lucide.createIcons();
 }
 const pageTitle=document.title;
 if(pageTitle.startsWith('Our Story')) document.querySelector('.page-hero')?.classList.add('about-visual');
 if(pageTitle.startsWith('Our Story')) enhanceAbout();
 if(pageTitle.startsWith('Customer Reviews')) document.querySelector('.page-hero')?.classList.add('reviews-visual');
 if(pageTitle.startsWith('Shop Coconut')) document.querySelector('.collection-hero')?.classList.add('products-visual');
 if(pageTitle.startsWith('Customer Reviews')) enhanceReviews();
 initCart();
 initWhatsAppChat();
});

function initWhatsAppChat(){
  if(document.querySelector('.wa-chat')) return;
  const phone=WA_NUMBER||'94766280198';
  const root=document.createElement('div');
  root.className='wa-chat';
  root.innerHTML=`
    <a class="wa-fab" href="https://wa.me/${phone}?text=${encodeURIComponent('Hi CocoLanka! I have a question.')}" target="_blank" rel="noopener" aria-label="Ask us on WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M19.11 17.53c-.28-.14-1.64-.81-1.9-.9s-.44-.14-.63.14-.72.9-.89 1.09-.33.21-.61.07a7.4 7.4 0 0 1-2.18-1.35 8.2 8.2 0 0 1-1.51-1.88c-.16-.28 0-.43.12-.57.12-.12.28-.33.42-.49s.19-.28.28-.47.05-.35-.02-.49-.63-1.51-.86-2.07c-.23-.54-.46-.47-.63-.47h-.54c-.19 0-.49.07-.75.35s-.98.96-.98 2.33.98 2.7 1.12 2.89 1.93 2.95 4.68 4.13a16 16 0 0 0 1.57.58 3.7 3.7 0 0 0 1.72.11c.52-.08 1.64-.67 1.87-1.32s.23-1.21.16-1.32-.25-.19-.53-.33zM16.02 4C9.39 4 4 9.38 4 16c0 2.25.63 4.36 1.72 6.17L4 28l5.98-1.57A11.93 11.93 0 0 0 16.02 28C22.65 28 28 22.62 28 16S22.65 4 16.02 4zm0 21.82a9.8 9.8 0 0 1-5-.137l-.36-.21-3.55.93.95-3.46-.23-.36a9.8 9.8 0 1 1 8.19 3.24z"/></svg>
      <span class="wa-tip">Ask us</span>
    </a>`;
  document.body.appendChild(root);
}

function initCart(){
  let cart=JSON.parse(localStorage.getItem('cocoCart')||'[]');

  document.querySelectorAll('.product-card').forEach(card=>{
    if(card.querySelector('.qty-stepper'))return;
    const meta=card.querySelector('.product-bottom');
    if(!meta)return;
    const stepper=document.createElement('div');
    stepper.className='qty-stepper';
    stepper.innerHTML='<button type="button" class="qty-btn qty-minus" aria-label="Decrease quantity">−</button><input type="number" class="qty-input" min="1" max="99" value="1" aria-label="Quantity"><button type="button" class="qty-btn qty-plus" aria-label="Increase quantity">+</button>';
    const addBtn=meta.querySelector('.add-btn');
    if(addBtn)meta.insertBefore(stepper,addBtn);
    const input=stepper.querySelector('.qty-input');
    stepper.querySelector('.qty-minus').addEventListener('click',e=>{e.preventDefault();e.stopPropagation();input.value=Math.max(1,(+input.value||1)-1)});
    stepper.querySelector('.qty-plus').addEventListener('click',e=>{e.preventDefault();e.stopPropagation();input.value=Math.min(99,(+input.value||1)+1)});
    input.addEventListener('change',()=>{let v=parseInt(input.value,10);if(isNaN(v)||v<1)v=1;if(v>99)v=99;input.value=v});
  });

  const fab=document.createElement('button');
  fab.className='cart-fab';
  fab.setAttribute('aria-label','Open order basket');
  fab.innerHTML='<i data-lucide="shopping-bag"></i><span class="cart-count">0</span>';
  const panel=document.createElement('aside');
  panel.className='cart-panel';
  panel.innerHTML='<div class="cart-head"><h3>Your order</h3><button class="close-cart" aria-label="Close">×</button></div><div class="cart-items"></div><div class="cart-total"><span>Total</span><span class="total-price">Rs. 0</span></div><button class="btn btn-primary checkout">Order on WhatsApp <i data-lucide="message-circle"></i></button>';
  document.body.append(fab,panel);
  if(window.lucide)lucide.createIcons();

  const render=()=>{
    localStorage.setItem('cocoCart',JSON.stringify(cart));
    fab.querySelector('.cart-count').textContent=cart.reduce((s,x)=>s+x.qty,0);
    const wrap=panel.querySelector('.cart-items');
    wrap.innerHTML=cart.length?cart.map((x,i)=>`
      <div class="cart-item">
        <div class="cart-item-info">
          <strong>${x.name}</strong>
          <small>Rs. ${x.price.toLocaleString()} each · <b>Rs. ${(x.price*x.qty).toLocaleString()}</b></small>
        </div>
        <div class="cart-item-actions">
          <div class="qty-stepper cart-qty">
            <button type="button" class="qty-btn qty-minus" data-i="${i}" aria-label="Decrease">−</button>
            <span class="qty-val">${x.qty}</span>
            <button type="button" class="qty-btn qty-plus" data-i="${i}" aria-label="Increase">+</button>
          </div>
          <button type="button" class="cart-remove" data-i="${i}">Remove</button>
        </div>
      </div>`).join(''):'<p class="empty">Your basket is ready for something good.</p>';
    panel.querySelector('.total-price').textContent='Rs. '+cart.reduce((s,x)=>s+x.price*x.qty,0).toLocaleString();

    wrap.querySelectorAll('.qty-minus').forEach(b=>b.onclick=()=>{
      const i=+b.dataset.i;
      if(cart[i].qty>1)cart[i].qty--;
      else cart.splice(i,1);
      render();
    });
    wrap.querySelectorAll('.qty-plus').forEach(b=>b.onclick=()=>{
      const i=+b.dataset.i;
      cart[i].qty=Math.min(99,cart[i].qty+1);
      render();
    });
    wrap.querySelectorAll('.cart-remove').forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.i,1);render()});
  };

  document.querySelectorAll('.add-btn').forEach(btn=>btn.addEventListener('click',()=>{
    const c=btn.closest('.product-card');
    const qtyInput=c.querySelector('.qty-input');
    const qty=Math.max(1,Math.min(99,parseInt(qtyInput&&qtyInput.value,10)||1));
    const found=cart.find(x=>x.name===c.dataset.name);
    if(found)found.qty=Math.min(99,found.qty+qty);
    else cart.push({name:c.dataset.name,price:+c.dataset.price,qty});
    if(qtyInput)qtyInput.value=1;
    render();
    panel.classList.add('open');
  }));

  fab.onclick=()=>panel.classList.add('open');
  panel.querySelector('.close-cart').onclick=()=>panel.classList.remove('open');
  panel.querySelector('.checkout').onclick=()=>{
    if(!cart.length)return;
    const lines=cart.map(x=>`• ${x.name} × ${x.qty} — Rs. ${(x.price*x.qty).toLocaleString()}`);
    const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello CocoLanka! I would like to order:\n\n'+lines.join('\n')+`\n\nTotal: Rs. ${total.toLocaleString()}\n\nPlease confirm delivery details.`)}`,'_blank');
  };
  render();
}

function initProductPagination(){
  const cards=[...document.querySelectorAll('#productGrid .product-card')];
  const pagination=document.getElementById('productPagination');
  if(!cards.length||!pagination) return;

  const PER_PAGE=12;
  let currentPage=1;
  let currentFilter='all';
  let currentQuery='';

  const pageBtns=[...pagination.querySelectorAll('[data-page]')];
  const prevBtn=pagination.querySelector('[data-page-nav="prev"]');
  const nextBtn=pagination.querySelector('[data-page-nav="next"]');
  const meta=document.getElementById('pageMeta');
  const search=document.getElementById('shopSearch');
  const clearBtn=document.getElementById('shopSearchClear');
  const empty=document.getElementById('shopEmpty');

  function filtered(){
    return cards.filter(c=>{
      const catOk=currentFilter==='all'||c.dataset.category===currentFilter;
      if(!catOk) return false;
      if(!currentQuery) return true;
      const hay=((c.dataset.name||'')+' '+(c.querySelector('h3')?.textContent||'')+' '+(c.querySelector('p')?.textContent||'')+' '+(c.querySelector('.tag')?.textContent||'')).toLowerCase();
      return hay.includes(currentQuery);
    });
  }

  function render(){
    const list=filtered();
    const totalPages=Math.max(1,Math.ceil(list.length/PER_PAGE));
    if(currentPage>totalPages) currentPage=totalPages;

    cards.forEach(c=>c.style.display='none');
    const start=(currentPage-1)*PER_PAGE;
    const pageItems=list.slice(start,start+PER_PAGE);
    pageItems.forEach(c=>c.style.display='');

    pageBtns.forEach(btn=>{
      const p=+btn.dataset.page;
      btn.classList.toggle('active',p===currentPage);
      btn.style.display=p<=totalPages?'':'none';
    });

    if(prevBtn) prevBtn.disabled=currentPage<=1;
    if(nextBtn) nextBtn.disabled=currentPage>=totalPages;

    if(meta){
      if(!list.length) meta.textContent=currentQuery?'No matches':'No products in this category';
      else{
        const from=start+1;
        const to=start+pageItems.length;
        meta.textContent=`Showing ${from}–${to} of ${list.length}`;
      }
    }
    if(empty) empty.hidden=!!list.length;
    if(pagination) pagination.style.display=list.length?'flex':'none';

    if(window.lucide) lucide.createIcons();
  }

  search?.addEventListener('input',()=>{
    currentQuery=search.value.trim().toLowerCase();
    if(clearBtn) clearBtn.hidden=!currentQuery;
    currentPage=1;
    render();
  });
  clearBtn?.addEventListener('click',(e)=>{
    e.preventDefault();
    if(search) search.value='';
    currentQuery='';
    clearBtn.hidden=true;
    currentPage=1;
    search?.focus();
    render();
  });

  document.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));
      btn.classList.add('active');
      currentFilter=btn.dataset.filter;
      currentPage=1;
      render();
    });
  });

  pageBtns.forEach(btn=>btn.addEventListener('click',()=>{
    currentPage=+btn.dataset.page;
    render();
    document.getElementById('collection')?.scrollIntoView({behavior:'smooth',block:'start'});
  }));

  prevBtn?.addEventListener('click',()=>{ if(currentPage>1){ currentPage--; render(); document.getElementById('collection')?.scrollIntoView({behavior:'smooth',block:'start'}); }});
  nextBtn?.addEventListener('click',()=>{
    const totalPages=Math.max(1,Math.ceil(filtered().length/PER_PAGE));
    if(currentPage<totalPages){ currentPage++; render(); document.getElementById('collection')?.scrollIntoView({behavior:'smooth',block:'start'}); }
  });

  // Replace the old filter-only handler by taking over visibility
  render();
}
