import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import ListPersonComponent from './components/ListPersonComponent'
function Routes() {
    return (
        <BrowserRouter>
<Route path = "/" component = {ListPersonComponent}></Route>
        </BrowserRouter>
    )

}
export default Routes;