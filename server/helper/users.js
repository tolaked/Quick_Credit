class Helper{
    // generate unique id
   generateId(dataArray, index) {
    return dataArray.length > 0 ? dataArray[index].id + 1 : 0;
  }
}

export default Helper;