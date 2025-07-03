//Crea aqui tu componente Contador
import { useState } from 'react';

function Contador({ titulo, inicio }) {
  const [contador, setContador] = useState(inicio);

  const incrementar = () => {
    setContador(contador + 1);
  };

  const decrementar = () => {
    setContador(contador - 1);
  };

  const resetear = () => {
    setContador(inicio);
  };


  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>{titulo}</h2>
      <p>Valor actual: {contador}</p>
      <button onClick={decrementar}>-</button>
      <button onClick={incrementar}>+</button>
      <button onClick={resetear}>reset</button>

    </div>
  );
}
function Contador2({ titulo, inicio }) {
  const [contador, setContador] = useState(inicio);

  const incrementar = () => {
    setContador(contador + 2);
  };

  const decrementar = () => {
    setContador(contador - 2);
  };

  const resetear = () => {
    setContador(inicio);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>{titulo}</h2>
      <p>Valor actual: {contador}</p>
      <button onClick={decrementar}>-</button>
      <button onClick={incrementar}>+</button>
      <button onClick={resetear}>reset</button>
    </div>
  );
}
function Contador10({ titulo, inicio }) {
  const [contador, setContador] = useState(inicio);

  const incrementar = () => {
    setContador(contador + 10);
  };

  const decrementar = () => {
    setContador(contador - 10);
  };

  const resetear = () => {
    setContador(inicio);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>{titulo}</h2>
      <p>Valor actual: {contador}</p>
      <button onClick={decrementar}>-</button>
      <button onClick={incrementar}>+</button>
      <button onClick={resetear}>reset</button>

    </div>
  );
}

export { Contador, Contador2, Contador10 };
