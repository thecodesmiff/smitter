
export default async function GetSmeet(smeetId) {
    try {
        const getSmeet = await fetch(`${process.env.REACT_APP_SERVERURL}/getsmeet/${smeetId}`);
        const response = await getSmeet.json();
        return response;
    } catch(err) {
        console.error(err)
    }
}