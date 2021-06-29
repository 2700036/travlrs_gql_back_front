import React from 'react';
import withPopup from '../hoc-helpers/withPopup';
import success from '../../images/success.png';
import failed from '../../images/failed.png';
import { useSelector } from 'react-redux';

const InfoTooltip = () => {
  const { authStatus } = useSelector(({ app }) => app);  
  if(authStatus.name){
    return (
      <>
    <img src={success}/>
    <p>Вы успешно зарегистрировались!</p>
    </>
    )
  } else {
    return (
      <>
    <img src={failed}/>
    <p>{authStatus.message || authStatus.error}</p>
    </>
    )
  }
  
}

export default withPopup(InfoTooltip);
