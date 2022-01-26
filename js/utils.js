document.getElementById("button-back-to-top").addEventListener(
  "click",
  function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },
  false
);
