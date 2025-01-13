import { useEffect, useRef, useState } from 'react'
import './newPrompt.css'
import Upload from '../upload/Upload'
import { IKImage } from 'imagekitio-react'

const NewPrompt = () => {

    const [img, setImg] = useState({
        isLoading: false,
        error: '',
        dbData: {}
    })

    const endRef = useRef(null)

    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [])

    return (
        <>
            {img.isLoading && <div>Loading...</div>}
            {img.dbData?.filePath && (
                <IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGEKIT_ENDPOINT}
                    path={img.dbData.filePath}
                    width="380"
                    transformation={[{width: "380"}]}
                />
            )}
            <div className="endChat" ref={endRef}></div>
            <form action="" className='newForm'>
                <Upload setImg={setImg} />
                <input id="file" type="file" multiple={false} hidden />
                <input type="text" placeholder="How can I help you?" name="" id="" />
                <button>
                    <img src="./src/assets/imgs/send.png" alt="Send message icons created by Md Tanvirul Haque - Flaticon" />
                </button>
            </form>
        </>
    )
}

export default NewPrompt