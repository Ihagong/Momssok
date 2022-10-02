export const getStringDate = (today) => {

  let year = today.getFullYear()
  let month = today.getMonth() + 1
  let date = today.getDate()
  let hours = today.getHours()
  let minutes = today.getMinutes()
  if (month < 10) {
    month = `0${month}`
  }
  if (date < 10) {
    date = `0${date}`
  }
  return `${year}년 ${month}월 ${date}일 ${hours}시 ${minutes}분`
}

