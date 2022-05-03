class ValidationError extends Error {
    constructor(message, fields = []) {
        super(message);
        this.name = 'ValidationError';
        this.fields = fields;
    }
}

function setVisible(element, visible) {
    if (visible) {
        element.classList.remove("hidden");
        element.classList.add("visible");
    } else {
        element.classList.remove("visible");
        element.classList.add("hidden");
    }
}

function createTd(content, className) {
    const td = document.createElement("td");
    if (className == "info-nome") {
        td.innerHTML = `<span class="delete">deletar</span>${content}`;
        td.querySelector(".delete").addEventListener("click", deletePatient);
    } else {
        td.textContent = content;
        td.classList.add(className);
    }
    return td;
}
 
function deletePatient(e) {
    const tr = e.target.parentNode.parentNode;
    tr.classList.add("fade-out");
    setTimeout(() => {
        tr.parentNode.removeChild(tr);
    }, 500);
}

function createPatientTr(patient) {
    const patientTr = document.createElement("tr");
    patientTr.classList.add("paciente")
    patientTr.appendChild(createTd(patient.name, "info-nome"));
    patientTr.appendChild(createTd(patient.weight, "info-peso"));
    patientTr.appendChild(createTd(patient.height, "info-altura"));
    patientTr.appendChild(createTd(patient.bodyFat, "info-gordura"));
    patientTr.appendChild(createTd(0, "info-imc"));
    return patientTr;
}

function insertPatient() {
    try {
        const form = document.querySelector("#form-adiciona");
        const patient = {
            name: form.nome.value,
            weight: form.peso.value,
            height: form.altura.value,
            bodyFat: form.gordura.value,
        }
        validatePatient(patient);
        const patientTr = createPatientTr(patient);
        document.querySelector("#tabela-pacientes").appendChild(patientTr);
        computePatientImc(patientTr)
        resetErrorFields();
    } catch (error) {
        console.log(error);
        error.fields.forEach(field => {
            console.log(field);
            setVisible(document.querySelector(`#${field}-error`), true);
        });
    }
}

function validatePatient(patient) {
    const errorFields = [];
    if (patient.name == "") {
        errorFields.push("name");
    }
    if (isInvalidNumber(patient.weight)) {
        errorFields.push("weight");
    }
    if (isInvalidNumber(patient.height)) {
        errorFields.push("height");
    }
    if (isInvalidNumber(patient.bodyFat)) {
        errorFields.push("bodyFat");
    }
    if (errorFields.length > 0) {
        throw new ValidationError("Invalid patient data", errorFields);
    }
}

function isInvalidNumber(n) {
    return isNaN(n) || n <= 0;
}

function resetErrorFields() {
    document.querySelectorAll(".error").forEach( e => setVisible(e, false));
}

document.querySelector("#adicionar-paciente").addEventListener("click", insertPatient);

document.querySelector("#btn-cadastrar").addEventListener("click", () => {
    setVisible(document.querySelector(".hidden"), true)
});

document.querySelectorAll(".delete").forEach(e => {
    e.addEventListener("click", deletePatient)
});