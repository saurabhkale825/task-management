import "./Task.css";
import { blue, red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import type { Status } from "../../Todo";

interface TaskProps {
  id: number;
  title: string;
  description: string;
  status: Status;
  date: Date | string;
  onDelete: () => void;
  isDeleting?: boolean;
  
}

const Task = ({id, title, description, status, date, onDelete, isDeleting }: TaskProps) => {
  const navigate = useNavigate();

  const handleEditTask = (): void => {
    navigate(`/edittask/${id}`);
  };

  if (!status || !status.color || !status.title) {
    return <div className={`individual-task ${isDeleting ? "deleting" : ""}`}>Invalid status data</div>;
  }

  const formattedDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(formattedDate.getTime())) {
    return <div className="individual-task">Invalid date</div>;
  }

  return (
    <div className={`individual-task ${isDeleting ? 'slide-out' : ''}`}>
      <div className="individual-task-data-container">
        <div className="individual-task-logo">
          <span>{title?.[0]?.toUpperCase()}</span>
        </div>
        <div className="individual-task-title">
          <h3>{title}</h3>
          <div className="individual-task-status">
            <span
              className="individual-task-status-indicator"
              style={{ backgroundColor: status.color }}
            />
            <span>{status.title}</span>
          </div>
        </div>
      </div>
      <div className="individual-task-description">{description}</div>
      <div className="individual-task-date">
        <p>{formattedDate.toDateString()}</p>
        <div className="individual-task-editable-btn-container">
          <EditOutlinedIcon
            sx={{ color: blue[500] }}
            onClick={handleEditTask}
              aria-label={`Edit ${title}`}
          />
          <DeleteIcon sx={{ color: red[500] }} onClick={onDelete} aria-label={`Delete ${title}`}/>
        </div>
      </div>
    </div>
  );
};

export default Task;
