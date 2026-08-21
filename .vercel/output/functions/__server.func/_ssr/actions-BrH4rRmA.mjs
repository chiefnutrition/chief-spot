import { n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { o as scorePicks } from "./deal-BnlYTHRf.mjs";
import { hn as object, ln as array, sn as _enum, vn as string } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/actions-BrH4rRmA.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var prizeSchema = object({
	firstName: string().trim().min(1).max(80),
	email: string().trim().toLowerCase().max(200),
	selectedIds: array(string().min(1)).length(3),
	optionIds: array(string().min(1)).length(9),
	source: _enum([
		"web",
		"embed",
		"kiosk"
	]),
	website: string().optional()
});
var getKlaviyoStatus_createServerFn_handler = createServerRpc({
	id: "fe269277aefdc47a8e52011058da31d45c0b7ec146fe74c923ce00c7a5839a38",
	name: "getKlaviyoStatus",
	filename: "src/lib/quiz/actions.ts"
}, (opts) => getKlaviyoStatus.__executeServer(opts));
var getKlaviyoStatus = createServerFn({ method: "GET" }).handler(getKlaviyoStatus_createServerFn_handler, async () => {
	const { isKlaviyoConfigured } = await import("./klaviyo.server-C_d9RGII.mjs");
	return { configured: isKlaviyoConfigured() };
});
var claimPrize_createServerFn_handler = createServerRpc({
	id: "965a7b6cc415d56e8f67dcbc34cfcb6bd84b8cc728c34ddac13d1d5e79d8e97e",
	name: "claimPrize",
	filename: "src/lib/quiz/actions.ts"
}, (opts) => claimPrize.__executeServer(opts));
var claimPrize = createServerFn({ method: "POST" }).validator((input) => prizeSchema.parse(input)).handler(claimPrize_createServerFn_handler, async ({ data }) => {
	if (data.website && data.website.trim()) return {
		ok: true,
		score: 0,
		synced: false
	};
	if (!EMAIL_RE.test(data.email)) throw new Error("Enter a valid email address.");
	const score = scorePicks(data.selectedIds);
	const { getSql } = await import("./db-BmoIekU4.mjs").then((n) => n.t);
	const sql = await getSql();
	let synced = false;
	try {
		const { subscribeToKlaviyo } = await import("./klaviyo.server-C_d9RGII.mjs");
		synced = await subscribeToKlaviyo({
			email: data.email,
			firstName: data.firstName,
			score,
			source: data.source
		});
	} catch (err) {
		console.error("[klaviyo] threw", err);
	}
	await sql`
      insert into prize_entries
        (first_name, email, score, selected_ids, option_ids, source, klaviyo_synced)
      values
        (
          ${data.firstName},
          ${data.email},
          ${score},
          ${JSON.stringify(data.selectedIds)},
          ${JSON.stringify(data.optionIds)},
          ${data.source},
          ${synced}
        )
    `;
	return {
		ok: true,
		score,
		synced
	};
});
//#endregion
export { claimPrize_createServerFn_handler, getKlaviyoStatus_createServerFn_handler };
