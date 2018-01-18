mime_estimate = extname => {
    const mime_types = {
        ".html": "text/html",
        ".jpg" : "image/jpg",
    }

    return mime_types[extname]
}

module.exports = class MyServer {
    constructor(port) {
        this.port = port || 8888
    }

    run() {
        const http   = require("http")
        const path   = require("path")
        const fs     = require("fs")
        const server = http.createServer()

        server.on("request", (req, res) => {
            const Response = {
                "Success": (file_data, extname) => {
                    const headers = {"Content-Type": mime_estimate(extname)}
                    res.writeHead(200, headers)
                    res.end(file_data, "binary")
                },
                "Fail": status_code => {
                    const path_name = path.join(__dirname, "public/" + status_code + ".html")
                    const headers = {"Content-Type": "text/html"}

                    res.writeHead(status_code, headers)
                    fs.readFile(path_name, "utf-8", (err, file_data) => res.end(file_data))
                }
            }

            if (req.method !== "GET") { return Response["Fail"](400) }

            let path_name = path.join(__dirname, "public/" + req.url)

            fs.exists(path_name, is_exist => {
                if (!is_exist) { return Response["Fail"](404) }

                path_name += fs.statSync(path_name).isDirectory() ? "/index.html" : ""

                fs.readFile(path_name, "binary", (err, file_data) => {
                    if (!err) { return Response["Success"](file_data, path.extname(path_name)) }

                    if (err.code === "EACCES") { return Response["Fail"](403) }
                    if (err.code === "ENOENT") { return Response["Fail"](404) }

                    // TODO: ここまできたら500でもいいのかね？
                    // TODO: 標準出力じゃなくてロギングの方がよさそうじゃね？
                    console.log(err)
                    return Response["Fail"](500)
                }) 
            })
        })
        server.listen(this.port)
        console.log("Server running at http://localhost:" + this.port)
    }
}
