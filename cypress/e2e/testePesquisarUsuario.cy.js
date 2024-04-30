const pesquisarUsuario = require('../fixtures/pesquisaUsuario.json')
var id = null;
var nome = null;
var email = null;
describe('Pesquisar usuário', () => {
    //Um texto deve ser informado para que a pesquisa seja realizada.
    //Devem ser apresentados para o cliente todas as informações dos usuários que possuem em seu nome ou email o conteúdo pesquisado.
    before(() => {
        cy.cadastroDeUsuarioAPI(pesquisarUsuario).then((response) => {
            nome = response.body.name
            email = response.body.email
            id = response.body.id
        })
    })
    beforeEach(() => {
        cy.visit('')
    })
    it('pesquisar usuário por nome', () => {
        cy.pesquisarUsuario(nome)
        cy.contains(nome)
    })
    it('pesquisar usuário por e-mail', () => {
        cy.pesquisarUsuario(email)
        cy.contains(email)
    })
    after(() => {
        cy.deletarUsuario(id)
    })
})