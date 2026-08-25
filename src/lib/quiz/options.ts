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

/** Options pool. `junk` = ultra processed, never in a Chief product (correct picks). */
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
  {
    id: "maltodextrin",
    label: "Maltodextrin",
    kind: "junk",
    icon: "flask-round",
    why: "Starch blown apart into a glucose spike. A cheap bulk powder that hits like sugar.",
  },
  {
    id: "soluble-corn-fibre",
    label: "Soluble corn fibre",
    kind: "junk",
    icon: "wheat",
    why: "“Fibre” refined from corn. A syrup cousin wearing a health claim.",
  },
  {
    id: "brown-rice-syrup",
    label: "Brown rice syrup",
    kind: "junk",
    icon: "cup-soda",
    why: "Health-halo sugar. Still a syrup, still a spike, still not food.",
  },
  {
    id: "natural-flavours",
    label: "Natural flavours",
    kind: "junk",
    icon: "flower",
    why: "Sounds like a vanilla bean. Usually a lab blend you can’t trace.",
  },
  {
    id: "erythritol",
    label: "Erythritol",
    kind: "junk",
    icon: "candy",
    why: "The “better” sugar alcohol. Still the reason a low-sugar bar wrecks your afternoon.",
  },
  {
    id: "vegetable-glycerin",
    label: "Vegetable glycerin",
    kind: "junk",
    icon: "droplets",
    why: "Keeps bars soft and sticky. Processed filler, not an ingredient your nan would cook.",
  },
  {
    id: "pea-isolate",
    label: "Pea protein isolate",
    kind: "junk",
    icon: "bean",
    why: "Same isolate trick as soy — plant stripped, powdered, and sold as “protein.”",
  },
  {
    id: "soy-lecithin",
    label: "Soy lecithin",
    kind: "junk",
    icon: "bean",
    why: "An ultra-processed emulsifier squeezed from soy. Tiny dose, still not food.",
  },
  {
    id: "allulose",
    label: "Allulose",
    kind: "junk",
    icon: "test-tube",
    why: "A trendy “rare sugar” made in a plant — the factory kind.",
  },
  {
    id: "prebiotic-fibre",
    label: "Prebiotic fibre",
    kind: "junk",
    icon: "wheat",
    why: "Marketed as gut-friendly fibre. Often IMO — functionally a syrup.",
  },
  {
    id: "modified-starch",
    label: "Modified starch",
    kind: "junk",
    icon: "wheat",
    why: "Whatever starch was cheapest, chemically tweaked to behave in a factory.",
  },
  {
    id: "diglycerides",
    label: "Mono-diglycerides",
    kind: "junk",
    icon: "fuel",
    why: "Fats taken apart and rebuilt as emulsifiers. Chemistry, not cooking.",
  },
  {
    id: "collagen",
    label: "Grass-fed collagen",
    kind: "real",
    icon: "bone",
    why: "Real protein from cattle, not a lab. Amino acids your joints and skin actually use.",
  },
  {
    id: "whey",
    label: "Grass-fed whey",
    kind: "real",
    icon: "milk",
    why: "Dairy protein from pasture-raised cows. Complete amino acids, no isolate gymnastics.",
  },
  {
    id: "organic-beef",
    label: "Organic beef",
    kind: "real",
    icon: "beef",
    why: "Whole animal protein. Iron, B12, and fat that came from a cow, not a factory.",
  },
  {
    id: "dark-cacao",
    label: "Dark cacao",
    kind: "real",
    icon: "coffee",
    why: "Cacao beans, not candy. Flavour and polyphenols without the cheap sugar dump.",
  },
  {
    id: "monk-fruit",
    label: "Monk fruit",
    kind: "real",
    icon: "apple",
    why: "A fruit that sweetens. No sugar-alcohol gut bomb, no lab aftertaste.",
  },
  {
    id: "cashews",
    label: "Cashews",
    kind: "real",
    icon: "shell",
    why: "A whole nut. Fat, minerals, and crunch you can still recognise as food.",
  },
  {
    id: "peanut-butter",
    label: "Peanut butter",
    kind: "real",
    icon: "sandwich",
    why: "Peanuts. That is the ingredient list we want — food, not filler.",
  },
  {
    id: "sea-salt",
    label: "Sea salt",
    kind: "real",
    icon: "diamond",
    why: "Minerals from the ocean, not a lab-made sodium blend with anti-caking junk.",
  },
  {
    id: "vanilla",
    label: "Vanilla",
    kind: "real",
    icon: "flower",
    why: "The flower, not vanillin cooked up in a vat and labelled “natural flavour.”",
  },
  {
    id: "coconut",
    label: "Coconut",
    kind: "real",
    icon: "circle-dot",
    why: "Coconut meat and fat. Simple, satiating, and still recognisable as food.",
  },
  {
    id: "macadamias",
    label: "Macadamias",
    kind: "real",
    icon: "shell",
    why: "A whole Australian nut. Creamy fat, no processing tricks.",
  },
  {
    id: "hazelnuts",
    label: "Hazelnuts",
    kind: "real",
    icon: "cherry",
    why: "Whole nuts. Fibre, flavour, and nothing your nan wouldn’t recognise.",
  },
  {
    id: "almonds",
    label: "Almonds",
    kind: "real",
    icon: "circle-dot",
    why: "Whole almonds. Protein, crunch, and a label that still reads as food.",
  },
  {
    id: "dates",
    label: "Dates",
    kind: "real",
    icon: "sun",
    why: "Fruit. Natural sweetness with fibre, not a syrup pretending to be health.",
  },
  {
    id: "cinnamon",
    label: "Cinnamon",
    kind: "real",
    icon: "wind",
    why: "The bark. Warmth and flavour without a “natural flavour” black box.",
  },
  {
    id: "creatine",
    label: "Creatine",
    kind: "real",
    icon: "dumbbell",
    why: "One well-studied compound. Not a cocktail of fillers and fake sweet.",
  },
  {
    id: "biltong",
    label: "Biltong",
    kind: "real",
    icon: "drumstick",
    why: "Dried meat. Protein you can see, salt, spice, no bar-moulding chemistry.",
  },
  {
    id: "honey",
    label: "Australian honey",
    kind: "real",
    icon: "citrus",
    why: "Bees did this. Enzymes and flavour, not inverted syrup in a bear bottle.",
  },
];

export const JUNK_OPTIONS = QUIZ_OPTIONS.filter((o) => o.kind === "junk");
export const REAL_OPTIONS = QUIZ_OPTIONS.filter((o) => o.kind === "real");

export const QUESTION = "Which 3 ingredients are ultra processed?";
