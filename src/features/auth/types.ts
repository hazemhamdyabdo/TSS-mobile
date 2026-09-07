export type AuthSession = {
  phone: string;
  token: string;
  isGuest?: boolean;
};

export type ContactMessage = {
  id: string;
  phone: string;
  subject: string;
  attachmentUri?: string;
};
