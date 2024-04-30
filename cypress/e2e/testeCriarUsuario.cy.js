import { fakerPT_BR, faker } from '@faker-js/faker';
var id = null;
const cadastroDeUsuarioAPI = require('../fixtures/cadastroUsuarioAPI.json')
import criarUsuarioPage from '../pages/criarUsuarioPage';

describe('Cadastro de novo usuário', () => {
  before(() => {
    cy.cadastroDeUsuarioAPI(cadastroDeUsuarioAPI).then((response) => {
      id = response.body.id
    })
  })
  beforeEach(() => {
    cy.visit('users/novo')
  })
  it('criar novo usuário com sucesso', () => {
    cy.formularioUsuario(fakerPT_BR.person.fullName(), fakerPT_BR.internet.email())
    cy.get('[role=status]').should('have.text', 'Usuário salvo com sucesso!')
  })
  it('tentativa de criar usuário com email já em uso', () => {
    cy.formularioUsuario(cadastroDeUsuarioAPI.name, cadastroDeUsuarioAPI.email)
    cy.contains('Este e-mail já é utilizado por outro usuário.')
  })
  it('tentativa de criar usuário sem preencher o campo nome', () => {
    cy.get(criarUsuarioPage.CAMPO_EMAIL).type(fakerPT_BR.internet.email())
    cy.contains('O campo nome é obrigatório.')
  })
  it('tentativa de criar usuário sem preencher o campo email', () => {
    cy.get(criarUsuarioPage.CAMPO_NOME).type(fakerPT_BR.person.fullName())
    cy.get(criarUsuarioPage.BTN_SALVAR).click()
    cy.contains('O campo e-mail é obrigatório.')
  })
  it('tentativa de criar usuário com nome com 100 caracteres', () => {
    cy.formularioUsuario(faker.random.alpha(100), fakerPT_BR.internet.email())
    cy.get('[role=status]').should('have.text', 'Usuário salvo com sucesso!')
  })
  it('criar usuário com nome com 101 caracteres', () => {
    cy.formularioUsuario(faker.random.alpha(101), fakerPT_BR.internet.email())
    cy.contains('Informe no máximo 100 caracteres para o nome')
  })
  it('criar usuário com um e-mail com 60 caracteres', () => {
    cy.formularioUsuario(fakerPT_BR.person.fullName(), faker.random.alpha(51) + '@mail.com')
    cy.get('[role=status]').should('have.text', 'Usuário salvo com sucesso!')
  })
  it('tentativa de criar usuário com um e-mail com 61 caracteres', () => {
    cy.formularioUsuario(fakerPT_BR.person.fullName(), faker.random.alpha(52) + '@mail.com')
    cy.contains('Informe no máximo 60 caracteres para o e-mail')
  })
  it('tentativa de criar usuário com formato de email inválido com o domínio incompleto', () => {
    cy.formularioUsuario(fakerPT_BR.person.fullName(), 'teste@br')
    cy.contains('Formato de e-mail inválido')
  })
  it('tentativa de criar usuário com formato de email inválido sem o @', () => {
    cy.formularioUsuario(fakerPT_BR.person.fullName(), 'batman.com')
    cy.contains('Formato de e-mail inválido')
  })
  after(() => {
    cy.deletarUsuario(id)
  })
})