var monName = new Array(
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "Maio",
  "junho",
  "agosto",
  "outubro",
  "novembro",
  "dezembro"
);
var data = new Date();
var dia = String(data.getDate()).padStart(2, "0");
var mes = Number(String(data.getMonth() + 1).padStart(2, "0"));
var ano = data.getFullYear();
var hora = data.getHours();
var min = data.getMinutes();
let dataAtual = dia + " de " + monName[mes] + " de " + ano;
let emissaoProposta = data.toLocaleDateString();
let numero = "";
var product='';
document.getElementById('mensal').style.display = 'none'

async function buscarCliente() {
  let getCpnj = document.getElementById("cnpj").value;
console.log(getCpnj)
console.log(getCpnj.length)


  if(getCpnj.length >= 10){
  const getClient = await fetch(`https://back-newgpd.onrender.com/client/${getCpnj}`);
  const client = await getClient.json();
  document.getElementById("cidade").value = client[0].cidade;
  document.getElementById("razao").value = client[0].razao;
  document.getElementById("contato").value = client[0].contato;
  document.getElementById("email").value = client[0].email;
  document.getElementById("tefpdvm").value = client[0].tefpdvm;
  document.getElementById("fantasia").value = client[0].fantasia;
  console.log(client[0]);
  if (numero === "") {
    novaProposta();
  }
  buscarProdutos();

}
  
}

async function buscarProdutos() {
  const getproduct = await fetch(`https://back-newgpd.onrender.com/product/`);
  product = await getproduct.json();
  console.table(product);
  gerandoListagem();
}



function novaProposta() {
  numero = String(ano * 100 + mes) + String(dia) + String(hora) + String(min);
  console.log(numero);
  document.getElementById("data-da-proposta").innerText = dataAtual;
  document.getElementById("emissao").innerText = emissaoProposta;
  document.getElementById("numero").innerText = numero;
}

console.log(dataAtual);
let totalizando = 0;

function gerandoListagem() {
  var opt='<option select></option>';
  product.forEach((element) => {
    opt += `
        <option id="${element.id}" value="${element.valor}">${element.produto}</option>  
      
  `; }
  );

  for(var l = 1; l < 8; l++){
    document.getElementById(`iten${l}`).innerHTML = `
    <select class="form-control" id="itenSelect${l}" onchange='proximoInput(quantidadeIten${l},${l})'>
    ${opt}    
  </select>
    `;
  }

}

var els = document.querySelectorAll("input");
console.log(els);

for (var x = 0; x < els.length; x++) {
  if (x === els.length - 1) {
    document
      .getElementById(els[x].id)
      .setAttribute("onchange", `proximoInput('Itens1')`);
  } else {
    console.log(els[x].id, x);
    let d = x + 1;
    document
      .getElementById(els[x].id)
      .setAttribute("onchange", `proximoInput(${els[d].id})`);
  }
}

function verificar(index) {
  let itn = String(index);
  console.log("verificando", itn);
  let quant = document.getElementById(`quantidadeIten${itn}`).value;
  console.log(quant);
  let preco = document.getElementById(`precoIten${itn}`).value;
  console.log(preco);
  let total = quant * preco;
  document.getElementById(`totalIten${itn}`).value = total;
}

function total() {
  let totalGeral = 0;
  for (t = 1; t < 8; t++) {
    totalizando += Number(document.getElementById(`totalIten${t}`).value);
  }
  totalGeral = totalizando;
  totalizando = 0;
  console.log(totalGeral);
  totalGeralProposta.value = Number(totalGeral);
}

function proximoInput(destino,act) {
  if(!act){
  destino.focus();
  } else {
    const selectIten = document.getElementById(`itenSelect${act}`).options.selectedIndex
    console.log(product[selectIten-1].valor)
    document.getElementById(`precoIten${act}`).value = product[selectIten-1].valor
    
    if (product[selectIten-1].e_servico){
      console.log(product[selectIten-1].e_servico)
      document.getElementById('mensal').style.display = ''
      document.getElementById('mensalidade').value = `${product[selectIten-1].valor}`
    } 
    destino.focus();
  }
}



// buscarProdutos()
