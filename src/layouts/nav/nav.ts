export interface Items {
  id: number;
  to: string;
  title: string;
  general?: boolean;
  children?: boolean;
}

const nav: Items[] = [
  { id: 1, title: 'Home', to: '/' },
  // { id: 2, title: 'Genre', to: '/' },
  { id: 4, title: 'Movies', to: '/movies' },
  { id: 5, title: 'TV Shows', to: '/tv' },
  { id: 3, title: 'Search', to: '/search' }
  // { id: 6, title: 'Profile', to: '/profile' }
];

export default nav;
