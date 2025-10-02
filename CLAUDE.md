# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

自動化工業ゲーム × アニメ調オープンワールド × RPGの日本語インディーゲームのランディングページ。2026年夏Steam配信予定。

**技術スタック:** HTML5、CSS3、Vanilla JavaScript（フレームワークやビルドツール不要）

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
├── index.html          # 全セクションを含むメインHTML
├── styles.css          # 全スタイルとアニメーション
├── script.js           # インタラクティブ機能（モーダル、ナビ、アニメ）
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
3. **キャラクターモーダル**（98-179行）: `charactersData`オブジェクトからキャラ詳細を表示
4. **スクロールアニメーション**（181-206行）: Intersection Observerでフェードイン
5. **ギャラリー**（208-238行）: 画像クリックで拡大表示
6. **ページロード**（253-259行）: 初期フェードイン

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
1. `index.html`にセクションHTMLを追加
2. `.nav-menu`にナビリンク追加（15-22行目）
3. `assets/images/bg-[名前].png`に背景画像を作成
4. `styles.css`にセクションスタイルと背景オーバーレイパターンを追加
5. 必要に応じてスクロールアニメーション対象に追加（`script.js` 197-199行目）

### カラースキーム変更
`styles.css`の`:root`内のCSS Custom Propertiesを編集（8-25行目）

### モーダルコンテンツ追加
トレイラーまたはキャラクターモーダルのパターンに従う:
1. `index.html`にモーダルHTML構造を作成
2. `script.js`にモーダル起動イベントリスナー追加
3. 閉じる処理を実装（ESCキー、背景クリック、閉じるボタン）
4. 開く時は`document.body.style.overflow = 'hidden'`を設定
