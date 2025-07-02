import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { ChangeEvent, useEffect, useState } from "react";
import { atualizar, buscar, cadastrar } from "../../../service/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAtert";

function FormCategoria() {

    const navigate = useNavigate();

    const [categorias, setCategorias] = useState<Categoria>({} as Categoria)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategorias)
        } catch (error: any) {
            ToastAlerta('Erro ao buscar a categoria.', "erro")
        }
    }


    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategorias({
            ...categorias,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        
        navigate("/categorias")
    }

    async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/categorias`, categorias, setCategorias)
                ToastAlerta('A categoria foi atualizado com sucesso!', "sucesso")
            } catch (error: any) {
                ToastAlerta('Erro ao atualizar a categoria.', "erro")
            }
        } else {
            try {
                await cadastrar(`/categorias`, categorias, setCategorias)
                ToastAlerta('O Tema foi cadastrado com sucesso!', "sucesso")
            } catch (error: any) {
                ToastAlerta('Erro ao cadastrar categoria', "erro")
            }
        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastrar Categoria' : 'Editar Categoria'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovaCategoria}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="tipo">Tipo da categoria</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name='nome'
                        className="border-2 border-slate-700 rounded p-2"
                        value={categorias.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded font-bold text-slate-100 bg-[#00d6ff] dark:hover:bg-[#0099cc] w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>

                    }
                </button>
                
            </form>
        </div>
        
    );
}

export default FormCategoria;