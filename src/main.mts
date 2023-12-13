import express, {Request} from 'express';
import cookieParser from 'cookie-parser';
import {PrismaClient} from '@prisma/client'
import {SignJWT, jwtVerify, importPKCS8} from "jose"
import cors from 'cors';
import {createViteDevServer} from "./viteServer.mjs";


console.log(process.env.DATABASE_URL)

const app = express();
app.use(express.json())

if (process.env.NODE_ENV === "production") {
  app.use(express.static('front/dist'))
} else {
  createViteDevServer("./front").then(({app: viteApp}) => {
    app.use(viteApp)
  })
}

app.listen(3000, () => {
  console.log('Server is running');
})
