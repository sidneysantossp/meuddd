import { Shield, Lock, Eye, UserCheck, Database, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/components/layouts/MainLayout';
import SEOHead from '@/components/common/SEOHead';

export default function PrivacyPolicyPage() {
  return (
    <MainLayout>
      <SEOHead
        title="Políticas de Privacidade | MEU DDD"
        description="Conheça nossas políticas de privacidade e como protegemos seus dados pessoais na plataforma MEU DDD."
        canonical="/politicas-de-privacidade"
      />
      
      <div className="py-8 xl:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-8 xl:mb-12">
            <div className="flex justify-center mb-4">
              <Shield className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl xl:text-4xl font-bold text-foreground mb-4 max-sm:text-2xl">
              Políticas de Privacidade
            </h1>
            <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Introduction */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg flex items-center gap-2">
                <Eye className="w-6 h-6 text-primary" />
                Introdução
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                A plataforma MEU DDD está comprometida em proteger a privacidade e os dados pessoais 
                de seus usuários. Esta Política de Privacidade descreve como coletamos, usamos, 
                armazenamos e protegemos suas informações quando você utiliza nossos serviços.
              </p>
              <p>
                Ao acessar e utilizar o MEU DDD, você concorda com as práticas descritas nesta 
                política. Recomendamos que você leia atentamente este documento para entender como 
                tratamos suas informações.
              </p>
            </CardContent>
          </Card>

          {/* Informações Coletadas */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg flex items-center gap-2">
                <Database className="w-6 h-6 text-primary" />
                Informações que Coletamos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <div>
                <h3 className="font-semibold text-foreground mb-2">1. Informações de Navegação</h3>
                <p>
                  Coletamos automaticamente informações sobre como você interage com nossa plataforma, 
                  incluindo:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Endereço IP</li>
                  <li>Tipo de navegador e dispositivo</li>
                  <li>Sistema operacional</li>
                  <li>Páginas visitadas e tempo de permanência</li>
                  <li>Termos de busca utilizados</li>
                  <li>Data e hora de acesso</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">2. Informações Fornecidas Voluntariamente</h3>
                <p>
                  Quando você utiliza nossos serviços de contato ou busca por voz, podemos coletar:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Nome e e-mail (formulário de contato)</li>
                  <li>Mensagens enviadas através do formulário</li>
                  <li>Comandos de voz (processados localmente no dispositivo)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">3. Cookies e Tecnologias Similares</h3>
                <p>
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência, incluindo:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Cookies essenciais para funcionamento do site</li>
                  <li>Cookies de análise e desempenho</li>
                  <li>Cookies de preferências do usuário</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Como Usamos as Informações */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-primary" />
                Como Usamos suas Informações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>Utilizamos as informações coletadas para:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Fornecer e melhorar nossos serviços de consulta de códigos DDD</li>
                <li>Personalizar sua experiência na plataforma</li>
                <li>Analisar o uso da plataforma e identificar tendências</li>
                <li>Responder a suas solicitações e dúvidas</li>
                <li>Detectar e prevenir fraudes ou atividades maliciosas</li>
                <li>Cumprir obrigações legais e regulatórias</li>
                <li>Enviar comunicações importantes sobre o serviço</li>
                <li>Melhorar a segurança e estabilidade da plataforma</li>
              </ul>
            </CardContent>
          </Card>

          {/* Compartilhamento de Dados */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg flex items-center gap-2">
                <Lock className="w-6 h-6 text-primary" />
                Compartilhamento de Informações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                O MEU DDD não vende, aluga ou compartilha suas informações pessoais com terceiros 
                para fins de marketing. Podemos compartilhar informações apenas nas seguintes situações:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  <strong>Prestadores de Serviços:</strong> Com empresas que nos auxiliam na operação 
                  da plataforma (hospedagem, análise de dados, suporte técnico)
                </li>
                <li>
                  <strong>Cumprimento Legal:</strong> Quando exigido por lei, ordem judicial ou 
                  autoridades governamentais
                </li>
                <li>
                  <strong>Proteção de Direitos:</strong> Para proteger nossos direitos, propriedade 
                  ou segurança, bem como de nossos usuários
                </li>
                <li>
                  <strong>Transferência de Negócio:</strong> Em caso de fusão, aquisição ou venda 
                  de ativos da empresa
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                Segurança dos Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                Implementamos medidas de segurança técnicas e organizacionais apropriadas para 
                proteger suas informações pessoais contra acesso não autorizado, alteração, 
                divulgação ou destruição, incluindo:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Criptografia de dados em trânsito (HTTPS/SSL)</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backups regulares de dados</li>
                <li>Treinamento de equipe em práticas de segurança</li>
              </ul>
              <p className="mt-4">
                No entanto, nenhum método de transmissão pela internet ou armazenamento eletrônico 
                é 100% seguro. Embora nos esforcemos para proteger suas informações, não podemos 
                garantir segurança absoluta.
              </p>
            </CardContent>
          </Card>

          {/* Seus Direitos */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-primary" />
                Seus Direitos (LGPD)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  <strong>Acesso:</strong> Confirmar se tratamos seus dados e solicitar acesso a eles
                </li>
                <li>
                  <strong>Correção:</strong> Solicitar correção de dados incompletos, inexatos ou desatualizados
                </li>
                <li>
                  <strong>Anonimização ou Exclusão:</strong> Solicitar anonimização ou exclusão de dados 
                  desnecessários ou tratados em desconformidade
                </li>
                <li>
                  <strong>Portabilidade:</strong> Solicitar a portabilidade de seus dados a outro fornecedor
                </li>
                <li>
                  <strong>Revogação de Consentimento:</strong> Revogar o consentimento para tratamento 
                  de dados a qualquer momento
                </li>
                <li>
                  <strong>Oposição:</strong> Se opor ao tratamento de dados em determinadas situações
                </li>
              </ul>
              <p className="mt-4">
                Para exercer seus direitos, entre em contato conosco através do e-mail: 
                <a href="mailto:privacidade@meuddd.com.br" className="text-primary hover:underline ml-1">
                  privacidade@meuddd.com.br
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Retenção de Dados */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg flex items-center gap-2">
                <Database className="w-6 h-6 text-primary" />
                Retenção de Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir as 
                finalidades descritas nesta política, a menos que um período de retenção mais longo 
                seja exigido ou permitido por lei.
              </p>
              <p>
                Quando suas informações não forem mais necessárias, nós as excluiremos ou 
                anonimizaremos de forma segura.
              </p>
            </CardContent>
          </Card>

          {/* Menores de Idade */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                Menores de Idade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                Nossos serviços são destinados a usuários maiores de 18 anos. Não coletamos 
                intencionalmente informações de menores de idade. Se você é pai, mãe ou responsável 
                e acredita que seu filho nos forneceu informações pessoais, entre em contato conosco 
                para que possamos tomar as medidas apropriadas.
              </p>
            </CardContent>
          </Card>

          {/* Alterações na Política */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                Alterações nesta Política
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças 
                em nossas práticas ou por outros motivos operacionais, legais ou regulatórios.
              </p>
              <p>
                Notificaremos você sobre quaisquer alterações significativas publicando a nova 
                Política de Privacidade nesta página e atualizando a data de "Última atualização" 
                no topo do documento.
              </p>
              <p>
                Recomendamos que você revise esta política periodicamente para se manter informado 
                sobre como protegemos suas informações.
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
                Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de 
                Privacidade ou ao tratamento de seus dados pessoais, entre em contato conosco:
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p>
                  <strong>E-mail:</strong>{' '}
                  <a href="mailto:privacidade@meuddd.com.br" className="text-primary hover:underline">
                    privacidade@meuddd.com.br
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
                Responderemos a todas as solicitações dentro do prazo estabelecido pela legislação 
                aplicável.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
