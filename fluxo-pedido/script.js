const data = {
    paes: [
        {tipo: "Brioche", preco: 4.80},
        {tipo: "Pão de Batata", preco: 3.30},
        {tipo: "Pão Australiano", preco: 4.00}
    ],
    carnes: [
        {tipo: "Blend Bovino", preco: 4.80},
        {tipo: "Blend Suíno", preco: 5.60},
        {tipo: "Veggie", preco: 7.60}
    ],
    queijos : [
        {tipo: "Queijo Cheddar", preco: 4.80},
        {tipo: "Queijo Prato", preco: 5.60},
        {tipo: "Queijo Suíço", preco: 7.60}
    ],
    opcionais : [
        {tipo: "Cheddar", preco: 4.80},
        {tipo: "Prato", preco: 5.60},
        {tipo: "Suíço", preco: 7.60}
    ]
}
const resumo = document.querySelector(".resumo");
let pedido = {};

const pão = `
    <div class="pedido-layout">
        <label for="paes">Escolha o seu tipo de pão: </label>
        <img src="https://www.allrecipes.com/thmb/cPjxWAmp-kUJiOniH5jfPGub7ug=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1073329-belles-hamburger-buns-vrinda-4x3-1-10f86efd183744f0a42d751f7989968a.jpg" />
            <div class="pedido-actions">
                <button class="action prev">Anterior</button>
                <select id="paes">
                    ${data.paes.map((pao, index) => {
                        return `<option class="option" value=${index}>
                            ${pao.tipo}
                        </option>`
                    }).join("")}
                </select>
                <button class="action prox">Próximo</button>
            </div>
    </div>
`;

const carne = `
<div class="pedido-layout">
    <label for="carnes">Escolha seu tipo de carne: </label>
    <img src="https://bbqhost.com/wp-content/uploads/2021/10/3.-grilled-ground-beef-patty-720x405.jpg" />
    <div class="pedido-actions">
        <button class="action prev">Anterior</button>
        <select id="carnes">
    ${data.carnes.map((carne, index) => {
        return `<option class="option" value=${index}>
            ${carne.tipo}
        </option>`
    }).join("")}
        </select>
        <button class="action prox">Próximo</button>
    </div>
</div>
`

const queijo = `
<div class="pedido-layout">
    <label for="queijos">Escolha seu tipo de queijo: </label>
    <img src="https://revistamenu.com.br/wp-content/uploads/2019/08/gravidade-2-peq-1050x698.jpg" />
    <div class="pedido-actions">
        <button class="action prev">Anterior</button>
        <select id="queijos">
        ${data.queijos.map((queijo, index) => {
            return `<option class="option" value=${index}>
                ${queijo.tipo}
            </option>`
        }).join("")}
        </select>
        <button class="action prox">Próximo</button>
    </div>
</div>
`

let estados = [pão, carne, queijo];
let estado = 0;

const displayPedido = document.querySelector("#pedido");

displayPedido.innerHTML = estados[estado];

function addBehavior()
{
const btns = document.querySelectorAll(".action");
    for (let btn of btns)
    {
        btn.addEventListener("click", ()=>{
            if(btn.classList.contains("prox") && estado < estados.length - 1)
            {
                displayPedido.innerHTML = estados[estado + 1];
                addBehavior();
                addOptions();
                estado++;
            } else if(btn.classList.contains("prev") && estado > 0){
                displayPedido.innerHTML = estados[estado - 1];
                addBehavior();
                addOptions();
                estado--;
            }
        })
    }  
}


(function(){
    addBehavior();
    addOptions();
})();



let resumoDiv = document.querySelector(".resumo__title");
let total = document.querySelector(".total");


function addOptions()
{
    const options = document.querySelectorAll(".option");
    for(let option of options)
    {
        option.addEventListener("click", (e) =>{
            pedidoFactory(data, e.target.parentNode.id, [e.target.value]);
            resumoDiv.style.visibility = "visible";
            atualizarDiv(e.target.parentNode.id, pedido[e.target.parentNode.id]);
            total.innerHTML = `Total: R$ ${pegarPreco(pedido).toFixed(2)}`;
            if(Object.keys(pedido).length >= 3)
            {
                document.querySelector(".finalizar-pedido").removeAttribute("disabled");
            }
        })
    }
}


function pedidoFactory(data, query, index)
{
    pedido[query] = data[query][index];
}

function atualizarDiv(seletorCSS, conteudo)
{
    let str = ".";
    str += seletorCSS;
    let el = document.querySelector(str);
    let {tipo, preco} = conteudo;
    el.innerHTML = `<span>${tipo}</span> <span class="preco">R$ ${preco}</span>`;
    el.style.visibility = "visible";
}

function pegarPreco(obj)
{
    let itens = Object.values(obj);
    let soma = 0;
    
    for(let i = 0; i < itens.length; i++)
    {
        soma += itens[i].preco;
    }
        
    return soma;

}