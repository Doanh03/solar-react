function TestimonialCard(props) {
    return (
        <div className="testimonial-card">
            <p className="quote">{props.noiDung}</p>
            <div className="author">
                <strong>{props.ten}</strong>
                <span>{props.chucVu}</span>
            </div>
        </div>
    );
}

export default TestimonialCard;