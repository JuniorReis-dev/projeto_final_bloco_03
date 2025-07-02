import { useCarrinho } from "../../contexts/CarrinhoContext";

function Carrinho() {
  const { carrinho, remover, limpar } = useCarrinho();

  const total = carrinho.reduce(
    (soma, item) => soma + Number(item.preco) * item.quantidade,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md my-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🛒 Meu Carrinho</h2>

      {carrinho.length === 0 ? (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="divide-y">
            {carrinho.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-3"
              >
                <div>
                  <p className="font-medium">{item.nome}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantidade}x R$ {Number(item.preco).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-gray-800">
                    R$ {(item.quantidade * Number(item.preco)).toFixed(2)}
                  </p>
                  <button
                    onClick={() => remover(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-6">
            <p className="text-lg font-bold text-gray-800">
              Total: R$ {total.toFixed(2)}
            </p>
            <button
              onClick={limpar}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Limpar carrinho
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrinho;
