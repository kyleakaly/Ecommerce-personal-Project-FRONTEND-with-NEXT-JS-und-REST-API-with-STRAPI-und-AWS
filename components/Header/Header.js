
//componente
import TopBar from "./TopBar/TopBar"
import Menutienda from "./Menu/Menu"

const Header = () => {
  return (
    <div className="header">
       <TopBar/>
        <Menutienda/>
    </div>
  )
}

export default Header