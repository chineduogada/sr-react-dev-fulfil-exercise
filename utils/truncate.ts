/**
 * @function
 * truncates a string: helps shorten long strings.
 *
 * @param {string} str - the string.
 * @param {number} maxLength - the length to truncate from
 * @returns a `string`: the `truncated` string.
 *
 * @example
 * const description = truncateText(data.desc, 30);
 *
 * @returns { string }
 */
const truncate = (str: string, maxLength: number): string => {
  if (!maxLength || str.length <= maxLength) {
    return str;
  }

  const truncated = `${str.slice(0, maxLength - 3)}...`;

  return truncated;
};

export default truncate;
