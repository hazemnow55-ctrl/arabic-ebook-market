import { useMemo, useState } from "react";
import { startLogin } from "@/const";
import {
  ArrowLeft, ArrowUpLeft, Bell, BookOpen, Check, CheckCircle2, ChevronDown,
  Clock3, Crown, Download, FileText, Heart, LibraryBig, LockKeyhole, Menu,
  Plus, Search, ShoppingBag, Sparkles, Star, Tags, UploadCloud, UserRound, X,
} from "lucide-react";
import { toast } from "sonner";

type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  price: string;
  rating: string;
  readers: string;
  tone: string;
  accent: string;
  badge?: string;
  free?: boolean;
};

const books: Book[] = [
  { id: 1, title: "مرايا بعيدة", author: "ليان السالمي", category: "روايات", price: "24 ر.س", rating: "4.9", readers: "2.4k", tone: "linear-gradient(145deg,#d76f4c,#a94c42 48%,#713c48)", accent: "#f3c985", badge: "الأكثر قراءة" },
  { id: 2, title: "فن اللامبالاة الهادئة", author: "سليم النجار", category: "تطوير الذات", price: "19 ر.س", rating: "4.8", readers: "1.8k", tone: "linear-gradient(160deg,#193b45,#205a5c 55%,#c0a271)", accent: "#f1dbad", badge: "اختيار المحررين" },
  { id: 3, title: "على حافة الضوء", author: "نورة مراد", category: "شعر", price: "مجاني", rating: "4.7", readers: "4.1k", tone: "linear-gradient(160deg,#e7bb98,#9d5e58 58%,#4c4258)", accent: "#f8e7c6", badge: "جديد", free: true },
  { id: 4, title: "خرائط المعنى", author: "بدر الحربي", category: "فكر وفلسفة", price: "29 ر.س", rating: "4.9", readers: "1.2k", tone: "linear-gradient(150deg,#536e5a,#9ca971 52%,#ded4a4)", accent: "#213b3a" },
  { id: 5, title: "أصوات المدينة القديمة", author: "هند قاسم", category: "تاريخ", price: "22 ر.س", rating: "4.6", readers: "896", tone: "linear-gradient(160deg,#5b4841,#a97958 58%,#d9b989)", accent: "#f4dfbc" },
  { id: 6, title: "دليل الكاتب الأول", author: "آدم القحطاني", category: "تعلم", price: "15 ر.س", rating: "4.8", readers: "1.1k", tone: "linear-gradient(145deg,#c5a36a,#e2c98d 42%,#4c5b55)", accent: "#254544" },
];
const categories = ["الكل", "روايات", "تطوير الذات", "شعر", "فكر وفلسفة", "تاريخ", "تعلم"];

