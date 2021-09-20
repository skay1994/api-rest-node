const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        version: "1.0.0",
        title: "My API",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
        User: {
            firstName: "Jhon",
            lastName: "Doe",
            email: "example@example.com",
            password: "password",
            document: "123456789",
            gender: "male",
            birthday: "2000-02-20",
            is_active: true,
            is_deleted: false,
        },
        Account: {
            user_id: "123456789",
            account_number: "123456",
            current_balance: "1234.40",
        },
        CreateUser: {
            firstName: "Jhon",
            lastName: "Doe",
            email: "example@example.com",
            password: "password",
            password_confirm: "password",
            document: "123456789",
            gender: "male",
            birthday: "2000-02-20",
        },
        UpdateUser: {
            firstName: "Jhon",
            lastName: "Doe",
            email: "example@example.com",
            password: "password",
            gender: "male",
            birthday: "2000-02-20",
        },
        AddUser: {
            $name: "Jhon Doe",
            $age: 29,
            about: ""
        }
    }
};

const outputFile = './swagger.json'
const endpointsFiles = ['./src/index']

swaggerAutogen(outputFile, endpointsFiles, doc)