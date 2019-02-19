export class URLModel {

    constructor(url, method) {
        this.url = url
        this.method = method
        this.form = new FormData()
        this.params = []
    }


    concatURL() {
        if (this.method === "GET") {
            let params = this.params.map((param) =>
                encodeURIComponent(param.key) + "=" + encodeURIComponent(param.value)
            ).join("&")
            this.url += `?${params}`
        }
    }


    append(key, value) {
        if (this.method === "GET") {
            this.params.push({
                key,
                value
            })
        } else if (this.method === "POST") {
            this.form.append(key, value)
        }

    }

    getURL() {
        return this.url
    }

}