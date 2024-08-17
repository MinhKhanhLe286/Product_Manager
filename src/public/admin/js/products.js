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

// checkbox mutil
const checkBoxMulti = document.querySelector("[checkbox-multi]"); // tìm table

if (checkBoxMulti) {
  const inputCheckAll = checkBoxMulti.querySelector("input[name = 'checkall']");
  const inputIds = checkBoxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputIds.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputIds.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputIds.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkBoxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      if (countChecked === inputIds.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// end check box multi

// form changeMulti
const formChangeMulti = document.getElementById("form-change-multi");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkBoxMulti = document.querySelector("[checkbox-multi]");
    const inputschecked = checkBoxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    const typeChange = e.target.elements.type.value;
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc muốn xóa không");
      if (!isConfirm) {
        return;
      }
    }

    if (inputschecked.length > 0) {
      let ids = [];
      const inputIDs = formChangeMulti.querySelector("input[name='ids']");
      inputschecked.forEach((input) => {
        let id = input.value;

        if (typeChange == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;

          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });

      inputIDs.value = ids.join(", ");

      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất 1 bản ghi");
    }
  });
}
// end form changeMulti

// Delete Item
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
  const formDeleteButton = document.getElementById("form-delete-status");
  const path = formDeleteButton.getAttribute("data-path");

  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc xóa sản phẩm này");

      if (isConfirm) {
        const id = button.getAttribute("data-id");

        const action = `${path}/${id}?_method=DELETE`;

        formDeleteButton.action = action;
        formDeleteButton.submit();
      }
    });
  });
}
// end delete item
