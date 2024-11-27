import { useEffect, useState } from 'react'
// import { messageType } from '../../types'
import { useSelector, useDispatch } from 'react-redux'
import { setMsgStatus } from '../../store/index'
import './index.css'
import { anyProps } from '../../types'


const Message = () => {
  const [msgClass, setMsgClass] = useState<string>('')

  const {msgStatus, msgTitle = '提示', msgInfo = '默认提示信息', msgTimeout = 2500} = useSelector((state: anyProps) => {
    return {
      msgStatus: state.index.msgStatus,
      msgTitle: state.index.msgTitle,
      msgInfo: state.index.msgInfo,
      msgTimeout: state.index.msgTimeout
    }
  })
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log('msgStatus', msgStatus)
    if (msgStatus === true) {
      setMsgClass('message-slide-in');
      setTimeout(() => {
        dispatch(setMsgStatus(false ));
        setMsgClass('message-slide-out')
      }, msgTimeout)
    }
  }, 
    [msgStatus]
  )

  return(
    <div className={`message ${msgClass}`}>
      <div className='header'>{ msgTitle }</div>
      <div className='content'>
        <p>{ msgInfo }</p>
      </div>
    </div>
  )
}

export default Message