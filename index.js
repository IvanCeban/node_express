const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const PORT = process.env.PORT || 3000
const app = express()
const hbs = exphbs.create({ // настройка конфигурации для будущего шаблонизатора
    defaultLayout: 'main', // название дефолтного лэйаута
    extname: 'hbs', // меняем дефолтное расширение
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine) // регистрируем движок по ключу hbs
app.set('view engine', 'hbs') // используем движок по имени hbs
app.set('views', 'views') // регистрируем папку где хранятся страницы

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))// теперь express знает где искать статические данные
app.use(todoRoutes) // регистрируем пути


async function start() {
    try {
        await mongoose.connect('mongodb+srv://Ivan:QAwsedrf@cluster0.cv4sq.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log('server has been started')
        })
    } catch (e) {
        console.log(e)
    }
}
start().then(r => console.log(r))
