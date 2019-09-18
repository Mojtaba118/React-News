import React, {Component} from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import Swal from "sweetalert2";
import http from "../../services/httpServices";
import {editUserQuery, getUserQuery} from "../../utils/graphQL";

class EditUser extends Form {
    state = {
        data: {
            id: "",
            name: "",
            email: "",
            password: "",
            isAdmin: false,
            avatar: "",
            created_at: "",
            updated_at: ""
        },
        errors: {}
    };

    schema = {
        name: Joi.string().max(20).required().label("نام و نام خانوادگی"),
        email: Joi.string().email().required().label("ایمیل"),
        password: Joi.string().min(6).max(20).empty('').label("رمز عبور")
    };

    async componentDidMount() {
        const {match, history} = this.props;
        const id = match.params.id;

        let {data} = await http.post("/graphql/auth", {
            data: getUserQuery(id)
        });
        data = data[0].data;
        if (data && data.user)
            this.mapDataToView(data.user);
        else {
            Swal.fire({type: "error", title: "خطا", text: "خطایی رخ داد"});
            history.replace("/admin");
        }
    }

    mapDataToView = (user) => {
        const newData = {...this.state.data};
        newData.id = user.id;
        newData.name = user.name;
        newData.email = user.email;
        newData.isAdmin = user.is_admin;
        newData.avatar = user.avatar;
        newData.created_at = user.created_at;
        newData.updated_at = user.updated_at;
        this.setState({data: newData});
    }

    doSubmit = async (e) => {
        const {data} = this.state;
        const editUserQL = editUserQuery(data.id, data.name, data.email, data.password, data.isAdmin);

        const files = document.querySelector("#avatar").files;

        let sentData = editUserQL;

        if (files.length) {
            const file = files[0];
            const map = {0: ["variables.avatar"]};
            let fd = new FormData();
            fd.append("operations", JSON.stringify(editUserQL));
            fd.append("map", JSON.stringify(map));
            fd.append(0, file, file.name);
            sentData = fd;
        }
        let {data: resData} = await http.post("/graphql/auth", sentData);
        resData = resData.data;
        if (resData && resData.editUser) {
            Swal.fire({
                type: "success",
                title: "نتیجه",
                text: "کاربر با موفقیت ویرایش شد."
            });
        } else {
            Swal.fire({
                type: "error",
                title: "خطا",
                text: "خطایی رخ داد."
            });
        }
    }


    render() {
        const {avatar, created_at, updated_at} = this.state.data;
        return <div className="card">
            <div className="card-header">
                <h6>{`زمان ثبت نام: ${created_at}`}</h6>
                <h6>{`زمان آخرین به روز رسانی: ${updated_at}`}</h6>
            </div>
            <div className="card-body">
                <form action="#" method="post" onSubmit={this.handleSubmit}>
                    {this.renderInput("name", "نام و نام خانوادگی")}
                    {this.renderInput("email", "ایمیل", "email")}
                    {this.renderInput("password", "رمز عبور", "password")}
                    {this.renderCheckBox("isAdmin", "جزو گروه مدیریت است")}
                    {this.renderFile("avatar", "عکس پروفایل")}
                    <img src={avatar} alt="" width="300px" className="mb-3"/><br/>
                    {this.renderButton("ثبت اطلاعات")}
                </form>
            </div>
        </div>
    }
}


export default EditUser;
