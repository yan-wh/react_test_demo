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

export type {
  messageType,
  commonType,
  commonRoute
}