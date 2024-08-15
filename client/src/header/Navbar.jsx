import React  from 'react'
import { Link } from 'react-router-dom'
import './pages/file.css'

const Navbar = () => {

  return (
    <>
    <nav>
        <div className='linkContainer'>
          <Link to='/'>register</Link>
          <Link to='/admin'>admin</Link>
        </div>
    </nav>
    </>
  )
}

export default Navbar