import React from "react";
import "froala-editor/js/plugins/image.min";
import "froala-editor/js/plugins/image_manager.min";
import FroalaEditor from "froala-editor/js/froala_editor.pkgd.min";
import Joi from "joi-browser";
import Swal from "sweetalert2";
import Form from "../common/form";
import {addArticleQuery} from "../../utils/graphQL";

class AddArticle extends Form{
    state={
        data:{
            title:"",
        },
        errors:{}
    };

    schema={
        title:Joi.string().max(255).required().label("عنوان مقاله"),
    };


    doSubmit=e=>{
        const errors={...this.state.errors};
        const file=document.querySelector("#image").files[0];
        if (!file){
            errors["image"]="عکس مقاله الزامی است.";
            this.setState({errors});
            return;
        }else{
            delete errors["image"];
            this.setState({errors})
        };

        const {data}=this.state;
        const createQuery=addArticleQuery(data.title,document.querySelector("textarea#body").value);


        const map={0:["variables.image"]};
        const fd=new FormData();
        fd.append("operations",createQuery);
        fd.append("map",JSON.stringify(map));
        fd.append(0,file,file.name);

        const token=localStorage.getItem("rn_token");
        fetch("/graphql/auth",{
            method:"post",
            headers:{
                "Accept":"application/json",
                "Authorization":"Bearer "+token
            },
            body:fd
        }).then(res=>res.json())
            .then(({data})=>{
                if (data && data.addArticle){
                    Swal.fire({
                       type:"success",
                       title:"نتیجه",
                       text:"مقاله با موفقیت افزوده شد."
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
        return <form onSubmit={this.handleSubmit}>
            {this.renderInput("title","عنوان مقاله")}
            {this.renderBeautyArea("body","متن مقاله")}
            {this.renderFile("image","عکس مقاله")}
            {this.renderButton("ثبت اطلاعات")}
        </form>
    }
}

export default AddArticle;
