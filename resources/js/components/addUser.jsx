import React, {Component} from "react";
import Joi from "joi-browser";
import Swal from "sweetalert2";
import Form from "./common/form";

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

    doSubmit = (e) => {
        const {data}=this.state;
        const dataQuery={
            query:`
                mutation addUsers($name:String!,$email:String!,$password:String!,$is_admin:Boolean,$avatar:Upload){
                    addUser(name:$name,email:$email,password:$password,is_admin:$is_admin,avatar:$avatar)
                }
            `,
            variables:{
                "name":data.name,
                "email":data.email,
                "password":data.password,
                "is_admin":data.isAdmin,
                "avatar":null,
            }
        };

        const file=document.querySelector("#avatar").files[0];

        let headers={
            "Content-Type":"application/json"
        };
        let body=JSON.stringify(dataQuery);

        const map={0:["variables.avatar"]};
        let fd = new FormData();
        fd.append("operations",JSON.stringify(dataQuery));
        fd.append("map",JSON.stringify(map));

        if (file){
            fd.append(0,file,file.name);
            headers={};
            body=fd;
        }
        const token=localStorage.getItem("rn_token");
        headers["Authorization"]="Bearer "+token;
        headers["Accept"]="application/json";

        fetch("/graphql/auth",{
            method:"post",
            headers,
            body
        }).then(res=>res.json())
            .then(({data,errors})=>{
                if (data.addUser){
                    Swal.fire({
                        type:"success",
                        title:"نتیجه",
                        text:"کاربر با موفقیت افزوده شد."
                    })
                }else{
                    const error={};
                    for (let err of errors){
                        for(let field in err.extensions.validation){
                            error[field]=err.extensions.validation[field][0];
                        }
                    }
                    this.setState({errors:error})
                }
            })
            .catch(e=>console.log(e));
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
