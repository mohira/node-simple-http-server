const MyServer = require("../my_server.js")
const port = 3333
my_server = new MyServer(port)
my_server.run()

const frisby = require("frisby");
const base_url = "http://localhost:" + port

// TODO: itブロック的なのでまとめられそう
// TODO: 命名どうする？ 「=>方式」 もいいかも？
// TODO: 全てのテストが終わったらサーバー落としたい

frisby.create("/index.html     => public/index.html")
    .get(base_url + "/index.html")
    .expectHeaderContains("content-type", "text/html")
    .expectStatus(200)
    .toss()

frisby.create("root dir has index.html")
    .get(base_url)
    .expectHeaderContains("content-type", "text/html")
    .expectStatus(200)
    .toss()

frisby.create("root dir index.html has title")
    .get(base_url)
    .expectHeaderContains("content-type", "text/html")
    .expectBodyContains("<title>Node.js Simple HTTP Server</title>")
    .toss()

frisby.create("exist HTML file")
    .get(base_url + "/dir/other.html")
    .expectHeaderContains("content-type", "text/html")
    .expectStatus(200)
    .toss()

frisby.create("dir directory is exist and has index.html")
    .get(base_url + "/dir")
    .expectHeaderContains("content-type", "text/html")
    .expectStatus(200)
    .toss()

frisby.create("image")
    .get(base_url + "/cat.jpg")
    .expectHeaderContains("content-type", "image/jpg")
    .expectStatus(200)
    .toss()

frisby.create("request not exist path, return 404 NotFound")
    .get(base_url + "/not_exist_path")
    .expectHeaderContains("content-type", "text/html")
    .expectStatus(404)
    .toss()

frisby.create("POST request, return 400 BadRequestError")
    .post(base_url)
    .expectHeaderContains("content-type", "text/html")
    .expectStatus(400)
    .toss()

frisby.create("not_index_dir is directory but dosen't have index.html")
    .get(base_url + "/not_index_dir")
    .expectHeaderContains("content-type", "text/html")
    .expectStatus(404)
    .toss()

frisby.create("request no permission file")
    .get(base_url + "/no_permission.log")
    .expectHeaderContains("content-type", "text/html")
    .expectStatus(403)
    .toss()

// frisbyの出力確認用コード
// frisby.create("出力で確認").get(base_url + "/cat.jpg")
// // .addHeaders(
// //     {
// //         "Content-Type": "application/json"
// //     }
// // )
// // .inspectRequest()     // リクエストuri, body, method, headers などを出力
// .inspectResponse()    // レスポンスheaders, body などを出力
// // .inspectHeaders()     // レスポンスheaders (content-type, content-length, dateなど) を出力
// // .inspectBody()        // レスポンスbody をテキスト出力
// // .inspectJSON()        // レスポンスbody をJSON出力
// // .inspectStatus()      // レスポンスステータスコードを出力
// .toss();