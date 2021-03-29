const {Router} = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async (req, res) => {
    const todos = await Todo.find({}) // получем все todos что есть
    // для того чтобы что-то пользователю вернуть, обращаемся к объекту res который вернул express
    res.render('index', { // метод render позволяет рендерить некоторые страницы
        title: 'Todos list',
        isIndex: true,
        todos // передается на страницу как параметр
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    })
})

router.post('/create', async (req, res) => {
    const todo = new Todo({
        title: req.body.title // title соответствует name указанному в input
    })

    await todo.save() //сохраняем созданный 'todo'
    res.redirect('/') // перенаправляем на домашнюю страницу чтобы сразу увидеть список
})

router.post('/complete', async(req, res) => {
    const todo = await Todo.findById(req.body.id)
    todo.completed = !!req.body.completed // преобразуем в boolean поскольку параметр прилетит скорее всего в виде строки

    await todo.save()
    res.redirect('/')
})
module.exports = router


