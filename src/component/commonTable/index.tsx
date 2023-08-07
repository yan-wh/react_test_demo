import React, {useEffect, useState} from "react";
import { Table, Tag, Button, Select, Input } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import GetMockData from '../../request/index'

interface propsType {
    name: string,
    data_total: number
}

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}
  
const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Button>删除</Button>
      ),
    },
];


export default function CommonTable(props: propsType) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(()=>{
        const timer = GetMockData({setData, setLoading, setCurrentPage})
        return ()=>{
            clearTimeout(timer)
            setLoading(true)
            setCurrentPage(1)
            setData([])
        }
    },[])

    function handleChange(value: any) {
        setLoading(true)
        setCurrentPage(1)
        setData([])
        GetMockData({setData, setLoading, setCurrentPage})
    }
    function onSearch(value: any) {
        console.log(value);
    }

    return (
        <div style={{width: "100%", height: '100%'}}>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <Select
                    defaultValue="lucy"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'test1', label: 'test1' },
                        { value: 'test2', label: 'test2' },
                    ]}
                />
                <Input.Search style={{width: '20%'}} placeholder="input search text" onSearch={onSearch} enterButton />
            </div>
            <Table 
                dataSource={data}
                columns={columns}
                loading={{spinning: loading}}
                pagination={{
                    current: currentPage,
                    pageSize: 5,
                    simple: true,
                    // showQuickJumper: true,
                    showTotal: (total, range)=>{
                        return <span>当前页面总数: {total}</span>
                    },
                    total: 50,
                    onChange: (page, pageSize) => {
                        setLoading(true)
                        setCurrentPage(page)
                        GetMockData({setData, setLoading, setCurrentPage})
                    }
                }}
            />
        </div>
    )
}