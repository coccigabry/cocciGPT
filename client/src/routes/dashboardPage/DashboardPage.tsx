import { useAuth } from '@clerk/clerk-react'
import './dashboardPage.css'

const DashboardPage = () => {

  const { userId } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const text = e.target.text.value
    if (!text) return
    await fetch("http://localhost:3000/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, userId })
    })
  }

  return (
    <div className='dashboardPage'>
      <div className="texts">
        <div className="logo">
          <img src="./src/assets/imgs/ai.png" alt="logo" />
          <h1>COCCI GPT</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="./src/assets/imgs/speak.png" alt="Speak icons created by Freepik - Flaticon" />
            <span>Create a new chat</span>
          </div>
          <div className="option">
            <img src="./src/assets/imgs/picture.png" alt="Picture icons created by Freepik - Flaticon" />
            <span>Analize Images</span>
          </div>
          <div className="option">
            <img src="./src/assets/imgs/programming.png" alt="Code icons created by juicy_fish - Flaticon" />
            <span>Help me with my code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form action="" onSubmit={handleSubmit}>
          <input type="text" placeholder="How can I help you?" name="text" id="" />
          <button>
            <img src="./src/assets/imgs/send.png" alt="Send message icons created by Md Tanvirul Haque - Flaticon" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default DashboardPage