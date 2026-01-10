import { FileText, AlertCircle, Scale, Ban, CheckCircle, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/components/layouts/MainLayout';
import SEOHead from '@/components/common/SEOHead';

export default function TermsOfUsePage() {
  return (
    <MainLayout>
      <SEOHead
        title="Termos de Uso | MEU DDD"
        description="Leia os termos e condições de uso da plataforma MEU DDD. Conheça seus direitos e responsabilidades ao utilizar nossos serviços."
        canonical="/termos-de-uso"
      />
      
      <div className="py-8 xl:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-8 xl:mb-12">
            <div className="flex justify-center mb-4">
              <FileText className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl xl:text-4xl font-bold text-foreground mb-4 max-sm:text-2xl">
              Termos de Uso
            </h1>
            <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Introduction */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Introdução
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                Bem-vindo ao MEU DDD! Estes Termos de Uso ("Termos") regem o acesso e uso da 
                plataforma MEU DDD, disponível em www.meuddd.com.br, e de todos os serviços 
                relacionados oferecidos por nós.
              </p>
              <p>
                Ao acessar ou utilizar nossa plataforma, você concorda em cumprir e estar vinculado 
                a estes Termos. Se você não concordar com qualquer parte destes Termos, não deverá 
                utilizar nossos serviços.
              </p>
              <p>
                Recomendamos que você leia atentamente este documento antes de utilizar a plataforma.
              </p>
            </CardContent>
          </Card>

          {/* Aceitação dos Termos */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-primary" />
                Aceitação dos Termos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                Ao acessar e utilizar o MEU DDD, você declara que:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Tem pelo menos 18 anos de idade ou possui autorização de um responsável legal</li>
                <li>Possui capacidade legal para aceitar estes Termos</li>
                <li>Concorda em cumprir todas as leis e regulamentos aplicáveis</li>
                <li>Fornecerá informações verdadeiras, precisas e completas quando solicitado</li>
                <li>Manterá a segurança de suas credenciais de acesso (se aplicável)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Descrição dos Serviços */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                Descrição dos Serviços
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                O MEU DDD é uma plataforma web que oferece serviços de consulta de códigos DDD 
                (Discagem Direta à Distância) de todos os estados e cidades do Brasil. Nossos 
                serviços incluem:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Consulta de códigos DDD por estado, cidade ou região</li>
                <li>Busca inteligente por texto</li>
                <li>Filtros por região geográfica</li>
                <li>Validação de códigos DDD</li>
                <li>Busca por comando de voz</li>
                <li>Gerador de números de telefone para testes</li>
                <li>Informações detalhadas sobre estados e cidades</li>
                <li>Blog com conteúdo educativo sobre telefonia</li>
              </ul>
              <p className="mt-4">
                Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer parte 
                dos serviços a qualquer momento, com ou sem aviso prévio.
              </p>
            </CardContent>
          </Card>

          {/* Uso Aceitável */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-primary" />
                Uso Aceitável da Plataforma
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                Ao utilizar o MEU DDD, você concorda em:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Utilizar a plataforma apenas para fins legais e legítimos</li>
                <li>Não violar direitos de propriedade intelectual de terceiros</li>
                <li>Não transmitir vírus, malware ou qualquer código malicioso</li>
                <li>Não tentar obter acesso não autorizado a sistemas ou redes</li>
                <li>Não utilizar a plataforma para spam ou comunicações não solicitadas</li>
                <li>Não coletar dados de outros usuários sem consentimento</li>
                <li>Não interferir no funcionamento normal da plataforma</li>
                <li>Respeitar a privacidade e os direitos de outros usuários</li>
              </ul>
            </CardContent>
          </Card>

          {/* Uso Proibido */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg flex items-center gap-2">
                <Ban className="w-6 h-6 text-destructive" />
                Condutas Proibidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                É expressamente proibido:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Fazer engenharia reversa, descompilar ou desmontar qualquer parte da plataforma</li>
                <li>Utilizar bots, scrapers ou ferramentas automatizadas sem autorização</li>
                <li>Copiar, reproduzir ou distribuir conteúdo da plataforma sem permissão</li>
                <li>Criar contas falsas ou se passar por outra pessoa ou entidade</li>
                <li>Publicar conteúdo ilegal, ofensivo, difamatório ou discriminatório</li>
                <li>Realizar ataques de negação de serviço (DDoS) ou similares</li>
                <li>Explorar vulnerabilidades de segurança da plataforma</li>
                <li>Utilizar a plataforma para atividades fraudulentas ou ilegais</li>
                <li>Revender ou comercializar acesso aos serviços sem autorização</li>
              </ul>
              <p className="mt-4 font-semibold text-foreground">
                A violação destas condutas pode resultar na suspensão ou encerramento imediato 
                do seu acesso à plataforma, além de possíveis ações legais.
              </p>
            </CardContent>
          </Card>

          {/* Propriedade Intelectual */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg flex items-center gap-2">
                <Scale className="w-6 h-6 text-primary" />
                Propriedade Intelectual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                Todo o conteúdo disponível na plataforma MEU DDD, incluindo mas não limitado a 
                textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais, 
                compilações de dados e software, é de propriedade do MEU DDD ou de seus fornecedores 
                de conteúdo e está protegido por leis de direitos autorais brasileiras e internacionais.
              </p>
              <p>
                A marca "MEU DDD", logotipos e outros elementos visuais são marcas registradas ou 
                marcas comerciais do MEU DDD. Você não pode usar essas marcas sem nossa permissão 
                prévia por escrito.
              </p>
              <p>
                Você pode visualizar, baixar e imprimir conteúdo da plataforma apenas para uso 
                pessoal e não comercial, desde que mantenha todos os avisos de direitos autorais 
                e propriedade.
              </p>
            </CardContent>
          </Card>

          {/* Precisão das Informações */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-primary" />
                Precisão das Informações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                Embora nos esforcemos para manter as informações sobre códigos DDD precisas e 
                atualizadas, não garantimos a exatidão, completude ou atualidade de todas as 
                informações fornecidas na plataforma.
              </p>
              <p>
                Os códigos DDD e informações relacionadas podem mudar devido a regulamentações 
                da ANATEL (Agência Nacional de Telecomunicações) ou outras autoridades competentes.
              </p>
              <p>
                Recomendamos que você verifique informações críticas diretamente com sua operadora 
                de telefonia ou com a ANATEL antes de tomar decisões importantes baseadas nas 
                informações fornecidas.
              </p>
            </CardContent>
          </Card>

          {/* Isenção de Responsabilidade */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-destructive" />
                Isenção de Responsabilidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                A plataforma MEU DDD é fornecida "como está" e "conforme disponível", sem garantias 
                de qualquer tipo, expressas ou implícitas, incluindo, mas não se limitando a:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Garantias de comercialização</li>
                <li>Adequação a um propósito específico</li>
                <li>Não violação de direitos de terceiros</li>
                <li>Disponibilidade ininterrupta ou livre de erros</li>
                <li>Segurança absoluta contra vírus ou outros componentes prejudiciais</li>
              </ul>
              <p className="mt-4">
                Não nos responsabilizamos por:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Erros ou imprecisões nas informações fornecidas</li>
                <li>Danos diretos, indiretos, incidentais ou consequenciais</li>
                <li>Perda de dados ou lucros cessantes</li>
                <li>Interrupções no serviço ou indisponibilidade temporária</li>
                <li>Ações de terceiros ou links externos</li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitação de Responsabilidade */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg flex items-center gap-2">
                <Scale className="w-6 h-6 text-primary" />
                Limitação de Responsabilidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                Na extensão máxima permitida pela lei aplicável, o MEU DDD e seus diretores, 
                funcionários, parceiros e fornecedores não serão responsáveis por quaisquer danos 
                diretos, indiretos, incidentais, especiais, consequenciais ou punitivos resultantes de:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Uso ou incapacidade de usar a plataforma</li>
                <li>Acesso não autorizado aos nossos servidores ou dados</li>
                <li>Erros ou omissões no conteúdo</li>
                <li>Conduta de terceiros na plataforma</li>
                <li>Qualquer outra questão relacionada aos serviços</li>
              </ul>
              <p className="mt-4">
                Esta limitação se aplica independentemente de termos sido avisados da possibilidade 
                de tais danos.
              </p>
            </CardContent>
          </Card>

          {/* Links de Terceiros */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                Links para Sites de Terceiros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                Nossa plataforma pode conter links para sites de terceiros que não são operados 
                por nós. Não temos controle sobre o conteúdo, políticas de privacidade ou práticas 
                desses sites e não assumimos responsabilidade por eles.
              </p>
              <p>
                Recomendamos que você revise os termos de uso e políticas de privacidade de 
                qualquer site de terceiros que visitar.
              </p>
            </CardContent>
          </Card>

          {/* Modificações dos Termos */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                Modificações dos Termos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. 
                Quando fizermos alterações significativas, notificaremos você através da plataforma 
                ou por outros meios apropriados.
              </p>
              <p>
                Seu uso continuado da plataforma após a publicação de alterações constitui sua 
                aceitação dos novos Termos. Se você não concordar com as alterações, deverá 
                interromper o uso da plataforma.
              </p>
              <p>
                A data de "Última atualização" no topo deste documento indica quando os Termos 
                foram revisados pela última vez.
              </p>
            </CardContent>
          </Card>

          {/* Rescisão */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                Rescisão
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                Podemos suspender ou encerrar seu acesso à plataforma imediatamente, sem aviso 
                prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se 
                você violar estes Termos de Uso.
              </p>
              <p>
                Você pode interromper o uso da plataforma a qualquer momento. Todas as disposições 
                destes Termos que, por sua natureza, devam sobreviver à rescisão, sobreviverão, 
                incluindo, sem limitação, disposições de propriedade, isenções de garantia e 
                limitações de responsabilidade.
              </p>
            </CardContent>
          </Card>

          {/* Lei Aplicável */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg flex items-center gap-2">
                <Scale className="w-6 h-6 text-primary" />
                Lei Aplicável e Jurisdição
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                Estes Termos de Uso são regidos e interpretados de acordo com as leis da República 
                Federativa do Brasil, sem considerar conflitos de disposições legais.
              </p>
              <p>
                Qualquer disputa relacionada a estes Termos será submetida à jurisdição exclusiva 
                dos tribunais brasileiros, com renúncia expressa a qualquer outro foro, por mais 
                privilegiado que seja.
              </p>
            </CardContent>
          </Card>

          {/* Disposições Gerais */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                Disposições Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                <strong>Acordo Integral:</strong> Estes Termos constituem o acordo integral entre 
                você e o MEU DDD em relação ao uso da plataforma.
              </p>
              <p>
                <strong>Renúncia:</strong> A falha em exercer ou fazer cumprir qualquer direito ou 
                disposição destes Termos não constituirá uma renúncia a tal direito ou disposição.
              </p>
              <p>
                <strong>Divisibilidade:</strong> Se qualquer disposição destes Termos for considerada 
                inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito.
              </p>
              <p>
                <strong>Cessão:</strong> Você não pode ceder ou transferir estes Termos ou seus 
                direitos sob estes Termos sem nosso consentimento prévio por escrito.
              </p>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg flex items-center gap-2">
                <Mail className="w-6 h-6 text-primary" />
                Entre em Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                Se você tiver dúvidas, comentários ou preocupações sobre estes Termos de Uso, 
                entre em contato conosco:
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p>
                  <strong>E-mail:</strong>{' '}
                  <a href="mailto:contato@meuddd.com.br" className="text-primary hover:underline">
                    contato@meuddd.com.br
                  </a>
                </p>
                <p>
                  <strong>Página de Contato:</strong>{' '}
                  <a href="/contato" className="text-primary hover:underline">
                    www.meuddd.com.br/contato
                  </a>
                </p>
              </div>
              <p className="mt-4">
                Faremos o possível para responder a todas as consultas dentro de um prazo razoável.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
