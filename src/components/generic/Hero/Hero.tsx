import type { ParentComponent } from 'solid-js';

import { atoms, vars } from '@cubeartisan/cubeartisan/styles';
import type { Atoms } from '@cubeartisan/cubeartisan/styles/atoms/atoms.css';

export type HeroProps = {
  justify: 'center' | 'left' | 'right' | 'split';
  background: 'gradientLeft' | 'gradientRight' | 'gradientCenter' | 'solid';
  // maybe add a prop to choose background color
};

const Hero: ParentComponent<HeroProps> = (props) => {
  const justifyVariants: Record<HeroProps['justify'], Atoms['justifyContent']> = {
    center: 'center',
    left: 'flexStart',
    right: 'flexEnd',
    split: 'spaceBetween',
  };

  const backgroundVariants: Record<HeroProps['background'], string> = {
    gradientLeft: `linear-gradient(to right, transparent, ${vars.backgroundColor.primary.primarySolid})`,
    gradientRight: `linear-gradient(to left, transparent, ${vars.backgroundColor.primary.primarySolid})`,
    gradientCenter: `linear-gradient(to right, transparent, ${vars.backgroundColor.primary.primarySolid}, transparent)`,
    solid: vars.backgroundColor.primary.primarySolid,
  };

  return (
    <div
      class={atoms({
        justifyContent: justifyVariants[props.justify],
        alignItems: 'center',
        paddingInline: 10,
      })}
      style={{
        'background-image': props.background !== 'solid' ? backgroundVariants[props.background] : undefined,
        'background-color': props.background === 'solid' ? backgroundVariants.solid : undefined,
      }}
    >
      {props.children}
    </div>
  );
};

export default Hero;
