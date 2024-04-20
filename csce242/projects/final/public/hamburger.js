function toggleMenu() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

window.onload = () => {
  const dropdown = document.getElementsByClassName("dropdown-btn");
  for (let i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var dropdownContent = this.nextElementSibling;
          if (dropdownContent.style.display === "block") {
              dropdownContent.style.display = "none";
          } else {
              dropdownContent.style.display = "block";
          }
      });
  }
}
