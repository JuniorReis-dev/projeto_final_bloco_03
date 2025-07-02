import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

import Produto from "../../../models/Produto";
import { buscar, deletar } from "../../../service/Service";
import Modal from "../../modal/Modal";
import { ToastAlerta } from "../../../utils/ToastAtert";

function DeletarProduto() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [produto, setProduto] = useState<Produto>({} as Produto);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (id) {
      buscar(`/produtos/${id}`, setProduto).catch(() => {
        ToastAlerta("Erro ao buscar o produto", "erro");
        navigate("/produtos");
      });
    }
  }, [id, navigate]);

  async function deletarProduto() {
    setIsLoading(true);
    try {
      await deletar(`/produtos/${id}`);
      ToastAlerta("Produto apagado com sucesso", "sucesso");
      navigate("/produtos");
    } catch (error) {
      ToastAlerta("Erro ao deletar o produto", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    setIsOpen(false);
    navigate("/produtos");
  }

  return (
    <Modal isOpen={isOpen} onClose={retornar}>
      <h1 className="text-4xl text-center my-4">Deletar Produto</h1>
      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar o produto abaixo?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden">
        <header className="py-2 px-6 bg-gray-900 text-white font-bold text-2xl">
          Produto
        </header>
        <div className="p-8 bg-slate-200">
          <h3 className="text-2xl font-bold mb-2">{produto.nome}</h3>
          <p className="text-lg mb-2">{produto.descricao}</p>
          <p className="text-xl font-semibold">
            R$ {Number(produto.preco).toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">
            Categoria: {produto.categoria?.nome || "Sem categoria"}
          </p>
        </div>
        <div className="flex">
          <button
            className="w-full py-2 bg-[#00d6ff] hover:bg-[#0099cc] text-white"
            onClick={retornar}
            disabled={isLoading}
          >
            Não
          </button>
          <button
            className="w-full py-2 bg-[#00747a] hover:bg-[#2c4647] text-white flex items-center justify-center"
            onClick={deletarProduto}
            disabled={isLoading}
          >
            {isLoading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            ) : (
              "Sim"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeletarProduto;
