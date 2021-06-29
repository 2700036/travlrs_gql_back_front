import React, {useRef, useCallback, useEffect} from 'react';
import { useActions } from '../../reducers/useActions';



export default (Wrapped) => {
  return ({ title, name, ...props }) => {
    const { closePopups } = useActions();

    const popup = useRef();
  const smoothClose = useCallback(() => {
    popup.current.classList.remove('popup_is-opened');
    popup.current.addEventListener('transitionend', closePopups, true)
  }, [closePopups])
  
  const hadleOverlayClick = ({target})=>{
    if(target.classList.contains('popup')){
      smoothClose();
    }
  }
  useEffect(() => {
    const escFunction = ({keyCode}) => {
      if(keyCode === 27) {
        smoothClose();
      }
    }
    popup.current.classList.add('popup_is-opened')
    document.addEventListener("keydown", escFunction);
    
    return () => {
      document.removeEventListener("keydown", escFunction);
      
      
    };
  }, [smoothClose]);

    return (      
    <div ref={popup} onClick={hadleOverlayClick} className={`popup popup_type_${name} `}>
      <div className='popup__content' >
        <button 
        type='button' 
        className='popup__close'
        onClick={smoothClose}
        ></button>
        <h3 className='popup__title'>{title}</h3>
        <Wrapped {...props}/>
      </div>
    </div>     
    )
  }
}
  
  

