import type { Stage } from '../types';

export const tutorialStages: Stage[] = [
  {
    id: 'tutorial-01',
    target: '#FFF',
    palette: ['#F00', '#0F0', '#00F'],
    availableOperatorIds: ['add', 'sub'],
    availableFilterIds: [],
    par: 2,
  },
  {
  id: 'tutorial-02',
  target: '#000',
  palette: ['#F00', '#0F0', '#00F'],
  availableOperatorIds: ['add', 'sub'],
  availableFilterIds: ['invert'],
  par: 2,
  },
];
