import React from "react";
import "froala-editor/js/plugins/image.min";
import "froala-editor/js/plugins/image_manager.min";
import FroalaEditor from "froala-editor/js/froala_editor.pkgd.min";
import Joi from "joi-browser";
import Swal from "sweetalert2";
import Form from "./common/form";
import {editArticleQuery, getArticleQuery} from "../utils/graphQL";

class EditArticle extends Form{
    state={
        data:{
            id:"",
            title:"",
            body:"",
            image:"",
            user:{
                name:"",
                avatar:""
            },
            created_at:"",
            updated_at:"",
        },
        errors:{}
    };

    schema={
        title:Joi.string().max(255).required().label("عنوان مقاله"),
    };

    doSubmit=e=>{
        const {data}=this.state;
        const editQuery=editArticleQuery(data.id,data.title,document.querySelector("textarea#body").value);

        let headers={
            "Content-Type":"application/json"
        };
        let body=editQuery;
        const file=document.querySelector("#image").files[0];
        if (file){
            const fd=new FormData();
            const map={0:["variables.image"]};
            fd.append("operations",editQuery);
            fd.append("map",JSON.stringify(map));
            fd.append(0,file,file.name);
            body=fd;
            headers={};
        }
        const token=localStorage.getItem("rn_token");
        headers["Authorization"]="Bearer "+token;
        headers["Accept"]="application/json";

        fetch("/graphql/auth",{
            method:"post",
            headers,
            body
        }).then(res=>res.json())
            .then(({data})=>{
                if (data && data.editArticle){
                    Swal.fire({
                        type:"success",
                        title:"نتیجه",
                        text:"مقاله با موفقیت ویرایش شد."
                    });
                }else {
                    Swal.fire({
                        type:"error",
                        title:"خطا",
                        text:"خطایی رخ داد."
                    });
                }
            })
            .catch(e=>console.log(e));
    }

    componentDidMount() {

        const {match,history}=this.props;
        const id=match.params.id;

        const article=getArticleQuery(id);

        fetch("/graphql",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:article
        }).then(res=>res.json())
            .then(({data})=>{
                if (data && data.article){
                    const newData={...this.state.data};
                    newData.id=data.article.id;
                    newData.title=data.article.title;
                    newData.body=data.article.body;
                    newData.image=data.article.image;
                    newData.created_at=data.article.created_at;
                    newData.updated_at=data.article.updated_at;
                    newData.user=data.article.user;
                    document.querySelector("textarea#body").value=newData.body;
                    this.configEditor();
                    this.setState({data:newData});
                }else
                    history.replace("/admin");
            }).catch(e=>console.log(e))

    }

    configEditor=()=>{
        const editor=new FroalaEditor("textarea#body",{
            imageUploadURL:"/api/admin/article/upload",
            imageUploadMethod:"post",
            imageAllowedTypes: ['jpeg', 'jpg', 'png'],
            imageManagerPageSize: 20,
            imageManagerLoadURL: "/api/admin/article/images",
            imageManagerLoadMethod: "GET",
            imageManagerDeleteURL: "/api/admin/article/delete/image",
            imageManagerDeleteMethod: "DELETE",
            events: {
                'image.beforeUpload': function (images) {
                    console.log("Beofre Upload", images);
                },
                'image.uploaded': function (response) {
                    console.log('Uploaded', response);
                },
            }
        });
    }

    render() {
        const {created_at,updated_at,body,user,image}=this.state.data;
        return <div className="card">
            <div className="card-header">
                <h6>{`سازنده: ${user.name}`}</h6>
                <h6>{`تاریخ ایجاد: ${created_at}`}</h6>
                <h6>{`تاریخ آخرین بهروز رسانی: ${updated_at}`}</h6>
            </div>
            <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title","عنوان مقاله")}
                    {this.renderBeautyArea("body","متن مقاله",body)}
                    <img src={image} className="my-3" width="300px" alt=""/>
                    {this.renderFile("image","عکس مقاله")}
                    {this.renderButton("ثبت اطلاعات")}
                </form>
            </div>
        </div>
    }
}

export default EditArticle;
