import fs from 'fs'
import { createServer } from 'https'
import { parse } from "url"
import next from 'next'

const port = process.env.PORT //port
const hostname = process.env.HOST_NAME // ip

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler();

const httpsOptions = {
    key: fs.readFileSync(`./${process.env.KEY}.pem`), // 생성된 개인 키 파일
    cert: fs.readFileSync(`./${process.env.CERY_KEY}.pem`), // 생성된 인증서 파일
}

app.prepare().then(() => {
    createServer(httpsOptions, async (req, res) => {
        try {
            const parsedUrl = parse(req.url, true);
            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('internal server error');
        }
    }).listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on https://${hostname}:${port}`);
    });
});