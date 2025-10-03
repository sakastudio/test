# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

自動化工業ゲーム × アニメ調オープンワールド × RPGの日本語インディーゲームのランディングページ。2026年夏Steam配信予定。

**技術スタック:** HTML5、CSS3、Vanilla JavaScript（フレームワークやビルドツール不要）

**対応言語:** 日本語、英語（i18n対応済み）

## 開発コマンド

### ローカル実行
```bash
# ブラウザでindex.htmlを直接開く
open index.html  # macOS

# または簡易HTTPサーバーを使用
python3 -m http.server 8000
# http://localhost:8000 にアクセス
```

### Git操作
```bash
git status
git add .
git commit -m "メッセージ"
git push
```

## プロジェクト構造

```
landing-page/
├── index.html          # 全セクションを含むメインHTML（data-i18n属性付き）
├── styles.css          # 全スタイルとアニメーション
├── script.js           # インタラクティブ機能（モーダル、ナビ、アニメ）
├── i18n/
│   ├── i18n.js        # 言語切り替えシステム
│   ├── ja.json        # 日本語翻訳ファイル
│   └── en.json        # 英語翻訳ファイル
├── assets/
│   ├── images/        # ゲーム画像、キャラクター、背景
│   └── videos/        # 動画素材
└── README.md          # 必要なアセット一覧
```

## アーキテクチャと設計パターン

### シングルページ構成
`index.html`に全コンテンツを配置し、アンカーリンクで各セクションへ移動：
- ヒーローセクション（トレイラーモーダル付き）
- ゲーム特徴（画像とテキストを交互に配置）
- ストーリー、キャラクター、mod開発セクション
- スクリーンショットギャラリー（クリックで拡大）
- プレスキット、コミュニティセクション

### CSS設計
- CSS Custom Properties（`:root`変数）でテーマ管理
- 各セクションは背景画像 + カラーオーバーレイ（rgba opacity 0.8）
- `background-attachment: fixed`でパララックス効果（デスクトップのみ）
- レスポンシブ: モバイルでは固定背景を無効化（`@media`、styles.css 1045行目）

### JavaScript構成
`script.js`は機能別にセクション分け：
1. **ナビゲーション**（1-57行）: 固定ナビバー、ハンバーガーメニュー、スムーススクロール
2. **トレイラーモーダル**（59-96行）: YouTube iframe モーダル（自動再生）
3. **キャラクター表示**（115-169行）: i18nから翻訳データを取得してキャラ詳細を表示
4. **スクロールアニメーション**（181-206行）: Intersection Observerでフェードイン
5. **ギャラリー**（208-238行）: 画像クリックで拡大表示
6. **ページロード**（253-259行）: 初期フェードイン

### i18n（国際化）システム
`i18n/i18n.js`で言語切り替えを実装：
- **サポート言語**: 日本語（ja）、英語（en）
- **翻訳ファイル**: `i18n/ja.json`、`i18n/en.json`（階層構造のJSON）
- **自動検出**: 初回アクセス時にブラウザ言語を検出
- **永続化**: localStorageで選択言語を保存
- **切り替えUI**: ナビゲーションバーにドロップダウンメニュー（スケーラブル設計）
- **ドロップダウン機能**: クリックで開閉、ESCキーまたは外部クリックで閉じる
- **動的更新**: ページリロード不要で即座に言語切り替え
- **属性**: `data-i18n`（テキスト）、`data-i18n-alt`（alt属性）
- **キャラクターデータ**: JavaScriptから翻訳ファイルを参照
- **拡張性**: HTMLのコメントアウト部分を有効化するだけで新言語を追加可能（中国語、韓国語、フランス語、ドイツ語、スペイン語、ポルトガル語に対応済み）

### モーダルシステム
2種類のモーダル：
- **トレイラーモーダル**: YouTube動画を自動再生
- **キャラクターモーダル**: `charactersData`オブジェクト（105-130行）からキャラ情報を表示

閉じる方法: ESCキー、閉じるボタン、背景クリック

### 画像処理
全画像に`onerror`属性でSVGプレースホルダーをフォールバック設定。`assets/images/`から参照するが、README.mdに必要アセット一覧あり（ほとんどプレースホルダー）。

## スタイリング規約

### カラーシステム
- Primary: 青グラデーション（`#3b82f6` → `#2563eb`）
- Secondary: 紫（`#8b5cf6`）
- Accent: オレンジ（`#f59e0b`）
- Background: ダークネイビー（`#0f172a`、`#020617`）

### セクション背景パターン
各セクションの構成:
1. 背景画像: `url('assets/images/bg-[セクション名].png')`
2. カラーオーバーレイ: `::before`疑似要素でrgba 0.8透過色
3. コンテンツ: `position: relative; z-index: 1`でオーバーレイより前面

