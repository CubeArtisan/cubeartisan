import clsx from 'clsx';
import { ComponentProps, createMemo, mergeProps, Show, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import type {
  ArtisanComponent,
  ArtisanFactory,
  ArtisanFactoryFcn,
  BaseRecipeFn,
  DOMElements,
  ElementType,
  HTMLArtisanComponents,
  HTMLArtisanProps,
  StyleableComponent,
  VariantsIfExists,
} from '@cubeartisan/cubeartisan/components/types';
import { atoms } from '@cubeartisan/cubeartisan/styles';

const styledDOMElement = <Tag extends DOMElements, R extends BaseRecipeFn | null = null>(
  component: Tag,
  recipeFn?: R,
): ReturnType<ArtisanFactory<Tag, R>> => {
  const artisanComponent = (<S extends StyleableComponent = Tag>(
    props:
      | HTMLArtisanProps<Tag, VariantsIfExists<R>, { as?: never }>
      | HTMLArtisanProps<S, VariantsIfExists<R>, { as: S }>,
  ) => {
    const [local, others] = splitProps(props, ['as', 'class', 'atoms', 'recipe']);
    const classProp = createMemo(() => {
      if (recipeFn) {
        return { class: clsx(local.class, atoms({ ...local.atoms }), recipeFn(local.recipe ?? undefined)) };
      }
      return { class: clsx(local.class, atoms({ ...local.atoms })) };
    });
    // eslint-disable-next-line solid/reactivity
    const subProps = mergeProps(classProp, others) as ComponentProps<S> | ComponentProps<Tag>;

    return (
      <Show
        when={local.as as S | undefined}
        keyed
        fallback={
          <Dynamic
            component={component}
            {...(subProps as { [K in keyof ComponentProps<Tag>]: ComponentProps<Tag>[K] })}
          />
        }
      >
        {(as: NonNullable<S>) => (
          <Dynamic component={as as S} {...(subProps as { [K in keyof ComponentProps<S>]: ComponentProps<S>[K] })} />
        )}
      </Show>
    );
  }) as ReturnType<ArtisanFactory<Tag, R>>;
  return artisanComponent;
};

const styledNoAs = <T extends StyleableComponent, R extends BaseRecipeFn | null = null>(
  component: T,
  recipeFn?: R,
): ArtisanComponent<T, VariantsIfExists<R>> => {
  const artisanComponent: ArtisanComponent<T, VariantsIfExists<R>> = (props) => {
    const [local, others] = splitProps(props, ['class', 'atoms', 'recipe']);

    const classProp = createMemo(() => {
      if (recipeFn) {
        return { class: clsx(local.class, atoms({ ...local.atoms }), recipeFn(local.recipe ?? undefined)) };
      }
      return { class: clsx(local.class, atoms({ ...local.atoms })) };
    });

    // eslint-disable-next-line solid/reactivity
    const subProps = mergeProps(classProp, others) as ComponentProps<T>;

    return (
      <Dynamic component={component as T} {...(subProps as { [K in keyof ComponentProps<T>]: ComponentProps<T>[K] })} />
    );
  };
  return artisanComponent;
};

const componentIsDOMElement = (component: ElementType): component is DOMElements => typeof component === 'string';

const factory = (): ArtisanFactoryFcn & HTMLArtisanComponents => {
  const cache = new Map<DOMElements, ReturnType<ArtisanFactory<DOMElements, null>>>();
  const artisan = new Proxy(styledNoAs, {
    /**
     * @example
     * const Div = artisan("div")
     * const WithArtisan = artisan(AnotherComponent)
     */
    apply<T extends StyleableComponent, R extends BaseRecipeFn | null = null>(
      _1: unknown,
      _2: unknown,
      [component, recipeFn]: [T] | [T, R],
    ): ReturnType<ArtisanFactory<T, R>> {
      if (componentIsDOMElement(component)) {
        return styledDOMElement(component, recipeFn);
      }
      return styledNoAs<T, R>(component, recipeFn) as ReturnType<ArtisanFactory<T, R>>;
    },

    /**
     * @example
     * <artisan.div />
     */
    get<Tag extends DOMElements>(_: unknown, component: Tag): ReturnType<ArtisanFactory<Tag, null>> {
      if (!cache.has(component)) {
        cache.set(
          component,
          styledDOMElement<Tag, null>(component, null) as ReturnType<ArtisanFactory<DOMElements, null>>,
        );
      }
      return cache.get(component) as ReturnType<ArtisanFactory<Tag, null>>;
    },
  }) as ArtisanFactoryFcn & HTMLArtisanComponents;
  return artisan;
};
const artisan = factory();
console.log(artisan);
export default artisan;
