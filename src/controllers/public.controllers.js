// Rutas Productos
    const Product = require('../models/product.model')

    //GET ALL PRODUCTS
    const getAllProducts = async (req, res) => {         
        try {
            const productos = await Product.find()
            //console.log(productos)
            return res.status(200).json({
                ok: true,
                productos
            })
        } catch (error) {
            return res.status(404).json({
                ok: false,
                msg: 'Error al traer los productos'
            })
        }

        /*Vers inicial
            res.json({
                msg: 'Getting all products.'
            });*/
    }

    //GET PRODUCT by id
    const getProductById = async (req, res)=>{
        const { id } = req.params;
        const producto = await Product.findOne({ _id: id })
        //console.log(producto)

        res.status(200).json({
            msg: 'Getting product by id'
        })
        
        /*Vers inicial
            res.json({
                msg: 'Getting product by id.'
            });*/
    } 

    //GET PRODUCT by category
    const getProductByCategory = (req, res)=>{    //categoría = variable
        res.json({
            msg: 'Getting product by category.'
        });
    }

    //CREATE PRODUCT
    const createProduct = async (req, res)=>{  
        //Para crear un objeto-nuevoProducto (pero debería de ser dinámico a través de un form)
        const body = req.body // Desestructuraciones -> const { body } = req

        //TODO: comprobar que el producto existe, si existe retorna un 404 
        const producto = new Product(body)
        try {
            const SavedProduct = await producto.save()
            return res.status(201).json({
                ok: true,
                SavedProduct
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: 'Pongase en contacto con el administrador'
            })
        }

        /* Vers inicial:
            res.status(201).json({
                msg: 'Creating product.'
            });*/
    } 

    //UPDATE PRODUCT by id
    const updateProductById = (req, res)=>{         
        res.json({
            msg: 'Updating product by id.'
        });
    } 

    //DELETE PRODUCT by id
    const deleteProductById = (req, res)=>{         
        res.json({
            msg: 'Deleting product by id.'
        });
    }


//EXPORTACIÓN DE FUNCIONES (para usarlas dentro de otro archivo)
module.exports = {
    getAllProducts,
    getProductById,
    getProductByCategory,
    createProduct,
    updateProductById,
    deleteProductById
}