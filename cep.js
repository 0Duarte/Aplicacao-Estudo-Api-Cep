document.getElementById("cepForm").addEventListener("submit", chamarCep);
const cidade = document.getElementById("nomeCidade");
const rua = document.getElementById("nomeRua");
const estado = document.getElementById("nomeEstado");
const cepResult = document.getElementById("cepResult");

let arrayResultados = [];

function completarTabela() {
  document.getElementById("corpoTabela").textContent = "";
  console.log(arrayResultados);

  if (arrayResultados.length === 0) {
    alert("Nenhum resultado encontrado");
  } else {
    document.getElementById("tabelaInfo").style.display = "table";
    arrayResultados.map((cepArray) => {
      const tr = document.createElement("tr");

      const thIdx = document.createElement("th");
      thIdx.innerHTML = cepArray.cep;
      tr.appendChild(thIdx);

      const tdRua = document.createElement("td");
      tdRua.innerHTML = cepArray.logradouro;
      tr.appendChild(tdRua);

      const tdComp = document.createElement("td");
      tdComp.innerHTML = cepArray.complemento;
      tr.appendChild(tdComp);

      document.getElementById("corpoTabela").appendChild(tr);
    });
  }
}

function chamarCep(evt) {
  evt.preventDefault();

  fetch(
    `https://viacep.com.br/ws/${estado.value}/${cidade.value}/${rua.value}/json/`
  )
    .then((response) => response.json())
    .then((cep) => {
      arrayResultados = cep;
      completarTabela();
    })
    .catch((error) => {
      alert("Erro ao buscar CEP");
    });
}
