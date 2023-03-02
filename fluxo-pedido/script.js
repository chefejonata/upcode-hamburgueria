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

let pedido = {};
let pedidos = [];
let modalDeCompra = document.createElement("div");
let btnAdd = document.querySelector(".add");

btnAdd.addEventListener("click", incluirNovoPedido);

const resumo = document.querySelector(".resumo");
let btnFinalizar = document.querySelector(".finalizar-pedido");
btnFinalizar.addEventListener("click", () => {
    habilitarCheckout();
})


function fecharModal(e)
{
    return e.target
}

const pão = `
    <div class="pedido-layout">

        <img src="https://www.allrecipes.com/thmb/cPjxWAmp-kUJiOniH5jfPGub7ug=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1073329-belles-hamburger-buns-vrinda-4x3-1-10f86efd183744f0a42d751f7989968a.jpg" />
        <label for="paes">Escolha o seu tipo de pão: </label>
            <div class="pedido-actions">
                <button class="action prev" disabled>Voltar</button>
                <select id="paes">
                    <option>-----------</option>
                    ${data.paes.map((pao, index) => {
                        return `<option class="option" value=${index}>
                            ${pao.tipo}
                        </option>`
                    }).join("")}
                </select>
                <button class="action prox">Prosseguir</button>
            </div>
    </div>
`;

const carne = `
<div class="pedido-layout">
    
    <img src="https://bbqhost.com/wp-content/uploads/2021/10/3.-grilled-ground-beef-patty-720x405.jpg" />
    <label for="carnes">Escolha o seu tipo de carne: </label>
    <div class="pedido-actions">
        <button class="action prev">Voltar</button>
        <select id="carnes">
        <option>-----------</option>
    ${data.carnes.map((carne, index) => {
        return `<option class="option" value=${index}>
            ${carne.tipo}
        </option>`
    }).join("")}
        </select>
        <button class="action prox">Prosseguir</button>
    </div>
</div>
`

const queijo = `
<div class="pedido-layout">
    
    <img src="https://revistamenu.com.br/wp-content/uploads/2019/08/gravidade-2-peq-1050x698.jpg" />
    <label for="queijos">Escolha o seu tipo de queijo: </label>
    <div class="pedido-actions">
        <button class="action prev">Voltar</button>
        <select id="queijos">
        <option>-----------</option>
        ${data.queijos.map((queijo, index) => {
            return `<option class="option" value=${index}>
                ${queijo.tipo}
            </option>`
        }).join("")}
        </select>
        <button class="action prox" disabled>Prosseguir</button>
    </div>
</div>
`

let estados = [pão, carne, queijo];
let estado = 0;

const displayPedido = document.querySelector("#pedido");

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


let resumoDiv = document.querySelector(".resumo__title");
let total = document.querySelector(".total");
function addOptions()
{

    const select = document.querySelector("select");

        select.addEventListener("input", (e) =>{
            pedidoFactory(data, e.target.id, e.target.value);
            document.querySelector(".carrinho-contador").innerHTML = pedidos.length;
            resumoDiv.style.visibility = "visible";
            atualizarDiv(e.target.id, pedido[e.target.id]);
            total.innerHTML = `Total: R$ ${pegarPreco(pedido).toFixed(2)}`;            
            if(Object.keys(pedido).length >= 3)
            {
               btnFinalizar.removeAttribute("disabled");
            }
        })

}

(function(){
    displayPedido.innerHTML = estados[estado];  
    addBehavior();
    addOptions();
})();


function incluirNovoPedido()
{
    if(Object.keys(pedido).length < 3)
    {
        alert("Pedido incompleto. Por favor, selecione todos os ingredientes")
        return;
    }
    pedidos.push(pedido);
    pedido = {};
    document.querySelector(".carrinho-contador").innerHTML = pedidos.length;
    document.querySelector(".paes").style.visibility = "hidden";
    document.querySelector(".carnes").style.visibility = "hidden";
    document.querySelector(".queijos").style.visibility = "hidden";
    total.innerHTML = "Total: R$ 0.00"
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

let totalCart = 0;

function habilitarCheckout()
{

    let totalCart = 0;
    
    for(let k = 0; k < pedidos.length; k++)
    {
        for(let m = 0; m < 3; m ++)
        {
            totalCart += Object.values(pedidos[k])[m].preco;
        }
    }

    modalDeCompra.innerHTML =  `
    <div id="modal-container" class="modal-container" open="false" role="dialog" tab-index="-1">
        <div class="modal-content">
            <div class="modal-header">
            <h3>Checkout: </h3>
                <button class="modal-close"></button>
            </div>
            <div class="cart-pedidos">
                ${
                    pedidos.length > 0 ? pedidos.map(item => `<p class="cart-pedido">${item.paes["tipo"]}, ${item.carnes["tipo"]}, ${item.queijos["tipo"].substring(0,3)}...</p>
                                                            `).join("") :
                    pedido.map(item => `<p class="cart-pedido">${item.paes["tipo"]}, ${item.carnes["tipo"]}...</p>`).join("") 
                }
            </div>
            <div class="cart-total">Total: R$
                ${totalCart}
            </div>
            <div class="cart-actions">
                <button>Finalizar</button>
                <button>Cancelar</button>
            </div>
            
        </>
    </di>
`
    let overlay = document.createElement("div");
    overlay.id = "modal-overlay"
    let teste = document.querySelector(".teste");
    teste.appendChild(overlay);
    teste.appendChild(modalDeCompra);   

    document.querySelector(".modal-close").addEventListener("click", () =>{
        teste.removeChild(overlay);
        teste.removeChild(modalDeCompra);
    });

}