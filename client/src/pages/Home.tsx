import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  BadgeCheck,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  CircleCheck,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  Globe2,
  Headphones,
  Info,
  Landmark,
  MailCheck,
  MapPin,
  Menu,
  MessageCircle,
  IdCard,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "تأكيد الحساب",
    short: "البريد الإلكتروني",
    icon: MailCheck,
    eyebrow: "ابدأ من هنا",
    intro: "فعّل بريدك الإلكتروني في نظام خدمة المشترين حتى تتمكن من متابعة بقية الطلب.",
    bullets: [
      "سجّل الدخول إلى Buyer Service System الخاص بمعرض كانتون.",
      "من القائمة الجانبية، اختر Verify email.",
      "اضغط زر التأكيد وافتح رسالة التحقق المرسلة إلى بريدك.",
      "اضغط على الرابط داخل الرسالة لتفعيل الحساب.",
    ],
    note: "إذا لم تصلك الرسالة خلال دقائق، راجع مجلد الرسائل غير المرغوبة.",
    iconBg: "bg-sky-100 text-sky-700",
  },
  {
    number: "02",
    title: "البيانات الشخصية والجواز",
    short: "الملف الشخصي",
    icon: IdCard,
    eyebrow: "الدقة أولاً",
    intro: "أدخل بياناتك كما تظهر في جواز السفر تماماً، وارفع الصور المطلوبة بجودة واضحة.",
    bullets: [
      "من My profile اختر Complete personal information.",
      "اختر Overseas Passport وأدخل رقم الوثيقة والدولة.",
      "ارفع صورة الجواز وصورة Badge بخلفية بيضاء.",
      "أضف بطاقة العمل ونية الشراء والمسمى الوظيفي، ثم احفظ.",
    ],
    note: "تطابق الاسم ورقم الجواز بين النظام والخطاب أمر حاسم لقبول الطلب.",
    iconBg: "bg-violet-100 text-violet-700",
  },
  {
    number: "03",
    title: "بيانات الشركة",
    short: "معلومات النشاط",
    icon: Building2,
    eyebrow: "بيانات رسمية",
    intro: "بيانات الشركة ستظهر في خطاب الدعوة، لذلك اكتبها كما هي في السجل التجاري.",
    bullets: [
      "من Company management اختر My company (organization).",
      "حدد نوع الشركة ونوع النشاط، مثل Importer and Exporter.",
      "أدخل الاسم الإنجليزي وكود الشركة ونطاق الأعمال.",
      "اختر الدولة والمدينة وأضف العنوان التفصيلي، ثم احفظ.",
    ],
    note: "راجع الاسم والكود والعنوان مرتين قبل الانتقال للخطوة التالية.",
    iconBg: "bg-amber-100 text-amber-700",
  },
  {
    number: "04",
    title: "التقديم على خطاب الدعوة",
    short: "Invitation Apply",
    icon: FileCheck2,
    eyebrow: "قدّم الطلب",
    intro: "بعد اكتمال ملفك وبيانات شركتك، راجع الطلب ثم أرسله للحفظ والمراجعة.",
    bullets: [
      "من Invitation letter اختر My invitation letters.",
      "اضغط Apply for invitation letter الذهبي.",
      "راجع بيانات المشتري والجواز والبريد وبيانات الشركة.",
      "حدد نية الشراء والفئات المناسبة، ثم اضغط Submit للحفظ.",
    ],
    note: "يمكن التقديم حتى 5 مرات في الدورة؛ الطلب الجديد يلغي صلاحية السابق.",
    iconBg: "bg-rose-100 text-rose-700",
  },
  {
    number: "05",
    title: "تحميل خطاب الدعوة",
    short: "جاهز للتأشيرة",
    icon: Download,
    eyebrow: "الخطوة الأخيرة",
    intro: "عند الموافقة، حمّل أحدث خطاب دعوة واطبعه لإرفاقه بملف طلب التأشيرة.",
    bullets: [
      "افتح My invitation letters من القائمة الجانبية.",
      "ابحث عن الطلب الذي يحمل حالة Approved.",
      "من عمود Operations اضغط View invitation letters.",
      "حمّل الخطاب واحتفظ بالنسخة الأحدث لتقديمها للسفارة.",
    ],
    note: "استخدم دائماً أحدث خطاب؛ الخطابات السابقة تصبح غير صالحة عند صدور طلب جديد.",
    iconBg: "bg-emerald-100 text-emerald-700",
  },
];

