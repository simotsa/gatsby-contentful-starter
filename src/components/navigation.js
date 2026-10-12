import React from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'

import * as styles from './navigation.module.css'

export default () => {
  const location = useLocation()
  const path = location.pathname

  return (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/" className={path.startsWith('/blog/general/') ? styles.blogActive : undefined}>HOME - 主頁</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/cm/" className={path.startsWith('/blog/cm/') ? styles.blogActive : undefined}>CM - 粵語事工</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/mm/" className={path.startsWith('/blog/mm/') ? styles.blogActive : undefined}>MM - 國語事工</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/em/" className={path.startsWith('/blog/em/') ? styles.blogActive : undefined}>English Ministry</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/km/" className={path.startsWith('/blog/km/') ? styles.blogActive : undefined}>Children Ministry</Link>
      </li>
    </ul>
  </nav>
  )
}
