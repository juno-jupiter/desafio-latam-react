import './assets/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import CartProvider from './context/CartContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Pizza from './pages/Pizza';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';

function App() {
	return <CartProvider>
		<Navigation />
		<Routes>
			<Route path='/' element={<Home />}/>
			<Route path='/register' element={<Register />}/>
			<Route path='/login' element={<Login />}/>
			<Route path='/cart' element={<Cart />}/>
			<Route path='/pizza/:id' element={<Pizza />}/>
			<Route path='/profile' element={<Profile />}/>
			<Route path='/logout' element={<Logout />}/>
			<Route path='*' element={<NotFound />}/>
		</Routes>
		<Footer />
	</CartProvider>
};

export default App;