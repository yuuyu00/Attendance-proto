import React from 'react';

export default React.createContext({
  showModal: '', // モーダル開閉ステータス
  setShowModal: () => {}, // ステータス更新関数
});
