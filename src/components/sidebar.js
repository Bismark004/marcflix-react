import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import './sidebar.css'; 


function Sidebar(props) {
  
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`sidebar ${isOpen ? 'open' : 'close'}`}>
      <header>
        
        <i className={`bx ${isOpen ? 'bx-chevron-right' : 'bx-chevron-left'} toggle`} onClick={toggleSidebar}></i>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <li className="search-box">
            <i className='bx bx-search icon'  onClick={toggleSidebar}></i>
            <input type="text" placeholder="Search" onChange={props.handleSearchQuery} />
          </li>

          <ul className="menu-links">
            <li className="nav-link">
              <a href>
                <i className='bx bx-home-alt icon'></i>
                <span className="text nav-text">Home</span>  
              </a>
            </li>

            <li className="nav-link">
              <a href>
                <i class='bx bxs-heart icon'></i>
                <span className="text nav-text">Romance</span>  
              </a>
            </li>

            <li className="nav-link">
              <a href>
              <i class='bx bxs-hot icon'></i>
                <span className="text nav-text">Action</span>  
              </a>
            </li>


            <li className="nav-link">
              <a href>
                <i class='bx bxs-chalkboard icon'></i>
                <span className="text nav-text">Documentary</span>  
              </a>
            </li>

            <li className="nav-link">
              <a href>
                <i className='bx bxs-game icon'></i>
                <span className="text nav-text">Animation</span>  
              </a>
            </li>


            <li className="nav-link">
              <a href>
              <i class='bx bxs-flask icon'></i>
                <span className="text nav-text">Sci-fi</span>  
              </a>
            </li>

          
          </ul>
        </div>

       
      </div>
    </nav>
  );
  }
  export default Sidebar;
