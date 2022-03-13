import { DeepOmit } from './DeepOmit';
import {
  GetBusinessQuery, GetNotificationQuery, ListBusinessesQuery, ListNotificationsQuery, GetUserQuery
} from './API';

export type BusinessQueryType = NonNullable<ListBusinessesQuery['listBusinesses']>['items'];

export type BusinessType = DeepOmit<
  Exclude<GetBusinessQuery['getBusiness'], null | undefined>,
  '__typename'
>;

export type UserType = GetUserQuery['getUser']
export type NotificationQueryType = NonNullable<ListNotificationsQuery['listNotifications']>['items'];

export type NotificationType = DeepOmit<
  Exclude<GetNotificationQuery['getNotification'], null | undefined>,
  '__typename'
>