import { Link } from "react-router-dom";
import Produto from "../../../models/Produto";
import { useCarrinho } from "../../../contexts/CarrinhoContext";
import { toast } from "react-toastify";

interface CardProdutosProps {
  produto: Produto;
}

function CardProdutos({ produto }: CardProdutosProps) {
  const { adicionar } = useCarrinho();

  return (
    <div className="border flex flex-col rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Cabeçalho com nome */}
      <div className="w-full bg-gradient-to-r from-[#00e1ff] to-[#00838a] py-2 px-6">
        <h3 className="text-lg font-bold text-white text-center uppercase truncate">
          {produto.nome}
        </h3>
      </div>

      {/* Detalhes do produto */}
      <div className="p-4 flex-1">
        <p className="text-sm text-gray-600 mb-2">
          <strong>Descrição:</strong> {produto.descricao}
        </p>
        <p className="text-lg font-semibold text-gray-800 mb-2">
          <strong>Preço:</strong> R$ {Number(produto.preco).toFixed(2)}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Categoria:</strong>{" "}
          {produto.categoria?.nome || "Sem categoria"}
        </p>
      </div>

      {/* Botões de ação */}
      <div className="flex border-t">
        <Link
          to={`/editarproduto/${produto.id}`}
          className="w-1/3 text-white bg-indigo-500 hover:bg-indigo-700 flex items-center justify-center py-2 font-medium"
        >
          Editar
        </Link>
        <Link
          to={`/deletarproduto/${produto.id}`}
          className="w-1/3 text-white bg-red-500 hover:bg-red-700 flex items-center justify-center py-2 font-medium"
        >
          Deletar
        </Link>
        <button
          onClick={() => {
            adicionar(produto);
            toast.success(`🛒 "${produto.nome}" adicionado ao carrinho!`);
          }}
          className="w-1/3 text-white bg-emerald-500 hover:bg-emerald-700 py-2 font-medium transition"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}

export default CardProdutos;
