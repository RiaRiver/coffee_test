/**
 * Returns the current time in seconds since the Unix epoch.
 *
 * @return {number} The current time in seconds
 */
export const now = () => Math.floor(Date.now() / 1000);

/**
 * Returns a formatted time string based on the input seconds.
 *
 * @param {number} seconds - The number of seconds to be formatted
 * @return {string} The formatted time string
 */
export const formattedTime = (seconds) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
