require('dotenv').config()
const app = require('../server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert

const User = require('../models/user.js')
const Message = require('../models/message.js')

chai.config.includeStack = true

const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
  done()
})

const SAMPLE_OBJECT_ID1 = '123456789123' //12 bit string
const SAMPLE_OBJECT_ID2 = '123456789012'

describe('Message API endpoints', () => {
    beforeEach((done) => {
        // TODO: add any beforeEach code here
        const sampleMessage = new Message({
            message: 'Hello World!',
            _id: SAMPLE_OBJECT_ID2
        })
        sampleMessage.save()
        .then(() => {
            done()
        })
        // const sampleMessage = new Message({
        //     title: 'some title',
        //     body: 'some more text',
        //     auther: SAMPLE_OBJECT_ID1,
        //     _id: SAMPLE_OBJECT_ID2
        // })
        // sampleUser.save()
        // then.(() => {
        //     done()
        // })
        // Promise.all([sampleUser.save(), sampleMessage.same()])
        // .then(() => {
        //     done()
        // })
    })

    afterEach((done) => {
        // TODO: add any afterEach code here
        deletion1 = User.deleteMany({ username: ['myuser'] })
        deletion2 = Message.deleteMany({ _id: SAMPLE_OBJECT_ID2 })
        Promise.all([deletion1, deletion2]).then(() => {
            done()
        })
        // .then(() => {
        //     done()
        // })
    })

    it('should load all messages', (done) => {
        // TODO: Complete this
        chai.request(app)
        .get('/message')
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            expect(res.body.message).to.be,an("array")
            done()
        })
        .then(() => {
            done()
        // }
    })
})

    it('should get one specific message', (done) => {
        // TODO: Complete this
        chai.request(app)
        .get(`/message/${SAMPLE_OBJECT_ID1}`)
        .end((err, res) => {
            if (err) {done(err)}
            expect(res).to.have.status(200)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property('title')
            done()
        })
    })

    it('should post a new message', (done) => {
        // TODO: Complete this
        chai.request(app)
        .post('/message')
        .send({title: 'The Game', body: 'test', auther: 'me'})
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body.message).to.be.an('string')
            expect(res.body.message).to.have.property('body')

            Message.findOne({title: 'The Game'}).then(message => {
                expect(message).to.be.an('object')
                done()
            })
        })

        done()
    })

    it('should update a message', (done) => {
        // TODO: Complete this
        chai.request(app)
        .put(`/users/${SAMPLE_OBJECT_ID1}`)
        .send({title: 'The Game'})
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body.message).to.be.an('object')
            expect(res.body.message).to.have.property('body')

            Message.findOne({title: 'The Game'}).then(message => {
                expect(message).tp.be.an('object')
                done()
            })
        })
    })

    it('should delete a message', (done) => {
        // TODO: Complete this
        chai.request(app)
        .delete(`/message/${SAMPLE_OBJECT_ID1}`)
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body.message).to.equal('Successfully deleted.')
            expect(res.body._id).to.equal(SAMPLE_OBJECT_ID1)

            Message.findOne({title: 'The Game'}).then(user => {
                expect(message).to.equal(null)
                done()
            })
        })
        done()
    })
})
