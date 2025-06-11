import './assets/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar';
import Home from './components/Home';
import Footer from './components/Footer';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';

function App() {
	return <>
		<MyNavbar />
		<Home />
		{/* <RegisterPage /> */}
		{/* <LoginPage /> */}
		<Footer />
	</>
};

export default App;
