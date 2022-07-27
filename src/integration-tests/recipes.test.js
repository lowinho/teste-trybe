const { expect } = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../api/app');

chai.use(chaiHttp);

describe('/POST recipes: failed name', () => {
  it('deve gravar uma nova receita com usuário Admin autenticado', (done) => {
      const adminUser = {
        email: 'root@email.com',
        password: 'admin',
      }
      const newRecipe = {
        ingredients: "Frango",
        preparation: "10 min no forno"
      }
    chai.request(app)
        .post('/login/')
        .send(adminUser)
        .end((err, res) => {
            return chai.request(app)
            .post('/recipes')
            .send(newRecipe)
            .set({ "Authorization": res.body.token })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.equals('Invalid entries. Try again.');
                done(err);
              });
          })
  });
})

describe('/POST recipes: failed ingredients', () => {
  it('deve gravar uma nova receita com usuário Admin autenticado', (done) => {
      const adminUser = {
        email: 'root@email.com',
        password: 'admin',
      }
      const newRecipe = {
        name: "Frango frito",
        preparation: "10 min no forno"
      }
    chai.request(app)
        .post('/login/')
        .send(adminUser)
        .end((err, res) => {
            return chai.request(app)
            .post('/recipes')
            .send(newRecipe)
            .set({ "Authorization": res.body.token })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.equals('Invalid entries. Try again.');
                done(err);
              });
          })
  });
})

describe('/POST recipes: failed preparation', () => {
  it('deve gravar uma nova receita com usuário Admin autenticado', (done) => {
      const adminUser = {
        email: 'root@email.com',
        password: 'admin',
      }
      const newRecipe = {
        name: "Frango frito",
        ingredients: "Frango",
      }
    chai.request(app)
        .post('/login/')
        .send(adminUser)
        .end((err, res) => {
            return chai.request(app)
            .post('/recipes')
            .send(newRecipe)
            .set({ "Authorization": res.body.token })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.equals('Invalid entries. Try again.');
                done(err);
              });
          })
  });
})
describe('/POST recipes', () => {
  it('deve gravar uma nova receita com usuário Admin autenticado', (done) => {
      const adminUser = {
        email: 'root@email.com',
        password: 'admin',
      }
      const newRecipe = {
        name: "Frango frito",
        ingredients: "Frango",
        preparation: "10 min no forno"
      }
    chai.request(app)
        .post('/login/')
        .send(adminUser)
        .end((err, res) => {
            return chai.request(app)
            .post('/recipes')
            .send(newRecipe)
            .set({ "Authorization": res.body.token })
            .end((err, res) => {
                expect(res).to.have.status(201);  
                expect(res.body.recipe).to.have.property('_id');
                expect(res.body.recipe).to.have.property('name');
                expect(res.body.recipe).to.have.property('ingredients');
                expect(res.body.recipe).to.have.property('preparation');
                done(err);
              });
          })
  });
})

describe('/PUT recipes', () => {
  it('deve editar uma receita com usuário Admin autenticado', (done) => {
      const adminUser = {
        email: 'root@email.com',
        password: 'admin',
      }
      const newRecipe = {
        name: "Frango frito",
        ingredients: "Frango",
        preparation: "10 min no forno"
      }
      const editRecipe = {
        name: "Frango frito editado",
        ingredients: "Frango",
        preparation: "10 min no forno"
      }
    chai.request(app)
        .post('/login/')
        .send(adminUser)
        .end((err, res) => {
          const token = res.body.token;
            return chai.request(app)
            .post('/recipes')
            .send(newRecipe)
            .set({ "Authorization": token })
            .end((err, res) => {
              const { _id: idRecipe } = res.body.recipe;
              return chai.request(app)
              .put(`/recipes/${idRecipe}`)
              .send(editRecipe)
              .set({ "Authorization": token })
              .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body).to.have.property('_id');
                  expect(res.body).to.have.property('name');
                  expect(res.body).to.have.property('ingredients');
                  expect(res.body).to.have.property('preparation');
                  expect(res.body).to.have.property('userId');
                  done(err);
                });
              });
          })
  });
})

