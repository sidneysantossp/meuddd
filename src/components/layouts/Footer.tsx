import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Twitter, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Lista completa dos 27 estados brasileiros
  const estadosColuna1 = [
    { nome: 'Acre', sigla: 'AC', slug: 'acre' },
    { nome: 'Alagoas', sigla: 'AL', slug: 'alagoas' },
    { nome: 'Amapá', sigla: 'AP', slug: 'amapa' },
    { nome: 'Amazonas', sigla: 'AM', slug: 'amazonas' },
    { nome: 'Bahia', sigla: 'BA', slug: 'bahia' },
    { nome: 'Ceará', sigla: 'CE', slug: 'ceara' },
    { nome: 'Distrito Federal', sigla: 'DF', slug: 'distrito-federal' },
    { nome: 'Espírito Santo', sigla: 'ES', slug: 'espirito-santo' },
    { nome: 'Goiás', sigla: 'GO', slug: 'goias' },
    { nome: 'Maranhão', sigla: 'MA', slug: 'maranhao' },
    { nome: 'Mato Grosso', sigla: 'MT', slug: 'mato-grosso' },
    { nome: 'Mato Grosso do Sul', sigla: 'MS', slug: 'mato-grosso-do-sul' },
    { nome: 'Minas Gerais', sigla: 'MG', slug: 'minas-gerais' },
    { nome: 'Pará', sigla: 'PA', slug: 'para' },
  ];

  const estadosColuna2 = [
    { nome: 'Paraíba', sigla: 'PB', slug: 'paraiba' },
    { nome: 'Paraná', sigla: 'PR', slug: 'parana' },
    { nome: 'Pernambuco', sigla: 'PE', slug: 'pernambuco' },
    { nome: 'Piauí', sigla: 'PI', slug: 'piaui' },
    { nome: 'Rio de Janeiro', sigla: 'RJ', slug: 'rio-de-janeiro' },
    { nome: 'Rio Grande do Norte', sigla: 'RN', slug: 'rio-grande-do-norte' },
    { nome: 'Rio Grande do Sul', sigla: 'RS', slug: 'rio-grande-do-sul' },
    { nome: 'Rondônia', sigla: 'RO', slug: 'rondonia' },
    { nome: 'Roraima', sigla: 'RR', slug: 'roraima' },
    { nome: 'Santa Catarina', sigla: 'SC', slug: 'santa-catarina' },
    { nome: 'São Paulo', sigla: 'SP', slug: 'sao-paulo' },
    { nome: 'Sergipe', sigla: 'SE', slug: 'sergipe' },
    { nome: 'Tocantins', sigla: 'TO', slug: 'tocantins' },
  ];

  const linksInstitucionais = [
    { nome: 'Políticas de Privacidade', href: '/politicas-de-privacidade' },
    { nome: 'Termos de Uso', href: '/termos-de-uso' },
    { nome: 'Sobre', href: '/sobre' },
    { nome: 'Mapa do Site', href: '/mapa-do-site' },
    { nome: 'Políticas de Cookies', href: '/politicas-de-cookies' },
    { nome: 'Imprensa', href: '/imprensa' },
    { nome: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
    { nome: 'Contato', href: '/contato' },
    { nome: 'Blog', href: '/blog' },
  ];

  const redesSociais = [
    { nome: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { nome: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { nome: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { nome: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { nome: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12 xl:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-12">
          {/* Coluna 1: Sobre Nós e Redes Sociais */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-white">MEU DDD</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Plataforma completa para consulta de códigos DDD de todos os estados e cidades do Brasil. 
              Informações atualizadas sobre os 27 estados brasileiros, com mais de 65 códigos DDD e 730+ cidades cadastradas.
            </p>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Siga-nos nas redes sociais</h4>
              <div className="flex gap-3">
                {redesSociais.map((rede) => {
                  const Icon = rede.icon;
                  return (
                    <a
                      key={rede.nome}
                      href={rede.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors duration-200"
                      aria-label={rede.nome}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Coluna 2: Links Institucionais */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Institucional</h3>
            <ul className="space-y-3">
              {linksInstitucionais.map((link) => (
                <li key={link.nome}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors duration-200 inline-block"
                  >
                    {link.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Estados (Primeira Metade) */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Estados do Brasil</h3>
            <ul className="space-y-3">
              {estadosColuna1.map((estado) => (
                <li key={estado.sigla}>
                  <Link
                    to={`/estado/${estado.slug}`}
                    className="text-sm text-gray-400 hover:text-primary transition-colors duration-200 inline-block"
                  >
                    {estado.nome} ({estado.sigla})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Estados (Segunda Metade) */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 max-xl:hidden">‎</h3>
            <h3 className="text-lg font-bold text-white mb-6 xl:hidden">Mais Estados</h3>
            <ul className="space-y-3">
              {estadosColuna2.map((estado) => (
                <li key={estado.sigla}>
                  <Link
                    to={`/estado/${estado.slug}`}
                    className="text-sm text-gray-400 hover:text-primary transition-colors duration-200 inline-block"
                  >
                    {estado.nome} ({estado.sigla})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Linha de Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} MEU DDD. Todos os direitos reservados.
            </p>
            <p className="text-sm text-gray-500 text-center md:text-right">
              Plataforma de Consulta de Códigos DDD do Brasil
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
