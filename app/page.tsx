"use client";
import{useState,useEffect,useRef,FormEvent}from"react";
import{useRouter}from"next/navigation";

const P="01055887184",PD="0105 588 7184",PI="+201055887184",WN="201055887184";
const WM="مرحباً، أريد الاستفسار عن جون سوديك الساحل الشمالي — June SODIC";
const WU=`https://wa.me/${WN}?text=${encodeURIComponent(WM)}`;
// TODO: أضف كود Web3Forms هنا
const WK="YOUR_WEB3FORMS_KEY_HERE";

/* ── IMAGES from SODIC/Ogami CDN ── */
const CDN="https://arro-consultancy.com/uploads/2026-05-07-151055-";
const I={
  logo:CDN+"69fc814f8a250.png",hero:CDN+"69fc814fb651a.jpg",
  villa:CDN+"69fc814fbd819.jpg",chalet:CDN+"69fc814fad0aa.jpg",
  town:CDN+"69fc814f91076.jpg",twin:CDN+"69fc814fa42ba.jpg",
  master:CDN+"69fc814f9a80d.jpg",beach:CDN+"69fc814fc83e8.jpg",
  pool:CDN+"69fc814fc32a2.jpg",arch:CDN+"69fc814fd4337.jpg",
  land:CDN+"69fc814fcd661.jpg",comm:CDN+"69fc814fd90d7.jpg",
};

/* ── TRACKING PLACEHOLDERS ── */
function trackCall(l="call"){
  // TODO: gtag("event","conversion",{send_to:"AW-XXX/XXX"});
  if(typeof window!=="undefined"&&(window as any).gtag)(window as any).gtag("event","click_call",{event_label:l});
}
function trackWA(l="wa"){
  // TODO: gtag("event","conversion",{send_to:"AW-XXX/XXX"});
  if(typeof window!=="undefined"&&(window as any).gtag)(window as any).gtag("event","click_whatsapp",{event_label:l});
}
function trackLead(l="form"){
  // TODO: gtag("event","conversion",{send_to:"AW-XXX/XXX"});
  if(typeof window!=="undefined"&&(window as any).gtag)(window as any).gtag("event","generate_lead",{event_label:l});
}

const UNITS=[
  {type:"شاليه",en:"Water Chalet",name:"ووتر شاليه — جون سوديك",price:"22.8 مليون",area:"من 150 م²",specs:["إطلالة بحيرات","تصميم ميامي","تسليم 2029"],img:I.chalet},
  {type:"تاون هاوس",en:"Sunset Townhouse",name:"صنسيت تاون هاوس",price:"36.1 مليون",area:"من 226 م²",specs:["حديقة خاصة","إطلالة غروب","8 سنوات تقسيط"],img:I.town},
  {type:"توين فيلا",en:"Rays Twin Villa",name:"رايز توين فيلا",price:"49.1 مليون",area:"من 268 م²",specs:["تصميم ياباني","إطلالة مدرجات","مساحات واسعة"],img:I.twin},
  {type:"فيلا مستقلة",en:"Bayview Villa",name:"باي فيو فيلا — June SODIC",price:"56 مليون",area:"من 253 م²",specs:["إطلالة خليج","روف ديك","خصوصية تامة"],img:I.villa},
];

