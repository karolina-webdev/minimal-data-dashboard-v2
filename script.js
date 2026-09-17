const people = [
    { name: "Anna", age: 25, city: "Tallinn" },
    { name: "Mark", age: 32, city: "Tartu" },
    { name: "Helen", age: 28, city: "Tallinn" },
    { name: "John", age: 35, city: "Narva" },
    { name: "Maria", age: 22, city: "Tartu" }
];

/* ------------------ RENDER CARDS ------------------ */
function renderCards(data) {
    const container = document.getElementById("cardsContainer");
    container.innerHTML = "";

    const grid = document.createElement("div");
    grid.className = "cards-grid";

    data.forEach(person => {
        const card = document.createElement("div");
        card.className = "card";

        const icon = document.createElement("div");
        icon.className = "card-icon";
        icon.textContent = person.name[0];

        const info = document.createElement("div");
        info.className = "card-info";
        info.innerHTML = `
            <strong>${person.name}</strong>
            <span>Age: ${person.age}</span>
            <span>City: ${person.city}</span>
        `;

        card.appendChild(icon);
        card.appendChild(info);
        grid.appendChild(card);
    });

    container.appendChild(grid);

    applyDarkModeToCards();
}

/* ------------------ RENDER CHART ------------------ */
let ageChart;

function renderChart(data) {
    const ctx = document.getElementById("ageChart").getContext("2d");

    const ages = data.map(p => p.age);
    const names = data.map(p => p.name);

    if (ageChart) ageChart.destroy();

    ageChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: names,
            datasets: [{
                label: "Age",
                data: ages,
                backgroundColor: document.body.classList.contains("dark")
                    ? "rgba(255, 255, 255, 0.4)"
                    : "rgba(75, 192, 192, 0.4)",
                borderColor: document.body.classList.contains("dark")
                    ? "rgba(255, 255, 255, 0.8)"
                    : "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: document.body.classList.contains("dark")
                            ? "#e5e7eb"
                            : "#1f2937"
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: document.body.classList.contains("dark")
                            ? "#e5e7eb"
                            : "#1f2937"
                    }
                },
                y: {
                    ticks: {
                        color: document.body.classList.contains("dark")
                            ? "#e5e7eb"
                            : "#1f2937"
                    }
                }
            }
        }
    });
}

/* ------------------ FILTERS ------------------ */
function applyFilters() {
    let filtered = [...people];

    const city = document.getElementById("cityFilter").value;
    const age = document.getElementById("ageFilter").value;

    if (city !== "All") {
        filtered = filtered.filter(p => p.city === city);
    }

    if (age !== "All") {
        const [min, max] = age.split("-").map(Number);
        filtered = filtered.filter(p => p.age >= min && p.age <= max);
    }

    renderCards(filtered);
    renderChart(filtered);
}

document.getElementById("cityFilter").addEventListener("change", applyFilters);
document.getElementById("ageFilter").addEventListener("change", applyFilters);

document.getElementById("sortName").addEventListener("click", () => {
    const sorted = [...people].sort((a, b) => a.name.localeCompare(b.name));
    renderCards(sorted);
    renderChart(sorted);
});

document.getElementById("sortAge").addEventListener("click", () => {
    const sorted = [...people].sort((a, b) => a.age - b.age);
    renderCards(sorted);
    renderChart(sorted);
});

/* ------------------ DARK MODE ------------------ */
const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.querySelector(".app").classList.toggle("dark");
    document.querySelector(".controls").classList.toggle("dark");
    themeBtn.classList.toggle("dark");

    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");

    applyDarkModeToCards();
    renderChart(people);
});

function applyDarkModeToCards() {
    const cards = document.querySelectorAll(".card");
    const icons = document.querySelectorAll(".card-icon");
    const names = document.querySelectorAll(".card-info strong");
    const spans = document.querySelectorAll(".card-info span");

    const dark = document.body.classList.contains("dark");

    cards.forEach(c => c.classList.toggle("dark", dark));
    icons.forEach(i => i.classList.toggle("dark", dark));
    names.forEach(n => n.classList.toggle("dark", dark));
    spans.forEach(s => s.classList.toggle("dark", dark));
}

/* ------------------ INITIAL LOAD ------------------ */
renderCards(people);
renderChart(people);

if (localStorage.getItem("theme") === "dark") {
    themeBtn.click();
}

