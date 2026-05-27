// classe responsavel por controlar os dados armazenados no navegador
export class DataStorage {

    constructor() {
        // chave de acesso ao session storage
        this.chave = "data"
        // seta o valor inicial dos dados salvos
        this.limpar()
    }

    // limpa os dados salvos
    limpar() {
        const json = JSON.stringify([])
        sessionStorage.setItem(this.chave, json)
    }

    // pega o conteudo do arquivo e salva os dados
    async sincronizar() {
        const response = await fetch('./data/data.csv')
        const csv = await response.text()
        const linhas = csv.split("\n").filter(x => !!x)
        this.limpar()
        this.inserir(linhas)
    }

    // pega os dados salvos
    carregar() {
        const json = sessionStorage.getItem(this.chave)
        return JSON.parse(json)
    }

    // adiciona linhas aos dados salvos
    inserir(linhas) {
        const items = this.carregar()
        const registros = [
            ...items,
            ...linhas,
        ]
        const json = JSON.stringify(registros)
        sessionStorage.setItem(this.chave, json)
    }

}

// classe que cria um web component customizado para exibir os dados salvos
export class DataComponent extends HTMLElement {

    constructor() {
        // inicia o HTMLElement pai que estamos extendendo
        super()
        // cria o storage
        this.storage = new DataStorage()
        // atualiza os dados exibidos
        this.atualizar()
    }

    // atualiza os dados de acordo com o arquivo
    async atualizar() {
        await this.storage.sincronizar()
        const csv = this.storage.carregar().join("\n")
        this.innerText = csv
    }

    // adiciona um novo contato
    inserir({ nome, email, mensagem }) {
        const linha = [nome, email, mensagem].join("|")
        this.storage.inserir([linha])
        this.atualizar()
    }

}
