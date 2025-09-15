# 技術設計書 - アグリコラ得点計算Webアプリ

## 1. アーキテクチャ概要

### 1.1 システム構成
- **形態**: 単一HTMLファイルに全リソース埋め込み型SPA
- **配布形式**: ビルド済み単一HTMLファイル（index.html）
- **動作環境**: モダンWebブラウザ（オフライン動作可能）

### 1.2 設計方針
1. **シンプルなピクトグラム型アイコン**: SVGによる軽量アイコンの直接埋め込み
2. **単一ファイル配布**: HTML/CSS/JS/SVGを全て1ファイルに統合
3. **型安全性**: TypeScriptによる堅牢な実装
4. **immutableデータ管理**: 状態管理における不変性の保証
5. **純粋関数中心設計**: 副作用の最小化とテスタビリティの向上

## 2. 技術スタック選定

### 2.1 採用技術

#### フロントエンドフレームワーク: React 18
**選定理由:**
- 仮想DOMによる効率的な再レンダリング
- コンポーネント指向で保守性が高い
- 豊富なエコシステムとコミュニティサポート
- TypeScriptとの優れた親和性

#### 言語: TypeScript 5.x
**選定理由:**
- 静的型付けによるバグの早期発見
- IDEの強力なサポート
- リファクタリングの安全性
- 得点計算ロジックの正確性担保

#### ビルドツール: Vite 5.x
**選定理由:**
- 高速なビルドとHMR（Hot Module Replacement）
- プラグインによる単一HTMLファイル出力対応
- 最適化された本番ビルド
- TypeScript/React/SVGの統合的サポート

#### スタイリング: CSS Modules + インラインCSS
**選定理由:**
- CSSのスコープ分離
- ビルド時の単一ファイル埋め込みが容易
- 外部依存なし
- 軽量で高速

#### アイコンシステム: インラインSVG
**選定理由:**
- 解像度非依存でシャープな表示
- CSSでのスタイリング可能
- HTMLへの直接埋め込み可能
- ファイルサイズが小さい

#### 状態管理: React Context API + useReducer
**選定理由:**
- 外部ライブラリ不要
- Reactに標準搭載
- immutableな状態更新パターンの強制
- 単純なアプリには十分な機能

### 2.2 不採用技術と理由

#### Vue.js
**不採用理由:**
- Reactと比較してTypeScriptサポートが劣る
- 単一ファイルコンポーネント（.vue）のビルド時統合が複雑
- エコシステムがReactより小規模

#### Angular
**不採用理由:**
- 学習曲線が急峻
- 小規模アプリには過剰な機能
- ファイルサイズが大きくなりがち
- ビルド設定が複雑

#### Vanilla JavaScript
**不採用理由:**
- 型安全性の欠如
- 状態管理が複雑になりやすい
- コンポーネント再利用性が低い
- 保守性の問題

#### Tailwind CSS
**不採用理由:**
- ビルド後のCSSサイズが大きい
- ユーティリティクラスがHTMLを冗長にする
- 単一ファイル化時のパージ設定が複雑

#### Font Awesome / Material Icons
**不採用理由:**
- 外部フォントファイルへの依存
- 使用しないアイコンも含まれサイズが大きい
- カスタマイズ性が低い

#### Redux / MobX
**不採用理由:**
- 小規模アプリには過剰
- ボイラープレートコードが多い
- 追加の依存関係でファイルサイズ増加

## 3. ディレクトリ構造

```
agricalc/
├── src/
│   ├── components/           # Reactコンポーネント
│   │   ├── InputSection/     # 入力セクション
│   │   │   ├── FarmInput.tsx
│   │   │   ├── LivestockInput.tsx
│   │   │   ├── CropInput.tsx
│   │   │   ├── FamilyInput.tsx
│   │   │   └── BonusInput.tsx
│   │   ├── ScoreDisplay/     # 得点表示
│   │   │   ├── ScoreBreakdown.tsx
│   │   │   └── TotalScore.tsx
│   │   ├── Controls/         # 操作系
│   │   │   ├── ResetButton.tsx
│   │   │   └── CopyButton.tsx
│   │   └── Icons/            # SVGアイコンコンポーネント
│   │       ├── FieldIcon.tsx
│   │       ├── PastureIcon.tsx
│   │       ├── SheepIcon.tsx
│   │       └── ...
│   ├── hooks/                # カスタムフック
│   │   ├── useGameState.ts
│   │   └── useScoreCalculation.ts
│   ├── utils/                # ユーティリティ関数
│   │   ├── scoreCalculator.ts
│   │   └── formatters.ts
│   ├── types/                # TypeScript型定義
│   │   ├── game.ts
│   │   └── score.ts
│   ├── styles/               # グローバルスタイル
│   │   └── global.css
│   ├── App.tsx
│   └── main.tsx
├── dist/                     # ビルド出力
│   └── index.html           # 単一配布ファイル
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 4. データモデル設計

### 4.1 ゲーム状態の型定義

```typescript
// 農場要素
interface FarmElements {
  fields: number;          // 畑の枚数 (0-15)
  pastures: number;        // 牧場の枚数 (0-15)
  unusedSpaces: number;    // 未使用スペース (0-15)
}

