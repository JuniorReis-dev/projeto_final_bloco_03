import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import FormCategoria from "./components/categorias/formcategoria/FormCategoria";
import DeletarCategoria from "./components/categorias/deletarcategoria/DeletarCategoria";
import ListaCategorias from "./components/categorias/listacategorias/ListaCategorias";
import ListaProdutos from "./components/produtos/listaprodutos/ListaProdutos";
import FormProduto from "./components/produtos/formproduto/FormProduto";
import DeletarProduto from "./components/produtos/deletarproduto/DeletarProsduto";
import Carrinho from "./components/carrinho/Carrinho";
import Perfil from "./components/perfil/Perfil";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="min-h-[80vh] font-display">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/categoria" element={<ListaCategorias />} />
            <Route path="/cadastrarcategoria" element={<FormCategoria />} />
            <Route path="/editarcategoria/:id" element={<FormCategoria />} />
            <Route
              path="/deletarcategoria/:id"
              element={<DeletarCategoria />}
            />
            <Route path="/produtos" element={<ListaProdutos />} />
            <Route path="/cadastrarproduto" element={<FormProduto />} />
            <Route path="/editarproduto/:id" element={<FormProduto />} />
            <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
            <Route path="/carrinho" element={<Carrinho />} />{" "}
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