const FAQS=[
  {q:"أين يقع مشروع جون سوديك — June SODIC؟",a:"جون سوديك الساحل الشمالي عند الكيلو 193 طريق إسكندرية — مطروح في قلب رأس الحكمة. June SODIC North Coast من سوديك للتطوير العقاري — SODIC Developments."},
  {q:"ما أنواع وحدات جون سوديك الساحل الشمالي؟",a:"يتوفر في June SODIC: ووتر شاليهات، تاون هاوس، توين فيلات، وفيلات مستقلة. جون سوديك يقدم تشكيلة كاملة بتصميمات مستوحاة من ميامي."},
  {q:"كم أسعار جون سوديك — June SODIC North Coast؟",a:"تبدأ أسعار سوديك من 22.8 مليون جنيه للشاليهات وحتى 56 مليون للفيلات المستقلة. أسعار جون سوديك الساحل الشمالي استرشادية."},
  {q:"ما خطة سداد June SODIC سوديك؟",a:"5% مقدم مع تقسيط حتى 8 سنوات. عروض خاصة بمناسبة 30 سنة سوديك: مقدم 1.5% وتقسيط حتى 10 سنوات."},
  {q:"ما مساحة مشروع سوديك جون الساحل الشمالي؟",a:"جون سوديك على مساحة 280 فدان مع 85% مساحات خضراء ومرافق و15% فقط مباني. June SODIC من أكبر مشاريع SODIC في رأس الحكمة."},
  {q:"من هو المطور العقاري — SODIC Developments؟",a:"سوديك شركة مدرجة في البورصة المصرية منذ 1996، أكثر من 30 سنة خبرة. SODIC طورت مشاريع في القاهرة والساحل الشمالي بمعايير عالمية."},
];

const NAV=[["#about","عن المشروع"],["#units","الوحدات"],["#payment","السداد"],["#gallery","المعرض"],["#amenities","المرافق"],["#developer","المطور"],["#contact","احجز"]];
const Ph=()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const Chv=()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>;

