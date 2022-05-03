function computeImc(weight, height) {
    return weight / (height * height);
}

function preventDefaultAll(element) {
    element.addEventListener('click', function (e) {
        e.preventDefault();
    });
}

function setImcColorStyle(imc, p) {
    if (imc < 18.5) {
        p.querySelector(".info-imc").classList.add("text-yellow");
    } else if (imc < 24.9) {
        p.querySelector(".info-imc").classList.add("text-green");
    } else {
        p.querySelector(".info-imc").classList.add("text-red");
    }
}

function computePatientImc(p) {
    const weight = p.querySelector(".info-peso").textContent;
        const height = p.querySelector(".info-altura").textContent;
        const imc = computeImc(weight, height).toFixed(2);
        setImcColorStyle(imc, p)
        p.querySelector(".info-imc").textContent = imc
}

function loadImc() {
    const patient = document.querySelectorAll(".paciente");
    patient.forEach(p => {
        computePatientImc(p);
    });
}

loadImc();

document.querySelectorAll("button").forEach(preventDefaultAll);