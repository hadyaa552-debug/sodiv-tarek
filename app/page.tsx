"use client";
import{useState,useEffect,useRef,FormEvent}from"react";
import{useRouter}from"next/navigation";

/* ═══ CONFIG ═══ */
const P="01055887184",PD="0105 588 7184",PI="+201055887184",WN="201055887184";
const WM="مرحباً، أريد الاستفسار عن جون سوديك الساحل الشمالي — June SODIC North Coast";
const WU=`https://wa.me/${WN}?text=${encodeURIComponent(WM)}`;
const WK="87941d29-7cba-46b1-9fa9-1493f4d29302";

/* ═══ TRACKING — أضف أكوادك هنا ═══ */
function trackCall(l="call"){if(typeof window!=="undefined"&&(window as any).gtag)(window as any).gtag("event","click_call",{event_category:"contact",event_label:l});}
function trackWA(l="whatsapp"){if(typeof window!=="undefined"&&(window as any).gtag)(window as any).gtag("event","click_whatsapp",{event_category:"contact",event_label:l});}
function trackLead(l="form"){if(typeof window!=="undefined"&&(window as any).gtag)(window as any).gtag("event","generate_lead",{event_category:"lead",event_label:l});}

/* ═══ IMAGES (CDN) ═══ */
const I={
  hero:"https://arro-consultancy.com/uploads/2026-05-07-151055-69fc814f9a80d.jpg",
  villa:"https://arro-consultancy.com/uploads/2026-05-07-151055-69fc814fb651a.jpg",
  chalet:"https://arro-consultancy.com/uploads/2026-05-07-151055-69fc814fad0aa.jpg",
  town:"https://arro-consultancy.com/uploads/2026-05-07-151055-69fc814f91076.jpg",
  twin:"https://arro-consultancy.com/uploads/2026-05-07-151055-69fc814fa42ba.jpg",
  beach:"https://arro-consultancy.com/uploads/2026-05-07-151055-69fc814fbd819.jpg",
  aerial:"https://arro-consultancy.com/uploads/2026-05-07-151055-69fc814fc83e8.jpg",
  pool:"https://arro-consultancy.com/uploads/2026-05-07-151055-69fc814fc32a2.jpg",
  life:"https://arro-consultancy.com/uploads/2026-05-07-151055-69fc814fd4337.jpg",
};

type UT="all"|"chalet"|"town"|"twin"|"villa";
const UNITS=[
  {t:"chalet"as UT,tl:"شاليه",n:"شاليهات جون سوديك",en:"June SODIC Chalets",p:"من ١٦.٩ مليون",area:"٧٦–١٠٦ م²",specs:["إطلالة بحر أو بحيرات","٥٪ مقدم","تسليم ٢٠٢٧–٢٠٢٩"],img:I.chalet},
  {t:"town"as UT,tl:"تاون هاوس",n:"تاون هاوس جون سوديك",en:"June SODIC Townhouses",p:"من ٢٠.٨ مليون",area:"من ٢٢٢ م²",specs:["حديقة خاصة","تصميم ميامي","تقسيط ١٠ سنوات"],img:I.town},
  {t:"twin"as UT,tl:"توين فيلا",n:"توين فيلا جون سوديك",en:"June SODIC Twin Villa",p:"من ٣١ مليون",area:"من ٢٤٠ م²",specs:["مساحة أرضية واسعة","فيو مباشر","خصوصية عالية"],img:I.twin},
  {t:"villa"as UT,tl:"فيلا مستقلة",n:"فيلات جون سوديك",en:"June SODIC Standalone Villa",p:"من ٣١.٩ مليون",area:"من ٢٥٧ م²",specs:["بحر مباشر","روف خاص","أرض واسعة"],img:I.villa},
];
const FAQS=[
  {q:"أين يقع جون سوديك — June SODIC الساحل الشمالي؟",a:"جون سوديك الساحل الشمالي — June SODIC North Coast يقع عند الكيلو ١٩٣ طريق إسكندرية–مطروح في قلب راس الحكمة. مشروع سوديك SODIC الأضخم على الساحل."},
  {q:"ما أنواع وحدات جون سوديك المتاحة؟",a:"شاليهات (٧٦–١٠٦ م²)، تاون هاوس (من ٢٢٢ م²)، توين فيلا، وفيلات مستقلة (من ٢٥٧ م²). June SODIC يوفر تشكيلة كاملة بتصميم ميامي."},
  {q:"كم أسعار جون سوديك — June SODIC؟",a:"شاليهات من ١٦.٩ مليون، تاون هاوس من ٢٠.٨ مليون، فيلات من ٣١.٩ مليون. أسعار سوديك SODIC استرشادية وقابلة للتحديث."},
  {q:"ما خطة سداد June SODIC — جون سوديك الساحل الشمالي؟",a:"٥٪ مقدم فقط مع تقسيط حتى ١٠ سنوات. عرض الذكرى ٣٠ لسوديك: ١.٥٪ مقدم فقط!"},
  {q:"ما مساحة مشروع جون سوديك — June SODIC؟",a:"٢٨٠ فدان في راس الحكمة. ٨٥٪ مساحات خضراء ومرافق و١٥٪ فقط مباني. SODIC مدرجة في البورصة المصرية منذ ١٩٩٦."},
  {q:"متى تسليم جون سوديك الساحل الشمالي؟",a:"التسليم خلال ٢٠٢٧–٢٠٢٩ حسب المرحلة. June SODIC North Coast من أقرب مواعيد التسليم في راس الحكمة."},
];
const NAV=[["#about","عن المشروع"],["#units","الوحدات"],["#payment","السداد"],["#gallery","المعرض"],["#amenities","المرافق"],["#contact","احجز الآن"]];
const PhI=()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const Chv=()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>;

