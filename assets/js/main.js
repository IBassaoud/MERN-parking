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


// fetch('/parking') - Operation Read : find All Parkings
fetch('http://localhost/parking')
    .then(
        response => response.json()
    )
    .then(
        response => manageDataParkings(response)
    )
    .catch(
        function (err) {
            console.log(err.message)
        });

function manageDataParkings(parkings) {

    function showAllParkings() {
        const thead = document.getElementById('thead_container');
        const tbody = document.getElementById('tbody_container');
        console.log(parkings);
        for (i = 0; i < parkings.length; i++) {
            tbody.innerHTML += `<tr class="sm:table-row mb-2 sm:mb-0">
        <input type="hidden" name="parking_id" value="${parkings[i]._id}" class="">
        <td class="text-center sm:text-left border-grey-light border hover:bg-gray-100 p-2">${parkings[i].name}</td>
        <td class="text-center sm:text-left border-grey-light border hover:bg-gray-100 p-2 truncate">${parkings[i].type}</td>
        <td class="text-center sm:text-left border-grey-light border hover:bg-gray-100 p-2 truncate">${parkings[i].city}</td>
        <td class="text-center border-grey-light border hover:bg-gray-100 p-2 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">Delete</td>
    </tr>`;
        }
    }
    // Execute the function
    showAllParkings();

    function showAllParkingsToEdit() {
        const selectBody = document.getElementById('select_parking_edit');
        for (i = 0; i < parkings.length; i++) {
            selectBody.innerHTML += `<option value="${parkings[i]._id}">${parkings[i].name}</option>`;
        }

        const editBody = document.getElementById('form_parking_edit');

        // TODO : copy pasta form edit here etc..
        let selectedItem = selectBody
        selectedItem.addEventListener('change', () => {
            for (item of parkings){
                if (item._id == selectedItem.value){
                    editBody.innerHTML = `<form action="/edit/${item._id}" method="post" class="">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-name">
                                Name
                            </label>
                            <input name="name"
                                value="${item.name}"
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-name" type="text" required>
                            <p class="text-red-500 text-xs italic"></p>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-type">
                                Type
                            </label>
                            <input name="type"
                                value="${item.type}"
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-type" type="text" required>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-city">
                                City
                            </label>
                            <input name="city"
                            value="${item.city}"
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-city" type="text" required>
                        </div>
                    </div>
                    <div class="flex flex-wrap justify-center">
                        <div class="w-[8rem] px-3">
                            <button class="py-1 w-full rounded bg-blue-600 text-white">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>`;
                } 
            }
                 
        })
    }

    // Execute the function
    showAllParkingsToEdit();
}


// fetch('/parking/:id') - Operation Read : find one Parking
let selectedEditParking = document.getElementById('select_parking_edit');

selectedEditParking.addEventListener('change', function (e) {
    e.preventDefault();
    let selectedParking = selectedEditParking.value;
    fetch(`http://localhost/parking/${selectedParking}`)
        .then(
            response => response.json()
        )
        .then(
            response => editParking(response)
        )
        .catch(
            function (err) {
                console.log(err.message)
            });

    function editParking(parking) {
        console.log(parking);
    }
})