export const BASE_URL = "http://localhost:8001/";

export const removeDuplicateEntries = (list) => {
  const uniqueSet = new Set();
  const newArray = [];

  for (const obj of list) {
    const objString = JSON.stringify(obj);

    if (!uniqueSet.has(objString)) {
      uniqueSet.add(objString);
      newArray.push(obj);
    }
  }

  return newArray;
};
