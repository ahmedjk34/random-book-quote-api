/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { getAllQuotes, getQuotesByAuthor, getQuotesByBook, getQuotesByText, getRandomQuote, getTodaysQuote } from './routes/api';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;
		const searchParams = url.searchParams;

		let responseQuote;

		// Handle the request based on URL path
		if (path === '/quotes') {
			if (searchParams.has('text')) {
				responseQuote = getQuotesByText(searchParams.get('text') ?? '');
			} else if (searchParams.has('author')) {
				responseQuote = getQuotesByAuthor(searchParams.get('author') ?? '');
			} else if (searchParams.has('book')) {
				responseQuote = getQuotesByBook(searchParams.get('book') ?? '');
			} else {
				responseQuote = getAllQuotes();
			}
		} else if (path === '/quote/today') {
			responseQuote = getTodaysQuote();
		} else if (path === '/quote/random') {
			responseQuote = getRandomQuote();
		} else {
			return new Response('Not Found', { status: 404 });
		}

		// Return the quote as JSON or an error message if not found
		console.log();
		if (responseQuote) {
			return new Response(JSON.stringify(responseQuote), { headers: { 'Content-Type': 'application/json' } });
		} else {
			return new Response('Quote not found', { status: 404 });
		}
	},
} satisfies ExportedHandler<Env>;
