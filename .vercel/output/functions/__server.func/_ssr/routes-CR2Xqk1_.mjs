import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as resultKey, i as optionsById, n as RESULT_COPY, o as scorePicks, r as dealRound, t as QUESTION } from "./deal-BnlYTHRf.mjs";
import { A as Beef, C as Coffee, D as Check, E as Cherry, M as Apple, O as Candy, S as CupSoda, T as CircleDot, _ as FlaskConical, b as Droplets, c as Sun, d as Palette, f as Milk, g as FlaskRound, h as Flower2, i as Waves, j as Bean, k as Bone, l as Shell, m as Fuel, n as Wind, o as TreeDeciduous, p as Maximize2, r as Wheat, s as TestTube, t as X, u as Sandwich, v as Dumbbell, w as Citrus, x as Diamond, y as Drumstick } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as Route$3 } from "./router-B8V2kQ_d.mjs";
import { n as cn, t as ChiefMark } from "./chief-mark-yNHKn5JU.mjs";
import { t as Button } from "./button-DayubYSp.mjs";
import { t as claimPrize } from "./actions-CytFIL98.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CR2Xqk1_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AttractScreen({ onPlay, kiosk, embed }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostGrid, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex w-full max-w-xl flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChiefMark, { className: "mb-6" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-hero font-semibold leading-display tracking-tight text-cream",
						children: [
							"Spot the",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"junk."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-md text-pretty text-base text-muted sm:text-lg",
						children: "Nine ingredients. Three never make it into a Chief product. Pick them — then claim a prize."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "xl",
						className: "mt-10 min-w-60 font-display text-xl uppercase tracking-ui",
						onClick: onPlay,
						children: "Play"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-xs uppercase tracking-ui text-subtle",
						children: "Pick 3 · Win a prize"
					})
				]
			}),
			(kiosk || !embed) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "absolute right-4 top-4 z-10 rounded-md p-3 text-subtle transition-colors hover:text-fg",
				"aria-label": "Enter fullscreen",
				onClick: () => {
					if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
					else document.exitFullscreen().catch(() => {});
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-5" })
			})
		]
	});
}
function GhostGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": "true",
		className: "pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 gap-3 p-4 opacity-10 sm:gap-5 sm:p-8",
		children: Array.from({ length: 9 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rounded-xl border border-cream" }, i))
	});
}
function FlipStage({ flipped, front, back }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flip-stage",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flip-card", flipped && "is-flipped"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flip-face flip-face-front",
				children: front
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flip-face flip-face-back",
				children: back
			})]
		})
	});
}
var OPTION_ICONS = {
	droplets: Droplets,
	bean: Bean,
	candy: Candy,
	flask: FlaskConical,
	palette: Palette,
	"cup-soda": CupSoda,
	tree: TreeDeciduous,
	waves: Waves,
	"flask-round": FlaskRound,
	"test-tube": TestTube,
	fuel: Fuel,
	wheat: Wheat,
	bone: Bone,
	milk: Milk,
	beef: Beef,
	coffee: Coffee,
	apple: Apple,
	shell: Shell,
	sandwich: Sandwich,
	diamond: Diamond,
	flower: Flower2,
	"circle-dot": CircleDot,
	cherry: Cherry,
	wind: Wind,
	dumbbell: Dumbbell,
	drumstick: Drumstick,
	sun: Sun,
	citrus: Citrus
};
function QuizBoard({ options, selectedIds, onToggle, onSubmit }) {
	const remaining = 3 - selectedIds.length;
	const ready = selectedIds.length === 3;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col overflow-hidden px-3 py-3 sm:px-5 sm:py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex shrink-0 items-end justify-between gap-3 px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChiefMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 max-w-xl font-display text-question font-semibold leading-tight tracking-tight text-cream sm:mt-2",
					children: QUESTION
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "shrink-0 font-display text-sm uppercase tracking-ui text-accent tabular-nums",
					children: [selectedIds.length, "/3"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid min-h-0 flex-1 grid-cols-3 grid-rows-3 gap-2 sm:mt-4 sm:gap-3",
				children: options.map((option) => {
					const selectedIndex = selectedIds.indexOf(option.id);
					const selected = selectedIndex >= 0;
					const locked = ready && !selected;
					const Icon = OPTION_ICONS[option.icon];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-pressed": selected,
						disabled: locked,
						onClick: () => onToggle(option.id),
						className: cn("relative flex min-h-0 flex-col items-center justify-center gap-1 rounded-lg border px-2 text-center transition-[transform,background-color,border-color,color,opacity] duration-150 ease-out sm:rounded-xl sm:gap-2 sm:px-3", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70", "active:enabled:scale-96", selected ? "border-cream bg-cream text-ink shadow-tile" : "border-border bg-surface text-fg hover:border-border-strong hover:bg-surface-2", locked && "opacity-40"),
						children: [
							selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute left-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-ink text-xs font-semibold text-cream tabular-nums sm:left-2 sm:top-2",
								children: selectedIndex + 1
							}),
							selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								className: "absolute right-1.5 top-1.5 size-4 text-ink sm:right-2 sm:top-2",
								strokeWidth: 2.5
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: cn("size-5 sm:size-8", selected ? "text-ink" : "text-accent"),
								strokeWidth: 1.75
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-tile font-semibold uppercase leading-tight tracking-wide",
								children: option.label
							})
						]
					}, option.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex h-16 shrink-0 items-center justify-center sm:mt-4 sm:h-18",
				children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "xl",
					className: "w-full max-w-md font-display text-xl uppercase tracking-ui",
					onClick: onSubmit,
					children: "Submit"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm uppercase tracking-ui text-subtle",
					children: remaining === 3 ? "Tap three to lock in" : remaining === 1 ? "One more" : "Two more"
				})
			})
		]
	});
}
var Input = import_react.forwardRef(({ className, type = "text", ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		ref,
		className: cn("flex h-14 w-full rounded-lg border border-border bg-surface px-4 text-base text-fg", "placeholder:text-subtle", "transition-[border-color,box-shadow] duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
});
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
	ref,
	className: cn("text-sm font-medium tracking-wide text-muted", className),
	...props
}));
Label.displayName = "Label";
function ResultsScreen({ score, selectedIds, optionIds, source, onRestart }) {
	const copy = RESULT_COPY[resultKey(score)];
	const selected = optionsById(selectedIds);
	const junkOnBoard = optionsById(optionIds).filter((o) => o.kind === "junk");
	const [firstName, setFirstName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [website, setWebsite] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!done) return;
		const timer = window.setTimeout(onRestart, 12e3);
		return () => window.clearTimeout(timer);
	}, [done, onRestart]);
	async function onSubmit(e) {
		e.preventDefault();
		if (pending) return;
		setPending(true);
		try {
			await claimPrize({ data: {
				firstName,
				email,
				selectedIds,
				optionIds,
				source,
				website
			} });
			setDone(true);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Could not submit. Try again.";
			toast.error(message);
		} finally {
			setPending(false);
		}
	}
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col items-center justify-center px-6 py-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChiefMark, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 font-display text-sm uppercase tracking-kicker text-accent",
				children: "You're in"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mt-3 font-display text-hero font-semibold leading-display tracking-tight text-cream",
				children: [
					"Prize",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"incoming."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 max-w-md text-pretty text-muted",
				children: [
					"Watch your inbox, ",
					firstName.trim() || "chief",
					". Real food. No junk. A little something from us."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "outline",
				className: "mt-10 font-display uppercase tracking-ui",
				onClick: onRestart,
				children: "Play again"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid min-h-dvh w-full max-w-6xl items-center gap-8 px-5 py-6 lg:grid-cols-2 lg:gap-16 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChiefMark, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 font-display text-sm uppercase tracking-kicker text-accent tabular-nums",
				children: copy.kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-result font-semibold leading-display tracking-tight text-cream",
				children: copy.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-md text-pretty text-muted",
				children: copy.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-2",
				children: selected.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickRow, { option }, option.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs uppercase tracking-ui text-subtle",
				children: ["The junk on this board: ", junkOnBoard.map((o) => o.label).join(" · ")]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 sm:p-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold uppercase tracking-wide text-cream",
					children: "Claim your prize"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "firstName",
						children: "First name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "firstName",
						name: "firstName",
						autoComplete: "given-name",
						required: true,
						maxLength: 80,
						value: firstName,
						onChange: (e) => setFirstName(e.target.value),
						placeholder: "Sam"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "email",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "email",
						name: "email",
						type: "email",
						autoComplete: "email",
						inputMode: "email",
						required: true,
						maxLength: 200,
						value: email,
						onChange: (e) => setEmail(e.target.value),
						placeholder: "you@email.com"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute -left-[9999px] h-0 w-0 overflow-hidden",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "website",
						children: "Website"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "website",
						name: "website",
						tabIndex: -1,
						autoComplete: "off",
						value: website,
						onChange: (e) => setWebsite(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "xl",
					className: "mt-1 w-full font-display text-xl uppercase tracking-ui",
					disabled: pending || !firstName.trim() || !email.trim(),
					children: pending ? "Sending…" : "Get my prize"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-xs leading-relaxed text-subtle",
					children: "By submitting you agree to hear from Chief. Unsubscribe any time. Your prize email is on the way after you join the list."
				})
			]
		})]
	});
}
function PickRow({ option }) {
	const hit = option.kind === "junk";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: cn("flex items-center justify-between rounded-md border px-3 py-2.5", hit ? "border-success/40 bg-success/10" : "border-danger/35 bg-danger/10"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium text-fg",
			children: option.label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: cn("flex items-center gap-1 text-xs font-semibold uppercase tracking-wider", hit ? "text-success" : "text-danger"),
			children: [hit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), hit ? "Junk" : "In Chief"]
		})]
	});
}
function QuizApp({ embed, kiosk }) {
	const [phase, setPhase] = (0, import_react.useState)("attract");
	const [options, setOptions] = (0, import_react.useState)([]);
	const [selectedIds, setSelectedIds] = (0, import_react.useState)([]);
	const [flipped, setFlipped] = (0, import_react.useState)(false);
	const [score, setScore] = (0, import_react.useState)(0);
	const source = kiosk ? "kiosk" : embed ? "embed" : "web";
	const reset = (0, import_react.useCallback)(() => {
		setPhase("attract");
		setOptions([]);
		setSelectedIds([]);
		setFlipped(false);
		setScore(0);
	}, []);
	(0, import_react.useEffect)(() => {
		if (phase === "attract") return;
		let timer = window.setTimeout(reset, 9e4);
		const bump = () => {
			window.clearTimeout(timer);
			timer = window.setTimeout(reset, 9e4);
		};
		const events = [
			"pointerdown",
			"keydown",
			"touchstart"
		];
		for (const event of events) window.addEventListener(event, bump, { passive: true });
		return () => {
			window.clearTimeout(timer);
			for (const event of events) window.removeEventListener(event, bump);
		};
	}, [phase, reset]);
	function play() {
		setOptions(dealRound());
		setSelectedIds([]);
		setFlipped(false);
		setScore(0);
		setPhase("play");
	}
	function toggle(id) {
		setSelectedIds((current) => {
			if (current.includes(id)) return current.filter((item) => item !== id);
			if (current.length >= 3) return current;
			return [...current, id];
		});
	}
	function submit() {
		if (selectedIds.length !== 3) return;
		setScore(scorePicks(selectedIds));
		requestAnimationFrame(() => setFlipped(true));
	}
	if (phase === "attract") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttractScreen, {
		onPlay: play,
		kiosk,
		embed
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlipStage, {
		flipped,
		front: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizBoard, {
			options,
			selectedIds,
			onToggle: toggle,
			onSubmit: submit
		}),
		back: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsScreen, {
			score,
			selectedIds,
			optionIds: options.map((o) => o.id),
			source,
			onRestart: reset
		})
	});
}
function Home() {
	const { embed, kiosk } = Route$3.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizApp, {
		embed: Boolean(embed),
		kiosk: Boolean(kiosk)
	});
}
//#endregion
export { Home as component };
