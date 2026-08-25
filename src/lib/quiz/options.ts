export type OptionKind = "junk" | "real";

export type QuizOption = {
  id: string;
  label: string;
  kind: OptionKind;
  icon: IconName;
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
  { id: "seed-oils", label: "Seed oils", kind: "junk", icon: "droplets" },
  { id: "soy-isolate", label: "Soy isolate", kind: "junk", icon: "bean" },
  { id: "maltitol", label: "Maltitol", kind: "junk", icon: "candy" },
  { id: "aspartame", label: "Aspartame", kind: "junk", icon: "flask" },
  { id: "fake-colours", label: "Fake colours", kind: "junk", icon: "palette" },
  { id: "hfcs", label: "Corn syrup", kind: "junk", icon: "cup-soda" },
  { id: "palm-oil", label: "Palm oil", kind: "junk", icon: "tree" },
  { id: "carrageenan", label: "Carrageenan", kind: "junk", icon: "waves" },
  { id: "msg", label: "MSG", kind: "junk", icon: "flask-round" },
  { id: "sucralose", label: "Sucralose", kind: "junk", icon: "test-tube" },
  { id: "hydrogenated", label: "Hydrogenated oil", kind: "junk", icon: "fuel" },
  { id: "gluten-fillers", label: "Gluten fillers", kind: "junk", icon: "wheat" },
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

export const QUESTION = "Think you know how to read labels? Take the test!";
