import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/common/SEOHead';
import { contactPageSEO } from '@/data/seoData';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import MainLayout from '@/components/layouts/MainLayout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { submitContactMessage } from '@/db/api';

// Schema de validação do formulário
const contactFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').max(100, 'Nome muito longo'),
  email: z.string().email('Email inválido').max(100, 'Email muito longo'),
  subject: z.string().min(5, 'Assunto deve ter pelo menos 5 caracteres').max(200, 'Assunto muito longo'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres').max(1000, 'Mensagem muito longa'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Garantir que todos os campos estão preenchidos
      const messageData = {
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      };

      const { data, error } = await submitContactMessage(messageData);

      if (error) {
        setSubmitError(error.message);
        return;
      }

      if (data) {
        setSubmitSuccess(true);
        form.reset();
        
        // Limpar mensagem de sucesso após 5 segundos
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }
    } catch (err) {
      setSubmitError('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <MainLayout>
      <SEOHead {...contactPageSEO} />
      <div className="py-8 xl:py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Page Header */}
          <div className="text-center mb-8 xl:mb-12">
            <h1 className="text-3xl xl:text-4xl font-bold text-foreground mb-4 max-sm:text-2xl">
              Entre em Contato
            </h1>
            <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
              Tem dúvidas ou sugestões? Estamos aqui para ajudar!
            </p>
          </div>

          {/* Contact Cards - 2 cards in a row on desktop */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8 xl:mb-12">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 xl:p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Mail className="h-8 w-8 xl:h-10 xl:w-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg xl:text-xl font-bold text-foreground mb-2 max-sm:text-base">
                  Email
                </h3>
                <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                  contato@meuddd.com.br
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 xl:p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-accent/10 p-4 rounded-full">
                    <MapPin className="h-8 w-8 xl:h-10 xl:w-10 text-accent" />
                  </div>
                </div>
                <h3 className="text-lg xl:text-xl font-bold text-foreground mb-2 max-sm:text-base">
                  Localização
                </h3>
                <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                  São Paulo, SP - Brasil
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="shadow-lg mb-8">
            <CardContent className="p-6 xl:p-8">
              <h2 className="text-xl xl:text-2xl font-bold text-foreground mb-6 max-sm:text-lg">
                Envie sua Mensagem
              </h2>

              {/* Success Message */}
              {submitSuccess && (
                <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm xl:text-base font-medium text-foreground">
                      Mensagem enviada com sucesso!
                    </p>
                    <p className="text-xs xl:text-sm text-muted-foreground mt-1">
                      Obrigado pelo contato. Responderemos em breve.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitError && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm xl:text-base text-destructive">
                    {submitError}
                  </p>
                </div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Nome */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm xl:text-base">Nome Completo</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Seu nome completo"
                              {...field}
                              disabled={isSubmitting}
                              className="text-sm xl:text-base"
                            />
                          </FormControl>
                          <FormMessage className="text-xs xl:text-sm" />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm xl:text-base">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="seu@email.com"
                              {...field}
                              disabled={isSubmitting}
                              className="text-sm xl:text-base"
                            />
                          </FormControl>
                          <FormMessage className="text-xs xl:text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Assunto */}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm xl:text-base">Assunto</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Sobre o que você gostaria de falar?"
                            {...field}
                            disabled={isSubmitting}
                            className="text-sm xl:text-base"
                          />
                        </FormControl>
                        <FormMessage className="text-xs xl:text-sm" />
                      </FormItem>
                    )}
                  />

                  {/* Mensagem */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm xl:text-base">Mensagem</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Digite sua mensagem aqui..."
                            className="min-h-[150px] resize-none text-sm xl:text-base"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-xs xl:text-sm" />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full xl:w-auto text-sm xl:text-base"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                Perguntas Frequentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-base xl:text-lg font-bold text-foreground mb-2 max-sm:text-sm">
                  Como faço para encontrar o DDD de uma cidade?
                </h3>
                <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                  Você pode usar a busca na página inicial digitando o nome da cidade, ou navegar pela 
                  página de Estados e encontrar o estado correspondente para ver todas as cidades e seus DDDs.
                </p>
              </div>

              <div>
                <h3 className="text-base xl:text-lg font-bold text-foreground mb-2 max-sm:text-sm">
                  Os códigos DDD estão atualizados?
                </h3>
                <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                  Sim! Nossa base de dados é mantida atualizada com todos os códigos DDD oficiais do Brasil, 
                  incluindo as mudanças mais recentes implementadas pela Anatel.
                </p>
              </div>

              <div>
                <h3 className="text-base xl:text-lg font-bold text-foreground mb-2 max-sm:text-sm">
                  Posso usar a busca por voz em qualquer navegador?
                </h3>
                <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                  A busca por voz funciona melhor nos navegadores Chrome, Edge e Safari. Certifique-se de 
                  permitir o acesso ao microfone quando solicitado.
                </p>
              </div>

              <div>
                <h3 className="text-base xl:text-lg font-bold text-foreground mb-2 max-sm:text-sm">
                  O gerador de números cria números reais?
                </h3>
                <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                  Não. O gerador cria números de exemplo aleatórios apenas para fins de teste e demonstração. 
                  Estes números podem ou não existir na realidade.
                </p>
              </div>

              <div>
                <h3 className="text-base xl:text-lg font-bold text-foreground mb-2 max-sm:text-sm">
                  Como posso sugerir melhorias para a plataforma?
                </h3>
                <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                  Adoraríamos ouvir suas sugestões! Entre em contato conosco através do email 
                  contato@meuddd.com.br com suas ideias e feedback.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Support Message */}
          <Card className="shadow-lg bg-primary text-primary-foreground">
            <CardContent className="p-6 xl:p-8 text-center">
              <h2 className="text-xl xl:text-2xl font-bold mb-4 max-sm:text-lg">
                Precisa de Ajuda?
              </h2>
              <p className="text-sm xl:text-base mb-6 max-sm:text-xs">
                Nossa equipe está pronta para responder suas dúvidas e ajudar você a encontrar 
                as informações que precisa sobre códigos DDD do Brasil.
              </p>
              <p className="text-base xl:text-lg font-medium max-sm:text-sm">
                Horário de atendimento: Segunda a Sexta, 9h às 18h
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
