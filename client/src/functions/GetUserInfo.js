
export default async function GetUserInfo(userData) {
        try {
            const userInfo = await fetch(`${process.env.REACT_APP_SERVERURL}/info/${userData}`);
            const json = await userInfo.json();
            return json;
        } catch(err) {
            console.log(err);
        }
}