## やること？
- [ ] 絶対に落ちないサーバーにしておくべき？
- [ ] 例外とifの使い分けがやっぱわからん
- [ ] Webっぽい機能つける？ Basic認証とか？
- [ ] node的な機能
    - [ ] WebSocketをつかったリアルタイムなんたら系
    - [ ] スレッドとか非同期とかそのへんの理解
        - [ ] スレッドモデルとイベントループモデル
            - [ ] イベントループだから、my_server.close()を差し込むとアサーション終わる前にCLOSEして／(^o^)＼となる
        - [ ] その他
    - [ ] テストフレームワーク(mochaとかpower_assert)使いたい
    - [ ] pdb的なデバッガは？

## httpモジュール使っちゃったよな件について
- Node.jsのhttpモジュールは TCP.server と events.EventEmitter を継承したもの
- 追加されているのは
    - requestイベントとリスナ
    - IncomingMessageのオブジェクト2種類
        - http.ServerRequest(req)
        - http.ServerResponse(res)
        - こいつらがリクエスト管理とか、レスポンス(リクエストボディやリクエストヘッダなど)するメソッド(writeHeadなど)を持っている
- よって、上記のものを実装すれば実現はできる(でも無理だった／(^o^)＼)

## メモ
```
npm install frisby@0.8.5 --save-dev
```