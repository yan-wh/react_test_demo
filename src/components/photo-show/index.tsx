import React, { useState, useEffect, useRef } from 'react';
import { Image as ImageNextUI } from '@nextui-org/react';
import './index.css'

type ImageItem = {
  src: string;
  height?: string;
  gridRow?: string;
};

const Gallery: React.FC<{ imagePaths: ImageItem[] }> = ({ imagePaths }) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

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
    const newImages = imagePaths.map((path, index) => ({
      src: path.src,
      height: '', // 初始化高度
      gridRow: '' // 初始化 gridRow
    }));
    setImages(newImages);
  }, [imagePaths]);

  const createImage = () => {
    return (
      <>
        {images.map((image, index) => (
          <div className='item' key={index} style={{ height: image.height, gridRow: image.gridRow }}>
            <ImageNextUI
              isBlurred
              width={330}
              src={image.src}
              alt="NextUI Album Cover"
              loading="lazy"
              onLoad={(e) => handleImageLoad(index, e)}
            />
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
