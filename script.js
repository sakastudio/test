// ===== スクロール進捗バー =====
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;

    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

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
        image: 'assets/images/character-main-full.png',
        description: '惑星セレスタルの第二王女。理由も分からぬまま惑星アルカディアに追放さる。最初は何もできないお嬢様だったが、サポートAIや親友に助けてもらいながら工業化を進める。'
    },
    2: {
        name: 'エレノ',
        role: 'サポートAI',
        image: 'assets/images/character-ai-full.png',
        description: 'ヨリの世話係として一緒に惑星アルカディアについてきた汎用サポートAIシステム。',
    },
    3: {
        name: 'クルア',
        role: '親友(惑星アルカディアの生き残り)',
        image: 'assets/images/character-friend-full.png',
        description: '運動神経がよく、心底明るくておおらか。人懐こくてお喋り。お金が大好きで、生きるためには何でもする。',
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

                <p>${character.description}</p>
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

// ゲームの特徴用 - タイミングを遅く、ブラー効果追加
const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            featureObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.25,
    rootMargin: '0px 0px -150px 0px'
});

// キャラクター、mod、ギャラリー、コミュニティ用 - タイミングを早く
const quickObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.filter = 'blur(0px)';
            quickObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px 50px 0px'
});

// 概要用 - 通常のタイミング
const overviewObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            overviewObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
});

// 要素を分類して監視
const featureBlocks = document.querySelectorAll('.feature-block');
const quickAnimateElements = document.querySelectorAll('.character-icon, .mod-feature, .gallery-item, .social-link');
const overviewElements = document.querySelectorAll('.overview-concept, .overview-release');

// ゲームの特徴にブラー効果を追加
featureBlocks.forEach(el => {
    el.style.filter = 'blur(10px)';
    featureObserver.observe(el);
});

// キャラクター、mod、ギャラリー、コミュニティ - 早いタイミング
quickAnimateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.filter = 'blur(5px)';
    el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s, filter 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s`;
    quickObserver.observe(el);
});

// 概要要素
overviewElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
    overviewObserver.observe(el);
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
// ページロード後に設定（DOMが完全に読み込まれた後）
function setupGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.style.cursor = 'pointer';

        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const img = this.querySelector('img');
            if (!img) return;

            const modal = document.createElement('div');
            modal.className = 'modal active';
            modal.style.zIndex = '9999';
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
}

// DOMが完全に読み込まれた後に実行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupGalleryModal);
} else {
    setupGalleryModal();
}

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

// タイトルアニメーション実行 - タイミングを遅く
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
}, {
    threshold: 0.8,
    rootMargin: '0px 0px -100px 0px'
});

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
