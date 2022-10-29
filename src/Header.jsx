import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <nav>
            <ul>
                <Link to='/'>Home</Link>
                <Link to='react-query'>React Query</Link>
                <Link to='react'>React Posts</Link>
            </ul>
        </nav>
    </div>
  )
}

export default Header