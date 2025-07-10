import type { NavigationItem, NavigationSection } from "~/lib/navigation";

export type { NavigationItem as MenuItem, NavigationSection as MenuSection };

export interface HeaderProps {
  className?: string;
}

export interface DesktopHeaderProps {
  isScrolled: boolean;
}

export interface MobileHeaderProps {
  onMenuToggle: () => void;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SearchBarProps {
  variant?: 'desktop' | 'mobile';
  size?: 'default' | 'compact' | 'large';
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  autoFocus?: boolean;
}

export interface HoverMegaMenuProps {
  section: MenuSection;
}