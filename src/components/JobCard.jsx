import React, { useState } from "react";
import { Card, Modal, Tag } from "antd";
import moment from "moment";
import "./JobCard.css";

function JobCard({ job }) {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const showModal = () => {
     setIsModalOpen(true);
   };

  const handleCancel = () => {
     setIsModalOpen(false);
   };

  const formatDate = (date) => {
    return moment(date).format("MMM DD, YYYY");
  };

  const renderSection = (title, content) => {
    if (!content || (Array.isArray(content) && content.length === 0)) {
      return null;
    }

    return (
      <div className="job-section">
        <h3>{title}</h3>
        {content}
      </div>
    );
  };

  return (
    <>
      <Card className="job-card" onClick={showModal}>
        <h2>{job.name}</h2>
        <p>{formatDate(job.created_at)}</p>
      </Card>

      <Modal
        title={job.name}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
        bodyStyle={{ height: "400px", overflowY: "auto" }}
      >
        <div className="job-details">
          <p>{job.summary}</p>
          {renderSection(
            "Tags",
            job.tags.map((tag) => <Tag key={tag.name}>{tag.value}</Tag>)
          )}
          {renderSection(
            "Tasks",
            job.tasks.map((task) => <p key={task.name}>{task.name}</p>)
          )}
          {renderSection("Location", job.location.text)}
          {renderSection("Benefits", job.benefits)}
          {renderSection(
            "Skills",
            job.skills.map((skill) => <Tag key={skill.name}>{skill.name}</Tag>)
          )}
          {renderSection("Responsibilities", job.responsibilities)}
          {renderSection("Requirements", job.requirements)}
          {renderSection("Benefits", job.benefits)}
        </div>
      </Modal>
    </>
  );
}

export default JobCard;
