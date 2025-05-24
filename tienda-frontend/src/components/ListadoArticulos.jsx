import axios from "axios";
import { useEffect, useState } from "react"


const ListadoArticulos = () => {
  const [articulos, setArticulos] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8080/api/articulos-ropa', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setArticulos(response.data);
      } catch (error) {
        console.error('Error al obtener los artículos:', error);
        history.push('/');
      }
    };
    fetchItems();
  }, [history]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:8080/api/articulos-ropa/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setArticulos(articulos.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1>Artículos de ropa</h1>
      <button onClick={() => history.push('/articulos-ropa/agregar')}>Agregar artículo</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Talla</th>
            <th>Color</th>
            <th>Precio (COP)</th>
            <th>Cantidad disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          { articulos.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.categoria ? item.categoria.nombre : 'Sin categoría'}</td>
              <td>{item.talla}</td>
              <td>{item.color}</td>
              <td>{item.precio}</td>
              <td>{item.cantidad}</td>
              <td>
                <button onClick={() => history.push('/articulos-ropa/editar/${item.id}')}>
                  Editar
                </button>
                <button onClick={() => handleDelete(item.id)}>Eliminar</button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}

export default ListadoArticulos;