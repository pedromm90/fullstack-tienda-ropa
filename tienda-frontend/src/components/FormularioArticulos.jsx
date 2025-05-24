import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";


const FormularioArticulos = () => {
  const [item, setItem] = useState({
    nombre: '',
    descripcion: '',
    talla: '',
    color: '',
    precio: 0,
    cantidad: 0,
    categoria: { id: null }
  });
  const [categorias, setCategorias] = useState([]);
  const history = setHistory();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchCategories = async () => {
      const response = await axios.get('http://localhost:8080/api/categoria-ropa', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategorias(response.data);
    };

    const fetchItem = async () => {
      if (id) {
        const response = await axios.get('http://localhost:8080/api/categoria-ropa/${id}', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItem(response.data);
      }
    };

    fetchCategories();
    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (id) {
        await axios.put('http://localhost:8080/api/categoria-ropa/${id}', item, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:8080/api/categoria-ropa', item, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      history.push('/categoria-ropa');
    } catch (error) {
      console.error('Error al guardar el artículo:'. error);
    }
  };

  return (
    <div>
      <h1>{id ? "Editar" : "Agregar"} artículo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={item.nombre}
            onChange={(e) => setItem({ ...item, nombre: e.target.value })}
          />
        </div>
        <div>
          <label>Descripcion:</label>
          <input
            type="text"
            value={item.descripcion}
            onChange={(e) => setItem({ ...item, descripcion: e.target.value })}
          />
        </div>
        <div>
          <label>Talla:</label>
          <input
            type="text"
            value={item.talla}
            onChange={(e) => setItem({ ...item, talla: e.target.value })}
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="text"
            value={item.color}
            onChange={(e) => setItem({ ...item, color: e.target.value })}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={item.precio}
            onChange={(e) => setItem({ ...item, precio: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            value={item.cantidad}
            onChange={(e) => setItem({ ...item, cantidad: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <label>Categoría:</label>
          <select
            value={item.categoria.id || ''}
            onChange={(e) => setItem({ ...item, color: e.target.value })}
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default FormularioArticulos;