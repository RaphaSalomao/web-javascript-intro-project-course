function getPatients() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://api-pacientes.herokuapp.com/pacientes");
    xhr.addEventListener("load", function () {
        if (xhr.status == 200) {
            const response = JSON.parse(xhr.responseText);
            response.forEach(patient => {
                const patientTr = createPatientTr({
                    name: patient.nome,
                    weight: patient.peso,
                    height: patient.altura,
                    bodyFat: patient.gordura,
                    imc: patient.imc
                });
                document.querySelector("#tabela-pacientes").appendChild(patientTr);
                computePatientImc(patientTr);
            });
        } else {
            alert("Tente novamente mais tarde.");
        }
    });
    const response = xhr.send();
}

document.querySelector("#btn-buscar").addEventListener("click", getPatients);