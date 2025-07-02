import { createContext, useContext, useState, ReactNode } from "react";
import Produto from "../models/Produto";

interface ItemCarrinho extends Produto {
  quantidade: number;
}

interface CarrinhoContextProps {
  carrinho: ItemCarrinho[];
  adicionar: (produto: Produto) => void;
  remover: (id: number) => void;
  limpar: () => void;
}

const CarrinhoContext = createContext({} as CarrinhoContextProps);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

  function adicionar(produto: Produto) {
    const existente = carrinho.find((item) => item.id === produto.id);
    if (existente) {
      setCarrinho((prev) =>
        prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCarrinho((prev) => [...prev, { ...produto, quantidade: 1 }]);
    }
  }

  function remover(id: number) {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  }

  function limpar() {
    setCarrinho([]);
  }

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionar, remover, limpar }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}
