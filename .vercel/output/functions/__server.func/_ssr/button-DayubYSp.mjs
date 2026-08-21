import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn } from "./chief-mark-yNHKn5JU.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-DayubYSp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-wide transition-[transform,background-color,color,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 disabled:pointer-events-none disabled:opacity-40 active:enabled:scale-96", {
	variants: {
		variant: {
			primary: "bg-cream text-ink hover:bg-fg",
			accent: "bg-accent text-accent-fg hover:opacity-90",
			outline: "border border-border-strong bg-transparent text-fg hover:bg-surface-2",
			ghost: "text-muted hover:text-fg hover:bg-surface-2"
		},
		size: {
			md: "h-11 rounded-md px-5 text-sm",
			lg: "h-14 rounded-lg px-7 text-base",
			xl: "h-16 rounded-xl px-8 text-lg"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "lg"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { Button as t };
