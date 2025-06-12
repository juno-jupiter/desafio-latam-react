import './assets/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar';
import Footer from './components/Footer';
import Home from './components/Home';
// import RegisterPage from './components/RegisterPage';
// import LoginPage from './components/LoginPage';
// import Cart from './components/Cart';

function App() {
	return <>
		<MyNavbar />
		<Home />
		{/* <RegisterPage /> */}
		{/* <LoginPage /> */}
		{/* <Cart /> */}
		<Footer />
	</>
};

export default App;
