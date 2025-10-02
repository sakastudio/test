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
    }
});

function closeTrailerModal() {
    trailerModal.classList.remove('active');
    trailerIframe.src = '';
    document.body.style.overflow = 'auto';
}

// ===== キャラクター表示 =====
const characterIcons = document.querySelectorAll('.character-icon');
const characterDisplay = document.getElementById('characterDisplay');

// キャラクターデータ
const charactersData = {
    1: {
        name: 'ヨリ',
        role: '惑星セレスタルの姫（主人公）',
        image: 'assets/images/character1.png',
        personality: '頑張り屋でまっすぐな性格。天真爛漫で好奇心旺盛、活発な性格のため工業化にも積極的に参加する。「別に寂しくなんてないよ」が口癖。',
        background: '惑星セレスタルの第二王女。16歳、148cm。生まれたときから大事にされていたが、周りからは腫物のように扱われ心を許せる人はいなかった。理由も分からぬまま惑星アルカディアに追放され、最初は何もできないお嬢様だったが、サポートAIや親友に助けてもらいながら工業化を進める。',
        relationship: '前半は追放した人々への復讐心（理由を聞きたい）で惑星セレスタルへ戻ることを目指す。中盤で惑星アルカディアでの生活も悪くないと思い始め、後半で自分が追放されたのではなく愛されて逃がされたのだと気づき、皆を助けたいと願う。'
    },
    2: {
        name: 'エレノ（本名：ペペ）',
        role: 'サポートAI',
        image: 'assets/images/character2.png',
        personality: 'クーデレで素直になれない性格。自称AIなので偶にポンコツ。姫さまが大好きで、惑星セレスタルの人達を憎んでいる。「ぼく、賢いんです。超高性能AIなので」が口癖。',
        background: '幼い頃に両親に売られ奴隷として使われていたところをヨリに助けられ、世話係として近くに置かれていた。ヨリが惑星アルカディアに追放されると知り、博士の元でAIにしてもらう。本体は惑星セレスタルにある。ヨリはエレノ＝ペペだと気づいていない。',
        relationship: 'ヨリに死んで欲しくないので惑星セレスタルの人達を悪者扱いし、惑星アルカディアで楽しく生きて欲しいと思っている。クルアがヨリと仲良くすることを快く思わず嫉妬するが、最終的には三人で仲良くなる。'
    },
    3: {
        name: 'クルア',
        role: '親友（惑星アルカディアの生き残り）',
        image: 'assets/images/character3.png',
        personality: '運動神経がよく、心底明るくておおらか。人懐こくてお喋り。お金が大好きで、生きるためには何でもする。男前な一面も。',
        relationship: '惑星アルカディアの唯一の生き残り。17歳、158cm。お金持ちになることを夢見ており、ヨリの工業化を手伝うことで財を成そうとする。自分の家族が自然災害ではなく惑星セレスタルの人々に殺されたと知るが、復讐ではなく理由を考える。ヨリはその事実に苦悩する。'
    }
};

// キャラクター詳細を表示する関数
function displayCharacter(characterId) {
    const character = charactersData[characterId];
    const placeholderSrc = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect fill='%23334155' width='400' height='600'/%3E%3Ctext fill='%2394a3b8' font-family='sans-serif' font-size='24' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E${character.name}%3C/text%3E%3C/svg%3E`;

    characterDisplay.innerHTML = `
        <div class="character-detail-content">
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
        </div>
    `;

    // アニメーション追加
    characterDisplay.style.opacity = '0';
    setTimeout(() => {
        characterDisplay.style.opacity = '1';
    }, 10);
}

// キャラクターアイコンクリック
characterIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const characterId = icon.getAttribute('data-character');

        // すべてのアイコンからactiveクラスを削除
        characterIcons.forEach(i => i.classList.remove('active'));

        // クリックされたアイコンにactiveクラスを追加
        icon.classList.add('active');

        // キャラクター詳細を表示
        displayCharacter(characterId);
    });
});

// 初期表示（アイリス）
displayCharacter('1');

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
    '.feature-block, .character-icon, .mod-feature, .gallery-item, .press-item, .social-link'
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
