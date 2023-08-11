import React,{useEffect} from "react";
import CommonTable from "../component/commonTable";

export default function IndexPage() {
    
    useEffect(()=>{

    },[])

    return (
        <div style={{width: "100%", height: '600px', border: '1px solid whitesmoke'}}>
            <CommonTable name="表格"/>
        </div>
    )
}