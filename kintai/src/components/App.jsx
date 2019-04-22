import React, { useState } from 'react';
import KintaiList from 'components/KintaiList';
import showModal from 'contexts/showModal';

export default () => {
  const modalContext = useState();
  return (
    <showModal.Provider value={modalContext}>
      <KintaiList />
    </showModal.Provider>
  );
};
