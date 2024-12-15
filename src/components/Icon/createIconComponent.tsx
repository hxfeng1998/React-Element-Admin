import { UserIcon } from '@heroicons/react/24/outline';

type UserIconType = typeof UserIcon;

export default function createIconComponent<T extends Record<string, UserIconType>>(iconMap: T) {
  type IconName = keyof T;

  return function IconComponent({
    name,
    className = 'w-6 h-6',
  }: {
    name: IconName;
    className?: string;
  }) {
    const Icon: UserIconType = iconMap[name];
    return <Icon className={className} aria-hidden="true" />;
  };
}
