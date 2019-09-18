import React from "react";
import "froala-editor/js/plugins/image.min";
import "froala-editor/js/plugins/image_manager.min";
import FroalaEditor from "froala-editor/js/froala_editor.pkgd.min";
import Joi from "joi-browser";
import Swal from "sweetalert2";
import Form from "../common/form";
import {editArticleQuery, getArticleQuery} from "../../utils/graphQL";
import http from "../../services/httpServices";

class EditArticle extends Form {
    state = {
        data: {
            id: "",
            title: "",
            body: "",
            image: "",
            user: {
                name: "",
                avatar: ""
            },
            created_at: "",
            updated_at: "",
        },
        errors: {}
    };

    schema = {
        title: Joi.string().max(255).required().label("عنوان مقاله"),
    };

    async componentDidMount() {
        const {match, history} = this.props;
        const id = match.params.id;

        let {data} = await http.post("/graphql", {
            data: getArticleQuery(id)
        });
        data = data[0].data;
        if (data && data.article)
            this.mapDataToView(data.article);
        else {
            Swal.fire({type: "error", title: "خطا", text: "خطایی رخ داد"});
            history.replace("/admin");
        }
    }

    mapDataToView = (article) => {
        const newData = {...this.state.data};
        newData.id = article.id;
        newData.title = article.title;
        newData.body = article.body;
        newData.image = article.image;
        newData.created_at = article.created_at;
        newData.updated_at = article.updated_at;
        newData.user = article.user;
        document.querySelector("textarea#body").value = newData.body;
        this.configEditor();
        this.setState({data: newData});
    }

    doSubmit = async (e) => {
        const {data} = this.state;
        let editArticleQL = editArticleQuery(data.id, data.title, document.querySelector("textarea#body").value);

        let sentData = editArticleQL;

        const files = document.querySelector("#image").files;
        if (files.length) {
            const file = files[0];
            const fd = new FormData();
            const map = {0: ["variables.image"]};
            fd.append("operations", JSON.stringify(editArticleQL));
            fd.append("map", JSON.stringify(map));
            fd.append(0, file, file.name);
            sentData = fd;
        }

        let {data: resData} = await http.post("/graphql/auth", sentData);
        resData=resData.data;
        if (resData && resData.editArticle) {
            Swal.fire({
                type: "success",
                title: "نتیجه",
                text: "مقاله با موفقیت ویرایش شد."
            });
        } else {
            Swal.fire({
                type: "error",
                title: "خطا",
                text: "خطایی رخ داد."
            });
        }
    }

    configEditor = () => {
        const editor = new FroalaEditor("textarea#body", {
            imageUploadURL: "/api/admin/article/upload",
            imageUploadMethod: "post",
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
        const {created_at, updated_at, body, user, image} = this.state.data;
        return <div className="card">
            <div className="card-header">
                <h6>{`سازنده: ${user.name}`}</h6>
                <h6>{`تاریخ ایجاد: ${created_at}`}</h6>
                <h6>{`تاریخ آخرین بهروز رسانی: ${updated_at}`}</h6>
            </div>
            <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "عنوان مقاله")}
                    {this.renderBeautyArea("body", "متن مقاله", body)}
                    <img src={image} className="my-3" width="300px" alt=""/>
                    {this.renderFile("image", "عکس مقاله")}
                    {this.renderButton("ثبت اطلاعات")}
                </form>
            </div>
        </div>
    }
}

export default EditArticle;
