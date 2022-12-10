import type { Component, ParentComponent } from 'solid-js';

export type HeroHeaderProps = {
  title: string;
  subtitle: string;
};

export const Header: ParentComponent<HeroHeaderProps> = (props) => (
  <header>
    <h1>{props.title}</h1>
    <p>{props.subtitle}</p>
  </header>
);

/**
 * wraps text in a <p> tag with appropriate styling for the hero
 */
export const Content: ParentComponent = (props) => <p>{props.children}</p>;

export type HeroProps = {
  layout: 'center' | 'left' | 'right' | 'split';
  background: 'gradient' | 'solid';
};

export const Hero: ParentComponent<HeroProps> = (props) => <div class= >{props.children}</div>;
