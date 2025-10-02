// ===== ナビゲーション =====
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// スクロール時のナビゲーションバー
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ハンバーガーメニュー
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // アニメーション
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active')
        ? 'rotate(45deg) translate(5px, 5px)'
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active')
        ? 'rotate(-45deg) translate(7px, -6px)'
        : 'none';
});

// ナビゲーションリンククリック時
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');

        // ハンバーガーメニューをリセット
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== トレイラーモーダル =====
const trailerBtn = document.getElementById('trailerBtn');
const trailerModal = document.getElementById('trailerModal');
const closeModal = document.getElementById('closeModal');
const trailerIframe = document.getElementById('trailerIframe');

// トレイラーボタンクリック
trailerBtn.addEventListener('click', () => {
    trailerModal.classList.add('active');
    trailerIframe.src = 'https://www.youtube.com/embed/sOYIfvKVeM8?autoplay=1';
    document.body.style.overflow = 'hidden';
});

// モーダルを閉じる
closeModal.addEventListener('click', () => {
    closeTrailerModal();
});

// モーダル外クリックで閉じる
trailerModal.addEventListener('click', (e) => {
    if (e.target === trailerModal) {
        closeTrailerModal();
    }
});

// ESCキーで閉じる
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeTrailerModal();
        closeCharacterModalFunc();
    }
});

function closeTrailerModal() {
    trailerModal.classList.remove('active');
    trailerIframe.src = '';
    document.body.style.overflow = 'auto';
}

// ===== キャラクターモーダル =====
const characterCards = document.querySelectorAll('.character-card');
const characterModal = document.getElementById('characterModal');
const closeCharacterModal = document.getElementById('closeCharacterModal');
const characterDetail = document.getElementById('characterDetail');

// キャラクターデータ
const charactersData = {
    1: {
        name: 'アイリス',
        role: '技術者',
        image: 'assets/images/character1.png',
        personality: '明るく前向きな性格で、どんな困難にも立ち向かう勇気を持つ。機械いじりが大好きで、新しい技術を見つけると目を輝かせる。',
        background: 'かつて大都市で最年少のエンジニアとして活躍していたが、ある事件をきっかけに追放される。失われた技術を取り戻すことに情熱を注いでいる。',
        relationship: '主人公の最初の仲間。主人公の技術的なアドバイザーとして、工場建設を支援する。レオとは幼馴染で、よく冗談を言い合う仲。'
    },
    2: {
        name: 'レオ',
        role: '探検家',
        image: 'assets/images/character2.png',
        personality: '好奇心旺盛で冒険好き。危険を顧みず未知の領域へと足を踏み入れる。軽口を叩くことが多いが、仲間思いで信頼できる。',
        background: '荒廃した世界を旅しながら、失われた遺跡や資源を探し求めている。古代の地図を読み解く能力に長けており、数々の秘境を発見してきた。',
        relationship: '主人公に世界の秘密を教えてくれる案内人。アイリスとは幼馴染。ルナとは最初は衝突するが、次第に互いを認め合うようになる。'
    },
    3: {
        name: 'ルナ',
        role: '研究者',
        image: 'assets/images/character3.png',
        personality: '冷静沈着で論理的。感情をあまり表に出さないが、心の奥底では仲間を大切に思っている。研究に没頭すると周りが見えなくなる。',
        background: '古代文明の研究者として、世界崩壊の真実を追い求めている。かつて名門研究所に所属していたが、ある発見をきっかけに追放された。',
        relationship: '主人公に世界の歴史と真実を教える。アイリスとは研究仲間として協力関係。レオの軽い性格に最初は戸惑うが、徐々に打ち解けていく。'
    }
};

// キャラクターカードクリック
characterCards.forEach(card => {
    card.addEventListener('click', () => {
        const characterId = card.getAttribute('data-character');
        const character = charactersData[characterId];

        // プレースホルダー画像のsrcを設定
        const placeholderSrc = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='500'%3E%3Crect fill='%23334155' width='300' height='500'/%3E%3Ctext fill='%2394a3b8' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E${character.name}%3C/text%3E%3C/svg%3E`;

        characterDetail.innerHTML = `
            <div class="character-detail-image">
                <img src="${character.image}" alt="${character.name}" onerror="this.src='${placeholderSrc}'">
            </div>
            <div class="character-detail-info">
                <h3>${character.name}</h3>
                <p class="role">${character.role}</p>

                <h4>性格</h4>
                <p>${character.personality}</p>

                <h4>背景</h4>
                <p>${character.background}</p>

                <h4>関係性</h4>
                <p>${character.relationship}</p>
            </div>
        `;

        characterModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// キャラクターモーダルを閉じる
closeCharacterModal.addEventListener('click', () => {
    closeCharacterModalFunc();
});

characterModal.addEventListener('click', (e) => {
    if (e.target === characterModal) {
        closeCharacterModalFunc();
    }
});

function closeCharacterModalFunc() {
    characterModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===== スクロールアニメーション =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象の要素
const animateElements = document.querySelectorAll(
    '.feature-block, .character-card, .mod-feature, .gallery-item, .press-item, .social-link'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== ギャラリー画像クリック（拡大表示） =====
const galleryItems = document.querySelectorAll('.gallery-item img');

galleryItems.forEach(img => {
    img.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${img.src}" alt="${img.alt}" style="width: 100%; border-radius: 12px;">
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = 'auto';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = 'auto';
            }
        });
    });
});

// ===== パフォーマンス最適化: 画像遅延読み込み =====
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Intersection Observerを使用したフォールバック
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===== ページロードアニメーション =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';
