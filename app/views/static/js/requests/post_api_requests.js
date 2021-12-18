export async function addMewCard(status_id){
    let url="/api/projects/new-card/"+status_id;
    let response = await fetch(url,{
        method:'POST'
    });
    let data = await response.json();
    return data;
}