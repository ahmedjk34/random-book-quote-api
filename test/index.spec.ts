import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';
import { quotes } from '../src/data/quotes';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Quote API worker', () => {
	it("responds with today's quote", async () => {
		const request = new IncomingRequest('http://example.com/quote/today');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		const todayQuote = await response.json();
		expect(quotes).toContainEqual(todayQuote);
	});

	it('responds with a random quote', async () => {
		const request = new IncomingRequest('http://example.com/quote/random');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		const randomQuote = await response.json();
		expect(quotes).toContainEqual(randomQuote);
	});

	it('responds with all quotes', async () => {
		const request = new IncomingRequest('http://example.com/quotes');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		const allQuotes = await response.json();
		expect(allQuotes).toEqual(quotes);
	});

	it('responds with a quote by text', async () => {
		const text = quotes[0].quote.split(' ')[0];
		const request = new IncomingRequest(`http://example.com/quotes?text=${text}`);
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		const quote = await response.json();
		expect(quote).toEqual(quotes[0]);
	});

	it('responds with a quote by author', async () => {
		const author = quotes[0].author.split(' ')[0];
		const request = new IncomingRequest(`http://example.com/quotes?author=${author}`);
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		const quote = await response.json();
		expect(quote).toEqual(quotes[0]);
	});

	it('responds with a quote by book', async () => {
		const book = quotes[0].book.split(' ')[0];
		const request = new IncomingRequest(`http://example.com/quotes?book=${book}`);
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		const quote = await response.json();
		expect(quote).toEqual(quotes[0]);
	});

	it('responds with 404 for unknown path', async () => {
		const request = new IncomingRequest('http://example.com/unknown');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		expect(response.status).toBe(404);
	});
	it('responds with 404 for non-existent author', async () => {
		const request = new IncomingRequest('http://example.com/quotes?author=nonexistentauthor');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		expect(response.status).toBe(404);
	});

	it('responds with 404 for non-existent book', async () => {
		const request = new IncomingRequest('http://example.com/quotes?book=nonexistentbook');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		expect(response.status).toBe(404);
	});

	it('responds with 404 for non-existent quote text', async () => {
		const request = new IncomingRequest('http://example.com/quotes?text=nonexistentquote');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		expect(response.status).toBe(404);
	});
});
