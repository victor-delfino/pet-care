import { useState, useEffect } from "react";

const animals = [
  { emoji: "🐕", name: "Buddy", breed: "Golden Retriever", age: "3 years" },
  { emoji: "🐈", name: "Luna", breed: "Siamese", age: "2 years" },
  { emoji: "🐕", name: "Rex", breed: "German Shepherd", age: "5 years" },
  { emoji: "🐈", name: "Mia", breed: "Persian", age: "1 year" },
  { emoji: "🐕", name: "Charlie", breed: "Labrador", age: "4 years" },
  { emoji: "🐈", name: "Simba", breed: "Maine Coon", age: "3 years" },
];

export function AnimalCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % animals.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleAnimals = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(animals[(current + i) % animals.length]);
    }
    return visible;
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Meet our community
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Thousands of pets are already being cared for with PetCare
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getVisibleAnimals().map((animal, index) => (
            <div
              key={`${animal.name}-${index}`}
              className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-4xl">
                {animal.emoji}
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {animal.name}
                </h3>
                <p className="text-sm text-gray-500">{animal.breed}</p>
                <p className="text-xs text-gray-400 mt-1">{animal.age}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {animals.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === current ? "bg-blue-600 w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
