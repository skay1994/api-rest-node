import server from './../config/init'

test("GET /api/users", async () => {
    await server.get('/api/users').expect(200)
})