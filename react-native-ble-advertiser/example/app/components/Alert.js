export const submitAlert = (uuids) => {
    this.setState({
        fromFetch: false,
        loading: true,

    })
    axios.get("https://localhost:8080/api/v1")
        .then(response => {
            console.log('getting data from axios', response.data);
            setTimeout(() => {
                this.setState({
                    loading: false,
                    axiosData: response.data
                })
            }, 2000)
        })
        .catch(error => {
            console.log(error);
        });
}