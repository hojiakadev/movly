/**
 * TMDB expects multi-value filters as `,` (AND) or `|` (OR) delimited strings.
 * Returns `undefined` for empty input so Axios omits the query param entirely.
 */
export default function toCsv(
  values?: (string | number)[] | null,
  separator: ',' | '|' = ','
): string | undefined {
  if (!values?.length) return undefined;
  return values.join(separator);
}
