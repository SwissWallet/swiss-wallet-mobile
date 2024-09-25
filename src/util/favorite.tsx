import api from "../service/api";

type props = {
    id: number
}

async function favorite({id}:props):Promise<string>{

    let messageResponse:string = '';
    
    const response = await api.post(`favorites?idProduct=${id}`)
    .then((json) => {
        messageResponse = 'Produto favoritado'
    })
    .catch(err => {
        console.log(err.response.status);
        if (err.response.status == 409) messageResponse = 'O Produto selecionado já está favoritado';
        else messageResponse = 'Produto não favoritado, algo deu errado';
    })
    .finally(() => {
        
        return messageResponse;

    });

    return messageResponse;
}

module.exports = favorite;