const fs = require('fs')

class Contenedor {
    constructor (nombreArchivo){
        this.nombreArchivo = nombreArchivo
    }

    async getAll(){
        try {
            const file = await fs.promises.readFile(this.nombreArchivo)
            
            const fileConverted = JSON.parse(file)

            return fileConverted

        } catch (error) {

            const array =[]

            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(array))

            return array
        }
    }

    async save(objeto){
        try {
            const elementos = await this.getAll()

            const nuevoId = elementos.length === 0 ? 1: elementos[elementos.length - 1].id + 1

            objeto.id = nuevoId

            elementos.push(objeto)

            const elementoJson = JSON.stringify(elementos, null, 3)

            await fs.promises.writeFile(this.nombreArchivo, elementoJson)

            return nuevoId

        } catch(error) {

                console.log(error)

                return error
        }

        
        }

    async getById(id){
        try{
    
            const elementos = await this.getAll()
    
             const elementoEncontrado = elementos.find((elemento)=> elemento.id == id)
    
             return elementoEncontrado
    
        }catch (error){
    
            console.log(error)
    
        }
    }

    async deleteById(id){

        try{

            const elementos = await this.getAll()

            const nuevoArray = elementos.filter((elemento) => elemento.id != id)

            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(nuevoArray, null, 3))

            return 'Eliminado'

        }catch (error){
            console.log(error)

        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]))
        } catch (error) {
            console.log(error)
            
        }
    }


}

module.exports = Contenedor



