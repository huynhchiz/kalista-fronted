import './Home.scss'

import Post from '../re-use/Post/Post'

const Home = () => {
    return (
        <div className='home'>
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    )
}

export default Home