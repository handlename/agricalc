# GitHub Pages デプロイメントガイド

このドキュメントでは、AgriCalcアプリをGitHub Pagesで公開するためのセットアップと運用について説明します。

## 📋 概要

AgriCalcは GitHub Actions を使用して自動的にビルド・デプロイされ、GitHub Pages でホストされます。

- **公開URL**: https://handlename.github.io/agricalc/
- **デプロイトリガー**: `main` ブランチへのプッシュ
- **ビルドツール**: Vite + React
- **配布形式**: 単一HTMLファイル

## 🔧 セットアップ

### 1. リポジトリ設定

GitHub リポジトリで以下の設定を行ってください：

1. **Settings** タブを開く
2. **Pages** セクションに移動
3. **Source** を **GitHub Actions** に設定

### 2. 必要なファイル

以下のファイルがデプロイに必要です：

```
.github/workflows/deploy.yml  # GitHub Actions ワークフロー
public/.nojekyll             # Jekyll処理をスキップ
vite.config.ts               # GitHub Pages用ベースパス設定
```

### 3. Vite設定

`vite.config.ts` で GitHub Pages のベースパスを設定：

```typescript
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/agricalc/" : "/",
  // ... 他の設定
});
```

## 🚀 デプロイプロセス

### 自動デプロイ

1. `main` ブランチにコードをプッシュ
2. GitHub Actions が自動的に実行
3. ビルドプロセス：
   - Node.js 20 環境をセットアップ
   - 依存関係をインストール (`npm ci`)
   - アプリをビルド (`npm run build`)
   - GitHub Pages にアップロード
4. デプロイ完了後、サイトが更新される

### 手動デプロイ

1. GitHub リポジトリの **Actions** タブを開く
2. **Deploy to GitHub Pages** ワークフローを選択
3. **Run workflow** ボタンをクリック
4. `main` ブランチを選択して実行

## 📁 ワークフロー詳細

### ジョブ構成

#### Build ジョブ
- **実行環境**: Ubuntu Latest
- **主要ステップ**:
  - ソースコードのチェックアウト
  - Node.js 20 のセットアップ
  - npm キャッシュの利用
  - 依存関係のインストール
  - アプリケーションのビルド
  - GitHub Pages アーティファクトのアップロード

#### Deploy ジョブ
- **実行環境**: Ubuntu Latest
- **依存関係**: Build ジョブの完了
- **主要ステップ**:
  - GitHub Pages へのデプロイ実行

### 権限設定

ワークフローには以下の権限が付与されています：

- `contents: read` - リポジトリ内容の読み取り
- `pages: write` - GitHub Pages への書き込み
- `id-token: write` - OIDC トークンの書き込み

## 🔍 トラブルシューティング

### よくある問題と解決方法

#### 1. 404 エラーが発生する

**原因**: ベースパスの設定が正しくない
**解決方法**: `vite.config.ts` のベースパス設定を確認

```typescript
// 正しい設定
base: process.env.NODE_ENV === "production" ? "/agricalc/" : "/"
```

#### 2. ビルドが失敗する

**原因**: 依存関係の問題
**解決方法**: 
- `package-lock.json` が最新であることを確認
- ローカルで `npm ci` と `npm run build` が成功することを確認

#### 3. デプロイが完了しても更新されない

**原因**: ブラウザキャッシュまたは GitHub Pages の更新遅延
**解決方法**:
- ブラウザのハードリフレッシュ (Ctrl+F5 / Cmd+Shift+R)
- 数分待ってから再度アクセス

#### 4. GitHub Actions の権限エラー

**原因**: リポジトリの Pages 設定が正しくない
**解決方法**:
- Settings > Pages で Source を "GitHub Actions" に設定
- ワークフローファイルの permissions セクションを確認

## 📊 デプロイ状況の確認

### GitHub Actions

1. リポジトリの **Actions** タブでワークフロー実行状況を確認
2. 各ステップのログで詳細なエラー情報を確認可能

### GitHub Pages

1. Settings > Pages でデプロイ状況を確認
2. 最後のデプロイ時刻と URL を確認可能

## 🔄 更新プロセス

1. **開発**: ローカルで変更を行い、テスト
2. **コミット**: 変更を `main` ブランチにプッシュ
3. **自動ビルド**: GitHub Actions が自動実行
4. **デプロイ**: 数分後にサイトが更新

## 📝 メンテナンス

### 定期的な確認事項

- GitHub Actions の実行状況
- 依存関係のセキュリティアップデート
- Node.js バージョンの更新
- GitHub Actions アクションのバージョン更新

### セキュリティ

- `.github/workflows/deploy.yml` で使用するアクションのバージョンを定期的に更新
- 最小権限の原則に従った権限設定の維持

---

このデプロイメント設定により、AgriCalcアプリは安全かつ効率的にGitHub Pagesで公開され、継続的に更新されます。