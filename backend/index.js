import 'dotenv/config'
import express from "express"
import cors from 'cors'
import ImageKit from "imagekit";

const port = process.env.PORT || 3000
const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL
}))

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
  });

app.get("/api/upload", (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})