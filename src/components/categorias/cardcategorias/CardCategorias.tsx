import { Link } from 'react-router-dom'
import Categoria from '../../../models/Categoria'
import { PencilLine, TrashSimple } from '@phosphor-icons/react'


interface  CardCategoriaProps{
    categoria: Categoria
}

function CardCategorias ({ categoria }: CardCategoriaProps){
    return (
        <div className='border-0 flex flex-col rounded-2xl overflow-hidden justify-between drop-shadow-[0_15px_15px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-110'>
            <header className='py-2 px-6 bg-gray-900 text-white text-1xl uppercase'>
                Categoria
            </header>
            <p className='p-8 text-3xl bg-slate-200 h-full'>{categoria.nome}</p>
            
            <div className="flex">
                <Link to={`/editarcategoria/${categoria.id}`}
                    className='w-full text-slate-100 bg-[#00d6ff] dark:hover:bg-[#0099cc] 
                    flex items-center justify-center py-2'>
                    <button><PencilLine size={24} /></button>
                </Link>

                <Link to={`/deletarcategoria/${categoria.id}`} 
                    className='text-slate-100 bg-[#00747a] dark:hover:bg-[#2c4647]  w-full flex items-center justify-center'>
                    <button><TrashSimple size={24} /></button>
                </Link>
            </div>

        </div>
    )
}

export default CardCategorias