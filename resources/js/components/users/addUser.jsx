import React, {Component} from "react";
import Joi from "joi-browser";
import Swal from "sweetalert2";
import Form from "../common/form";
import {addUserQuery} from "../../utils/graphQL";
import http from "../../services/httpServices";

class AddUser extends Form {
    state = {
        data: {
            name: "",
            email: "",
            password: "",
            isAdmin: false,
        },
        errors: {}
    };

    schema = {
        name: Joi.string().max(20).required().label("نام و نام خانوادگی"),
        email: Joi.string().email().required().label("ایمیل"),
        password: Joi.string().min(6).max(20).required().label("رمز عبور")
    };

    doSubmit = async (e) => {
        const {data}=this.state;

        const addUserQL=addUserQuery(data.name,data.email,data.password,data.isAdmin);;
        let sentData=addUserQL;

        const files=document.querySelector("#avatar").files;
        if (files.length){
            const file=files[0];
            const map={0:["variables.avatar"]};
            let fd = new FormData();
            fd.append("operations",JSON.stringify(addUserQL));
            fd.append("map",JSON.stringify(map));
            fd.append(0,file,file.name);
            sentData=fd;
        }

        let {data:resData}=await http.post("/graphql/auth",sentData);
        resData=resData.data;
        if (resData && resData.addUser){
            Swal.fire({
                type:"success",
                title:"نتیجه",
                text:"کاربر با موفقیت افزوده شد."
            })
        }else{
            Swal.fire({
                type:"error",
                title:"خطا",
                text:"خطایی رخ داد."
            })
        }
    }

    render() {
        return <form action="#" method="post" onSubmit={this.handleSubmit}>
            {this.renderInput("name", "نام و نام خانوادگی")}
            {this.renderInput("email", "ایمیل", "email")}
            {this.renderInput("password", "رمز عبور", "password")}
            {this.renderCheckBox("isAdmin", "جزو گروه مدیریت است")}
            {this.renderFile("avatar", "عکس پروفایل")}
            {this.renderButton("ثبت اطلاعات")}
        </form>
    }
}

export default AddUser;
