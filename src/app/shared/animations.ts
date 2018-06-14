import { trigger, state, style, transition, animate } from '@angular/animations'

export const appAnimation = 
trigger('appState', [
    state('shiftedLeft', style({transform: 'translateX(0)'})),
    state('shiftedRight', style({transform: 'translateX(0)'})),
          
    transition('void => shiftedLeft', [
      style({transform: 'translateX(-100%)'}),
      animate('1000ms linear')
    ]),
    transition('shiftedLeft => void', [      
      animate('1000ms linear', style({transform: 'translateX(-100%)'}))
    ]),
    transition('void => shiftedRight', [
      style({transform: 'translateX(100%)'}),
      animate('1000ms linear')
    ]),
    transition('shiftedRight => void', [      
      animate('1000ms linear', style({transform: 'translateX(100%)'}))
    ])
  ]);

export const listAnimation = 
trigger('listState', [
    state('shiftedLeft', style({transform: 'translateX(0)'})),
    state('shiftedRight', style({transform: 'translateX(0)'})),
          
    transition('void => shiftedLeft', [
      style({transform: 'translateX(-100%)'}),
      animate('1000ms linear')
    ]),
    transition('shiftedLeft => void', [
      style({position: 'absolute', top:'0px'}),
      animate('1000ms linear', style({transform: 'translateX(-100%)'}))
    ]),
    transition('void => shiftedRight', [
      style({transform: 'translateX(100%)'}),
      animate('1000ms linear')
    ]),
    transition('shiftedRight => void', [
      style({position: 'absolute', top:'0px'}),
      animate('1000ms linear', style({transform: 'translateX(100%)'}))
    ])
  ])
