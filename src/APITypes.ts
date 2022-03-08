import { DeepOmit } from './DeepOmit';
import {
  GetBusinessQuery, GetNotificationQuery, ListBusinessesQuery, ListNotificationsQuery,
} from './API';

export type BusinessQueryType = NonNullable<ListBusinessesQuery['listBusinesses']>['items'];

export type BusinessType = DeepOmit<
  Exclude<GetBusinessQuery['getBusiness'], null | undefined>,
  '__typename'
>;

<<<<<<< Updated upstream
export type UserType = GetUserQuery['getUser']
=======
>>>>>>> Stashed changes
export type NotificationQueryType = NonNullable<ListNotificationsQuery['listNotifications']>['items'];

export type NotificationType = DeepOmit<
  Exclude<GetNotificationQuery['getNotification'], null | undefined>,
  '__typename'
<<<<<<< Updated upstream
>
=======
>
>>>>>>> Stashed changes
