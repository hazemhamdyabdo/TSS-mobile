export type AuthRole = 'admin' | 'user' | 'guest';

export type AuthSession = {
  phone: string;
  token: string;
  role: AuthRole;
  /** @deprecated Prefer `role === 'guest'`; kept for older call sites. */
  isGuest?: boolean;
};

export type ContactMessage = {
  id: string;
  phone: string;
  subject: string;
  attachmentUri?: string;
};
