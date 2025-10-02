// ===== スクロール進捗バー =====
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;

    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ===== カスタムカーソルフォロワー =====
const cursorFollower = document.querySelector('.cursor-follower');
if (cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorFollower.classList.add('active');
    });

    // スムーズなカーソル追従
    function animateCursor() {
        const delay = 0.15;
        followerX += (mouseX - followerX) * delay;
        followerY += (mouseY - followerY) * delay;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // ホバー可能な要素でカーソル拡大
    const hoverTargets = document.querySelectorAll('a, button, .gallery-item, .character-icon');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.8)';
            cursorFollower.style.borderColor = '#4CAF50';
        });
        target.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderColor = '#2196F3';
        });
    });
}

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
if (trailerBtn) {
    trailerBtn.addEventListener('click', () => {
        trailerModal.classList.add('active');
        trailerIframe.src = 'https://www.youtube.com/embed/sOYIfvKVeM8?autoplay=1';
        document.body.style.overflow = 'hidden';
    });
}

// モーダルを閉じる
if (closeModal) {
    closeModal.addEventListener('click', () => {
        closeTrailerModal();
    });
}

// モーダル外クリックで閉じる
if (trailerModal) {
    trailerModal.addEventListener('click', (e) => {
        if (e.target === trailerModal) {
            closeTrailerModal();
        }
    });
}

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
        role: '惑星セレスタルの姫(主人公)',
        image: 'assets/images/character1.png',
        personality: '頑張り屋でまっすぐな性格。天真爛漫で好奇心旺盛、活発な性格のため工業化にも積極的に参加する。「別に寂しくなんてないよ」が口癖。',
        background: '惑星セレスタルの第二王女。16歳、148cm。生まれたときから大事にされていたが、周りからは腫物のように扱われ心を許せる人はいなかった。理由も分からぬまま惑星アルカディアに追放され、最初は何もできないお嬢様だったが、サポートAIや親友に助けてもらいながら工業化を進める。',
        relationship: '前半は追放した人々への復讐心(理由を聞きたい)で惑星セレスタルへ戻ることを目指す。中盤で惑星アルカディアでの生活も悪くないと思い始め、後半で自分が追放されたのではなく愛されて逃がされたのだと気づき、皆を助けたいと願う。'
    },
    2: {
        name: 'エレノ(本名:ペペ)',
        role: 'サポートAI',
        image: 'assets/images/character2.png',
        personality: 'クーデレで素直になれない性格。自称AIなので偶にポンコツ。姫さまが大好きで、惑星セレスタルの人達を憎んでいる。「ぼく、賢いんです。超高性能AIなので」が口癖。',
        background: '幼い頃に両親に売られ奴隷として使われていたところをヨリに助けられ、世話係として近くに置かれていた。ヨリが惑星アルカディアに追放されると知り、博士の元でAIにしてもらう。本体は惑星セレスタルにある。ヨリはエレノ=ペペだと気づいていない。',
        relationship: 'ヨリに死んで欲しくないので惑星セレスタルの人達を悪者扱いし、惑星アルカディアで楽しく生きて欲しいと思っている。クルアがヨリと仲良くすることを快く思わず嫉妬するが、最終的には三人で仲良くなる。'
    },
    3: {
        name: 'クルア',
        role: '親友(惑星アルカディアの生き残り)',
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

// 初期表示(ヨリ)
if (characterDisplay) {
    displayCharacter('1');
}

// ===== 高度なスクロールアニメーション =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // フェードイン + スライドアップアニメーション
            if (entry.target.classList.contains('feature-block')) {
                entry.target.classList.add('animate-in');
            } else {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }

            // 一度アニメーションしたら監視解除
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// アニメーション対象の要素
const animateElements = document.querySelectorAll(
    '.feature-block, .character-icon, .mod-feature, .gallery-item, .social-link, .overview-concept, .overview-release'
);

animateElements.forEach((el, index) => {
    // 初期状態を設定
    if (!el.classList.contains('feature-block')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
    }
    observer.observe(el);
});

// ===== パララックス効果 =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    // ヒーローセクションのパララックス
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== ギャラリー画像クリック(拡大表示) =====
const galleryItems = document.querySelectorAll('.gallery-item img');

galleryItems.forEach(img => {
    img.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${img.src}" alt="${img.alt}" style="width: 100%; border-radius: 20px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
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

        // ESCキーで閉じる
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.body.style.overflow = 'auto';
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    });
});

// ===== パーティクルエフェクト(歯車) =====
function createGearParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles) return;

    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 40 + 20 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        particle.innerHTML = '⚙️';
        particle.style.fontSize = particle.style.width;
        particle.style.animation = `floatGear ${Math.random() * 20 + 15}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';

        heroParticles.appendChild(particle);
    }
}

// 歯車フロートアニメーション
const style = document.createElement('style');
style.textContent = `
    @keyframes floatGear {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        50% {
            transform: translateY(-50px) rotate(180deg);
        }
        100% {
            transform: translateY(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// ページロード時にパーティクル作成
window.addEventListener('load', () => {
    createGearParticles();
});

// ===== セクションタイトルの文字アニメーション =====
function animateSectionTitles() {
    const sectionTitles = document.querySelectorAll('.section-title');

    sectionTitles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        title.style.opacity = '1';

        const chars = text.split('');
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.animation = `fadeInChar 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.03}s forwards`;
            title.appendChild(span);
        });
    });
}

// 文字フェードインアニメーション
const charStyle = document.createElement('style');
charStyle.textContent = `
    @keyframes fadeInChar {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(charStyle);

// タイトルアニメーション実行
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.children.length === 0) {
            const title = entry.target;
            const text = title.textContent;
            title.textContent = '';

            const chars = text.split('');
            chars.forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.animation = `fadeInChar 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.03}s forwards`;
                title.appendChild(span);
            });

            titleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section-title').forEach(title => {
    titleObserver.observe(title);
});

// ===== スクロールインジケーターのクリックでスクロール =====
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const videoSection = document.querySelector('.video-section');
        if (videoSection) {
            videoSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ===== パフォーマンス最適化: 画像遅延読み込み =====
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
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

    // ヒーローセクションの追加アニメーション
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'heroFadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    }
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// ===== ボタンのリップルエフェクト =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// リップルアニメーション
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== マウスホバーで要素を軽く追従させる =====
document.querySelectorAll('.feature-image, .character-detail-image').forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = '';
    });
});
