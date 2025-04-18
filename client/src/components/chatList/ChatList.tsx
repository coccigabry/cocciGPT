import { Link } from 'react-router-dom'
import './chatList.css'
import { useQuery } from '@tanstack/react-query'

const ChatList = () => {

  const { isPending, error, data } = useQuery({
    queryKey: ['userChats'],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, { credentials: "include" })
        .then((res) => res.json()
        ),
  })

  return (
    <div className='chatList'>
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new chat</Link>
      <Link to="/">Explore Cocci GPT</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        {
          isPending ? 'Loading...'
            : error ? 'An error has occurred'
              : data?.map(chat => (
                <Link to={`/dashboard/chats/${chat._id}`} key={chat.id}>{chat.title}</Link>
              ))
        }
      </div>
      <hr />
    </div>
  )
}

export default ChatList