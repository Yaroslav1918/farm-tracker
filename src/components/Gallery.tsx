import Image from "next/image";

export default function Gallery() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 p-10 mt-20">
      <div className="relative h-60">
        <Image
          className="object-cover  rounded-lg"
          src="/farm-1.png"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          fill
          alt="gallery-photo"
        />
      </div>
      <div className="relative h-60">
        <Image
          className="object-cover  rounded-lg"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          src="/farm-2.png"
          fill
          alt="gallery-photo"
        />
      </div>
      <div className="relative h-60">
        <Image
          className="object-cover  rounded-lg"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          src="/farm-4.png"
          fill
          alt="gallery-photo"
        />
      </div>
      <div className="relative h-60">
        <Image
          className="object-cover  rounded-lg"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          src="/farm-5.jpg"
          fill
          alt="gallery-photo"
        />
      </div>
      <div className="relative h-60">
        <Image
          className="object-cover  rounded-lg"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          src="/farm11.jpg"
          fill
          alt="gallery-photo"
        />
      </div>
      <div className="relative h-60">
        <Image
          className="object-cover  rounded-lg"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          src="/farm-7.jpg"
          fill
          alt="gallery-photo"
        />
      </div>
      <div className="relative h-60">
        <Image
          className="object-cover  rounded-lg"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          src="/farm-8.jpg"
          fill
          alt="gallery-photo"
        />
      </div>
      <div className="relative h-60">
        <Image
          className="object-cover  rounded-lg"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          src="/farm-9.jpg"
          fill
          alt="gallery-photo"
        />
      </div>
      <div className="relative h-60">
        <Image
          className="object-cover  rounded-lg"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          src="/farm-10.jpg"
          fill
          alt="gallery-photo"
        />
      </div>
    </div>
  );
}
