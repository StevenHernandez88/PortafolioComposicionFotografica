import { useState, useCallback } from "react";
import { Camera, X, ChevronLeft, ChevronRight, Aperture } from "lucide-react";

const images = [
  { src: "/img/imagen1.png", alt: "Imagen 1" },
  { src: "/img/imagen2.png", alt: "Imagen 2" },
  { src: "/img/imagen3.png", alt: "Imagen 3" },
  { src: "/img/imagen4.png", alt: "Imagen 4" },
  { src: "/img/imagen5.png", alt: "Imagen 5" },
];

function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      style={{ animation: "fade-in 0.3s ease-out" }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors p-2 z-10"
      >
        <X size={28} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 text-white/70 hover:text-white transition-colors p-2 z-10"
      >
        <ChevronLeft size={40} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 text-white/70 hover:text-white transition-colors p-2 z-10"
      >
        <ChevronRight size={40} />
      </button>
      <img
        src={images[index].src}
        alt={images[index].alt}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
        style={{ animation: "scale-in 0.35s ease-out" }}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute bottom-6 text-white/60 text-sm font-light tracking-wider">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}

function App() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(
    () =>
      setLightboxIndex((prev) =>
        prev !== null ? (prev - 1 + images.length) % images.length : null,
      ),
    [],
  );
  const goNext = useCallback(
    () =>
      setLightboxIndex((prev) =>
        prev !== null ? (prev + 1) % images.length : null,
      ),
    [],
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/40 via-neutral-950 to-emerald-900/30" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-400 mb-6">
            <Aperture size={14} />
            <span>Portafolio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extralight tracking-tight mb-4">
            <span className="bg-gradient-to-r from-sky-400 via-white to-emerald-400 bg-clip-text text-transparent">
              Conexiones Vacías
            </span>
          </h1>
          <p className="text-neutral-500 text-lg font-light max-w-md mx-auto leading-relaxed">
            La contradicción de vivir hiperconectados a través de pantallas, pero sintiéndonos profundamente solos.
            "La tecnología como metáfora de lo que falta y de lo que intentamos llenar."
          </p>
          <div className="mt-8 flex items-center justify-center gap-1.5">
            <Camera size={16} className="text-sky-500/60" />
            <span className="text-xs text-neutral-600 tracking-widest uppercase">
              5 fotografías
            </span>
          </div>
        </div>
      </header>

      {/* Gallery */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {images.map((img, i) => (
            <div
              key={i}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-neutral-900 transition-shadow duration-500 hover:shadow-lg hover:shadow-sky-500/5"
              onClick={() => openLightbox(i)}
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex items-center gap-2 text-white/90">
                    <Camera size={14} className="text-sky-400" />
                    <span className="text-sm font-light tracking-wide">
                      {img.alt}
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 group-hover:ring-sky-500/30 transition-all duration-500" />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800/50">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-neutral-600 text-sm font-light tracking-wider">
            CONEXIONES VACÍAS
          </span>
          <span className="text-neutral-700 text-xs">
            Todos los derechos reservados
          </span>
        </div>
      </footer>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
}

export default App;
