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
let numero =''


async function buscarCliente(){
  let getCpnj = document.getElementById('cnpj').value
  const getClient = await fetch(`https://gpd-backend.onrender.com/users/${getCpnj}`)
   const client = await getClient.json()
   document.getElementById('cidade').value = client[0].cidade
   document.getElementById('razao').value = client[0].razao
   document.getElementById('contato').value = client[0].contato
   document.getElementById('email').value = client[0].email
   document.getElementById('tefpdvm').value = client[0].tefpdvm
   document.getElementById('fantasia').value = client[0].fantasia
   console.log(client[0])
   if(numero === ""){
     novaProposta()
    }   
    console.log(nova)


}

function novaProposta() {
  numero =
    String(ano * 100 + mes) + String(dia) + String(hora) + String(min);
  console.log(numero);
  document.getElementById("data-da-proposta").innerText = dataAtual;
  document.getElementById("emissao").innerText = emissaoProposta;
  document.getElementById("numero").innerText = numero;
}

console.log(dataAtual);
let totalizando = 0;

for (i = 1; i < 8; i++) {
  document.getElementById("itens").innerHTML += `
      <tr>
      <td colspan="3"><Input Type="Text" id="Iten${i}" onchange='proximoInput(quantidadeIten${i})'></td>
      <td><Input Type="number" class="valores" id="quantidadeIten${i}" onchange='proximoInput(precoIten${i})'></td>
      <td><Input Type="number" class="valores" id="precoIten${i}" oninput="verificar(${i})" onchange='proximoInput(totalIten${i})'></td>
      <td><Input Type="number" class="valores" id="totalIten${i}" onchange='proximoInput(iten${
    i + 1
  })' disabled></td>
    </tr>    
      `;
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

function proximoInput(destino) {
  destino.focus();
}
