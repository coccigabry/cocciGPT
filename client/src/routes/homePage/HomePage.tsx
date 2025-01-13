import { Link } from "react-router-dom"
import "./homePage.css"

const Homepage = () => {
  return (
    <div className='homepage'>
      <img src="./src/assets/imgs/space.jpg" alt="Photo by Gabriele Garanzelli on Unsplash" className="space" />
      <div className="left">
        <h1>COCCI GPT</h1>
        <h2>Ask me any question</h2>
        <h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Vivamus semper, magna eu congue euismod, ex enim laoreet turpis, ullamcorper commodo augue ex vitae nunc. 
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="./src/assets/imgs/monkey.png" alt="Monkey icons created by smalllikeart - Flaticon" className="monkey"/>
        </div>
      </div>
    </div>
  )
}

export default Homepage