/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import { getIndexRoute } from 'utils/router.config'
import Events from 'core/containers/Base/Detail/Events'
import Source from './Source'

const PATH = '/clusters/:cluster/projects/:namespace/volume-snapshots/:name'
const SOURCE_PATH = `${PATH}/source`
const EVENT_PATH = `${PATH}/event`

export default [
  {
    name: 'source',
    path: SOURCE_PATH,
    title: 'DATA_SOURCE',
    component: Source,
  },
  {
    name: 'event',
    path: EVENT_PATH,
    title: 'Events',
    component: Events,
  },
  getIndexRoute({ path: PATH, to: `${PATH}/source`, exact: true }),
  getIndexRoute({ path: '*', to: '/404', exact: true }),
]
