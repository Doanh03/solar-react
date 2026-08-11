function ServiceCards(props) {
    return (
        <div className="service-card">
            <div className="icon">{props.icon}</div>
            <h3>{props.ten}</h3>
            <p>{props.moTa}</p>
        </div>
    );
}

export default ServiceCards;

