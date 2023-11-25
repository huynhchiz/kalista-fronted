import './ZoomImage.scss'
import { useCallback, useState } from 'react'
import { Controlled } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const ZoomImage = ({ src, alt, className }) =>  {
    const [isZoomed, setIsZoomed] = useState(false)

    const handleZoomChange = useCallback(shouldZoom => {
        setIsZoomed(shouldZoom)
    }, [])
    
    return (
        <div className={`zome-image-wrapper ${className}`}>
            <Controlled isZoomed={isZoomed} onZoomChange={handleZoomChange} >
                <img
                    className={`zoom-image${isZoomed ? ' zooming' : ''}`}
                    src={src}
                    alt={alt}
                />
            </Controlled>
        </div>
    )
}

export default ZoomImage