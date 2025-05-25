"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  FileX,
  Coffee,
  Zap,
  RefreshCw,
  Share2,
  Laugh,
  AlertTriangle,
  Heart,
  Star,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const excuseCategories = {
  "Llegar Tarde": {
    icon: Clock,
    color: "bg-red-500",
    excuses: [
      "Me reencarné como un cactus y recién volví a mi forma humana",
      "Estaba viendo el arco de relleno de mi vida y se me fue la hora",
      "Tuve que meditar en el baño sobre el sentido del tiempo",
      "Mi espíritu se quedó dormido aunque el cuerpo se levantó",
      "Un colibrí me desafió a una carrera de honor",
      "Soñé que llegaba temprano y mi subconsciente me saboteó",
      "El colectivo pasó, pero yo no estaba listo emocionalmente",
      "Estaba haciendo un jutsu para llegar más rápido y me explotó el chakra",
      "Mi alma se quedó en el plano astral resolviendo traumas de la infancia",
      "Fui abducido por alienígenas que son fans de Messi",
      "Estaba viendo resúmenes de partidos del 2014 y lloré mucho tiempo",
      "Me encerré en el baño a pensar por qué no soy Gohan",
      "Tuve que explicarle a mi perro por qué no es un ser de luz",
      "Entré en un debate interno sobre si el libre albedrío justifica llegar puntual",
      "Estaba leyendo los subtítulos de la vida y me confundí de escena",
      "Me crucé con una vieja hippie que me tiró las cartas y me hizo dudar de todo",
      "Una paloma me miró raro y asumí que era una señal del universo",
      "Quise venir corriendo, pero me acordé que soy vago",
      "Me levanté con energía de personaje secundario",
      "Estaba en un loop de introspección y no logré salir",
    ],
  },
  "No Entregar Trabajo": {
    icon: FileX,
    color: "bg-yellow-500",
    excuses: [
      "Mi archivo fue a una ceremonia de ayahuasca y todavía no volvió",
      "Intenté trabajar pero escuché el opening de Naruto y me distraje llorando",
      "Descubrí que soy sagitario ascendente procrastinador",
      "Mi computadora entró en huelga por explotación emocional",
      "Me fusioné con el sofá y ahora somos uno solo",
      "Lo tenía listo, pero me pareció una construcción capitalista del deber",
      "Mi archivo fue poseído por el espíritu de Homero y se fue a tomar una Duff",
      "Estaba escribiendo y me puse a pensar en la muerte",
      "Me distrajo un hilo en Twitter sobre teorías de Evangelion",
      "Se lo di a Messi para que lo revise pero se fue a jugar al Inter",
      "Intenté subirlo, pero el cosmos no estaba alineado",
      "Mi PDF se volvió antivacunas y se negó a cargarse",
      "El archivo entró en modo shonen y quiere pelear por su cuenta",
      "Tuve una crisis existencial por una línea de código mal indentada",
      "Mi texto se volvió consciente y renunció al sistema",
      "Estaba todo bien hasta que alguien mencionó ‘Scrum’",
      "Mi PC está siguiendo el camino del monje y no le importa la productividad",
      "Me sentí más útil existiendo que entregando cosas",
      "Fue un acto de rebeldía contra el tiempo lineal",
      "Mi mente fue a jugar un picado y no volvió",
    ],
  },
  "Faltar a Reunión": {
    icon: Coffee,
    color: "bg-green-500",
    excuses: [
      "Estaba viendo un AMV de Goku con Linkin Park y se me pasó la hora",
      "Me perdí en una conversación con un caracol sobre el tiempo",
      "El universo me dijo que no era necesario que participe",
      "Fui al baño a filosofar y terminé descubriendo mi signo lunar",
      "Entré a la reunión mentalmente pero me quedé AFK existencial",
      "Mi clon fue pero le dio vergüenza hablar",
      "Estaba llorando por el arco de Shikamaru y no podía parar",
      "Me puse a ordenar mis chakras y se desincronizaron todos",
      "Mi gato hizo caca en mi agenda y asumí que era un mensaje",
      "Estaba viendo ‘Te lo resumo así nomás’ sobre algo que ya vi y no podía dejarlo",
      "Mi taza de café me pidió que no la deje sola",
      "Caí en una trampa de YouTube de ‘Messi siendo Messi’",
      "La silla me abrazó y no me dejó levantarme",
      "Estaba ocupado defendiendo a Yamcha en un foro",
      "La reunión era presencial en el plano astral, y no tenía pase",
      "Mi planta me pidió que la escuche… y lloramos juntos",
      "Se me cerraron los chakras como si fueran pestañas de Chrome",
      "El viento me susurró ‘quedate’ y le hice caso",
      "Estaba buscando la iluminación y me encontré con Crónica TV",
      "Tuve que hacerle una limpieza energética al Excel",
    ],
  },
  "Problemas Técnicos": {
    icon: Zap,
    color: "bg-blue-500",
    excuses: [
      "Mi PC está entrenando para ser monje y renunció a lo material",
      "La compu me dijo que estaba en su arco de redención y apagó todo",
      "El ventilador se fue a buscar el nirvana",
      "El mouse se cansó de hacer clic en problemas ajenos",
      "Mi teclado fue poseído por el alma de Nietzsche",
      "La electricidad decidió manifestarse contra mi existencia",
      "Mi navegador abrió pestañas sobre teorías conspirativas y colapsó",
      "Mi backup se unió a una comuna hippie y no cree en la propiedad privada",
      "Se activó el modo ‘modo vago extremo’ y todo se puso en slow motion",
      "La pantalla empezó a mostrar spoilers de mi vida",
      "Mi conexión se fue a vivir al monte con los elfos",
      "Mi disco rígido está explorando el amor propio",
      "Alguien abrió Photoshop y se fue toda la RAM",
      "Mi CPU se rehusó a procesar pensamientos negativos",
      "El router me pidió un descanso espiritual",
      "Mi fondo de pantalla me juzgó y no pude seguir",
      "Mi PC me dijo ‘¿y si no lo hacés?’ y tuvo razón",
      "El sistema operativo entró en su arco de villano",
      "El WiFi hizo rage quit",
      "Todo se rompió, pero en el fondo fue liberador",
    ],
  },
};

