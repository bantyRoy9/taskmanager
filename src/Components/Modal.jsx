import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Input from "./Input";
import { useContext, useEffect, useState } from "react";
import { FormSelect } from "react-bootstrap";
import DatePicker from "./DatePicker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { taskDetailAction } from "../Redux/actions";
import { UserContext } from "../Context/userContext";
function ModalView({ showHideModal, modalView }) {
    const dispatch = useDispatch(),userDetails = useContext(UserContext),{taskData} = useSelector(state=>state.taskData),user=JSON.parse(localStorage.getItem('userList'));
  const [taskDetails, setTaskDetails] = useState({});
  const [selectedDate, setSelectedDate] = useState({
    fromDate: moment(),
    endDate: moment(),
  });
  useEffect(()=>{
    if(modalView.isEdit && modalView.editData){
      setTaskDetails(modalView.editData);
      setSelectedDate({fromDate:moment(modalView.editData?.createdDate,"YYYY-MM-DD HH:mm:ss"),endDate:moment(modalView.editData?.completedIn,"YYYY-MM-DD HH:mm:sss")});
    }else{
      setSelectedDate({
        fromDate: moment(),
        endDate: moment(),
      })
      setTaskDetails({})
    }
  },[modalView]);
  function changeHandler(e) {
    setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });
  }
  function submitHandler(e) {
    e.preventDefault();
    let idList = taskData.map(el=> parseInt(el.id)),missingId=idList.length ? Math.max(...idList) : 2;
    for (let index = 1; index <= missingId; index++) {
        if(idList.indexOf(index) === -1 ){
            missingId = index;
            break;
        }else{
          missingId++;
        };
    };
    dispatch(taskDetailAction({
        id:missingId,
        ...taskDetails,
        createdDate:moment().format("YYYY-MM-DD HH:mm:ss"),
        assignBy:userDetails?.email,
        status:modalView.isEdit ? taskDetails.status : "Pending",
        completedIn: selectedDate.endDate.format("YYYY-MM-DD HH:mm:ss"),
        },
        modalView.isEdit));
    showHideModal()

  }
  function handleDateRange(event, picker) {
    setSelectedDate({ fromDate: picker.startDate, endDate: picker.endDate });
  }
  return (
    <>
      <Modal
        show={modalView.view}
        onHide={showHideModal}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modalView.isEdit ? "Update" : "Add New"} Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="formSubmit" onSubmit={submitHandler}>
            <div className="row">
              <div className="col-md-6">
                <Input
                  placeholder="Task Name"
                  label={"Task Name"}
                  className={"form-control"}
                  onChange={changeHandler}
                  name={"name"}
                  value={taskDetails?.name}
                  required={true}
                  errorMsg={"required Name"}
                />
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="label control-label">Assign To:</label>
                  <FormSelect
                    className="form-control"
                    name="assignTo"
                    onChange={changeHandler}
                    required={true}
                    value={taskDetails?.assignTo}
                  >
                    {user && user.length && user.map((el) => (
                      <option value={el.name}>{el.name}</option>
                    ))}
                  </FormSelect>
                </div>
              </div>
              <div className="col-md-6">
                <DatePicker
                  startDate={selectedDate.fromDate}
                  endDate={selectedDate.endDate}
                  maxDate={moment().add("days", 31)}
                  labelClass={"label control-label"}
                  className="form-control"
                  name="fromDate"
                  ranges={{}}
                  label={"Completed In: "}
                  minDate={moment()}
                  handleDateRange={(e, picker) => handleDateRange(e, picker)}
                  drops={"down"}
                  autoClose={true}
                />
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="label control-label">Default Level:</label>
                  <FormSelect
                    className="form-control"
                    name="defecultLevel"
                    onChange={changeHandler}
                    required={true}
                    value={taskDetails?.defecultLevel}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </FormSelect>
                </div>
              </div>
              {modalView.isEdit && <div className="col-md-6">
                <div className="form-group">
                  <label className="label control-label">Status:</label>
                  <FormSelect
                    className="form-control"
                    name="status"
                    onChange={changeHandler}
                    required={true}
                    value={taskDetails?.status}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In-Process">In-Process</option>
                    <option value="Completed">Completed</option>
                  </FormSelect>
                </div>
              </div>}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={showHideModal}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="formSubmit">
            {modalView.isEdit ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalView;
