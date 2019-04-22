const getCurrentTime = d => {
  return new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    d.getHours(),
    d.getMinutes() - (d.getMinutes() % 15),
  );
};

export default (d = new Date()) => {
  d = typeof d === 'string' ? new Date(d) : d;
  // 処理用のDateオブジェクト生成
  const date = getCurrentTime(new Date(d));
  // 15分区切りの時間をJSON化
  const jsonDate = getCurrentTime(d).toJSON();
  // 15分区切りの表示用の時間
  const viewDate = `${date.getFullYear()}/${date.getMonth() +
    1}/${date.getDate()}`;

  const viewTime = `${date.getHours()}:${
    date.getMinutes() == '0' ? '00' : date.getMinutes()
  }`;

  const viewDateTime = `${date.getFullYear()}/${date.getMonth() +
    1}/${date.getDate()} ${date.getHours()}:${
    date.getMinutes() == '0' ? '00' : date.getMinutes()
  }`;
  return { jsonDate, viewDate, viewTime, viewDateTime };
};
