import { quotes } from '../data/quotes';

export function getAllQuotes() {
	return quotes;
}

export function getQuotesByText(enteredQuote: string | undefined) {
	if (!enteredQuote) {
		return undefined;
	}
	const quote = quotes.filter((q) => q.text.toLowerCase().startsWith(enteredQuote.toLowerCase()));
	return quote ? quote : undefined;
}

export function getQuotesByAuthor(enteredAuthor: string | undefined) {
	if (!enteredAuthor) {
		return undefined;
	}
	const quote = quotes.filter((q) => q.author.toLowerCase().startsWith(enteredAuthor.toLowerCase()));
	console.log(quote);
	return quote ? quote : undefined;
}

export function getQuotesByBook(enteredBook: string | undefined) {
	if (!enteredBook) {
		return undefined;
	}
	const quote = quotes.filter((q) => q.book.toLowerCase().startsWith(enteredBook.toLowerCase()));
	return quote ? quote : undefined;
}

/**
 * Retrieves today's quote based on the current day of the year.
 *
 * @returns {string} The quote for today.
 *
 * @remarks
 * - The function calculates the day of the year by determining the difference
 *   between today's date and the start of the year in mille-seconds.
 * - It then uses this day of the year to select a quote from the `quotes` array.
 * - We calculate how many mille-seconds in a day, to use it so we can calculate the index
 * - The index is determined by taking the modulus of the day of the year with
 *   the length of the `quotes` array to ensure it wraps around if necessary.
 */

export function getTodaysQuote() {
	const today = new Date();
	const start = new Date(today.getFullYear(), 0, 0);
	const diff = today.getTime() - start.getTime();
	const oneDay = 1000 * 60 * 60 * 24;
	const dayOfYear = Math.floor(diff / oneDay);
	return quotes[dayOfYear];
}

export function getRandomQuote() {
	const randomIndex = Math.floor(Math.random() * quotes.length);
	return quotes[randomIndex];
}
