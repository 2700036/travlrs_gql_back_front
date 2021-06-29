import React, { useCallback, useEffect, useRef } from 'react';
import Spinner from '../Spinner/Spinner';



const ImagePopup = ({card, onClose})=> {
  const popup = useRef();
  const smoothClose = useCallback(() => {
    popup.current.classList.remove('popup_is-opened');
    popup.current.addEventListener('transitionend', onClose, true)
  }, [onClose])
  
  useEffect(() => {
    const escFunction = ({keyCode}) => {
      if(keyCode === 27) {
        smoothClose();
      }
    }
    const hadleOverlayClick = ({target})=>{
      
      if(target.classList.contains('popup')){
        smoothClose();
      }
    }
   
    document.addEventListener("keydown", escFunction);
    document.addEventListener("click", hadleOverlayClick);
    if(popup.current) popup.current.classList.add('popup_is-opened')
    
    return () => {
      document.removeEventListener("keydown", escFunction);
      document.removeEventListener("click", hadleOverlayClick);
      
    };
  }, [smoothClose]);
    
    return card 
    ?
      <>
        <div ref={popup} className='popup popup_type_image'>
          <div className='popup__content popup__content_content_image'>
            
            <button 
            type='button' 
            className='popup__close'
            onClick={smoothClose}
            ></button>
            
            <img alt={`Фото места ${card?.name}`} src={card?.link || card?.avatar} className='popup__image' />
    <p className='popup__caption'>{card?.name}</p>
    {card?.about ? <p className='popup__caption popup__about'>{card?.about}</p> : ""}
          </div>
        </div>
      </>
    : <Spinner />
  
}

export default ImagePopup;
