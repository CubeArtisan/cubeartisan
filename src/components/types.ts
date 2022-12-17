import { Component, ComponentProps, JSX, ParentProps } from 'solid-js';

import type { Atoms } from '@cubeartisan/cubeartisan/styles/atoms/atoms.css';

/**
 * All HTML and SVG elements.
 */
export type DOMElements = keyof JSX.IntrinsicElements;

/**
 * Represent any HTML element or SolidJS component.
 */
export type ElementType<Props = unknown> = DOMElements | Component<Props>;

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

/**
 * Allows for extending a set of props (`Source`) by an overriding set of props
 * (`Override`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type OverrideProps<Source = unknown, Override = unknown> = Omit<Source, keyof Override> & Override;

/**
 * All props that apply css classes.
 */
export interface ClassProps {
  class?: string;
  classList?: { [key: string]: boolean };
}

/**
 * Artisan specific props
 */
export type ArtisanProps = Atoms & ClassProps;

/**
 * Enhance props of a SolidJS component or JSX element with style props
 */
export type HTMLArtisanProps<
  C extends ElementType,
  Recipes = unknown?,
  AdditionalProps = Record<string, unknown>?,
> = OverrideProps<ParentProps<PropsOf<C>>, ArtisanProps & Recipes & AdditionalProps & AsProp<C>>;

/**
 * A component that accepts style props.
 */
export type ArtisanComponent<T extends ElementType, R = unknown?, P = Record<string, unknown>?> = <
  C extends ElementType = T,
  Recipes = R,
  AdditionalProps = P,
>(
  props: HTMLArtisanProps<C, Recipes, AdditionalProps>,
) => JSX.Element;

/**
 * All html and svg elements for artisan components.
 * This is mostly for `artisan.<element>` syntax.
 */
export type HTMLArtisanComponents = {
  [Tag in DOMElements]: ArtisanComponent<Tag>;
};

/**
 * Factory function that converts non-hope components or jsx element
 * to hope-enabled components so you can pass style props to them.
 */
export type ArtisanFactory = <T extends ElementType>(component: T) => ArtisanComponent<T>;
