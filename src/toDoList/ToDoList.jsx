import React, { useEffect, useRef } from "react";
import { useState } from "react";
import styles from "./toDo.module.css";
import { v4 as uuidv4 } from "uuid";
import { MdDelete } from "react-icons/md";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";

const ToDoList = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const setInLocalStorage = (data) => {
    localStorage.setItem("tasks", JSON.stringify(data));
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    if (task !== "") {
      const taskDetails = {
        id: uuidv4(),
        value: task,
        isCompleted: false,
        isEdit: false,
      };

      ref.current.value = "";
      setTaskList([...taskList, taskDetails]);
      setInLocalStorage([...taskList, taskDetails]);
    }
  };

  const taskCompleted = (e, id) => {
    e.preventDefault();
    // find index of element
    let temp = taskList;
    const element = temp.findIndex((elem) => elem.id === id);
    temp[element] = {
      ...temp[element],
      isCompleted: !temp[element].isCompleted,
    };

    setTaskList([...temp]);
    setInLocalStorage([...temp]);
  };

  const editTask = (e, id) => {
    e.preventDefault();
    let temp = taskList;
    const element = temp.findIndex((elem) => elem.id === id);
    temp[element] = {
      ...temp[element],
      isEdit: true,
    };

    setTaskList([...temp]);
    setInLocalStorage([...temp]);
  };

  const onEditing = (e, id) => {
    e.preventDefault();

    let temp = taskList;
    const element = temp.findIndex((elem) => elem.id === id);
    temp[element] = {
      ...temp[element],
      isEdit: true,
      value: e.target.value,
    };
    setTaskList([...temp]);
    setInLocalStorage([...temp]);
  };

  const updateTask = (e, id) => {
    e.preventDefault();

    let temp = taskList;
    const element = temp.findIndex((elem) => elem.id === id);
    temp[element] = {
      ...temp[element],
      isEdit: false,
    };
    setTaskList([...temp]);
    setInLocalStorage([...temp]);
  };

  const filterRemaining = (e) => {
    const newList = taskList.filter((t) => !t.isCompleted);
    setTaskList(newList);
    setInLocalStorage(newList);
  };

  const deletetask = (e, id) => {
    e.preventDefault();
    const newList = taskList.filter((t) => t.id !== id);
    setTaskList(newList);
    setInLocalStorage(newList);
  };

  const ref = useRef();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>To Do List</h1>

      <div className={styles.inputCss}>
        <input
          type="text"
          ref={ref}
          onChange={(e) => handleChange(e)}
          placeholder="add a task"
          className={styles.input}
        />
        <div onClick={addTask}>
          <button className={styles.btnadd}>ADD</button>
        </div>
      </div>

      <div className={styles.listDiv}>
        {taskList.map((item) => (
          <li key={item.id} className={styles.list}>
            <div className={styles.leftDiv}>
              <BiCheckbox
                size={30}
                color="aqua"
                onClick={(e) => {
                  taskCompleted(e, item.id);
                }}
                className={item.isCompleted ? styles.invisible : styles.visible}
              />
              <BiCheckboxChecked
                size={30}
                color="aqua"
                className={item.isCompleted ? styles.visible : styles.invisible}
                onClick={(e) => {
                  taskCompleted(e, item.id);
                }}
              />

              {item.isEdit ? (
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => onEditing(e, item.id)}
                  className={styles.editInput}
                />
              ) : (
                <span
                  onDoubleClick={(e) => {
                    editTask(e, item.id);
                  }}
                >
                  {" "}
                  {item.value}
                </span>
              )}
            </div>

            {item.isEdit ? (
              <button
                className={styles.updatebtn}
                onClick={(e) => updateTask(e, item.id)}
              >
                Update
              </button>
            ) : (
              <div
                className={styles.visible}
                onClick={(e) => deletetask(e, item.id)}
              >
                <MdDelete color="aqua" size={25} />
              </div>
            )}
          </li>
        ))}
      </div>

      <div className={styles.bottomDiv}>
        <button onClick={filterRemaining} className={styles.btnadd}>
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default ToDoList;
