import { Component, ComponentProps, JSX, ParentComponent, VoidComponent } from 'solid-js';

import type { Atoms } from '@cubeartisan/cubeartisan/styles/atoms/atoms.css';
import type { OverrideProps } from '@cubeartisan/cubeartisan/utils';

/**
 * All HTML and SVG elements.
 */
export type DOMElements = keyof JSX.IntrinsicElements;

/**
 * Represent any HTML element or SolidJS component.
 */
export type ElementType<Props = Record<string, unknown>> = DOMElements | Component<Props>;

/**
 * Take the props of the passed HTML element or component and returns its type.
 */
export type PropsOf<C extends ElementType> = ComponentProps<C>;

/**
 * Tag or component that should be used as root element.
 */
export interface AsProp<C extends ElementType> {
  as?: C;
}

export type StyleProps<R = Record<string, unknown>> = {
  atoms?: Atoms;
  recipe?: R;
};

/**
 * Enhance props of a SolidJS component or JSX element with Artisan props and AsProp
 */
export type HTMLArtisanProps<
  T extends ElementType = unknown,
  R = Record<string, unknown>,
  P = Record<string, unknown>,
> = OverrideProps<ComponentProps<T>, AsProp<T> & StyleProps<R> & P>;

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
  T extends ElementType = 'div',
  R = Record<string, unknown>,
  P = Record<string, unknown>,
> = Component<HTMLArtisanProps<T, R, P>>;

/**
 * Artisan Compenent that accepts Artisan Props (atoms, recipe, as) and children.
 *
 * @param T - the Element type to extend (adds those props) (default 'div')
 * @param R - the Vanilla Extract recipe for the component
 * @param P - any additional props
 * @example
 * ```
 * ArtisanParentComponent<'h1', styles.componentRecipe, {foo: string, bar?: string}>
 * ```
 */
export type ArtisanParentComponent<
  T extends ElementType,
  R = Record<string, unknown>,
  P = Record<string, unknown>,
> = ParentComponent<HTMLArtisanProps<T, R, P>>;

/**
 * Artisan Compenent that is intended for 'Control Flow' components like <For /> and <Show />.
 * Requires a type definition for children such as '() => void'.
 * See the [Solid Docs](https://www.solidjs.com/guides/typescript#component-types) for more information.
 */
export type ArtisanFlowComponent<
  T extends ElementType,
  R = Record<string, unknown>,
  P = Record<string, unknown>,
  C = JSX.Element,
> = Component<HTMLArtisanProps<T, R, P>, C>;

/**
 * Artisan Component that unknown accepts children
 */
export type ArtisanVoidComponent<
  T extends ElementType,
  R = Record<string, unknown>,
  P = Record<string, unknown>,
> = VoidComponent<HTMLArtisanProps<T, R, P>>;

/**
 * All html and svg elements for artisan components.
 * This is mostly for `artisan.<element>` syntax.
 */
export type HTMLArtisanComponents = {
  [Tag in DOMElements]: ArtisanComponent<Tag>;
};

/**
 * Factory function that converts non-artisan components or jsx element
 * to artisan-enabled components so you can pass style props to them.
 */
export type ArtisanFactory = <T extends ElementType, R = Record<string, unknown>, P = Record<string, unknown>>(
  component: T,
) => ArtisanComponent<T, R, P>;
