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
    return createQuery;
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
    return getArticle;
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

    return editQuery;
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
    return articlesQuery;
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
    return dataQuery;
}

//user queries
export const addUserQuery=(name,email,password,isAdmin)=>{
    const dataQuery={
        query:`
                mutation addUsers($name:String!,$email:String!,$password:String!,$is_admin:Boolean,$avatar:Upload){
                    addUser(name:$name,email:$email,password:$password,is_admin:$is_admin,avatar:$avatar)
                }
            `,
        variables:{
            "name":name,
            "email":email,
            "password":password,
            "is_admin":isAdmin,
            "avatar":null,
        }
    };
    return dataQuery;
}
export const getUserQuery = (id) => {
    const userQuery = {
        query: `
                query user($id:Int!){
                    user(id:$id){
                        id,
                        name,
                        email,
                        is_admin,
                        avatar,
                        created_at,
                        updated_at
                    }
                }
            `,
        variables: {
            id
        }
    }
    return userQuery;
}
export const editUserQuery = (id,name,email,password,isAdmin) => {
    const dataQuery = {
        query: `
                mutation editUsers($id:Int!,$name:String!,$email:String!,$password:String,$is_admin:Boolean,$avatar:Upload){
                    editUser(id:$id,name:$name,email:$email,password:$password,is_admin:$is_admin,avatar:$avatar)
                }
            `,
        variables: {
            "id": id,
            "name": name,
            "email": email,
            "password": password,
            "is_admin": isAdmin,
            "avatar": null,
        }
    };
    return dataQuery;
}
export const allUsersQuery = () => {
    let dataQuery = {
        query: `
                query getAllUsers{
                    allUsers{
                        id,
                        name,
                        avatar,
                        email,
                    }
                }
            `,
        variables: {}
    };
    return dataQuery;
}
export const deleteUserQuery = (id) => {
    const dataQuery = {
        query: `
            mutation deleteUser($id:Int!){
                deleteUser(id:$id)
            }
        `,
        variables: {
            id
        }
    };
    return dataQuery;
}

//auth queries
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
