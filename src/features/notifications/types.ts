export type AppNotification = {
  id: string;
  titleKey: string;
  bodyKey: string;
  createdAt: string;
  read: boolean;
  href?: string;
};

export type NotificationsState = {
  items: AppNotification[];
};
