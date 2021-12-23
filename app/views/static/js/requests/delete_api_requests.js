export async function deleteCardById(card_id){
    let url="/api/projects/card/"+card_id;
    let response = await fetch(url,{
        method:'DELETE'
    });
}