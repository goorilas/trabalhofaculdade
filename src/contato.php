<?php

// caminho do arquivo de dados
$file = './data/data.csv';

// verifica se deve limpar o arquivo
// GET /contato.php?action=limpar
if (isset($_GET['action']) && $_GET['action'] == 'limpar') {
    // salva conteudo vazio dentro do arquivo    
    file_put_contents($file, '');
    // atualiza a página sem a action limpar
    header("Location: /contato.php");
    // finaliza para não ficar em loop
    exit;
}

// verifica se deve salvar no arquivo
// POST /contato.php
if (isset($_POST['nome']) && isset($_POST['email']) && isset($_POST['mensagem'])) {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $mensagem = $_POST['mensagem'];
    echo "<h1>Mensagem enviada com sucesso!</h1>";
    echo "Nome: " . $nome . "<br>";
    echo "Email: " . $email . "<br>";
    echo "Mensagem: " . $mensagem;
    // cria a linha que será adicionada no arquivo
    // as colunas são separadas por "|"
    // "\n" serve para pular para linha de baixo no arquivo
    $linha = $nome . "|" . $email . "|" . $mensagem . "\n";
    // adiciona a linha e salva o arquivo
    file_put_contents($file, $linha, FILE_APPEND | LOCK_EX);
}

// faz a leitura do conteudo do arquivo
$result = file_get_contents($file);

echo "<hr>";
echo "<h1>Dados</h1>";
echo "<hr>";
// link para voltar para a pagina inicial
echo '<a href="/">Voltar</a>';
echo ' | ';
// link que atualiza a pagina com a action limpar
echo '<a href="?action=limpar">Limpar</a>';
echo "<hr>";
// exibe o conteudo do arquivo
// a tag <pre> exibe o texto respeitando a formatação
// logo, o \n funciona dentro dele ao inves do <br>
echo "<pre>".$result."</pre>";

?>