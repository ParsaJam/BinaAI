// ========================================================
// مدیریت ناوبری افقی هدر ۵ قسمتی و فوتر (نسخه آپدیت شده)
// ========================================================
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page-section');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        goToPage(targetId);
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
});

function goToPage(pageId) {
    // مخفی کردن تمام بخش‌های اصلی پلتفرم جهت جلوگیری از هم‌پوشانی صفحات
    pages.forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('fade-in');
    });
    
    // پیدا کردن و فعال‌سازی بخش هدف کلیک‌شده (چه از هدر و چه از لینک‌های فوتر)
    const targetPage = document.getElementById(pageId);
if(targetPage) {
    targetPage.classList.remove('hidden');
    setTimeout(() => {
        targetPage.classList.add('fade-in');
    }, 10);
}

// نمایش بخش "چرا بینا‌آی" فقط در صفحه اصلی
const whySection = document.getElementById('why-us-section');
if(whySection) {
    if(pageId === 'sec-home') {
        whySection.classList.remove('hidden');
    } else {
        whySection.classList.add('hidden');
    }
}
    
    // مدیریت هوشمند نمایش بخش جداول مستندات و شاخص‌های کلیدی پروژه
    // این بخش به زیبایی در صفحات اصلی (خانه) و بوم کسب‌وکار در دسترس خواهد بود
    const tablesSection = document.getElementById('project-tables-section');
    if(tablesSection) {
        if(pageId === 'hero' || pageId === 'maturity-section' || pageId === 'maturity') {
            tablesSection.classList.remove('hidden');
        } else {
            tablesSection.classList.add('hidden');
        }
    }
    
    // بروزرسانی وضعیت دکمه‌های منوی بالای صفحه بر اساس ناوبری انجام شده
    navButtons.forEach(btn => btn.classList.remove('active'));
    // تطبیق دادن حالت فعال برای شناسه‌های هم‌نام یا متناظر سورس
    let mappedId = pageId;
    if(pageId === 'maturity-section') mappedId = 'maturity';
    if(pageId === 'competitors-section') mappedId = 'competitors';
    
    const activeButton = document.querySelector(`.nav-btn[data-target="${mappedId}"]`);
    if(activeButton) activeButton.classList.add('active');
    
    // انتقال اسکرول مرورگر به بالاترین نقطه با انیمیشن نرم
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================================
// متغیرهای عمومی قدیمی (برای فرآیند خرید ساده)
// ========================================================
let selectedGlass = 'medical';

// ========================================================
// توابع قدیمی مرتبط با نوع عینک، اسکن، بیمه و سفارش ساده
// ========================================================
function selectGlassType(type) {
    selectedGlass = type;
    const btnMedical = document.getElementById('btn-select-medical');
    const btnSun = document.getElementById('btn-select-sun');
    const insuranceSection = document.getElementById('insurance-section');
    const insuranceResult = document.getElementById('insurance-result');
    
    insuranceResult.classList.add('hidden');
    
    if (type === 'medical') {
        btnMedical.style.color = "var(--arvan-primary)";
        btnMedical.style.borderColor = "var(--arvan-primary)";
        btnMedical.style.background = "#eff6ff";
        
        btnSun.style.color = "#64748b";
        btnSun.style.borderColor = "var(--arvan-border)";
        btnSun.style.background = "transparent";
        
        insuranceSection.classList.remove('hidden');
    } else {
        btnSun.style.color = "#d97706";
        btnSun.style.borderColor = "#f59e0b";
        btnSun.style.background = "#fffbeb";
        
        btnMedical.style.color = "#64748b";
        btnMedical.style.borderColor = "var(--arvan-border)";
        btnMedical.style.background = "transparent";
        
        insuranceSection.classList.add('hidden');
    }
}

function simulateScan() {
    const fileInput = document.getElementById('face-upload');
    const resultBox = document.getElementById('scan-result');
    
    if (fileInput.files.length === 0) {
        alert("لطفاً ابتدا فایلی جهت آنالیز چهره بارگذاری نمایید.");
        return;
    }

    resultBox.classList.remove('hidden');
    resultBox.innerHTML = "⏳ سیستم در حال پردازش تصویر بر روی سرورهای ابری...";
    resultBox.style.backgroundColor = "#fffbeb";
    resultBox.style.color = "#b45309";
    resultBox.style.border = "1px solid #fde68a";

    setTimeout(() => {
        const faceShapes = [
            "بیضی (مناسب فریم‌های مستطیلی کلاسیک)", 
            "گرد (مناسب فریم‌های زاویه‌دار و چشم گربه‌ای)", 
            "کشیده (مناسب فریم‌های ویفرر یا خلبانی گرد)"
        ];
        const randomShape = faceShapes[Math.floor(Math.random() * faceShapes.length)];
        
        resultBox.style.backgroundColor = "#f0fdf4";
        resultBox.style.color = "#15803d";
        resultBox.style.border = "1px solid #bbf7d0";
        resultBox.innerHTML = `✅ آنالیز هوش مصنوعی کامل شد!<br><br>ساختار هندسی صورت شما: <strong>${randomShape}</strong> تشخیص داده شد.`;
    }, 1800); 
}

