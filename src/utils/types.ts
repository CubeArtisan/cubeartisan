/**
 * Allows for extending a set of props (`Source`) by an overriding set of props
 * (`Override`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type OverrideProps<Source extends Record<string, unknown>, Override extends Record<string, unknown>> = Omit<
  Source,
  Override
> &
  Override;
