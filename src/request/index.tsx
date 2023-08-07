import React,{useEffect, useState} from "react";

interface propsType{
    setData: (arg: any)=>void,
    setLoading: (arg: any)=>void,
    setCurrentPage: (arg: any)=>void,
}

export default function GetMockData(props:propsType) {

    // useEffect(()=>{
    //     return ()=>{
    //         clearTimeout(timer);
    //         props.setLoading(true)
    //         props.setCurrentPage(1)
    //         props.setData([])
    //     }
    // },[])

    const timer = setTimeout(()=>{
        let tmpData: any = [];
        for(let i=0; i<5; i++) {
            let obj: Object = {
                key: `${i}`,
                name: 'John Brown',
                age: parseInt((Math.random()*100).toFixed(0)),
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
            };
            tmpData.push(obj)
        }
        props.setData(tmpData)
        props.setLoading(false)
    }, 3000)

    return timer
    
}