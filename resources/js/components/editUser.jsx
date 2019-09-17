import React,{Component} from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import Swal from "sweetalert2";

class EditUser extends Form{
    state = {
        data: {
            id:"",
            name: "",
            email: "",
            password: "",
            isAdmin: false,
            avatar:"",
            created_at:"",
            updated_at:""
        },
        errors: {}
    };

    schema = {
        name: Joi.string().max(20).required().label("نام و نام خانوادگی"),
        email: Joi.string().email().required().label("ایمیل"),
        password: Joi.string().min(6).max(20).empty('').label("رمز عبور")
    };
    componentDidMount() {
        const {match,history}=this.props;
        const {id}=match.params;
        if(id==0){
            history.replace("/admin");
            return;
        }
        const userQuery={
            query:`
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
            variables:{
                id
            }
        }


        fetch("/graphql",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userQuery)
        }).then(res=>res.json())
            .then(({data,error})=>{
                if (data && data.user){
                    const newData={...this.state.data};
                    newData.id=data.user.id;
                    newData.name=data.user.name;
                    newData.email=data.user.email;
                    newData.password="";
                    newData.isAdmin=data.user.is_admin;
                    newData.avatar=data.user.avatar;
                    newData.created_at=data.user.created_at;
                    newData.updated_at=data.user.updated_at;
                    this.setState({data:newData});
                }else
                    history.replace("/admin");
            }).catch(e=>console.log(e));
    }

    doSubmit = (e) => {
        const {history}=this.props;
        const {data}=this.state;
        const dataQuery={
            query:`
                mutation editUsers($id:Int!,$name:String!,$email:String!,$password:String,$is_admin:Boolean,$avatar:Upload){
                    editUser(id:$id,name:$name,email:$email,password:$password,is_admin:$is_admin,avatar:$avatar)
                }
            `,
            variables:{
                "id":data.id,
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
            .then(({data})=>{
                if (data.editUser){
                    Swal.fire({
                        type:"success",
                        title:"نتیجه",
                        text:"اطلاعات کاربر با موفقییت ویرایش شد."
                    });
                    history.replace("/admin");
                }
            })
            .catch(e=>console.log(e));
    }


    render() {
        const {avatar,created_at,updated_at}=this.state.data;
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
