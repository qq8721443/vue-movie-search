export const request = async (url) => {
    try {
        const res = await fetch(`/.netlify/functions/request${url}`)
        if (!res.ok){
            throw new Error('API 호출 중 문제가 발생했습니다.');
        }
        return await res.json();
    } catch(e) {
        console.log(e);
    }
}