function calculateInsurance() {
    const insuranceType = document.getElementById('insurance-type').value;
    const resultBox = document.getElementById('insurance-result');
    
    resultBox.classList.remove('hidden');
    resultBox.style.backgroundColor = "#eff6ff";
    resultBox.style.color = "#1d4ed8";
    resultBox.style.border = "1px solid #bfdbfe";
    
    let discount = 0;
    let message = "";

    switch(insuranceType) {
        case "none":
            message = "⚠️ محاسبات به صورت آزاد اعمال می‌گردد.";
            resultBox.style.backgroundColor = "#f8fafc";
            resultBox.style.color = "#475569";
            resultBox.style.border = "1px solid #e2e8f0";
            break;
        case "tamin":
            discount = 150000;
            message = `✔️ تاییدیه تامین اجتماعی واصل شد.<br>سهمیه اعمالی: <strong>${discount.toLocaleString()} تومان</strong> کسر گردید.`;
            break;
        case "salamat":
            discount = 100000;
            message = `✔️ پورتال آنلاین بیمه سلامت تایید شد.<br>مبلغ کسر از فاکتور: <strong>${discount.toLocaleString()} تومان</strong>`;
            break;
        case "iran":
            discount = 600000;
            message = `✔️ تاییدیه سقف سهمیه بیمه تکمیلی ایران اخذ شد.<br>مبلغ تخفیف ساختاری: <strong>${discount.toLocaleString()} تومان</strong>`;
            break;
    }
    resultBox.innerHTML = message;
}

function submitUserOrder() {
    const finalResult = document.getElementById('order-final-result');
    const scanHidden = document.getElementById('scan-result').classList.contains('hidden');
    
    if (scanHidden) {
        alert("لطفاً ابتدا مرحله اول (اسکن هوشمند چهره) را انجام دهید.");
        return;
    }
    
    finalResult.classList.remove('hidden');
    finalResult.style.backgroundColor = "#eff6ff";
    finalResult.style.color = "#1d4ed8";
    finalResult.style.border = "1px solid #bfdbfe";
    finalResult.innerHTML = "⏳ در حال برقراری ارتباط امن با درگاه شبیه‌سازی بانکی...";
    
    setTimeout(() => {
        finalResult.style.backgroundColor = "#f0fdf4";
        finalResult.style.color = "#15803d";
        finalResult.style.border = "1px solid #bbf7d0";
        
        const typeText = (selectedGlass === 'medical') ? "طبی (با سهمیه درمانی)" : "آفتابی (آزاد)";
        finalResult.innerHTML = `🎉 <strong>تایید سفارش با موفقیت انجام شد!</strong><br><br>تراکنش بانکی تایید شد. فاکتور سفارش عینک ${typeText} صادر شده و جهت بررسی به پنل اپراتور مدیریت ارسال گردید.`;
    }, 1800);
}

// ========================================================
// بخش جدید: پایگاه داده لوکال، کاتالوگ، سبد خرید و سفارشات پیشرفته
// ========================================================
let productsData = [];
let shoppingCart = [];
let currentCategoryFilter = 'all';

let userOrdersList = [
    { id: "۱۰۴۲", date: "۱۴۰۵/۰۳/۱۵", total: "۱,۴۵۰,۰۰۰ تومان", payment: "پرداخت شده (بیمه آنلاین)", detail: "فریم طبی زایس مجهز به عدسی آنتی‌رفلکس Blue Control" },
    { id: "۱۰۳۹", date: "۱۴۰۴/۱۱/۰۲", total: "۸۹۰,۰۰۰ تومان", payment: "پرداخت شده (آزاد)", detail: "عینک آفتابی کلاسیک مدل کلاب‌مستر شیشه دودی" },
    { id: "۱۰۲۵", date: "۱۴۰۴/۰6/۱۰", total: "۱,۲۰۰,۰۰۰ تومان", payment: "پرداخت شده (بیمه تامین اجتماعی)", detail: "فریم طبی کائوچویی مستطیلی مشکی" }
];

