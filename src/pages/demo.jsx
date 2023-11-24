import React,{useRef,useState,useEffect} from "react";


function InputCom1(props){
    const inpref = useRef(null)
    const [inpval, setInpval] = useState('')
    const changeVal = (e)=>{
        console.log(e.target.value)
        setInpval(e.target.value)
    }

    //函数防抖
    const debunce = (fn)=>{
        let timer = null
        return (e)=>{
            if(timer){
                clearTimeout(timer)
            }
            timer = setTimeout(()=>{
                fn(e)
            },2000)
        }
    }

    //函数节流
    const throttle = (fn,wait)=> {
        let timeout;
        return (args)=>{
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    fn(args);
                }, wait);
            }
        }
    }

    const debfn = debunce(changeVal)
    throttle()

    return (
        <>
            {/* <div>result:{inpref.current.value}</div> */}
            <div>res:{inpval}</div>
            <input type="text" ref={inpref} value={props.value ? props.value : ''} onChange={debfn}/>
        </>
    )
}



export default function FatherCom(){

    return(
        <>
            <InputCom1 value = '测试'/>
        </>
    )
}