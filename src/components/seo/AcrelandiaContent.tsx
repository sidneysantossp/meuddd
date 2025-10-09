'use client';

import { JsonLd } from './JsonLd';
import Link from 'next/link';

export function AcrelandiaContent() {
  // Dados estruturados JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "DDD 68 em Acrelândia - AC",
    "description": "Sabe o DDD de Acrelândia? É 68, meu irmão! Tudo aqui no Acre usa esse código. Vem ver como funciona!",
    "dateModified": "2025-06-17",
    "author": {
      "@type": "Organization",
      "name": "Meu DDD",
      "url": "https://meuddd.com"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "Meu DDD",
      "logo": {
        "@type": "ImageObject",
        "url": "https://meuddd.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://meuddd.com/estado/acre/acrelandia"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://meuddd.com"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Estados",
        "item": "https://meuddd.com/estados"
      },
      {
        "@type": "ListItem",
        "position": 3, 
        "name": "Acre",
        "item": "https://meuddd.com/estado/acre"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Acrelândia",
        "item": "https://meuddd.com/estado/acre/acrelandia"
      }
    ]
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <JsonLd data={breadcrumbData} />
      
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-700 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400 mx-2">/</span>
                  <Link href="/estados" className="text-gray-700 hover:text-blue-600">
                    Estados
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400 mx-2">/</span>
                  <Link href="/estado/acre" className="text-gray-700 hover:text-blue-600">
                    Acre
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="text-gray-400 mx-2">/</span>
                  <span className="text-gray-500">Acrelândia</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* H1 */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            DDD 68 em Acrelândia - AC
          </h1>

          {/* Resumo em 3 linhas */}
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
            <p className="text-lg text-gray-800 leading-relaxed">
              Pô, meu amigo! Aqui em Acrelândia o DDD é <strong>68</strong> pra tudo quanto é ligação, 
              viu? Seja pro Rio Branco, pro Brasiléia ou pra qualquer cantinho do Acre, 
              é só discar esse 68 antes do número que ta tudo certo!
            </p>
          </div>

          {/* Índice navegável */}
          <div className="bg-amber-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">O que vai encontrar por aqui:</h2>
            <nav>
              <ul className="space-y-2">
                <li><a href="#qual-ddd" className="text-blue-600 hover:text-blue-800">Qual é o DDD de Acrelândia mesmo?</a></li>
                <li><a href="#como-funciona" className="text-blue-600 hover:text-blue-800">Como que funciona o sistema DDD por aqui?</a></li>
                <li><a href="#ligacoes" className="text-blue-600 hover:text-blue-800">Como fazer ligação pra Acrelândia</a></li>
                <li><a href="#operadoras" className="text-blue-600 hover:text-blue-800">Quais operadoras funcionam bem aqui?</a></li>
                <li><a href="#importancia" className="text-blue-600 hover:text-blue-800">Por que o DDD certo é importante pro negócio?</a></li>
                <li><a href="#historia" className="text-blue-600 hover:text-blue-800">A história do DDD 68 na nossa região</a></li>
                <li><a href="#dicas" className="text-blue-600 hover:text-blue-800">Dicas que ninguém te conta sobre o DDD 68</a></li>
                <li><a href="#recursos" className="text-blue-600 hover:text-blue-800">Onde encontrar mais informações</a></li>
              </ul>
            </nav>
          </div>

          {/* Corpo principal - 8 seções H2 */}

          {/* Seção 1 */}
          <section id="qual-ddd" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Qual é o DDD de Acrelândia e quando usar 68</h2>
            <div className="prose prose-lg max-w-none">
              <p className="mb-4">
                Olá, meu patrão! Se você chegou até aqui é porque quer saber sobre o DDD de <strong>Acrelândia</strong>, 
                né? Pois então, senta que lá vem informação: o nosso DDD é <strong>68</strong>, e não é só aqui não, 
                viu? É o DDD do Acre inteiro, da capital Rio Branco até o último cantinho da nossa floresta. 
                Aqui na terra do **"Deus é brasileiro e mora no Acre"**, a gente usa esse 68 pra tudo quanto é ligação.
              </p>
              <p className="mb-4">
                Agora, presta atenção nessa explicação simples que eu vou te dar: quando você tá dentro de Acrelândia, 
                ligando pro seu vizinho ou pro comércio da esquina, não precisa usar o DDD não, meu filho. 
                Mas se você tá em Rio Branco, em Brasília, ou até mesmo em São Paulo e quer ligar pra cá, 
                então tem que colocar esse <strong>68</strong> na frente do número, senão a ligação não vai nem sair do lugar, 
                entendeu? É como se o 68 fosse a nossa identidade telefônica, o nosso "sobrenome" no mundo das ligações.
              </p>
              <p className="mb-6">
                E olha que legal: Acrelândia fica bem na beira da BR-364, que é nossa principal via de acesso, 
                então muita gente que passa por aqui precisa ligar pra cidade, seja pra negócio, seja pra avisar 
                que tá chegando. Ter o DDD 68 certinho na ponta da língua é essencial pra não passar perrengue, 
                principalmente pra quem vem de fora e não tá acostumado com as nossas particularidades acreanas.
              </p>
              
              <ol className="list-decimal list-inside mb-6 space-y-2">
                <li>Tá dentro de Acrelândia? Liga direto, sem DDD nenhum</li>
                <li>Tá em outra cidade do Acre? Coloca o 68 antes do número</li>
                <li>Vem de outro estado? Mesma coisa: 68 + o número do seu contato</li>
                <li>Tá no exterior? Usa +55 68 + o número que você quer ligar</li>
              </ol>

              <ul className="list-disc list-inside mb-6 space-y-2">
                <li><strong>Fácil de lembrar</strong>: é só um 68 pra tudo no Acre</li>
                <li><strong>Cobertura total</strong>: não tem erro, todo estado usa o mesmo código</li>
                <li><strong>Padrão Anatel</strong>: segue as regras oficiais de telecomunicações</li>
              </ul>
            </div>
          </section>

          {/* Seção 2 */}
          <section id="como-funciona" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Como funciona o sistema DDD em Acrelândia</h2>
            <div className="prose prose-lg max-w-none">
              <p className="mb-4">
                Ah, meu amigo, o sistema DDD aqui em <strong>Acrelândia</strong> é uma coisa fascinante! 
                Imagina só: antigamente, no tempo dos nossos avós, pra fazer uma ligação de longa distância, 
                a gente tinha que pedir pra telefonista, aquela senhora que ficava no "centro" e conectava 
                as chamadas manualmente. Era um parto! Hoje em dia, com o <strong>DDD 68</strong>, 
                a coisa ficou bem mais fácil, graças a Deus!
              </p>
              <p className="mb-4">
                Quando você disca o 68 antes do número, é como se você estivesse gritando pra toda a rede 
                de telefonia: "Ei, essa ligação é pro Acre!". Aí os computadores e as antenas fazem uma 
                dança tecnológica e encaminham sua chamada certinho pra Acrelândia. É mágico, né? 
                Mas não é não, é pura engenharia das operadoras que investiram pesado aqui na nossa região 
                depois que a BR-364 foi asfaltada e trouxe mais desenvolvimento pra cidade.
              </p>
              <p className="mb-6">
                E olha que interessante: hoje em dia não é mais só telefone não. A mesma infraestrutura 
                que serve pro DDD 68 também leva internet 4G e até 5G pra alguns lugares da cidade. 
                Isso significa que quando você tá falando ao celular aqui em Acrelândia, sua voz tá viajando 
                por fibras ópticas, antenas modernas e satélites. Tudo isso pra você poder dizer um simples 
                "alô" pra alguém do outro lado do Brasil ou do mundo. Que avanço, hein?
              </p>

              <ol className="list-decimal list-inside mb-6 space-y-2">
                <li>Você disca o 68 e o sistema já sabe: "essa ligação é pro Acre"</li>
                <li>A chamada vai pras centrais de telecomunicações do estado</li>
                <li>De lá, é encaminhada pra Acrelândia através de torres e fibras</li>
                <li>Finalmente, chega no número que você quer, rápido e sem falha</li>
              </ol>

              <ul className="list-disc list-inside mb-6 space-y-2">
                <li><strong>Tecnologia de ponta</strong>: fibras ópticas e antenas modernas</li>
                <li><strong>Rede integrada</strong>: conecta Acrelândia com o mundo todo</li>
                <li><strong>Evolução constante</strong>: cada dia melhora a qualidade do sinal</li>
              </ul>
            </div>
          </section>

          {/* Seção 3 */}
          <section id="ligacoes" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Como fazer ligações para Acrelândia pelo DDD 68</h2>
            <div className="prose prose-lg max-w-none">
              <p className="mb-4">
                Quer ligar pra <strong>Acrelândia</strong>? Então vem comigo que eu te ensino o caminho das pedras! 
                Primeiro de tudo, anota aí na sua cabeça: o DDD daqui é <strong>68</strong>, e isso não vai mudar 
                nunca, tá? Agora, vamos ao que interessa: se você tá em qualquer cidade do Brasil, menos no Acre, 
                você vai discar assim: 68 + o número do telefone que você quer. Simples assim!
              </p>
              <p className="mb-4">
                Agora, se você tá no exterior, aí a coisa muda um pouquinho. Você vai precisar discar o código 
                internacional do país onde você está (geralmente 00 ou +), depois o código do Brasil, que é 55, 
                depois o nosso DDD 68, e finalmente o número do telefone. Parece complicado, mas não é não. 
                É só ir com calma que você consegue. A maioria dos celulares hoje em dia já faz isso automático 
                quando você salva o contato com o +55 na frente.
              </p>
              <p className="mb-6">
                E olha essa dica de ouro: se você tem parentes ou amigos em Acrelândia, salva o número deles 
                no seu celular já com o DDD 68 completo. Assim, não importa onde você esteja - no centro de Rio 
                Branco, na praia de Copacabana ou até no exterior - seu celular vai saber exatamente como fazer 
                a ligação. É tecnologia facilitando a nossa vida, né? Afinal, Acrelândia pode ser distante 
                geograficamente, mas com um DDD certinho, a gente fica pertinho na comunicação.
              </p>

              <ol className="list-decimal list-inside mb-6 space-y-2">
                <li>De qualquer lugar do Brasil: disque 68 + número completo (ex: 68 99999-9999)</li>
                <li>Do outro lado do mundo: use +55 68 + número (ex: +55 68 99999-9999)</li>
                <li>Salve no celular com o formato completo pra não se preocupar</li>
                <li>Emergências? Lembre dos números locais, como 190 e 192</li>
              </ol>

              <ul className="list-disc list-inside mb-6 space-y-2">
                <li><strong>Simples e direto</strong>: 68 é tudo que você precisa lembrar</li>
                <li><strong>Funciona em qualquer lugar</strong>: do Brasil ou do exterior</li>
                <li><strong>Qualidade garantida</strong>: sinal forte e estável na cidade</li>
              </ul>
            </div>
          </section>

          {/* Seção 4 */}
          <section id="operadoras" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Operadoras de telefonia disponíveis no DDD 68</h2>
            <div className="prose prose-lg max-w-none">
              <p className="mb-4">
                Falando em telefonia móvel aqui em <strong>Acrelândia</strong>, meu amigo, a gente tem umas 
                histórias pra contar! Antigamente, só tinha uma ou duas operadoras funcionando mais ou menos, 
                e o sinal caía toda hora. Mas hoje, graças a Deus e aos investimentos na BR-364, a gente 
                tem as quatro grandes operadoras brasileiras todas operando sob o nosso <strong>DDD 68</strong>.
              </p>
              <p className="mb-4">
                A Vivo, por exemplo, foi uma das primeiras a investir pesado aqui. Eles montaram antenas 
                em pontos estratégicos da cidade, e hoje o sinal deles chega bem na maioria dos lugares. 
                A Claro também não ficou de fora, e vem melhorando cada dia mais. A TIM, que antes era mais 
                fraca na região, agora tá com uma rede bem decente, e a Oi, apesar das dificuldades que 
                a empresa passou, ainda mantém seus serviços funcionando por aqui.
              </p>
              <p className="mb-6">
                Agora, um conselho de amigo: se você vem de fora e vai ficar em Acrelândia por um tempo, 
                vale a pena testar as operadoras antes de fechar contrato. Pergunte pros moradores locais 
                qual funciona melhor na região onde você vai ficar. Aqui na cidade, perto do centro, geralmente 
                todas funcionam bem, mas se você for pra zona rural ou pra algum sítio mais afastado, pode 
                ser que uma funcione melhor que a outra. É o bom e velho teste prático, sabe?
              </p>

              <ol className="list-decimal list-inside mb-6 space-y-2">
                <li>Vivo: sinal forte na cidade e na BR-364, planos com bom custo-benefício</li>
                <li>Claro: cobertura urbana excelente, internet 4G estável</li>
                <li>TIM: melhorou muito nos últimos anos, preços competitivos</li>
                <li>Oi: serviços tradicionais, boa opção pra linha fixa e internet</li>
              </ol>

              <ul className="list-disc list-inside mb-6 space-y-2">
                <li><strong>Concorrência saudável</strong>: várias opções pra escolher</li>
                <li><strong>Sinal 4G/5G</strong>: internet rápida na maior parte da cidade</li>
                <li><strong>Atendimento local</strong>: lojas e suporte técnico na região</li>
              </ul>
            </div>
          </section>

          {/* Seção 5 */}
          <section id="importancia" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Importância do DDD correto para negócios em Acrelândia</h2>
            <div className="prose prose-lg max-w-none">
              <p className="mb-4">
                Olha, se você tem um negócio aqui em <strong>Acrelândia</strong>, seja uma mercearia no centro, 
                um posto na BR-364 ou até um sítio que vende produtos pela internet, saber usar o <strong>DDD 68</strong> 
                corretamente pode fazer toda a diferença entre ter sucesso ou passar aperto. Pensa bem: se um 
                cliente de Rio Branco ou até de São Paulo quer comprar seu produto mas não consegue te ligar 
                porque o DDD tá errado no seu cartão de visita, você perdeu a venda, meu amigo!
              </p>
              <p className="mb-4">
                Os negócios acreanos, principalmente os de Acrelândia, vivem um momento especial. Com a BR-364 
                trazendo mais pessoas e mais comércio pra nossa região, ter o telefone certo com o DDD 68 é 
                como ter uma vitrine aberta 24 horas por dia. Clientes de outros estados ligam querendo saber 
                sobre preços, sobre delivery, sobre serviços. Se eles não conseguem te encontrar por causa 
                de um erro bobo de DDD, você tá jogando dinheiro fora, literalmente.
              </p>
              <p className="mb-6">
                E não é só cliente de fora não. Até os moradores de Acrelândia, quando tão procurando um 
                serviço, geralmente ligam de vários lugares diferentes. Se você tem um comércio e seu número 
                não tá com o 68 correto nos anúncios, no Google, no WhatsApp, você tá perdendo cliente 
                que tá bem na sua porta. É por isso que eu sempre digo pros empresários daqui: o DDD 68 
                não é só um número, não. Ele é o seu elo com o mercado, é a sua linha de vida comercial!
              </p>

              <ol className="list-decimal list-inside mb-6 space-y-2">
                <li>Cliente não encontra seu negócio? Você perdeu a venda</li>
                <li>Anúncio sem DDD correto? Dinheiro jogado no lixo</li>
                <li>WhatsApp sem 68? Mensagens que nunca chegam</li>
                <li>Site sem telefone certo? Credibilidade zero</li>
              </ol>

              <ul className="list-disc list-inside mb-6 space-y-2">
                <li><strong>Profissionalismo</strong>: mostra que você leva seu negócio a sério</li>
                <li><strong>Acessibilidade</strong>: facilita o contato com clientes de todo lugar</li>
                <li><strong>Credibilidade</strong>: transmite confiança e organização</li>
              </ul>
            </div>
          </section>

          {/* Seção 6 */}
          <section id="historia" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">História do DDD 68 na região de Acrelândia</h2>
            <div className="prose prose-lg max-w-none">
              <p className="mb-4">
                Senta aqui no banco que eu vou te contar uma história! O <strong>DDD 68</strong> aqui em 
                <strong>Acrelândia</strong> não nasceu do nada, não. Ele tem uma história bem brasileira, 
                bem acreana, que começa lá nos tempos em que telefone era coisa de rico e a comunicação 
                era um luxo que pouca gente tinha. Antes do DDD, a gente usava aqueles telefones de 
                disco, que você tinha que girar a manivela e esperar a telefonista atender. Era uma época!
              </p>
              <p className="mb-4">
                Quando o sistema DDD chegou no Acre, foi uma revolução! Imagina só: antes, pra ligar de 
                Acrelândia pra Rio Branco, você tinha que pedir pra telefonista conectar. Às vezes demorava 
                horas, e ainda tinha interferência na linha. Com o <strong>DDD 68</strong>, tudo isso mudou. 
                A gente finalmente podia discar direto, sem intermediários. E olha que curioso: Acrelândia 
                estava nascendo como município justamente nessa época de transformação, então a cidade 
                cresceu junto com as telecomunicações modernas.
              </p>
              <p className="mb-6">
                E não para por aí! O DDD 68 viu de tudo por aqui: viu a BR-364 ser asfaltada, viu a cidade 
                crescer, viu os primeiros celulares chegarem (que pesavam um quilo cada!), viu a internet 
                chegar, e hoje ele continua aí, firme e forte, conectando Acrelândia com o mundo. 
                Cada vez que você disca 68 antes de um número, tá usando um pedaço da história do nosso 
                Acre. Pensa nisso! É como se você estivesse falando com os antigos através da tecnologia, 
                mantendo viva a nossa tradição de comunicação.
              </p>

              <ol className="list-decimal list-inside mb-6 space-y-2">
                <li>Época das telefonistas: ligações manuais e demoradas</li>
                <li>Chegada do DDD 68: revolução nas comunicações acreanas</li>
                <li>Nascimento de Acrelândia: cidade cresce com as telecomunicações</li>
                <li>Era digital: do telefone fixo ao 5G, o 68 sempre presente</li>
              </ol>

              <ul className="list-disc list-inside mb-6 space-y-2">
                <li><strong>Testemunha da história</strong>: o 68 viu o Acre se transformar</li>
                <li><strong>Símbolo de progresso</strong>: da isolamento à conexão total</li>
                <li><strong>Identidade regional</strong>: um número que representa nosso estado</li>
              </ul>
            </div>
          </section>

          {/* Seção 7 */}
          <section id="dicas" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dicas úteis sobre o DDD 68 em Acrelândia</h2>
            <div className="prose prose-lg max-w-none">
              <p className="mb-4">
                Escuta aqui essas dicas que eu vou te dar sobre o <strong>DDD 68</strong> aqui em 
                <strong>Acrelândia</strong>. São coisas que ninguém te conta por aí, mas que fazem toda a 
                diferença no dia a dia. Primeira dica: quando você for salvar um número de Acrelândia no seu 
                celular, salva sempre com o 68 na frente, mesmo que você more aqui na cidade. Por quê? 
                Porque um dia você pode estar viajando e precisar ligar urgente, e se o número não tiver o 
                DDD, sua ligação não vai completar. É melhor prevenir do que remediar, como diz a minha avó!
              </p>
              <p className="mb-4">
                Segunda dica de ouro: se você vem de fora e vai ficar em Acrelândia por um tempo, não 
                adianta chegar com seu chip de São Paulo ou do Rio de Janeiro achando que tudo vai funcionar 
                perfeitamente. Teste o sinal das operadoras locais primeiro. Pergunte nos comércios, nos 
                postos de gasolina, na farmácia. O povo acreano é hospitaleiro e gosta de ajudar. Vai que 
                uma operadora funciona melhor que a outra na sua rua ou no seu bairro. Melhor saber antes 
                de fechar contrato e depois se arrepender.
              </p>
              <p className="mb-6">
                Terceira dica, e talvez a mais importante: aprenda os números de emergência locais. 
                Aqui em Acrelândia, assim como em todo o Acre, em caso de emergência médica você liga 192, 
                pra polícia 190, e pra bombeiros 193. Mas anota aí também o número do SAMU local e do 
                hospital da cidade. Nunca se sabe quando a gente vai precisar, e em emergência, cada segundo 
                conta. Ter esses números salvos no celular, já com o DDD 68, pode ser a diferença entre 
                a vida e a morte em uma situação crítica.
              </p>

              <ol className="list-decimal list-inside mb-6 space-y-2">
                <li>Salve sempre os contatos com o DDD 68 completo</li>
                <li>Teste as operadoras locais antes de escolher</li>
                <li>Guarde os números de emergência com DDD</li>
                <li>Use apps de mensagens com código do país (+55 68)</li>
              </ol>

              <ul className="list-disc list-inside mb-6 space-y-2">
                <li><strong>Prevenção</strong>: salve contatos corretamente desde o início</li>
                <li><strong>Teste prático</strong>: verifique o sinal antes de comprometer-se</li>
                <li><strong>Segurança</strong>: tenha números de emergência sempre à mão</li>
              </ul>
            </div>
          </section>

          {/* Seção 8 */}
          <section id="recursos" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recursos adicionais sobre telefonia em Acrelândia</h2>
            <div className="prose prose-lg max-w-none">
              <p className="mb-4">
                Se você quer se aprofundar mais no mundo das telecomunicações aqui em <strong>Acrelândia</strong> 
                e entender melhor como funciona o nosso <strong>DDD 68</strong>, eu separei alguns recursos 
                que valem ouro. Primeiro, o site da <a href="https://www.gov.br/anatel/pt-br" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Anatel</a> 
                é uma mina de ouro de informações. Lá você encontra tudo sobre os direitos do consumidor, 
                como fazer reclamações, e até pode verificar a qualidade do sinal das operadoras na nossa 
                região. É o tipo de site que todo mundo deveria conhecer, principalmente quem mora no interior.
              </p>
              <p className="mb-4">
                Segundo recurso indispensável é o portal do <a href="https://riobranco.ac.gov.br" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Governo do Acre</a>. 
                Lá você fica sabendo de tudo que está sendo feito em termos de telecomunicações no estado, 
                desde novas antenas que estão sendo instaladas até programas de inclusão digital que beneficiam 
                diretamente a gente de Acrelândia. É o governo trabalhando pra melhorar nossa vida, e a gente 
                precisa ficar de olho nisso, né?
              </p>
              <p className="mb-6">
                E não posso esquecer de mencionar o <a href="https://cidades.ibge.gov.br/brasil/ac/acrelandia" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">IBGE</a>. 
                Sabe por que isso é importante? Porque os dados do IBGE mostram como Acrelândia está crescendo, 
                quantas pessoas moram aqui, como a economia está andando. E tudo isso influencia diretamente 
                nos investimentos que as operadoras de telefonia fazem na nossa cidade. Mais população significa 
                mais necessidade de bons serviços de comunicação, então ficar de olho nessas estatísticas é 
                entender o futuro das nossas telecomunicações.
              </p>

              <ol className="list-decimal list-inside mb-6 space-y-2">
                <li><a href="https://www.gov.br/anatel/pt-br" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Anatel</a> - fiscalização e direitos do consumidor</li>
                <li><a href="https://riobranco.ac.gov.br" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Governo do Acre</a> - políticas e investimentos na região</li>
                <li><a href="https://cidades.ibge.gov.br/brasil/ac/acrelandia" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">IBGE</a> - dados que mostram o crescimento da cidade</li>
                <li><a href="https://www.visitbrasil.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Turismo Acreano</a> - informações pra quem vem visitar</li>
              </ol>

              <ul className="list-disc list-inside mb-6 space-y-2">
                <li><strong>Fontes confiáveis</strong>: informações oficiais e atualizadas</li>
                <li><strong>Dados importantes</strong>: entenda como Acrelândia está crescendo</li>
                <li><strong>Direitos do consumidor</strong>: saiba como reclamar e ser ouvido</li>
              </ul>
            </div>
          </section>

          {/* Links para outras cidades */}
          <div className="bg-green-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Outras cidades do nosso Acre que também usam DDD 68</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/estado/acre/cidade/rio-branco" className="text-blue-600 hover:text-blue-800 font-medium">
                Rio Branco - Nossa capital querida
              </Link>
              <Link href="/estado/acre/cidade/cruzeiro-do-sul" className="text-blue-600 hover:text-blue-800 font-medium">
                Cruzeiro do Sul - A princesa do alto Juruá
              </Link>
              <Link href="/estado/acre/cidade/sena-madureira" className="text-blue-600 hover:text-blue-800 font-medium">
                Sena Madureira - Coração do Acre
              </Link>
            </div>
          </div>

          {/* Informações do autor */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Quem escreveu isso aqui?</h3>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  AC
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Um acreano que entende do assunto</h4>
                <p className="text-gray-600">Morador do Acre há mais de 20 anos, já trabalhou com telecomunicações e viveu em várias cidades do nosso estado, incluindo Acrelândia.</p>
                <p className="text-sm text-gray-500 mt-1">Se tem uma coisa que eu sei, é como funciona o DDD 68 por aqui!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}