function initProductsCatalog() {
    productsData = [
        // عینک‌های طبی
        { id: 'med-1', title: 'فریم طبی زایس کلاسیک', brand: 'ZEISS', category: 'medical', price: 1850000, icon: '👓', color: '#1e3a5f', material: 'تیتانیوم', shape: 'مستطیلی', rating: 4.8, reviews: 142, aiFit: 'بیضی', insurance: true, badge: 'پرفروش', desc: 'سبک‌وزن، ضدحساسیت، عدسی آنتی‌رفلکس Blue Control' },
        { id: 'med-2', title: 'فریم کائوچویی ماتیار', brand: 'Matiار', category: 'medical', price: 750000, icon: '👓', color: '#374151', material: 'کائوچو', shape: 'گرد', rating: 4.5, reviews: 98, aiFit: 'گرد', insurance: true, badge: 'اقتصادی', desc: 'سبک کلاسیک ایرانی، مناسب صورت‌های گرد و بیضی' },
        { id: 'med-3', title: 'فریم طبی ری‌بن RX5154', brand: 'Ray-Ban', category: 'medical', price: 2200000, icon: '👓', color: '#7c3aed', material: 'استات', shape: 'کلاب‌مستر', rating: 4.9, reviews: 231, aiFit: 'مستطیلی', insurance: true, badge: 'برتر', desc: 'طراحی آمریکایی اصیل، فریم دوتنی، دوام بالا' },
        { id: 'med-4', title: 'فریم مینیمال اسیلا', brand: 'ESSILOR', category: 'medical', price: 1400000, icon: '👓', color: '#0ea5e9', material: 'تیتانیوم', shape: 'بیضی', rating: 4.6, reviews: 75, aiFit: 'بیضی', insurance: true, badge: '', desc: 'طراحی بسیار نازک، مناسب عدسی‌های ضخیم، ۳۰ رنگ' },
        { id: 'med-5', title: 'فریم ورزشی اوکلی', brand: 'Oakley', category: 'medical', price: 3100000, icon: '👓', color: '#dc2626', material: 'O-Matter', shape: 'ورزشی', rating: 4.7, reviews: 54, aiFit: 'مستطیلی', insurance: true, badge: 'ورزشی', desc: 'مقاومت ضربه بالا، مناسب ورزشکاران، UV400' },
        { id: 'med-6', title: 'فریم بوفالو‌هورن دست‌ساز', brand: 'Persian Craft', category: 'medical', price: 5500000, icon: '👓', color: '#92400e', material: 'شاخ گاومیش', shape: 'مستطیلی', rating: 5.0, reviews: 18, aiFit: 'بیضی', insurance: true, badge: 'لاکچری', desc: 'ساخت دست، محصول ایرانی، منحصربه‌فرد' },
        { id: 'med-7', title: 'فریم ریم‌لس گراسیاس', brand: 'Gracias', category: 'medical', price: 980000, icon: '👓', color: '#6b7280', material: 'فلز', shape: 'بیضی', rating: 4.3, reviews: 89, aiFit: 'گرد', insurance: true, badge: '', desc: 'بدون فریم اطراف، ظاهر ظریف، بسیار سبک' },
        { id: 'med-8', title: 'فریم هوشمند Huawei X Gentle Monster', brand: 'Huawei', category: 'medical', price: 4200000, icon: '👓', color: '#1a56db', material: 'پلاستیک هوشمند', shape: 'گرد', rating: 4.4, reviews: 36, aiFit: 'بیضی', insurance: false, badge: 'هوشمند', desc: 'اسپیکر داخلی، اتصال بلوتوث، باتری ۵ ساعته' },
        // عینک‌های آفتابی
        { id: 'sun-1', title: 'آفتابی کلاسیک Wayfarer', brand: 'Ray-Ban', category: 'sun', price: 2850000, icon: '🕶️', color: '#1e3a5f', material: 'استات', shape: 'مستطیلی', rating: 4.9, reviews: 312, aiFit: 'بیضی', insurance: false, badge: 'آیکونیک', desc: 'کلاسیک‌ترین طرح آفتابی جهان، UV400، شیشه کریستال' },
        { id: 'sun-2', title: 'آفتابی Aviator RB3025', brand: 'Ray-Ban', category: 'sun', price: 2400000, icon: '🕶️', color: '#d97706', material: 'فلز طلایی', shape: 'قطره‌ای', rating: 4.8, reviews: 278, aiFit: 'مستطیلی', insurance: false, badge: 'پرفروش', desc: 'الهام‌گرفته از خلبانان، لنز Mirror، 3 لایه پوشش' },
        { id: 'sun-3', title: 'آفتابی اسپرت اوکلی Sutro', brand: 'Oakley', category: 'sun', price: 3600000, icon: '🕶️', color: '#dc2626', material: 'O-Matter', shape: 'ورزشی', rating: 4.7, reviews: 87, aiFit: 'مستطیلی', insurance: false, badge: 'ورزشی', desc: 'لنز Prizm برای وضوح رنگ، حفاظت ضربه ANSI Z87' },
        { id: 'sun-4', title: 'آفتابی کات گوچی GG1070S', brand: 'Gucci', category: 'sun', price: 7800000, icon: '🕶️', color: '#7c3aed', material: 'استات ایتالیایی', shape: 'پروانه‌ای', rating: 4.9, reviews: 41, aiFit: 'گرد', insurance: false, badge: 'لاکچری', desc: 'طراحی ایتالیایی اورجینال، لوگوی طلایی، کیف چرم' },
        { id: 'sun-5', title: 'آفتابی گربه‌ای Dior', brand: 'Dior', category: 'sun', price: 6500000, icon: '🕶️', color: '#ec4899', material: 'استات', shape: 'گربه‌ای', rating: 4.8, reviews: 63, aiFit: 'گرد', insurance: false, badge: 'ترند', desc: 'طرح Cat-Eye فرانسوی، لنز گرادیان، جعبه هدیه' },
        { id: 'sun-6', title: 'آفتابی اقتصادی Havana', brand: 'Lacoste', category: 'sun', price: 1200000, icon: '🕶️', color: '#059669', material: 'پلاستیک', shape: 'مستطیلی', rating: 4.2, reviews: 156, aiFit: 'بیضی', insurance: false, badge: 'اقتصادی', desc: 'گزینه‌ای مقرون‌به‌صرفه با کیفیت قابل قبول، UV400' },
        { id: 'sun-7', title: 'آفتابی گرد جان لنون', brand: 'Moscot', category: 'sun', price: 1800000, icon: '🕶️', color: '#b45309', material: 'فلز نقره', shape: 'گرد', rating: 4.5, reviews: 94, aiFit: 'مستطیلی', insurance: false, badge: 'رترو', desc: 'طرح دهه ۷۰، فریم نازک، لنز رنگی ارگانیک' },
        { id: 'sun-8', title: 'آفتابی پولاریزه بوش لمب', brand: 'Bausch+Lomb', category: 'sun', price: 2100000, icon: '🕶️', color: '#0284c7', material: 'نایلون', shape: 'بیضی', rating: 4.6, reviews: 118, aiFit: 'گرد', insurance: false, badge: 'پولاریزه', desc: 'لنز پولاریزه ضدانعکاس، مناسب رانندگی و ساحل' }
    ];
}

