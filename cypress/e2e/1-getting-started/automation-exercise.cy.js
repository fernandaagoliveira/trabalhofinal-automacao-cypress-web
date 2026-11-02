import { faker } from '@faker-js/faker'
import {
    registrarUsuario,
    fazerLogin,
    fazerLogout,
    excluirConta,
    verificarDetalhesDoProduto,
    buscarProdutos,
    assinarNewsletter,
    adicionarProdutosEIrParaCheckout,
    finalizarPedido,
    iniciarCadastro
} from '../../support/automation-exercise'

describe('Automation Exercise', () => {

    it('Test Case 1: Cadastrar novo usuário', () => {
        const email = `automation-${faker.string.uuid()}@mail.com`
        registrarUsuario(email)
        excluirConta()
    })

    it('Test Case 2: Login com credenciais válidas', () => {
        const email = `automation-${faker.string.uuid()}@mail.com`
        registrarUsuario(email)
        fazerLogout()
        fazerLogin(email)
        excluirConta()
    })

    it('Test Case 3: Login com credenciais inválidas', () => {
        fazerLogin('invalido@mail.com', 'senhaerrada')
        cy.contains('Your email or password is incorrect!').should('be.visible')
    })

    it('Test Case 4: Fazer logout', () => {
        const email = `automation-${faker.string.uuid()}@mail.com`
        registrarUsuario(email)
        fazerLogout()
        cy.url().should('include', '/login')
        fazerLogin(email)
        excluirConta()
    })

    it('Test Case 5: Cadastro com email já existente', () => {
        const email = `automation-${faker.string.uuid()}@mail.com`
        registrarUsuario(email)
        fazerLogout()
        iniciarCadastro(email)
        cy.contains('Email Address already exist!').should('be.visible')
        fazerLogin(email)
        excluirConta()
    })

    it('Test Case 8: Verificar lista e detalhe de produto', () => {
        verificarDetalhesDoProduto()
    })

    it('Test Case 9: Buscar produto', () => {
        buscarProdutos('Blue Top')
    })

    it('Test Case 10: Verificar assinatura no rodapé', () => {
        const email = `assinante-${faker.string.uuid()}@mail.com`
        assinarNewsletter(email)
    })

    it('Test Case 15: Pedido com cadastro durante o checkout', () => {
        const email = `automation-${faker.string.uuid()}@mail.com`
        cy.visit('https://www.automationexercise.com')
        adicionarProdutosEIrParaCheckout()
        cy.contains('Register / Login').click()
        registrarUsuario(email)
        cy.visit('https://www.automationexercise.com/view_cart')
        cy.contains('Proceed To Checkout').click()
        finalizarPedido()
        excluirConta()
    })

    it('Test Case 16: Pedido com login antes do checkout', () => {
        const email = `automation-${faker.string.uuid()}@mail.com`
        registrarUsuario(email)
        cy.visit('https://www.automationexercise.com')
        adicionarProdutosEIrParaCheckout()
        finalizarPedido()
        excluirConta()
    })
})