require('dotenv').config({ path: './.env' })
const mongoose = require('mongoose')
const productModel = require('./src/model/product.model')

const products = [
    {
        name: 'Chocolate Cake',
        description: 'Rich and moist chocolate cake with smooth frosting',
        price: 450,
        category: 'Cakes',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
        available: true,
        stock: 25
    },
    {
        name: 'Strawberry Cheesecake',
        description: 'Creamy cheesecake with fresh strawberry topping',
        price: 550,
        category: 'Cakes',
        image: 'https://images.unsplash.com/photo-1614707267537-b85faf00021b?w=400',
        available: true,
        stock: 20
    },
    {
        name: 'Glazed Donuts',
        description: 'Classic glazed donuts, perfect for breakfast',
        price: 199,
        category: 'Donuts',
        image: 'https://images.unsplash.com/photo-1585080872051-9bea9d7b2333?w=400',
        available: true,
        stock: 50
    },
    {
        name: 'Chocolate Donuts',
        description: 'Fluffy chocolate donuts with chocolate glaze',
        price: 229,
        category: 'Donuts',
        image: 'https://images.unsplash.com/photo-1614707267537-b85faf00021b?w=400',
        available: true,
        stock: 40
    },
    {
        name: 'Vanilla Cupcakes',
        description: 'Soft vanilla cupcakes with buttercream frosting',
        price: 149,
        category: 'Cupcakes',
        image: 'https://images.unsplash.com/photo-1597734866692-d4b9b6b01b9f?w=400',
        available: true,
        stock: 35
    },
    {
        name: 'Chocolate Cupcakes',
        description: 'Rich chocolate cupcakes with chocolate frosting',
        price: 169,
        category: 'Cupcakes',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
        available: true,
        stock: 30
    },
    {
        name: 'Croissants',
        description: 'Buttery croissants, flaky and delicious',
        price: 129,
        category: 'Pastries',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
        available: true,
        stock: 45
    },
    {
        name: 'Danish Pastry',
        description: 'Sweet Danish pastry with fruit filling',
        price: 179,
        category: 'Pastries',
        image: 'https://images.unsplash.com/photo-1535920527107-b7b992211a8c?w=400',
        available: true,
        stock: 25
    },
    {
        name: 'Fudge Brownies',
        description: 'Dense and chewy brownies with extra fudgy center',
        price: 249,
        category: 'Brownies',
        image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400',
        available: true,
        stock: 35
    },
    {
        name: 'Walnut Brownies',
        description: 'Rich brownies loaded with crunchy walnuts',
        price: 279,
        category: 'Brownies',
        image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400',
        available: true,
        stock: 30
    }
]

async function seedProducts() {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI)

        console.log('MongoDB connected')

        // Clear existing products
        await productModel.deleteMany({})
        console.log('Cleared existing products')

        // Insert new products
        const result = await productModel.insertMany(products)
        console.log(`✅ Successfully seeded ${result.length} products`)

        await mongoose.connection.close()
        console.log('Database connection closed')
    } catch (error) {
        console.error('❌ Error seeding products:', error.message)
        process.exit(1)
    }
}

seedProducts()