function Cover({ book, compact = false }: { book: Book; compact?: boolean }) {
  return <div className={`book-cover ${compact ? "book-cover-compact" : ""}`} style={{ background: book.tone, color: book.accent }}>
    <div className="cover-grain" /><div className="cover-topline">نُسخ · {book.category}</div><div className="cover-orbit" />
    <div className="cover-content"><span>إصدار ٢٠٢٤</span><strong>{book.title}</strong><small>{book.author}</small></div><div className="cover-number">0{book.id}</div>
  </div>;
}
function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: string }) {
  return <div className="section-heading"><div><div className="eyebrow"><span />{eyebrow}</div><h2>{title}</h2></div>{action && <button className="text-link" onClick={() => toast.success("نعمل على تجهيز المزيد من الإصدارات")}>{action}<ArrowLeft size={16} /></button>}</div>;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([2]);
  const [cart, setCart] = useState<number[]>([]);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("الأكثر شعبية");
  const [selectedFile, setSelectedFile] = useState("");
  const filteredBooks = useMemo(() => {
    const result = books.filter((book) => (activeCategory === "الكل" || book.category === activeCategory) && `${book.title} ${book.author} ${book.category}`.toLowerCase().includes(query.toLowerCase()));
    if (sort === "السعر الأقل") return [...result].sort((a, b) => Number.parseInt(a.price) - Number.parseInt(b.price));
    if (sort === "الأعلى تقييماً") return [...result].sort((a, b) => Number(b.rating) - Number(a.rating));
    return result;
  }, [activeCategory, query, sort]);
  const addToCart = (book: Book) => { if (book.free) return toast.success("أُضيف الكتاب إلى مكتبتك المجانية"); setCart((current) => current.includes(book.id) ? current : [...current, book.id]); toast.success("أُضيف الكتاب إلى سلة القراءة"); };
  const submitUpload = () => { if (!selectedFile) return toast.error("اختر ملف الكتاب أولاً"); setUploadOpen(false); setSelectedFile(""); toast.success("تم استلام كتابك — سيظهر بعد المراجعة خلال 24 ساعة"); };
  return <div dir="rtl" className="site-shell">
    <div className="announcement"><Sparkles size={14} /> انضم إلى مجتمع يقرأ أكثر · شحن رقمي فوري لكل كتاب <ArrowUpLeft size={15} /></div>
    <header className="main-header">
      <a className="brand" href="#top"><span className="brand-mark"><BookOpen size={20} strokeWidth={2.4} /></span><span><strong>نُسخ</strong><small>مكتبتك، بصوتك</small></span></a>
      <nav className={`main-nav ${menuOpen ? "open" : ""}`}><a className="active" href="#discover" onClick={() => setMenuOpen(false)}>اكتشف</a><a href="#categories" onClick={() => setMenuOpen(false)}>التصنيفات</a><a href="#for-authors" onClick={() => setMenuOpen(false)}>للكتّاب</a><a href="#about" onClick={() => setMenuOpen(false)}>عن نُسخ</a></nav>
      <div className="header-actions"><button className="icon-button notification-button" aria-label="الإشعارات" onClick={() => toast("لا توجد إشعارات جديدة")}><Bell size={19} /><i /></button><button className="cart-button" onClick={() => toast(cart.length ? `لديك ${cart.length} كتب في السلة` : "سلتك فارغة حالياً")}><ShoppingBag size={18} /><span>السلة</span>{cart.length > 0 && <b>{cart.length}</b>}</button><button className="login-button" onClick={() => startLogin()}><UserRound size={17} /> دخول</button><button className="mobile-menu" onClick={() => setMenuOpen((open) => !open)} aria-label="القائمة">{menuOpen ? <X /> : <Menu />}</button></div>
    </header>
    <main id="top">
      <section className="hero container"><div className="hero-copy"><div className="hero-kicker"><span className="sparkle-dot">✦</span> مكتبة رقمية للقرّاء الفضوليين</div><h1>كل صفحة<br /><em>تفتح باباً.</em></h1><p>اكتشف كتباً عربية تستحق وقتك، أو امنح كلماتك مساحة جديدة تصل بها إلى قارئها.</p><div className="hero-actions"><a href="#discover" className="primary-button">ابدأ الاستكشاف <ArrowLeft size={17} /></a><button className="secondary-button" onClick={() => setUploadOpen(true)}><UploadCloud size={17} /> ارفع كتابك</button></div><div className="hero-note"><span className="avatar-stack"><i>م</i><i>ل</i><i>س</i><i>+</i></span><span>انضم إلى أكثر من <strong>12,000 قارئ</strong> يشاركون شغفهم يومياً</span></div></div><div className="hero-art"><div className="hero-sun" /><div className="hero-label"><span>إصدار الشهر</span><strong>رحلة إلى الداخل</strong><small>نورا السعيد · 2024</small></div><div className="hero-book hero-book-back"><div className="hero-book-spine">نُسخ</div><div className="hero-book-title">أثر<br />خفيف</div><small>مجموعة مقالات</small></div><div className="hero-book hero-book-front"><div className="hero-book-spine">نُسخ</div><div className="hero-book-title">رحلة<br />إلى الداخل</div><small>نورا السعيد</small><span className="hero-book-stamp">مختارات<br />المحرر</span></div><div className="hero-art-caption"><span>01</span><div><strong>مختارات نُسخ</strong><small>كتب تترك أثراً، لا ضجيجاً</small></div></div></div></section>
      <section className="trust-strip container"><div><span className="trust-icon"><CheckCircle2 /></span><span><strong>دفع آمن</strong><small>حماية كاملة لمعلوماتك</small></span></div><div><span className="trust-icon"><Download /></span><span><strong>تحميل فوري</strong><small>كتابك معك في ثوانٍ</small></span></div><div><span className="trust-icon"><Crown /></span><span><strong>كتّاب مستقلون</strong><small>ادعم صوتاً جديداً</small></span></div><div><span className="trust-icon"><LockKeyhole /></span><span><strong>خصوصيتك أولاً</strong><small>نحترم وقتك وبياناتك</small></span></div></section>
      <section id="discover" className="discover-section container"><SectionHeading eyebrow="مختارات اليوم" title="كتب قد تعجبك" action="عرض الكل" /><div className="featured-grid"><article className="featured-card featured-main"><div className="featured-visual"><div className="featured-book"><div>حين<br />يصمت<br />الضوء</div><small>سارة الغامدي</small></div><span className="featured-sticker">رواية قصيرة<br /><strong>تُقرأ في جلسة</strong></span></div><div className="featured-info"><div className="mini-tag">ترشيح نُسخ <Sparkles size={13} /></div><h3>حين يصمت الضوء</h3><p>سارة الغامدي</p><div className="featured-bottom"><span className="rating"><Star size={15} fill="currentColor" /> 4.9 <small>(328 قراءة)</small></span><strong>18 ر.س</strong><button onClick={() => addToCart(books[0])}>أضف للسلة <Plus size={16} /></button></div></div></article><article className="quote-card"><div className="quote-mark">“</div><blockquote>الكتاب الجيد لا يجيب عن أسئلتك، بل يجعلك تحبها أكثر.</blockquote><div className="quote-source"><span className="quote-avatar">ع</span><span><strong>عمر الرفاعي</strong><small>قارئ نُسخ منذ 2022</small></span></div></article></div></section>
      <section id="categories" className="library-section container"><div className="library-toolbar"><SectionHeading eyebrow="المكتبة" title="ما الذي تقرأه اليوم؟" /><div className="library-tools"><div className="search-box"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث عن كتاب، كاتب..." /><kbd>⌘ K</kbd></div><div className="sort-wrap"><button className="sort-button" onClick={() => setSortOpen((open) => !open)}><Tags size={16} /> {sort}<ChevronDown size={15} /></button>{sortOpen && <div className="sort-menu">{["الأكثر شعبية", "الأعلى تقييماً", "السعر الأقل"].map((item) => <button key={item} onClick={() => { setSort(item); setSortOpen(false); }}>{item}{sort === item && <Check size={15} />}</button>)}</div>}</div></div></div><div className="category-tabs">{categories.map((category) => <button key={category} className={activeCategory === category ? "selected" : ""} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><div className="book-grid">{filteredBooks.map((book) => <article className="book-card" key={book.id}><div className="book-card-cover-wrap"><Cover book={book} /><button className={`favorite-button ${favorites.includes(book.id) ? "liked" : ""}`} aria-label="إضافة للمفضلة" onClick={() => setFavorites((current) => current.includes(book.id) ? current.filter((item) => item !== book.id) : [...current, book.id])}><Heart size={17} fill={favorites.includes(book.id) ? "currentColor" : "none"} /></button>{book.badge && <span className="book-badge">{book.badge}</span>}</div><div className="book-card-info"><div className="book-category">{book.category}</div><h3>{book.title}</h3><p>{book.author}</p><div className="book-meta"><span className="rating"><Star size={14} fill="currentColor" /> {book.rating}</span><span><Clock3 size={13} /> 4 س</span><span>{book.readers} قارئ</span></div><div className="book-price"><strong className={book.free ? "free-price" : ""}>{book.price}</strong><button onClick={() => addToCart(book)}>{book.free ? "اقرأ مجاناً" : "أضف للسلة"}</button></div></div></article>)}</div>{filteredBooks.length === 0 && <div className="empty-state"><BookOpen size={30} /><h3>لم نجد كتاباً بهذه المواصفات</h3><p>جرّب كلمة بحث مختلفة أو تصفح كل التصنيفات.</p><button onClick={() => { setQuery(""); setActiveCategory("الكل"); }}>إظهار كل الكتب</button></div>}<div className="library-footer"><span>تظهر {filteredBooks.length} من 248 كتاباً</span><button onClick={() => toast.success("تم تحميل المزيد من الكتب")}>تحميل المزيد <ArrowLeft size={16} /></button></div></section>
      <section id="for-authors" className="author-banner container"><div className="author-copy"><div className="eyebrow light"><span />للكتّاب وصنّاع المعرفة</div><h2>كلماتك تستحق<br /><em>قارئها القادم.</em></h2><p>ارفع كتابك، حدّد سعرك، واترك لنا مهمة الوصول إلى القرّاء الذين يبحثون عن صوتك.</p><button className="light-button" onClick={() => setUploadOpen(true)}>ابدأ نشر كتابك <ArrowLeft size={17} /></button></div><div className="author-stats"><div><strong>85%</strong><span>من قيمة البيع<br />تعود إليك</span></div><div><strong>24h</strong><span>مراجعة ونشر<br />بشفافية</span></div><div><strong>∞</strong><span>كتبك تبقى<br />متاحة دائماً</span></div></div><div className="author-orb author-orb-one" /><div className="author-orb author-orb-two" /><div className="author-lines" /></section>
      <section id="about" className="newsletter container"><div className="newsletter-icon"><LibraryBig size={22} /></div><div><div className="eyebrow"><span />نشرة نُسخ</div><h2>رسالة صغيرة، كتاب كبير.</h2><p>ترشيحات أسبوعية منتقاة بعناية، بلا ضجيج ولا رسائل زائدة.</p></div><form onSubmit={(e) => { e.preventDefault(); toast.success("أهلاً بك في نشرة نُسخ"); }}><input type="email" placeholder="بريدك الإلكتروني" required /><button type="submit">اشترك <ArrowLeft size={16} /></button></form></section>
    </main>
    <footer className="footer container"><div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark"><BookOpen size={20} /></span><span><strong>نُسخ</strong><small>مكتبتك، بصوتك</small></span></a><p>مساحة عربية للكتب التي تضيء<br />شيئاً في الداخل.</p></div><div className="footer-links"><div><strong>استكشف</strong><a href="#discover">المكتبة</a><a href="#categories">التصنيفات</a><a href="#discover">الأكثر قراءة</a></div><div><strong>للكتّاب</strong><a href="#for-authors">انشر كتابك</a><a href="#for-authors">كيف تعمل نُسخ؟</a><a href="#for-authors">الأسئلة الشائعة</a></div><div><strong>تواصل</strong><a href="mailto:hello@nuskha.example">hello@nuskha.example</a><a href="#about">انستغرام</a><a href="#about">تويتر / X</a></div></div><div className="footer-bottom"><span>© 2024 نُسخ. صُنع بحب للغة العربية.</span><span>الشروط · الخصوصية</span></div></footer>
    {uploadOpen && <div className="modal-backdrop" onClick={() => setUploadOpen(false)}><div className="upload-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setUploadOpen(false)} aria-label="إغلاق"><X size={20} /></button><div className="upload-modal-icon"><UploadCloud size={24} /></div><div className="eyebrow"><span />بوابة الكتّاب</div><h2>شارك كتابك مع العالم</h2><p>نقبل ملفات PDF و EPUB حتى 50MB. راجع التفاصيل قبل الإرسال.</p><label className="drop-zone"><input type="file" accept=".pdf,.epub" onChange={(e) => setSelectedFile(e.target.files?.[0]?.name || "")} /><FileText size={28} /><strong>{selectedFile || "اسحب الملف هنا أو اختره"}</strong><span>PDF أو EPUB · حد أقصى 50MB</span></label><div className="upload-fields"><label>عنوان الكتاب<input placeholder="مثال: مرايا بعيدة" /></label><label>السعر<input placeholder="0.00 ر.س" /></label></div><button className="submit-upload" onClick={submitUpload}>إرسال للمراجعة <ArrowLeft size={17} /></button><small className="modal-note"><CheckCircle2 size={14} /> لا توجد رسوم لرفع كتابك</small></div></div>}
  </div>;
}
