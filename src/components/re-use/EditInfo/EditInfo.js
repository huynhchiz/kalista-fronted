import { useState } from 'react'
import './EditInfo.scss'
import { dispatchLoadPage } from '../../../dispatchs/dispatchPageAction'
import { updateAccountInfo } from '../../../service/accountService'
import NavBack from '../NavBack/NavBack'
import { useNavigate } from 'react-router-dom'

const EditInfo = () => {
    const name = 'huynh chi'
    const [newUsername, setNewUsername] = useState('')
    const navigate = useNavigate()

    const handleChangeInput = (e, setState) => {
        setState(e.target.value)
    }

    const buildDataToUpdate = () => {
        let data = {}
        data.newUsername = newUsername

        return data
    }

    const handleSaveUpdate = async () => {
        if(newUsername !== '') {
            dispatchLoadPage()
            const data = buildDataToUpdate()
            
            let res = await updateAccountInfo(data)
            if(res && +res.EC === 0) {
                dispatchLoadPage()
                window.location.reload();
            } else {
                dispatchLoadPage()
            }
        }
    }

    const handleBack = () => {
        navigate('/my-profile')
    }


    return (
        <>
            <NavBack onGoBack={handleBack} />
            <div className='edit-info'>
                <h2>EDIT INFO : {name}</h2>

                <div className='edit-info-name'>
                    <label className='edit-info-name-label'>
                        Change your name:
                    </label>
                    <input
                        className='edit-info-name-input'
                        name='name'
                        placeholder='Your name'
                        value={newUsername}
                        onChange={e => handleChangeInput(e, setNewUsername)}
                    />
                </div>
                
                <div className='edit-info-done-btn'
                    onClick={handleSaveUpdate}
                >
                    OK
                </div>

            </div>
        
        </>
    )
}

export default EditInfo