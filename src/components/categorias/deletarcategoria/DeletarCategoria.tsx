import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

import Categoria from "../../../models/Categoria";
import { buscar, deletar } from "../../../service/Service";
import Modal from "../../modal/Modal";
import { ToastAlerta } from "../../../utils/ToastAtert";

function DeletarCategoria() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria);
    } catch (error: any) {
      ToastAlerta("Erro ao buscar a categoria", "erro");
      navigate("/categorias");
    }
  }

  useEffect(() => {
    if (id) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarCategoria() {
    setIsLoading(true);
    try {
      await deletar(`/categorias/${id}`);
      ToastAlerta("Categoria apagada com sucesso", "sucesso");
    } catch (error: any) {
      ToastAlerta("Erro ao deletar a categoria", "erro");
    } finally {
      setIsLoading(false);
      retornar();
    }
  }

  function retornar() {
    setIsOpen(false);
    navigate("/categoria"); // Corrigido de "/categorias" para "/categoria" com base na sua rota real
  }

  return (
    <Modal isOpen={isOpen} onClose={retornar}>
      <h1 className="text-4xl text-center my-4">Deletar Categoria</h1>
      <p className="text-center font-semibold mb-4">
        Tem certeza que deseja apagar a categoria abaixo?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-gray-900 text-white font-bold text-2xl">
          {categoria.nome || "Categoria"}
        </header>
        <p className="p-8 text-2xl bg-slate-200 text-center min-h-[6rem]">
          {categoria.nome || "Sem nome"}
        </p>
        <div className="flex">
          <button
            onClick={retornar}
            className="w-full py-2 bg-[#00d6ff] hover:bg-[#0099cc] text-white"
            disabled={isLoading}
          >
            Não
          </button>
          <button
            onClick={deletarCategoria}
            className="w-full py-2 bg-[#00747a] hover:bg-[#2c4647] text-white flex items-center justify-center"
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

export default DeletarCategoria;