export default function Home(){
  const router=useRouter();
  const[fq,sFq]=useState<number|null>(null);
  const[mn,sMn]=useState(false);
  const[fs,sFs]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const[pop,sPop]=useState(false);
  const[ps,sPs]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const[ck,sCk]=useState(false);
  const[prv,sPrv]=useState(false);
  const pr=useRef(false);
  const fr=useRef<HTMLFormElement>(null);
  const pfr=useRef<HTMLFormElement>(null);

  useEffect(()=>{
    const obs=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("vis")),{threshold:.1});
    document.querySelectorAll(".fin").forEach(e=>obs.observe(e));
    try{if(!localStorage.getItem("js_ck"))sCk(true)}catch{sCk(true)}
    return()=>obs.disconnect();
  },[]);

  useEffect(()=>{
    if(pr.current)return;
    const os=()=>{if(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)>=.5){go()}};
    const t=setTimeout(()=>go(),16000);
    window.addEventListener("scroll",os,{passive:true});
    function go(){if(pr.current)return;pr.current=true;sPop(true);document.body.classList.add("p-on");window.removeEventListener("scroll",os);clearTimeout(t)}
    return()=>{window.removeEventListener("scroll",os);clearTimeout(t)};
  },[]);

  function cp(){sPop(false);document.body.classList.remove("p-on")}

  async function sub(r:React.RefObject<HTMLFormElement|null>,ss:(s:any)=>void,src:string){
    if(!r.current)return;ss("sending");
    const fd=new FormData(r.current);const pl:Record<string,string>={};fd.forEach((v,k)=>pl[k]=v.toString());
    try{
      const res=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(pl)});
      const d=await res.json();
      if(d.success){ss("sent");trackLead(src);r.current.reset();if(src==="main")setTimeout(()=>router.push("/thank-you"),800)}else throw 0
    }catch{ss("error")}
  }

  return(<>
    {/* HEADER */}
    <header className="hd"><div className="hd-in">
      <a className="hd-logo" href="#hero"><div><div className="hd-logo-t">JUNE SODIC</div><div className="hd-logo-s">جون سوديك · الساحل الشمالي</div></div></a>
      <nav className="hd-nav">{NAV.map(([h,l])=><a key={h} href={h}>{l}</a>)}</nav>
      <div className="hd-acts">
        <a className="hd-call" href={`tel:${PI}`} onClick={()=>trackCall("hd")}><Ph/><span>{PD}</span></a>
        <a className="hd-book" href="#contact">سجل اهتمامك</a>
        <button className="hd-mob" onClick={()=>sMn(!mn)}>☰</button>
      </div>
    </div>
    {mn&&<div style={{background:"#0c1322",padding:"10px 20px"}}>{NAV.map(([h,l])=><a key={h} href={h} onClick={()=>sMn(false)} style={{display:"block",padding:"9px 0",color:"rgba(255,255,255,.65)",textDecoration:"none",fontSize:"13px",borderBottom:"1px solid rgba(255,255,255,.03)"}}>{l}</a>)}</div>}
    </header>

    {/* HERO */}
    <section className="hero" id="hero">
      <div className="hero-bg"><img src={I.hero} alt="جون سوديك الساحل الشمالي — June SODIC North Coast رأس الحكمة"/><div className="hero-ov"/></div>
      <div className="hero-ct">
        <span className="hero-tag">🌊 SODIC Developments · سوديك للتطوير العقاري</span>
        <h1 className="hero-h">جون <em>سوديك</em><br/>June <em>SODIC</em></h1>
        <p className="hero-p">جون سوديك الساحل الشمالي — June SODIC North Coast عند الكيلو ١٩٣ في رأس الحكمة. ٢٨٠ فدان بتصميمات مستوحاة من ميامي، ٨٥٪ مساحات خضراء، وشاطئ خاص على البحر المتوسط من سوديك — SODIC.</p>
        <p className="hero-kw">جون سوديك · June SODIC · سوديك الساحل الشمالي · SODIC North Coast · رأس الحكمة</p>
        <div className="hero-stats">
          <div className="hero-st"><div className="hero-sv">٢٨٠ فدان</div><div className="hero-sl">مساحة المشروع</div></div>
          <div className="hero-st"><div className="hero-sv">٥٪ مقدم</div><div className="hero-sl">أنظمة سداد مرنة</div></div>
          <div className="hero-st"><div className="hero-sv">١٠ سنوات</div><div className="hero-sl">تقسيط مريح</div></div>
          <div className="hero-st"><div className="hero-sv">كيلو ١٩٣</div><div className="hero-sl">رأس الحكمة</div></div>
        </div>
        <div className="hero-btns">
          <a className="b-accent" href="#contact">احجز في جون سوديك</a>
          <a className="b-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("hero")}>💬 واتساب</a>
          <a className="b-ghost" href="#units">استكشف الوحدات</a>
        </div>
      </div>
    </section>

    {/* TRUST */}
    <div className="trust"><div className="trust-in">
      <div className="trust-i"><strong>٢٨٠</strong> فدان</div>
      <div className="trust-i"><strong>٨٥٪</strong> خضرة ومرافق</div>
      <div className="trust-i"><strong>٣٠+</strong> سنة خبرة SODIC</div>
      <div className="trust-i"><strong>٥٪</strong> مقدم فقط</div>
      <div className="trust-i"><strong>٢٠٢٩</strong> تسليم</div>
    </div></div>

    {/* ABOUT */}
    <section className="sec about" id="about"><div className="sec-in">
      <div className="fin" style={{textAlign:"center"}}>
        <span className="sec-tag">June SODIC · جون سوديك الساحل الشمالي</span>
        <h2 className="sec-h" style={{textAlign:"center"}}>عن <em>جون سوديك</em> — June SODIC</h2>
        <p className="sec-p c">جون سوديك الساحل الشمالي — June SODIC North Coast من سوديك — SODIC على ٢٨٠ فدان عند الكيلو ١٩٣ في رأس الحكمة. تصميمات مستوحاة من ميامي مع ٨٥٪ مساحات خضراء وشاطئ خاص على البحر المتوسط. جون سوديك أيقونة سوديك على الساحل الشمالي.</p>
      </div>
      <div className="about-grid fin">
        <div className="about-img"><img src={I.master} alt="ماستر بلان جون سوديك — June SODIC Master Plan"/></div>
        <div className="about-pts">
          {[{i:"🏖",t:"٢٨٠ فدان — جون سوديك",d:"مساحة ضخمة في قلب رأس الحكمة من SODIC"},{i:"🌊",t:"شاطئ رملي خاص",d:"June SODIC — شاطئ مباشر على البحر المتوسط"},{i:"🌿",t:"٨٥٪ مساحات خضراء ومرافق",d:"١٥٪ فقط مباني لأقصى خصوصية في جون سوديك"},{i:"🏛️",t:"تصميم مستوحى من ميامي",d:"سوديك — SODIC بمعايير عالمية وتشطيبات فاخرة"}].map((x,i)=>
            <div key={i} className="about-pt"><div className="about-pt-i">{x.i}</div><div><h3>{x.t}</h3><p>{x.d}</p></div></div>
          )}
        </div>
      </div>
      <div className="about-stats fin">
        {[{v:"280",u:" فدان",l:"مساحة جون سوديك"},{v:"85",u:"%",l:"خضرة ومرافق"},{v:"193",u:" KM",l:"رأس الحكمة"},{v:"30",u:"+",l:"سنة خبرة SODIC"}].map((s,i)=>
          <div key={i} className="about-stat"><div className="about-stat-v">{s.v}<span>{s.u}</span></div><div className="about-stat-l">{s.l}</div></div>
        )}
      </div>
    </div></section>

    {/* MID CTA */}
    <div className="midcta">
      <h3>احجز وحدتك في جون سوديك — June SODIC الآن</h3>
      <p>مقدم ٥٪ فقط — تقسيط حتى ١٠ سنوات — تسليم ٢٠٢٩ من سوديك — SODIC</p>
      <div className="midcta-btns">
        <a className="b-accent" href="#contact">سجل اهتمامك</a>
        <a className="b-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("mid")}>💬 واتساب</a>
        <a className="b-ghost" href={`tel:${PI}`} onClick={()=>trackCall("mid")}><Ph/> اتصل بنا</a>
      </div>
    </div>

    {/* UNITS */}
    <section className="sec units" id="units"><div className="sec-in fin" style={{textAlign:"center"}}>
      <span className="sec-tag">وحدات جون سوديك · June SODIC Units</span>
      <h2 className="sec-h" style={{textAlign:"center"}}>وحدات <em>جون سوديك</em> الساحل الشمالي</h2>
      <p className="sec-p c">شاليهات وتاون هاوس وتوين فيلات وفيلات مستقلة من سوديك — SODIC بإطلالات بحرية وتصميمات ميامي</p>
      <div className="u-grid">
        {UNITS.map((u,i)=><div key={i} className="u-card">
          <div className="u-img"><img src={u.img} alt={`${u.name} — جون سوديك June SODIC`}/></div>
          <div className="u-body">
            <span className="u-type">{u.type} · June SODIC</span>
            <div className="u-name">{u.name}</div>
            <div className="u-from">يبدأ من</div><div className="u-price">{u.price}</div>
            <div style={{fontSize:10,color:"var(--color-muted)",marginBottom:6}}>📐 {u.area}</div>
            <div className="u-specs">{u.specs.map((s,j)=><span key={j} className="u-spec">{s}</span>)}</div>
            <a href={WU} target="_blank" rel="noopener" className="u-btn" onClick={()=>trackWA(`unit_${i}`)}>استفسر على واتساب</a>
          </div>
        </div>)}
      </div>
      <p className="u-note">أسعار جون سوديك — June SODIC استرشادية وقابلة للتغيير من سوديك — SODIC Developments</p>
    </div></section>

    {/* PAYMENT */}
    <section className="sec pay" id="payment"><div className="sec-in fin" style={{textAlign:"center"}}>
      <span className="sec-tag">خطة السداد · June SODIC Payment</span>
      <h2 className="sec-h" style={{textAlign:"center"}}>سداد مرن في <em>جون سوديك</em></h2>
      <div className="pay-grid" style={{textAlign:"right"}}>
        <div className="pay-c"><h3>نظام التقسيط — سوديك SODIC</h3>
          <ul className="pay-list"><li>٥٪ مقدم حجز</li><li>تقسيط حتى ٨ سنوات</li><li>عروض ٣٠ سنة سوديك: ١.٥٪ مقدم + ١٠ سنوات</li><li>تسليم سبتمبر ٢٠٢٩</li><li>تشطيب كامل لكل وحدات جون سوديك</li></ul>
          <div style={{marginTop:14}}><a className="b-accent" href={WU} target="_blank" rel="noopener" style={{width:"100%",justifyContent:"center"}} onClick={()=>trackWA("pay")}>اطلب تفاصيل السداد من سوديك</a></div>
        </div>
        <div className="pay-c"><h3>ليه جون سوديك — June SODIC؟</h3>
          <ul className="pay-list"><li>سوديك مدرجة في البورصة منذ ١٩٩٦</li><li>٣٠+ سنة خبرة في التطوير العقاري</li><li>تصميمات ميامي عالمية المستوى</li><li>موقع استراتيجي في رأس الحكمة</li><li>٨٥٪ مساحات خضراء وشاطئ خاص</li></ul>
        </div>
      </div>
    </div></section>

    {/* GALLERY */}
    <section className="sec gal" id="gallery"><div className="sec-in fin" style={{textAlign:"center"}}>
      <span className="sec-tag">معرض جون سوديك · Gallery</span>
      <h2 className="sec-h" style={{textAlign:"center"}}>معرض <em>June SODIC</em> — جون سوديك</h2>
      <div className="gal-grid">
        <div className="gal-it big"><img src={I.hero} alt="جون سوديك الساحل الشمالي — June SODIC"/><div className="gal-cap">جون سوديك — الإطلالة الرئيسية</div></div>
        <div className="gal-it"><img src={I.master} alt="ماستر بلان June SODIC"/><div className="gal-cap">ماستر بلان جون سوديك</div></div>
        <div className="gal-it"><img src={I.beach} alt="شاطئ جون سوديك SODIC Beach"/><div className="gal-cap">شاطئ June SODIC</div></div>
        <div className="gal-it"><img src={I.pool} alt="حمامات سباحة سوديك"/><div className="gal-cap">مرافق جون سوديك</div></div>
        <div className="gal-it"><img src={I.arch} alt="تصميمات June SODIC ميامي"/><div className="gal-cap">تصميمات ميامي</div></div>
        <div className="gal-it"><img src={I.land} alt="لاندسكيب جون سوديك"/><div className="gal-cap">لاندسكيب سوديك</div></div>
      </div>
    </div></section>

    {/* AMENITIES */}
    <section className="am" id="amenities"><div className="am-in fin" style={{textAlign:"center"}}>
      <span className="sec-tag" style={{color:"var(--color-accent2)"}}>مرافق جون سوديك · June SODIC Amenities</span>
      <h2 className="sec-h" style={{color:"#fff",textAlign:"center"}}>مرافق <em style={{color:"var(--color-accent2)"}}>جون سوديك</em></h2>
      <div className="am-grid">{[
        {i:"🏖",n:"شاطئ خاص"},{i:"🏊",n:"حمامات سباحة"},{i:"🏋️",n:"نادي رياضي"},{i:"🏠",n:"كلوب هاوس"},
        {i:"🛍",n:"منطقة تجارية"},{i:"🍽",n:"مطاعم وكافيهات"},{i:"🧘",n:"يوغا وتأمل"},{i:"🏥",n:"عيادات طبية"},
        {i:"🌳",n:"حدائق واسعة"},{i:"🅿️",n:"جراجات آمنة"},{i:"🔒",n:"أمن وحراسة"},{i:"🕌",n:"مساجد"}
      ].map((x,i)=><div key={i} className="am-c"><div className="am-c-i">{x.i}</div><div className="am-c-n">{x.n}</div></div>)}</div>
    </div></section>

    {/* DEVELOPER */}
    <section className="sec dev" id="developer"><div className="sec-in fin" style={{textAlign:"center"}}>
      <span className="sec-tag">المطور العقاري · SODIC Developments</span>
      <h2 className="sec-h" style={{textAlign:"center"}}><em>سوديك</em> — SODIC Developments</h2>
      <div className="dev-grid" style={{textAlign:"right"}}>
        <div className="dev-img"><img src={I.comm} alt="سوديك للتطوير العقاري — SODIC Developments"/></div>
        <div className="dev-info">
          <h3>سوديك — ٣٠ سنة من التميز العقاري</h3>
          <p>سوديك — SODIC Developments شركة مدرجة في البورصة المصرية منذ ١٩٩٦. أكثر من ٣٠ سنة خبرة في التطوير العقاري مع مشاريع في القاهرة الجديدة والشيخ زايد والساحل الشمالي. جون سوديك — June SODIC هو أحدث مشاريعها في رأس الحكمة.</p>
          <p>من أبرز مشاريع سوديك: Allegria، Eastown، Villette، SODIC East، وThe Estates. SODIC معروفة بالجودة والالتزام بمواعيد التسليم.</p>
          <div className="dev-stats">
            {[{v:"30+",l:"سنة خبرة"},{v:"1996",l:"تأسيس"},{v:"EGX",l:"بورصة مصر"},{v:"50+",l:"مشروع"}].map((s,i)=>
              <div key={i} className="dev-stat"><strong>{s.v}</strong><span>{s.l}</span></div>
            )}
          </div>
        </div>
      </div>
    </div></section>

    {/* FAQ */}
    <section className="sec faq" id="faq"><div className="sec-in fin" style={{textAlign:"center"}}>
      <h2 className="sec-h" style={{textAlign:"center"}}>أسئلة عن <em>جون سوديك</em> — June SODIC FAQ</h2>
      <div className="faq-list">{FAQS.map((x,i)=><div key={i} className="faq-i">
        <button className={`faq-q ${fq===i?"op":""}`} onClick={()=>sFq(fq===i?null:i)}><span>{x.q}</span><span className="arr"><Chv/></span></button>
        <div className={`faq-a ${fq===i?"op":""}`}><p>{x.a}</p></div>
      </div>)}</div>
    </div></section>

    {/* CONTACT */}
    <section className="ct" id="contact"><div className="sec-in fin">
      <div style={{textAlign:"center"}}>
        <span className="sec-tag" style={{color:"var(--color-accent2)"}}>سجل اهتمامك · Register</span>
        <h2 className="sec-h" style={{color:"#fff",textAlign:"center"}}>احجز في <em style={{color:"var(--color-accent2)"}}>جون سوديك</em> — June SODIC</h2>
      </div>
      <div className="ct-wrap">
        <div className="ct-left">
          <p>سجّل اهتمامك في جون سوديك الساحل الشمالي — June SODIC North Coast وفريق مبيعات سوديك — SODIC هيتواصل معاك لآخر الأسعار والوحدات المتاحة في رأس الحكمة.</p>
          <div>
            <a className="ct-row" href={`tel:${PI}`} onClick={()=>trackCall("ct")}><Ph/><span>{PD}</span><span style={{marginRight:"auto",fontSize:9,color:"rgba(255,255,255,.35)"}}>اتصل مباشرة</span></a>
            <a className="ct-row" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("ct")}><span>💬</span><span>واتساب — جون سوديك</span><span style={{marginRight:"auto",fontSize:9,color:"rgba(255,255,255,.35)"}}>رد سريع</span></a>
          </div>
        </div>
        <div className="ct-form">
          <div className="cf-title">سجل في جون سوديك — June SODIC</div>
          <form ref={fr} onSubmit={(e:FormEvent)=>{e.preventDefault();sub(fr,sFs,"main")}} style={{textAlign:"right"}}>
            <input type="hidden" name="access_key" value={WK}/>
            <input type="hidden" name="subject" value="Lead — جون سوديك June SODIC الساحل الشمالي"/>
            <input type="hidden" name="from_name" value="June SODIC Landing"/>
            <input type="checkbox" name="botcheck" style={{display:"none"}}/>
            <div className="cf-row">
              <div className="cf-f"><label>الاسم الكامل *</label><input name="name" placeholder="أدخل اسمك" required/></div>
              <div className="cf-f"><label>رقم الموبايل *</label><input name="phone" type="tel" dir="ltr" placeholder="01012345678" required/></div>
            </div>
            <div className="cf-f"><label>نوع الوحدة</label>
              <select name="unit_type"><option value="غير محدد">اختر نوع الوحدة</option><option value="شاليه">ووتر شاليه</option><option value="تاون هاوس">تاون هاوس</option><option value="توين فيلا">توين فيلا</option><option value="فيلا مستقلة">فيلا مستقلة</option></select>
            </div>
            {fs==="sent"?<div style={{textAlign:"center",padding:"16px 0"}}><div style={{fontSize:36}}>✓</div><p style={{color:"var(--color-accent2)",fontWeight:700,marginTop:4}}>تم الاستلام — جاري التحويل...</p></div>
            :<button type="submit" className="cf-sub" disabled={fs==="sending"}>{fs==="sending"?"جاري...":"إرسال — سجل في جون سوديك"}</button>}
            {fs==="error"&&<p style={{color:"#ef4444",fontSize:10,textAlign:"center",marginTop:6}}>خطأ — <a href={WU} target="_blank" style={{color:"var(--color-accent2)"}}>واتساب</a></p>}
          </form>
          <a className="cf-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("form_wa")}>💬 أو تواصل على واتساب مباشرة — جون سوديك</a>
          <p style={{fontSize:8,color:"rgba(255,255,255,.22)",textAlign:"center",marginTop:8}}>
            بإرسال النموذج توافق على <button onClick={()=>sPrv(true)} type="button" style={{background:"none",border:"none",color:"var(--color-accent2)",textDecoration:"underline",cursor:"pointer",fontSize:8,fontFamily:"var(--font-body)"}}>سياسة الخصوصية</button> · أسعار جون سوديك استرشادية
          </p>
        </div>
      </div>
    </div></section>

    {/* FOOTER */}
    <footer className="ft"><div className="sec-in">
      <div className="ft-in">
        <div className="ft-brand"><div style={{fontFamily:"var(--font-head)",fontSize:22,fontWeight:600,fontStyle:"italic",color:"#fff"}}>JUNE SODIC</div>
          <p>جون سوديك الساحل الشمالي — June SODIC North Coast من سوديك — SODIC Developments. الكيلو ١٩٣ رأس الحكمة. أسعار استرشادية.</p>
        </div>
        <div><div className="ft-h">روابط</div><div className="ft-links">{NAV.map(([h,l])=><a key={h} href={h}>{l}</a>)}</div></div>
        <div><div className="ft-h">تواصل</div><div className="ft-links">
          <a href={`tel:${PI}`} onClick={()=>trackCall("ft")}>📞 {PD}</a>
          <a href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("ft")}>💬 واتساب</a>
        </div></div>
      </div>
      <div className="ft-bottom">
        <p className="ft-cr">© 2026 June SODIC · جون سوديك · سوديك للتطوير العقاري · SODIC Developments · أسعار استرشادية</p>
        <div className="ft-legal"><button onClick={()=>sPrv(true)}>سياسة الخصوصية</button><a href="#about">عن المشروع</a></div>
      </div>
    </div></footer>

    {/* FLOATING BUTTONS */}
    <div className="float-btns">
      <a className="float-btn float-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("float")} aria-label="واتساب">💬</a>
      <a className="float-btn float-call" href={`tel:${PI}`} onClick={()=>trackCall("float")} aria-label="اتصل">📞</a>
    </div>

    {/* POPUP */}
    <div className={`p-bk ${pop?"on":""}`} onClick={cp}/>
    <div className={`p-dlg ${pop?"on":""}`}><button className="p-x" onClick={cp}>✕</button>
      <span className="p-tag">🌊 جون سوديك — June SODIC</span>
      <h2 className="p-h">احجز في جون سوديك الساحل الشمالي</h2>
      <p className="p-desc">سجّل دلوقتي في June SODIC North Coast من سوديك واحصل على أولوية اختيار الوحدة في رأس الحكمة</p>
      <ul className="p-perks"><li>أولوية اختيار الوحدة والموقع في جون سوديك</li><li>٥٪ مقدم فقط — تقسيط حتى ١٠ سنوات</li><li>رد سريع من فريق سوديك — SODIC</li></ul>
      {ps==="sent"?<div style={{textAlign:"center",padding:"12px 0"}}><div style={{fontSize:36}}>✓</div><p style={{color:"var(--color-accent2)",fontWeight:700}}>تم الاستلام</p></div>
      :<form className="p-form" ref={pfr} onSubmit={(e:FormEvent)=>{e.preventDefault();sub(pfr,sPs,"popup").then(()=>setTimeout(cp,2500))}}>
        <input type="hidden" name="access_key" value={WK}/><input type="hidden" name="subject" value="Popup — جون سوديك June SODIC"/><input type="hidden" name="from_name" value="June SODIC Popup"/><input type="checkbox" name="botcheck" style={{display:"none"}}/>
        <div className="cf-f"><label>الاسم *</label><input name="name" placeholder="اسمك" required/></div>
        <div className="cf-f"><label>الموبايل *</label><input name="phone" type="tel" dir="ltr" placeholder="01012345678" required/></div>
        <button type="submit" className="p-sub" disabled={ps==="sending"}>{ps==="sending"?"جاري...":"احجز في جون سوديك الآن"}</button>
        <a className="p-wa2" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("popup")}>💬 واتساب جون سوديك</a>
      </form>}
    </div>

    {/* PRIVACY */}
    {prv&&<><div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.6)"}} onClick={()=>sPrv(false)}/>
    <div style={{position:"fixed",zIndex:301,top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"min(520px,92vw)",maxHeight:"85vh",overflowY:"auto",background:"#fff",borderRadius:16,padding:"28px 24px",color:"var(--color-ink)"}}>
      <button onClick={()=>sPrv(false)} style={{position:"absolute",top:10,left:10,background:"#f0f0f0",border:"none",borderRadius:"50%",width:28,height:28,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
      <h2 style={{fontFamily:"var(--font-head)",fontSize:22,fontWeight:600,marginBottom:12}}>سياسة الخصوصية</h2>
      <div style={{fontSize:11,lineHeight:1.8,color:"var(--color-muted)"}}>
        <p style={{marginBottom:8}}>نجمع الاسم والهاتف فقط عند تعبئة النموذج — للتواصل بخصوص جون سوديك — June SODIC.</p>
        <p style={{marginBottom:8}}>بياناتك مشفرة HTTPS ومحمية عبر Web3Forms. لا نبيع أو نشارك بياناتك.</p>
        <p style={{marginBottom:8}}>يحق لك طلب الاطلاع أو التصحيح أو الحذف في أي وقت.</p>
        <p>تواصل: <a href={`tel:${PI}`} style={{color:"var(--color-accent)"}}>{PD}</a></p>
      </div>
    </div></>}

    {/* COOKIE */}
    {ck&&<div className="ck"><p>نستخدم cookies لتحسين تجربتك. <button onClick={()=>sPrv(true)} style={{background:"none",border:"none",color:"var(--color-accent2)",textDecoration:"underline",cursor:"pointer",fontSize:9,fontFamily:"var(--font-body)"}}>سياسة الخصوصية</button></p>
      <div className="ck-btns"><button className="ck-ok" onClick={()=>{sCk(false);try{localStorage.setItem("js_ck","1")}catch{}}}>موافق</button><button className="ck-no" onClick={()=>sCk(false)}>رفض</button></div>
    </div>}

    {/* MOBILE BAR */}
    <nav className="mbar"><div className="mbar-in">
      <a className="m-call" href={`tel:${PI}`} onClick={()=>trackCall("mb")}><Ph/>{PD}</a>
      <a className="m-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("mb")}>💬</a>
      <a className="m-book" href="#contact">سجل</a>
    </div></nav>
  </>);
}
