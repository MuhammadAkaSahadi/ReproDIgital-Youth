"use client";

import * as React from "react";
import { Quote, User } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "Awalnya saya malu mau tanya soal perubahan fisik saya, tapi konselor sebayanya sangat ramah dan bikin saya nyaman cerita.",
    name: "Sinta",
    age: "16 tahun",
  },
  {
    quote: "Artikel-artikel di Edukasi sangat mudah dipahami. Mitos-mitos yang selama ini saya percaya ternyata salah semua!",
    name: "Budi",
    age: "17 tahun",
  },
  {
    quote: "Fitur Perencanaan Masa Depan sangat membantuku menentukan langkah studiku selanjutnya tanpa merasa tertekan.",
    name: "Rina",
    age: "18 tahun",
  },
  {
    quote: "Platform ini memberikan ruang yang aman untuk belajar tanpa dihakimi. Sangat direkomendasikan untuk semua remaja.",
    name: "Dito",
    age: "19 tahun",
  },
];

export function TestimonialsSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[28px] md:text-[36px] font-heading font-bold text-gray-900 mb-4">
            Kata Mereka
          </h2>
          <p className="text-[16px] md:text-[18px] text-gray-600 max-w-2xl mx-auto">
            Cerita nyata dari remaja sepertimu yang telah menemukan arah dan dukungan bersama
            ReproDigital Youth.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-[1200px] mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-8 items-center py-8">
              {testimonials.map((testimonial, index) => {
                const isActive = current === index;
                return (
                  <CarouselItem 
                    key={index} 
                    className="pl-4 sm:pl-8 basis-[85%] sm:basis-[60%] lg:basis-[40%] transition-all duration-300"
                  >
                    <div 
                      className={`h-full bg-white border border-gray-200 rounded-xl p-8 transition-all duration-300 ${
                        isActive 
                          ? "shadow-lg scale-100 opacity-100" 
                          : "shadow-sm scale-95 opacity-50 hover:opacity-80 cursor-pointer"
                      }`}
                      onClick={() => !isActive && api?.scrollTo(index)}
                    >
                      <Quote className="w-8 h-8 md:w-10 md:h-10 text-teal-500 mb-6" />
                      <p className="text-[15px] md:text-[16px] text-gray-700 italic leading-relaxed mb-8">
                        "{testimonial.quote}"
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border-2 border-teal-500 bg-teal-50 flex items-center justify-center shrink-0">
                          <User className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                          <p className="font-heading font-bold text-gray-900 text-sm md:text-base">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {testimonial.age}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Arrows (Desktop Only) */}
            <CarouselPrevious className="hidden md:flex -left-16 w-12 h-12 border-gray-200 hover:border-teal-500 hover:bg-teal-500 hover:text-white transition-colors" />
            <CarouselNext className="hidden md:flex -right-16 w-12 h-12 border-gray-200 hover:border-teal-500 hover:bg-teal-500 hover:text-white transition-colors" />
          </Carousel>
          
          {/* Custom Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`rounded-full transition-all duration-300 ${
                  current === index 
                    ? "w-8 h-3 bg-teal-500" 
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
