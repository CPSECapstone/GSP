import { DeepOmit } from './DeepOmit';
import {
  GetBusinessQuery, GetUserQuery, ListBusinessesQuery,
} from './API';

export type BusinessQueryType = NonNullable<ListBusinessesQuery['listBusinesses']>['items'];

export type BusinessType = DeepOmit<
  Exclude<GetBusinessQuery['getBusiness'], null | undefined>,
  '__typename'
>;

export type UserType = GetUserQuery['getUser']
