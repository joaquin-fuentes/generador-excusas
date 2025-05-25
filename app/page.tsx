"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, FileX, Coffee, Zap, RefreshCw, Share2, Laugh, AlertTriangle, Heart, Star } from "lucide-react"

const excuseCategories = {
  "Llegar Tarde": {
    icon: Clock,
    color: "bg-red-coral",
    excuses: [
      "Mi gato se sentó en el teclado y cambió mi alarma a chino mandarín",
      "Tuve que ayudar a una abuela a cruzar la calle... tres veces porque se confundía",
      "Mi café se derramó y formó un mapa del tesoro que tuve que seguir",
      "El GPS me llevó a 1987 y tuve que encontrar el camino de vuelta",
      "Mi vecino estaba practicando ópera y no podía salir sin aplaudir",
      "Un unicornio bloqueó mi entrada y solo se movía con cumplidos sinceros",
      "Mi sombra se rebeló y tuve que negociar con ella por 20 minutos",
    ],
  },
  "No Entregar Trabajo": {
    icon: FileX,
    color: "bg-yellow-vibrant",
    excuses: [
      "Mi computadora desarrolló sentimientos y se negó a trabajar los lunes",
      "Un hacker muy educado borró mi archivo pero dejó una nota de disculpas",
      "Mi documento fue secuestrado por un virus que pedía rescate en memes",
      "La inteligencia artificial de mi laptop decidió tomarse vacaciones",
      "Mi archivo se enamoró de otro documento y se fugaron juntos",
      "Un fantasma digital poseyó mi USB y ahora solo habla en binario",
      "Mi trabajo fue tan bueno que se ascendió solo y ya no trabaja para mí",
    ],
  },
  "Faltar a Reunión": {
    icon: Coffee,
    color: "bg-green-lime",
    excuses: [
      "Estaba atrapado en una conversación filosófica con mi planta",
      "Mi calendario se sincronizó con el tiempo marciano por error",
      "Tuve que mediar en una disputa entre dos palomas muy tercas",
      "Mi conexión a internet se fue de vacaciones sin avisarme",
      "Estaba practicando telepatía y pensé que ya había asistido mentalmente",
      "Mi clon malvado asistió en mi lugar pero no tomó notas",
      "Quedé atrapado en un bucle temporal y viví la misma hora 47 veces",
    ],
  },
  "Problemas Técnicos": {
    icon: Zap,
    color: "bg-blue-light",
    excuses: [
      "Mi computadora está en huelga por mejores condiciones laborales",
      "Los electrones de mi dispositivo decidieron reorganizarse alfabéticamente",
      "Mi WiFi fue abducido por aliens con mejor tecnología",
      "Mi teclado solo escribe en emoji y no encuentro el traductor",
      "La gravedad afectó mis cables de manera muy específica",
      "Mi pantalla desarrolló timidez y solo muestra cosas cuando no la miro",
      "Los bits de mi archivo se dispersaron y están jugando al escondite",
    ],
  },
}

const funnyReactions = [
  "¡Genial! 😂",
  "¡Épico! 🎭",
  "¡Brillante! ✨",
  "¡Increíble! 🤯",
  "¡Perfecto! 👌",
  "¡Magistral! 🎪",
]

