import { FC } from 'react';
import { Icon } from './Icon';
import {
  Alert as AlertContainer,
  AlertDescription,
  AlertTitle,
} from './ui/alert';

type Props = {
  variant?: 'default' | 'destructive';
  title?: string;
  description?: string;
  className?: string;
};

const Alert: FC<Props> = ({
  variant = 'default',
  title,
  description,
  className,
}) => (
  <AlertContainer variant={variant} className={className}>
    <Icon name="information-circle-solid" size={16} />
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>{description}</AlertDescription>
  </AlertContainer>
);

export { Alert };
