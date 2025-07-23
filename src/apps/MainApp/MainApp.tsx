import './MainApp.scss';
import {ThemeProvider} from 'react-bootstrap';
import { Provider } from 'react-redux'
import { App } from 'src/apps/App'
import { store } from 'src/store'


export const MainApp = () => {

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Provider store={store}>
        <App/>
      </Provider>
    </ThemeProvider>
  );
};
