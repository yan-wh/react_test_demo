type commonType = string | number | boolean | null | undefined | object | any[] | Function;

type messageType = {
  title?: string;
  content: string;
  timeOut?: number;
}


type commonRoute = {
  path: string;
  name: string;
  element: any;
  meta?: any;
  children?: commonRoute[];
};

// 任意属性
type anyProps = {
  [key: string]: any
}

// 定义图片类型
interface Photo {
  src: string;
  file: string;
  height?: string;
  gridRow?: string;
}

export type {
  messageType,
  commonType,
  commonRoute,
  anyProps,
  Photo
}