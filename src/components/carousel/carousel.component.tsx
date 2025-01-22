import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {PhotosType} from "@/types";

const CarouselComponent = ({photos}: { photos: PhotosType[] }) => {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {photos.map((photo) => (
          <CarouselItem key={photo.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img src={photo.image} alt={photo.title}/>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious/>
      <CarouselNext/>
    </Carousel>
  );
};

export default CarouselComponent;