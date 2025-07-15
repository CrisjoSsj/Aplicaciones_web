describe('Interfaz Web de Productos', () => {
    it('Carga la página y muestra productos', () => {
      cy.visit('http://localhost:3000');
  
      // Esperar que la lista tenga al menos un producto
      cy.get('#lista-productos li').should('have.length.greaterThan', 0);
    });
  
    it('Agrega un producto desde el formulario', () => {
      cy.visit('http://localhost:3000');
  
      // Escribir el nuevo nombre
      cy.get('#nombre').clear().type('Teclado Gamer');
  
      // Hacer clic en "Agregar"
      cy.contains('Agregar').click();
  
      // Verificar que el producto se haya agregado en la lista
      cy.contains('#lista-productos li', 'Teclado Gamer').should('exist');
    });
  });
  