const phases = [
  { number: "01", title: "التصنيع المتقدم", english: "Advanced Manufacturing", dates: "15 – 19 أكتوبر 2026", meta: "5 أيام", tone: "navy" },
  { number: "02", title: "حياة منزلية بجودة عالية", english: "Quality Home Life", dates: "23 – 27 أكتوبر 2026", meta: "5 أيام", tone: "gold" },
  { number: "03", title: "حياة أفضل", english: "Better Life", dates: "31 أكتوبر – 4 نوفمبر 2026", meta: "5 أيام", tone: "teal" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label"><span className="section-label-line" />{children}</div>;
}

export default function Home() {
  const [completed, setCompleted] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem("canton-guide-progress") || "[]"); } catch { return []; }
  });
  const [activeStep, setActiveStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllSteps, setShowAllSteps] = useState(false);

  const progress = Math.round((completed.length / steps.length) * 100);
  const nextStep = useMemo(() => steps.findIndex((_, index) => !completed.includes(index)), [completed]);

  const toggleStep = (index: number) => {
    const next = completed.includes(index) ? completed.filter((item) => item !== index) : [...completed, index].sort();
    setCompleted(next);
    localStorage.setItem("canton-guide-progress", JSON.stringify(next));
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div dir="rtl" className="min-h-screen overflow-x-hidden bg-[#f7f5f0] text-[#152533]">
      <div className="top-strip"><div className="container flex items-center justify-between gap-4"><span>الدورة 140 · خريف 2026</span><span className="hidden sm:inline-flex items-center gap-2"><MapPin size={13} /> قوانغتشو · الصين</span></div></div>

      <header className="sticky top-0 z-50 border-b border-[#e5e1d8]/80 bg-[#f7f5f0]/90 backdrop-blur-xl">
        <div className="container flex h-[76px] items-center justify-between gap-6">
          <button onClick={() => scrollTo("top")} className="brand group flex items-center gap-3 text-right" aria-label="العودة إلى بداية الدليل">
            <span className="brand-mark"><span>AP</span></span>
            <span><strong className="block text-[15px] tracking-[.12em] text-[#102337]">APEX GROUP</strong><small className="mt-0.5 block text-[10px] font-semibold tracking-[.16em] text-[#9a7950]">IMPORT · EXPORT · SOURCING</small></span>
          </button>
          <nav className="hidden items-center gap-8 text-[13px] font-semibold text-[#64717b] md:flex" aria-label="التنقل الرئيسي">
            <button onClick={() => scrollTo("overview")} className="nav-link">عن المعرض</button>
            <button onClick={() => scrollTo("steps")} className="nav-link">خطوات التقديم</button>
            <button onClick={() => scrollTo("requirements")} className="nav-link">المتطلبات</button>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" onClick={() => setMenuOpen(false)} className="hidden rounded-full bg-[#102337] px-4 py-2.5 text-[12px] font-bold text-white transition hover:bg-[#24435b] sm:inline-flex">تحدث مع مستشار <ArrowLeft size={14} className="mr-1" /></a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-xl border border-[#ddd8cd] p-2.5 text-[#102337] md:hidden" aria-label="فتح القائمة">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
        {menuOpen && <div className="container border-t border-[#e5e1d8] py-4 md:hidden"><div className="grid gap-2 text-sm font-semibold"><button onClick={() => scrollTo("overview")} className="rounded-lg p-3 text-right hover:bg-white">عن المعرض</button><button onClick={() => scrollTo("steps")} className="rounded-lg p-3 text-right hover:bg-white">خطوات التقديم</button><button onClick={() => scrollTo("requirements")} className="rounded-lg p-3 text-right hover:bg-white">المتطلبات</button></div></div>}
      </header>

      <main id="top">
        <section className="hero-section relative">
          <div className="hero-grid" />
          <div className="container relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.12fr_.88fr] lg:gap-20 lg:py-28">
            <div className="max-w-2xl animate-rise">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d6b67d]/50 bg-[#fffaf0]/70 px-4 py-2 text-[11px] font-bold text-[#97703d]"><Sparkles size={14} /> دليلك المعتمد للخطوة التالية</div>
              <h1 className="display-title max-w-3xl text-[#102337]">خطواتك إلى <em>كانتـون</em><br /><span>تبدأ من هنا.</span></h1>
              <p className="mt-7 max-w-xl text-[16px] leading-8 text-[#5a6871] sm:text-[18px]">دليل تفاعلي واضح من تأكيد حسابك حتى تحميل خطاب الدعوة، مصمم ليجعل تقديمك لمعرض كانتون أسهل وأكثر اطمئناناً.</p>
              <div className="mt-9 flex flex-wrap items-center gap-3"><button onClick={() => scrollTo("steps")} className="primary-btn">ابدأ خطوات التقديم <ArrowLeft size={17} /></button><button onClick={() => scrollTo("overview")} className="ghost-btn">اكتشف تفاصيل المعرض <ChevronLeft size={17} /></button></div>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-[#ddd7ca] pt-6 text-[12px] font-semibold text-[#697780]"><span className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-[#b38444]" /> معلومات مرتبة وموثوقة</span><span className="inline-flex items-center gap-2"><Clock3 size={16} className="text-[#b38444]" /> متابعة في كل مرحلة</span></div>
            </div>

            <div className="relative mx-auto w-full max-w-[430px] animate-float lg:justify-self-end">
              <div className="hero-card-accent" />
              <div className="hero-card relative overflow-hidden rounded-[28px] border border-white/50 p-7 text-white shadow-[0_30px_80px_rgba(16,35,55,.2)] sm:p-9">
                <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full border border-white/10" /><div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full border border-[#caa66d]/25" />
                <div className="relative flex items-start justify-between"><div><div className="text-[10px] font-bold tracking-[.18em] text-[#d9bd89]">CANTON FAIR</div><div className="mt-2 text-[24px] font-extrabold tracking-tight">خريف 2026</div></div><Landmark className="text-[#d9bd89]" size={30} strokeWidth={1.2} /></div>
                <div className="relative mt-12 border-t border-white/15 pt-6"><div className="text-[11px] font-semibold text-white/55">الدورة القادمة</div><div className="mt-1 text-[22px] font-bold">140</div><div className="mt-5 flex items-center justify-between text-[11px] text-white/60"><span className="inline-flex items-center gap-2"><CalendarDays size={14} /> أكتوبر — نوفمبر</span><span>قوانغتشو، الصين</span></div></div>
                <div className="relative mt-9 flex items-center justify-between rounded-2xl bg-white/10 p-4"><div><div className="text-[10px] text-white/55">خطوات الدليل</div><div className="mt-1 text-sm font-bold">5 مراحل واضحة</div></div><div className="flex -space-x-2 space-x-reverse">{steps.map((step, i) => <span key={step.number} className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1c3d54] text-[10px] font-extrabold ${completed.includes(i) ? "bg-[#c69b5a]" : "bg-[#325772]"}`}>{completed.includes(i) ? <Check size={13} /> : step.number}</span>)}</div></div>
              </div>
              <div className="absolute -bottom-5 -right-5 hidden items-center gap-3 rounded-2xl border border-[#e7e1d5] bg-white p-3.5 shadow-lg sm:flex"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e9f5ef] text-[#2c8c61]"><CircleCheck size={19} /></span><span><strong className="block text-[12px] text-[#193247]">تقدمك محفوظ</strong><small className="text-[10px] text-[#839099]">يُحفظ تلقائياً على جهازك</small></span></div>
            </div>
          </div>
        </section>

        <section id="overview" className="bg-white py-20 sm:py-28">
          <div className="container">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><SectionLabel>نظرة سريعة</SectionLabel><h2 className="section-title mt-4">معرض عالمي، <span>ثلاث فرص.</span></h2></div><p className="max-w-md text-sm leading-7 text-[#72808a]">يقام معرض كانتون في مدينة قوانغتشو على ثلاث مراحل متخصصة. اختر المرحلة الأقرب لنشاطك التجاري وخطط لزيارتك مبكراً.</p></div>
            <div className="grid gap-4 lg:grid-cols-3">{phases.map((phase, index) => <div key={phase.number} className={`phase-card phase-${phase.tone} group relative overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl`}><div className="relative z-10 flex items-start justify-between"><span className="phase-number">{phase.number}</span><CalendarDays size={20} className="opacity-70" /></div><div className="relative z-10 mt-16"><div className="mb-2 text-[10px] font-bold tracking-[.12em] opacity-65">PHASE {phase.number}</div><h3 className="text-xl font-extrabold leading-8">{phase.title}</h3><p className="mt-1 text-[12px] font-medium opacity-65">{phase.english}</p><div className="mt-7 flex items-center justify-between border-t border-current/15 pt-4 text-xs font-bold"><span>{phase.dates}</span><span className="opacity-65">{phase.meta}</span></div></div><div className="phase-orb" /></div>)}</div>
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#f6f4ee] px-5 py-4 text-xs font-semibold text-[#737e84]"><Info size={16} className="shrink-0 text-[#ad814b]" /> فترات التفكيك والتركيب: 20–22 أكتوبر و28–30 أكتوبر — المعرض مغلق خلال هذه الفترات.</div>
          </div>
        </section>

        <section id="steps" className="steps-section py-20 sm:py-28">
          <div className="container grid gap-14 lg:grid-cols-[.36fr_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start"><SectionLabel>دليل التنفيذ</SectionLabel><h2 className="section-title mt-4">خمس خطوات،<br /><span>بلا تعقيد.</span></h2><p className="mt-5 text-sm leading-7 text-[#71808a]">تابع تقدمك خطوة بخطوة. عند إتمام أي مرحلة، علّم عليها لتبقى الصورة واضحة أمامك.</p><div className="progress-panel mt-8 rounded-2xl bg-[#102337] p-5 text-white"><div className="flex items-end justify-between"><div><div className="text-[11px] font-bold text-white/55">تقدمك الإجمالي</div><div className="mt-1 text-4xl font-extrabold">{progress}<span className="text-xl text-[#c69b5a]">%</span></div></div><div className="text-left text-[11px] font-semibold text-white/55">أكملت {completed.length} من {steps.length}</div></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-l from-[#d6b06e] to-[#ad7b3e] transition-all duration-500" style={{ width: `${progress}%` }} /></div><p className="mt-4 text-[11px] leading-5 text-white/55">{progress === 100 ? "أحسنت! أكملت جميع خطوات الدليل." : `الخطوة التالية: ${nextStep >= 0 ? steps[nextStep].title : "أكملت الدليل"}`}</p></div></div>
            <div className="space-y-4">{steps.map((step, index) => { const Icon = step.icon; const isOpen = activeStep === index; const isDone = completed.includes(index); return <article key={step.number} className={`step-card overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${isOpen ? "border-[#caa66d] shadow-[0_16px_45px_rgba(16,35,55,.08)]" : "border-[#e8e4db]"}`}><button onClick={() => setActiveStep(isOpen ? -1 : index)} className="flex w-full items-center gap-4 p-5 text-right sm:p-6" aria-expanded={isOpen}><span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-extrabold ${isDone ? "bg-[#e8f5ed] text-[#31825d]" : step.iconBg}`}><Icon size={21} strokeWidth={1.8} /></span><span className="min-w-0 flex-1"><span className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#ad814b]"><span>{step.eyebrow}</span>{isDone && <span className="rounded-full bg-[#e8f5ed] px-2 py-0.5 text-[#31825d]">مكتملة</span>}</span><strong className="block text-[16px] font-extrabold text-[#172f43] sm:text-[18px]">{step.title}</strong><span className="mt-1 block text-xs text-[#839099]">الخطوة {step.number} من 05 · {step.short}</span></span><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${isOpen ? "bg-[#102337] text-white" : "bg-[#f5f2ec] text-[#8a969b]"}`}>{isOpen ? <ChevronDown size={17} /> : <ChevronLeft size={17} />}</span></button>{isOpen && <div className="border-t border-[#eeeae2] px-5 pb-6 pt-5 sm:px-6"><p className="max-w-2xl text-sm leading-7 text-[#5e6d76]">{step.intro}</p><ol className="mt-5 grid gap-3">{step.bullets.map((bullet, bulletIndex) => <li key={bullet} className="flex items-start gap-3 text-[13px] leading-6 text-[#45545e]"><span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f3eadb] text-[10px] font-extrabold text-[#a3753f]">{bulletIndex + 1}</span><span>{bullet}</span></li>)}</ol><div className="mt-5 flex items-start gap-2 rounded-xl bg-[#fff8eb] p-3 text-xs leading-5 text-[#8d6e42]"><Info size={15} className="mt-0.5 shrink-0" /> {step.note}</div><button onClick={() => toggleStep(index)} className={`mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-bold transition ${isDone ? "bg-[#e8f5ed] text-[#31825d] hover:bg-[#d9efdf]" : "bg-[#102337] text-white hover:bg-[#24435b]"}`}>{isDone ? <><Check size={15} /> تم إكمال هذه الخطوة</> : <><CircleCheck size={15} /> وضع علامة كمكتملة</>}</button></div>}</article>; })}</div>
          </div>
        </section>

        <section id="requirements" className="bg-white py-20 sm:py-24"><div className="container grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div><SectionLabel>قبل أن تبدأ</SectionLabel><h2 className="section-title mt-4">جهّز ملفك،<br /><span>ووفّر وقتك.</span></h2><p className="mt-5 max-w-lg text-sm leading-7 text-[#71808a]">وجود هذه المتطلبات بجانبك يجعل تعبئة البيانات أسرع ويقلل احتمالية الأخطاء أو التأخير في المراجعة.</p><div className="mt-8 grid gap-3 sm:grid-cols-2"><div className="requirement-item"><span><IdCard size={18} /></span><div><strong>جواز سفر ساري</strong><small>صورة واضحة وكاملة</small></div></div><div className="requirement-item"><span><UserRound size={18} /></span><div><strong>صورة شخصية</strong><small>مطابقة لصورة الجواز</small></div></div><div className="requirement-item"><span><BadgeCheck size={18} /></span><div><strong>بطاقة عمل</strong><small>حديثة وواضحة</small></div></div><div className="requirement-item"><span><Building2 size={18} /></span><div><strong>بيانات الشركة</strong><small>الاسم والكود والعنوان</small></div></div></div></div><div className="timeline-card rounded-3xl bg-[#f7f5f0] p-7 sm:p-9"><div className="flex items-center justify-between"><div><div className="text-[11px] font-bold tracking-[.14em] text-[#a37843]">TIMELINE</div><h3 className="mt-2 text-xl font-extrabold text-[#172f43]">الوقت المتوقع للمعالجة</h3></div><Clock3 className="text-[#bd9155]" size={28} strokeWidth={1.4} /></div><div className="mt-8 space-y-5">{[{label:"تأكيد الحساب", time:"فوري", width:"w-[18%]", color:"bg-[#7ca9bd]"},{label:"مراجعة البيانات", time:"1–3 أيام", width:"w-[42%]", color:"bg-[#aa87c0]"},{label:"خطاب الدعوة", time:"3–7 أيام", width:"w-[72%]", color:"bg-[#c79855]"}].map(item => <div key={item.label}><div className="mb-2 flex justify-between text-xs font-bold text-[#5f6d75]"><span>{item.label}</span><span className="text-[#a37843]">{item.time}</span></div><div className="h-2 overflow-hidden rounded-full bg-[#e8e3d8]"><div className={`h-full rounded-full ${item.color} ${item.width}`} /></div></div>)}</div><div className="mt-8 flex items-center justify-between border-t border-[#e3ded3] pt-5"><span className="text-xs font-semibold text-[#78848a]">الإجمالي التقريبي</span><strong className="text-lg text-[#172f43]">5–10 أيام</strong></div></div></div></section>

        <section id="contact" className="contact-section"><div className="container relative flex flex-col items-start justify-between gap-8 py-16 sm:flex-row sm:items-center sm:py-20"><div><div className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold tracking-[.13em] text-[#d8b47a]"><Headphones size={15} /> WE ARE HERE TO HELP</div><h2 className="text-3xl font-extrabold text-white sm:text-4xl">هل تحتاج إلى مساعدة؟</h2><p className="mt-3 max-w-lg text-sm leading-7 text-white/60">تواصل مع مستشار APEX GROUP مباشرة لأي استفسار حول خطوات التقديم أو تجهيز ملفك.</p></div><a href="https://wa.me/8619511382336" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-2xl bg-[#d5ad6d] px-6 py-4 text-sm font-extrabold text-[#172f43] transition hover:bg-[#e5c183]"><MessageCircle size={19} /> اسأل المستشار مباشرة <ArrowLeft size={16} /></a></div></section>
      </main>

      <footer className="bg-[#0c1c2b] text-white"><div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto]"><div><div className="flex items-center gap-3"><span className="brand-mark small"><span>AP</span></span><div><strong className="block text-sm tracking-[.12em]">APEX GROUP</strong><small className="text-[9px] tracking-[.16em] text-[#c9a76c]">IMPORT · EXPORT · SOURCING</small></div></div><p className="mt-5 max-w-xs text-xs leading-6 text-white/45">دليل إرشادي لعملائنا لمساعدتهم في التقديم على خطاب دعوة معرض كانتون.</p></div><div><div className="mb-4 text-[11px] font-bold tracking-[.12em] text-[#c9a76c]">CONTACT</div><div className="space-y-3 text-xs text-white/55"><div className="flex items-center gap-2"><Phone size={14} /> +86 195 1138 2336</div><div className="flex items-center gap-2"><Phone size={14} /> +86 134 8698 2993</div></div></div><div><div className="mb-4 text-[11px] font-bold tracking-[.12em] text-[#c9a76c]">OFFICE</div><div className="flex max-w-[210px] items-start gap-2 text-xs leading-6 text-white/55"><MapPin size={14} className="mt-1 shrink-0" /> Rm. 2774, 27F, Hongji Building, Yiwu, China</div></div></div><div className="border-t border-white/10"><div className="container flex flex-col justify-between gap-2 py-5 text-[10px] text-white/35 sm:flex-row"><span>© 2026 APEX GROUP. جميع الحقوق محفوظة.</span><span>دليل معرض كانتون الدولي · الدورة 140</span></div></div></footer>
    </div>
  );
}
