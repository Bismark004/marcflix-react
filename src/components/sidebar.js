import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import './sidebar.css'; 

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`sidebar ${isOpen ? 'open' : 'close'}`}>
      <header>
        <div className="image-text">
          <span className="image">
            <img src="https://drive.google.com/uc?export=view&id=1ETZYgPpWbbBtpJnhi42_IR3vOwSOpR4z" alt="" />
          </span>

          <div className="text logo-text">
            <span className="name">Marc</span>
            <span className="profession">Marcflix</span>
          </div>
        </div>
        <i className={`bx ${isOpen ? 'bx-chevron-left' : 'bx-chevron-right'} toggle`} onClick={toggleSidebar}></i>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <li className="search-box">
            <i className='bx bx-search icon'></i>
            <input type="text" placeholder="Search" onChange={PaymentResponse.handleSearch} />
          </li>

          <ul className="menu-links">
            <li className="nav-link">
              <a href="#">
                <i className='bx bx-home-alt icon'></i>
                <span className="text nav-text">Dashboard</span>  
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className='bx bx-bar-chart-alt-2 icon'></i>
                <span className="text nav-text">Revenue</span>
              </a>
            </li>
          
            {/* Other menu items */}
          </ul>
        </div>

        <div className="bottom-content">
          <li>
            <a href="#">
              <i className='bx bx-log-out icon'></i>
              <span className="text nav-text">Logout</span> 
            </a>
          </li>

          <li className="mode">
            <div className="sun-moon">
              <i className='bx bx-moon icon moon'></i>
              <i className='bx bx-sun icon sun'></i>
            </div>
            <span className="mode-text text">Dark mode</span>
        
            <div className="toggle-switch">
              <span className="switch"></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
  }
  export default Sidebar;
