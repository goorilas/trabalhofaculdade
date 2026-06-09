const titulo = document.getElementById("titulo-animado");

const texto = titulo.innerText;

titulo.innerHTML = "";

texto.split("").forEach((letra, index) => {

    const span = document.createElement("span");

    span.classList.add("letra");

    span.style.animationDelay = `${index * 0.05}s`;

    span.innerHTML = letra === " " ? "&nbsp;" : letra;

    titulo.appendChild(span);

});

function carregarProjetos() {

    fetch("carregar_projetos.php")

        .then(response => response.json())

        .then(data => {

            const lista =
                document.getElementById("lista-projetos");

            lista.innerHTML = "";

            data.projetos.forEach(projeto => {

                lista.innerHTML += `

                    <div class="card bg-dark text-light mb-3">

                        <div class="card-body">

                            <h5>
                                ${projeto.nome}
                            </h5>

                            <p>
                                ${projeto.descricao}
                            </p>

                            <a
                                href="${projeto.link}"
                                target="_blank"
                                class="btn btn-primary">

                                Abrir Projeto

                            </a>

                        </div>

                    </div>

                `;

            });

        });

}

document
    .getElementById("formProjeto")
    .addEventListener("submit",

        function (e) {

            e.preventDefault();

            const formData = new FormData();

            formData.append(
                "nome",
                document.getElementById("nomeProjeto").value
            );

            formData.append(
                "descricao",
                document.getElementById("descricaoProjeto").value
            );

            formData.append(
                "link",
                document.getElementById("linkProjeto").value
            );

            fetch(
                "adicionar_projeto.php",
                {
                    method: "POST",
                    body: formData
                }
            )

                .then(response => response.json())

                .then(() => {

                    carregarProjetos();

                    document
                        .getElementById("formProjeto")
                        .reset();

                });

        });

carregarProjetos();