import { y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chief-mark-yNHKn5JU.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function ChiefMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("font-display text-[0.7rem] font-semibold uppercase tracking-brand text-cream sm:text-sm", className),
		children: "Chief"
	});
}
//#endregion
export { cn as n, ChiefMark as t };
