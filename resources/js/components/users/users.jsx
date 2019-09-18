import React, {Component} from "react";
import Swal from "sweetalert2";
import User from "./user";
import {allUsersQuery,deleteUserQuery} from "../../utils/graphQL";
import http from "../../services/httpServices";

class Users extends Component {
    state = {
        users: []
    };

    async componentDidMount() {
        let {data}=await http.post("/graphql/auth",{
            data:allUsersQuery()
        });
        data=data[0].data;

        if(data && data.allUsers)
            this.setState({users: data.allUsers});
    }

    handleDelete = async (id) => {
        const {value}=await Swal.fire({
            title: "مطمئنید؟",
            text: "بعد از حذف کاربر امکان بازگشت وجود ندارد.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "آره، حذفش کن"
        });
        if (value) {
            let {data}=await http.post("/graphql/auth",{
                data:deleteUserQuery(id)
            });
            data=data[0].data;
            if (data && data.deleteUser){
                this.deleteFromState(id);
                Swal.fire({
                    type: "success",
                    title: "نتیجه",
                    text: "کاربر با موفقیت حذف شد"
                });
            }else{
                Swal.fire({
                    type: "success",
                    title: "خطا",
                    text: "خطایی رخ داد"
                });
            }
        }
    };

    deleteFromState = (id) => {
        const users = this.state.users.filter(user => user.id !== id);
        this.setState({users});
    };

    render() {
        const {users} = this.state;
        if (users && users.length === 0)
            return <div className="alert alert-warning">هیچ کاربری یافت نشد</div>;
        return <div className="row">{users.map(user => <User key={user.id} onDelete={this.handleDelete}
                                                             user={user}/>)}</div>;
    }
}

export default Users;
