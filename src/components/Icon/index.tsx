import SolidIcon, { IconName as SolidIconName } from './Solid';
import OutlineIcon, { IconName as OutlineIconName } from './Outline';

interface SolidIconProps {
  type: 'solid';
  name: SolidIconName;
}

interface OutlineIconProps {
  type?: 'outline';
  name: OutlineIconName;
}

type IconProps = (SolidIconProps | OutlineIconProps) & {
  className?: string;
};

export default function Icon({ type, name, className }: IconProps) {
  if (type === 'solid') {
    return <SolidIcon name={name} className={className} />;
  } else {
    return <OutlineIcon name={name} className={className} />;
  }
}
