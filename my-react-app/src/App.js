import React, { useState, useEffect } from 'react';
import AgregarProducto from './AgregarProducto'; // Importa el componente para agregar productos

function App() {
  const [productos, setProductos] = useState([]);

  // Obtener la lista de productos al cargar el componente
  useEffect(() => {
    fetch('/productos')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.log(error));
  }, []);

  // Función para agregar un nuevo producto
  const agregarProducto = (nombre, precio) => {
    const nuevoProducto = { nombre, precio };

    fetch('/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoProducto),
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualizar la lista de productos con el nuevo producto agregado
        setProductos([...productos, data]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <span>{producto.nombre}</span>
            <span>{producto.precio}</span>
          </li>
        ))}
      </ul>

      <AgregarProducto agregarProducto={agregarProducto} />
    </div>
  );
}

export default App;
