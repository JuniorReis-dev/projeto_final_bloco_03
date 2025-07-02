import { useNavigate, useParams } from "react-router-dom";
import Produto from "../../../models/Produto";
import Categoria from "../../../models/Categoria";
import { ChangeEvent, useEffect, useState } from "react";
import { atualizar, buscar, cadastrar } from "../../../service/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAtert";

function FormProduto() {
  const navigate = useNavigate();

  const [produto, setProduto] = useState<Produto>({} as Produto);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, setProduto);
    } catch (error: any) {
      ToastAlerta("Erro ao buscar o produto.", "erro");
    }
  }

  async function buscarCategorias() {
    try {
      await buscar("/categorias", (resposta: any) => {
        if (Array.isArray(resposta)) {
          setCategorias(resposta);
        } else if (resposta && Array.isArray(resposta.content)) {
          setCategorias(resposta.content);
        } else {
          setCategorias([]);
        }
      });
    } catch (error: any) {
      ToastAlerta("Erro ao buscar categorias", "erro");
    }
  }

  useEffect(() => {
    buscarCategorias();
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
    });
  }

  function atualizarCategoria(e: ChangeEvent<HTMLSelectElement>) {
    const categoriaId = parseInt(e.target.value);
    const categoriaSelecionada = categorias.find(
      (cat) => cat.id === categoriaId
    );
    setProduto({
      ...produto,
      categoria: categoriaSelecionada || null,
    });
  }

  function retornar() {
    navigate("/");
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/produtos`, produto, setProduto);
        ToastAlerta("O produto foi atualizado com sucesso!", "sucesso");
      } catch (error: any) {
        ToastAlerta("Erro ao atualizar o produto.", "erro");
      }
    } else {
      try {
        await cadastrar(`/produtos`, produto, setProduto);
        ToastAlerta("O produto foi cadastrado com sucesso!", "sucesso");
      } catch (error: any) {
        ToastAlerta("Erro ao cadastrar produto", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? "Cadastrar Produto" : "Editar Produto"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoProduto}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome do produto</label>
          <input
            type="text"
            placeholder="Digite o nome do produto"
            name="nome"
            className="border-2 border-slate-700 rounded p-2"
            value={produto.nome || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição do produto</label>
          <textarea
            placeholder="Digite a descrição do produto"
            name="descricao"
            className="border-2 border-slate-700 rounded p-2"
            rows={4}
            value={produto.descricao || ""}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              atualizarEstado(e)
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="preco">Preço do produto</label>
          <input
            type="number"
            step="0.01"
            placeholder="Digite o preço do produto"
            name="preco"
            className="border-2 border-slate-700 rounded p-2"
            value={produto.preco || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="foto">URL da foto do produto</label>
          <input
            type="text"
            placeholder="Digite a URL da foto do produto"
            name="foto"
            className="border-2 border-slate-700 rounded p-2"
            value={produto.foto || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="categoria">Categoria do produto</label>
          <select
            name="categoria"
            className="border-2 border-slate-700 rounded p-2"
            value={produto.categoria?.id || ""}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              atualizarCategoria(e)
            }
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <button
          className="rounded font-bold text-slate-100 bg-[#00d6ff] dark:hover:bg-[#0099cc] w-1/2 py-2 mx-auto flex justify-center"
          type="submit"
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
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormProduto;