セクション別カラー:
- トレイラー: シアン `rgba(34, 211, 238, 0.8)`
- ゲーム特徴: グリーン `rgba(74, 222, 128, 0.8)`
- ストーリー: ライトブルー `rgba(147, 197, 253, 0.8)`
- キャラクター: シアン `rgba(103, 232, 249, 0.8)`
- mod開発: ライトグリーン `rgba(134, 239, 172, 0.8)`
- ギャラリー: ブルー `rgba(96, 165, 250, 0.8)`
- プレスキット: シアン `rgba(34, 211, 238, 0.8)`
- コミュニティ: グリーン `rgba(74, 222, 128, 0.8)`
- 最終CTA: ライトブルー `rgba(147, 197, 253, 0.85)`

### 特徴ブロックレイアウト
`.feature-block.reverse`で左右交互レイアウト：
- 通常: 画像右、テキスト左
- Reverse: 画像左、テキスト右（CSSの`order`プロパティ使用）

## コンテンツ管理

### キャラクター追加
`script.js`の`charactersData`オブジェクト（105-130行）を編集。各キャラクターに必要な項目:
- `name`（名前）、`role`（役割）、`image`（画像パス）
- `personality`（性格）、`background`（背景）、`relationship`（関係性）

### リンク更新
リリース前に更新が必要な外部リンク:
- Steamウィッシュリスト: `index.html` 37、331行目
- YouTubeトレイラー: `index.html` 67-68行目、`script.js` 68行目
- Discord、Twitter、YouTube、GitHub: `index.html` 224-225、290-321、337-342行目

### プレス問い合わせ
メールアドレス更新: `index.html` 280行目の`press@game.com`

## 言語

全てのユーザー向けコンテンツは**日本語**。テキスト編集時の注意:
- ユーザーに表示される文字列は全て日本語を維持
- コメントは日本語または英語
- ゲーム特徴: 歯車ベースの自動化、敵なし・資源枯渇なし、初心者向け、オープンソースmod対応

## レスポンシブブレークポイント

- デスクトップ: デフォルトスタイル
- タブレット: `@media (max-width: 768px)` - パララックス無効、ハンバーガーメニュー表示
- モバイル: `@media (max-width: 480px)` - さらなるサイズ調整

## パフォーマンス

- スクロールアニメーションにIntersection Observer使用（script.js 187-206行）
- ネイティブlazy loading優先、フォールバックでlazysizesライブラリ（script.js 241-251行）
- ページロード時フェードイン（script.js 254-259行）
- 全アニメーションはCSS `transition`とcubic-bezier easing使用

## よくある変更作業

### 新規セクション追加
1. `index.html`にセクションHTMLを追加（`data-i18n`属性も追加）
2. `.nav-menu`にナビリンク追加（`data-i18n`属性付き）
3. `i18n/ja.json`と`i18n/en.json`に翻訳テキストを追加
4. `assets/images/bg-[名前].png`に背景画像を作成
5. `styles.css`にセクションスタイルと背景オーバーレイパターンを追加
6. 必要に応じてスクロールアニメーション対象に追加（`script.js` 197-199行目）

### テキスト編集（多言語対応）
1. `i18n/ja.json`で日本語テキストを編集
2. `i18n/en.json`で英語テキストを編集
3. HTMLの`data-i18n`属性値は変更不要（翻訳キーなので）

### 新言語追加

**簡単な方法（HTMLコメント解除）:**
1. `index.html`の48-81行目にある追加言語のコメントアウトを外す
2. `i18n/[言語コード].json`を作成（ja.jsonをコピーして翻訳）
3. `i18n/i18n.js`の`SUPPORTED_LANGUAGES`配列に言語コードを追加（6行目）

**新規言語を追加する場合:**
1. `i18n/[言語コード].json`を作成（ja.jsonをコピーして翻訳）
2. `i18n/i18n.js`の`SUPPORTED_LANGUAGES`配列に言語コードを追加（6行目）
3. `index.html`のドロップダウンメニュー内に以下を追加：
```html
<button class="lang-option" data-lang="言語コード" data-flag="国旗絵文字" data-name="言語名">
    <span class="lang-option-flag">国旗絵文字</span>
    <span class="lang-option-name">言語名</span>
</button>
```

**利用可能な言語（コメントアウト済み）:**
- 中国語（zh）🇨🇳
- 韓国語（ko）🇰🇷
- フランス語（fr）🇫🇷
- ドイツ語（de）🇩🇪
- スペイン語（es）🇪🇸
- ポルトガル語（pt）🇧🇷

### キャラクター追加・編集
1. `i18n/ja.json`の`characters.data`に新キャラクターを追加
2. `i18n/en.json`の`characters.data`にも同様に追加
3. `script.js`の`characterImages`オブジェクトに画像パスを追加（120-124行目）
4. `index.html`のキャラクターアイコンセクションにHTMLを追加（218-238行目）

### カラースキーム変更
`styles.css`の`:root`内のCSS Custom Propertiesを編集（8-25行目）

### モーダルコンテンツ追加
トレイラーまたはキャラクターモーダルのパターンに従う:
1. `index.html`にモーダルHTML構造を作成
2. `script.js`にモーダル起動イベントリスナー追加
3. 閉じる処理を実装（ESCキー、背景クリック、閉じるボタン）
4. 開く時は`document.body.style.overflow = 'hidden'`を設定
