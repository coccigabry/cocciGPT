import { useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import './newPrompt.css'
import send from '../../assets/imgs/send.png';
import Upload from '../upload/Upload'
import { IKImage } from 'imagekitio-react'
import model from '../../lib/gemini.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const NewPrompt = ({ data }) => {

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
    const formRef = useRef(null)

    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [data, question, answer, img])

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ question: question.length ? question : undefined, answer, img: img.dbData?.filePath || undefined, })
            }).then(res => res.json())
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chat', data._id] }).then(() => {
                formRef.current.reset()
                setQuestion("")
                setAnswer("")
                setImg({
                    isLoading: false,
                    error: '',
                    dbData: {},
                    aiData: {},
                })
            })
        },
        onError: (err) => console.log(err)
    })

    const add = async (text, isInitial) => {
        if (!isInitial) setQuestion(text)

        try {
            const question = Object.entries(img.aiData).length ? [img.aiData, text] : [text]
            const result = await chat.sendMessageStream(question);
            let answer = ""
            for await (const chunk of result.stream) {
                const chunkText = chunk.text()
                answer += chunkText
                setAnswer(answer)
            }

            mutation.mutate()
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const text = e.target.text.value
        if (!text) return
        add(text, false)
    }

    // ! not needed in prod
    const hasRun = useRef(false)
    useEffect(() => {
        if (!hasRun.current) {

            if (data?.history?.length === 1) {
                add(data.history[0].parts[0].text, true)
            }
        }
        hasRun.current = true
    }, [])

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
            <form action="" className='newForm' onSubmit={handleSubmit} ref={formRef}>
                <Upload setImg={setImg} />
                <input id="file" type="file" multiple={false} hidden />
                <input type="text" placeholder="How can I help you?" name="text" id="" />
                <button>
                    <img src={send} alt="Send message icons created by Md Tanvirul Haque - Flaticon" />
                </button>
            </form>
        </>
    )
}

export default NewPrompt