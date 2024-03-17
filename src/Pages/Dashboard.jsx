import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/userContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTaskData, taskDeleteAction } from "../Redux/actions";
import moment from "moment";
import ModalView from "../Components/Modal";

const Dashboard = () => {
  const user = useContext(UserContext),
    navigation = useNavigate(),
    dispatch = useDispatch(),
    { taskData } = useSelector((state) => state.taskData),
    [modalView, setModalView] = useState({
      view: false,
      isEdit: false,
      editData:null
    });

  useEffect(() => {
    !user && navigation("/login");
    dispatch(getTaskData);
  }, [user, dispatch, navigation]);

  const camelCaseToWords = (string)=> {
    const result = string.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const showHideModal = (modalType,editData)=> {
    setModalView((prev) => ({ view: !prev.view, isEdit: modalType,editData:editData }));
  };

  const deleteTask = (taskDetail)=> {
    if(window.confirm("Are you sure want delete "+taskDetail.name+"?")){
        dispatch(taskDeleteAction(taskDetail.id));
    }
  };
  const actionBtn = (el) =>(
    <td>
        <button type="button" title="View Status" className="btn btn-primary btn-sm"><i className="fa fa-eye" aria-hidden="true"></i></button>
        <button type="button" title="Edit Task" className="btn btn-secondary btn-sm" onClick={() => showHideModal(true,el)}><i className="fa fa-edit" aria-hidden="true"></i></button>
        <button type="button" title="Delete Task" className="btn btn-danger btn-sm" onClick={() => deleteTask(el)}><i className="fa fa-trash" aria-hidden="true"></i></button>
    </td>
  );
  const bindDataTable = () =>{
    let thead = [],tBody = [];
    if (taskData) {
      let keyName = [];
      taskData.forEach((el, idx) => {
        let tdData = [];
        if (!idx) {
          Object.keys(el).forEach((elm) => {
            keyName.push(elm);
            thead.push(<><th>{camelCaseToWords(elm)}</th></>);
          });
        };
        keyName.forEach((elem) => {
          if (elem === "id") {
            tdData.push(<td>{idx + 1}</td>);
          } else {
            tdData.push(<td>{elem === "createDate" || elem === "completedIn"? moment(new Date(el[elem])).format("DD-MM-YYYY hh:mm:ss A"): el[elem]}</td>);
          };
        });
        tBody.push(
          <tr key={idx}>{tdData}{actionBtn(el)}</tr>
        );
      });
      thead.push(<th style={{width:"140px"}}>Action</th>)
    }
    return (
      <table className="table table-bordered">
        <thead><tr>{thead}</tr></thead>
        <tbody>{tBody}</tbody>
      </table>
    );
  }
  const signout = () =>{
    localStorage.removeItem('user');
    window.location.reload();
  }
  return (
    <>
      <div className="header">
        <div id="main-navbar" className="navbar">
          <h2>Task Manager</h2>
          <i className="fa-solid fa-signout" onClick={signout} style={{position:'absolute',right:20,cursor:"pointer"}}>SignOut</i>
        </div>
      </div>
      <div style={{ zIndex: 99, position: "absolute", right: "70px", marginTop: 5,}}>
        <button className="btn btn-warning" onClick={() => showHideModal(false)}> Add Task</button>
      </div>
      <div className="tableContainer">
        <div className="tableFixHead col-md-12">{taskData && taskData.length ? bindDataTable() : <div className="noDataFound">No Task Availble</div>}</div>
      </div>
      <ModalView showHideModal={showHideModal} modalView={modalView} />
    </>
  );
}

export default Dashboard;
