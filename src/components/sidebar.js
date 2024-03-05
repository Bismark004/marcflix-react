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
        
        <i className={`bx ${isOpen ? 'bx-chevron-left' : 'bx-chevron-right'} toggle`} onClick={toggleSidebar}></i>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <li className="search-box">
            <i className='bx bx-search icon'></i>
            <input type="text" placeholder="Search" onChange={props.handleSearchQuery} />
          </li>

          <ul className="menu-links">
            <li className="nav-link">
              <a href="#">
                <i className='bx bx-home-alt icon'></i>
                <span className="text nav-text">Home</span>  
              </a>
            </li>

          
          </ul>
        </div>

       
      </div>
    </nav>
  );
  }
  export default Sidebar
