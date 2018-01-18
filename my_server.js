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
                "200": (filedata, extname) => {
                    const headers = {"Content-Type": mime_estimate(extname)}
                    res.writeHead(200, headers)
                    res.end(filedata, "binary")
                },
                "400": () => {
                    const path_400 = path.join(process.cwd(), "public/400.html")
                    const headers = {"Content-Type": "text/html"}

                    res.writeHead(400, headers)
                    fs.readFile(path_400, "utf-8", (err, filedata) => res.end(filedata))
                },
                "403": () => {
                    const path_403 = path.join(process.cwd(), "public/403.html")
                    const headers = {"Content-Type": "text/html"}

                    res.writeHead(403, headers)
                    fs.readFile(path_403, "utf-8", (err, filedata) => res.end(filedata))
                },
                "404": () => {
                    const path_404 = path.join(process.cwd(), "public/404.html")
                    const headers = {"Content-Type": "text/html"}

                    res.writeHead(404, headers)
                    fs.readFile(path_404, "utf-8", (err, filedata) => res.end(filedata))
                },
                "500": err => {
                    const path_500 = path.join(process.cwd(), "public/500.html")
                    const headers = {"Content-Type": "text/html"}

                    res.writeHead(500, headers)
                    fs.readFile(path_500, "utf-8", (err, filedata) => res.end(filedata))
                }
            }

            if (req.method !== "GET") {
                Response["400"]()
                return
            }

            let path_name = path.join(process.cwd(), "public/" + req.url)

            fs.exists(path_name, exists => {
                if (!exists) {
                    Response["404"]()
                    return
                }

                path_name += fs.statSync(path_name).isDirectory() ? "/index.html" : ""

                fs.readFile(path_name, "binary", (err, filedata) => {
                    if (!err) {
                        Response["200"](filedata, path.extname(path_name))
                        return
                    } 

                    if (err.code === "EACCES") {
                        Response["403"]()
                        return
                    }

                    if (err.code === "ENOENT") {
                        Response["404"]()
                        return
                    }
                }) 
            })
            // TODO: ここまできたら500でもいいのかね？
            Response["500"]
        })
        server.listen(this.port)
        console.log("Server running at http://localhost:" + this.port)
    }
}
