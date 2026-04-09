// app/development/components/MainCarousel.tsx
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import type { Category } from "@/hooks/development.type";
import { CategoryCard } from "./CategoryCard";

interface MainCarouselProps {
  categories: Category[];
  onTaskStatusChange: (taskId: number, newStatus: string) => void;
}

export function MainCarousel({ categories, onTaskStatusChange }: MainCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {categories.map((category) => (
          <CarouselItem 
            key={category.id} 
            className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <div className="h-full">
              <CategoryCard
                category={category}
                onTaskStatusChange={onTaskStatusChange}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12" />
      <CarouselNext className="hidden md:flex -right-4 lg:-right-12" />
    </Carousel>
  );
}