import React from 'react';
import Menu from '../Assets/Menu.png';
import Logo from '../Assets/tv.png';
import './Top.css';

const Top = (props) => {
  return (
    <div className='top'>
        <img src={Menu} alt='menu'/>

        <div className='logo'>
            <img src={Logo} alt='logo'/>
            <h2>Marcflix</h2>
        </div>

        <input 
        type='text'
        placeholder='what do you you want to watch?'
        onChange={props.handleSearchQuery} 
        />


    </div>
  )
};

export default Top;
 