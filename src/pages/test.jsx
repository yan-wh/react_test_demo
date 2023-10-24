import React,{ memo, useCallback, useEffect, useReducer, useState } from "react";

const initData = {
    count: 1
}

const reducerTool = (data, action)=>{
    switch(action.type){
        case 'incre':
            return {count: data.count+action.data};
        case 'deIncre':
            return {count: data.count-action.data};
        default:
            return 'no type'
    }
}

export default function TestCommponent(){
    const [num, setNum] = useState(0);
    const [count, setCount] = useState(foo)
    const [data, dispatch] = useReducer(reducerTool, initData);
    function foo() {
        return 666
    }
    const option = {
        number: num
    }
    function everyBack(){}
    useEffect(()=>{
        console.log('我是副作用')
    }, [num])
    function increment(){
        setCount((n) => n + 1)
        dispatch({
            type: 'incre',
            data: 1
        })
    }
    function deIncrement(){
        dispatch({
            type: 'deIncre',
            data: 1
        })
    }

    function newBackFun(){}
    // const newBackFun = useCallback(()=>{

    // }, [])

    return (
        <div>
            <p>count: {data.count}</p>
            <p>state: {count}</p>
            <ChildComponent 
                name={count}
                newBackFun={newBackFun} //使用useCallBack时可控制newBackFun函数地址不变，这样ChildComponent组件内的副作用则不会发生改变
                //但是如果不使用useCallBack的话那么一旦使用set变更state值，那么TestCommponent组件重新渲染带动子组件ChildComponent的重新渲染，那么就会让useEffect运行一次
                //如果子组件使用memo包裹的话，和上述同理，不使用useCallBack的话那么memo使用Object.is进行新旧props比较时会不一致，导致子组件刷新，同时useEffect也会执行一次
            />
            <p>
                <button onClick={increment}>增加</button>
                <button onClick={deIncrement}>减少</button>
            </p>
        </div>
    )
}

const ChildComponent = memo(function ChildComponent(props){
    console.log('我是子组件')
    useEffect(()=>{
        console.log('我是子组件副作用')
    }, [props.newBackFun])
    return <p>子组件</p>
})
// function ChildComponent(props){
//     console.log('我是子组件')
//     useEffect(()=>{
//         console.log('我是子组件副作用')
//     }, [props.newBackFun])
//     return <p>子组件</p>
// }