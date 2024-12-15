import './App.css';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from './router';

// 路由组件
function RouterComponent() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  return (
    <BrowserRouter>
      <RouterComponent />
    </BrowserRouter>
  );
}

export default App;
