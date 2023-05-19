import {
  array,
  Infer,
  number,
  object,
  optional,
  string,
  type,
} from "superstruct";

/**
 * An example zod object for demonstration. This is declared as:
 *
 * ```ts
 * export const MyStruct = type({
 *   prop: string(),
 *   other: object({
 *     arr: array(number()),
 *   }),
 *   opt: optional(string()),
 * });
 * ```
 */
export const MyStruct = type({
  /**
   * A string property.
   */
  prop: string(),
  /**
   * An object property.
   */
  other: object({
    /**
     * A nested array property.
     */
    arr: array(number()),
  }),
  /**
   * This property is optional.
   */
  opt: optional(string()),
});

/**
 * Exported type alias which infers its type using the {@link MyStruct} schema.
 *
 * This is declared as:
 * ```ts
 * export type MyType = Infer<typeof MyStruct>;
 * ```
 */
export type MyType = Infer<typeof MyStruct>;
