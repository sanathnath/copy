import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import Banner from '../Container/Banner';
import SingleCoinList from '../Container/SingleCoinList'
import cryptos from '../data/allCoins.json'

function HomePage() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const getList = async()=>{
        setLoading(true);
        const data = await axios.get(`https://jsonkeeper.com/b/VE7I`).then((res)=>{
            return res.data;
        });
        setList(data);
        setLoading(false);
    }
    const handleSearch = ()=>{
      return cryptos.filter((item)=>{
        return item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.fullName.toLowerCase().includes(searchText.toLocaleLowerCase())
          
      })
    }

    const handlePageClick = (event)=>{
      setPageNumber(event.selected);
    }
    //useEffect(() => {
     // console.log("effet");
       // getList();
   // },[])

  return (
    <main className='main'>
    <div className='homePage'>
        <Banner />
        {cryptos.length === 0 ? null : 
        <div className='search'>
          <input value={searchText} onInput={(event)=>{
            setSearchText(event.target.value)
            }} placeholder='search crypto'/>
        </div>
      }
        {cryptos.length === 0 ?"loading":
        handleSearch().slice(pageNumber*10,(pageNumber*10)+10).map((item)=>{
          return <SingleCoinList coin={item}/>
        })}
        <div className='page-buttons'>
        <ReactPaginate
        pageCount={Math.ceil(handleSearch().length/10)}
        onPageChange={handlePageClick}
        nextLabel=">"
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      </div>
    </div>
    </main>
  )
}

export default HomePage
