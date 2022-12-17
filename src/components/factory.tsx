import clsx from 'clsx';
import { mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import type {
  ArtisanComponent,
  ArtisanFactory,
  DOMElements,
  ElementType,
  HTMLArtisanComponents,
  HTMLArtisanProps,
} from '@cubeartisan/cubeartisan/components/types';
import { atoms } from '@cubeartisan/cubeartisan/styles';

/**
 * Take a props object and return only the keys that match a style prop.
 */
function getUsedStylePropNames(props: Record<string | number, unknown>) {
  return Object.keys(props).filter((key) => atoms.properties.has(key)) as Array<keyof atoms.properties>;
}

const styled: ArtisanFactory = <T extends ElementType>(component: T) => {
  const artisanComponent: ArtisanComponent<T> = (props) => {
    const usedStylePropNames = getUsedStylePropNames(props);

    const propsWithDefault = mergeProps({ as: component }, props);

    const [local, styleProps, others] = splitProps(
      propsWithDefault as HTMLArtisanProps<unknown>,
      ['as', 'class', 'className'],
      usedStylePropNames,
    );

    return (
      <Dynamic
        component={local.as ?? 'div'}
        class={clsx(local.class, local.className, atoms({ ...styleProps }))}
        {...others}
      />
    );
  };

  return artisanComponent;
};

function factory() {
  const cache = new Map<DOMElements, ArtisanComponent<DOMElements>>();

  return new Proxy(styled, {
    /**
     * @example
     * <hope.div />
     */
    get(_, element: DOMElements) {
      if (!cache.has(element)) {
        cache.set(element, styled(element));
      }
      return cache.get(element);
    },
  }) as ArtisanFactory & HTMLArtisanComponents;
}

const artisan = factory();
export default artisan;
