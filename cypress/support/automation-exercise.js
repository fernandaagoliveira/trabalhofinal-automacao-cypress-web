const password = 'Senha@2024'
const userName = 'Fernanda Aguilar'

const abrirPaginaLogin = () => {
    cy.visit('https://www.automationexercise.com/login')
    cy.contains('Login to your account').should('be.visible')
}

export const iniciarCadastro = (email) => {
    abrirPaginaLogin()
    cy.get('[data-qa="signup-name"]').type(userName)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()
}

export const registrarUsuario = (email) => {
    iniciarCadastro(email)
    cy.get('#id_gender1').check()
    cy.get('[data-qa="password"]').type(password)
    cy.get('[data-qa="days"]').select('15')
    cy.get('[data-qa="months"]').select('June')
    cy.get('[data-qa="years"]').select('1995')
    cy.get('#newsletter').check()
    cy.get('#optin').check()
    cy.get('[data-qa="first_name"]').type('Fernanda')
    cy.get('[data-qa="last_name"]').type('Aguilar')
    cy.get('[data-qa="company"]').type('TechCorp')
    cy.get('[data-qa="address"]').type('Rua da Bahia, 1148')
    cy.get('[data-qa="country"]').select('United States')
    cy.get('[data-qa="state"]').type('Minas Gerais')
    cy.get('[data-qa="city"]').type('Belo Horizonte')
    cy.get('[data-qa="zipcode"]').type('30160011')
    cy.get('[data-qa="mobile_number"]').type('31987654321')
    cy.get('[data-qa="create-account"]').click()
    cy.contains('Account Created!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
    cy.contains(`Logged in as ${userName}`).should('be.visible')
}

export const fazerLogin = (email, userPassword = password) => {
    abrirPaginaLogin()
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(userPassword)
    cy.get('[data-qa="login-button"]').click()
}

export const fazerLogout = () => {
    cy.get('a[href*="logout"]').click()
}

export const excluirConta = () => {
    cy.contains('Delete Account').click()
    cy.contains('Account Deleted!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
}

export const verificarDetalhesDoProduto = () => {
    cy.visit('https://www.automationexercise.com')
    cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible')
    cy.get('a[href*="products"]').first().click()
    cy.contains('All Products').should('be.visible')
    cy.get('.features_items .product-image-wrapper').should('be.visible')
    cy.get('.features_items a[href*="/product_details/"]').first().click()

    cy.url().should('include', '/product_details/')
    cy.get('.product-information h2').should('be.visible')
    cy.get('.product-information').should('contain.text', 'Category:')
        .and('contain.text', 'Rs.')
        .and('contain.text', 'Availability:')
        .and('contain.text', 'Condition:')
        .and('contain.text', 'Brand:')
}

export const buscarProdutos = (nomeProduto) => {
    cy.visit('https://www.automationexercise.com')
    cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible')
    cy.get('a[href*="products"]').first().click()
    cy.contains('All Products').should('be.visible')
    cy.get('#search_product').type(nomeProduto)
    cy.get('#submit_search').click()

    cy.contains('Searched Products').should('be.visible')
    cy.get('.features_items .product-image-wrapper')
        .should('have.length.greaterThan', 0)
        .each(($product) => {
            cy.wrap($product)
                .find('.productinfo p')
                .should('be.visible')
        })
}

export const assinarNewsletter = (email) => {
    cy.visit('https://www.automationexercise.com')
    cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible')
    cy.get('footer').scrollIntoView()
    cy.contains('Subscription').should('be.visible')
    cy.get('#susbscribe_email').type(email)
    cy.get('#subscribe').click()
    cy.get('#success-subscribe')
        .should('be.visible')
        .and('contain.text', 'You have been successfully subscribed!')
}

export const adicionarProdutosEIrParaCheckout = () => {
    cy.get('a[href*="products"]').first().click()
    cy.contains('All Products').should('be.visible')
    cy.get('.features_items .product-image-wrapper').should('be.visible')

    ;[1, 2].forEach((productId) => {
        cy.get(`a.add-to-cart[data-product-id="${productId}"]`)
            .first()
            .click({ force: true })
        cy.contains('Added!').should('be.visible')
        cy.contains('Continue Shopping').click()
    })

    cy.get('a[href="/view_cart"]').first().click()
    cy.contains('Shopping Cart').should('be.visible')
    cy.get('#cart_info tr[id^="product-"]').should('have.length', 2)
    cy.get('#product-1').should('be.visible')
    cy.get('#product-2').should('be.visible')
    cy.contains('Proceed To Checkout').click()
}

export const finalizarPedido = () => {
    cy.get('#address_delivery')
        .should('contain.text', userName)
        .and('contain.text', 'Rua da Bahia, 1148')
        .and('contain.text', 'Belo Horizonte')
        .and('contain.text', 'Minas Gerais')
        .and('contain.text', '30160011')
        .and('contain.text', '31987654321')
    cy.get('#address_invoice')
        .should('contain.text', userName)
        .and('contain.text', 'Rua da Bahia, 1148')
    cy.get('#cart_info tr[id^="product-"]').should('have.length', 2)

    cy.get('textarea[name="message"]').type('Pedido de teste automatizado')
    cy.contains('Place Order').click()
    cy.get('[data-qa="name-on-card"]').type(userName)
    cy.get('[data-qa="card-number"]').type('4111111111111111')
    cy.get('[data-qa="cvc"]').type('123')
    cy.get('[data-qa="expiry-month"]').type('12')
    cy.get('[data-qa="expiry-year"]').type('2030')
    cy.get('[data-qa="pay-button"]').click()
    cy.url().should('include', '/payment_done/')
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
}