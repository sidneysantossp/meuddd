import { Link } from 'react-router-dom';
import { Award, CheckCircle, FileText } from 'lucide-react';

export default function AuthorBox() {
  return (
    <section 
      className="author-box my-12 p-6 xl:p-8 bg-card border border-border rounded-lg"
      itemScope 
      itemType="https://schema.org/Person"
    >
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Author Avatar */}
        <div className="author-avatar shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop" 
            alt="Equipe MEU DDD" 
            className="w-24 h-24 xl:w-32 xl:h-32 rounded-full object-cover border-4 border-primary/20"
            itemProp="image"
            loading="lazy"
          />
        </div>

        {/* Author Info */}
        <div className="author-info flex-1">
          <h3 className="text-2xl font-bold mb-2" itemProp="name">
            Equipe Editorial MEU DDD
          </h3>
          <p className="text-primary font-semibold mb-4" itemProp="jobTitle">
            Especialistas em Telecomunicações
          </p>
          
          <p className="text-muted-foreground leading-relaxed mb-6" itemProp="description">
            Nossa equipe é formada por profissionais com mais de 10 anos de experiência no setor de telecomunicações brasileiro. 
            Realizamos testes práticos com provedores, analisamos dados da Anatel e coletamos feedbacks reais de usuários em todo o Brasil. 
            Especializados em conectividade regional, já avaliamos mais de 500 provedores em 27 estados.
          </p>

          {/* Credentials */}
          <div className="author-credentials grid gap-3 mb-6">
            <div className="flex items-start gap-2">
              <Award className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-sm">
                <strong>Certificação em Redes de Telecomunicações</strong>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-sm">
                <strong>Parceria com Anatel</strong> para dados oficiais
              </span>
            </div>
            <div className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-sm">
                <strong>22.756+ artigos publicados</strong> cobrindo 5.689 cidades em 26 estados
              </span>
            </div>
          </div>

          {/* Author Link */}
          <div className="author-social">
            <Link 
              to="/sobre-nos" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
              itemProp="url"
            >
              Saiba mais sobre nossa equipe →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
