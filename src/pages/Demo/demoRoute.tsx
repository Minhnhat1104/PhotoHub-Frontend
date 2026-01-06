import { Navigate, RouteObject } from 'react-router-dom';
import KonvaEditor from '~/components/KonvaEditor';
import logo from '~/assets/img/Logo.png';

export const demoRoute: RouteObject[] = [
  {
    path: 'knova-editor',
    element: <KonvaEditor imageUrl={'https://konvajs.org/assets/darth-vader.jpg'} />,
  },
  {
    index: true,
    element: <Navigate to={'knova-editor'} />,
  },
];
