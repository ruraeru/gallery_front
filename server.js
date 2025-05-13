import fs from 'fs'
import https from 'https'
import next from 'next'

const port = 3000
const hostname = '172.111.114.189'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev: false })
const handle = app.getRequestHandler()

const httpsOptions = {
    key: fs.readFileSync('./172.111.114.189-key.pem'), // 생성된 개인 키 파일
    cert: fs.readFileSync('./172.111.114.189.pem'), // 생성된 인증서 파일
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