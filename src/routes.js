import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from '~/pages/Main';
import Dashboard from '~/pages/Dashboard';


const Routes = 
    createAppContainer(
        createSwitchNavigator({ 
            Main,
            Dashboard 
}));


export default Routes;
