import type { RuntimeFn, RuntimeFn, RuntimeFn, RuntimeFn } from '@vanilla-extract/recipes';
import clsx from 'clsx';
import { ComponentProps, createMemo, JSX, Show, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import type {
  ArtisanComponent,
  ArtisanFactory,
  BaseRecipeFn,
  BaseRecipeFn,
  DOMElements,
  ElementType,
  HTMLArtisanComponents,
  HTMLArtisanProps,
  StyleProps,
  StyleProps,
  VariantGroups,
  VariantsIfExists,
} from '@cubeartisan/cubeartisan/components/types';
import { atoms } from '@cubeartisan/cubeartisan/styles';

const getClass = <R extends BaseRecipeFn | null = null>(local: StyleProps<VariantsIfExists<R>>, recipeFn: R) =>
  clsx(local.class, atoms({ ...local.atoms }), ...(recipeFn && local.recipe ? [recipeFn(local.recipe)] : []));

const getPassedProps = <T extends ElementType, S extends ElementType = T, R extends BaseRecipeFn | null = null>(
  component: T,
  local: StyleProps<VariantsIfExists<R>> & { as?: S },
  recipeFn: R,
) => ({ component: (local.as ?? component) as S, class: getClass(local, recipeFn) });

const styled = <T extends ElementType, R extends RuntimeFn<VariantGroups> | null = null>(
  component: T,
  recipeFn?: R,
) => {
  const artisanComponent = <S extends ElementType = T>(props: HTMLArtisanProps<T, VariantsIfExists<R>, null, S>) => {
    const [local] = splitProps(props, ['as', 'class', 'atoms', 'recipe']);

    return <Dynamic {...getPassedProps(component, local, recipeFn ?? null)} {...props} />;
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
    apply(_1, _2, argArray: [ElementType]) {
      return styled(...argArray);
    },

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
