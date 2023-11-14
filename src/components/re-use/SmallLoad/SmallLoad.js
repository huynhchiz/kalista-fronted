import './SmallLoad.scss'
import { ColorRing } from 'react-loader-spinner'

const SmallLoad = () => {
    return (
        <div className='small-load'>
            <ColorRing
                visible={true}
                height="32px"
                width="32px"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </div>
    )
}

export default SmallLoad