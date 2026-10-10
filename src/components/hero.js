import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import styles from './hero.module.css'

export default ({ data }) => (
  <div className={styles.hero}>
    <GatsbyImage className={styles.heroImage} alt={data.name} image={getImage(data.heroImage)} />
    <div className={styles.heroDetails}>
      <h3 className={styles.heroTitle}>{data.title}</h3>
      <p>{data.shortBio.shortBio}</p>
    </div>
  </div>
)
