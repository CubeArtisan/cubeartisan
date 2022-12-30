import type { RuntimeFn } from '@vanilla-extract/recipes';
import clsx from 'clsx';
import { ComponentProps, createMemo, JSX, mergeProps, Show, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import type {
  ArtisanComponent,
  ArtisanFactory,
  DOMElements,
  ElementType,
  HTMLArtisanComponents,
  HTMLArtisanProps,
  VariantGroups,
  VariantsIfExists,
} from '@cubeartisan/cubeartisan/components/types';
import { atoms } from '@cubeartisan/cubeartisan/styles';

const styled = <T extends ElementType<{ class: string }>, R extends RuntimeFn<VariantGroups> | null = null>(
  component: T,
  recipeFn?: R,
) => {
  const artisanComponent = <S extends ElementType<{ class: string }> = T>(
    props:
      | HTMLArtisanProps<T, VariantsIfExists<R>, { as?: never }>
      | HTMLArtisanProps<S, VariantsIfExists<R>, { as: S }>,
  ) => {
    const [local, rest] = splitProps(props, ['as', 'class', 'atoms', 'recipe']);
    const classProp = createMemo(() => {
      if (recipeFn) {
        return { class: clsx(local.class, atoms({ ...local.atoms }), recipeFn(local.recipe ?? undefined)) };
      }
      return { class: clsx(local.class, atoms({ ...local.atoms })) };
    });
    // eslint-disable-next-line solid/reactivity
    const subProps = mergeProps(classProp, rest) as ComponentProps<S> | ComponentProps<T>;

    return (
      <Show
        when={local.as as S | undefined}
        keyed
        fallback={
          <Dynamic
            component={component as T}
            {...(subProps as { [K in keyof ComponentProps<T>]: ComponentProps<T>[K] })}
          />
        }
      >
        {(as: NonNullable<S>) => (
          <Dynamic component={as as S} {...(subProps as { [K in keyof ComponentProps<S>]: ComponentProps<S>[K] })} />
        )}
      </Show>
    );
  };
  return artisanComponent;
};

const styledNoAs = <T extends ElementType<{ class: string }>, R extends RuntimeFn<VariantGroups> | null = null>(
  component: T,
  recipeFn?: R,
) => {
  const artisanComponent = (props: HTMLArtisanProps<T, VariantsIfExists<R>>) => {
    const [local, rest] = splitProps(props, ['class', 'atoms', 'recipe']);
    const classProp = createMemo(() =>
      clsx(local.class, atoms({ ...local.atoms }), ...(recipeFn && local.recipe ? [recipeFn(local.recipe)] : [])),
    );
    // eslint-disable-next-line solid/reactivity
    const subProps = mergeProps({ class: classProp }, rest) as ComponentProps<T>;

    return (
      <Dynamic component={component as T} {...(subProps as { [K in keyof ComponentProps<T>]: ComponentProps<T>[K] })} />
    );
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
    apply<T extends ElementType<{ class: string }>, R extends RuntimeFn<VariantGroups> | null = null>(
      _1: typeof styled,
      _2: unknown,
      argArray: [T] | [T, R],
    ): T extends DOMElements
      ? <S extends ElementType<{ class: string }> = T>(
          props:
            | HTMLArtisanProps<T, VariantsIfExists<R>, { as?: never }>
            | HTMLArtisanProps<S, VariantsIfExists<R>, { as: S }>,
        ) => JSX.Element
      : ArtisanComponent<T, VariantsIfExists<R>> {
      if (typeof argArray[0] === 'string') {
        if (argArray.length === 1) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return styled(...argArray);
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return styled(...argArray);
      }
      if (argArray.length === 1) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return styledNoAs(...argArray);
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return styledNoAs(...argArray);
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
