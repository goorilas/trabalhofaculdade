<?php

header('Content-Type: application/json');

$arquivo = "projetos.json";

$dados = json_decode(
    file_get_contents($arquivo),
    true
);

$dados["projetos"][] = [

    "nome" => htmlspecialchars($_POST["nome"]),
    "descricao" => htmlspecialchars($_POST["descricao"]),
    "link" => htmlspecialchars($_POST["link"])

];

file_put_contents(
    $arquivo,
    json_encode(
        $dados,
        JSON_PRETTY_PRINT
    )
);

echo json_encode([
    "success" => true
]);