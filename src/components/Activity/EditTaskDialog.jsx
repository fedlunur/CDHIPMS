import React, { useState, useEffect } from "react";
import { Button, Modal, Select, Divider, DatePicker } from "antd";
import { ChromePicker } from "react-color";
import useAxios from "../../utils/useAxios";
import CustomMultiselect from "./MultiSelect";
import moment from "moment";

function MyFormDialog({
  open,
  selectedTask,
  allusers,
  assignedtaskmembers,
  handleClose,
  handleTaskUpdate,
}) {
  const api = useAxios();
  const [selectedValues, setSelectedValues] = useState([]);
  const [cover, setCover] = useState("");
  const [formData, setFormData] = useState({
    task_name: "",
    status: "",
    due_date: null,
    cover: "",
  });

  useEffect(() => {
    if (selectedTask) {
      setFormData({
        task_name: selectedTask.task_name,
        status: selectedTask.status,
        cover: selectedTask.cover,
        due_date: selectedTask.due_date ? moment(selectedTask.due_date) : null,
      });
    }
  }, [selectedTask]);

  const handleChangeColor = (newColor) => {
    setCover(newColor.hex);
  };

  const handleDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      due_date: date,
    }));
  };

  const handleChange = (value, name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const formattedDueDate = formData.due_date
        ? formData.due_date.format("YYYY-MM-DD")
        : null;

      const response = await api.patch(
        `/tasklist/${selectedTask.id}/`,
        {
          ...formData,
          due_date: formattedDueDate,
          cover: cover,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        handleTaskUpdate(response.data);
        handleClose();
      } else {
        console.error("Task update failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSelect = async (selectedList, selectedItem) => {
    if (!selectedItem) return;

    try {
      const response = await api.post("/taskmembers/", {
        assigned_to_id: selectedItem.value,
        task_id: selectedTask.id,
      });

      const newItemData = response.data;
    } catch (error) {
      console.error("Error adding item:", error);
    }

    setSelectedValues(selectedList);
  };

  const onRemove = async (selectedList, removedItem) => {
    if (!removedItem) return;

    try {
      await api.delete(`/taskmembers/${removedItem.value}/${selectedTask.id}/`);
      setSelectedValues(
        selectedList.filter((item) => item.value !== removedItem.value)
      );
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <Modal
      title={selectedTask ? selectedTask.task_name : ""}
      open={open}
      onOk={handleSubmit}
      onCancel={handleClose}
    >
      <Divider />
      <div style={{ maxHeight: "550px", overflowY: "auto" }}>
        <div>
          <div className="flex flex-col mb-4">
            <label>Status</label>
            <Select
              className="w-full"
              size="large"
              value={formData.status}
              onChange={(value) => handleChange(value, "status")}
              options={[
                { value: "0", label: "Normal" },
                { value: "1", label: "Low" },
                { value: "2", label: "High" },
              ]}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label>Assign Task To</label>
            <CustomMultiselect
              options={
                allusers
                  ? allusers.map((user) => ({
                      value: user.id,
                      label: user.first_name || "",
                    }))
                  : []
              }
              selectedValues={
                assignedtaskmembers
                  ? assignedtaskmembers.map((user) => ({
                      value: user.assigned_to_id,
                      label: user.assigned_to_first_name || "",
                    }))
                  : []
              }
              onSelect={onSelect}
              onRemove={onRemove}
              displayValue="label"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label>Due Date</label>
            <DatePicker
              value={formData.due_date}
              onChange={handleDateChange}
              format="YYYY-MM-DD"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default MyFormDialog;
