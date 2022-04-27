/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import {
  BrowserRouter,
  Routes as Navs,
  Route,
} from 'react-router-dom';
import paths, { PathObj } from './Paths';

const Routes = () => (
  <BrowserRouter>
    <Navs>
      {
        paths.map((attr: PathObj, i) => <Route key={`${i}_route`} {...attr} />)
      }
    </Navs>
  </BrowserRouter>
);

export default Routes;
