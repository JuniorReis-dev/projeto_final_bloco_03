function Perfil() {
  const usuario = {
    nome: "Cleiton Reis",
    email: "cleiton@email.com",
    foto: "https://avatars.githubusercontent.com/u/81193523?v=4",
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center gap-4">
        <img
          src={usuario.foto}
          alt="Foto de perfil"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800">{usuario.nome}</h2>
          <p className="text-gray-600">{usuario.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
