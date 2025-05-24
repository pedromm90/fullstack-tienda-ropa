import axios from "axios";
import { useState } from "react"


const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', {
          usuario,
          password
        });
        localStorage.setItem('token', response.data.token);
        history.push('/articulos-ropa');
    } catch (error) {
      console.error('Error en el login: ', error);
      alert('Credenciales inválidas');
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario:</label>
          <input  type="text"  value={usuario}  onChange={(e) => setUsuario(e.target.value)}/>
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"  value={password}  onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;