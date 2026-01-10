import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, Home, MapPin, CheckCircle, Mic, Zap, BookOpen, Info, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigationItems = [
  { name: 'Início', path: '/', icon: Home },
  { name: 'Estados', path: '/estados', icon: MapPin },
  { name: 'Validar DDD', path: '/validar', icon: CheckCircle },
  { name: 'Busca por Voz', path: '/busca-voz', icon: Mic },
  { name: 'Gerador', path: '/gerador-numeros', icon: Zap },
  { name: 'Blog', path: '/blog', icon: BookOpen },
  { name: 'Sobre', path: '/sobre', icon: Info },
  { name: 'Contato', path: '/contato', icon: Mail },
];

export default function Header() {
  const location = useLocation();

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`${
              mobile 
                ? 'flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-muted transition-colors' 
                : 'inline-block'
            } text-foreground hover:text-primary transition-colors font-medium ${
              location.pathname === item.path ? 'text-primary bg-muted' : ''
            }`}
          >
            {mobile && <Icon className="h-5 w-5" />}
            <span>{item.name}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm" role="banner">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="MEU DDD - Página Inicial">
            <div className="bg-primary p-2 rounded-lg">
              <Phone className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">MEU DDD</div>
              <p className="text-xs text-muted-foreground">Códigos DDD do Brasil</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav id="navigation" className="hidden xl:flex items-center gap-6" role="navigation" aria-label="Navegação principal">
            <NavLinks />
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="xl:hidden">
              <Button variant="outline" size="icon" aria-label="Abrir menu de navegação">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-2 mt-8" role="navigation" aria-label="Menu de navegação móvel">
                <NavLinks mobile />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
