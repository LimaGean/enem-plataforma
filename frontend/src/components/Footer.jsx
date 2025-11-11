function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">© {new Date().getFullYear()} ENEM Plataforma. Todos os direitos reservados.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="https://ifro.edu.br" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
            IFRO
          </a>
          <a href="#" className="hover:text-indigo-400 transition">
            Sobre
          </a>
          <a href="#" className="hover:text-indigo-400 transition">
            Contato
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
