import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'

export default () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/">Markham Chinese Alliance Church - 麥咸華人宣道會</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/em/">English Ministry</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/cm/">粵語事工</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/mm/">國語事工</Link>
      </li>
    </ul>
  </nav>
)