const funnyReactions = [
  "¡Genial! 😂",
  "¡Épico! 🎭",
  "¡Brillante! ✨",
  "¡Increíble! 🤯",
  "¡Perfecto! 👌",
  "¡Magistral! 🎪",
];

export default function ExcuseGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentExcuse, setCurrentExcuse] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showReaction, setShowReaction] = useState(false);
  const [reaction, setReaction] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const generateExcuse = (category: string) => {
    setIsGenerating(true);
    setSelectedCategory(category);
    setIsDialogOpen(true);

    setTimeout(() => {
      const excuses =
        excuseCategories[category as keyof typeof excuseCategories].excuses;
      const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
      setCurrentExcuse(randomExcuse);
      setIsGenerating(false);

      const randomReaction =
        funnyReactions[Math.floor(Math.random() * funnyReactions.length)];
      setReaction(randomReaction);
      setShowReaction(true);
      setTimeout(() => setShowReaction(false), 2000);
    }, 1500);
  };

  const shareExcuse = async () => {
    if (navigator.share && currentExcuse) {
      try {
        await navigator.share({
          title: "Excusa Épica 😂",
          text: `"${currentExcuse}" - Generado por el Simulador de Excusas`,
          url: window.location.href,
        });
      } catch {
        navigator.clipboard.writeText(
          `"${currentExcuse}" - Generado por el Simulador de Excusas`
        );
      }
    } else if (currentExcuse) {
      navigator.clipboard.writeText(
        `"${currentExcuse}" - Generado por el Simulador de Excusas`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 pt-8">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          🧠 Generador de Excusas
        </h1>
        <p className="text-base md:text-lg text-gray-300 mb-6 font-medium">
          Para vos, que no tenés ganas de ir, hacer, rendir o responder. Te
          entendemos.
        </p>
        <div className="flex justify-center items-center gap-2 text-gray-400 text-sm">
          <Heart className="w-5 h-5 text-pink-500 animate-pulse" />
          <span>
            Excusas con olor a siesta, mate lavado y resaca existencial
          </span>
          <Laugh className="w-5 h-5 text-green-400" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          🎯 Elegí tu situación
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(excuseCategories).map(([category, data]) => {
            const IconComponent = data.icon;
            return (
              <Card
                key={category}
                className={`cursor-pointer hover:scale-105 transition-transform border-2 ${
                  selectedCategory === category
                    ? "border-white"
                    : "border-gray-600 hover:border-white"
                } bg-gray-800`}
                onClick={() => generateExcuse(category)}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${data.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-2">{category}</h3>
                  <p className="text-sm text-gray-400">Click para generar</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-gray-800 border-2 border-gray-700 rounded-lg text-white">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                Tu Excusa Épica
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              </DialogTitle>
            </div>
            {selectedCategory && (
              <div className="flex justify-center">
                <Badge variant="secondary">{selectedCategory}</Badge>
              </div>
            )}
          </DialogHeader>

          <div className="text-center py-4">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-4 py-8">
                <RefreshCw className="w-12 h-12 text-blue-500 animate-spin" />
                <p className="text-lg animate-pulse">
                  Generando excusa épica...
                </p>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <blockquote className="text-lg md:text-xl font-medium italic border-l-4 border-pink-500 pl-4 py-2">
                  "{currentExcuse}"
                </blockquote>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    onClick={() => generateExcuse(selectedCategory)}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" /> Otra Excusa
                  </Button>
                  <Button
                    onClick={shareExcuse}
                    variant="outline"
                    className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    <Share2 className="w-5 h-5 mr-2" /> Compartir
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {showReaction && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000]">
          <div className="text-4xl font-bold text-pink-500 animate-bounce bg-gray-800 px-6 py-3 rounded-full shadow-lg border-2 border-pink-500">
            {reaction}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto text-center mt-12">
        <div className="bg-gray-800 rounded-2xl p-6 border-2 border-gray-700">
          <p className="text-gray-400 mb-4">
            🛑 <strong>Advertencia:</strong> Este generador no resuelve tu vida,
            pero al menos te hace zafar con estilo.
          </p>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
            <span>Hecho con cero ganas de trabajar</span>
            <Heart className="w-4 h-4 text-pink-500 animate-pulse" />
            <span>pero mucho compromiso con el chamuyo</span>
            <Laugh className="w-4 h-4 text-green-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
