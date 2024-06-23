filterStatusFunc = (query) => {
  let filterStatus = [
    {
      name: "Tất cả",
      class: "",
      status: "",
    },
    {
      name: "Hoạt động",
      class: "",
      status: "active",
    },
    {
      name: "Dừng hoạt động",
      class: "",
      status: "inactive",
    },
  ];
  if (query.status) {
    let index = filterStatus.findIndex((item) => {
      return item.status == query.status;
    });
    filterStatus[index].class = "active";
  } else {
    filterStatus[0].class = "active";
  }
  return filterStatus;
};
module.exports = {
  filterStatusFunc,
};
