import './App.css';
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Today from './components/Today';
import Home from './views/Home';
import Signup from './views/Signup';
import Logout from './views/Logout';
import BodyCare from './views/BodyCare';
import Details from './views/Details';
import FaceCare from './views/FaceCare';
import CartPage from './views/CartPage';
import MyList from './views/MyList';
import ShowAll from './views/ShowAll';
import About from './views/About';
import Footer from './components/Footer';
import BestSellers from './views/BestSellers';
import Type from './views/Type';
import api from './configs/api';


function App() {
  const [cart, setCart] = useState([]);
  const [list, setList] = useState([]);
  //console.log('cart', cart)

    useEffect(() => {
        getCart();    
    }, []);

    const getCart = async() => {
       try {
           const result = await api.get('/cart');
           setCart(result.data.products);
       } catch(error) {
            console.error(error);
       }
    };

    useEffect(() => {
      getMyList();
    }, []);

   const getMyList = async() => {
     try {
      const result = await api.get('/my-list');
      setList(result.data.products);
     }catch(error){
       console.error(error);
     }
   };

    const addToMyList = async(el) => {
      await api.post(`/my-list/${el}`);
      getMyList();
    };


  return (
    <div className="App">
      <Today />
      <Header cartData={cart} getCart={getCart}/>
      <Switch>
        <Route exact path='/' render={(props)=> <Home {...props} />} />
        <Route exact path='/signup' component= {Signup} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/bodycare' component={BodyCare} />
        <Route exact path='/product-detail/:id' render={(props)=> <Details {...props} getCart={getCart} add={addToMyList} getList={getMyList} list={list}/>} />
        <Route exact path='/face-care' component={FaceCare} />
        <Route exact path='/cart' render={(props)=> <CartPage {...props} cartData={cart} getCart={getCart} /> }/>
        <Route exact path='/my-list' render={(props)=> <MyList {...props} list={list} getList={getMyList} getCart={getCart} /> }/>
        <Route exact path='/store/all' component={ShowAll} />
        <Route exact path='/store/best-sellers' component={BestSellers} />
        <Route exact path='/store/:type' component={Type} /> 
        <Route exact path='/about' component={About} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
