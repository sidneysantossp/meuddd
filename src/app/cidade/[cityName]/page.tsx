import { notFound } from "next/navigation";
import { Metadata } from "next";
import { brazilianStates } from "@/data/states";
import { cityDetailedData } from "@/data/cityDetailedInfo";
import { normalizeCitySlug } from "@/lib/utils/normalization";
import { CityHero } from "@/components/city-hero";
import { CityDetails } from "@/components/city-details";

export async function generateStaticParams() {
    const params: { cityName: string }[] = [];

    // Pre-generate slugs for all cities in all states
    brazilianStates.forEach(state => {
        state.cities.forEach(city => {
            params.push({
                cityName: normalizeCitySlug(city.name)
            });
        });
    });

    return params;
}

interface CityPageProps {
    params: Promise<{
        cityName: string;
    }>;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
    const { cityName: slug } = await params;

    let foundCity = null;
    let foundState = null;

    for (const state of brazilianStates) {
        const city = state.cities.find(c => normalizeCitySlug(c.name) === slug);
        if (city) {
            foundCity = city;
            foundState = state;
            break;
        }
    }

    if (!foundCity || !foundState) {
        return {
            title: "Cidade não encontrada",
        };
    }

    return {
        title: `DDD ${foundCity.ddd} em ${foundCity.name}, ${foundState.abbreviation} | Consulta Completa`,
        description: `Tudo sobre o DDD ${foundCity.ddd} em ${foundCity.name}. Confira operadoras, como ligar, informações da cidade e dados úteis do estado de ${foundState.name}.`,
        openGraph: {
            title: `DDD ${foundCity.ddd} em ${foundCity.name} - Guia Completo`,
            description: `Consulta completa do DDD ${foundCity.ddd} do ${foundCity.name}. Todas as cidades, informações de discagem e operadoras.`,
            type: "website",
            locale: "pt_BR",
            images: [
                {
                    url: `/images/ddd-${foundCity.ddd}-${foundState.abbreviation.toLowerCase()}.jpg`,
                    width: 1200,
                    height: 630,
                    alt: `DDD ${foundCity.ddd} em ${foundCity.name} - Guia Completo`
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: `DDD ${foundCity.ddd} em ${foundCity.name} - Guia Completo`,
            description: `Consulta completa do DDD ${foundCity.ddd} do ${foundCity.name}. Todas as cidades e informações.`,
            images: [`/images/ddd-${foundCity.ddd}-${foundState.abbreviation.toLowerCase()}.jpg`]
        },
        alternates: {
            canonical: `/cidade/${slug}`
        }
    };
}

export default async function CityPage({ params }: CityPageProps) {
    const { cityName: slug } = await params;

    let foundCity = null;
    let foundState = null;

    for (const state of brazilianStates) {
        const city = state.cities.find(c => normalizeCitySlug(c.name) === slug);
        if (city) {
            foundCity = city;
            foundState = state;
            break;
        }
    }

    if (!foundCity || !foundState) {
        notFound();
    }

    const cityInfo = cityDetailedData[slug];

    return (
        <div className="min-h-screen bg-background">
            <CityHero city={foundCity} state={foundState} />
            <div className="container mx-auto px-4 py-8">
                <CityDetails city={foundCity} state={foundState} detailInfo={cityInfo} />
            </div>
        </div>
    );
}
