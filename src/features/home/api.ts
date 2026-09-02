import { mockDelay } from '@/utils/mockApi';

import { getHomeState } from './store/homeState';
import type { HomeDashboard } from './types';

export async function getHome(): Promise<HomeDashboard> {
  await mockDelay();
  return getHomeState();
}
