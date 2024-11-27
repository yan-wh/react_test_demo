import React, { useState, useEffect, useRef } from 'react';
import { 
  Button as ButtonNextUI,
  Image as ImageNextUI, 
  Popover as PopoverNextUI, 
  PopoverContent as PopoverContentNextUI, 
  PopoverTrigger as PopoverTriggerNextUI 
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setState, setLoadingStatus } from '../../store/index'
import './index.css'

type ImageItem = {
  src: string;
  file: string;
  height?: string;
  gridRow?: string;
};

const Gallery: React.FC<{ imagePaths: ImageItem[] }> = ({ imagePaths }) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [delImgLoading, setDelImgLoading] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const imageWidth = 330;
  const gap = 10;

  const handleImageLoad = (index: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    const h = Math.ceil(imageWidth * img.naturalHeight / img.naturalWidth);
    const height = `${Math.ceil(h / gap) * gap}px`;
    const gridRow = `span ${Math.ceil(h / gap) + 1}`;

    // 更新特定图片的状态
    setImages(prevImages => {
      const newImages = [...prevImages];
      newImages[index] = { ...newImages[index], height, gridRow };
      return newImages;
    });
  };

  useEffect(() => {
    // 初始化图片数组
    // console.log('imagePaths', imagePaths)
    const newImages = imagePaths.map((path, index) => ({
      src: path.src,
      file: path.file,
      height: '', // 初始化高度
      gridRow: '' // 初始化 gridRow
    }));
    setImages(newImages);
  }, [imagePaths]);

  const handDelImg = async (image: ImageItem) => {
    setDelImgLoading(true);
    const res = await axios.delete(`/api/deleteImage/${image.file}`);
    // console.log('res', res)
    if (res.data.status === true) {
      setDelImgLoading(false);
      dispatch(setState({
        msgStatus: true,
        msgTitle: '提示',
        msgInfo: '删除成功',
        msgTimeout: 2500
      }));
      dispatch(setState({
        delStatus: true // 删除成功
      }))
      // console.log('删除res', res);
      navigate(0); // 刷新当前页面
    }
  }

  const content = (image: ImageItem) => {
    return (
      <PopoverContentNextUI className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              删除
            </p>
            <div className="mt-2 flex flex-col gap-2 w-full">
              <ButtonNextUI size="sm" color="primary" isLoading={delImgLoading} onClick={() => handDelImg(image)}>
                确认
              </ButtonNextUI>
            </div>
          </div>
        )}
      </PopoverContentNextUI>
    )
  }

  const createImage = () => {
    return (
      <>
        {images.map((image, index) => (
          <div className='item' key={index} style={{ height: image.height, gridRow: image.gridRow }}>
            <PopoverNextUI
              key="danger"
              showArrow
              offset={10}
              placement="bottom"
              backdrop="opaque"
            >
              <PopoverTriggerNextUI>
                <ImageNextUI
                  isBlurred
                  width={330}
                  src={image.src}
                  alt="NextUI Album Cover"
                  loading="lazy"
                  onLoad={(e) => handleImageLoad(index, e)}
                />
              </PopoverTriggerNextUI>
              {content(image)}
            </PopoverNextUI>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className='w-full h-full water-fall-container overflow-auto box-border' ref={galleryRef}>
      {createImage()}
    </div>
  );
};

export default Gallery;
