import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate();
  return (
    <div className='header' onClick={()=>{navigate('/')}}>
        <h3>Cryptos</h3>
    </div>
  )
}

export default Header