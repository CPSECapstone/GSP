// This file was NOT codegenned. Feel free to edit it!

import { DeepOmit } from './DeepOmit';
import {
  GetBusinessQuery, GetNotificationQuery, ListBusinessesQuery, ListNotificationsQuery, GetUserQuery, GetReviewQuery, ListCollectionsQuery
} from './API';

export type BusinessQueryType = NonNullable<ListBusinessesQuery['listBusinesses']>['items'];

export type BusinessType = DeepOmit<
  Exclude<GetBusinessQuery['getBusiness'], null | undefined>,
  '__typename'
>;

export type UserType = DeepOmit<
  Exclude<GetUserQuery['getUser'], null | undefined>,
  '__typename'
>
export type NotificationQueryType = NonNullable<ListNotificationsQuery['listNotifications']>['items'];

export type NotificationType = DeepOmit<
  Exclude<GetNotificationQuery['getNotification'], null | undefined>,
  '__typename'
>

export type ReviewType = DeepOmit<
  Exclude<GetReviewQuery['getReview'], null | undefined>,
  '__typename'
> 

export type CollectionQueryType = NonNullable<ListCollectionsQuery['listCollections']>['items'];