import React from 'react';

const Pageone: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>This is Template</h1>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
  },
  heading: {
    color: '#333',
  },
};

export default Pageone;
