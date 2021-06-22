import { BTN_TYPE } from 'constants/BtnConstants';
import './Button.scss';

const Button = ({type='button', btnType, children, onClick}) => {
  let btnClass = 'button';
  if(btnType === BTN_TYPE.OUTLINE) {
    btnClass+= ' outline';
  }
  return ( 
    <button className={btnClass} type={type} onClick={onClick}>{children}</button>
  );
};
 
export default Button;