// ========================================================
// توابع مدیریت حساب کاربری (نسخه جدید)
// ========================================================
function handleUserLogin() {
    const user = document.getElementById('login-username').value;
    const pass = document.getElementById('login-password').value;
    
    if(!user || !pass) {
        alert("لطفاً نام کاربری و رمز عبور را جهت شبیه‌سازی وارد کنید.");
        return;
    }
    
    document.getElementById('user-login-form').classList.add('hidden');
    document.getElementById('user-dashboard').classList.remove('hidden');
    
    document.getElementById('welcome-message').innerText = user;
    document.getElementById('lbl-profile-name').innerText = user;
    if(user.length > 0) {
        document.getElementById('user-avatar-char').innerText = user.charAt(0);
    }
    
    initProductsCatalog();
    renderUserOrdersTable();
    selectGlassType('medical');
    switchUserSubTab('sub-dash', document.querySelector('.sidebar-link'));
}

function handleUserLogout() {
    document.getElementById('user-login-form').classList.remove('hidden');
    document.getElementById('user-dashboard').classList.add('hidden');
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    
    shoppingCart = [];
    updateCartBadge();
    
    document.getElementById('scan-result').classList.add('hidden');
    document.getElementById('insurance-result').classList.add('hidden');
    document.getElementById('order-final-result').classList.add('hidden');
}

// ========================================================
// توابع منوی عمودی سایدبار (نسخه جدید با پشتیبانی از کاتالوگ و سبد)
// ========================================================
function switchUserSubTab(subTabId, element) {
    const subContents = document.querySelectorAll('.sub-tab-content');
    subContents.forEach(content => content.classList.add('hidden'));
    
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => link.classList.remove('active'));
    
    const targetContent = document.getElementById(subTabId);
    if(targetContent) targetContent.classList.remove('hidden');
    if(element) element.classList.add('active');

    if (subTabId === 'sub-products') {
        renderCatalog(productsData);
    }
    if (subTabId === 'sub-cart') {
        renderShoppingCart();
    }
}

function goToProductsTab() {
    const productBtn = document.querySelectorAll('.sidebar-link')[1];
    switchUserSubTab('sub-products', productBtn);
}

