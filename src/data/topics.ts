import { TopicCategory } from "@/types";

export interface TopicOption {
  id: TopicCategory;
  label: string;
  emoji: string;
  color: string;
  subcategories: string[];
}

export const TOPICS: TopicOption[] = [
  {
    id: "animals",
    label: "Animals",
    emoji: "🐾",
    color: "bg-amber-400",
    subcategories: [
      "Farm Animals",
      "Wildlife",
      "Sea Life",
      "Insects",
      "Birds",
      "Pets",
      "Dinosaurs",
      "Reptiles",
    ],
  },
  {
    id: "nature",
    label: "Nature",
    emoji: "🌿",
    color: "bg-green-400",
    subcategories: [
      "Flowers",
      "Trees",
      "Landscapes",
      "Weather",
      "Seasons",
      "Gardens",
      "Mountains",
      "Ocean Scenes",
    ],
  },
  {
    id: "fantasy",
    label: "Fantasy",
    emoji: "🐉",
    color: "bg-purple-400",
    subcategories: [
      "Dragons",
      "Unicorns",
      "Fairies",
      "Castles",
      "Mermaids",
      "Wizards",
      "Knights",
      "Magical Creatures",
    ],
  },
  {
    id: "vehicles",
    label: "Vehicles",
    emoji: "🚗",
    color: "bg-blue-400",
    subcategories: [
      "Cars",
      "Trucks",
      "Planes",
      "Boats",
      "Trains",
      "Spacecraft",
      "Motorcycles",
      "Construction",
    ],
  },
  {
    id: "food",
    label: "Food",
    emoji: "🍕",
    color: "bg-red-400",
    subcategories: [
      "Fruits",
      "Vegetables",
      "Desserts",
      "Meals",
      "Drinks",
      "Baking",
      "Candy",
      "Fast Food",
    ],
  },
  {
    id: "holidays",
    label: "Holidays",
    emoji: "🎄",
    color: "bg-rose-400",
    subcategories: [
      "Christmas",
      "Halloween",
      "Easter",
      "Thanksgiving",
      "Valentine's Day",
      "Fourth of July",
      "Birthday",
      "New Year",
    ],
  },
  {
    id: "people",
    label: "People",
    emoji: "👤",
    color: "bg-sky-400",
    subcategories: [
      "Occupations",
      "Sports",
      "Music",
      "Dance",
      "Family",
      "Superheroes",
      "Pirates",
      "Astronauts",
    ],
  },
  {
    id: "patterns",
    label: "Patterns",
    emoji: "✨",
    color: "bg-indigo-400",
    subcategories: [
      "Geometric",
      "Floral",
      "Abstract",
      "Tribal",
      "Celtic",
      "Art Deco",
      "Paisley",
      "Mosaic",
    ],
  },
];
