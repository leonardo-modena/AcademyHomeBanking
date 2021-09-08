import { style, state, animate, trigger, transition } from '@angular/animations';

export const fadeAnimation = trigger('fade', [
    transition('void => *', [
      style({opacity: 0}),
      animate(500, style({opacity: 1}))
    ]),
    transition('* => void', [
      animate(300, style({opacity: 0}))
    ])
  ])

export const sidenavSlide = trigger('triggerSidenav', [
  state(
    'open',
    style({
      transform: 'translateX(0rem)',
      boxShadow: '-3px 0px 7px 1px #00000069',
    })
  ),
  state(
    'closed',
    style({
      transform: 'translateX(30rem)',
      boxShadow: 'none',
    })
  ),
  transition('* <=> *', [animate('0.3s')]),
])
