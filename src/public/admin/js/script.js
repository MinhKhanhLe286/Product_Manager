// Logic button status
const buttonSatatus = document.querySelectorAll("[button-status]");
if (buttonSatatus.length > 0) {
  let newUrl = new URL(window.location.href);
  buttonSatatus.forEach((element) => {
    element.addEventListener("click", () => {
      const status = element.getAttribute("button-status");

      if (status) {
        newUrl.searchParams.set("status", status);
      } else {
        newUrl.searchParams.delete("status");
      }
      window.location.href = newUrl.href;
    });
  });
}

// form seach
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  // chuyền lên url
  let newurl = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target.elements.keyword.value);

    if (e.target.elements.keyword.value) {
      newurl.searchParams.set("keyword", e.target.elements.keyword.value);
    } else {
      newurl.searchParams.delete("keyword");
    }
    window.location.href = newurl.href;
  });
}

// pagination
// Pagination
const buttonPage = document.querySelectorAll("[button-pagination]");
if (buttonPage) {
  let newUrl = new URL(window.location.href);
  buttonPage.forEach((item) => {
    item.addEventListener("click", () => {
      newUrl.searchParams.set("page", item.getAttribute("button-pagination"));
      window.location.href = newUrl.href; // Chuyển dòng này vào bên trong sự kiện click
    });
  });
}
