let phases = [
    {step: "Pães", isActive: false},
    {step: "Carnes", isActive: false},
    {step: "Queijos", isActive: false},
]

let feedback = document.querySelector(".feedback-pedido");

feedback.innerHTML = phases.map(phase => {
    return `<div class=${phase.isActive ? "active" : "step"}>
                ${phase.step}
            </div>`
}).join("")

const data = {
    paes: [
        {tipo: "Brioche", preco: 4.80},
        {tipo: "Pão de Batata", preco: 3.30},
        {tipo: "Pão Australiano", preco: 4.00}
    ],
    carnes: [
        {tipo: "Bovino", preco: 4.80},
        {tipo: "Suíno", preco: 5.60},
        {tipo: "Veggie", preco: 7.60}
    ],
    queijos : [
        {tipo: "Cheddar", preco: 4.80},
        {tipo: "Prato", preco: 5.60},
        {tipo: "Suíço", preco: 7.60}
    ],
    opcionais : [
        {tipo: "Cheddar", preco: 4.80},
        {tipo: "Prato", preco: 5.60},
        {tipo: "Suíço", preco: 7.60}
    ]
}

let pedido = {};
let precoTotal = 0;

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
                document.querySelector(".resumo").innerHTML += `${Object.values(pedido)[estado].tipo}`
                addBehavior();
                addOptions();
                estado++;
            } else if(btn.classList.contains("prev") && estado > 0){
                displayPedido.innerHTML = estados[estado - 1];
                document.querySelector(".resumo").innerHTML += `${Object.values(pedido)[estado].tipo}`
                addBehavior();
                addOptions();
                estado--;
            }
        })
    }  
}

let preco = document.querySelector("#preco");

addBehavior();
addOptions();

function addOptions()
{
    const options = document.querySelectorAll(".option");
    for(let option of options)
    {
        option.addEventListener("click", (e) =>{
            pedidoFactory(data, e.target.parentNode.id, [e.target.value]);
            pegarPrecoTotal(pedido);
        })
    }
}


function pedidoFactory(data, query, index)
{
    pedido[query] = data[query][index];
}

function pegarPrecoTotal(pedido)
{
    let precos = Object.values(pedido);
}

