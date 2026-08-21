import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as ChiefMark } from "./chief-mark-yNHKn5JU.mjs";
import { n as getKlaviyoStatus } from "./actions-CytFIL98.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shopify-CfFf0fF2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ShopifyGuide() {
	const [origin, setOrigin] = (0, import_react.useState)("https://your-app.example");
	const [klaviyo, setKlaviyo] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setOrigin(window.location.origin);
		getKlaviyoStatus().then((s) => setKlaviyo(s.configured));
	}, []);
	const iframe = `<div style="width:100%;max-width:720px;margin:0 auto;">
  <div style="position:relative;width:100%;padding-top:160%;border-radius:24px;overflow:hidden;background:#16110D;">
    <iframe
      src="${origin}/?embed=1"
      title="Chief Spot the Junk"
      style="position:absolute;inset:0;width:100%;height:100%;border:0;"
      loading="lazy"
      allow="fullscreen"
    ></iframe>
  </div>
</div>`;
	const tv = `${origin}/?kiosk=1`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-2xl px-5 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChiefMark, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-4xl font-semibold tracking-tight text-cream",
				children: "Embed Spot the Junk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-pretty text-muted",
				children: "Drop this iframe into a Shopify custom liquid section, or load the kiosk URL full-screen on an event TV."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg uppercase tracking-ui text-accent",
					children: "Shopify liquid"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "overflow-x-auto rounded-lg border border-border bg-surface p-4 text-xs leading-relaxed text-fg",
					children: iframe
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg uppercase tracking-ui text-accent",
						children: "Event TV"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Open this URL in Chrome, then tap the fullscreen icon in the corner. The board auto-resets after 90 seconds of idle."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "overflow-x-auto rounded-lg border border-border bg-surface p-4 text-xs text-fg",
						children: tv
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg uppercase tracking-ui text-accent",
						children: "Klaviyo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Prize emails fire from a Klaviyo list. Create a list (for example Spot the Junk Prize), then a private API key with profiles:write, lists:write, and subscriptions:write. Set these environment variables on the app:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "overflow-x-auto rounded-lg border border-border bg-surface p-4 text-xs text-fg",
						children: `KLAVIYO_API_KEY=pk_...
KLAVIYO_LIST_ID=XXXXXX`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Build a Klaviyo flow: when someone is added to that list, send the prize email. We also send quiz_score (0–3) and quiz_source (web / embed / kiosk) as profile properties."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Status:",
							" ",
							klaviyo === null ? "checking…" : klaviyo ? "Klaviyo is connected. Prize signups will sync to your list." : "Klaviyo is not connected yet. Signups still save, but the prize email will not send until the keys are set."
						]
					})
				]
			})
		]
	});
}
//#endregion
export { ShopifyGuide as component };