export default function Home(){
  const router=useRouter();
  const[uf,sUf]=useState<UT>("all");const[fq,sFq]=useState<number|null>(null);const[mn,sMn]=useState(false);
  const[fs,sFs]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const[pop,sPop]=useState(false);const[ps,sPs]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const[ck,sCk]=useState(false);const[prv,sPrv]=useState(false);
  const pr=useRef(false);const fr=useRef<HTMLFormElement>(null);const pfr=useRef<HTMLFormElement>(null);

  useEffect(()=>{
    document.querySelectorAll(".fin").forEach(el=>{new IntersectionObserver(([e])=>{if(e.isIntersecting)e.target.classList.add("vis")},{threshold:.1}).observe(el)});
    try{if(!localStorage.getItem("js_ck"))sCk(true)}catch{sCk(true)}
  },[]);
  useEffect(()=>{
    if(pr.current)return;
    const os=()=>{if(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)>=.55)go()};
    const t=setTimeout(()=>go(),16000);window.addEventListener("scroll",os,{passive:true});
    function go(){if(pr.current)return;pr.current=true;sPop(true);document.body.classList.add("p-on");window.removeEventListener("scroll",os);clearTimeout(t)}
    return()=>{window.removeEventListener("scroll",os);clearTimeout(t)};
  },[]);
  const fl=uf==="all"?UNITS:UNITS.filter(u=>u.t===uf);
  function cp(){sPop(false);document.body.classList.remove("p-on")}
  async function sub(r:React.RefObject<HTMLFormElement|null>,ss:(s:any)=>void,src:string){
    if(!r.current)return;ss("sending");const fd=new FormData(r.current);const pl:Record<string,string>={};fd.forEach((v,k)=>pl[k]=v.toString());
    try{const res=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(pl)});
    const d=await res.json();if(d.success){ss("sent");trackLead(src);r.current.reset();if(src==="main_form")setTimeout(()=>router.push("/thank-you"),800)}else throw 0}catch{ss("error")}
  }

  return(<>
    {/* HEADER */}
    <header className="hd" style={{background:"rgba(28,28,30,.97)"}}><div className="hd-in">
      <a className="hd-logo" href="#hero"><div><div className="hd-logo-t">JUNE SODIC</div><div className="hd-logo-s">جون سوديك · الساحل الشمالي</div></div></a>
      <nav className="hd-nav">{NAV.map(([h,l])=><a key={h} href={h}>{l}</a>)}</nav>
      <div className="hd-acts"><a className="hd-call" href={`tel:${PI}`} onClick={()=>trackCall("header")}><PhI/><span>{PD}</span></a><a className="hd-reg" href="#contact">سجل اهتمامك</a><button className="hd-mob" onClick={()=>sMn(!mn)}>☰</button></div>
    </div>{mn&&<div style={{background:"#111",padding:"10px 20px"}}>{NAV.map(([h,l])=><a key={h} href={h} onClick={()=>sMn(false)} style={{display:"block",padding:"9px 0",color:"rgba(255,255,255,.65)",textDecoration:"none",fontSize:"13px",borderBottom:"1px solid rgba(255,255,255,.03)"}}>{l}</a>)}</div>}</header>

    {/* HERO */}
    <section className="hero" id="hero"><div className="hero-bg"><img src={I.hero} alt="جون سوديك الساحل الشمالي — June SODIC North Coast راس الحكمة"/><div className="hero-ov"/></div>
    <div className="hero-ct">
      <span className="hero-tag">SODIC Developments · سوديك للتطوير العقاري</span>
      <h1 className="hero-h">جون <em>سوديك</em><br/>June <em>SODIC</em></h1>
      <p className="hero-p">جون سوديك الساحل الشمالي — June SODIC North Coast أيقونة سوديك في قلب راس الحكمة. ٢٨٠ فدان بتصميم ميامي العالمي عند الكيلو ١٩٣. SODIC — ٣٠ سنة من التميز.</p>
      <p className="hero-kw">جون سوديك · June SODIC · سوديك الساحل الشمالي · SODIC North Coast · جون سوديك راس الحكمة</p>
      <div className="hero-stats">
        <div className="hero-st"><strong>٢٨٠ فدان</strong><span>مساحة المشروع</span></div>
        <div className="hero-st"><strong>٥٪ مقدم</strong><span>أو ١.٥٪ فقط</span></div>
        <div className="hero-st"><strong>١٠ سنوات</strong><span>تقسيط مريح</span></div>
        <div className="hero-st"><strong>كيلو ١٩٣</strong><span>راس الحكمة</span></div>
      </div>
      <div className="hero-btns">
        <a className="b-gold" href="#contact">احجز وحدتك الآن</a>
        <a className="b-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("hero")}>💬 واتساب</a>
        <a className="b-ghost" href="#units">استكشف الوحدات</a>
      </div>
    </div></section>

    {/* TRUST */}
    <div className="trust"><div className="trust-in">
      <div className="trust-i"><strong>٢٨٠</strong> فدان</div><div className="trust-i"><strong>٨٥٪</strong> خضرة ومرافق</div>
      <div className="trust-i"><strong>٥٪</strong> مقدم</div><div className="trust-i"><strong>١٠</strong> سنوات</div><div className="trust-i"><strong>١٩٩٦</strong> سوديك بالبورصة</div>
    </div></div>

    {/* ABOUT */}
    <section className="sec about" id="about"><div className="sec-in">
      <div className="fin" style={{textAlign:"center"}}><span className="sec-tag">June SODIC · جون سوديك</span>
        <h2 className="sec-h" style={{textAlign:"center"}}>عن <em>جون سوديك</em> الساحل الشمالي</h2>
        <p className="sec-p c">جون سوديك — June SODIC North Coast أيقونة سوديك SODIC في راس الحكمة عند الكيلو ١٩٣. ٢٨٠ فدان بتصميم مستوحى من ميامي، ٨٥٪ مساحات خضراء ومرافق. شاليهات وفيلات وتاون هاوس بإطلالات بحرية ساحرة.</p>
      </div>
      <div className="about-grid fin">
        <div className="about-img"><img src={I.beach} alt="جون سوديك الساحل الشمالي شاطئ — June SODIC Beach"/></div>
        <div className="about-pts">
          {[{i:"🏖",t:"٢٨٠ فدان في راس الحكمة",d:"جون سوديك عند الكيلو ١٩٣ — June SODIC North Coast"},{i:"🎨",t:"تصميم مستوحى من ميامي",d:"عمارة عالمية تجمع بين الأناقة والطبيعة — سوديك SODIC"},{i:"🌊",t:"شاطئ خاص + بحيرات",d:"شاطئ رملي أبيض وبحيرات كريستالية في جون سوديك"},{i:"📊",t:"سوديك — ٣٠ سنة في البورصة",d:"SODIC مدرجة بالبورصة المصرية منذ ١٩٩٦ — شفافية وثقة"}].map((x,i)=>
            <div key={i} className="about-pt"><div className="about-pt-i">{x.i}</div><div><h3>{x.t}</h3><p>{x.d}</p></div></div>
          )}
        </div>
      </div>
      <div className="about-stats fin">
        {[{v:"280",l:"فدان — مساحة جون سوديك"},{v:"85%",l:"خضرة ومرافق"},{v:"193",l:"كيلو — راس الحكمة"},{v:"1996",l:"سوديك في البورصة"}].map((s,i)=>
          <div key={i} className="about-stat"><strong>{s.v}</strong><span>{s.l}</span></div>
        )}
      </div>
    </div></section>

    {/* MID CTA */}
    <div className="band"><h3>احجز في جون سوديك — June SODIC الساحل الشمالي</h3><p>٥٪ مقدم فقط — تقسيط حتى ١٠ سنوات — تسليم ٢٠٢٧–٢٠٢٩</p>
      <div className="band-btns"><a className="b-gold" href="#contact">سجل اهتمامك</a><a className="b-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("mid")}>💬 واتساب</a><a className="b-ghost" href={`tel:${PI}`} onClick={()=>trackCall("mid")}><PhI/> اتصل</a></div>
    </div>

    {/* UNITS */}
    <section className="sec units" id="units"><div className="sec-in fin" style={{textAlign:"center"}}>
      <span className="sec-tag">وحدات جون سوديك · June SODIC Units</span>
      <h2 className="sec-h" style={{textAlign:"center"}}>الوحدات المتاحة في <em>جون سوديك</em></h2>
      <p className="sec-p c">شاليهات وتاون هاوس وتوين فيلا وفيلات مستقلة من سوديك — SODIC بتصميم ميامي وإطلالات بحرية</p>
      <div style={{display:"flex",gap:5,justifyContent:"center",flexWrap:"wrap",margin:"18px 0"}}>
        {([["all","الكل"],["chalet","شاليهات"],["town","تاون هاوس"],["twin","توين فيلا"],["villa","فيلات"]]as[UT,string][]).map(([k,l])=>
          <button key={k} onClick={()=>sUf(k)} style={{padding:"7px 16px",borderRadius:50,border:`2px solid ${uf===k?"var(--color-charcoal)":"rgba(0,0,0,.08)"}`,background:uf===k?"var(--color-charcoal)":"transparent",color:uf===k?"#fff":"var(--color-charcoal)",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"var(--font-body)"}}>{l}</button>
        )}
      </div>
      <div className="u-grid">{fl.map((u,i)=><div key={i} className="u-card">
        <div className="u-img"><img src={u.img} alt={`${u.n} — ${u.en}`}/></div>
        <div className="u-body"><span className="u-type">{u.tl} · June SODIC</span><div className="u-name">{u.n}</div><div className="u-en">{u.en}</div>
          <div className="u-from">يبدأ من</div><div className="u-price">{u.p}</div>
          <div style={{fontSize:10,color:"var(--color-gold)",marginBottom:8}}>📐 {u.area}</div>
          <div className="u-specs">{u.specs.map((s,j)=><span key={j} className="u-spec">{s}</span>)}</div>
          <a href={WU} target="_blank" rel="noopener" className="u-btn" onClick={()=>trackWA(`unit_${u.t}`)}>استفسر على واتساب</a>
        </div>
      </div>)}</div>
      <p className="u-note">أسعار جون سوديك الساحل الشمالي — June SODIC استرشادية من سوديك SODIC وقابلة للتغيير. تواصل معنا لآخر الأسعار.</p>
    </div></section>

    {/* PAYMENT */}
    <section className="sec pay" id="payment"><div className="sec-in fin" style={{textAlign:"center"}}>
      <span className="sec-tag">سداد جون سوديك · Payment</span>
      <h2 className="sec-h" style={{textAlign:"center"}}>خطة سداد <em>June SODIC</em></h2>
      <div className="pay-grid" style={{textAlign:"right"}}>
        <div className="pay-c"><h3>نظام التقسيط</h3>
          <ul className="pay-list"><li>٥٪ مقدم من سوديك SODIC</li><li>عرض الذكرى ٣٠: ١.٥٪ مقدم فقط!</li><li>تقسيط حتى ١٠ سنوات</li><li>تسليم ٢٠٢٧–٢٠٢٩</li><li>٨٥٪ خضرة — ١٥٪ مباني فقط</li></ul>
          <div style={{marginTop:14}}><a className="b-gold" href={WU} target="_blank" rel="noopener" style={{width:"100%",justifyContent:"center"}} onClick={()=>trackWA("payment")}>اطلب تفاصيل السداد</a></div>
        </div>
        <div className="pay-c"><h3>لماذا جون سوديك — June SODIC؟</h3>
          <ul className="pay-list"><li>سوديك SODIC مدرجة بالبورصة منذ ١٩٩٦</li><li>تصميم ميامي العالمي</li><li>كيلو ١٩٣ — أفضل مواقع راس الحكمة</li><li>من أقرب مواعيد التسليم بالساحل</li><li>٢٨٠ فدان — أضخم مشاريع سوديك</li></ul>
        </div>
      </div>
    </div></section>

    {/* GALLERY */}
    <section className="sec gal" id="gallery"><div className="sec-in fin" style={{textAlign:"center"}}>
      <span className="sec-tag">معرض جون سوديك · Gallery</span>
      <h2 className="sec-h" style={{textAlign:"center"}}>معرض <em>June SODIC</em> الساحل الشمالي</h2>
      <div className="gal-grid">
        <div className="gal-it big"><img src={I.hero} alt="جون سوديك الساحل — June SODIC"/><div className="gal-cap">جون سوديك — June SODIC الإطلالة الرئيسية</div></div>
        <div className="gal-it"><img src={I.aerial} alt="جون سوديك منظر جوي"/><div className="gal-cap">سوديك SODIC — منظر جوي</div></div>
        <div className="gal-it"><img src={I.pool} alt="مرافق June SODIC"/><div className="gal-cap">مرافق جون سوديك</div></div>
        <div className="gal-it"><img src={I.chalet} alt="شاليهات جون سوديك"/><div className="gal-cap">شاليهات June SODIC</div></div>
        <div className="gal-it"><img src={I.town} alt="تاون هاوس جون سوديك"/><div className="gal-cap">تاون هاوس SODIC</div></div>
        <div className="gal-it"><img src={I.life} alt="حياة جون سوديك"/><div className="gal-cap">Lifestyle — جون سوديك</div></div>
      </div>
    </div></section>

    {/* AMENITIES */}
    <section className="am" id="amenities"><div className="am-in fin" style={{textAlign:"center"}}>
      <span className="sec-tag">مرافق جون سوديك · Amenities</span>
      <h2 className="sec-h" style={{color:"#fff",textAlign:"center"}}>مرافق <em style={{color:"var(--color-gold)"}}>June SODIC</em></h2>
      <div className="am-grid">{[{i:"🏖",n:"شاطئ خاص"},{i:"💎",n:"بحيرات كريستالية"},{i:"🏊",n:"حمامات سباحة"},{i:"🏠",n:"كلوب هاوس"},{i:"🍽️",n:"مطاعم وكافيهات"},{i:"🧘",n:"يوغا وتأمل"},{i:"🏪",n:"منطقة تجارية"},{i:"🅿️",n:"جراجات آمنة"},{i:"🏥",n:"عيادات طبية"},{i:"🕌",n:"مسجد"},{i:"🌳",n:"٨٥٪ خضرة"},{i:"🔒",n:"أمن ٢٤/٧"}].map((x,i)=>
        <div key={i} className="am-c"><div className="am-c-i">{x.i}</div><div className="am-c-n">{x.n}</div></div>
      )}</div>
    </div></section>

    {/* LOCATION */}
    <section className="sec loc"><div className="sec-in fin" style={{textAlign:"center"}}>
      <h2 className="sec-h" style={{textAlign:"center"}}>موقع <em>جون سوديك</em> — June SODIC Location</h2>
      <div className="loc-grid" style={{textAlign:"right"}}>
        <div className="loc-img"><img src={I.aerial} alt="موقع جون سوديك الساحل الشمالي على الخريطة"/></div>
        <div>
          {[{t:"كيلو ١٩٣",d:"طريق إسكندرية–مطروح الساحلي"},{t:"قلب راس الحكمة",d:"أجمل منطقة على الساحل الشمالي"},{t:"سوديك — SODIC",d:"٣٠ سنة خبرة — مدرجة بالبورصة المصرية"},{t:"تسليم ٢٠٢٧",d:"من أقرب مشاريع الساحل في التسليم"}].map((x,i)=>
            <div key={i} className="loc-f"><h4>{x.t}</h4><p>{x.d}</p></div>
          )}
        </div>
      </div>
    </div></section>

    {/* FAQ */}
    <section className="sec faq"><div className="sec-in fin" style={{textAlign:"center"}}>
      <h2 className="sec-h" style={{textAlign:"center"}}>أسئلة عن <em>جون سوديك</em> — June SODIC FAQ</h2>
      <div className="faq-list">{FAQS.map((x,i)=><div key={i} className="faq-i">
        <button className={`faq-q ${fq===i?"op":""}`} onClick={()=>sFq(fq===i?null:i)}><span>{x.q}</span><span className="arr"><Chv/></span></button>
        <div className={`faq-a ${fq===i?"op":""}`}><p>{x.a}</p></div>
      </div>)}</div>
    </div></section>

    {/* DISCLAIMER */}
    <div className="disc"><p>هذا الموقع يقدم معلومات استشارية عن جون سوديك الساحل الشمالي — June SODIC North Coast من سوديك للتطوير العقاري — SODIC Developments. جميع الأسعار استرشادية وقابلة للتغيير. التعاقد النهائي مع سوديك مباشرة.</p>
      <p>تواصل: <a href={`tel:${PI}`} style={{color:"var(--color-gold)",fontWeight:700}}>{PD}</a></p>
    </div>

    {/* CONTACT */}
    <section className="ct" id="contact"><div className="sec-in fin">
      <div style={{textAlign:"center"}}><span className="sec-tag">سجل اهتمامك · Register</span><h2 className="sec-h" style={{color:"#fff",textAlign:"center"}}>احجز في <em style={{color:"var(--color-gold)"}}>جون سوديك</em> — June SODIC</h2></div>
      <div className="ct-wrap">
        <div className="ct-left">
          <p>سجّل اهتمامك في جون سوديك الساحل الشمالي — June SODIC North Coast وفريق سوديك SODIC هيتواصل معاك لآخر الأسعار والوحدات.</p>
          <a className="ct-row" href={`tel:${PI}`} onClick={()=>trackCall("contact")}><PhI/><span>{PD}</span><span style={{marginRight:"auto",fontSize:9,color:"rgba(255,255,255,.35)"}}>اتصل مباشرة</span></a>
          <a className="ct-row" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("contact")}>💬<span>واتساب جون سوديك — June SODIC</span></a>
          {/* WhatsApp button بجانب الفورم */}
          <div style={{marginTop:16}}><a className="b-wa" href={WU} target="_blank" rel="noopener" style={{width:"100%",justifyContent:"center"}} onClick={()=>trackWA("contact_big")}>💬 تواصل واتساب الآن — جون سوديك</a></div>
        </div>
        <div className="ct-form">
          <div className="cf-title">سجل في جون سوديك — June SODIC</div>
          <form ref={fr} onSubmit={(e:FormEvent)=>{e.preventDefault();sub(fr,sFs,"main_form")}} style={{textAlign:"right"}}>
            <input type="hidden" name="access_key" value={WK}/><input type="hidden" name="subject" value="Lead — جون سوديك June SODIC الساحل الشمالي"/><input type="hidden" name="from_name" value="June SODIC Landing"/><input type="checkbox" name="botcheck" style={{display:"none"}}/>
            <div className="cf-row"><div className="cf-f"><label>الاسم *</label><input name="name" placeholder="اسمك" required/></div><div className="cf-f"><label>الموبايل *</label><input name="phone" type="tel" dir="ltr" placeholder="01012345678" required/></div></div>
            <div className="cf-row"><div className="cf-f"><label>الإيميل</label><input name="email" type="email" dir="ltr" placeholder="email@example.com"/></div><div className="cf-f"><label>نوع الوحدة</label><select name="unit_type"><option value="غير محدد">اختر</option><option value="شاليه">شاليه</option><option value="تاون هاوس">تاون هاوس</option><option value="توين فيلا">توين فيلا</option><option value="فيلا مستقلة">فيلا مستقلة</option></select></div></div>
            {fs==="sent"?<div style={{textAlign:"center",padding:"16px 0"}}><div style={{fontSize:36}}>✓</div><p style={{color:"var(--color-gold)",fontWeight:700,marginTop:4}}>تم الاستلام — جاري التحويل...</p></div>
            :<button type="submit" className="cf-sub" disabled={fs==="sending"}>{fs==="sending"?"جاري...":"إرسال — احجز في جون سوديك"}</button>}
            {fs==="error"&&<p style={{color:"#ef4444",fontSize:10,textAlign:"center",marginTop:6}}>خطأ — <a href={WU} target="_blank" style={{color:"var(--color-gold)"}}>واتساب</a></p>}
            <p style={{fontSize:8,color:"rgba(255,255,255,.22)",textAlign:"center",marginTop:8}}>بإرسال النموذج توافق على <button onClick={()=>sPrv(true)} type="button" style={{background:"none",border:"none",color:"var(--color-gold)",textDecoration:"underline",cursor:"pointer",fontSize:8,fontFamily:"var(--font-body)"}}>سياسة الخصوصية</button></p>
          </form>
        </div>
      </div>
    </div></section>

    {/* FOOTER */}
    <footer className="ft"><div className="sec-in"><div className="ft-in">
      <div className="ft-brand"><div className="hd-logo-t" style={{fontSize:16}}>JUNE SODIC</div><p>جون سوديك الساحل الشمالي — June SODIC North Coast. الكيلو ١٩٣ راس الحكمة. سوديك SODIC — ٣٠ سنة من التميز. أسعار استرشادية.</p></div>
      <div><div className="ft-h">روابط سريعة</div><div className="ft-links">{NAV.map(([h,l])=><a key={h} href={h}>{l}</a>)}</div></div>
      <div><div className="ft-h">تواصل معنا</div><div className="ft-links"><a href={`tel:${PI}`} onClick={()=>trackCall("footer")}>📞 {PD}</a><a href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("footer")}>💬 واتساب جون سوديك</a><span>📍 كيلو ١٩٣، راس الحكمة</span></div></div>
    </div>
    <div className="ft-bottom"><p className="ft-cr">© 2026 June SODIC North Coast · جون سوديك الساحل الشمالي · سوديك SODIC · أسعار استرشادية</p>
      <div className="ft-legal"><button onClick={()=>sPrv(true)}>سياسة الخصوصية</button><a href="#about">عن المشروع</a></div>
    </div></div></footer>

    {/* FLOATING BUTTONS */}
    <div className="float-btns">
      <a className="float-btn float-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("float")} aria-label="واتساب">💬</a>
      <a className="float-btn float-call" href={`tel:${PI}`} onClick={()=>trackCall("float")} aria-label="اتصل">📞</a>
    </div>

    {/* POPUP */}
    <div className={`p-bk ${pop?"on":""}`} onClick={cp}/>
    <div className={`p-dlg ${pop?"on":""}`}><button className="p-x" onClick={cp}>✕</button>
      <span className="p-tag">⚡ جون سوديك — June SODIC</span>
      <h2 className="p-h">احجز وحدتك في جون سوديك الساحل الشمالي</h2>
      <p className="p-desc">سجّل في June SODIC North Coast واحصل على أولوية اختيار الوحدة — ٥٪ مقدم فقط من سوديك SODIC</p>
      <ul className="p-perks"><li>أولوية اختيار الموقع في جون سوديك</li><li>٥٪ مقدم — عرض الذكرى ١.٥٪!</li><li>رد سريع من فريق سوديك SODIC</li></ul>
      {ps==="sent"?<div style={{textAlign:"center",padding:"12px 0"}}><div style={{fontSize:36}}>✓</div><p style={{color:"var(--color-gold)",fontWeight:700}}>تم — جون سوديك</p></div>
      :<form className="p-form" ref={pfr} onSubmit={(e:FormEvent)=>{e.preventDefault();sub(pfr,sPs,"popup").then(()=>setTimeout(cp,2500))}}>
        <input type="hidden" name="access_key" value={WK}/><input type="hidden" name="subject" value="Popup — جون سوديك June SODIC"/><input type="hidden" name="from_name" value="June SODIC Popup"/><input type="checkbox" name="botcheck" style={{display:"none"}}/>
        <div className="cf-f"><label>الاسم *</label><input name="name" placeholder="اسمك" required/></div>
        <div className="cf-f"><label>الموبايل *</label><input name="phone" type="tel" dir="ltr" placeholder="01012345678" required/></div>
        <button type="submit" className="p-sub" disabled={ps==="sending"}>{ps==="sending"?"جاري...":"احجز في جون سوديك الآن"}</button>
        <a className="p-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("popup")}>💬 واتساب جون سوديك — June SODIC</a>
      </form>}
    </div>

    {/* PRIVACY */}
    {prv&&<><div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.6)"}} onClick={()=>sPrv(false)}/><div style={{position:"fixed",zIndex:301,top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"min(520px,92vw)",maxHeight:"85vh",overflowY:"auto",background:"#fff",borderRadius:16,padding:"28px 24px",color:"var(--color-charcoal)"}}>
      <button onClick={()=>sPrv(false)} style={{position:"absolute",top:10,left:10,background:"#f0f0f0",border:"none",borderRadius:"50%",width:28,height:28,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
      <h2 style={{fontFamily:"var(--font-head)",fontSize:22,fontWeight:600,marginBottom:12}}>سياسة الخصوصية</h2>
      <div style={{fontSize:11,lineHeight:1.8,color:"var(--color-slate)"}}>
        <p style={{marginBottom:8}}>نجمع الاسم والهاتف والإيميل فقط عند تعبئة النموذج — للتواصل بخصوص جون سوديك June SODIC.</p>
        <p style={{marginBottom:8}}>بياناتك مشفرة HTTPS ومحمية عبر Web3Forms. لا نبيع أو نشارك بياناتك.</p>
        <p style={{marginBottom:8}}>يحق لك الاطلاع أو التصحيح أو الحذف في أي وقت.</p>
        <p>تواصل: <a href={`tel:${PI}`} style={{color:"var(--color-gold)"}}>{PD}</a></p>
      </div>
    </div></>}

    {/* COOKIE */}
    {ck&&<div className="ck"><p>نستخدم cookies لتحسين تجربتك. <button onClick={()=>sPrv(true)} style={{background:"none",border:"none",color:"var(--color-gold)",textDecoration:"underline",cursor:"pointer",fontSize:10,fontFamily:"var(--font-body)"}}>سياسة الخصوصية</button></p>
      <div className="ck-btns"><button className="ck-ok" onClick={()=>{sCk(false);try{localStorage.setItem("js_ck","1")}catch{}}}>موافق</button><button className="ck-no" onClick={()=>sCk(false)}>رفض</button></div>
    </div>}

    {/* MOBILE BAR */}
    <nav className="mbar"><div className="mbar-in"><a className="m-call" href={`tel:${PI}`} onClick={()=>trackCall("mobile")}><PhI/>{PD}</a><a className="m-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("mobile")}>💬</a><a className="m-book" href="#contact">سجل</a></div></nav>
  </>);
}
