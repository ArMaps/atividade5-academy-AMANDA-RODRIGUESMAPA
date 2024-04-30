const listaDetalhada = require('../fixtures/listaDetalhada.json')
var users = 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users'
import usuarioPage from "../pages/usuarioPage"
var id = null
var nome = null
describe('Listar usuários cadastrados', () => {
  before(() => {
    cy.cadastroDeUsuarioAPI(listaDetalhada).then((response) => {
      id = response.body.id
      nome = response.body.name
    })
  })
  beforeEach(() => {
    cy.visit('')
  })
  it('listar todos os usuários cadastrados', () => {
    cy.listarUsuarios()
    cy.get('#paginacaoProximo').should('have.attr', 'disabled')
  })
  it('cadastrar usuário caso não existam usuários cadastrados - mockado', () => {
    cy.intercept('GET', users, []).as('semUsuarioCadastrado')
    cy.contains('Cadastre um novo usuário')
  })
  it('verificar informações detalhadas do usuário', () => {
    cy.pesquisarUsuario(nome)
    cy.get(usuarioPage.CAMPO_VER_DETALHES).click()
    cy.get(usuarioPage.CAMPO_DETALHES_ID).should("exist")
    cy.get(usuarioPage.CAMPO_DETALHES_NOME).should("exist")
    cy.get(usuarioPage.CAMPO_DETALHES_EMAIL).should("exist")
  })
  after(() => {
    cy.deletarUsuario(id)
  })
})