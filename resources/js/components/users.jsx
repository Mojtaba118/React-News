import React, {Component} from "react";
import User from "./user";
import Swal from "sweetalert2";

class Users extends Component {
    state = {
        users: []
    };

    componentDidMount() {
        let dataQuery = {
            query: `
                query getAllUsers{
                    allUsers{
                        id,
                        name,
                        avatar,
                        email,
                    }
                }
            `,
            variables: {}
        };
        const token = localStorage.getItem("rn_token");

        fetch("/graphql/auth", {
            method: 'post',
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataQuery)
        }).then((res) =>{
            if(res.status===401){
                window.location="/login";
                return null;
            }
            return res.json()})
            .then(({data}) => {
                if (data && data.allUsers)
                    this.setState({users: data.allUsers})
            })
            .catch(e => console.log(e.message));
    }

    handleDelete = id => {
        const dataQuery = {
            query: `
            mutation deleteUser($id:Int!){
                deleteUser(id:$id)
            }
        `,
            variables: {
                id
            }
        };
        //ask to delete or not
        Swal.fire({
            title: "مطمئنید؟",
            text: "بعد از حذف کاربر امکان بازگشت وجود ندارد.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "آره، حذفش کن"
        }).then(result => {
            if (result.value) {
                //delete
                const token = localStorage.getItem("rn_token");

                fetch("/graphql/auth", {
                    method: "post",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataQuery)
                })
                    .then(res => res.json())
                    .then(({data}) => {
                        if (data.deleteUser) {
                            this.deleteFromState(id);
                            Swal.fire({
                                type: "success",
                                title: "نتیجه",
                                text: "کاربر با موفقیت حذف شد"
                            });
                        } else {
                            Swal.fire({
                                type: "success",
                                title: "خطا",
                                text: "خطایی رخ داد"
                            });
                        }
                    })
                    .catch(e => console.log(e));
            }
        });
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
