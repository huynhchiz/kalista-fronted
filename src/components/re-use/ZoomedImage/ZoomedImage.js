import './ZoomedImage.scss'
import { zoomSelector } from '../../../redux/selectors/zoomSelector'
import { useDispatch, useSelector } from 'react-redux'
import zoomImageSlice from '../../../slices/zoomImageSlice'

const ZoomedImage = () => {
    const zoomImageSelector = useSelector(zoomSelector)
    const dispatch = useDispatch()

    const handleUnZoom = () => {
        dispatch(zoomImageSlice.actions.handleZoomImage())
    }

    return (
        zoomImageSelector && zoomImageSelector.status &&
        <div className='zooomed-image-wrapper'>
            <div className='zoomed-image-frame' onClick={handleUnZoom}>
                <img src={zoomImageSelector.src} alt={zoomImageSelector.alt} className='image-zoomed' />
            </div>
        </div>

    )
}

export default ZoomedImage