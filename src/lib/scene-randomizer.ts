// Randomly generates a creative scene description for a given subcategory.
// This makes each generation unique even with the same topic selection.

const ACTIONS = [
  "playing", "sleeping", "dancing", "reading a book", "having a picnic",
  "flying through the air", "swimming", "climbing", "hiding behind something",
  "wearing a party hat", "juggling", "riding a bicycle", "singing",
  "painting a picture", "building something", "exploring a cave",
  "sitting on a cloud", "surfing a wave", "skateboarding", "doing yoga",
  "cooking a meal", "planting flowers", "stargazing", "blowing bubbles",
  "ice skating", "jumping over a puddle", "carrying an umbrella in the rain",
];

const SETTINGS = [
  "in an enchanted forest", "on a tropical island", "in outer space",
  "underwater in the ocean", "on top of a mountain", "in a cozy cottage",
  "in a magical garden", "at a carnival", "in a candy land",
  "on a pirate ship", "in a treehouse", "at the beach at sunset",
  "in a field of wildflowers", "inside a giant library", "on a rainbow",
  "in a snowy winter village", "at a bustling market", "in the clouds",
  "beside a waterfall", "in a mushroom village", "on the moon",
  "in a steampunk city", "at a tea party", "in a crystal cave",
];

const COMPANIONS = [
  "with a tiny bird on its head", "surrounded by butterflies",
  "next to a friendly snail", "with a baby version of itself",
  "alongside a wise owl", "with a mischievous squirrel",
  "beside a stack of books", "with balloons tied to its tail",
  "surrounded by musical notes", "with a crown of flowers",
  "carrying a lantern", "with a treasure map",
  "next to a giant cupcake", "with a magic wand",
  "surrounded by stars and moons", "with a tiny backpack",
];

const COMPOSITIONS = [
  "The scene is rich with background details to color.",
  "Include decorative elements surrounding the main subject.",
  "Add whimsical background details like clouds, plants, or small creatures.",
  "Frame the subject with an elaborate natural scene.",
  "Include a detailed foreground and background with plenty to color.",
  "Surround the main subject with themed decorative elements.",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateSceneDescription(subcategory: string): string {
  const action = pick(ACTIONS);
  const setting = pick(SETTINGS);
  const companion = pick(COMPANIONS);
  const composition = pick(COMPOSITIONS);

  return `a ${subcategory.toLowerCase()} ${action} ${setting}, ${companion}. ${composition}`;
}
