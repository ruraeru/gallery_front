import fs from 'fs'
import https from 'https'
import next from 'next'

const port = process.env.PORT //port
const hostname = process.env.HOST_NAME // ip

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const httpsOptions = {
    key: fs.readFileSync(process.env.KEY), // 생성된 개인 키 파일
    cert: fs.readFileSync(process.env.CERT_KEY), // 생성된 인증서 파일
}

app.prepare().then(() => {
    https
        .createServer(httpsOptions, (req, res) => {
            handle(req, res)
        })
        .listen(port, hostname, (err) => {
            if (err) throw err
            console.log(`> Ready on https://${hostname}:${port}`)
        })
})