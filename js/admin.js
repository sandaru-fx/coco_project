if (sessionStorage.getItem("cocoAdmin") !== "true") location.href = "admin-login.html";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const uid = () => "id_" + Math.random().toString(36).slice(2, 10);
const DEFAULT_CONTACT = { phone: "076 628 0198", whatsapp: "94766280198", email: "hello@cocolanka.lk", address: "Matara, Sri Lanka", footer: "Pure coconut essentials, thoughtfully grown and crafted in Matara, Sri Lanka." };
const DEFAULT_SOCIAL = {
  facebook: "https://facebook.com/cocolanka",
  instagram: "https://instagram.com/cocolanka",
  tiktok: "",
  youtube: ""
};
const DEFAULT_AUTH = { email: "admin@cocolanka.lk", password: "admin123" };
function getAuth(){
  try{return {...DEFAULT_AUTH,...(JSON.parse(localStorage.getItem("cocoAdminAuth")||"{}"))}}
  catch{return {...DEFAULT_AUTH}}
}
function setAuth(auth){localStorage.setItem("cocoAdminAuth",JSON.stringify(auth))}
if(!localStorage.getItem("cocoAdminAuth")) setAuth(DEFAULT_AUTH);
const PRODUCT_IMAGE_MAP = {
  p1:"images/prod-virgin-oil.png", p2:"images/prod-oil-family.png", p3:"images/prod-milk.png", p4:"images/prod-water.png",
  p5:"images/prod-flour.png", p6:"images/prod-sugar.png", p7:"images/prod-evoo.png", p8:"images/prod-hair-oil.png",
  p9:"images/prod-milk-large.png", p10:"images/prod-king-water.png", p11:"images/prod-desiccated.png", p12:"images/prod-chips.png",
  p13:"images/prod-massage.png", p14:"images/prod-organic.png", p15:"images/prod-cream.png", p16:"images/prod-sparkling.png",
  p17:"images/prod-flour-large.png", p18:"images/prod-sugar.png", p19:"images/prod-vinegar.png", p20:"images/prod-butter.png",
  p21:"images/prod-cooking.png", p22:"images/prod-latte.png", p23:"images/prod-gift.png", p24:"images/prod-sampler.png"
};
const DEFAULT_PRODUCTS = [
  { id:"p1", title:"Virgin Coconut Oil", size:"500ml", price:850, category:"oil", tag:"Bestseller", description:"Cold-pressed below 45°C for a naturally delicate aroma.", image:"images/prod-virgin-oil.png", pos:"center" },
  { id:"p2", title:"Virgin Coconut Oil", size:"1L", price:1550, category:"oil", tag:"Family size", description:"The same pure cold-pressed oil in our family-sized bottle.", image:"images/prod-oil-family.png", pos:"center" },
  { id:"p3", title:"Creamy Coconut Milk", size:"400ml", price:320, category:"drink", tag:"Fresh batch", description:"Rich, smooth and made from carefully selected mature coconuts.", image:"images/prod-milk.png", pos:"center" },
  { id:"p4", title:"Young Coconut Water", size:"330ml", price:220, category:"drink", tag:"", description:"Clean, naturally refreshing hydration with no added sugar.", image:"images/prod-water.png", pos:"center" },
  { id:"p5", title:"Fine Coconut Flour", size:"500g", price:680, category:"pantry", tag:"Gluten free", description:"Lightly milled, naturally fibre-rich flour for everyday baking.", image:"images/prod-flour.png", pos:"center" },
  { id:"p6", title:"Coconut Blossom Sugar", size:"250g", price:590, category:"pantry", tag:"", description:"Soft caramel sweetness from coconut blossom nectar.", image:"images/prod-sugar.png", pos:"center" },
  { id:"p7", title:"Extra Virgin Coconut Oil", size:"250ml", price:520, category:"oil", tag:"", description:"Smaller bottle for kitchens that prefer to restock often.", image:"images/prod-evoo.png", pos:"center" },
  { id:"p8", title:"Coconut Hair Oil", size:"200ml", price:780, category:"oil", tag:"Care", description:"Nourishing oil for hair rituals and gentle scalp massage.", image:"images/prod-hair-oil.png", pos:"center" },
  { id:"p9", title:"Creamy Coconut Milk", size:"1L", price:720, category:"drink", tag:"", description:"Bigger pack for family cooking and weekend batch recipes.", image:"images/prod-milk-large.png", pos:"center" },
  { id:"p10", title:"King Coconut Water", size:"330ml", price:260, category:"drink", tag:"Hydrate", description:"Naturally sweet king coconut water, bottled fresh.", image:"images/prod-king-water.png", pos:"center" },
  { id:"p11", title:"Desiccated Coconut", size:"400g", price:640, category:"pantry", tag:"", description:"Fine dried coconut for baking, sweets and toppings.", image:"images/prod-desiccated.png", pos:"center" },
  { id:"p12", title:"Coconut Chips", size:"150g", price:450, category:"pantry", tag:"Snack", description:"Lightly toasted chips for snacking and breakfast bowls.", image:"images/prod-chips.png", pos:"center" },
  { id:"p13", title:"Massage Coconut Oil", size:"300ml", price:890, category:"oil", tag:"", description:"Silky oil made for calm evening massage rituals.", image:"images/prod-massage.png", pos:"center" },
  { id:"p14", title:"Organic Coconut Oil", size:"750ml", price:1280, category:"oil", tag:"Organic", description:"Certified organic cold-pressed oil for everyday cooking.", image:"images/prod-organic.png", pos:"center" },
  { id:"p15", title:"Coconut Cream", size:"200ml", price:380, category:"drink", tag:"", description:"Extra-rich cream for desserts, sauces and coffee.", image:"images/prod-cream.png", pos:"center" },
  { id:"p16", title:"Sparkling Coconut Water", size:"330ml", price:290, category:"drink", tag:"New", description:"Lightly sparkling coconut water for warm afternoons.", image:"images/prod-sparkling.png", pos:"center" },
  { id:"p17", title:"Fine Coconut Flour", size:"1kg", price:1190, category:"pantry", tag:"", description:"Bulk flour pack for bakers and busy family kitchens.", image:"images/prod-flour-large.png", pos:"center" },
  { id:"p18", title:"Coconut Blossom Sugar", size:"500g", price:980, category:"pantry", tag:"", description:"Larger jar of naturally sweet coconut blossom sugar.", image:"images/prod-sugar.png", pos:"center" },
  { id:"p19", title:"Coconut Vinegar", size:"375ml", price:540, category:"pantry", tag:"", description:"Naturally fermented vinegar with a bright, clean finish.", image:"images/prod-vinegar.png", pos:"center" },
  { id:"p20", title:"Coconut Butter", size:"250g", price:860, category:"pantry", tag:"", description:"Spreadable coconut butter for toast, smoothies and baking.", image:"images/prod-butter.png", pos:"center" },
  { id:"p21", title:"Cooking Coconut Oil", size:"2L", price:2650, category:"oil", tag:"Value", description:"Large cooking oil for restaurants and big households.", image:"images/prod-cooking.png", pos:"center" },
  { id:"p22", title:"Coconut Latte Mix", size:"200g", price:990, category:"drink", tag:"", description:"Creamy coconut latte blend for cafe-style mornings.", image:"images/prod-latte.png", pos:"center" },
  { id:"p23", title:"Coconut Gift Hamper", size:"set", price:3500, category:"pantry", tag:"Gift", description:"A curated gift set of CocoLanka favourites.", image:"images/prod-gift.png", pos:"center" },
  { id:"p24", title:"Coconut Sampler Box", size:"set", price:2100, category:"pantry", tag:"Try me", description:"Taste a little of everything before you commit.", image:"images/prod-sampler.png", pos:"center" }
];
const DEFAULT_REVIEWS = [
  { id:"r1", name:"Malini Perera", quote:"You can smell the freshness as soon as you open the bottle. We switched from supermarket oil six months ago and it has completely transformed our everyday cooking.", image:"images/hero-estate.png" },
  { id:"r2", name:"Kavindi Silva", quote:"The coconut milk is beautifully thick and makes my curries taste like they did at my grandmother's home in Matara.", image:"images/farm-story.png" },
  { id:"r3", name:"Dinuka Nimal", quote:"Ordering on WhatsApp was effortless. I sent my list in the morning and everything arrived carefully packed the next day.", image:"images/hero-reviews.png" },
  { id:"r4", name:"Shalini Fernando", quote:"I sent the gift hamper to my parents for their anniversary. The presentation felt genuinely premium.", image:"images/product-collection.png" },
  { id:"r5", name:"Amaya Perera", quote:"I use the virgin oil for both cooking and hair care. Clean, fragrant and noticeably better than other brands.", image:"images/hero-about.png" },
  { id:"r6", name:"Rashmi Jayasuriya", quote:"The flour is finely milled and excellent for my gluten-free baking. This is now a pantry staple.", image:"images/hero-products.png" },
  { id:"r7", name:"Tharindu Silva", quote:"We run a small cafe and switched to CocoLanka milk. Guests noticed the creamier texture immediately.", image:"images/contact-hero.png" },
  { id:"r8", name:"Nimesha Cooray", quote:"The king coconut water is so refreshing after gym sessions. No sugar added, no strange aftertaste.", image:"images/footer-bg.png" },
  { id:"r9", name:"Isuru Bandara", quote:"As a hotel buyer, reliability matters. CocoLanka delivers on time and quality stays consistent.", image:"images/farm-story.png" },
  { id:"r10", name:"Sanduni Wickramasinghe", quote:"The coconut blossom sugar was perfect in coffee — soft caramel notes without harsh refined sugar.", image:"images/hero-estate.png" },
  { id:"r11", name:"Chamath Perera", quote:"Bought the sampler box first. Every product felt carefully made — especially the butter and chips.", image:"images/product-collection.png" },
  { id:"r12", name:"Dilani Fernando", quote:"Customer care is genuine. I asked about wholesale pricing and got a clear quote the same afternoon.", image:"images/hero-reviews.png" }
];
function loadStore(){const raw=JSON.parse(localStorage.getItem("cocoCMS")||"{}");if(!Array.isArray(raw.products)||!raw.products.length)raw.products=JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));if(!Array.isArray(raw.reviews)||!raw.reviews.length)raw.reviews=JSON.parse(JSON.stringify(DEFAULT_REVIEWS));raw.contact={...DEFAULT_CONTACT,...(raw.contact||{})};raw.social={...DEFAULT_SOCIAL,...(raw.social||{})};if(raw.imgVer!==2 && Array.isArray(raw.products)){raw.products.forEach(p=>{const next=PRODUCT_IMAGE_MAP[p.id];const img=String(p.image||"");if(next&&(!img||/product-collection|hero-estate|hero-products/.test(img))){p.image=next;p.pos="center"}});raw.imgVer=2;try{localStorage.setItem("cocoCMS",JSON.stringify(raw))}catch{}}return raw}
let store=loadStore(),drawerMode=null,editId=null;
function persist(msg){localStorage.setItem("cocoCMS",JSON.stringify(store));toast(msg||"Changes saved");refreshAll()}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function showView(name){$$(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.view===name));$$(".view").forEach(v=>v.classList.toggle("active",v.id==="view-"+name));const titles={dashboard:"Dashboard",products:"Products",reviews:"Reviews",contact:"Contact",social:"Social links",account:"Account"};$("#pageTitle").textContent=titles[name]||"Admin";$(".side")?.classList.remove("open");if(name==="contact")fillContact();if(name==="social")fillSocial();if(name==="account")fillAccount();if(name==="products")renderProducts();if(name==="reviews")renderReviews()}
function refreshAll(){$("#statProducts").textContent=store.products.length;$("#statReviews").textContent=store.reviews.length;$("#navProductCount").textContent=store.products.length;$("#navReviewCount").textContent=store.reviews.length;renderProducts();renderReviews()}
function openDrawer(title,eyebrow,html){$("#drawerTitle").textContent=title;$("#drawerEyebrow").textContent=eyebrow;$("#drawerForm").innerHTML=html;$("#drawer").classList.add("open");$("#drawerBackdrop").classList.add("open");bindImageUpload()}
function closeDrawer(){$("#drawer").classList.remove("open");$("#drawerBackdrop").classList.remove("open");drawerMode=null;editId=null}
function escapeHtml(str){return String(str||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function escapeAttr(str){return escapeHtml(str).replace(/'/g,"&#39;")}
function imageUploadBlock(src,label){
  const has=!!src;
  const safe=escapeAttr(src||"");
  const pathOnly=src&&!String(src).startsWith("data:")?safe:"";
  return `<div class="full upload-card">
    <div class="upload-preview ${has?"has-img":""}" id="imgPreview" style="${has?`background-image:url('${safe.replace(/'/g,"%27")}')`:""}">${has?"":"No image yet"}</div>
    <div class="upload-actions">
      <input type="file" id="imgFile" accept="image/jpeg,image/png,image/webp">
      <button type="button" class="btn-ghost" id="clearImg" ${has?"":"hidden"}>Remove photo</button>
    </div>
    <input type="hidden" name="image" id="imageValue" value="${safe}">
    <label style="margin-top:10px">Or paste image path / URL
      <input type="text" id="imagePath" value="${pathOnly}" placeholder="images/hero-estate.png">
    </label>
    <span class="upload-hint">${label||"Upload JPG, PNG or WebP under 1.5 MB. Preview updates instantly."}</span>
  </div>`;
}
function bindImageUpload(){
  const file=$("#imgFile"),preview=$("#imgPreview"),hidden=$("#imageValue"),path=$("#imagePath"),clear=$("#clearImg");
  if(!file||!hidden)return;
  const setPreview=(src)=>{
    hidden.value=src||"";
    if(src){preview.style.backgroundImage=`url("${src.replace(/"/g,'\\"')}")`;preview.classList.add("has-img");preview.textContent="";if(clear)clear.hidden=false}
    else{preview.style.backgroundImage="";preview.classList.remove("has-img");preview.textContent="No image yet";if(clear)clear.hidden=true}
  };
  file.onchange=e=>{
    const f=e.target.files&&e.target.files[0];
    if(!f)return;
    if(f.size>1.5*1024*1024){alert("Please choose an image under 1.5 MB so it can save in this browser.");file.value="";return}
    const reader=new FileReader();
    reader.onload=()=>{setPreview(reader.result);if(path)path.value=""};
    reader.readAsDataURL(f);
  };
  if(path)path.oninput=()=>{const v=path.value.trim();if(v)setPreview(v)};
  if(clear)clear.onclick=()=>{file.value="";if(path)path.value="";setPreview("")};
}
function renderProducts(){const q=($("#productSearch")?.value||"").toLowerCase();const list=store.products.filter(p=>(p.title+" "+p.size+" "+p.category+" "+(p.tag||"")).toLowerCase().includes(q));const wrap=$("#productRows");if(!list.length){wrap.innerHTML='<div class="empty-state">No products found. Add your first product.</div>';return}wrap.innerHTML=list.map(p=>`<div class="row product-cols"><div class="prod-cell"><img class="prod-thumb" src="${p.image||"images/product-collection.png"}" alt=""><div><strong>${escapeHtml(p.title)}</strong><small>${escapeHtml(p.size||"")}${p.tag?" · "+escapeHtml(p.tag):""}</small></div></div><div><span class="pill">${escapeHtml(p.category||"pantry")}</span></div><div class="price-cell">Rs. ${Number(p.price||0).toLocaleString()}</div><div class="actions"><button type="button" class="btn-ghost" data-edit-product="${p.id}">Edit</button><button type="button" class="btn-danger" data-del-product="${p.id}">Delete</button></div></div>`).join("");$$("[data-edit-product]").forEach(b=>b.onclick=()=>editProduct(b.dataset.editProduct));$$("[data-del-product]").forEach(b=>b.onclick=()=>{if(!confirm("Delete this product?"))return;store.products=store.products.filter(p=>p.id!==b.dataset.delProduct);persist("Product deleted")})}
function productFormFields(p={}){return `<label>Title<input name="title" value="${escapeAttr(p.title||"")}" required></label><label>Size / unit<input name="size" value="${escapeAttr(p.size||"")}" placeholder="500ml" required></label><label>Price (Rs.)<input name="price" type="number" min="0" value="${p.price??""}" required></label><label>Category<select name="category"><option value="oil" ${p.category==="oil"?"selected":""}>Oils</option><option value="drink" ${p.category==="drink"?"selected":""}>Milk & water</option><option value="pantry" ${p.category==="pantry"||!p.category?"selected":""}>Pantry</option></select></label><label class="full">Badge / tag<input name="tag" value="${escapeAttr(p.tag||"")}" placeholder="Bestseller"></label><label class="full">Description<textarea name="description" rows="3">${escapeHtml(p.description||"")}</textarea></label>${imageUploadBlock(p.image||"images/product-collection.png","Upload a product photo or keep an images/ path.")}<div class="drawer-actions full"><button type="button" class="btn-ghost" id="cancelDrawer">Cancel</button><button type="submit" class="btn-primary">Save product</button></div>`}
function editProduct(id){const p=store.products.find(x=>x.id===id);if(!p)return;drawerMode="product";editId=id;openDrawer(p.title,"Edit product",productFormFields(p));$("#cancelDrawer").onclick=closeDrawer}
function addProduct(){drawerMode="product";editId=null;openDrawer("New product","Add product",productFormFields({image:"images/product-collection.png",category:"oil"}));$("#cancelDrawer").onclick=closeDrawer}
function renderReviews(){const q=($("#reviewSearch")?.value||"").toLowerCase();const list=store.reviews.filter(r=>(r.name+" "+r.quote).toLowerCase().includes(q));const wrap=$("#reviewRows");if(!list.length){wrap.innerHTML='<div class="empty-state">No reviews yet. Add a customer story.</div>';return}wrap.innerHTML=list.map(r=>`<div class="row review-cols"><div class="review-cell prod-cell"><img class="prod-thumb" src="${r.image||"images/hero-estate.png"}" alt=""><div><strong>${escapeHtml(r.name)}</strong><small>Verified customer</small></div></div><div class="quote-snip">“${escapeHtml(r.quote)}”</div><div class="actions"><button type="button" class="btn-ghost" data-edit-review="${r.id}">Edit</button><button type="button" class="btn-danger" data-del-review="${r.id}">Delete</button></div></div>`).join("");$$("[data-edit-review]").forEach(b=>b.onclick=()=>editReview(b.dataset.editReview));$$("[data-del-review]").forEach(b=>b.onclick=()=>{if(!confirm("Delete this review?"))return;store.reviews=store.reviews.filter(r=>r.id!==b.dataset.delReview);persist("Review deleted")})}
function reviewFormFields(r={}){return `<label class="full">Customer name<input name="name" value="${escapeAttr(r.name||"")}" required></label><label class="full">Quote<textarea name="quote" rows="5" required>${escapeHtml(r.quote||"")}</textarea></label>${imageUploadBlock(r.image||"images/hero-estate.png","Upload a customer photo for the review background.")}<div class="drawer-actions full"><button type="button" class="btn-ghost" id="cancelDrawer">Cancel</button><button type="submit" class="btn-primary">Save review</button></div>`}
function editReview(id){const r=store.reviews.find(x=>x.id===id);if(!r)return;drawerMode="review";editId=id;openDrawer(r.name,"Edit review",reviewFormFields(r));$("#cancelDrawer").onclick=closeDrawer}
function addReview(){drawerMode="review";editId=null;openDrawer("New review","Add review",reviewFormFields({image:"images/hero-estate.png"}));$("#cancelDrawer").onclick=closeDrawer}
function fillContact(){const c=store.contact;$("#cPhone").value=c.phone||"";$("#cWhatsapp").value=c.whatsapp||"";$("#cEmail").value=c.email||"";$("#cAddress").value=c.address||"";$("#cFooter").value=c.footer||""}
function fillSocial(){const s=store.social||DEFAULT_SOCIAL;$("#sFacebook").value=s.facebook||"";$("#sInstagram").value=s.instagram||"";$("#sTiktok").value=s.tiktok||"";$("#sYoutube").value=s.youtube||""}
function fillAccount(){const a=getAuth();$("#aEmail").value=a.email||DEFAULT_AUTH.email;$("#aPassword").value="";$("#aPassword2").value="";if($("#accountHint"))$("#accountHint").textContent="Demo default: "+DEFAULT_AUTH.email+" · "+DEFAULT_AUTH.password+"  |  Current email: "+(a.email||DEFAULT_AUTH.email)}
$$(".nav-btn").forEach(b=>b.onclick=()=>showView(b.dataset.view));
$$("[data-jump]").forEach(b=>b.onclick=()=>showView(b.dataset.jump));
$("#menuToggle").onclick=()=>$(".side").classList.toggle("open");
$("#logoutBtn").onclick=()=>{sessionStorage.removeItem("cocoAdmin");location.href="admin-login.html"};
$("#saveBtn").onclick=()=>persist("All changes saved");
$("#closeDrawer").onclick=closeDrawer;
$("#drawerBackdrop").onclick=closeDrawer;
$("#addProductBtn").onclick=addProduct;
$("#addReviewBtn").onclick=addReview;
$("#productSearch").oninput=renderProducts;
$("#reviewSearch").oninput=renderReviews;
$("#drawerForm").onsubmit=e=>{e.preventDefault();const fd=new FormData(e.currentTarget);const image=($("#imageValue")?.value||String(fd.get("image")||"")).trim();if(drawerMode==="product"){const item={id:editId||uid(),title:String(fd.get("title")||"").trim(),size:String(fd.get("size")||"").trim(),price:Number(fd.get("price"))||0,category:String(fd.get("category")||"pantry"),tag:String(fd.get("tag")||"").trim(),description:String(fd.get("description")||"").trim(),image:image||"images/product-collection.png",pos:"50% center"};if(editId){const i=store.products.findIndex(p=>p.id===editId);if(i>=0)store.products[i]={...store.products[i],...item}}else store.products.unshift(item);persist(editId?"Product updated":"Product added")}if(drawerMode==="review"){const item={id:editId||uid(),name:String(fd.get("name")||"").trim(),quote:String(fd.get("quote")||"").trim(),image:image||"images/hero-estate.png"};if(editId){const i=store.reviews.findIndex(r=>r.id===editId);if(i>=0)store.reviews[i]={...store.reviews[i],...item}}else store.reviews.unshift(item);persist(editId?"Review updated":"Review added")}closeDrawer()};
$("#contactForm").onsubmit=e=>{e.preventDefault();store.contact={phone:$("#cPhone").value.trim(),whatsapp:$("#cWhatsapp").value.trim().replace(/\D/g,""),email:$("#cEmail").value.trim(),address:$("#cAddress").value.trim(),footer:$("#cFooter").value.trim()};persist("Contact details saved")};
$("#resetContactBtn").onclick=()=>{if(!confirm("Reset contact details to defaults?"))return;store.contact={...DEFAULT_CONTACT};fillContact();persist("Contact reset")};
$("#socialForm").onsubmit=e=>{e.preventDefault();store.social={facebook:$("#sFacebook").value.trim(),instagram:$("#sInstagram").value.trim(),tiktok:$("#sTiktok").value.trim(),youtube:$("#sYoutube").value.trim()};persist("Social links saved")};
$("#resetSocialBtn").onclick=()=>{if(!confirm("Reset social links to defaults?"))return;store.social={...DEFAULT_SOCIAL};fillSocial();persist("Social links reset")};
$("#accountForm").onsubmit=e=>{
  e.preventDefault();
  const email=$("#aEmail").value.trim();
  const p1=$("#aPassword").value;
  const p2=$("#aPassword2").value;
  if(!email){alert("Email is required.");return}
  const current=getAuth();
  if(p1||p2){
    if(p1.length<4){alert("Password must be at least 4 characters.");return}
    if(p1!==p2){alert("Passwords do not match.");return}
    setAuth({email,password:p1});
  }else{
    setAuth({email,password:current.password||DEFAULT_AUTH.password});
  }
  fillAccount();
  toast("Account updated. Use the new login next time.");
};
$("#resetAccountBtn").onclick=()=>{if(!confirm("Reset login back to demo email/password?"))return;setAuth({...DEFAULT_AUTH});fillAccount();toast("Demo login restored")};
localStorage.setItem("cocoCMS",JSON.stringify(store));
refreshAll();
showView("dashboard");
