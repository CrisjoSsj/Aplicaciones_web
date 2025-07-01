import { Contador, Contador2, Contador10 } from './components/Contador';
import './App.css';
function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <img src="public\transparente.png" alt="" />
      <h1>Contadores Personalizados</h1>
      <Contador titulo="Contador de 1" inicio={0}  />
      <Contador2 titulo="Contador de 2" inicio={0} />
      <Contador10 titulo="Contador de 10" inicio={0}/>
    </div>
  );
}

export default App;
