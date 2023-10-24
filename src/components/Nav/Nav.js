import { useState } from 'react'
import './Nav.scss'

import ThemeToggle from '../small-re-use/ThemeToggle/ThemeToggle'

const Nav = () => {
    const [loged, setLoged] = useState(false)

    return (
        <div className='nav'>
            <div className='nav-introduce'>
                <ThemeToggle />
            </div>
        </div>
    )
}

export default Nav