export default async function getUserSmeets (user) {
    try{
        const response =  await fetch(`${process.env.REACT_APP_SERVERURL}/smeets/${user}`);
        const json = await response.json();
        return json;
    } catch(err) {
        console.error(err)
    }
  }