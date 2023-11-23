/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';

const Header = () => {

    const {currentUser} = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();

        navigate(`/search?${searchQuery}`);

    }
    

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search])

  return (
    <header>

        <div className="header-content">

            <Link to="/" style={{ textDecoration: 'none' }}>

            <h1 style={{ textDecoration: 'none' }}>
                <span>Knock</span>
                <span>Knock</span>
            </h1>

            </Link>


            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Search...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
                <button>
                    <SearchIcon className='icon' style={{color:'gray'}}/>
                </button>
            </form>

            <ul>

                <Link to='/' style={{ textDecoration: 'none' }}>
                    <li className='hide-when-small'>HOME</li>
                </Link>
                
                <Link to='/about'  style={{ textDecoration: 'none' }}>
                    <li className='hide-when-small'>ABOUT</li>
                </Link>

                <Link to='/profile' style={{ textDecoration: 'none' }}>
                    {
                        currentUser ?
                        <img className='userImage' src={currentUser.avatar} alt='profile' /> : 
                        <li>SIGN IN</li>
                    }
                </Link>

            </ul>

        </div>


      
    </header>
  )
}

export default Header
