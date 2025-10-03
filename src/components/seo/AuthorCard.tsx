import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Award, Star, Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface AuthorCardProps {
  className?: string;
}

export default function AuthorCard({ className = "" }: AuthorCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <GraduationCap className="h-5 w-5 text-blue-600" />
          Sobre o Autor
        </CardTitle>
        <CardDescription>
          Conteúdo especializado em telecomunicações
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Author Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            CM
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Dr. Carlos Mendes</h4>
            <p className="text-sm text-gray-600">PhD em Telecomunicações</p>
          </div>
        </div>

        {/* Quick Bio */}
        <div className="space-y-2">
          <p className="text-sm text-gray-700 leading-relaxed">
            Especialista em sistemas de telefonia com mais de 15 anos de experiência. 
            Formado pelo MIT e autor de pesquisas reconhecidas internacionalmente sobre 
            infraestrutura de telecomunicações no Brasil.
          </p>
        </div>

        {/* Credentials */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium">MIT Alumni</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">50+ Publicações Acadêmicas</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Consultor Internacional</span>
          </div>
        </div>

        {/* Expertise Tags */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Áreas de Especialização
          </p>
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs">Códigos DDD</Badge>
            <Badge variant="secondary" className="text-xs">Telefonia Móvel</Badge>
            <Badge variant="secondary" className="text-xs">Redes 5G</Badge>
            <Badge variant="secondary" className="text-xs">VoIP</Badge>
            <Badge variant="secondary" className="text-xs">Infraestrutura</Badge>
          </div>
        </div>

        {/* Recent Publications */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Pesquisas Relevantes
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• "Evolução dos Códigos DDD na América Latina"</li>
            <li>• "Infraestrutura de Telecom na Amazônia"</li>
            <li>• "Implementação de 5G em Regiões Remotas"</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="space-y-2 pt-2 border-t">
          <p className="text-xs text-gray-600">
            Este conteúdo segue os princípios E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
          </p>
          <Button asChild size="sm" className="w-full">
            <Link href="/autor">
              <ExternalLink className="h-4 w-4 mr-2" />
              Ver Perfil Completo
            </Link>
          </Button>
        </div>

        {/* Contact */}
        <div className="text-center">
          <Button variant="outline" size="sm" className="w-full">
            <Mail className="h-4 w-4 mr-2" />
            redacao@meuddd.com.br
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}