// ========================================================
// کاتالوگ محصولات و فیلترها
// ========================================================
function renderCatalog(items) {
    const grid = document.getElementById('products-catalog-grid');
    grid.innerHTML = '';
    
    if(items.length === 0) {
        grid.innerHTML = '<p style="grid-column: span 3; text-align:center; color:var(--arvan-text-light); font-size:0.9rem; padding: 30px;">هیچ عینک متناسبی یافت نشد.</p>';
        return;
    }

    items.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card';
        const stars = '★'.repeat(Math.floor(prod.rating)) + (prod.rating % 1 >= 0.5 ? '½' : '');
        const badgeHtml = prod.badge ? `<span style="position:absolute;top:10px;right:10px;background:${prod.color};color:white;font-size:0.65rem;padding:2px 8px;border-radius:10px;font-weight:bold;">${prod.badge}</span>` : '';
        const insuranceBadge = prod.insurance ? `<span style="font-size:0.65rem;background:#dcfce7;color:#15803d;padding:2px 6px;border-radius:4px;">✅ شامل بیمه</span>` : `<span style="font-size:0.65rem;background:#f1f5f9;color:#64748b;padding:2px 6px;border-radius:4px;">بدون بیمه</span>`;
        card.innerHTML = `
            <div style="position:relative;">
                ${badgeHtml}
                <div class="product-thumb" style="background:linear-gradient(135deg,${prod.color}22,${prod.color}44);border-radius:10px;padding:18px 0;font-size:2.8rem;text-align:center;margin-bottom:12px;">${prod.icon}</div>
                <div style="font-size:0.7rem;color:var(--arvan-text-light);font-weight:bold;letter-spacing:0.5px;margin-bottom:4px;">${prod.brand}</div>
                <h4 style="font-size:0.9rem;color:var(--arvan-dark);margin-bottom:5px;line-height:1.4;">${prod.title}</h4>
                <p style="font-size:0.75rem;color:#6b7280;margin-bottom:8px;line-height:1.5;">${prod.desc}</p>
                <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;align-items:center;">
                    <span style="font-size:0.7rem;background:#e0e7ff;color:#3730a3;padding:2px 6px;border-radius:4px;">${prod.material}</span>
                    <span style="font-size:0.7rem;background:#fef3c7;color:#92400e;padding:2px 6px;border-radius:4px;">${prod.shape}</span>
                    ${insuranceBadge}
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                    <span style="color:#f59e0b;font-size:0.8rem;">${stars} <span style="color:#6b7280;font-size:0.7rem;">(${prod.reviews})</span></span>
                    <span style="font-size:0.7rem;color:#64748b;">AI: ${prod.aiFit}</span>
                </div>
                <p style="font-size:1rem;color:var(--arvan-primary);font-weight:bold;margin-bottom:12px;">${prod.price.toLocaleString()} تومان</p>
            </div>
            <button class="btn-primary" style="padding:8px 12px;font-size:0.82rem;width:100%;border-radius:8px;" onclick="addToCart('${prod.id}')">🛒 افزودن به سبد</button>
        `;
        grid.appendChild(card);
    });
}

function filterCatalog() {
    const searchText = document.getElementById('product-search-input').value.toLowerCase();
    
    let filtered = productsData.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchText);
        const matchesCategory = (currentCategoryFilter === 'all') || (p.category === currentCategoryFilter);
        return matchesSearch && matchesCategory;
    });
    
    renderCatalog(filtered);
}

function filterCatalogCategory(cat) {
    currentCategoryFilter = cat;
    
    document.getElementById('btn-filter-all').classList.remove('active');
    document.getElementById('btn-filter-medical').classList.remove('active');
    document.getElementById('btn-filter-sun').classList.remove('active');
    
    if(cat === 'all') document.getElementById('btn-filter-all').classList.add('active');
    if(cat === 'medical') document.getElementById('btn-filter-medical').classList.add('active');
    if(cat === 'sun') document.getElementById('btn-filter-sun').classList.add('active');
    
    filterCatalog();
}

// ========================================================
// ماژول هوش مصنوعی تشخیص فرم صورت و فیلتر محصولات
// ========================================================
function runAiProductScan() {
    const file = document.getElementById('face-scan-upload');
    const resultBox = document.getElementById('ai-product-result');
    
    if (file.files.length === 0) {
        alert("لطفاً ابتدا تصویر پرتره خود را برای اسکن هوش مصنوعی انتخاب کنید.");
        return;
    }
    
    resultBox.classList.remove('hidden');
    resultBox.style.backgroundColor = "#fffbeb";
    resultBox.style.color = "#b45309";
    resultBox.style.border = "1px solid #fde68a";
    resultBox.innerHTML = "⏳ هوش مصنوعی پلتفرم بینا‌آی در حال تحلیل زوایای فک، طول پیشانی و هندسه استخوان‌های گونه مراجع است...";
    
    setTimeout(() => {
        const shapes = ["گرد", "بیضی", "مستطیلی"];
        const detectedShape = shapes[Math.floor(Math.random() * shapes.length)];
        
        resultBox.style.backgroundColor = "#f0fdf4";
        resultBox.style.color = "#15803d";
        resultBox.style.border = "1px solid #bbf7d0";
        resultBox.innerHTML = `✅ <strong>تحلیل کامل شد!</strong> فرم صورت شما <strong>«${detectedShape}»</strong> تشخیص داده شد. فریم‌های منطبق برای استایل شما فیلتر شدند.`;
        
        let aiRecommended = productsData.filter(p => p.aiFit === detectedShape);
        renderCatalog(aiRecommended);
    }, 1800);
}

