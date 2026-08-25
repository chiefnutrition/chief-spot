export type OptionKind = "junk" | "real";

export type QuizOption = {
  id: string;
  label: string;
  kind: OptionKind;
  icon: IconName;
  /** ≤25 words. Set on junk only — shown on the results page. */
  why?: string;
};

export type IconName =
  | "droplets"
  | "bean"
  | "candy"
  | "flask"
  | "palette"
  | "cup-soda"
  | "tree"
  | "waves"
  | "flask-round"
  | "test-tube"
  | "fuel"
  | "wheat"
  | "bone"
  | "milk"
  | "beef"
  | "coffee"
  | "apple"
  | "shell"
  | "sandwich"
  | "diamond"
  | "flower"
  | "circle-dot"
  | "cherry"
  | "wind"
  | "dumbbell"
  | "drumstick"
  | "sun"
  | "citrus";

/** 30 options. `junk` = never in a Chief product (correct picks). */
export const QUIZ_OPTIONS: QuizOption[] = [
  {
    id: "seed-oils",
    label: "Seed oils",
    kind: "junk",
    icon: "droplets",
    why: "Cheap industrial oils that oxidise on the shelf and quietly inflame once you eat them.",
  },
  {
    id: "soy-isolate",
    label: "Soy isolate",
    kind: "junk",
    icon: "bean",
    why: "Protein chemically stripped from soy, then bleached so a bar can shout “high protein.”",
  },
  {
    id: "maltitol",
    label: "Maltitol",
    kind: "junk",
    icon: "candy",
    why: "The sugar alcohol behind most “low sugar” bar claims, and behind the 3pm stomach ache.",
  },
  {
    id: "aspartame",
    label: "Aspartame",
    kind: "junk",
    icon: "flask",
    why: "A lab sweetener about 200× sugar, with a chemical aftertaste and an unsettled safety record.",
  },
  {
    id: "fake-colours",
    label: "Fake colours",
    kind: "junk",
    icon: "palette",
    why: "Synthetic dyes that paint dull food pretty. Colour is not a nutrient.",
  },
  {
    id: "hfcs",
    label: "Corn syrup",
    kind: "junk",
    icon: "cup-soda",
    why: "Liquid sugar that spikes blood glucose and fills bars with empty sweetness.",
  },
  {
    id: "palm-oil",
    label: "Palm oil",
    kind: "junk",
    icon: "tree",
    why: "Highly refined fat. Cheap, shelf-stable, and empty of anything your body asked for.",
  },
  {
    id: "carrageenan",
    label: "Carrageenan",
    kind: "junk",
    icon: "waves",
    why: "A processed seaweed gum used to thicken. Often linked to gut irritation.",
  },
  {
    id: "msg",
    label: "MSG",
    kind: "junk",
    icon: "flask-round",
    why: "A flavour shortcut that makes bland processed food taste savoury without adding real food.",
  },
  {
    id: "sucralose",
    label: "Sucralose",
    kind: "junk",
    icon: "test-tube",
    why: "A chlorinated “sugar free” sweetener your gut did not evolve to handle.",
  },
  {
    id: "hydrogenated",
    label: "Hydrogenated oil",
    kind: "junk",
    icon: "fuel",
    why: "Oils forced solid with hydrogen. Trans-fat territory, dressed as “vegetable oil.”",
  },
  {
    id: "gluten-fillers",
    label: "Gluten fillers",
    kind: "junk",
    icon: "wheat",
    why: "Cheap wheat starch and protein used to bulk a bar and cut the cost of real food.",
  },
  { id: "collagen", label: "Grass-fed collagen", kind: "real", icon: "bone" },
  { id: "whey", label: "Grass-fed whey", kind: "real", icon: "milk" },
  { id: "organic-beef", label: "Organic beef", kind: "real", icon: "beef" },
  { id: "dark-cacao", label: "Dark cacao", kind: "real", icon: "coffee" },
  { id: "monk-fruit", label: "Monk fruit", kind: "real", icon: "apple" },
  { id: "cashews", label: "Cashews", kind: "real", icon: "shell" },
  { id: "peanut-butter", label: "Peanut butter", kind: "real", icon: "sandwich" },
  { id: "sea-salt", label: "Sea salt", kind: "real", icon: "diamond" },
  { id: "vanilla", label: "Vanilla", kind: "real", icon: "flower" },
  { id: "coconut", label: "Coconut", kind: "real", icon: "circle-dot" },
  { id: "macadamias", label: "Macadamias", kind: "real", icon: "shell" },
  { id: "hazelnuts", label: "Hazelnuts", kind: "real", icon: "cherry" },
  { id: "almonds", label: "Almonds", kind: "real", icon: "circle-dot" },
  { id: "dates", label: "Dates", kind: "real", icon: "sun" },
  { id: "cinnamon", label: "Cinnamon", kind: "real", icon: "wind" },
  { id: "creatine", label: "Creatine", kind: "real", icon: "dumbbell" },
  { id: "biltong", label: "Biltong", kind: "real", icon: "drumstick" },
  { id: "honey", label: "Australian honey", kind: "real", icon: "citrus" },
];

export const JUNK_OPTIONS = QUIZ_OPTIONS.filter((o) => o.kind === "junk");
export const REAL_OPTIONS = QUIZ_OPTIONS.filter((o) => o.kind === "real");

export const QUESTION = "Which 3 ingredients are ultra processed?";
