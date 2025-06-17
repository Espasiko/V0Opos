import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckoutButton } from "@/components/checkout-button"
import {
  Brain,
  CheckCircle2,
  Star,
  Users,
  BookOpen,
  ClipboardList,
  Network,
  Sparkles,
  ArrowRight,
  FileText,
  MessageSquare,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "OposIA - Prepara tus oposiciones de Seguridad Social con IA",
  description:
    "Plataforma de preparación para oposiciones de Seguridad Social con Inteligencia Artificial. Temarios, tests, mapas mentales y más.",
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            <span className="text-xl font-bold">OposIA</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Características
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Testimonios
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Precios
            </Link>
            <Link href="#faq" className="text-sm font-medium text-muted-foreground hover:text-primary">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="#pricing">
              <Button size="sm">Empezar ahora</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 -z-10" />
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  ¡Nuevo en 2025! Tecnología de IA avanzada
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Prepara tus oposiciones de Seguridad Social con IA
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  OposIA revoluciona tu preparación con inteligencia artificial. Temarios personalizados, tests
                  adaptados a tu nivel y mapas mentales generados automáticamente.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link href="#pricing">
                    <Button size="lg" className="w-full sm:w-auto">
                      Empezar ahora
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Descubrir más
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Más de 5,000 opositores ya confían en nosotros</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center">
                    <div className="bg-white/90 dark:bg-gray-950/90 p-6 rounded-lg max-w-[80%] shadow-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">IA Generativa</h3>
                      </div>
                      <p className="text-sm mb-3">
                        "Genera un test sobre el Régimen General de la Seguridad Social con 10 preguntas de dificultad
                        media"
                      </p>
                      <div className="flex justify-end">
                        <Button size="sm">Generar</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y bg-muted/40">
          <div className="container py-12 md:py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">5,000+</h3>
                <p className="text-sm text-muted-foreground">Opositores activos</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">98%</h3>
                <p className="text-sm text-muted-foreground">Tasa de satisfacción</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">32</h3>
                <p className="text-sm text-muted-foreground">Temas completos</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">10,000+</h3>
                <p className="text-sm text-muted-foreground">Preguntas generadas</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Características principales
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                Descubre cómo OposIA revoluciona la preparación de oposiciones con tecnología de IA avanzada
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 h-20 w-20 bg-primary/10 rounded-bl-full" />
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Temario Inteligente</CardTitle>
                  <CardDescription>
                    Contenido actualizado automáticamente con las últimas normativas del BOE
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Actualización automática con IA</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Resúmenes personalizados</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Comparador de versiones</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 h-20 w-20 bg-primary/10 rounded-bl-full" />
                <CardHeader>
                  <ClipboardList className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Tests Adaptativos</CardTitle>
                  <CardDescription>Tests generados por IA que se adaptan a tu nivel de conocimiento</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Preguntas personalizadas</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Análisis de puntos débiles</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Explicaciones detalladas</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 h-20 w-20 bg-primary/10 rounded-bl-full" />
                <CardHeader>
                  <Network className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Mapas Mentales</CardTitle>
                  <CardDescription>Visualiza conceptos complejos con mapas generados automáticamente</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Generación automática</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Personalización intuitiva</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Exportación en múltiples formatos</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 h-20 w-20 bg-primary/10 rounded-bl-full" />
                <CardHeader>
                  <FileText className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Comparador de Leyes</CardTitle>
                  <CardDescription>
                    Compara diferentes versiones de leyes y normativas para identificar cambios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Detección automática de cambios</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Resaltado de diferencias</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Análisis de impacto</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 h-20 w-20 bg-primary/10 rounded-bl-full" />
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Comunidad Activa</CardTitle>
                  <CardDescription>Conecta con otros opositores y comparte recursos y experiencias</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Foros de discusión</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Intercambio de recursos</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Grupos de estudio</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 h-20 w-20 bg-primary/10 rounded-bl-full" />
                <CardHeader>
                  <Sparkles className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Asistente IA</CardTitle>
                  <CardDescription>
                    Resuelve dudas al instante con nuestro asistente de IA especializado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Respuestas precisas 24/7</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Explicaciones detalladas</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Generación de contenido</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Lo que dicen nuestros usuarios
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                Descubre cómo OposIA ha ayudado a miles de opositores a conseguir su plaza
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "María García",
                  role: "Opositora de Seguridad Social",
                  content:
                    "OposIA ha revolucionado mi forma de estudiar. Los tests adaptativos me han ayudado a identificar mis puntos débiles y mejorar rápidamente. ¡Aprobé a la primera!",
                  rating: 5,
                },
                {
                  name: "Carlos López",
                  role: "Opositor de Seguridad Social",
                  content:
                    "El comparador de leyes me ha ahorrado muchísimo tiempo. Antes tardaba horas en identificar los cambios en la normativa, ahora lo hago en minutos. Una herramienta imprescindible.",
                  rating: 5,
                },
                {
                  name: "Ana Martínez",
                  role: "Opositora de Seguridad Social",
                  content:
                    "Los mapas mentales generados por IA me han ayudado a entender conceptos complejos de forma visual. La comunidad es increíble, siempre encuentras ayuda cuando la necesitas.",
                  rating: 4,
                },
              ].map((testimonial, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-1 text-primary">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary" />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-sm sm:text-base">"{testimonial.content}"</blockquote>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-1 h-10 w-10 flex items-center justify-center">
                        <span className="text-primary font-bold">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Planes y precios</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                Elige el plan que mejor se adapte a tus necesidades
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
              <Card className="relative overflow-hidden border-primary/50">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                  Lista de espera
                </div>
                <CardHeader>
                  <CardTitle>Acceso Anticipado</CardTitle>
                  <CardDescription>Para opositores en nuestra lista de espera</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">20€</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Acceso completo a la plataforma</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Temario actualizado con IA</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Tests adaptativos ilimitados</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Mapas mentales personalizados</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Comparador de leyes</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Acceso a la comunidad</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <CheckoutButton isWaitlist={true} className="w-full">
                    Unirse con descuento
                  </CheckoutButton>
                </CardFooter>
              </Card>
              <Card className="relative overflow-hidden border-primary">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                  Popular
                </div>
                <CardHeader>
                  <CardTitle>Acceso Completo</CardTitle>
                  <CardDescription>Para todos los opositores</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">40€</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Acceso completo a la plataforma</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Temario actualizado con IA</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Tests adaptativos ilimitados</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Mapas mentales personalizados</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Comparador de leyes</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Acceso a la comunidad</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Asistente IA 24/7</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Soporte prioritario</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <CheckoutButton className="w-full">Comenzar ahora</CheckoutButton>
                </CardFooter>
              </Card>
            </div>
            <div className="mt-10 text-center">
              <p className="text-sm text-muted-foreground">
                ¿Tienes dudas?{" "}
                <Link href="#faq" className="text-primary hover:underline">
                  Consulta nuestras preguntas frecuentes
                </Link>{" "}
                o{" "}
                <Link href="#contact" className="text-primary hover:underline">
                  contáctanos
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Únete a nuestra lista de espera
                </h2>
                <p className="mt-4 text-primary-foreground/80 md:text-xl">
                  Sé de los primeros en acceder a OposIA y obtén un 50% de descuento en tu suscripción
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nombre
                    </label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      className="bg-white/20 border-white/30 placeholder:text-primary-foreground/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="bg-white/20 border-white/30 placeholder:text-primary-foreground/50"
                    />
                  </div>
                  <Button className="w-full bg-white text-primary hover:bg-white/90">
                    Unirse a la lista de espera
                  </Button>
                  <p className="text-xs text-primary-foreground/70 text-center">
                    Te enviaremos un email cuando tu acceso esté listo
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Preguntas frecuentes</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                Resolvemos tus dudas sobre OposIA
              </p>
            </div>
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>¿Cómo funciona la tecnología de IA de OposIA?</AccordionTrigger>
                  <AccordionContent>
                    OposIA utiliza modelos avanzados de inteligencia artificial para analizar el contenido del temario,
                    generar tests personalizados, crear mapas mentales y mantener actualizada la información con las
                    últimas normativas. Nuestra IA aprende de tus interacciones para ofrecerte un contenido cada vez más
                    adaptado a tus necesidades.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>¿Puedo cancelar mi suscripción en cualquier momento?</AccordionTrigger>
                  <AccordionContent>
                    Sí, puedes cancelar tu suscripción en cualquier momento desde tu perfil. No hay permanencia mínima
                    ni penalizaciones por cancelación. Podrás seguir utilizando OposIA hasta el final del período
                    facturado.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>¿Cómo se actualiza el contenido con las novedades del BOE?</AccordionTrigger>
                  <AccordionContent>
                    Nuestro sistema analiza diariamente las publicaciones del BOE y detecta automáticamente los cambios
                    relevantes para las oposiciones de Seguridad Social. La IA procesa esta información y actualiza el
                    temario, destacando los cambios y explicando su impacto en el contenido existente.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>¿Los tests generados por IA son fiables?</AccordionTrigger>
                  <AccordionContent>
                    Sí, nuestros tests son generados por modelos de IA entrenados específicamente con contenido de
                    oposiciones de Seguridad Social y validados por expertos en la materia. Además, el sistema aprende
                    continuamente para mejorar la calidad y precisión de las preguntas.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>¿Qué diferencia hay entre los dos planes?</AccordionTrigger>
                  <AccordionContent>
                    El plan de "Acceso Anticipado" está disponible exclusivamente para usuarios en nuestra lista de
                    espera y ofrece un 50% de descuento sobre el precio regular. Ambos planes incluyen acceso completo a
                    todas las funcionalidades de la plataforma, pero el plan regular incluye además soporte prioritario
                    y acceso ilimitado al asistente de IA.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>¿Cómo puedo obtener soporte técnico?</AccordionTrigger>
                  <AccordionContent>
                    Puedes contactar con nuestro equipo de soporte a través del chat en vivo disponible en la
                    plataforma, por email a soporte@oposia.com o mediante el formulario de contacto. Los usuarios del
                    plan regular disfrutan de soporte prioritario con tiempos de respuesta garantizados.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Prepárate para aprobar</h2>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              Únete a miles de opositores que ya confían en OposIA para preparar sus oposiciones
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <CheckoutButton className="w-full sm:w-auto">Comenzar ahora</CheckoutButton>
              <Link href="#features">
                <Button variant="outline" className="w-full sm:w-auto">
                  Descubrir más
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                ¿Necesitas ayuda?{" "}
                <Link href="#contact" className="text-primary hover:underline">
                  Contáctanos
                </Link>
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6" />
                <span className="text-xl font-bold">OposIA</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Plataforma de preparación para oposiciones de Seguridad Social con IA
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Plataforma</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-primary">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground hover:text-primary">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-muted-foreground hover:text-primary">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Términos de servicio
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} OposIA. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