// ========================================================
// مدیریت سبد خرید
// ========================================================
function addToCart(prodId) {
    const product = productsData.find(p => p.id === prodId);
    if(product) {
        shoppingCart.push(product);
        updateCartBadge();
        alert(`محصول «${product.title}» با موفقیت به سبد خرید اضافه شد.`);
    }
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if(shoppingCart.length > 0) {
        badge.innerText = shoppingCart.length;
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }
}

// ========================================================
// رندر کردن سبد خرید و محاسبات فاکتور
// ========================================================
function renderShoppingCart() {
    const itemsCol = document.getElementById('cart-items-column');
    const mainLayout = document.getElementById('cart-main-layout');
    const emptyMsg = document.getElementById('cart-empty-message');
    
    if(shoppingCart.length === 0) {
        mainLayout.classList.add('hidden');
        emptyMsg.classList.remove('hidden');
        return;
    }
    
    mainLayout.classList.remove('hidden');
    emptyMsg.classList.add('hidden');
    itemsCol.innerHTML = '';
    
    let subtotal = 0;
    let hasMedicalItem = false;
    
    shoppingCart.forEach((item, index) => {
        subtotal += item.price;
        if(item.category === 'medical') hasMedicalItem = true;
        
        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
            <div style="display:flex; gap:12px; align-items:center;">
                <span style="font-size:1.5rem;">${item.icon}</span>
                <div>
                    <h5 style="font-size:0.85rem; color:var(--arvan-dark); font-weight:bold;">${item.title}</h5>
                    <span style="font-size:0.75rem; color:var(--arvan-text-light);">${item.category === 'medical' ? 'طبی (مشمول سهمیه درمانی)' : 'آفتابی'}</span>
                </div>
            </div>
            <div style="display:flex; gap:15px; align-items:center;">
                <span style="font-size:0.9rem; font-weight:bold; color:var(--arvan-dark);">${item.price.toLocaleString()} تومان</span>
                <button style="background:none; border:none; color:#ef4444; font-weight:bold; cursor:pointer; font-size:0.8rem;" onclick="removeFromCart(${index})">❌ حذف</button>
            </div>
        `;
        itemsCol.appendChild(row);
    });
    
    document.getElementById('invoice-subtotal').innerText = `${subtotal.toLocaleString()} تومان`;
    
    const insuranceBlock = document.getElementById('cart-insurance-block');
    if(hasMedicalItem) {
        insuranceBlock.classList.remove('hidden');
    } else {
        insuranceBlock.classList.add('hidden');
        document.getElementById('cart-insurance-select').value = 'none';
    }
    
    updateCartInsuranceDiscount();
}

function removeFromCart(index) {
    shoppingCart.splice(index, 1);
    updateCartBadge();
    renderShoppingCart();
}

function updateCartInsuranceDiscount() {
    const insuranceType = document.getElementById('cart-insurance-select').value;
    const discountRow = document.getElementById('invoice-discount-row');
    const discountVal = document.getElementById('invoice-discount-val');
    const finalTotalLbl = document.getElementById('invoice-final-total');
    const statusBox = document.getElementById('cart-insurance-status');
    
    let subtotal = 0;
    shoppingCart.forEach(item => subtotal += item.price);
    
    let discount = 0;
    statusBox.innerText = '';
    
    if(insuranceType === 'tamin') {
        discount = 150000;
        statusBox.innerText = "✔️ تاییدیه سهمیه دفترچه‌ای سازمان تامین اجتماعی متصل شد.";
    } else if (insuranceType === 'salamat') {
        discount = 120000;
        statusBox.innerText = "✔️ استعلام پرتال بیمه سلامت ایرانیان تایید و اعمال شد.";
    } else if (insuranceType === 'iran') {
        discount = 500000;
        statusBox.innerText = "✔️ کد معرف بیمه تکمیلی ایران اخذ و سقف سهمیه کسر گردید.";
    }
    
    if(discount > 0) {
        discountRow.classList.remove('hidden');
        discountVal.innerText = `- ${discount.toLocaleString()} تومان`;
    } else {
        discountRow.classList.add('hidden');
    }
    
    let finalPayable = subtotal - discount;
    if(finalPayable < 0) finalPayable = 0;
    
    finalTotalLbl.innerText = `${finalPayable.toLocaleString()} تومان`;
}

function processFinalCheckout() {
    const finalResult = document.getElementById('checkout-final-result');
    finalResult.classList.remove('hidden');
    finalResult.style.backgroundColor = "#eff6ff";
    finalResult.style.color = "#1d4ed8";
    finalResult.style.border = "1px solid #bfdbfe";
    finalResult.innerHTML = "⏳ در حال اتصال به سوئیچ مرکزی بانک و کسر همزمان توکن بیمه‌گر...";
    
    setTimeout(() => {
        finalResult.style.backgroundColor = "#f0fdf4";
        finalResult.style.color = "#15803d";
        finalResult.style.border = "1px solid #bbf7d0";
        finalResult.innerHTML = "🎉 <strong>سفارش شما با موفقیت ثبت نهایی شد!</strong> کد رهگیری مالی صادر شده و جزئیات فریم به کارگاه ساخت عینک و پنل اپراتور منتقل گردید.";
        
        let subtotal = 0;
        shoppingCart.forEach(item => subtotal += item.price);
        
        userOrdersList.unshift({
            id: Math.floor(1000 + Math.random() * 9000).toString(),
            date: "۱۴۰۵/۰۴/۰۳", 
            total: `${subtotal.toLocaleString()} تومان`,
            payment: "موفق (تایید شده)",
            detail: shoppingCart.map(p => p.title).join(' + ')
        });
        
        shoppingCart = [];
        updateCartBadge();
        renderUserOrdersTable();
        
        document.getElementById('dash-active-orders').innerText = "۲ سفارش";
        
        setTimeout(() => {
            finalResult.classList.add('hidden');
            switchUserSubTab('sub-orders', document.querySelectorAll('.sidebar-link')[3]);
        }, 2000);
        
    }, 1800);
}

// ========================================================
// جدول تاریخچه سفارشات کاربر
// ========================================================
function renderUserOrdersTable() {
    const tbody = document.getElementById('user-orders-tbody');
    if(!tbody) return;
    tbody.innerHTML = '';
    
    userOrdersList.forEach(ord => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>#${ord.id}</strong></td>
            <td>${ord.date}</td>
            <td>${ord.total}</td>
            <td><span style="color:#166534; font-weight:bold;">${ord.payment}</span></td>
            <td style="font-size:0.8rem; color:var(--arvan-text); text-align:right;">${ord.detail}</td>
            <td><button onclick="showRatingModal('${ord.id}')" style="background:#eff6ff;color:#1a56db;border:1px solid #bfdbfe;padding:4px 10px;border-radius:6px;cursor:pointer;font-family:inherit;font-size:0.75rem;">⭐ ثبت نظر</button></td>
        `;
        tbody.appendChild(row);
    });
}

