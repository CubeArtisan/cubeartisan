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

export type PropsIncludes<Props extends Record<string, any>> = ElementType<
  Props & { [K in string as Exclude<K, keyof Props>]: any }
>;

export type StyleableComponent<Props = any> = PropsIncludes<{ class: string } & Props>;

/**
 * Take the props of the passed HTML element or component and returns its type.
 */
export type PropsOf<C extends ElementType> = ComponentProps<C>;

export type Forbid<K extends string> = { [Key in K]?: never };

export type OmitProps<C extends ElementType, K extends string> = C extends ElementType
  ? Component<Omit<ComponentProps<C>, K>>
  : never;

type RecipeStyleRule = ComplexStyleRule | string;

type VariantDefinitions = Record<string, RecipeStyleRule>;

type VariantGroups = Record<string, VariantDefinitions>;

export type StyleProps<R = null> = {
  atoms?: Atoms;
  class?: ClassValue;
  recipe?: R;
};

export type ToIntersectable<T> = T extends object ? T : object;

type DisjointIntersect<T, U> = keyof T & keyof U extends never ? T & U : never;

export type Normalize<T> = T extends (...args: infer A) => infer R
  ? (...args: Normalize<A>) => Normalize<R>
  : { [K in keyof T]: Normalize<T[K]> };

export type HTMLArtisanProps<
  T extends StyleableComponent,
  R = null,
  P = null,
  Props extends ComponentProps<T> = ComponentProps<T>,
> = DisjointIntersect<Omit<P extends object ? P & Props : Props, 'class'>, StyleProps<R>>;

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
  T extends StyleableComponent,
  R = null,
  P = null,
  Props extends ComponentProps<T> = ComponentProps<T>,
> = Component<HTMLArtisanProps<T, R, P, Props>>;

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
  T extends StyleableComponent,
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
  T extends StyleableComponent,
  R = null,
  P = null,
  Props extends ComponentProps<T> = ComponentProps<T>,
> = Component<HTMLArtisanProps<T, R, P, Props>>;

/**
 * Artisan Component that unknown accepts children
 */
export type ArtisanVoidComponent<
  T extends StyleableComponent,
  R = null,
  P = null,
  Props extends ComponentProps<T> = ComponentProps<T>,
> = VoidComponent<HTMLArtisanProps<T, R, P, Props>>;

export type BaseRecipeFn = RuntimeFn<VariantGroups>;

export type VariantsIfExists<R> = R extends BaseRecipeFn ? RecipeVariants<R> : null;

export type ArtisanDynamicComponent<T extends DOMElements, R = null, P = object> = {
  <S extends StyleableComponent = T>(props: HTMLArtisanProps<S, R, P & { as: S }>): JSX.Element;
  (props: HTMLArtisanProps<T, R, P>): JSX.Element;
};

export type AddProps<Comp extends ElementType, Add extends Record<string, any>> = Comp extends ArtisanDynamicComponent<
  infer T,
  infer R,
  infer P
>
  ? ArtisanDynamicComponent<T, R, P & Add>
  : Comp extends ElementType
  ? Component<DisjointIntersect<ComponentProps<Comp>, Add>>
  : never;

/**
 * Factory function that converts non-artisan components or jsx element
 * to artisan-enabled components so you can pass style props to them.
 */
export interface ArtisanFactory<T extends ElementType, R extends BaseRecipeFn | null = null> {
  (component: T, recipeFn?: R): T extends DOMElements
    ? ArtisanDynamicComponent<T, VariantsIfExists<R>>
    : ArtisanComponent<T, VariantsIfExists<R>>;
}

export type ArtisanFactoryFcn = <T extends ElementType, R extends BaseRecipeFn | null = null>(
  component: T,
  recipeFn?: R,
) => ReturnType<ArtisanFactory<T, R>>;

/**
 * All html and svg elements for artisan components.
 * This is mostly for `artisan.<element>` syntax.
 */
export type HTMLArtisanComponents = {
  [Tag in DOMElements]: ReturnType<ArtisanFactory<Tag, null>>;
};
