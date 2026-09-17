const people = [
    { name: "Anna", age: 25, city: "Tallinn" },
    { name: "Mark", age: 32, city: "Tartu" },
    { name: "Helen", age: 28, city: "Tallinn" },
    { name: "John", age: 35, city: "Narva" },
    { name: "Maria", age: 22, city: "Tartu" }
];

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
        icon.textContent = person.name[0]; // первая буква имени

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
}

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
}

document.getElementById("cityFilter").addEventListener("change", applyFilters);
document.getElementById("ageFilter").addEventListener("change", applyFilters);

document.getElementById("sortName").addEventListener("click", () => {
    const sorted = [...people].sort((a, b) => a.name.localeCompare(b.name));
    renderCards(sorted);
});

document.getElementById("sortAge").addEventListener("click", () => {
    const sorted = [...people].sort((a, b) => a.age - b.age);
    renderCards(sorted);
});

renderCards(people);
