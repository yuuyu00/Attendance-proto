import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import showModal from 'contexts/showModal';

const Modal = props => {
  // 背景とCloseボタンのクリックで開閉ステータスをfalseにする
  const renderModal = modalHookState => {
    const [showModal, setShowModal] = modalHookState;
    return (
      <div
        onClick={() => setShowModal(null)}
        className="ui dimmer modals visible active"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="ui standard modal visible active"
        >
          <div className="ui header">{props.headerText}</div>
          <div className="content">{props.content}</div>
          <div className="actions">{props.action}</div>
        </div>
      </div>
    );
  };

  const renderAction = () => {};

  // Contextの値を取得して開閉制御
  const modalHookState = useContext(showModal);

  if (modalHookState[0] === props.modalName) {
    return ReactDOM.createPortal(
      renderModal(modalHookState),
      document.querySelector('#modal'),
    );
  }

  return <></>;
};

export default Modal;
