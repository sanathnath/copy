import React from 'react'
import { useNavigate } from 'react-router-dom'

function SingleCoinList({coin}) {
  const navigate = useNavigate();
  return (
    <div className='coinTab' onClick={()=>{ navigate(`/coin/${coin.id}/${coin.name}`) } }>
      <div>
        <h4>{coin.name}</h4>
        <h6>{coin.fullName}</h6>
        </div>
        <div>
          <h6>price: {coin.price.toFixed(2)}</h6>
          <span style={{color:`${coin.dayChange > 0 ? "green" : "red"}`}}>{coin.dayChange.toFixed(2)}</span>
        </div>
    </div>
  )
}

export default SingleCoinList