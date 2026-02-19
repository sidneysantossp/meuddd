import { EstadosSection } from "@/components/estados-section";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Todos os DDDs por Estado | Lista Completa do Brasil | MEU DDD",
    description: "Consulte a lista completa de estados brasileiros e seus respectivos códigos DDD. Encontre rapidamente as informações que você precisa para cada região do Brasil.",
    keywords: ["DDD por estado", "lista de DDDs", "códigos telefônicos Brasil", "estados brasileiros DDD"],
};

export default function EstadosPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-8">
            <EstadosSection />
        </div>
    );
}
