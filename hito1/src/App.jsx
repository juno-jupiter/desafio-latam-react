import './assets/css/styles.css';
import Producto from './components/Producto';


function App() {
  return (
    <>
      <Producto nombre="xiaomi" precio="199" descripcion="Celular Xiaomi" stock="99"/>
      <Producto nombre="samsung" precio="299" descripcion="Celular Samsung" stock="99"/>
      <Producto nombre="iphone" precio="999" descripcion="Celular Iphone" stock="99"/>
    </>
  )
};

export default App;
