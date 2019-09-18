import React,{Component} from "react";
import Article from "./article";
import Swal from "sweetalert2";
import {allArticlesQuery, allUsersQuery, deleteArticleQuery, deleteUserQuery} from "../../utils/graphQL";
import http from "../../services/httpServices";

class Articles extends Component{
    state={
        articles:[]
    };
    async componentDidMount() {
        let {data}=await http.post("/graphql/auth",{
            data:allArticlesQuery()
        });
        data=data[0].data;

        if(data && data.allArticles)
            this.setState({articles: data.allArticles});
    }

    handleDelete = async(id) => {
        const {value}=await Swal.fire({
            title: "مطمئنید؟",
            text: "بعد از حذف مقاله امکان بازگشت وجود ندارد.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "آره، حذفش کن"
        });

        if (value) {
            let {data}=await http.post("/graphql/auth",{
                data:deleteArticleQuery(id)
            });
            data=data[0].data;
            if (data && data.deleteArticle){
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
        }
    };

    deleteFromState=(id)=>{
        const articles=this.state.articles.filter(article=>article.id!==id);
        this.setState({articles});
    };

    render() {
        const {articles}=this.state;
        if (articles && articles.length === 0)
            return <div className="alert alert-warning">هیچ مقاله ای یافت نشد</div>;
        return <div className="row">{articles.map(article=><Article key={article.id} article={article} onDelete={this.handleDelete}/>)}</div>;
    }
}

export default Articles;
