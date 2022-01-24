export const getContact = async (page) => {
    
        let url = `https://randomuser.me/api/?page=${page}&results=10&seed=abc`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("api", data.results);

        const contacts = data.results.map(info => {
            return {
                id: info.id.value,
                name: info.name.first,
                lastname: info.name.last,
                email: info.email,
                phone: info.phone,
                img: info.picture?.large
            }
        })
        //console.log(contacts);
        return contacts;
};

