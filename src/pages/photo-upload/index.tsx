import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Button, Image } from '@nextui-org/react'
import './index.css'

type UploadProps = {};

const Upload: React.FC<UploadProps> = () => {
  const [file, setFile] = useState<(File | null)[]>([]);
  const [uploadImgList, setUploadImgList] = useState<string[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const curFile: File = acceptedFiles[0];
    setFile((prevFile) => {
      // 确保prevFile是一个数组
      if (Array.isArray(prevFile)) {
        return [...prevFile, curFile];
      } else {
        // 如果prevFile不是数组，则返回一个新数组，包含当前文件
        return [curFile];
      }
    });
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
    if (!file.length) return;

    const filePromise: Promise<void>[] = file.map(async (item) => {
      if (item) {
        return fileDispose(item); // 确保item不是null
      } else {
        // 处理item为null的情况，例如可以抛出错误或返回一个解决的Promise
        throw new Error('Item cannot be null');
        // 或者
        // return Promise.resolve();
      }
    })

    Promise.all(filePromise).then(() => {
      alert('上传成功！');
    });

  };

  const fileDispose = async(file: File) => {
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
  }


  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    // 组件卸载前执行清理操作
    console.log('当前包含的文件', file)
  }, [file])

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className='w-1/4 h-1/3 flex' {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', cursor: 'pointer' }}>
        <input id="imageInput" {...getInputProps()} />
        <p style={{ display: uploadImgList.length > 0 ? 'none' : 'block' }}>拖拽文件到这里或者点击选择文件</p>
        <div className='w-full h-full flex'>
          {
            uploadImgList.map((item: any, index: number) => {
              return (
                <div className={`w-1/3 ml-1`} key={index}>
                  <Image
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