describe('/POST recipes/image', () => {
  it('deve salvar uma foto em uma receita existente', (done) => {
      const adminUser = {
        email: 'root@email.com',
        password: 'admin',
      }
      const newRecipe = {
        name: "Frango cozido",
        ingredients: "Frango",
        preparation: "10 min no forno"
      }
    chai.request(app)
        .post('/login/')
        .send(adminUser)
        .end((err, res) => {
          const token = res.body.token;
            return chai.request(app)
            .post('/recipes')
            .send(newRecipe)
            .set({ "Authorization": token })
            .end((err, res) => {
              const { _id: idRecipe } = res.body.recipe;
              return chai.request(app)
              .put(`/recipes/${idRecipe}/image`)
              .set({ "Authorization": token })
              .attach('image', 'src/uploads/ratinho.jpg')
              .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body).to.have.property('_id');
                  expect(res.body).to.have.property('name');
                  expect(res.body).to.have.property('ingredients');
                  expect(res.body).to.have.property('preparation');
                  expect(res.body).to.have.property('userId');
                  expect(res.body).to.have.property('image');
                  done(err);
                });
              });
          })
  });
})

describe('/GET recipes: recipe not foundd', () => {
  it('deve trazer uma receita específica', (done) => {
      const adminUser = {
        email: 'root@email.com',
        password: 'admin',
      }
      const newRecipe = {
        name: "Frango assado",
        ingredients: "Frango",
        preparation: "10 min no forno"
      }
    chai.request(app)
        .post('/login/')
        .send(adminUser)
        .end((err, res) => {
          const token = res.body.token;
            return chai.request(app)
            .post('/recipes')
            .send(newRecipe)
            .set({ "Authorization": token })
            .end((err, res) => {
              return chai.request(app)
              .get('/recipes/123')
              .set({ "Authorization": token })
              .end((err, res) => {
                  expect(res).to.have.status(404);
                  expect(res.body.message).to.be.equals('recipe not found');
                  done(err);
                });
              });
          })
  });
})

describe('/GET recipes', () => {
  it('deve trazer uma receita específica', (done) => {
      const adminUser = {
        email: 'root@email.com',
        password: 'admin',
      }
      const newRecipe = {
        name: "Frango assado",
        ingredients: "Frango",
        preparation: "10 min no forno"
      }
    chai.request(app)
        .post('/login/')
        .send(adminUser)
        .end((err, res) => {
          const token = res.body.token;
            return chai.request(app)
            .post('/recipes')
            .send(newRecipe)
            .set({ "Authorization": token })
            .end((err, res) => {
              const { _id: idRecipe } = res.body.recipe;
              return chai.request(app)
              .get(`/recipes/${idRecipe}`)
              .set({ "Authorization": token })
              .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body).to.have.property('_id');
                  expect(res.body).to.have.property('name');
                  expect(res.body).to.have.property('ingredients');
                  expect(res.body).to.have.property('preparation');
                  expect(res.body).to.have.property('userId');
                  done(err);
                });
              });
          })
  });
})

describe('/GET recipes', () => {
  it('deve exibir todas as receitas cadastradas', (done) => {
    chai.request(app)
        .get('/recipes')
        .end((err, res) => {
          expect(res).to.have.status(200); 
          done(err);
        });
  });
})

describe('/DELETE recipes', () => {
  it('deve excluir uma receita específica', (done) => {
      const adminUser = {
        email: 'root@email.com',
        password: 'admin',
      }
      const newRecipe = {
        name: "Frango frito",
        ingredients: "Frango",
        preparation: "10 min no forno"
      }
    chai.request(app)
        .post('/login/')
        .send(adminUser)
        .end((err, res) => {
          const token = res.body.token;
            return chai.request(app)
            .post('/recipes')
            .send(newRecipe)
            .set({ "Authorization": token })
            .end((err, res) => {
              const { _id: idRecipe } = res.body.recipe;
              return chai.request(app)
              .delete(`/recipes/${idRecipe}`)
              .set({ "Authorization": token })
              .end((err, res) => {
                  expect(res).to.have.status(204);
                  done(err);
                });
              });
          })
  });
})