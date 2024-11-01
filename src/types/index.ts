type commonType = string | number | boolean | null | undefined | object | any[] | Function;



type commonRoute = {
  path: string;
  name: string;
  element: any;
  meta?: any;
  children?: commonRoute[];
};

export type {
  commonType,
  commonRoute
}