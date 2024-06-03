import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function DeleteCart({setdeleteOn, deleteFunction,currentProductToDelete}) {
     function handleSubmit(e){
        e.preventDefault();
        deleteFunction(currentProductToDelete.id)
        setdeleteOn(false);

     }
    return (
        <div>
            <div className='overlay' onClick={() => setdeleteOn(false)} />
            <div className='deleteForm_container'>
                <FontAwesomeIcon className='exit' icon="fas fa-times" onClick={() => setdeleteOn(false)} />
                <form onSubmit={(e)=>handleSubmit(e)} className='delete_form'>
                    <p>האם אתה בטוח שברצונך למחוק את {currentProductToDelete.name} מסוג {currentProductToDelete.package} מסל הקניות</p>
                    <input type="submit" value="כן" />
                </form>
            </div>
        </div>
    );
}

export default DeleteCart;
