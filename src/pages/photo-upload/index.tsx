import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Button, Image } from '@nextui-org/react'
import './index.css'

type UploadProps = {};

const Upload: React.FC<UploadProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadImgList, setUploadImgList] = useState<string[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    console.log('拖入文件')

    const reader = new FileReader();
      
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        // console.log('读取文件成功', e.target.result);
        const url = e.target?.result.toString();
        setUploadImgList((prev) => [...prev, url]);
      }
    };
    
    // 读取文件内容
    reader.readAsDataURL(acceptedFiles[0]);
  };

  const uploadFile = async () => {
    if (!file) return;

    const chunkSize = 1 * 1024 * 1024; // 分片大小，这里以1MB为例
    const chunks = Math.ceil(file.size / chunkSize);

    for (let i = 0; i < chunks; i++) {
      const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('filename', file.name);
      formData.append('chunkIndex', i.toString());
      formData.append('totalChunks', chunks.toString());

      try {
        axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

      } catch (error) {
        console.error('Error uploading chunk:', error);
      }
    }

    alert('上传成功！');
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    // 组件卸载前执行清理操作
    return () => {
      setFile(null);
    };
  }, [])

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className='w-1/4 h-1/3 flex' {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', cursor: 'pointer' }}>
        <input id="imageInput" {...getInputProps()} />
        <p style={{ display: uploadImgList.length > 0 ? 'none' : 'block' }}>拖拽文件到这里或者点击选择文件</p>
        <div className='w-full h-full flex'>
          {
            uploadImgList.map((item: any, index: number) => {
              return (
                <div className={`w-1/3 ml-1`}>
                  <Image
                    key={index}
                    src={item}
                    alt="NextUI Album Cover"
                    width={'100%'}
                  />
                </div>
              );
            })
          }
        </div>
      </div>
      <Button className='w-[150px] h-[100px] mt-10' color="secondary" onClick={uploadFile}>
        上传文件
      </Button>
    </div>
  );
};

export default Upload;