// 家畜
interface Livestock {
  sheep: number;           // 羊 (0-無制限)
  boars: number;           // 猪 (0-無制限)
  cattle: number;          // 牛 (0-無制限)
}

// 作物
interface Crops {
  grain: number;           // 穀物 (0-無制限)
  vegetables: number;      // 野菜 (0-無制限)
}

// 家族と住居
interface FamilyAndHome {
  familyMembers: number;   // 家族 (2-5)
  clayRooms: number;       // 粘土の部屋 (0-15)
  stoneRooms: number;      // 石の部屋 (0-15)
}

// その他
interface Others {
  fencedStables: number;   // 柵で囲まれた厩 (0-4)
  cardBonus: number;       // カードボーナス点
}

// ゲーム全体の状態
interface GameState {
  farm: FarmElements;
  livestock: Livestock;
  crops: Crops;
  family: FamilyAndHome;
  others: Others;
}
```

### 4.2 得点計算の型定義

```typescript
// 各項目の得点
interface ScoreBreakdown {
  fields: number;
  pastures: number;
  unusedSpaces: number;
  sheep: number;
  boars: number;
  cattle: number;
  grain: number;
  vegetables: number;
  familyMembers: number;
  clayRooms: number;
  stoneRooms: number;
  fencedStables: number;
  cardBonus: number;
}

// 得点サマリー
interface ScoreSummary {
  breakdown: ScoreBreakdown;
  total: number;
}
```

## 5. コンポーネント設計

### 5.1 主要コンポーネント

#### App.tsx
- 全体のレイアウト管理
- Context Providerの設定
- レスポンシブ対応

#### InputSection コンポーネント群
- 数値入力は +/- ボタンと直接入力の両対応
- SVGアイコンによる視覚的識別
- リアルタイムバリデーション

#### ScoreDisplay コンポーネント
- 項目別得点の表示
- 合計得点の強調表示
- アニメーション付き更新

#### Icons コンポーネント群
- 各要素を表すシンプルなピクトグラム
- SVGとして実装
- カラーテーマ対応

### 5.2 状態管理フロー

```
ユーザー入力
    ↓
Input Components
    ↓
useReducer (immutable更新)
    ↓
Context Provider
    ↓
useScoreCalculation (純粋関数)
    ↓
Score Display
```

## 6. 得点計算ロジック

### 6.1 計算ルール実装

```typescript
// 純粋関数による得点計算
export const calculateScore = (state: GameState): ScoreSummary => {
  const breakdown: ScoreBreakdown = {
    fields: calculateFieldScore(state.farm.fields),
    pastures: calculatePastureScore(state.farm.pastures),
    unusedSpaces: state.farm.unusedSpaces * -1,
    sheep: calculateLivestockScore(state.livestock.sheep),
    boars: calculateLivestockScore(state.livestock.boars),
    cattle: calculateLivestockScore(state.livestock.cattle),
    grain: calculateCropScore(state.crops.grain),
    vegetables: calculateCropScore(state.crops.vegetables),
    familyMembers: state.family.familyMembers * 3,
    clayRooms: state.family.clayRooms * 1,
    stoneRooms: state.family.stoneRooms * 2,
    fencedStables: state.others.fencedStables * 1,
    cardBonus: state.others.cardBonus
  };

  const total = Object.values(breakdown).reduce((sum, score) => sum + score, 0);

  return { breakdown, total };
};
```

### 6.2 個別スコア計算関数

各計算は副作用のない純粋関数として実装：
- `calculateFieldScore`: 畑の得点計算
- `calculatePastureScore`: 牧場の得点計算
- `calculateLivestockScore`: 家畜の得点計算
- `calculateCropScore`: 作物の得点計算

## 7. ビルド設定

### 7.1 Vite設定 (vite.config.ts)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [
    react(),
    viteSingleFile({
      removeViteModuleLoader: true,
      useRecommendedBuildConfig: true
    })
  ],
  build: {
    target: 'es2015',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
});
```

