// ======= Sticky
window.onscroll = function () { stickyBar() };
const ud_header = document.querySelector(".ud-header");
const sticky = ud_header.offsetTop;
const logo = document.querySelector(".header-logo");

function stickyBar() {
    if (window.pageYOffset > sticky) {
        ud_header.classList.add("sticky");
    } else {
        ud_header.classList.remove("sticky");
    }

    // === logo change
    if (ud_header.classList.contains("sticky")) {
        logo.src = "images/logo/logo.png";
    } else {
        logo.src = "images/logo/logo.png";
    }
};

// ===== responsive navbar
let navbarToggler = document.querySelector("#navbarToggler");
const navbarCollapse = document.querySelector("#navbarCollapse");

navbarToggler.addEventListener("click", () => {
    navbarToggler.classList.toggle("navbarTogglerActive");
    navbarCollapse.classList.toggle("hidden");
});

//===== close navbar-collapse when a  clicked
document.querySelectorAll("#navbarCollapse ul li:not(.submenu-item) a").forEach((e) =>
    e.addEventListener("click", () => {
        navbarToggler.classList.remove("navbarTogglerActive");
        navbarCollapse.classList.add("hidden");
    })
);

// ===== Sub-menu
const submenuItems = document.querySelectorAll(".submenu-item");
submenuItems.forEach((el) => {
    el.querySelector("a").addEventListener("click", () => {
        el.querySelector(".submenu").classList.toggle("hidden");
    });
});


// fetch('/parking')
fetch('http://localhost/parking')
// /url/:p ==> req.params.p
// /url?p=p ==> req.query.p
.then(
    response => response.json()
)
.then(
    response => showAllParkings(response)
)
.catch(
    function(err){
        console.log(err.message)
});

function showAllParkings(parkings){
    const thead = document.getElementById('thead_container');
    const tbody = document.getElementById('tbody_container');

    for (i = 0; i < parkings.length; i++) {
        tbody.innerHTML += `<tr class="sm:table-row mb-2 sm:mb-0">
        <td class="text-center sm:text-left border-grey-light border hover:bg-gray-100 p-2">${parkings[i].name}</td>
        <td class="text-center sm:text-left border-grey-light border hover:bg-gray-100 p-2 truncate">${parkings[i].type}</td>
        <td class="text-center sm:text-left border-grey-light border hover:bg-gray-100 p-2 truncate">${parkings[i].city}</td>
        <td class="text-center border-grey-light border hover:bg-gray-100 p-2 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">Delete</td>
    </tr>`;
    }
}