/**
 * Formats a username by removing everything after the first non-alphanumeric character (including the character itself).
 * 
 * @param {string} name - The username string to format.
 * @return {string} - Returns the formatted username, keeping only the initial alphanumeric part.
 */
export function formatUserName(name) {
	const shortName = name.replace(/[-_ .].*/, '')
	return shortName
}