### 7.2 TypeScript設定 (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "strict": true,
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "skipLibCheck": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 8. アイコン設計

### 8.1 アイコン一覧と設計方針

シンプルなピクトグラムスタイルのSVGアイコン：

| 要素 | アイコン概要 | 実装方針 |
|------|------------|---------|
| 畑 | 格子状の四角形 | 3x3グリッド線 |
| 牧場 | フェンスで囲まれた四角形 | 点線の境界 |
| 未使用スペース | ×印 | シンプルな斜線 |
| 羊 | 雲型の体 | 曲線で表現 |
| 猪 | 丸い体に短い足 | 簡略化した形状 |
| 牛 | 角のある頭部 | 特徴的なシルエット |
| 穀物 | 麦の穂 | 縦線と斜め線 |
| 野菜 | キャベツまたは人参 | 認識しやすい形 |
| 家族 | 人型シルエット | 単純な図形組み合わせ |
| 粘土の部屋 | レンガパターン | 横線の積み重ね |
| 石の部屋 | 石積みパターン | 不規則な四角形 |
| 厩 | 小屋のシルエット | 三角屋根と四角 |
| カード | カードの形 | 角丸四角形 |

### 8.2 SVG実装例

```tsx
// FieldIcon.tsx
export const FieldIcon: React.FC<IconProps> = ({ size = 24, color = '#8B4513' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" stroke={color} strokeWidth="2"/>
    <line x1="8" y1="2" x2="8" y2="22" stroke={color} strokeWidth="1"/>
    <line x1="16" y1="2" x2="16" y2="22" stroke={color} strokeWidth="1"/>
    <line x1="2" y1="8" x2="22" y2="8" stroke={color} strokeWidth="1"/>
    <line x1="2" y1="16" x2="22" y2="16" stroke={color} strokeWidth="1"/>
  </svg>
);
```

## 9. レスポンシブデザイン

### 9.1 ブレークポイント

```css
/* スマートフォン縦向き */
@media (max-width: 480px) {
  /* 1カラムレイアウト */
}

/* スマートフォン横向き・タブレット */
@media (min-width: 481px) and (max-width: 768px) {
  /* 2カラムレイアウト */
}

/* デスクトップ */
@media (min-width: 769px) {
  /* 3カラムレイアウト */
}
```

### 9.2 タッチ最適化

- ボタンの最小サイズ: 44x44px
- タップターゲット間の間隔: 8px以上
- スワイプジェスチャー非使用（誤操作防止）

## 10. パフォーマンス最適化

### 10.1 最適化戦略

1. **コード分割なし**: 単一ファイルのため不要
2. **Tree Shaking**: 未使用コードの削除
3. **Minification**: HTML/CSS/JS全ての圧縮
4. **インラインリソース**: 外部ファイル参照なし
5. **メモ化**: React.memoとuseMemoの活用

### 10.2 目標メトリクス

- ファイルサイズ: < 500KB（圧縮後）
- 初回ロード: < 1秒
- 入力レスポンス: < 50ms
- 得点計算: < 10ms

## 11. テスト戦略

### 11.1 テスト種別

#### 単体テスト
- 得点計算ロジックの正確性
- 純粋関数の入出力検証
- エッジケースの処理

#### 統合テスト
- コンポーネント間の連携
- 状態管理の整合性
- ユーザーフローの検証

### 11.2 テストツール

- **Jest**: テストランナー
- **React Testing Library**: コンポーネントテスト
- **TypeScript**: 型レベルでの検証

## 12. デプロイと配布

### 12.1 ビルドプロセス

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# 本番ビルド（単一HTMLファイル生成）
npm run build

# dist/index.html が配布可能ファイル
```

### 12.2 配布方法

1. **直接配布**: index.htmlファイルをそのまま共有
2. **Webホスティング**: GitHub Pages, Netlify等
3. **ローカル実行**: ファイルをブラウザで直接開く

## 13. セキュリティ考慮事項

- XSS対策: Reactの自動エスケープ機能
- CSP非依存: インラインスクリプトのため制限なし
- 外部通信なし: 完全オフライン動作
- ローカルストレージ非使用: プライバシー配慮

## 14. 今後の拡張可能性

### 14.1 機能拡張候補

- PWA化: オフラインインストール対応
- 多言語対応: i18nフレームワーク導入
- ゲーム履歴: IndexedDBによる保存
- 拡張版対応: ルールセット切り替え

### 14.2 技術的改善候補

- WebAssembly: 計算処理の高速化
- Service Worker: キャッシュ戦略
- Web Components: フレームワーク非依存化

---

作成日：2024年9月15日  
バージョン：1.0.0