//#region node_modules/.nitro/vite/services/ssr/assets/deal-BnlYTHRf.js
/** 30 options. `junk` = never in a Chief product (correct picks). */
var QUIZ_OPTIONS = [
	{
		id: "seed-oils",
		label: "Seed oils",
		kind: "junk",
		icon: "droplets"
	},
	{
		id: "soy-isolate",
		label: "Soy isolate",
		kind: "junk",
		icon: "bean"
	},
	{
		id: "maltitol",
		label: "Maltitol",
		kind: "junk",
		icon: "candy"
	},
	{
		id: "aspartame",
		label: "Aspartame",
		kind: "junk",
		icon: "flask"
	},
	{
		id: "fake-colours",
		label: "Fake colours",
		kind: "junk",
		icon: "palette"
	},
	{
		id: "hfcs",
		label: "Corn syrup",
		kind: "junk",
		icon: "cup-soda"
	},
	{
		id: "palm-oil",
		label: "Palm oil",
		kind: "junk",
		icon: "tree"
	},
	{
		id: "carrageenan",
		label: "Carrageenan",
		kind: "junk",
		icon: "waves"
	},
	{
		id: "msg",
		label: "MSG",
		kind: "junk",
		icon: "flask-round"
	},
	{
		id: "sucralose",
		label: "Sucralose",
		kind: "junk",
		icon: "test-tube"
	},
	{
		id: "hydrogenated",
		label: "Hydrogenated oil",
		kind: "junk",
		icon: "fuel"
	},
	{
		id: "gluten-fillers",
		label: "Gluten fillers",
		kind: "junk",
		icon: "wheat"
	},
	{
		id: "collagen",
		label: "Grass-fed collagen",
		kind: "real",
		icon: "bone"
	},
	{
		id: "whey",
		label: "Grass-fed whey",
		kind: "real",
		icon: "milk"
	},
	{
		id: "organic-beef",
		label: "Organic beef",
		kind: "real",
		icon: "beef"
	},
	{
		id: "dark-cacao",
		label: "Dark cacao",
		kind: "real",
		icon: "coffee"
	},
	{
		id: "monk-fruit",
		label: "Monk fruit",
		kind: "real",
		icon: "apple"
	},
	{
		id: "cashews",
		label: "Cashews",
		kind: "real",
		icon: "shell"
	},
	{
		id: "peanut-butter",
		label: "Peanut butter",
		kind: "real",
		icon: "sandwich"
	},
	{
		id: "sea-salt",
		label: "Sea salt",
		kind: "real",
		icon: "diamond"
	},
	{
		id: "vanilla",
		label: "Vanilla",
		kind: "real",
		icon: "flower"
	},
	{
		id: "coconut",
		label: "Coconut",
		kind: "real",
		icon: "circle-dot"
	},
	{
		id: "macadamias",
		label: "Macadamias",
		kind: "real",
		icon: "shell"
	},
	{
		id: "hazelnuts",
		label: "Hazelnuts",
		kind: "real",
		icon: "cherry"
	},
	{
		id: "almonds",
		label: "Almonds",
		kind: "real",
		icon: "circle-dot"
	},
	{
		id: "dates",
		label: "Dates",
		kind: "real",
		icon: "sun"
	},
	{
		id: "cinnamon",
		label: "Cinnamon",
		kind: "real",
		icon: "wind"
	},
	{
		id: "creatine",
		label: "Creatine",
		kind: "real",
		icon: "dumbbell"
	},
	{
		id: "biltong",
		label: "Biltong",
		kind: "real",
		icon: "drumstick"
	},
	{
		id: "honey",
		label: "Australian honey",
		kind: "real",
		icon: "citrus"
	}
];
var JUNK_OPTIONS = QUIZ_OPTIONS.filter((o) => o.kind === "junk");
var REAL_OPTIONS = QUIZ_OPTIONS.filter((o) => o.kind === "real");
var QUESTION = "Which 3 would you never find in a Chief product?";
function shuffle(items) {
	const copy = [...items];
	for (let i = copy.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		const a = copy[i];
		const b = copy[j];
		if (a === void 0 || b === void 0) continue;
		copy[i] = b;
		copy[j] = a;
	}
	return copy;
}
function dealRound() {
	const junk = shuffle(JUNK_OPTIONS).slice(0, 3);
	const real = shuffle(REAL_OPTIONS).slice(0, 6);
	return shuffle([...junk, ...real]);
}
function scorePicks(selectedIds) {
	const junkIds = new Set(JUNK_OPTIONS.map((o) => o.id));
	return selectedIds.filter((id) => junkIds.has(id)).length;
}
function optionsById(ids) {
	const map = new Map(QUIZ_OPTIONS.map((o) => [o.id, o]));
	return ids.flatMap((id) => {
		const option = map.get(id);
		return option ? [option] : [];
	});
}
function resultKey(score) {
	if (score >= 3) return "all";
	if (score === 2) return "two";
	if (score === 1) return "one";
	return "none";
}
var RESULT_COPY = {
	all: {
		kicker: "3 of 3",
		title: "Clean sweep.",
		body: "You spotted every bit of junk. That's Chief thinking — real food, no ultra-processed anything."
	},
	two: {
		kicker: "2 of 3",
		title: "Almost legendary.",
		body: "Two out of three. The pack-flipper in you is waking up."
	},
	one: {
		kicker: "1 of 3",
		title: "One for the real food.",
		body: "You caught one. Flip more packs — the junk hides in plain sight."
	},
	none: {
		kicker: "0 of 3",
		title: "The junk almost won.",
		body: "No stress. That's why we exist — extraordinarily clean snacks, nothing to hide."
	}
};
//#endregion
export { resultKey as a, optionsById as i, RESULT_COPY as n, scorePicks as o, dealRound as r, QUESTION as t };
