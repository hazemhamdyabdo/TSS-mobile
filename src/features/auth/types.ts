export type AuthSession = {
  phone: string;
  token: string;
};

export type ContactMessage = {
  id: string;
  phone: string;
  subject: string;
  attachmentUri?: string;
};