// ========================================================
// سوئیچ بین پنل‌های دمو (کاربر / مدیریت) – نسخه جدید
// ========================================================
function switchDemoPanel(panelType) {
    const userPanel = document.getElementById('demo-user-panel');
    const adminPanel = document.getElementById('demo-admin-panel');
    const tabs = document.querySelectorAll('.panel-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    if (panelType === 'user-panel') {
        userPanel.classList.remove('hidden');
        adminPanel.classList.add('hidden');
        if(event && event.target) event.target.classList.add('active');
    } else {
        userPanel.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        if(event && event.target) event.target.classList.add('active');
    }
}

// ========================================================
// سیستم تایید سفارشات اپراتور (پنل مدیریت)
// ========================================================
function approveOrder(rowId) {
    const actionResult = document.getElementById('admin-action-result');
    const targetRow = document.getElementById(`admin-row-${rowId}`);
    
    actionResult.classList.remove('hidden');
    actionResult.style.backgroundColor = "#fffbeb";
    actionResult.style.color = "#b45309";
    actionResult.style.border = "1px solid #fde68a";
    actionResult.innerHTML = "⏳ در حال استعلام کد ملی مراجع و تایید توکن متمرکز با سازمان بیمه‌گر...";

    setTimeout(() => {
        actionResult.style.backgroundColor = "#f0fdf4";
        actionResult.style.color = "#15803d";
        actionResult.style.border = "1px solid #bbf7d0";
        actionResult.innerHTML = "✅ سفارش #۱۰۴۲ تایید شد. فاکتور کسر بیمه نهایی گردیده و حواله ساخت کارگاه صادر شد.";
        
        if(targetRow) {
            targetRow.cells[3].innerHTML = '<span class="badge" style="background: #dcfce7; color: #15803d; margin:0;">تایید شده</span>';
            targetRow.cells[4].innerHTML = '<span style="color: #64748b; font-size: 0.85rem;">تکمیل شده</span>';
        }
    }, 1800);
}

