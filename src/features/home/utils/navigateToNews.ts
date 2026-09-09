import { router, type Href } from 'expo-router';

export function navigateToNews() {
  router.push('/news' as Href);
}
