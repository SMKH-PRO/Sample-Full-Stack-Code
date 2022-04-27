import { PathRouteProps, LayoutRouteProps, IndexRouteProps } from 'react-router-dom';
import { Home, Success } from '../Pages';

export const pathHome = '/';
export const pathSuccess = '/success';

export type PathObj = PathRouteProps | LayoutRouteProps | IndexRouteProps;

const paths: PathObj[] = [
  {
    path: pathHome,
    element: <Home />,
  },
  {
    path: pathSuccess,
    element: <Success />,
  },

];

export default paths;
