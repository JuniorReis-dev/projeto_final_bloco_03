import {
  MagnifyingGlass,
  ShoppingCartSimple,
  User,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-teal-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link
          to="/home"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <img
            className="w-5 md:w-8 lg:w-12 object-contain"
            src="https://i.imgur.com/MUYR4yW.png"
            alt="Logo da Farmácia"
          />
        </Link>

        <form className="hidden md:flex items-center w-full max-w-md">
          <label htmlFor="search" className="sr-only">
            Pesquisar
          </label>
          <div className="relative w-full">
            <input
              type="text"
              id="search"
              className="w-full pl-4 pr-10 py-2 rounded-full text-sm text-black bg-white border border-teal-500 focus:ring-2 focus:ring-teal-300 focus:outline-none transition-all duration-300"
              placeholder="Buscar produtos, categorias..."
            />
            <button
              type="submit"
              className="absolute top-1/2 right-2 -translate-y-1/2 text-teal-900 hover:text-teal-300 transition-colors"
            >
              <MagnifyingGlass size={20} weight="bold" />
            </button>
          </div>
        </form>

        {/* Ícones */}
        <div className="flex items-center gap-4">
          <Link to="/perfil" className="hover:text-teal-200 transition-colors">
            <User size={28} weight="duotone" />
          </Link>
          <Link
            to="/carrinho"
            className="hover:text-teal-200 transition-colors"
          >
            <ShoppingCartSimple size={28} weight="duotone" />
          </Link>
        </div>
      </div>

      {/* Menu de navegação */}
      <nav className="hidden md:flex justify-center gap-10 border-t border-teal-600 py-2 text-sm font-medium tracking-wide">
        <Link
          to="/produtos"
          className="hover:text-teal-200 transition-colors duration-200"
        >
          Produtos
        </Link>
        <Link
          to="/categoria"
          className="hover:text-teal-200 transition-colors duration-200"
        >
          Categorias
        </Link>
        <Link
          to="/cadastrarcategoria"
          className="hover:text-teal-200 transition-colors duration-200"
        >
          Cadastrar Categoria
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
