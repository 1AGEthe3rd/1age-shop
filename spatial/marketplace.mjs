// Fictional catalog: no real seller, availability, prices, checkout or order.
export const categories=['Clothing','Home and living','Art and design','Digital products','3D assets','Games','Collectibles','Food and specialty'];
export const examples=[
 {id:'physical-shirt',title:'Everyday cotton shirt',category:'Clothing',kind:'Physical',delivery:'Shipping'},
 {id:'physical-ceramic',title:'Handmade ceramic vessel',category:'Home and living',kind:'Physical',delivery:'Local pickup'},
 {id:'digital-print',title:'Digital illustration pack',category:'Art and design',kind:'Digital',delivery:'Digital delivery'},
 {id:'digital-model',title:'Modular storefront model',category:'3D assets',kind:'Digital',delivery:'Digital delivery'},
 {id:'physical-food',title:'Specialty coffee sampler',category:'Food and specialty',kind:'Physical',delivery:'Local pickup'},
 {id:'digital-game',title:'Original game soundtrack',category:'Games',kind:'Digital',delivery:'Digital delivery'}
];
export function filterCatalog(category='All',kind='All',delivery='All'){return examples.filter(x=>(category==='All'||x.category===category)&&(kind==='All'||x.kind===kind)&&(delivery==='All'||x.delivery===delivery));}
export function mountMarketplace(host,group){
 const root=document.createElement('section');host.append(root);
 const make=(tag,t,parent=root)=>{const e=document.createElement(tag);e.textContent=t;parent.append(e);return e;};
 const button=(label,fn,parent=root)=>{const b=make('button',label,parent);b.type='button';b.addEventListener('click',fn);return b;};
 const choose=(label,options,parent=root)=>{const l=make('label',label,parent);l.className='shop-field';const s=make('select','',l);for(const v of options)s.add(new Option(v,v));return s;};
 const note=t=>{const p=make('p',t);p.className='shop-note';};
 const link=(label,url)=>{const a=make('a',label);a.href=url;return a;};
 if(['market','physical','digital'].includes(group)){
 note('Illustrative products only. No real offers, prices or availability.');
 const category=choose('Category',['All',...categories]),kind=choose('Product type',['All','Physical','Digital']),delivery=choose('Fulfillment',['All','Shipping','Local pickup','Digital delivery']),results=make('div','');
 if(group==='physical')kind.value='Physical';if(group==='digital')kind.value='Digital';
 function render(){results.replaceChildren();const rows=filterCatalog(category.value,kind.value,delivery.value);for(const x of rows){const card=make('article','',results);card.className='mission-card';make('strong',x.title,card);make('p',[x.category,x.kind,x.delivery].join(' · '),card);const buy=button('Purchasing unavailable',()=>{},card);buy.disabled=true;}if(!rows.length)make('p','No matching example products.',results);}
 for(const x of [category,kind,delivery])x.addEventListener('change',render);render();
 }else if(group==='seller'){
 note('Open to conventional businesses and digital creators alike. Local listing preview only. Use fictional details.');
 const form=make('form','');form.autocomplete='off';
 const field=(label,tag='input')=>{const l=make('label',label,form);l.className='shop-field';const x=make(tag,'',l);x.required=true;x.maxLength=tag==='textarea'?600:100;return x;};
 const name=field('Example product name'),seller=field('Fictional business'),category=choose('Category',categories,form),kind=choose('Type',['Physical','Digital'],form),delivery=choose('Fulfillment',['Shipping','Local pickup','Digital delivery'],form),description=field('Example description','textarea');
 const result=make('p','');result.setAttribute('role','status');
 button('Preview locally',()=>{if(!form.reportValidity())return;if((kind.value==='Digital')!==(delivery.value==='Digital delivery')){result.textContent='Choose a fulfillment method that matches the product type.';return;}result.textContent=[name.value,seller.value,category.value,kind.value,delivery.value,description.value].join(' · ')+' — fictional listing, not published.';},form);
 form.addEventListener('submit',e=>e.preventDefault());const publish=button('Publish unavailable',()=>{},form);publish.disabled=true;
 note('Future seller verification, product policy, inventory, refunds, fulfillment and tax configuration must be implemented before publication.');
 }else{
 note('Future participating storefronts will connect verified business records, physical locations and product catalogs. No property ownership or merchant partnership is implied.');
 link('Explore Portland HQ1','https://1age.space/hq1/');link('Explore Washington, D.C. HQ2','https://1age.space/hq2/');link('Explore Space','https://1age.space/');
 note('Physical pickup and shipping require seller agreement and verified availability. No checkout or payment processing is enabled.');
 }
}
