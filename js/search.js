function search() {
    const value = this.value
    const patients = document.querySelectorAll(".paciente");
    patients.forEach(p => {
        const name = p.querySelector(".info-nome").textContent;
        if (name.toLowerCase().includes(value.toLowerCase())) {
            p.style.display = "";
        } else {
            p.style.display = "none";
        }
    })
}

document.querySelector("#search").addEventListener("input", search);