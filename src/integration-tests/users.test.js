const { expect } = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../api/app');
let should = chai.should();

chai.use(chaiHttp);

describe('/POST users: failed name', () => {
  it('deve trazer erro no campo name ao cadastrar novo usuário', (done) => {
      let user = {
        email : "lowinho2@gmail.com", 
        password : "12345678",
        role: "user"
      }
    chai.request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.be.equals('Invalid entries. Try again.');
          done(err);
        });
  });
})

describe('/POST users: failed email', () => {
  it('deve trazer erro no campo email ao cadastrar novo usuário', (done) => {
      let user = {
        name : "César Lowe",  
        password : "12345678",
        role: "user"
      }
    chai.request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.be.equals('Invalid entries. Try again.');
          done(err);
        });
  });
})

describe('/POST users: failed password', () => {
  it('deve trazer erro no campo senha ao cadastrar novo usuário', (done) => {
      let user = {
        name : "César Lowe", 
        email : "lowinho2@gmail.com", 
        role: "user"
      }
    chai.request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.be.equals('Invalid entries. Try again.');
          done(err);
        });
  });
})

describe('/POST users', () => {
  it('deve gravar um novo usuário User no banco de dados', (done) => {
      let user = {
        name : "César Lowe", 
        email : "lowinho2@gmail.com", 
        password : "12345678",
        role: "user"
      }
    chai.request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.user).to.have.property('_id');
          expect(res.body.user).to.have.property('name');
          expect(res.body.user).to.have.property('email');
          expect(res.body.user).to.have.property('role');
          done(err);
        });
  });
})

describe('/POST users/admin: failed authenticated', () => {
  it('deve gravar um novo usuário Admin no banco de dados', (done) => {
      const adminUser = {
        email: 'lowinho2@gmail.com',
        password: '12345678',
      }
      const newUser = {
        name : "César Lowe", 
        email : "lowinho3@gmail.com", 
        password : "12345678",
        role: "admin"
      }
    chai.request(app)
        .post('/login/')
        .send(adminUser)
        .end((err, res) => {
            return chai.request(app)
            .post('/users/admin')
            .send(newUser)
            .set({ "Authorization": res.body.token })
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body.message).to.be.equals('Only admins can register new admins');
                done(err);
              });
          })
  });
})

describe('/POST users/admin', () => {
  it('deve gravar um novo usuário Admin no banco de dados', (done) => {
      const adminUser = {
        email: 'root@email.com',
        password: 'admin',
      }
      const newUser = {
        name : "César Lowe", 
        email : "lowinho3@gmail.com", 
        password : "12345678",
        role: "admin"
      }
    chai.request(app)
        .post('/login/')
        .send(adminUser)
        .end((err, res) => {
            return chai.request(app)
            .post('/users/admin')
            .send(newUser)
            .set({ "Authorization": res.body.token })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.user).to.have.property('_id');
                expect(res.body.user).to.have.property('name');
                expect(res.body.user).to.have.property('email');
                expect(res.body.user).to.have.property('role');
                done(err);
              });
          })
  });
})

describe('/POST login: failed email', () => {
    it('deve trazer erro no e-mail ao fazer login', (done) => {
        let user = {
          email : "lowinho2@gmail.co", 
          password : "12345678",
        }
      chai.request(app)
          .post('/login/')
          .send(user)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body.message).to.be.equals('Incorrect username or password');
            done(err);
          });
    });
})

describe('/POST login: failed password', () => {
    it('deve trazer erro na senha ao fazer login', (done) => {
        let user = {
          email : "lowinho2@gmail.com", 
          password : "1234567",
        }
      chai.request(app)
          .post('/login/')
          .send(user)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body.message).to.be.equals('Incorrect username or password');
            done(err);
          });
    });
})

describe('/POST login: failed email and password', () => {
  it('deve trazer erro ao não enviar email e senha', (done) => {
      let user = {
        email : "", 
        password : "",
      }
    chai.request(app)
        .post('/login/')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.be.equals('All fields must be filled');
          done(err);
        });
  });
})

describe('/POST login', () => {
    it('deve fazer login com sucesso', (done) => {
        let user = {
          email : "lowinho2@gmail.com", 
          password : "12345678",
        }
      chai.request(app)
          .post('/login/')
          .send(user)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
            done(err);
          });
    });
})

