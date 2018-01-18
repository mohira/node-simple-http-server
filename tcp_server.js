// クライアントから送信されたバイト列をそのままクライアントに返す
// $ telnet localhost 3000 <- これで遊べる
const net      = require("net")
const readline = require("readline")
const server   = net.createServer()

// TCPクライアントの接続最大数を設定
server.maxConnections = 3

class Client {
    constructor(socket) {
        this.socket = socket
    }

    writeData(data) {
        let socket = this.socket

        if (socket.writable) {
            let key = socket.remoteAddress + ":" + socket.remotePort
            process.stdout.write("[" + key + "] - " + data)
            socket.write("[Return from server] " + data + "\n")
        }
    }
}

let clients = {}

// 接続開始のログ
server.on("connection", socket => {
    let status = server.connections + "/" + server.maxConnections
    let key = socket.remoteAddress + ":" + socket.remotePort
    console.log("Connection Start(" + status + ") - " + key)
    clients[key] = new Client(socket)
})

// socket に対して dataイベント リスナを登録する
server.on("connection", socket => {
    let data = ""
    let newline = /\r\n|\n/

    // データが送信されてきたら発動
    socket.on("data", chunk => {
        // console.log("\n===== 受信したデータ(chunk) =====\n", chunk.toString())
        data += chunk.toString()
        let key = socket.remoteAddress + ":" + socket.remotePort

        if (newline.test(data)) {
            clients[key].writeData(data)
            data = ""
        }
    })
})

// クライアント接続終了時のイベントリスナを登録する
server.on("connection", socket => {
    let key = socket.remoteAddress + ":" + socket.remotePort

    // socket が 切断(FIN) を要求してきた時
    // クライアントから FIN というパケットが送られてきたときね
    socket.on("end", () => {
        let status = server.connections + "/" + server.maxConnections
        console.log("Connection End(" + status + ") - " + key)
        delete clients[key]
    })
})

// サーバーソケットクローズ時のイベント
// server.close() の後、全ての接続が終了したときにイベントが発生する
server.on("close", () => {
    console.log("Server Closed")
})

// サーバーの開始と終了処理
server.listen(3000, "localhost", () => {
    let addr = server.address()
    console.log("Listening Start on Server - " + addr + ":" + addr.port)
})

// Control-C でサーバーソケットをクローズする
let rl = readline.createInterface(process.stdin, process.stdout)
rl.on("SIGINT", () => {
    for (const i in clients) {
        let socket = clients[i].socket
        socket.end()
    }

    server.close()
    rl.close()
})