/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './Search.css'
import {useNavigate} from 'react-router-dom'

const Search = () => {

    const navigate = useNavigate();

    const [sideBarData, setSideBarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    })

    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState([]);

    console.log(listing);

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);

        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        console.log(orderFromUrl);

        if(searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl){
            setSideBarData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true'? true : false,
                furnished: furnishedFromUrl === 'true'? true : false,
                offer: offerFromUrl === 'true'? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            })
        }

        const fetchListing = async ()=>{
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            setListing(data);
            setLoading(false);

        }

        fetchListing();

    }, [location.search])


    const handleChange = (e)=>{

        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setSideBarData({...sideBarData, type: e.target.id});
        }

        if(e.target.id === 'searchTerm'){
            setSideBarData({...sideBarData, searchTerm: e.target.value});
        }

        if(e.target.id === 'offer' || e.target.id === 'parking' || e.target.id === 'furnished'){
            setSideBarData({...sideBarData, [e.target.id]: e.target.checked || e.target.checked==='true'?true:false})
        }

        if(e.target.id==='sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSideBarData({...sideBarData, sort, order});
        }

    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sideBarData.searchTerm);
        urlParams.set('type', sideBarData.type);
        urlParams.set('parking', sideBarData.parking);
        urlParams.set('furnished', sideBarData.furnished);
        urlParams.set('offer', sideBarData.offer);
        urlParams.set('sort', sideBarData.sort);
        urlParams.set('order', sideBarData.order);

        const searchQuery = urlParams.toString();

        navigate(`/search?${searchQuery}`);
    }

  return (
    <div className='searchPage'>
      <div className="leftSearch">
        <form onSubmit={handleSubmit}>
            <div className="search-term">
                <label>Search Term:</label>
                <input type="text" id='searchTerm' placeholder='search...' value={sideBarData.searchTerm} onChange={handleChange} />
            </div>
            <div className='type'>
                <label>TYPE:</label>
                <div className="typeOptions">
                    <input type="radio" id="all" name='type' onChange={handleChange} checked={sideBarData.type==='all'}/>
                    <span>RENT & SALE</span>
                </div>
                <div className="typeOptions">
                    <input type="radio" id="rent" name='type'  onChange={handleChange} checked={sideBarData.type==='rent'} />
                    <span>RENT</span>
                </div>
                <div className="typeOptions">
                    <input type="radio" id="sale" name='type'  onChange={handleChange} checked={sideBarData.type==='sale'}/>
                    <span>SALE</span>
                </div>
                <div className="typeOptions">
                    <input type="checkbox" id="offer"  onChange={handleChange} checked={sideBarData.offer}/>
                    <span>OFFER</span>
                </div>
            </div>

            <div className='type'>
                <label>AMENITIES:</label>
                <div className="typeOptions">
                    <input type="checkbox" id="parking"  onChange={handleChange} checked={sideBarData.parking}/>
                    <span>PARKING</span>
                </div>
                <div className="typeOptions">
                    <input type="checkbox" id="furnished"  onChange={handleChange} checked={sideBarData.furnished}/>
                    <span>FURNISHED</span>
                </div>
            </div>

            <div className="sortDiv">
                <label>SORT:</label>
                <select id="sort_order" onChange={handleChange} defaultValue={'created_at_desc'}>
                    <option value='regularPrice_asc'>Price low to high</option>
                    <option value='regularPrice_desc'>Price high to low</option>
                    <option value='createdAt_desc'>Latest</option>
                    <option value='createdAt_asc'>Oldest</option>
                </select>
            </div>

            <button className='searchBtn'>Search</button>

        </form>
      </div>
      <div className="rightSearch">
        <h1>Listing Results:</h1>
      </div>
    </div>
  )
}

export default Search