import { useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import './newPrompt.css'
import Upload from '../upload/Upload'
import { IKImage } from 'imagekitio-react'
import model from '../../lib/gemini.js'

const NewPrompt = () => {

    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [img, setImg] = useState({
        isLoading: false,
        error: '',
        dbData: {},
        aiData: {},
    })

    const chat = model.startChat({
        history: [],
        generationConfig: {
            // maxOutputTokens: 100
        }
    })

    const endRef = useRef(null)

    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [question, answer, img])

    const add = async (text) => {
        setQuestion(text)
        const question = Object.entries(img.aiData).length ? [img.aiData, text] : [text]
        const result = await chat.sendMessageStream(question);
        let answer = ""
        for await (const chunk of result.stream) {
            const chunkText = chunk.text()
            answer += chunkText
            setAnswer(answer)
        }
        setImg({
            isLoading: false,
            error: '',
            dbData: {},
            aiData: {},
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const text = e.target.text.value
        if (!text) return
        add(text)
    }

    return (
        <>
            {img.isLoading && <div>Loading...</div>}
            {img.dbData?.filePath && (
                <IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGEKIT_ENDPOINT}
                    path={img.dbData.filePath}
                    width="380"
                    transformation={[{ width: "380" }]}
                />
            )}
            {question && <div className='message user'>{question}</div>}
            {answer && <div className='message'><Markdown>{answer}</Markdown></div>}
            <div className="endChat" ref={endRef}></div>
            <form action="" className='newForm' onSubmit={handleSubmit}>
                <Upload setImg={setImg} />
                <input id="file" type="file" multiple={false} hidden />
                <input type="text" placeholder="How can I help you?" name="text" id="" />
                <button>
                    <img src="./src/assets/imgs/send.png" alt="Send message icons created by Md Tanvirul Haque - Flaticon" />
                </button>
            </form>
        </>
    )
}

export default NewPrompt