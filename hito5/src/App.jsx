import './assets/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Pizza from './pages/Pizza';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
	return <>
		<Navigation />
		<Routes>
			<Route path='/' element={<Home />}/>
			<Route path='/register' element={<Register />}/>
			<Route path='/login' element={<Login />}/>
			<Route path='/cart' element={<Cart />}/>
			<Route path='/pizza/:id' element={<Pizza />}/>
			<Route path='/profile' element={<Profile />}/>
			<Route path='*' element={<NotFound />}/>
		</Routes>
		<Footer />
	</>
};

export default App;