// @flow

import type {AuthState} from '../auth/types';
import type {ApiState} from '../api/types';
import type {ContentState} from '../content/types';
import type {MenuState} from '../menu/types';
import type {NodeState} from '../node/types';
import type {ToasterState} from '../toaster/types';
import type {SearchState} from '../search/types';
import type {MyHelsinkiState} from '../myHelsinki/types';
import type {NotificationState} from '../notification/types';

export type RootState = {
  auth: AuthState,
  api: ApiState,
  content: ContentState,
  menu: MenuState,
  node: NodeState,
  toaster: ToasterState,
  search: SearchState,
  myHelsinki: MyHelsinkiState,
  notification: NotificationState,
};
