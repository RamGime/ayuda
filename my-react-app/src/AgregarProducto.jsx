import React, { useState } from 'react';

function AgregarProducto() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const nuevoProducto = { nombre, precio };

    fetch('/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoProducto),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        // Actualizar la lista de productos nuevamente
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default AgregarProducto;
