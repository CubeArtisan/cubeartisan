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

const styled: ArtisanFactory = <T extends ElementType>(component: T) => {
  const artisanComponent: ArtisanComponent<T> = (props) => {
    const propsWithDefault = mergeProps({ as: component }, props);

    const [local, others] = splitProps(propsWithDefault as HTMLArtisanProps<T>, ['as', 'class', 'atoms']);

    return <Dynamic component={local.as ?? 'div'} class={clsx(local.class, atoms({ ...local.atoms }))} {...others} />;
  };
  return artisanComponent;
};

function factory() {
  const cache = new Map<DOMElements, ArtisanComponent<DOMElements>>();

  return new Proxy(styled, {
    // /**
    //  * @example
    //  * const Div = hope("div")
    //  * const WithHope = hope(AnotherComponent)
    //  */
    // apply(target, thisArg, argArray: [ElementType]) {
    //   return styled(...argArray);
    // },

    /**
     * @example
     * <artisan.div />
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