// ========================================================
// مدیریت زیرتب‌های ۵ بخش استراتژیک پنل ادمین
// ========================================================
function switchAdminSubTab(targetId, element) {
    // مخفی کردن تمام زیرمنوهای ادمین
    document.querySelectorAll('.admin-sub-content').forEach(content => {
        content.classList.add('hidden');
    });
    // برداشتن وضعیت اکتیو از دکمه‌های قبلی سایدبار ادمین
    element.parentElement.querySelectorAll('.adm-sidebar-link').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // نمایش تب جدید و فعال کردن دکمه فشرده شده
    const targetContent = document.getElementById(targetId);
    if(targetContent) {
        targetContent.classList.remove('hidden');
    }
    element.classList.add('active');
}
// ========================================================
// بهبود دمو: سیستم نظرسنجی / امتیازدهی پس از خرید
// ========================================================
function showRatingModal(orderId) {
    const existing = document.getElementById('rating-modal-overlay');
    if(existing) existing.remove();
    
    const overlay = document.createElement('div');
    overlay.id = 'rating-modal-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;';
    overlay.innerHTML = `
        <div style="background:white;padding:30px;border-radius:16px;max-width:400px;width:90%;text-align:center;direction:rtl;">
            <h3 style="margin-bottom:15px;color:#1e3a5f;">ثبت نظر برای سفارش #${orderId}</h3>
            <p style="font-size:0.85rem;color:#64748b;margin-bottom:20px;">تجربه خرید خود را با ما به اشتراک بگذارید</p>
            <div id="stars-container" style="font-size:2rem;margin-bottom:15px;cursor:pointer;">
                <span class="star" data-val="1" onclick="setRating(1)" style="color:#cbd5e1;">★</span>
                <span class="star" data-val="2" onclick="setRating(2)" style="color:#cbd5e1;">★</span>
                <span class="star" data-val="3" onclick="setRating(3)" style="color:#cbd5e1;">★</span>
                <span class="star" data-val="4" onclick="setRating(4)" style="color:#cbd5e1;">★</span>
                <span class="star" data-val="5" onclick="setRating(5)" style="color:#cbd5e1;">★</span>
            </div>
            <textarea id="review-text" placeholder="نظر شما..." style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:8px;font-family:inherit;font-size:0.85rem;resize:none;height:80px;box-sizing:border-box;margin-bottom:15px;direction:rtl;"></textarea>
            <div style="display:flex;gap:10px;justify-content:center;">
                <button onclick="submitRating('${orderId}')" style="background:#1a56db;color:white;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-family:inherit;font-size:0.85rem;">ثبت نظر</button>
                <button onclick="document.getElementById('rating-modal-overlay').remove()" style="background:#f1f5f9;color:#374151;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-family:inherit;font-size:0.85rem;">انصراف</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

let currentRating = 0;
function setRating(val) {
    currentRating = val;
    document.querySelectorAll('.star').forEach((s, i) => {
        s.style.color = i < val ? '#f59e0b' : '#cbd5e1';
    });
}

function submitRating(orderId) {
    const text = document.getElementById('review-text').value;
    if(currentRating === 0) {
        const stars = document.getElementById('stars-container');
        stars.style.animation = 'shake 0.3s';
        setTimeout(() => stars.style.animation = '', 300);
        return;
    }
    document.getElementById('rating-modal-overlay').remove();
    
    // نمایش پیام تشکر inline
    const ordersSection = document.getElementById('user-orders-tbody');
    const thankMsg = document.createElement('div');
    thankMsg.style.cssText = 'background:#f0fdf4;border:1px solid #bbf7d0;color:#15803d;padding:12px;border-radius:8px;font-size:0.85rem;margin-top:15px;';
    thankMsg.innerHTML = `✅ نظر شما برای سفارش #${orderId} با امتیاز ${'★'.repeat(currentRating)} ثبت شد. ممنون از اعتمادتان!`;
    ordersSection.parentElement.parentElement.appendChild(thankMsg);
    setTimeout(() => thankMsg.remove(), 4000);
    currentRating = 0;
}

// ========================================================
// بهبود: حذف alert و جایگزینی با toast notification
// ========================================================
function showToast(msg, type = 'success') {
    const existing = document.getElementById('binaai-toast');
    if(existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.id = 'binaai-toast';
    const bg = type === 'success' ? '#f0fdf4' : type === 'error' ? '#fef2f2' : '#fffbeb';
    const color = type === 'success' ? '#15803d' : type === 'error' ? '#dc2626' : '#b45309';
    const border = type === 'success' ? '#bbf7d0' : type === 'error' ? '#fecaca' : '#fde68a';
    toast.style.cssText = `position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:${bg};color:${color};border:1px solid ${border};padding:12px 24px;border-radius:12px;font-size:0.9rem;z-index:9998;box-shadow:0 4px 20px rgba(0,0,0,0.1);animation:slideUp 0.3s ease;direction:rtl;`;
    toast.innerHTML = msg;
    document.body.appendChild(toast);
    setTimeout(() => { if(toast.parentElement) toast.style.opacity='0'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// بازنویسی addToCart بدون alert
function addToCart(prodId) {
    const product = productsData.find(p => p.id === prodId);
    if(product) {
        shoppingCart.push(product);
        updateCartBadge();
        showToast(`✅ «${product.title}» به سبد خرید اضافه شد`);
    }
}
