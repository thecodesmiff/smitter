export default async function getAllSmeets(){
    try{
        const response =  await fetch(`${process.env.REACT_APP_SERVERURL}/smeets`);
        const json = await response.json();
        return json;
    } catch(err) {
        console.error(err)
    }
}