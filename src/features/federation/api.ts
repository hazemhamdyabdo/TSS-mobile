import { mockDelay } from '@/utils/mockApi';

import { getFederationState } from './store/federationState';
import type { FederationState } from './types';

export async function getFederation(): Promise<FederationState> {
  await mockDelay();
  return getFederationState();
}
