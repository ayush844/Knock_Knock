/* eslint-disable no-unused-vars */
import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>

        <div className="header-content">

            <Link to="/" style={{ textDecoration: 'none' }}>

            <h1 style={{ textDecoration: 'none' }}>
                <span>Knock</span>
                <span>Knock</span>
            </h1>

            </Link>


            <form>
                <input type="text" placeholder='Search...' />
                <SearchIcon className='icon'/>
            </form>

            <ul>

                <Link to='/home' style={{ textDecoration: 'none' }}>
                    <li className='hide-when-small'>HOME</li>
                </Link>
                
                <Link to='/about'  style={{ textDecoration: 'none' }}>
                    <li className='hide-when-small'>ABOUT</li>
                </Link>

                <Link to='/sign-in' style={{ textDecoration: 'none' }}>
                    <li>SIGN IN</li>
                </Link>

            </ul>

        </div>


      
    </header>
  )
}

export default Header
