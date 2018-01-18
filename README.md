```
npm install frisby@0.8.5 --save-dev
```

## やること
- [ ] テスト通りに実装
    - [ ] /index.html     => public/index.html
    - [ ] /               => public/index.html
    - [ ] /dir            => public/dir/index.html
    - [ ] /dir/other.html => public/dir/other.html

    - [ ] /cat.jpg        => 猫の画像が出る

    - [ ] /notfound       => public/404.html
    - [ ] POSTリクエスト  => public/400.html

    - [ ] ???             => public/400.html
    - [ ] ???             => public/500.html

- [ ] 絶対に落ちないサーバーにしておく


- [ ] クラス分割
    - [ ] これむずい

- [ ] Basic認証？
    - [ ] やるならアサーションもね
        - [ ] 参考:http://ttr-hamasaki.hatenablog.com/entry/2015/09/27/070557

- [ ] http実装について
    - [ ] どうやるかだけでも説明する
    - [ ] http://ikemonn.hatenablog.com/entry/2015/10/06/080000

## httpモジュール実装について
Node.jsのhttpモジュールは
TCP.server と events.EventEmitter を継承したもの

追加されているのは
    requestイベント
    IncomingMessageのオブジェクト2種類
        http.ServerRequest(req) と http.ServerResponse(res)
        こいつらがリクエストボディやリクエストヘッダを返すメソッド(writeHeadなど)を持っている

よって、上記のものを実装すれば実現はできる(でも無理だった)
    

## node独自
[ ] イベントループ
[ ] テストフレームワーク
[ ] WebSocketをつかったリアルタイムなんたら









