// Movie List Array (for dropdown)
const movieList = [
    { name: "Flash", price: 7 },
    { name: "Avengers", price: 10 },
    { name: "Spider-Man", price: 8 },
    { name: "Batman", price: 9 }
];

// 1. Update the dropdown with movie names and their prices
const selectMovie = document.getElementById("selectMovie");
movieList.forEach((movie, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = movie.name;
    selectMovie.appendChild(option);
});

// Set the default movie name and price
const defaultMovie = movieList[0];
document.getElementById("movieName").textContent = defaultMovie.name;
document.getElementById("moviePrice").textContent = `$ ${defaultMovie.price}`;
let moviePrice = defaultMovie.price; // Store the price of the default movie

// 2. Handle movie selection
selectMovie.addEventListener("change", function () {
    const selectedMovie = movieList[this.value];
    moviePrice = selectedMovie.price;
    document.getElementById("movieName").textContent = selectedMovie.name;
    document.getElementById("moviePrice").textContent = `$ ${selectedMovie.price}`;
    updateTotalPrice();
});

// 3. Manage seat selection
const seats = document.querySelectorAll("#seatCont .seat");
const selectedSeats = [];
let totalPrice = 0;

// Update the total price based on selected seats
function updateTotalPrice() {
    totalPrice = selectedSeats.length * moviePrice;
    document.getElementById("totalPrice").textContent = `$ ${totalPrice}`;
}

// Update selected seats count
function updateSelectedSeats() {
    const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
    selectedSeatsHolder.innerHTML = ""; // Clear previous seats
    if (selectedSeats.length === 0) {
        selectedSeatsHolder.innerHTML = "<span class='noSelected'>No Seat Selected</span>";
    } else {
        selectedSeats.forEach((seat) => {
            const seatElement = document.createElement("div");
            seatElement.classList.add("selectedSeat");
            seatElement.textContent = seat;
            selectedSeatsHolder.appendChild(seatElement);
        });
    }
}

// Add event listener to each seat

function updateNoOfSelectedSeats() {
    // Set the text content of numberOfSeatEl to the number of selected seats
    numberOfSeatEl.textContent = selectedSeats.length;
}

const numberOfSeatEl = document.getElementById("numberOfSeat");
seats.forEach((seat, index) => {
    if (!seat.classList.contains("occupied")) {
        seat.addEventListener("click", function () {
            const seatNumber = `Seat ${index + 1}`;
            if (seat.classList.contains("selected")) {
                seat.classList.remove("selected");
                const seatIndex = selectedSeats.indexOf(seatNumber);
                if (seatIndex > -1) {
                    selectedSeats.splice(seatIndex, 1);
                }
            } else {
                seat.classList.add("selected");
                selectedSeats.push(seatNumber);
            }
            updateTotalPrice();
            updateNoOfSelectedSeats()
            updateSelectedSeats();
        });
    }
});

// 4. Handle "Continue" button click
document.getElementById("proceedBtn").addEventListener("click", function () {
    if (selectedSeats.length === 0) {
        alert("Oops no seat Selected");
    } else {
        alert("Yayy! Your Seats have been booked");

        // Mark selected seats as occupied
        selectedSeats.forEach((seatNumber) => {
            const seatIndex = parseInt(seatNumber.split(" ")[1]) - 1;
            const seatElement = seats[seatIndex];
            seatElement.classList.remove("selected");
            seatElement.classList.add("occupied");
        });

        // Reset everything
        selectedSeats.length = 0;
        updateTotalPrice();
        updateSelectedSeats();
    }
});

// 5. Handle "Cancel" button click
document.getElementById("cancelBtn").addEventListener("click", function () {
    // Deselect all selected seats
    seats.forEach((seat) => {
        seat.classList.remove("selected");
    });
    
    // Reset total price and selected seats holder
    selectedSeats.length = 0;
    updateTotalPrice();
    updateSelectedSeats();
});
