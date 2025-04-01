import { useNavigate } from 'react-router-dom'
import './dashboardPage.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const DashboardPage = () => {

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text })
      }).then(res => res.json())
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['userChats'] })
      navigate(`/dashboard/chats/${id}`)
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const text = e.target.text.value
    if (!text) return

    mutation.mutate(text)
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
        <form onSubmit={handleSubmit}>
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