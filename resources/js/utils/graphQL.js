//article queries
export const addArticleQuery = (title, body) => {
    const createQuery = {
        query: `
                mutation addArticle($title:String!,$body:String!,$image:Upload!){
                    addArticle(title:$title,body:$body,image:$image)
                }
            `,
        variables: {
            "title": title,
            "body": body,
            "image": null
        }
    };
    return JSON.stringify(createQuery);
};
export const getArticleQuery = (id) => {
    const getArticle = {
        query: `
                query getArticle($id:Int!){
                    article(id:$id){
                        id,
                        title,
                        body,
                        image,
                        user{
                            name
                            avatar
                        },
                        created_at,
                        updated_at
                    }
                }
            `,
        variables: {
            id
        }
    };
    return JSON.stringify(getArticle);
};
export const editArticleQuery = (id, title, body) => {
    const editQuery = {
        query: `mutation editArticle($id:Int!,$title:String!,$body:String!,$image:Upload){
            editArticle(id:$id,title:$title,body:$body,image:$image)
        }`,
        variables: {
            id,
            title,
            body,
            "image": null
        }
    };

    return JSON.stringify(editQuery);
};
export const allArticlesQuery = () => {
    const articlesQuery = {
        query: `query getAllArticles{
                allArticles{
                    id,
                    title,
                    body,
                    image
                }
            }`,
        variables: {}
    };
    return JSON.stringify(articlesQuery);
}
export const deleteArticleQuery = id => {
    const dataQuery = {
        query: `
            mutation deleteArticle($id:Int!){
                deleteArticle(id:$id)
            }
        `,
        variables: {
            id
        }
    };
    return JSON.stringify(dataQuery);
}

//user queries



//auth queries
export const registerQuery = (name, email, password) => {
    const registerQuery = {
        query: `
            mutation register($name:String,$email:String,$password:String){
                register(name:$name,email:$email,password:$password)
            }
        `,
        variables: {
            name,
            email,
            password
        }
    };
    return registerQuery;
};
export const loginQuery = (email, password) => {
    const loginQuery = {
        query: `
            mutation login($email:String,$password:String){
                login(email:$email,password:$password){
                    token
                }
            }
        `,
        variables: {
            email,
            password
        }
    };
    return loginQuery;
};
