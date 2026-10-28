// ==========================================
// PRODUTOS
// ==========================================

const produtos = [

    {
        id: 1,
        nome: "Camisa Dragão",
        descricao: "Modelo preto e vermelho",
        imagem: "camisa1.jfif",
        preco: 45
    },

    {
        id: 2,
        nome: "Camisa E-Guthy",
        descricao: "Modelo preto com detalhes roxos",
        imagem: "camisa2.jfif",
        preco: 45
    },

    {
        id: 3,
        nome: "Camisa Oriental",
        descricao: "Modelo branco e rosa",
        imagem: "camisa3.jfif",
        preco: 45
    },

    {
        id: 4,
        nome: "Camisa Roxa",
        descricao: "Modelo preto e roxo",
        imagem: "camisa4.jfif",
        preco: 45
    }

];


// ==========================================
// LOGIN
// ==========================================

const loginPage =
    document.getElementById("loginPage");

const storePage =
    document.getElementById("storePage");

const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");


loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const email =
            document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase();

        const senha =
            document
            .getElementById("password")
            .value;


        if (
            email === "teste@email.com" &&
            senha === "123456"
        ) {

            loginMessage.textContent =
                "Login realizado! Entrando na loja...";

            loginMessage.className =
                "login-ok";


            setTimeout(
                function () {

                    loginPage
                        .classList
                        .add("hidden");

                    storePage
                        .classList
                        .remove("hidden");

                    window.scrollTo(
                        0,
                        0
                    );

                },
                500
            );

        } else {

            loginMessage.textContent =
                "E-mail ou senha incorretos!";

            loginMessage.className =
                "login-erro";

            document
                .getElementById("password")
                .value = "";

        }

    }
);


// ==========================================
// FORMATAÇÃO DE PREÇO
// ==========================================

function formatarPreco(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ==========================================
// MOSTRAR PRODUTOS
// ==========================================

const productsContainer =
    document.getElementById("products");


function mostrarProdutos() {

    productsContainer.innerHTML =
        produtos.map(

            function (produto) {

                return `

                <article class="product-card">

                    <div class="product-image">

                        <img
                            src="${produto.imagem}"
                            alt="${produto.nome}"
                        >

                    </div>


                    <div class="product-info">

                        <h3>
                            ${produto.nome}
                        </h3>

                        <p>
                            ${produto.descricao}
                        </p>

                        <div class="product-price">

                            ${formatarPreco(
                                produto.preco
                            )}

                        </div>


                        <button
                            class="btn-comprar"
                            onclick="
                                adicionarCarrinho(
                                    ${produto.id}
                                )
                            "
                        >

                            🛒 Adicionar ao carrinho

                        </button>

                    </div>

                </article>

                `;

            }

        ).join("");

}


// ==========================================
// CARRINHO
// ==========================================

let carrinho = [];


const cartButton =
    document.getElementById(
        "cartButton"
    );

const cartModal =
    document.getElementById(
        "cartModal"
    );

const closeCart =
    document.getElementById(
        "closeCart"
    );

const cartItems =
    document.getElementById(
        "cartItems"
    );

const cartCount =
    document.getElementById(
        "cartCount"
    );

const cartTotal =
    document.getElementById(
        "cartTotal"
    );


// ADICIONAR

function adicionarCarrinho(id) {

    const produto =
        produtos.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!produto) {
        return;
    }


    carrinho.push(produto);

    atualizarCarrinho();

}


// REMOVER

function removerCarrinho(index) {

    carrinho.splice(
        index,
        1
    );

    atualizarCarrinho();

}


// ATUALIZAR

function atualizarCarrinho() {

    cartCount.textContent =
        carrinho.length;


    if (
        carrinho.length === 0
    ) {

        cartItems.innerHTML =
            "<p>Seu carrinho está vazio.</p>";

    } else {

        cartItems.innerHTML =

            carrinho.map(

                function (
                    produto,
                    index
                ) {

                    return `

                    <div
                        class="item-carrinho"
                    >

                        <div>

                            <strong>
                                ${produto.nome}
                            </strong>

                            <br>

                            <small>
                                ${formatarPreco(
                                    produto.preco
                                )}
                            </small>

                        </div>


                        <button
                            class="btn-remover"
                            onclick="
                                removerCarrinho(
                                    ${index}
                                )
                            "
                        >

                            Remover

                        </button>

                    </div>

                    `;

                }

            ).join("");

    }


    const total =
        carrinho.reduce(

            function (
                soma,
                produto
            ) {

                return soma +
                    produto.preco;

            },

            0

        );


    cartTotal.textContent =
        formatarPreco(total);

}


// ==========================================
// ABRIR CARRINHO
// ==========================================

cartButton.addEventListener(
    "click",
    function () {

        cartModal
            .classList
            .remove("hidden");

    }
);


// ==========================================
// FECHAR CARRINHO
// ==========================================

closeCart.addEventListener(
    "click",
    function () {

        cartModal
            .classList
            .add("hidden");

    }
);


cartModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            cartModal
        ) {

            cartModal
                .classList
                .add("hidden");

        }

    }
);


// ==========================================
// FINALIZAR
// ==========================================

document
    .getElementById("finishOrder")
    .addEventListener(
        "click",
        function () {

            if (
                carrinho.length === 0
            ) {

                alert(
                    "Seu carrinho está vazio!"
                );

                return;

            }


            const total =
                carrinho.reduce(

                    function (
                        soma,
                        produto
                    ) {

                        return soma +
                            produto.preco;

                    },

                    0

                );


            alert(
                "Pedido realizado com sucesso!\n\n" +
                "Quantidade: " +
                carrinho.length +
                "\nTotal: " +
                formatarPreco(total)
            );

        }
    );


// ==========================================
// INICIAR SITE
// ==========================================

mostrarProdutos();

atualizarCarrinho();