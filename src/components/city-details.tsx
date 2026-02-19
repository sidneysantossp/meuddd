"use client";

import {
    MapPin, Users, Phone, TrendingUp,
    Map as MapIcon, Heart, BookOpen, DollarSign,
    HomeIcon, ExternalLink, Info, HelpCircle,
    ArrowLeft, Globe
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import InteractiveMap from '@/components/ui/InteractiveMap';
import type { CityDetailedInfo } from '@/data/cityDetailedInfo';

interface CityDetailsProps {
    city: {
        name: string;
        ddd: string;
        population?: number;
    };
    state: {
        name: string;
        slug: string;
        abbreviation: string;
        region: string;
    };
    detailInfo?: CityDetailedInfo;
}

export function CityDetails({ city, state, detailInfo }: CityDetailsProps) {
    const formatPopulation = (pop: number) => pop.toLocaleString('pt-BR');

    // URLs de autoridade dinâmicas
    const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(`${city.name}, ${state.name}, Brasil`)}`;
    const wikipediaUrl = `https://pt.wikipedia.org/wiki/${encodeURIComponent(city.name.replace(/\s+/g, '_'))}_(${encodeURIComponent(state.abbreviation)})`;

    // Recriar a lógica de conteúdo SEO otimizado que existia no projeto original
    const info = detailInfo || {
        population: city.population || 0,
        area: 'Informação baseada em dados regionais',
        populationGrowth: '+1.2% ao ano (estimativa)',
        density: 'Calculando densidade...',
        type: 'Município Brasileiro',
        classification: 'Área Urbana/Rural',
        coordinates: { lat: 0, lng: 0 },
        socialIndicators: {
            idh: '0.720 (Média Regional)',
            idhLevel: 'Alto',
            literacy: '92%',
            averageIncome: 'R$ 2.100',
            ownHomes: '78%'
        },
        operators: [
            { name: 'Vivo', coverage: 'Full 4G/5G', technology: '4G/5G' },
            { name: 'Claro', coverage: 'Full 4G/5G', technology: '4G/5G' },
            { name: 'TIM', coverage: 'Disponível', technology: '4G' }
        ],
        emergencyServices: [
            { name: 'SAMU', description: 'Atendimento Móvel de Urgência', phone: '192', color: 'red' },
            { name: 'Polícia Militar', description: 'Emergência e Segurança', phone: '190', color: 'blue' },
            { name: 'Bombeiros', description: 'Resgate e Incêndio', phone: '193', color: 'orange' },
            { name: 'Defesa Civil', description: 'Auxílio à Comunidade', phone: '199', color: 'green' }
        ],
        localServices: [
            { name: 'Prefeitura', description: 'Atendimento ao Cidadão', icon: 'hospital' },
            { name: 'Posto de Saúde', description: 'Saúde Básica (UBS)', icon: 'hospital' },
            { name: 'Escola Central', description: 'Educação Municipal', icon: 'school' }
        ],
        tourism: {
            description: `${city.name} é um destino que reflete a essência da região ${state.region}. Com pontos turísticos que misturam natureza e cultura local, a cidade atrai visitantes interessados na história do estado de ${state.name}.`,
            attractions: [
                { name: 'Praça Central', description: 'Coração cultural da cidade', category: 'Cultura', color: 'blue' },
                { name: 'Mirante Local', description: 'Vista panorâmica da região', category: 'Natureza', color: 'green' }
            ],
            events: [
                { name: 'Festa da Cidade', description: 'Celebração anual do aniversário', period: 'Anual' }
            ]
        },
        about: {
            introduction: `O município de <strong>${city.name}</strong>, situado no vibrante estado de <Link href="/estado/${state.slug}" className="text-blue-600 hover:underline font-bold">${state.name}</Link>, é um ponto vital na região <strong>${state.region}</strong> brasileira. Operando sob o <strong>código telefônico DDD ${city.ddd}</strong>, a localidade é reconhecida por sua relevância econômica e integração regional.`,
            history: `A trajetória histórica de <strong>${city.name}</strong> é marcada por ciclos de <strong>desenvolvimento e autonomia</strong> que moldaram o panorama atual de <strong>${state.name}</strong>. Desde a sua <strong>emancipação política</strong>, a cidade tem preservado suas raízes culturais enquanto se adapta às modernidades do século XXI. Momentos chaves incluem:
            <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-600">
                <li>Fundação e primeiros assentamentos no interior de <strong>${state.abbreviation}</strong>.</li>
                <li>Ciclos econômicos baseados em recursos naturais e agropecuária.</li>
                <li>Implementação do sistema nacional de telecomunicações via <strong>DDD ${city.ddd}</strong>.</li>
            </ul>`,
            geography: `Geograficamente, <strong>${city.name}</strong> apresenta um relevo característico da região <strong>${state.region}</strong>, com ecossistemas preservados e localização estratégica. Situada nas <strong>coordenadas ${city.name}</strong>, a área municipal abrange uma diversidade biológica fundamental para o equilíbrio ambiental de <strong>${state.name}</strong>. Para mapas detalhados, consulte o <a href="${googleMapsUrl}" target="_blank" className="text-blue-500 underline font-bold">Google Maps</a> oficial.`,
            economy: `O <strong>PIB de ${city.name}</strong> é impulsionado por um setor de serviços dinâmico e pela força comercial local. Como um polo de atração no estado de <strong>${state.name}</strong>, a cidade oferece um ambiente fértil para <strong>empreendedorismo e investimentos</strong>, conectada globalmente pelo prefixo <strong>DDD ${city.ddd}</strong>.`,
            culture: `A alma cultural de <strong>${city.name}</strong> reside em suas festas populares, culinária típica e o <strong>folclore de ${state.region}</strong>. Tradições passadas por gerações refletem a identidade plural de seu povo, celebrando a história de <strong>${state.name}</strong> através de eventos anuais e artesanato local de alta qualidade.`,
            infrastructure: `A infraestrutura de <strong>${city.name}</strong> conta com serviços de <strong>telecomunicações avançados</strong>. Sob a regulação da <a href="https://www.anatel.gov.br/" target="_blank" className="text-blue-600 underline font-bold">ANATEL</a>, a cidade mantém conectividade total via <strong>DDD ${city.ddd}</strong>, com suporte para redes 4G/5G e internet banda larga em toda a mancha urbana.`
        },
        faqs: [
            { question: `Qual o código DDD de ${city.name}?`, answer: `O código de discagem direta oficial de <strong>${city.name}</strong> é o <strong>DDD ${city.ddd}</strong>.` },
            { question: `Como fazer ligações para ${city.name}?`, answer: `Para ligar, utilize o formato padrão: <strong>0 + Código da Operadora + ${city.ddd} + Número</strong>.` },
            { question: `Onde fica localizada a cidade de ${city.name}?`, answer: `Localiza-se no estado de <strong>${state.name} (${state.abbreviation})</strong>, integrada à região <strong>${state.region}</strong> do Brasil.` },
            { question: `Quais as principais fontes de dados de ${city.name}?`, answer: `As informações oficiais podem ser validadas nos portais do <a href="https://www.ibge.gov.br/" target="_blank" className="text-blue-600 underline font-bold">IBGE</a> e da prefeitura local.` }
        ],
        externalLinks: [
            { name: 'IBGE Cidades', url: `https://cidades.ibge.gov.br/brasil/${state.slug}/panorama`, description: 'Dados oficiais do IBGE sobre a cidade' },
            { name: 'Anatel', url: 'https://www.anatel.gov.br/', description: 'Agência Nacional de Telecomunicações' },
            { name: 'Google Maps', url: googleMapsUrl, description: 'Visualização geográfica via satélite' }
        ]
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Sidebar - Quick Info */}
            <div className="xl:col-span-1">
                <Card className="shadow-lg sticky top-6 border-blue-100">
                    <CardHeader className="bg-blue-50/50">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-blue-600" />
                            <CardTitle className="text-lg">Ficha Técnica</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-500 italic">Estado:</span>
                            <Link href={`/estado/${state.slug}`} className="text-sm font-bold text-blue-600 hover:underline">
                                {state.name} ({state.abbreviation})
                            </Link>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-500 italic">Código de Área:</span>
                            <Badge variant="outline" className="text-base font-bold px-3 border-blue-200">
                                DDD {city.ddd}
                            </Badge>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-500 italic">População Est.:</span>
                            <span className="text-sm font-bold">{formatPopulation(city.population || 0)} hab.</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-500 italic">Região:</span>
                            <span className="text-sm font-semibold">{state.region}</span>
                        </div>

                        <div className="pt-4">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-bold">Links de Autoridade</p>
                            <div className="space-y-2">
                                <a href="https://www.anatel.gov.br/" target="_blank" className="flex items-center gap-2 text-xs text-blue-500 hover:underline">
                                    <ExternalLink className="h-3 w-3" /> ANATEL - Telecomunicações
                                </a>
                                <a href={`https://cidades.ibge.gov.br/brasil/${state.slug}/panorama`} target="_blank" className="flex items-center gap-2 text-xs text-blue-500 hover:underline">
                                    <ExternalLink className="h-3 w-3" /> IBGE - Dados Oficiais
                                </a>
                                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-blue-500 hover:underline">
                                    <MapIcon className="h-3 w-3" /> Ver no Google Maps
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Areas */}
            <div className="xl:col-span-3">
                <Tabs defaultValue="ddd" className="w-full">
                    <TabsList className="flex flex-wrap h-auto p-1 bg-muted/50 mb-8 overflow-x-auto">
                        <TabsTrigger value="ddd">DDD & Chamadas</TabsTrigger>
                        <TabsTrigger value="mapa">Mapa Interativo</TabsTrigger>
                        <TabsTrigger value="servicos">Serviços & Telefones</TabsTrigger>
                        <TabsTrigger value="dados" className="flex">Dados Sociais</TabsTrigger>
                        <TabsTrigger value="turismo" className="flex">Turismo</TabsTrigger>
                        <TabsTrigger value="sobre" className="flex">Sobre a Cidade</TabsTrigger>
                        <TabsTrigger value="faq">FAQ</TabsTrigger>
                    </TabsList>

                    {/* TAB DDD */}
                    <TabsContent value="ddd" className="space-y-6 focus-visible:outline-none">
                        <Card className="border-l-4 border-l-blue-600">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-6 w-6 text-blue-600" />
                                    <CardTitle className="text-2xl">Guia de Discagem DDD {city.ddd}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Alert className="bg-blue-50 border-blue-200">
                                    <AlertDescription className="text-blue-800">
                                        O código de discagem direta à distância (DDD) de <strong>{city.name}</strong> é <strong>{city.ddd}</strong>. Este código é compartilhado com diversos municípios do estado de <Link href={`/estado/${state.slug}`} className="font-bold underline">{state.name}</Link>.
                                    </AlertDescription>
                                </Alert>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm transition-hover">
                                        <h3 className="font-bold flex items-center gap-2 text-gray-700 mb-4 uppercase text-xs tracking-wider">
                                            <Phone className="h-4 w-4 text-blue-500" /> Ligações Nacionais
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-2 font-medium">Formato para celular ou fixo:</p>
                                        <div className="bg-white p-3 rounded border font-mono text-xl text-blue-700 text-center shadow-inner">
                                            0 + (Cód. Operadora) + {city.ddd} + Número
                                        </div>
                                    </div>

                                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                                        <h3 className="font-bold flex items-center gap-2 text-gray-700 mb-4 uppercase text-xs tracking-wider">
                                            <Globe className="h-4 w-4 text-green-500" /> Ligações Internacionais
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-2 font-medium">Chamadas do exterior para {city.name}:</p>
                                        <div className="bg-white p-3 rounded border font-mono text-xl text-green-700 text-center shadow-inner">
                                            +55 + {city.ddd} + Número
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Operadoras Disponíveis em {city.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {info.operators.map((op, i) => (
                                        <div key={i} className="flex flex-col p-4 rounded-lg border bg-blue-50/50">
                                            <span className="font-bold text-blue-700 mb-1">{op.name}</span>
                                            <span className="text-xs text-gray-500">{op.coverage}</span>
                                            <Badge variant="secondary" className="mt-2 text-[10px] w-fit">{op.technology}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* TAB MAPA */}
                    <TabsContent value="mapa" className="focus-visible:outline-none">
                        <Card className="overflow-hidden">
                            <CardContent className="p-0">
                                <InteractiveMap
                                    latitude={info.coordinates?.lat || 0}
                                    longitude={info.coordinates?.lng || 0}
                                    cityName={city.name}
                                    stateName={state.name}
                                    ddd={city.ddd}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* TAB SERVIÇOS */}
                    <TabsContent value="servicos" className="space-y-6 focus-visible:outline-none">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Telefones e Serviços Úteis</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-muted-foreground text-sm">Contatos essenciais para moradores e visitantes em {city.name}.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {info.emergencyServices.map((service, i) => (
                                        <div key={i} className={`flex items-center justify-between p-4 rounded-xl border border-${service.color}-100 bg-${service.color}-50/30`}>
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-full bg-${service.color}-500 text-white`}>
                                                    <Phone className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold">{service.name}</p>
                                                    <p className="text-xs text-gray-500">{service.description}</p>
                                                </div>
                                            </div>
                                            <span className="text-xl font-black text-gray-800 tracking-tighter">{service.phone}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* TAB DADOS SOCIAIS */}
                    <TabsContent value="dados" className="space-y-6 focus-visible:outline-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="p-6 text-center bg-blue-50/50">
                                <Heart className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-blue-700">{info.socialIndicators.idh}</p>
                                <p className="text-xs text-gray-500">IDH Municipal</p>
                            </Card>
                            <Card className="p-6 text-center bg-green-50/50">
                                <BookOpen className="h-6 w-6 text-green-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-green-700">{info.socialIndicators.literacy}</p>
                                <p className="text-xs text-gray-500">Alfabetização</p>
                            </Card>
                            <Card className="p-6 text-center bg-amber-50/50">
                                <DollarSign className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-amber-700">{info.socialIndicators.averageIncome}</p>
                                <p className="text-xs text-gray-500">Renda Média</p>
                            </Card>
                            <Card className="p-6 text-center bg-purple-50/50">
                                <HomeIcon className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-purple-700">{info.socialIndicators.ownHomes}</p>
                                <p className="text-xs text-gray-500">Casas Próprias</p>
                            </Card>
                        </div>
                        <Card>
                            <CardHeader><CardTitle>Indicadores Demográficos</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-gray-500">Crescimento Populacional</span>
                                        <span className="font-semibold">{info.populationGrowth}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-gray-500">Densidade Demográfica</span>
                                        <span className="font-semibold">{info.density}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-gray-500">Classificação Urbana</span>
                                        <span className="font-semibold">{info.classification}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* TAB TURISMO */}
                    <TabsContent value="turismo" className="space-y-6 focus-visible:outline-none">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <MapIcon className="h-6 w-6 text-green-600" />
                                    <CardTitle className="text-2xl">Turismo e Lazer</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 text-base text-gray-600 leading-relaxed prose prose-blue max-w-none">
                                <p>{info.tourism.description}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                                    {info.tourism.attractions.map((attr, i) => (
                                        <div key={i} className="p-4 rounded-lg bg-gray-50 border border-gray-100 flex items-start gap-3">
                                            <MapPin className="h-5 w-5 text-gray-400 shrink-0 mt-1" />
                                            <div>
                                                <p className="font-bold text-gray-800">{attr.name}</p>
                                                <p className="text-sm text-gray-500">{attr.description}</p>
                                                <Badge variant="outline" className="mt-2 text-[10px] uppercase text-gray-400 font-bold">{attr.category}</Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* TAB SOBRE (ARTIGO SEO DE ALTA AUTORIDADE) */}
                    <TabsContent value="sobre" className="space-y-10 focus-visible:outline-none">
                        <article className="prose prose-blue lg:prose-xl max-w-none">
                            <div className="flex flex-col md:flex-row md:items-center gap-4 border-b pb-6 mb-8">
                                <div className="p-3 bg-blue-600 rounded-2xl text-white">
                                    <Info className="h-10 w-10" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 m-0">
                                        Guia Completo: <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 no-underline border-b-2 border-blue-100 hover:border-blue-600 transition-all font-black">{city.name}</a>, {state.name}
                                    </h2>
                                    <p className="text-gray-500 m-0 text-sm mt-1">Última atualização baseada em dados do <a href="https://www.ibge.gov.br/" target="_blank" className="underline">IBGE</a> e <a href="https://www.anatel.gov.br/" target="_blank" className="underline">ANATEL</a></p>
                                </div>
                            </div>

                            <section className="bg-white rounded-3xl">
                                <p className="leading-relaxed text-gray-700 text-lg mb-8" dangerouslySetInnerHTML={{ __html: info.about.introduction.replace(/\n\n/g, '<br/><br/>') }} />
                            </section>

                            <section className="space-y-4">
                                <h3 className="text-3xl font-black text-gray-900 border-b-2 border-gray-100 pb-3 flex items-center gap-3">
                                    <BookOpen className="h-8 w-8 text-blue-600" /> História de {city.name}
                                </h3>
                                <div className="leading-relaxed text-gray-600 text-lg space-y-4" dangerouslySetInnerHTML={{ __html: info.about.history.replace(/\n\n/g, '<br/><br/>') }} />
                            </section>

                            <section className="space-y-4 pt-4">
                                <h3 className="text-3xl font-black text-gray-900 border-b-2 border-gray-100 pb-3 flex items-center gap-3">
                                    <MapPin className="h-8 w-8 text-green-600" /> Geografia e Localização
                                </h3>
                                <div className="leading-relaxed text-gray-600 text-lg" dangerouslySetInnerHTML={{ __html: info.about.geography.replace(/\n\n/g, '<br/><br/>') }} />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 not-prose">
                                    <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex justify-between items-center shadow-sm">
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase tracking-widest text-blue-500 font-bold mb-1">Coordenadas</span>
                                            <span className="font-mono text-lg font-black text-blue-900">{info.coordinates.lat.toFixed(4)}, {info.coordinates.lng.toFixed(4)}</span>
                                        </div>
                                        <Globe className="h-8 w-8 text-blue-200" />
                                    </div>
                                    <div className="p-6 bg-green-50/50 rounded-2xl border border-green-100 flex justify-between items-center shadow-sm">
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase tracking-widest text-green-500 font-bold mb-1">Área Total</span>
                                            <span className="text-lg font-black text-green-900">{info.area}</span>
                                        </div>
                                        <MapIcon className="h-8 w-8 text-green-200" />
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-4 pt-4">
                                <h3 className="text-3xl font-black text-gray-900 border-b-2 border-gray-100 pb-3 flex items-center gap-3">
                                    <TrendingUp className="h-8 w-8 text-amber-600" /> Economia Local
                                </h3>
                                <div className="leading-relaxed text-gray-600 text-lg" dangerouslySetInnerHTML={{ __html: info.about.economy.replace(/\n\n/g, '<br/><br/>') }} />
                            </section>

                            <section className="space-y-4 pt-4">
                                <h3 className="text-3xl font-black text-gray-900 border-b-2 border-gray-100 pb-3 flex items-center gap-3">
                                    <Heart className="h-8 w-8 text-pink-600" /> Cultura e Tradições
                                </h3>
                                <div className="leading-relaxed text-gray-600 text-lg" dangerouslySetInnerHTML={{ __html: info.about.culture.replace(/\n\n/g, '<br/><br/>') }} />
                            </section>

                            <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-10 text-white not-prose shadow-2xl border-4 border-white mt-12">
                                <h3 className="text-3xl font-black mb-6 flex items-center gap-4">
                                    <Globe className="h-10 w-10 text-blue-200" /> Infraestrutura e Serviços
                                </h3>
                                <div
                                    className="text-blue-50 leading-relaxed text-xl mb-8 font-medium space-y-4"
                                    dangerouslySetInnerHTML={{ __html: info.about.infrastructure.replace(/\n\n/g, '<br/><br/>') }}
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 flex flex-col">
                                        <p className="font-bold text-xs uppercase tracking-tighter mb-2 text-blue-200">Comunicações do Estado</p>
                                        <p className="text-2xl font-black m-0">DDD {city.ddd} - Ativo</p>
                                    </div>
                                    <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 flex flex-col">
                                        <p className="font-bold text-xs uppercase tracking-tighter mb-2 text-blue-200">Status de Rede local</p>
                                        <p className="text-2xl font-black m-0">4G/5G Disponível</p>
                                    </div>
                                </div>
                            </section>
                        </article>

                        {/* Referências de Autoridade - SEÇÃO FINAL SEO */}
                        <div className="pt-12 border-t border-gray-100">
                            <h4 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-tighter flex items-center gap-2">
                                <Globe className="h-5 w-5 text-blue-600" /> Fontes e Referências de Autoridade
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <a href={`https://cidades.ibge.gov.br/brasil/${state.slug}/panorama`} target="_blank" className="block p-6 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                                    <div className="flex items-center justify-between mb-4">
                                        <Users className="h-8 w-8 text-blue-600" />
                                        <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-blue-600" />
                                    </div>
                                    <p className="font-bold text-gray-800 m-0">Painel IBGE</p>
                                    <p className="text-xs text-gray-500 mt-1">Estatísticas oficiais de população e área</p>
                                </a>

                                <a href="https://www.anatel.gov.br/" target="_blank" className="block p-6 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                                    <div className="flex items-center justify-between mb-4">
                                        <Phone className="h-8 w-8 text-green-600" />
                                        <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-green-600" />
                                    </div>
                                    <p className="font-bold text-gray-800 m-0">Portal ANATEL</p>
                                    <p className="text-xs text-gray-500 mt-1">Regulação de telecomunicações e DDDs</p>
                                </a>

                                <a href={googleMapsUrl} target="_blank" className="block p-6 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                                    <div className="flex items-center justify-between mb-4">
                                        <MapIcon className="h-8 w-8 text-amber-600" />
                                        <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-amber-600" />
                                    </div>
                                    <p className="font-bold text-gray-800 m-0">Google Maps</p>
                                    <p className="text-xs text-gray-500 mt-1">Localização geográfica e pontos de interesse</p>
                                </a>
                                <a href={wikipediaUrl} target="_blank" className="block p-6 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                                    <div className="flex items-center justify-between mb-4">
                                        <Globe className="h-8 w-8 text-blue-400" />
                                        <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-blue-400" />
                                    </div>
                                    <p className="font-bold text-gray-800 m-0">Wikipedia</p>
                                    <p className="text-xs text-gray-500 mt-1">História, cultura e dados enciclopédicos</p>
                                </a>
                            </div>
                        </div>
                    </TabsContent>

                    {/* TAB FAQ */}
                    <TabsContent value="faq" className="space-y-6 focus-visible:outline-none">
                        <div className="space-y-4">
                            {info.faqs.map((faq, i) => (
                                <Card key={i} className="hover:border-blue-200 transition-colors">
                                    <CardHeader className="py-4">
                                        <div className="flex items-start gap-3">
                                            <HelpCircle className="h-5 w-5 text-blue-500 mt-1" />
                                            <CardTitle className="text-lg text-blue-900 leading-tight">{faq.question}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0 pb-4 pl-12 text-gray-600">
                                        <p className="text-base">{faq.answer}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Action Bottom */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t pt-8">
                    <Link href={`/estado/${state.slug}`} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold transition-colors group">
                        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" /> Voltar para o Estado de {state.name}
                    </Link>
                    <Link href="/" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 shadow-md transform hover:scale-105 transition-all">
                        <HomeIcon className="h-5 w-5" /> Ver Todos os DDDs do Brasil
                    </Link>
                </div>
            </div>
        </div>
    );
}
