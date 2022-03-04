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

import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import PipelineStore from 'stores/devops/pipelines'
import Loading from '@kube-design/components/lib/components/Loading'
import styles from './index.scss'

const PipelineTemplate = ({ handleTemplateChange }) => {
  const CUSTOM_TEMPLATE = {
    type: 'custom',
    image: '/assets/pipeline/pipeline-icon.svg',
    title: t('CUSTOM_PIPELIEN'),
    desc: t('CUSTOM_PIPELIEN_DESC'),
  }

  const store = new PipelineStore()

  const [templist, setTemplist] = useState([])
  const [selected, setSelect] = useState('')
  const [loading, setLoading] = useState(false)

  const getPipelineTemplateList = async () => {
    return await store.getPipelineTemplateList()
  }

  useEffect(() => {
    setLoading(true)
    getPipelineTemplateList()
      .then(data => {
        data.push(CUSTOM_TEMPLATE)
        setTemplist(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const getTemple = (type, parameters) => {
    // const jenkins = await store.getTempleJenkins(type)

    setSelect(type)
    handleTemplateChange && handleTemplateChange(type, parameters)
  }

  return (
    <div className={styles.container}>
      <Loading spinning={loading}>
        <div className={styles.template}>
          {templist &&
            templist.map(data => (
              <Card
                key={data.type}
                isSelected={selected === data.type}
                {...data}
                getTemple={getTemple}
              />
            ))}
        </div>
      </Loading>
    </div>
  )
}

export default PipelineTemplate

const Card = ({
  type,
  image,
  title,
  desc,
  parameters,
  getTemple,
  isSelected,
}) => {
  return (
    <div
      className={classnames(styles.card, {
        [styles.cardSelected]: isSelected,
      })}
      onClick={() => getTemple(type, parameters)}
    >
      <div
        className={classnames(styles.bg, {
          [styles.customIcon]: type === 'custom',
        })}
      >
        <img src={image} />
      </div>
      <div className={styles.info}>
        <h4 className={styles.subTitle}>{title}</h4>
        <p title={desc} className={styles.desc}>
          {desc}
        </p>
      </div>
    </div>
  )
}
