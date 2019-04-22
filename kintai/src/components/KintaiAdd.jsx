import React, { useState, useEffect, useContext } from 'react';
import Modal from 'components/Modal';
import useTimeObj from 'hooks/useTimeObj';
import useWorkHour from 'hooks/useWorkHour';
import showModalContext from 'contexts/showModal';
import { createKintai } from 'actions';
import { connect } from 'react-redux';
import { DateTimeInput } from 'semantic-ui-calendar-react';

const KintaiAdd = props => {
  const [attendDate, setAttendDate] = useState(
    useTimeObj(new Date(new Date().setHours(9, 0, 0, 0))),
  );
  const [clockOutDate, setClockOutDate] = useState(useTimeObj());
  const [memo, setMemo] = useState('');
  const [showModal, setShowModal] = useContext(showModalContext);

  useEffect(() => {
    setAttendDate(useTimeObj(new Date(new Date().setHours(9, 0, 0, 0))));
    setClockOutDate(useTimeObj());
    setMemo('');
  }, [showModal]);

  const renderDatepicker = (val, setVal) => {
    return (
      <DateTimeInput
        onChange={(event, { value }) =>
          setVal({
            viewDateTime: useTimeObj(value).viewDateTime,
            jsonDate: useTimeObj(value).jsonDate,
          })
        }
        value={val.viewDateTime}
        dateFormat="YYYY/MM/DD"
        closable="true"
        popupPosition="top right"
      />
    );
  };

  const renderContent = () => {
    return (
      <div className="ui form">
        <div className="two fields">
          <div className="field">
            <label>出勤時刻</label>
            {renderDatepicker(attendDate, setAttendDate)}
          </div>
          <div className="field">
            <label>出勤時刻</label>
            {renderDatepicker(clockOutDate, setClockOutDate)}
          </div>
        </div>
        <div className="field">
          <label>メモ</label>
          <textarea
            value={memo}
            onChange={e => setMemo(e.target.value)}
            rows="2"
          />
        </div>
      </div>
    );
  };

  const renderAction = () => {
    return (
      <button
        className="ui button primary"
        onClick={() => {
          setShowModal(null);
          props.createKintai({
            attendDate: attendDate.jsonDate,
            clockOutDate: clockOutDate.jsonDate,
            hour: useWorkHour(attendDate.jsonDate, clockOutDate.jsonDate),
            memo: memo,
          });
        }}
      >
        登録
      </button>
    );
  };

  return (
    <Modal
      modalName="add"
      headerText="勤怠登録"
      content={renderContent()}
      action={renderAction()}
    />
  );
};

export default connect(
  null,
  { createKintai },
)(KintaiAdd);
