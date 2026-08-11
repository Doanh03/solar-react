function ProjectCard(props) {
    return (
        <div className="project-card">
            <img src={props.anh} alt={props.ten} />
            <div className="project-info">
                <h3>{props.ten}</h3>
                <p>{props.diaDiem} &middot; {props.congSuat}</p>
            </div>
        </div>
    );
}

export default ProjectCard;