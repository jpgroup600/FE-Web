// UnderDev.jsx
import React from 'react';
import { FaTools } from 'react-icons/fa';

const UnderDev = () => {
  return (
    <div style={styles.container}>
      <FaTools style={styles.icon} />
      <h1 style={styles.text}>This page is currently under development</h1>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    color: '#343a40',
    textAlign: 'center',
  },
  icon: {
    fontSize: '5rem',
    marginBottom: '1rem',
    color: '#6c757d',
  },
  text: {
    fontSize: '1.5rem',
    fontWeight: '500',
  },
};

export default UnderDev;
