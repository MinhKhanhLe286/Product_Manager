const buttonStatus = document.querySelectorAll("[button-change-status]");
if (buttonStatus.length > 0) {
  const formAction = document.getElementById("form-change-status");
  const path = formAction.getAttribute("data-path");
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      var dataId = button.getAttribute("data-id"); // Lấy giá trị data-id của button được click
      var dataStatus = button.getAttribute("data-status"); // Lấy giá trị data-status của button được click
      var statusChange = dataStatus === "active" ? "inactive" : "active"; // Xử lý thay đổi trạng thái

      const action = `${path}/${statusChange}/${dataId}?_method=PATCH`;
      formAction.action = action;
      formAction.submit();
    });
  });
}
