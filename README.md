# POTI-board EVO ChickenPaint 対応版

## 概要
![image](https://user-images.githubusercontent.com/44894014/117165096-293c9000-ae00-11eb-91f7-88a4fb26eb8c.png)  
- [thenickdude/chickenpaint: An HTML5 Port of the ChibiPaint multi-layer Oekaki painting tool](https://github.com/thenickdude/chickenpaint)  
- 従来のPaintBBS NEO、しぃペインターに加え、ChickenPaintも使えるようにしたPOTI-boardです。  

DEMO [お絵かき掲示板](https://pbbs.sakura.ne.jp/cgi/neosample/chibi/index.html)
### 
### [2021/06/05] v3.01.8 lot.210605
- 管理画面のページング
記事が6000件あると、管理者削除画面に6000件分表示していましたが、それを2000件単位でページ送りできるようになりました。
- ページングの改良
35頁単位でページ送りできるようになりました。
- ChickenPaintの日本語対応が一通り完了しました。
- CheerpJ Applet Runnerが起動しない問題に対応しました。

更新が必要なファイル。
- Chickenpaint ディレクトリを上書きアップデート
- Paintとotherのテンプレートを上書きアップデート
- MONOのcssファイルを上書きアップデート
- potiboard.phpを上書きアップデート
- search.phpを上書きアップデート

### [2021/05/15] 
- 圧縮済みの`chickenpaint.min.js`を使うようにした。
- pink_paint.htmlを上書きアップデート。
- タブレット端末の表示上の横幅が534px以上の時はChickenPaintを選択できるようにした。
- pink_main.htmlとpink_res.htmlを上書きアップデート。
### [2021/05/12]
- しぃペインターとChickenPaintを使う使わないを選択できるようにした。どちらも使わない時は選択メニューが消えてNEOが起動します。potiboard.phpを上書きアップデート。
- しぃペインターとChickenPaintを使う使わないを選択するときは、config.phpのアップデートが必要です。どちらも使う時はconfig.phpのアップデートの必要はありません。
- レイヤーを選択するときに、リネームなどのメニューが開いてしまう問題を修正しました。
- また、改二から、POTI-board EVO(Evolution)に名称を変更しました。(テーマのHTML一式)
- 統一性をはかるためテーマのHTMLの5ファイルの上書きアップデートをお願いします。

### [2021/05/11] 
- 管理画面から、ChickenPaint固有のレイヤー情報を保存している(拡張子 .chi)ファイルをアップデートしてキャンバスに読み込む機能を追加。
- 変形時操作を行った時にツールパレットが縦長になる問題を修正。(pink_paint.htmlを上書きアップデート)
- 画像の横幅が750px以上の時にはコメントを画像の下に表示。(pink_main.html,pink_res.htmlを上書きアップデート)
### [2021/05/10] 
- ChickenPaintの作者の方がビルド済みの最新版を公開してくれました。
- それにともないChickenPaintを2018年版から最新版にアップデート。
- ChickenPaintディレクトリをいったん削除して入れ直してください。
- テーマのHTMLのpink_paint.htmlを上書きアップデート。
- potiboard.phpの更新をお願いします。
- ChickenPaint独自フォーマット、.chiファイルの削除処理の実装をわすれていました。
- 更新しないと、画像を差し換えたときにも古い.chiファイルが残ります。
- 画像を削除しても.chiファイルが残ってしまいます。

### [2021/05/09] 
- iPadでもChickenPaintを使えるようにしました。  
- 具体的には、マルチタッチでデバイスの幅が767px以下の環境でmobile判定。
- mobile判定されなかった時は、しぃペインターやChickenPaintの選択メニューが出ます。
- iPadでもしぃペインターの選択画面がでますが現時点では使えるのか使えないのかわかりません。
- 著作表示にChickenPaintを追加しました。
### [2021/05/06] 
- レスお絵かきのアプリの切替えに対応。
- JavaScriptによるモバイル判定をHTMLに追加。
- モバイルと判定された時はNEOしか起動しないようにした。
- ChickenPaintのリソースディレクトリの位置関係を整理。

### [2021/05/05] 
- PaintBBS NEO、しぃペインター、ChickenPaintを選択式にして、それぞれのお絵描きアプリを起動可能にした。
- 続きを描くときに
- PaintBBS NEO、しぃペインターで動画があるときは、同じアプリが起動。
- ChickenPaintのレイヤーフィアルがあるときは、ChickenPaintが起動します。

### [2021/05/05] 
- 対応開始



