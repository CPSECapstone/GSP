import { DeepOmit } from './DeepOmit';
import {
  GetBusinessQuery, ListBusinessesQuery,
} from './API';

export type BusinessQueryType = NonNullable<ListBusinessesQuery['listBusinesses']>['items'];

export type BusinessType = DeepOmit<
  Exclude<GetBusinessQuery['getBusiness'], null | undefined>,
  '__typename'
>;
