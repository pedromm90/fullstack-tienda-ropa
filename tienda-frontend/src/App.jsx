import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import FormularioArticulos from './components/FormularioArticulos'
import ListadoArticulos from './components/ListadoArticulos'

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/articulos-ropa" component={ListadoArticulos} />
        <Route exact path="/articulos-ropa/agregar" component={FormularioArticulos} />
        <Route exact path="/articulos-ropa/editar/:id" component={FormularioArticulos} />
      </Switch>
    </Router>
  )
}

export default App
