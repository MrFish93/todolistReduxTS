import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';
import {TaskType} from "./Todolist";

type AddItemFormPropsType = {
    currentComponent: string
    addItem: (title: string) => void
    tasksForTodolist?: Array<TaskType>
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            if (props.currentComponent === 'toDo') {
                props.addItem(title);
                setTitle("");
            } else {
                if ((props.tasksForTodolist && props.tasksForTodolist.find((el) => el.title === title))) {
                    alert('The task is already there!')
                    setTitle("");

                } else {
                    props.addItem(title);
                    setTitle("");
                }
            }
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
        />
        <IconButton color="primary" onClick={addItem}>
            <AddBox/>
        </IconButton>
    </div>
});
