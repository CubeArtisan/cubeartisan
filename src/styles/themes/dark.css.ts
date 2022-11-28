import { amberDark, blueDark, cyanDark, greenDark, mauveDark, purpleDark, tomatoDark } from '@radix-ui/colors/src';
import { createTheme } from '@vanilla-extract/css';

import theme from './base.css';

export const darkTheme = createTheme(theme, {
  color: {
    primary: {
      1: purpleDark.purple1,
      2: purpleDark.purple2,
      3: purpleDark.purple3,
      4: purpleDark.purple4,
      5: purpleDark.purple5,
      6: purpleDark.purple6,
      7: purpleDark.purple7,
      8: purpleDark.purple8,
      9: purpleDark.purple9,
      10: purpleDark.purple10,
      11: purpleDark.purple11,
      12: purpleDark.purple12,
    },
    secondary: {
      1: cyanDark.cyan1,
      2: cyanDark.cyan2,
      3: cyanDark.cyan3,
      4: cyanDark.cyan4,
      5: cyanDark.cyan5,
      6: cyanDark.cyan6,
      7: cyanDark.cyan7,
      8: cyanDark.cyan8,
      9: cyanDark.cyan9,
      10: cyanDark.cyan10,
      11: cyanDark.cyan11,
      12: cyanDark.cyan12,
    },
    neutral: {
      1: mauveDark.mauve1,
      2: mauveDark.mauve2,
      3: mauveDark.mauve3,
      4: mauveDark.mauve4,
      5: mauveDark.mauve5,
      6: mauveDark.mauve6,
      7: mauveDark.mauve7,
      8: mauveDark.mauve8,
      9: mauveDark.mauve9,
      10: mauveDark.mauve10,
      11: mauveDark.mauve11,
      12: mauveDark.mauve12,
    },
    success: {
      1: greenDark.green1,
      2: greenDark.green2,
      3: greenDark.green3,
      4: greenDark.green4,
      5: greenDark.green5,
      6: greenDark.green6,
      7: greenDark.green7,
      8: greenDark.green8,
      9: greenDark.green9,
      10: greenDark.green10,
      11: greenDark.green11,
      12: greenDark.green12,
    },
    info: {
      1: blueDark.blue1,
      2: blueDark.blue2,
      3: blueDark.blue3,
      4: blueDark.blue4,
      5: blueDark.blue5,
      6: blueDark.blue6,
      7: blueDark.blue7,
      8: blueDark.blue8,
      9: blueDark.blue9,
      10: blueDark.blue10,
      11: blueDark.blue11,
      12: blueDark.blue12,
    },
    warning: {
      1: amberDark.amber1,
      2: amberDark.amber2,
      3: amberDark.amber3,
      4: amberDark.amber4,
      5: amberDark.amber5,
      6: amberDark.amber6,
      7: amberDark.amber7,
      8: amberDark.amber8,
      9: amberDark.amber9,
      10: amberDark.amber10,
      11: amberDark.amber11,
      12: amberDark.amber12,
    },
    danger: {
      1: tomatoDark.tomato1,
      2: tomatoDark.tomato2,
      3: tomatoDark.tomato3,
      4: tomatoDark.tomato4,
      5: tomatoDark.tomato5,
      6: tomatoDark.tomato6,
      7: tomatoDark.tomato7,
      8: tomatoDark.tomato8,
      9: tomatoDark.tomato9,
      10: tomatoDark.tomato10,
      11: tomatoDark.tomato11,
      12: tomatoDark.tomato12,
    },
  },
} as const);