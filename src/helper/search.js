// tìm kiếm

module.exports = (query) => {
  let objectSearch = {
    keyword: "",
  };
  if (query.keyword) {
    objectSearch.keyword = query.keyword;

    let regex = new RegExp(objectSearch.keyword, "i");
    objectSearch.myRegex = regex;
  }

  return objectSearch;
};
