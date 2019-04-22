import React, { useState, useEffect, useContext } from 'react';
import Modal from 'components/Modal';
import useTimeObj from 'hooks/useTimeObj';
import useWorkHour from 'hooks/useWorkHour';
import showModalContext from 'contexts/showModal';
import { fetchKintai, editKintai, deleteKintai } from 'actions';
import { connect } from 'react-redux';
import { DateTimeInput } from 'semantic-ui-calendar-react';

const KintaiEdit = props => {
  const [attendDate, setAttendDate] = useState(
    useTimeObj(new Date(new Date().setHours(9, 0, 0, 0))),
  );
  const [clockOutDate, setClockOutDate] = useState(useTimeObj());
  const [memo, setMemo] = useState('');
  const [showModal, setShowModal] = useContext(showModalContext);

  useEffect(() => {
    if (props.kintaiId) {
      props.fetchKintai(props.kintaiId);
    }
  }, []);

  useEffect(() => {
    if (props.kintai !== undefined) {
      setAttendDate(useTimeObj(props.kintai.attendDate));
      setClockOutDate(useTimeObj(props.kintai.clockOutDate));
      setMemo(props.kintai.memo);
    }
  }, [props.kintaiId]);

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
    if (!props.kintai) {
      return <div>Loading....</div>;
    }
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
      <>
        <button
          className="ui button negative"
          onClick={() => {
            setShowModal(null);
            props.deleteKintai(props.kintaiId);
          }}
        >
          Delete
        </button>
        <button
          className="ui button primary"
          onClick={() => {
            setShowModal(null);
            props.editKintai(props.kintaiId, {
              attendDate: attendDate.jsonDate,
              clockOutDate: clockOutDate.jsonDate,
              hour: useWorkHour(attendDate.jsonDate, clockOutDate.jsonDate),
              memo: memo,
            });
          }}
        >
          Submit
        </button>
      </>
    );
  };

  return (
    <Modal
      modalName="edit"
      headerText="勤怠編集"
      content={renderContent()}
      action={renderAction()}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    kintai: state.kintais[ownProps.kintaiId],
  };
};

export default connect(
  mapStateToProps,
  { fetchKintai, editKintai, deleteKintai },
)(KintaiEdit);
