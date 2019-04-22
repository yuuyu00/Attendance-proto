import React, { useState, useEffect, useContext } from 'react';
import { fetchKintais } from 'actions';
import { connect } from 'react-redux';
import useTimeObj from 'hooks/useTimeObj';
import KintaiAdd from 'components/KintaiAdd';
import KintaiEdit from 'components/KintaiEdit';
import showModalContext from 'contexts/showModal';

const KintaiList = props => {
  useEffect(() => {
    props.fetchKintais();
  }, []);
  const [showModal, setShowModal] = useContext(showModalContext);
  const [kintaiId, setKintaiId] = useState();

  const renderAdmin = () => {
    return (
      <div className="right floated content">
        <button className="ui button">Edit</button>
        <button className="ui button">Delete</button>
      </div>
    );
  };

  const renderOverview = () => {
    let totalOvertime = 0;
    props.kintai.forEach(val => (totalOvertime += parseFloat(val.hour) - 7.75));

    return (
      <div className="ui grid">
        <div className="eight wide column" />
        <div className="eight wide column">
          <h4>今月の残業時間： {totalOvertime}時間</h4>
        </div>
      </div>
    );
  };

  const renderList = () => {
    if (props.kintai.length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <table
        className="ui single line center aligned table"
        style={{ whiteSpace: 'pre-wrap', tableLayout: 'fixed' }}
      >
        <thead>
          <tr>
            <th style={{ width: '50px' }} />
            <th style={{ width: '70px' }}>日付</th>
            <th style={{ width: '15%' }}>出退勤時間</th>
            <th className="right aligned" style={{ width: '10%' }}>
              勤務時間
            </th>
            <th className="right aligned" style={{ width: '15%' }}>
              残業時間
            </th>
            <th>メモ</th>
          </tr>
        </thead>
        <tbody>
          {props.kintai.map(res => (
            <tr key={res.id}>
              <td
                onClick={() => {
                  setKintaiId(res.id);
                  setShowModal('edit');
                }}
                style={{ cursor: 'pointer', textAlign: 'center' }}
              >
                <i className="pencil alternate icon" />
              </td>
              <td>{useTimeObj(res.attendDate).viewDate}</td>
              <td>
                {`${useTimeObj(res.attendDate).viewTime} ~ ${
                  useTimeObj(res.clockOutDate).viewTime
                }`}
              </td>
              <td className="right aligned">{res.hour}時間</td>
              <td className="right aligned">
                {parseFloat(res.hour) - 7.75 > 0.25
                  ? `${parseFloat(res.hour) - 7.75}時間`
                  : 'なし'}
              </td>
              <td className="left aligned">
                <div
                  style={{
                    marginLeft: '10%',
                    overflowWrap: 'break-word',
                  }}
                >
                  {res.memo}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <div
        style={{
          height: '43px',
          top: '0',
          position: 'fixed',
          zIndex: '200',
          width: '100%',
          borderBottom: 'solid 1px #1765a1',
          backgroundColor: '#2185d0',
          transition: 'height 200ms ease-in',
          boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
        }}
      >
        <span
          style={{
            color: 'white',
            display: 'block',
            fontSize: '20px',
            position: 'absolute',
            margin: 'auto',
            height: '43px',
            left: '10%',
            lineHeight: '43px',
          }}
        >
          勤怠管理
        </span>
        <span
          style={{
            cursor: 'pointer',
            color: 'white',
            display: 'block',
            position: 'absolute',
            margin: 'auto',
            height: '43px',
            left: '85%',
          }}
          onClick={() => setShowModal('add')}
        >
          <i className="fas fa-plus fa-2x" style={{ lineHeight: '43px' }} />
        </span>
      </div>
      <div
        style={{
          width: '80%',
          height: '100%',
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
      >
        <div
          className="ui segment"
          style={{
            width: '100%',
            marginRight: 'auto',
            marginLeft: 'auto',
            top: '100px',
          }}
        >
          {renderOverview()}

          {renderList()}
        </div>
      </div>
      <KintaiAdd />
      <KintaiEdit kintaiId={kintaiId} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    count: state.count,
    kintai: Object.values(state.kintais),
  };
};

export default connect(
  mapStateToProps,
  { fetchKintais },
)(KintaiList);
