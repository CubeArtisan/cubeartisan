import type { ComplexStyleRule } from '@vanilla-extract/css';
import type { RecipeVariants, RuntimeFn } from '@vanilla-extract/recipes';
import type { ClassValue } from 'clsx';
import type { Component, ComponentProps, JSX, ParentComponent, VoidComponent } from 'solid-js';

import type { Atoms } from '@cubeartisan/cubeartisan/styles/atoms/atoms.css';

/**
 * All HTML and SVG elements.
 */
export type DOMElements = keyof JSX.IntrinsicElements;

/**
 * Represent any HTML element or SolidJS component.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ElementType<Props = any> = DOMElements | Component<Props>;

/**
 * Take the props of the passed HTML element or component and returns its type.
 */
export type PropsOf<C extends ElementType> = ComponentProps<C>;

type RecipeStyleRule = ComplexStyleRule | string;

export type VariantDefinitions = Record<string, RecipeStyleRule>;

export type VariantGroups = Record<string, VariantDefinitions>;

export type StyleProps<R = null> = {
  atoms?: Atoms;
  class?: ClassValue;
  recipe?: R;
};

export type IsDisjoint<T, U, Allow = never> = Exclude<Extract<keyof T, keyof U>, Allow> extends never ? true : false;

export type Cond<P, True, False = never> = P extends false ? False : True;

export type ToObject<T> = T extends object ? T : object;

export type TypesEqual<T, U> = T extends U ? (U extends T ? true : false) : false;
type DisjointIntersect<T, U> = keyof T & keyof U extends never ? T & U : never;
export type HTMLArtisanProps<
  T extends ElementType<{ class: string }>,
  R = null,
  P extends ComponentProps<T> = ComponentProps<T>,
> = DisjointIntersect<Omit<P, 'class'>, StyleProps<R>>;
export type Normalize<T> = T extends (...args: infer A) => infer R
  ? (...args: Normalize<A>) => Normalize<R>
  : { [K in keyof T]: Normalize<T[K]> };
/**
 * Component that accepts Artisan Props (atoms, recipe, as).
 * Not intended to accept children.
 *
 * @param T - the Element type to extend (adds those props) (default 'div')
 * @param R - the Vanilla Extract recipe for the component
 * @param P - any additional props
 * @example
 * ```
 * ArtisanComponent<'h1', styles.componentRecipe, {foo: string, bar?: string}>
 * ```
 */
export type ArtisanComponent<
  T extends ElementType<{ class: string }> = 'div',
  R = null,
  P extends ComponentProps<T> = ComponentProps<T>,
> = Component<HTMLArtisanProps<T, R, P>>;

/**
 * Artisan Compenent that accepts Artisan Props (atoms, recipe, as) and children.
 *
 * @param T - the Element type to extend (adds those props) (default 'div')
 * @param P - any additional props
 * @param R - the Vanilla Extract recipe for the component
 * @example
 * ```
 * ArtisanParentComponent<'h1', styles.componentRecipe, {foo: string, bar?: string}>
 * ```
 */
export type ArtisanParentComponent<
  T extends ElementType<{ class: string }>,
  R = null,
  P extends ComponentProps<T> = ComponentProps<T>,
> = ParentComponent<HTMLArtisanProps<T, R, P>>;

/**
 * Artisan Compenent that is intended for 'Control Flow' components like <For /> and <Show />.
 * Requires a type definition for children such as '() => void'.
 * See the [Solid Docs](https://www.solidjs.com/guides/typescript#component-types) for more information.
 */
export type ArtisanFlowComponent<
  T extends ElementType<{ class: string }>,
  R = null,
  P extends ComponentProps<T> = ComponentProps<T>,
> = Component<HTMLArtisanProps<T, R, P>>;

/**
 * Artisan Component that unknown accepts children
 */
export type ArtisanVoidComponent<
  T extends ElementType<{ class: string }>,
  R = null,
  P extends ComponentProps<T> = ComponentProps<T>,
> = VoidComponent<HTMLArtisanProps<T, R, P>>;

/**
 * All html and svg elements for artisan components.
 * This is mostly for `artisan.<element>` syntax.
 */
export type HTMLArtisanComponents = {
  [Tag in DOMElements]: <S extends ElementType = Tag>(
    props: (HTMLArtisanProps<Tag> & { as?: undefined }) | (HTMLArtisanProps<S> & { as: S }),
  ) => JSX.Element;
};

export type BaseRecipeFn = RuntimeFn<VariantGroups>;

export type VariantsIfExists<R extends BaseRecipeFn | null> = R extends BaseRecipeFn ? RecipeVariants<R> : null;

/**
 * Factory function that converts non-artisan components or jsx element
 * to artisan-enabled components so you can pass style props to them.
 */
export type ArtisanFactory = <
  T extends ElementType<{ class: string }>,
  R extends RuntimeFn<VariantGroups> | null = null,
>(
  component: T,
  recipeFn?: R,
) => T extends DOMElements
  ? <S extends ElementType = T>(
      props:
        | (HTMLArtisanProps<T, VariantsIfExists<R>> & { as?: undefined })
        | (HTMLArtisanProps<S, VariantsIfExists<R>> & { as: S }),
    ) => JSX.Element
  : ArtisanComponent<T, VariantsIfExists<R>>;
