import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Image as NextUIImage } from '@nextui-org/react'
// import Compressor from 'compressorjs';
import imageCompression from 'browser-image-compression';
import { 
  // useSelector, 
  useDispatch 
} from 'react-redux'
import { setState, setLoadingStatus } from '../../store/index'
import { request } from '../../request'
import './index.css'

type UploadProps = {};

const Upload: React.FC<UploadProps> = () => {
  const [file, setFile] = useState<(File | null)[]>([]);
  const [uploadImgList, setUploadImgList] = useState<string[]>([]);
  const [photoBlobArr, setPhotoBlobArr] = useState<(object)[]>([]);
  const dispatch = useDispatch()

  const photoCompress = async (curFile: File) => {
    if (curFile) {
      // console.log('开始压缩图片')
      // 使用 imageCompression 压缩效果最好，只是时间稍长一点点
      const imageFile = curFile;
      console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
      console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }
      try {
        const compressedFile = await imageCompression(imageFile, options);
        let blobObj = {
          name: curFile.name,
          blob: compressedFile,
        }
        setPhotoBlobArr((prev) => [...prev, blobObj]);
        dispatch(setLoadingStatus(false));
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

      } catch (error) {
        console.log(error);
      }

      // const compressor = new Compressor(curFile, {
      //   quality: 0.6, // 设置压缩质量
      //   success(result) {
      //     // console.log('压缩成功', result)
      //     // 压缩成功后，result为压缩后的Blob对象
      //     // 接下来可以将Blob转换为DataURL，再转换为WebP格式
      //     const reader = new FileReader();
      //     reader.onload = function (e: any) {
      //       const img = new Image();
      //       img.src = e.target.result;
      //       img.onload = function () {
      //         // 使用canvas将图片转换为WebP格式
      //         const canvas = document.createElement('canvas');
      //         canvas.width = img.width;
      //         canvas.height = img.height;
      //         const ctx = canvas.getContext('2d');
      //         if (ctx) {
      //           ctx.drawImage(img, 0, 0);
      //           canvas.toBlob((blob) => {
      //             // blob为WebP格式的Blob对象
      //             // 可以使用FileReader读取，或者直接通过FormData上传
      //             console.log('压缩后的图片', blob);
      //             // 将转换后的blob先存入数组中
      //             let blobObj = {
      //               name: curFile.name,
      //               blob,
      //             }
      //             setPhotoBlobArr((prev) => [...prev, blobObj]);
      //             dispatch(setLoadingStatus(false));
      //           }, 'image/webp');
      //         }
      //       };
      //     };
      //     reader.readAsDataURL(result);
      //   },
      //   error(err) {
      //     console.error(err.message);
      //   },
      // });
    }
  }

  const onDrop = (acceptedFiles: File[]) => {
    dispatch(setLoadingStatus(true)); // 设置加载状态为true
    acceptedFiles.forEach((curFile: File) => {
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
      photoCompress(curFile);
  
      const reader = new FileReader();
        
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          // console.log('读取文件成功', e.target.result);
          const url = e.target?.result.toString();
          setUploadImgList((prev) => [...prev, url]);
        }
      };
      
      // 读取文件内容
      reader.readAsDataURL(curFile);
    })
  };

  const uploadFile = async () => {
    if (!file.length) {
      dispatch(setState({
        msgStatus: true,
        msgTitle: '提示',
        msgInfo: '请先上传图片',
        msgTimeout: 2500
      }));
      return
    }

    const filePromise: Promise<void>[] = photoBlobArr.map((blobObj: any, index) => {
      if (blobObj.blob) {
        return fileDispose(blobObj.blob, blobObj.name); // 确保item不是null
      } else {
        // 处理item为null的情况，例如可以抛出错误或返回一个解决的Promise
        throw new Error('blob cannot be null');
        // 或者
        // return Promise.resolve();
      }
    })

    console.log('filePromise', filePromise)

    Promise.allSettled(filePromise).then((res) => {
      console.log('上传结果', res);
      dispatch(setState({
        msgStatus: true,
        msgTitle: '提示',
        msgInfo: localStorage.getItem('localMsg') ? localStorage.getItem('localMsg') as string : '',
        msgTimeout: 2500
      }));
    }).catch((err) => {
      console.log('上传失败', err);
    });

  };

  const fileDispose = async (blob: Blob, filename: string) => {
    const chunkSize = 1 * 100 * 1024; // 分片大小，这里以1MB为例
    const chunks = Math.ceil(blob.size / chunkSize);
  
    for (let i = 0; i < chunks; i++) {
      const chunk = blob.slice(i * chunkSize, (i + 1) * chunkSize);
      const formData = new FormData();
      formData.append('chunk', chunk, `${filename}-${i}`); // 使用传递的文件名和分片索引
      formData.append('filename', filename);
      formData.append('chunkIndex', i.toString());
      formData.append('totalChunks', chunks.toString());
  
      try {
        await request({
          url: '/api/upload',
          method: 'post',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        // await axios.post('/api/upload', formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // });
      } catch (error) {
        console.error('Error uploading chunk:', error);
      }
    }
  };

  // const fileDispose = async(file: File) => {
  //   const chunkSize = 1 * 1024 * 1024; // 分片大小，这里以1MB为例
  //   const chunks = Math.ceil(file.size / chunkSize);

  //   for (let i = 0; i < chunks; i++) {
  //     const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
  //     const formData = new FormData();
  //     formData.append('chunk', chunk);
  //     formData.append('filename', file.name);
  //     formData.append('chunkIndex', i.toString());
  //     formData.append('totalChunks', chunks.toString());

  //     try {
  //       axios.post('/api/upload', formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });

  //     } catch (error) {
  //       console.error('Error uploading chunk:', error);
  //     }
  //   }
  // }


  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    // 组件卸载前执行清理操作
    // console.log('当前包含的文件', file)
    localStorage.setItem('localMsg', '') // 初始化上传消息提醒
  }, [])

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className='fileInputContainer w-1/4 h-1/3 flex' {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', cursor: 'pointer' }}>
        <input id="imageInput" {...getInputProps()} />
        <p style={{ display: uploadImgList.length > 0 ? 'none' : 'block' }}>拖拽文件到这里或者点击选择文件</p>
        <div className='w-full h-full flex'>
          {
            uploadImgList.map((item: any, index: number) => {
              return (
                <div className={`w-1/3 ml-1`} key={index}>
                  <NextUIImage
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
      <Button className='uploadBtn w-1/4 h-[100px] mt-10' color="secondary" onClick={uploadFile}>
        上传文件
      </Button>
    </div>
  );
};

export default Upload;
