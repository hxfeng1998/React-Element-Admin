import createIconComponent from './createIconComponent';
// 更好的 tree-shaking，使用具名导入
import { UserIcon } from '@heroicons/react/24/outline';

const iconMap = {
  user: UserIcon,
} as const;

export type IconName = keyof typeof iconMap;

const IconComponent = createIconComponent(iconMap);

export default IconComponent;
