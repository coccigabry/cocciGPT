import { useEffect, useRef } from 'react'
import './newPrompt.css'

const NewPrompt = () => {

    const endRef = useRef(null)

    useEffect(() => {
      endRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [])

    return (
        <>
            <div className="endChat" ref={endRef}></div>
            <form action="" className='newForm'>
                <label htmlFor="file">
                    <img src="./src/assets/imgs/attachment.png" alt="Attachment icons created by Uniconlabs - Flaticon" />
                </label>
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