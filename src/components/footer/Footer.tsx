import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

function Footer() {
  const data = new Date().getFullYear();

  return (
    <footer className="w-full bg-teal-700 text-white">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-center gap-4">
        {/* Informações da marca */}
        <div>
          <p className="text-lg font-bold">Farmácia</p>
          <p className="text-sm text-teal-100">
            © {data} - Todos os direitos reservados
          </p>
        </div>

        {/* Redes sociais */}
        <div>
          <p className="mb-2 text-sm">Nos siga nas redes sociais</p>
          <div className="flex gap-4 justify-center">
            <a
              href="https://www.linkedin.com/in/cleitonreisbr/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedinLogo
                size={32}
                weight="fill"
                className="hover:text-teal-200 transition-colors"
              />
            </a>
            <a
              href="https://github.com/JuniorReis-dev"
              target="_blank"
              rel="noreferrer"
            >
              <GithubLogo
                size={32}
                weight="fill"
                className="hover:text-teal-200 transition-colors"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
