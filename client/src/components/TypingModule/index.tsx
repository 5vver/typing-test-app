import { TypingCore } from '@components/TypingModule/TypingCore.tsx';
import { type FC } from 'react';

const words = [
  'red',
  'bet',
  'right',
  'choose',
  'name',
  'game',
  'scratch',
  'over',
  'back',
  'damn',
  'lose',
  'stupid',
  'invulnerable',
  'unbelievable',
  'incredible',
  'unstoppable',
  'unbreakable',
  'unbeatable',
  'unimaginable',
  'unbelievable',
  'unbelievable',
  'unbelievable',
  'amazing',
  'unbelievable',
  'unbelievable',
  'unbelievable',
  'unbelievable',
  'unbelievable',
  'unbelievable',
  'unbelievable',
];

const TypingModule: FC = () => {
  return (
    <div>
      <TypingCore words={words} />
    </div>
  );
};

export { TypingModule };
