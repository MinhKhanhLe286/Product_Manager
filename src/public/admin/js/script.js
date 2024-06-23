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
      window.location.href = newUrl;
    });
  });
}
