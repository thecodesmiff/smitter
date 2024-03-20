
export default async function GetLikes (id) {
    const likeCount  = await fetch(`${process.env.REACT_APP_SERVERURL}/likeCount/${id}`)
    const response = likeCount.json();
    return response;
}