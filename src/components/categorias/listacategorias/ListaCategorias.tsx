import { useEffect, useState } from "react";
import Categoria from "../../../models/Categoria";
import { DNA } from "react-loader-spinner";
import { buscar } from "../../../service/Service";
import CardCategorias from "../cardcategorias/CardCategorias";
import { ToastAlerta } from "../../../utils/ToastAtert";

function ListaCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias);
    } catch (error: any) {
      ToastAlerta("Erro ao buscar categorias", "erro");
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, []);

  return (
    <>
      {categorias.length === 0 && (
        <div className="flex justify-center w-full my-8">
          <DNA
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperClass="dna-wrapper mx-auto"
          />
        </div>
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorias.map((categoria) => (
              <CardCategorias key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaCategorias;
