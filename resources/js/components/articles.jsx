import React,{Component} from "react";
import Article from "./article";
import Swal from "sweetalert2";
import {allArticlesQuery, deleteArticleQuery} from "../utils/graphQL";

class Articles extends Component{
    state={
        articles:[]
    };
    componentDidMount() {
        const articlesQuery=allArticlesQuery();

        fetch("/graphql",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:articlesQuery
        }).then(res=>res.json())
            .then(({data})=>this.setState({articles:data.allArticles}))
            .catch(e=>console.log(e));
    }

    handleDelete = id => {
        const dataQuery = deleteArticleQuery(id);

        //ask to delete or not
        Swal.fire({
            title: "مطمئنید؟",
            text: "بعد از حذف مقاله امکان بازگشت وجود ندارد.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "آره، حذفش کن"
        }).then(result => {
            if (result.value) {
                const token=localStorage.getItem("rn_token");
                fetch("/graphql/auth", {
                    method: "post",
                    headers: {
                        "Authorization":"Bearer "+token,
                        "Accept":"application/json",
                        "Content-Type": "application/json"
                    },
                    body: dataQuery
                })
                    .then(res => res.json())
                    .then(({ data }) => {
                        if (data.deleteArticle) {
                            this.deleteFromState(id);
                            Swal.fire({
                                type: "success",
                                title: "نتیجه",
                                text: "مقاله با موفقیت حذف شد"
                            });
                        } else {
                            Swal.fire({
                                type: "success",
                                title: "خطا",
                                text: "خطایی رخ داد"
                            });
                        }
                    })
                    .catch(e => console.log(e));
            }
        });
    };

    deleteFromState=(id)=>{
        const articles=this.state.articles.filter(article=>article.id!==id);
        this.setState({articles});
    };

    render() {
        const {articles}=this.state;
        return <div className="row">{articles.map(article=><Article key={article.id} article={article} onDelete={this.handleDelete}/>)}</div>;
    }
}

export default Articles;
