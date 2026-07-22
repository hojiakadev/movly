export interface NavItem {
  id: number;
  to: string;
  title: string;
  general?: boolean;
  children?: boolean;
}

const nav_items: NavItem[] = [
  { id: 1, title: 'Home', to: '/' },
  // { id: 2, title: 'Genre', to: '/' },
  // { id: 3, title: 'Country', to: '/' },
  { id: 4, title: 'Movies', to: '/movies' },
  { id: 5, title: 'TV Shows', to: '/tv' }
  // { id: 6, title: 'Profile', to: '/profile' }
];

export default nav_items;
