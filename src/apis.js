import axios from 'axios'

const wordSearchApi = axios.create({
    baseURL: "https://api.datamuse.com/words"
})

const wordSearch = {
    ...wordSearchApi,
    async getSyn(query) {
        const resp = await wordSearchApi.get("?md=sf&ml=" + query)
            .catch(error => {
                throw new Error(`API ${error}`);
            });
        return resp.data;
    }
};

const tldListApi = axios.create({
    baseURL: "https://data.iana.org"
})

const tldList = {
    ...tldListApi,
    async getList() {
        const resp = await tldListApi.get("/TLD/tlds-alpha-by-domain.txt")
            .catch(error => {
                throw new Error(`API ${error}`);
            });
        return resp.data;
    }
}

export default {
    wordSearch,
    tldList
}

