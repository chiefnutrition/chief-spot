import { i as getServerFnById, n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { hn as object, ln as array, sn as _enum, vn as string } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/actions-CytFIL98.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
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
var getKlaviyoStatus = createServerFn({ method: "GET" }).handler(createSsrRpc("fe269277aefdc47a8e52011058da31d45c0b7ec146fe74c923ce00c7a5839a38"));
var claimPrize = createServerFn({ method: "POST" }).validator((input) => prizeSchema.parse(input)).handler(createSsrRpc("965a7b6cc415d56e8f67dcbc34cfcb6bd84b8cc728c34ddac13d1d5e79d8e97e"));
//#endregion
export { getKlaviyoStatus as n, claimPrize as t };
