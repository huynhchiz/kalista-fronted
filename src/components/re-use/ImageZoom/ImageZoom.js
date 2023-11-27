import './ImageZoom.scss'
import { useDispatch } from 'react-redux'
import zoomImageSlice from '../../../slices/zoomImageSlice'

const ImageZoom = ({ src, alt, className }) => {
    const dispatch = useDispatch()

    const handleZoom = (src, alt) => {
        const newStateZoomImage = {
            status: true,
            src: src,
            alt: alt
        }
        dispatch(zoomImageSlice.actions.handleZoomImage(newStateZoomImage))
    }

    return (
        <img src={src} alt={alt} className={'image-unzoom' + ' ' + className} onClick={() => handleZoom(src, alt)} />
    )
}

export default ImageZoom