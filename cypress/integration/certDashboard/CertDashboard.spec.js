context('Certificate Dash End to End Testing', () => {
  beforeEach(() => {
    // if (USE_REMOTE) {
    window.localStorage.setItem(
      'ecosystem_plugins',
      JSON.stringify({
        plugins: [
          {
            description: '',
            configUrl: 'https://plugin-localhost.intuitcdn.net:34212/config.json',
            hasLayers: true,
            isLocal: false,
            pluginId: 'ecosystem-roles-ux-plugin',
            value: 'ecosystem-roles-ux-plugin',
          },
        ],
      }),
    );
    cy.visit('https://partnerconnect-e2e.app.intuit.com/partner-cert-dashboard/dashboard');
    cy.get('#username').type('dash5mtest2');
    cy.get('#password').type('dash5mtest2');
    cy.get('.sso-submit').click();
    // }
  });

  it('Dashboard functionality', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(12000);
    cy.get('div#app div:nth-child(1) > a > div > p:nth-child(1)').click();
    cy.get('div#app div:nth-child(2) > a > div > p:nth-child(1)').click();
    cy.get('div#app div:nth-child(3) > a > div > p:nth-child(1)').click();
  });

  it('Search functionality', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(12000);
    cy.get('nav#cert-dash-navbar div:nth-child(2) span').click();
    cy.get('button#certificateID').click();
    cy.get('div#app a:nth-child(4)').click();
    cy.get('div#app input').type('Active');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
    cy.get('div#app div.input-loader > div > button').click();
    cy.get('div#app tr:nth-child(2) > td:nth-child(5) > div > span:nth-child(1)').click();
  });
});
