let product = "";

document.getElementById("idSelectEdit").style.display = "none";

function convertTables() {
  console.log("tentando do a tabela");

    const datatablesSimple = document.getElementById("datatablesSimple");
    if (datatablesSimple) {
      new simpleDatatables.DataTable(datatablesSimple);
    }
  
}

async function buscarProdutos() {
  const getproduct = await fetch(`https://back-newgpd.onrender.com/client/`);
  resposta = await getproduct.json();
  product = resposta;
  console.log(product)
  listar();

  const gettecnicos = await fetch(`https://back-newgpd.onrender.com/tecnicos/`);
  resposta = await gettecnicos.json();
  tecnicos = resposta;
  console.table(tecnicos);

  listarTecnicos();
}



buscarProdutos();

function listarTecnicos() {
  tecnicos.forEach((tech) => {
   
    document.getElementById('tecnicos-mondal').innerHTML += `
      <option value="${tech.nome}">${tech.nome}</option>
        `;
  });
  console.log("passou");
  convertTables();
}

function listar() {
  document.getElementById("tabelona").innerHTML = "";
  product.forEach((element, idc) => {
   
    document.getElementById("tabelona").innerHTML += `
        <tr>
        <td scope="row" ><b>${element.id}</b></td>
        <td scope="row" >${element.fantasia}</td>
        <td>${element.razao}</td>
        <td>${element.cnpj}</td>
        <td>${element.contato}</td>
        <td>${element.telefone}</td>
        <td>${element.telefone}
        <button type="button" class="btn btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat" onclick="agendamento('${element.cnpj}','${element.fantasia}')">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M128 0c13.3 0 24 10.7 24 24V64H296V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192 144 128C0 92.7 28.7 64 64 64h40V24c0-13.3 10.7-24 24-24zM400 192H48V448c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V192zM329 297L217 409c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 95-95c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
        </button>
        </td>
        
        </tr>
       
        `;
  });
  console.log("passou");
  convertTables();
}

async function agendamento(cnpj,fantasia){
  console.log(cnpj,fantasia)
  document.getElementById('exampleModalLabel').innerHTML = fantasia;
  document.getElementById('cnpj-agendar').value = cnpj;
  document.getElementById('btn-mondals-footer').innerHTML = `
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="agendar('${fantasia}')">Agendar</button>
  
  `
  


}

async function agendar(fantasy){

    let techPost = document.getElementById("tecnicos-mondal").value;
    let cnpjPost = document.getElementById("cnpj-agendar").value;
    let motivoPost = document.getElementById("motivo").value;
    let dataPost = document.getElementById("data-agendar").value;
  
    console.log("rodando", techPost, cnpjPost, motivoPost, dataPost);
    let enviar = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        fantasia: fantasy,
        cnpj: cnpjPost,
        motivo: motivoPost,
        tecnico: techPost,
        previsão: dataPost,

      }),
    };
  
    let enviando = await fetch(
      "https://back-newgpd.onrender.com/ticket",
      enviar
    );
    console.log("no aguardo do retorno");
    console.log(enviando);



}

async function post() {
  let nomePost = document.getElementById("nome").value;
  let valorPost = document.getElementById("valor").value;
  let mensalPost = document.getElementById("mensal").value;

  console.log("rodando", nomePost, valorPost, mensalPost);
  let enviar = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      nome: nomePost,
      valor: valorPost,
      e_servico: mensalPost,
    }),
  };

  let enviando = await fetch(
    "https://back-newgpd.onrender.com/product",
    enviar
  );
  console.log("no aguardo do retorno");
  console.log(enviando);
  buscarProdutos();
}

async function deleteSelect(id) {
  console.log("deletando");
  let enviar = {
    method: "delete",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      id: id,
    }),
  };

  let enviando = await fetch(
    "https://back-newgpd.onrender.com/product",
    enviar
  );
  console.log("no aguardo do retorno");
  console.log(enviando);
  buscarProdutos();
  alert("deletado");
}

function editSelect(idx, indice) {
  document.getElementById("idSelectEdit").style.display = "";
  document.getElementById(
    "idSelectEdit"
  ).innerHTML = `Edição do produto com ID ${idx}`;
  document.getElementById("produto").value = product[indice].produto;
  document.getElementById("valor").value = product[indice].valor;
  document.getElementById("mensal").checked = product[indice].e_servico;
  console.log(idx);
  modEdição(true, idx);
}

function modEdição(mod, idz) {
  if (mod) {
    document.getElementById(
      "modo-post"
    ).innerHTML = `<a class="btn btn-danger" onclick="upSelect(${idz})">Editar</a>`;
  } else {
    document.getElementById("modo-post").innerHTML =
      '<a class="btn btn-primary" onclick="post()">Cadastrar</a>';
  }
}

async function upSelect(id) {
  console.log("rodando a edicao", id);
  let produtoPost = document.getElementById("produto").value;
  let valorPost = document.getElementById("valor").value;
  let mensalPost = document.getElementById("mensal").checked;
  let enviar = {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      produto: produtoPost,
      valor: valorPost,
      e_servico: mensalPost,
      id: id,
    }),
  };

  let enviando = await fetch(
    "https://back-newgpd.onrender.com/product",
    enviar
  );
  document.getElementById("idSelectEdit").style.display = "none";
  console.log("no aguardo do retorno");
  console.log(enviando);
  location.reload();
}
