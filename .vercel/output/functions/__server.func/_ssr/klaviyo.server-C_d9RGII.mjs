//#region node_modules/.nitro/vite/services/ssr/assets/klaviyo.server-C_d9RGII.js
function isKlaviyoConfigured() {
	return Boolean(process.env.KLAVIYO_API_KEY?.trim() && process.env.KLAVIYO_LIST_ID?.trim());
}
async function subscribeToKlaviyo(input) {
	const apiKey = process.env.KLAVIYO_API_KEY?.trim();
	const listId = process.env.KLAVIYO_LIST_ID?.trim();
	if (!apiKey || !listId) return false;
	const revision = process.env.KLAVIYO_API_REVISION?.trim() || "2024-10-15";
	const body = { data: {
		type: "profile-subscription-bulk-create-job",
		attributes: {
			custom_source: "Chief Spot the Junk Quiz",
			profiles: { data: [{
				type: "profile",
				attributes: {
					email: input.email,
					first_name: input.firstName,
					properties: {
						quiz_score: input.score,
						quiz_source: input.source
					},
					subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } }
				}
			}] }
		},
		relationships: { list: { data: {
			type: "list",
			id: listId
		} } }
	} };
	const response = await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/", {
		method: "POST",
		headers: {
			Authorization: `Klaviyo-API-Key ${apiKey}`,
			revision,
			"Content-Type": "application/vnd.api+json",
			Accept: "application/vnd.api+json"
		},
		body: JSON.stringify(body)
	});
	if (!response.ok) {
		const detail = await response.text().catch(() => "");
		console.error("[klaviyo] subscribe failed", response.status, detail.slice(0, 500));
		return false;
	}
	return true;
}
//#endregion
export { isKlaviyoConfigured, subscribeToKlaviyo };
