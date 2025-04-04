"use client";
import Image from "next/image";

const categories = [
  { name: "Vegetables", img: "/vegetables.jpg" },
  { name: "Fruits", img: "/fruits.jpg" },
  { name: "Dairy", img: "/dairy.jpg" },
  { name: "Grains", img: "/grains.jpg" },
];

const Categories = () => {
  return (
    <section className="py-20 bg-gray-900 text-white text-center">
      <h2 className="text-4xl font-bold text-green-400">Popular Categories</h2>
      <div className="mt-10 flex flex-wrap justify-center gap-6">
        {categories.map((category, index) => (
          <div key={index} className="w-56">
            <Image
              src={category.img}
              alt={category.name}
              width={200}
              height={200}
              className="rounded-lg"
            />
            <h3 className="text-lg font-bold mt-2">{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