export default function ExcuseGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [currentExcuse, setCurrentExcuse] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showReaction, setShowReaction] = useState(false)
  const [reaction, setReaction] = useState("")

  const generateExcuse = (category: string) => {
    setIsGenerating(true)
    setSelectedCategory(category)

    setTimeout(() => {
      const excuses = excuseCategories[category as keyof typeof excuseCategories].excuses
      const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)]
      setCurrentExcuse(randomExcuse)
      setIsGenerating(false)

      // Show reaction
      const randomReaction = funnyReactions[Math.floor(Math.random() * funnyReactions.length)]
      setReaction(randomReaction)
      setShowReaction(true)
      setTimeout(() => setShowReaction(false), 2000)
    }, 1500)
  }

  const shareExcuse = async () => {
    if (navigator.share && currentExcuse) {
      try {
        await navigator.share({
          title: "Excusa Épica 😂",
          text: `"${currentExcuse}" - Generado por el Simulador de Excusas`,
          url: window.location.href,
        })
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(`"${currentExcuse}" - Generado por el Simulador de Excusas`)
      }
    } else if (currentExcuse) {
      navigator.clipboard.writeText(`"${currentExcuse}" - Generado por el Simulador de Excusas`)
    }
  }

  return (
    <div className="min-h-screen bg-paper-beige p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-bold text-main-dark mb-4 transform hover:scale-105 transition-transform duration-300">
            🎭 Simulador de Excusas
          </h1>
          <div className="absolute -top-2 -right-2 animate-bounce">
            <Star className="w-8 h-8 text-yellow-vibrant fill-current" />
          </div>
        </div>
        <p className="text-lg md:text-xl text-main-dark/80 mb-6 font-medium">
          Genera excusas épicas y semi-creíbles para cualquier situación 😄
        </p>
        <div className="flex justify-center items-center gap-2 text-main-dark/60">
          <Heart className="w-5 h-5 text-red-coral fill-current animate-pulse" />
          <span>Perfecto para reírse con amigos</span>
          <Laugh className="w-5 h-5 text-green-lime" />
        </div>
      </div>

      {/* Category Selection */}
      <div className="max-w-4xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-main-dark mb-6 text-center">🎯 Elige tu situación</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(excuseCategories).map(([category, data]) => {
            const IconComponent = data.icon
            return (
              <Card
                key={category}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 ${
                  selectedCategory === category
                    ? "border-main-dark shadow-lg scale-105"
                    : "border-main-dark/20 hover:border-main-dark/40"
                } bg-white/90 backdrop-blur-sm`}
                onClick={() => generateExcuse(category)}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${data.color} rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform hover:rotate-12`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-main-dark mb-2">{category}</h3>
                  <p className="text-sm text-main-dark/70">Click para generar</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Excuse Display */}
      {(currentExcuse || isGenerating) && (
        <div className="max-w-3xl mx-auto mb-8">
          <Card className="border-2 border-main-dark/20 bg-white/95 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="w-6 h-6 text-yellow-vibrant" />
                <CardTitle className="text-xl text-main-dark">Tu Excusa Épica</CardTitle>
                <AlertTriangle className="w-6 h-6 text-yellow-vibrant" />
              </div>
              {selectedCategory && (
                <Badge variant="secondary" className="bg-red-coral text-white">
                  {selectedCategory}
                </Badge>
              )}
            </CardHeader>
            <CardContent className="text-center">
              {isGenerating ? (
                <div className="flex flex-col items-center gap-4 py-8">
                  <RefreshCw className="w-12 h-12 text-blue-light animate-spin" />
                  <p className="text-lg text-main-dark animate-pulse">Generando excusa épica...</p>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-blue-light rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <blockquote className="text-lg md:text-xl text-main-dark font-medium leading-relaxed italic border-l-4 border-red-coral pl-4 py-2">
                    "{currentExcuse}"
                  </blockquote>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                      onClick={() => generateExcuse(selectedCategory)}
                      className="bg-green-lime hover:bg-green-lime/90 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <RefreshCw className="w-5 h-5 mr-2" />
                      Otra Excusa
                    </Button>

                    <Button
                      onClick={shareExcuse}
                      variant="outline"
                      className="border-2 border-blue-light text-blue-light hover:bg-blue-light hover:text-white font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      Compartir
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reaction Animation */}
      {showReaction && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="text-4xl font-bold text-red-coral animate-bounce bg-white/90 px-6 py-3 rounded-full shadow-lg border-2 border-red-coral">
            {reaction}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-4xl mx-auto text-center mt-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-main-dark/10">
          <p className="text-main-dark/70 mb-4">
            💡 <strong>Tip:</strong> Estas excusas son para diversión entre amigos. ¡Úsalas con responsabilidad!
          </p>
          <div className="flex justify-center items-center gap-4 text-sm text-main-dark/60">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-red-coral fill-current animate-pulse" />
            <span>y mucho humor</span>
            <Laugh className="w-4 h-4 text-green-lime" />
          </div>
        </div>
      </div>
    </div>
  )
}
