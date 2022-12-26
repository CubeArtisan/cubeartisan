import type { ComplexStyleRule } from '@vanilla-extract/css';
import type { RecipeVariants, RuntimeFn } from '@vanilla-extract/recipes';
import type { ClassArray, ClassValue } from 'clsx';
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

type VariantDefinitions = Record<string, RecipeStyleRule>;

type VariantGroups = Record<string, VariantDefinitions>;

export type StyleProps<R = null> = {
  atoms?: Atoms;
  class?: ClassValue;
  recipe?: R;
};

export type Cond<P, True, False = never> = P extends false ? False : True;

export type ToObject<T> = T extends object ? T : object;

type DisjointIntersect<T, U> = keyof T & keyof U extends never ? T & U : never;

export type Normalize<T> = T extends (...args: infer A) => infer R
  ? (...args: Normalize<A>) => Normalize<R>
  : { [K in keyof T]: Normalize<T[K]> };

export type HTMLArtisanProps<
  T extends ElementType<{ class: string }>,
  R = null,
  P = null,
  Props extends ComponentProps<T> = ComponentProps<T>,
> = DisjointIntersect<Omit<P & Props, 'class'>, StyleProps<R>>;

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
  P = null,
  Props extends ComponentProps<T> = ComponentProps<T>,
> = Component<HTMLArtisanProps<T, R, P, Props>>;

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
  P = null,
  Props extends ComponentProps<T> = ComponentProps<T>,
> = ParentComponent<HTMLArtisanProps<T, R, P, Props>>;

/**
 * Artisan Compenent that is intended for 'Control Flow' components like <For /> and <Show />.
 * Requires a type definition for children such as '() => void'.
 * See the [Solid Docs](https://www.solidjs.com/guides/typescript#component-types) for more information.
 */
export type ArtisanFlowComponent<
  T extends ElementType<{ class: string }>,
  R = null,
  P = null,
  Props extends ComponentProps<T> = ComponentProps<T>,
> = Component<HTMLArtisanProps<T, R, P, Props>>;

/**
 * Artisan Component that unknown accepts children
 */
export type ArtisanVoidComponent<
  T extends ElementType<{ class: string }>,
  R = null,
  P = null,
  Props extends ComponentProps<T> = ComponentProps<T>,
> = VoidComponent<HTMLArtisanProps<T, R, P, Props>>;

/**
 * All html and svg elements for artisan components.
 * This is mostly for `artisan.<element>` syntax.
 */
export type HTMLArtisanComponents = {
  [Tag in DOMElements]: <S extends ElementType<{ class: string }> = Tag>(
    props: HTMLArtisanProps<Tag, null, { as?: never }> | HTMLArtisanProps<S, null, { as: S }>,
  ) => JSX.Element;
};

export type BaseRecipeFn = RuntimeFn<VariantGroups>;

export type VariantsIfExists<R extends BaseRecipeFn | null> = R extends BaseRecipeFn ? RecipeVariants<R> : null;

/**
 * Factory function that converts non-artisan components or jsx element
 * to artisan-enabled components so you can pass style props to them.
 */
export type ArtisanFactory = <T extends ElementType, R extends BaseRecipeFn | null = null>(
  component: T,
  recipeFn?: R,
) => T extends DOMElements
  ? <S extends ElementType<{ class: string }> = T>(
      props:
        | HTMLArtisanProps<T, VariantsIfExists<R>, { as?: never }>
        | HTMLArtisanProps<S, VariantsIfExists<R>, { as: S }>,
    ) => JSX.Element
  : ArtisanComponent<T, VariantsIfExists<R>>;
