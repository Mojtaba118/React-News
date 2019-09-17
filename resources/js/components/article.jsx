import React from "react";
import {Link} from "react-router-dom";

const Article=({article,onDelete})=>{
    return <div className="col-12 col-sm-6 col-md-4 col-lg-3">
       <div className="article">
           <img src={article.image} alt="" className="article-img"/>
           <div className="article-body">
               <p className="article-title">{article.title}</p>
               <div className="article-operations">
                   <button onClick={()=>onDelete(article.id)} className="btn btn-danger btn-sm">حذف</button>
                   <Link to={`/admin/article/edit/${article.id}`} className="btn btn-warning btn-sm">ویرایش</Link>
               </div>
           </div>
       </div>
    </div>;
};

export default Article;
