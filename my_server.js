function mime_estimate(extname) {
    const mime_types = {
        ".html": "text/html",
        ".jpg" : "image/jpg",
    }

    return mime_types[extname]
}



module.exports = class MyServer {
    run() {
        const http   = require("http")
        const url    = require("url")
        const path   = require("path")
        const fs     = require("fs")
        const port   = 8888
        const server = http.createServer()

        server.on("request", (req, res) => {
            var Response = {
                "200": (filedata, extname) => {
                    let headers = {"Content-Type": mime_estimate(extname)}
                    res.writeHead(200, headers)
                    res.end(filedata, "binary")
                },
                "400": () => {
                    let path_400 = path.join(process.cwd(), "public/400.html")

                    res.writeHead(400, {"Content-Type": "text/html"});
                    fs.readFile(path_400, "utf-8", (err, filedata) => {
                        return res.end(filedata)
                    })
                },
                "403": () => {
                    let path_403 = path.join(process.cwd(), "public/403.html")

                    res.writeHead(403, {"Content-Type": "text/html"});
                    fs.readFile(path_403, "utf-8", (err, filedata) => {
                        return res.end(filedata)
                    })
                },
                "404": () => {
                    let path_404 = path.join(process.cwd(), "public/404.html")

                    res.writeHead(404, {"Content-Type": "text/html"});
                    fs.readFile(path_404, "utf-8", (err, filedata) => {
                        return res.end(filedata)
                    })
                },
                "500": err => {
                    let path_500 = path.join(process.cwd(), "public/500.html")

                    res.writeHead(500, {"Content-Type": "text/html"});
                    fs.readFile(path_500, "utf-8", (err, filedata) => {
                        return res.end(filedata)
                    })
                }
            }

            let path_name = path.join(process.cwd(), "public/" + req.url)

            if (req.method !== "GET") {
                Response["400"]()
                return
            }

            fs.exists(path_name, exists => {
                console.log(path_name, exists)

                if (!exists) {
                    Response["404"]()
                    return
                }

                if (fs.statSync(path_name).isDirectory()) {
                    path_name += '/index.html'
                }

                fs.readFile(path_name, "binary", function(err, filedata){
                    if (err) {
                        Response["404"]()
                        return
                    }

                    const extname = path.extname(path_name)
                    Response["200"](filedata, extname)
                }); 
            })

        })
        server.listen(port)
        console.log("Server running at http://localhost:" + port)
    }
}


