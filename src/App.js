import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {Provider} from 'mobx-react';

import Home from './Home';
/*import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';*/

import './App.scss';
import Stores from './Stores';
import Board from "./Board";
import User from "./User";
/*import PostAdd from "./Board/PostAdd";
import PostView from "./Board/PostView";*/


function App() {
    return (
        <Provider stores={Stores}>
            <BrowserRouter>
                <header className="app-header">
                    <ul className='menu-bar'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/board'>게시판</Link></li>
                        <li><Link to='/user'>내 정보</Link></li>
                        {/*<li><Link to='/page1'>Page1</Link></li>*/}
                        {/*<li><Link to='/page2'>Page2</Link></li>*/}
                        {/*<li><Link to='/page3'>Page3</Link></li>*/}
                    </ul>
                </header>

                <section className='app-body'>
                    <Route path='/' exact component={Home}/>
                    <Route path='/board/:command?/:postid?' exact component={Board}/>
                    <Route path='/user/:command?/:postid?' exact component={User}/>
                    {/*<Route path='/page1' component={Page1}/>*/}
                    {/*<Route path='/page2' component={Page2}/>*/}
                    {/*<Route path='/page3' component={Page3}/>*/}
                </section>
            </BrowserRouter>
        </Provider>
    )
}


/*class App extends React.Component {
  state = {
    location: 0
  };
  render() {
    let {location} = this.state;
    return (
      <div>
        { location === 0 &&<Home/>}
        { location === 1 &&<Page1/>}
        { location === 2 &&<Page2/>}
        { location === 3 &&<Page3/>}
      </div>
    )
  }
}*/
export default App;
