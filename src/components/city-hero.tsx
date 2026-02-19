import Link from "next/link";
import { Phone, ChevronRight, Home } from "lucide-react";

interface CityHeroProps {
    city: {
        name: string;
        ddd: string;
    };
    state: {
        name: string;
        slug: string;
    };
}

export function CityHero({ city, state }: CityHeroProps) {
    return (
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 py-16 xl:py-24 text-white">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-blue-100/80 mb-6" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-white flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        Início
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href={`/${state.slug}`} className="hover:text-white">
                        {state.name}
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-white font-medium">{city.name}</span>
                </nav>

                {/* Hero Title */}
                <div className="text-center">
                    <h1 className="text-4xl xl:text-6xl font-bold mb-4 max-sm:text-3xl">
                        DDD {city.ddd} em {city.name}
                    </h1>
                    <p className="text-lg xl:text-xl text-blue-50/90 mb-8 max-sm:text-base">
                        Cidade de {state.name} e seu código DDD completo
                    </p>
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full">
                        <Phone className="h-6 w-6 text-white" />
                        <span className="text-3xl xl:text-4xl font-bold max-sm:text-2xl">
                            {city.ddd}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
