import 'dotenv/config'
import express from "express"
import cors from 'cors'
import mongoose from 'mongoose'
import ImageKit from "imagekit";
import Chat from './models/chat.js'
import UserChats from './models/userChats.js'

import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'

const port = process.env.PORT || 3000
const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use(express.json())

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log('Connected to MongoDB')
    } catch (err) {
        console.error(err)
    }
}

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

app.get("/api/upload", (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
})

// app.get("/api/test", ClerkExpressRequireAuth(), (req, res) => {
//     console.log('ok')
//     res.send("OK")
// })

app.post(
    "/api/chats",
    ClerkExpressRequireAuth(),
    async (req, res) => {
        const { userId } = req.auth
        const { text } = req.body
        try {
            // create new chat
            const newChat = new Chat({
                userId,
                history: [{ role: "user", parts: [{ text }] }]
            })

            const savedChat = await newChat.save()

            // check if user chats array exists
            const userChats = await UserChats.find({ userId })

            // if not create a new one and add the chat in it
            if (!userChats.length) {
                const newUserChats = new UserChats({
                    userId,
                    chats: [{
                        _id: savedChat._id,
                        title: text.substring(0, 40)
                    }]
                })
                console.log(newUserChats)
                await newUserChats.save()
            } else {
                // if exists, push the chat to it
                await UserChats.updateOne({ userId }, {
                    $push: {
                        chats: {
                            _id: savedChat._id,
                            title: text.substring(0, 40)
                        }
                    }
                })
            }
            res.status(201).send(`Chat ${newChat._id} created`)
        } catch (err) {
            console.error(err)
            res.status(500).send("Error creating chat")
        }
    })

app.get("/api/userchats", ClerkExpressRequireAuth(), async (req, res) => {
    const { userId } = req.auth

    try {
        const userChats = await UserChats.find({ userId })

        console.log(userChats)
        res.status(200).send(userChats[0].chats)
    } catch (err) {
        console.error(err)
        res.status(500).send('Error fetching user chats!')
    }
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(401).send('Unauthenticated!')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    connect()
})