import React from "react";
import { Link } from "react-router-dom";

const User = ({ user, onDelete }) => {
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 user mb-3">
            <div className="card">
                <div className="card-header">
                    <h6 className="card-title mb-0">{user.name}</h6>
                </div>
                <div className="card-body">
                    <img src={user.avatar} alt="Not Found" className="avatar" />
                    <p>ایمیل: {user.email}</p>
                </div>
                <div className="card-footer">
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={e => onDelete(user.id)}
                    >
                        حذف
                    </button>
                    <Link
                        to={`/admin/user/edit/${user.id}`}
                        className="btn btn-warning btn-sm"
                    >
                        ویرایش
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default User;
