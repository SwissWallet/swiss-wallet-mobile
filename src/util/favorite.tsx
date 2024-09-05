import api from "../service/api";

type props = {
    id: number
}

async function favorite({id}:props):Promise<string>{

    let messageResponse:string;
    
    const response = await api.post(`favorites?idProduct=${id}`)
    .then((json) => {
        messageResponse = 'Produto favoritado'
    })
    .catch(err => {
        console.log(err)
        messageResponse = 'Produto não favoritado, algo deu errado';
    })
    .finally(() => {
        
        return messageResponse;

    });

    return '';
}

module.exports = favorite;