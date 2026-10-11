import React from 'react'
import { Link } from 'gatsby'
import * as styles from './navigation.module.css'

export default () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/">HOME - 主頁</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/cm/">CM - 粵語事工</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/mm/">MM - 國語事工</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/em/">English Ministry</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/km/">Children Ministry</Link>
      </li>
    </ul>
  </nav>
)
